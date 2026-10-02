// Intake endpoint for the /start lead form.
// Stores the lead in the ops app AND sends the Web3Forms email notification,
// both server-side so no secret is exposed in the browser. Returns success to
// the browser if EITHER the ops save or the email succeeds.
//
// Required env vars (set in Vercel project settings):
//   OPS_INGEST_URL     base URL of the ops app, e.g. https://ops.example.com
//   OPS_INGEST_SECRET  bearer token the ops app expects on /api/ingest/lead
//   WEB3FORMS_KEY      Web3Forms access key (kept server-side only)

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;                     // submissions per IP per window

// Best-effort in-memory limiter. Serverless instances are ephemeral and not
// shared, so this throttles the common case without a datastore.
const hits = new Map();

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(function (t) { return now - t < RATE_LIMIT_WINDOW_MS; });
  recent.push(now);
  hits.set(ip, recent);
  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some(function (t) { return now - t < RATE_LIMIT_WINDOW_MS; })) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT_MAX;
}

function str(v) { return (v == null ? '' : String(v)).trim(); }

function validate(body) {
  const data = {
    name:          str(body.name),
    email:         str(body.email),
    phone:         str(body.phone),
    business_name: str(body.business_name),
    business_desc: str(body.business_desc),
    needs:         str(body.needs),
    details:       str(body.details),
    budget:        str(body.budget),
    timeline:      str(body.timeline),
  };
  const errors = [];
  if (!data.name) errors.push('name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('email');
  if (!data.business_name) errors.push('business_name');
  if (!data.business_desc) errors.push('business_desc');
  if (!data.needs) errors.push('needs');
  if (!data.details) errors.push('details');
  return { data: data, errors: errors };
}

async function saveToOps(data) {
  const base = process.env.OPS_INGEST_URL;
  const secret = process.env.OPS_INGEST_SECRET;
  if (!base || !secret) {
    throw new Error('ops ingest not configured');
  }
  const resp = await fetch(base.replace(/\/$/, '') + '/api/ingest/lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + secret,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      business_name: data.business_name,
      business_desc: data.business_desc,
      needs: data.needs,
      needs_list: data.needs ? data.needs.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [],
      details: data.details,
      budget: data.budget,
      timeline: data.timeline,
      source: 'wellwaltstudios/start',
      submitted_at: new Date().toISOString(),
    }),
  });
  if (!resp.ok) throw new Error('ops ingest responded ' + resp.status);
  return true;
}

async function sendEmail(data) {
  const key = process.env.WEB3FORMS_KEY;
  if (!key) throw new Error('web3forms key not configured');
  const resp = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      access_key: key,
      subject: 'New lead — ' + (data.business_name || data.name),
      from_name: data.name,
      name: data.name,
      email: data.email,
      phone: data.phone,
      business_name: data.business_name,
      business_desc: data.business_desc,
      needs: data.needs,
      details: data.details,
      budget: data.budget,
      timeline: data.timeline,
    }),
  });
  const json = await resp.json().catch(function () { return null; });
  if (!resp.ok || !(json && json.success)) {
    throw new Error('web3forms failed: ' + (json && json.message ? json.message : resp.status));
  }
  return true;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  if (!body || typeof body !== 'object') body = {};

  // Honeypot: a real user never checks this. Drop silently with a fake success.
  if (body.botcheck === true || body.botcheck === 'true' || body.botcheck === 'on') {
    return res.status(200).json({ success: true });
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return res.status(429).json({ success: false, error: 'Too many submissions. Please try again shortly.' });
  }

  const { data, errors } = validate(body);
  if (errors.length) {
    return res.status(400).json({ success: false, error: 'Missing or invalid fields', fields: errors });
  }

  const [ops, email] = await Promise.allSettled([saveToOps(data), sendEmail(data)]);

  if (ops.status === 'rejected') console.error('[intake] ops save failed:', ops.reason && ops.reason.message);
  if (email.status === 'rejected') console.error('[intake] email send failed:', email.reason && email.reason.message);

  // Succeed if either path worked; the lead is not lost as long as one lands.
  if (ops.status === 'fulfilled' || email.status === 'fulfilled') {
    return res.status(200).json({ success: true });
  }

  console.error('[intake] both ops save and email failed for', data.email);
  return res.status(502).json({ success: false, error: 'Could not deliver your submission' });
};
