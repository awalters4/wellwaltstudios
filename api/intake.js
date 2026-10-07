// Intake endpoint for the /start lead form.
// Stores the lead in the ops app AND emails a notification, both server-side so
// nothing sensitive is exposed in the browser. Returns success to the browser
// if EITHER the ops save or the email succeeds.
//
// Email uses the project's existing SMTP setup via nodemailer (the same EMAIL_*
// vars the booking/spring functions use). Web3Forms is not used: its free plan
// blocks server-side submissions.
//
// Required env vars (set in Vercel, Production):
//   OPS_INGEST_URL     base URL of the ops app, e.g. https://ops.example.com
//   OPS_INGEST_SECRET  bearer token the ops app expects on /api/ingest/lead
//   EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, EMAIL_FROM, EMAIL_FROM_NAME
//   LEAD_EMAIL         (optional) where notifications go; defaults to ariel@wellwaltstudios.com

const https = require('https');
const { URL } = require('url');
const nodemailer = require('nodemailer');

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;                     // submissions per IP per window

const hits = new Map();

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return req.headers['x-real-ip'] || (req.socket && req.socket.remoteAddress) || 'unknown';
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(function (t) { return now - t < RATE_LIMIT_WINDOW_MS; });
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some(function (t) { return now - t < RATE_LIMIT_WINDOW_MS; })) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT_MAX;
}

function str(v) { return (v == null ? '' : String(v)).trim(); }

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

// POST JSON over https; resolves { status, body }.
function postJson(urlString, headers, payload) {
  return new Promise(function (resolve, reject) {
    let u;
    try { u = new URL(urlString); } catch (e) { return reject(new Error('invalid URL: ' + urlString)); }
    const data = JSON.stringify(payload);
    const opts = {
      method: 'POST',
      hostname: u.hostname,
      port: u.port || 443,
      path: (u.pathname || '/') + (u.search || ''),
      headers: Object.assign({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      }, headers || {}),
    };
    const req = https.request(opts, function (res) {
      let body = '';
      res.on('data', function (c) { body += c; });
      res.on('end', function () { resolve({ status: res.statusCode, body: body }); });
    });
    req.on('error', reject);
    req.setTimeout(10000, function () { req.destroy(new Error('request timed out')); });
    req.write(data);
    req.end();
  });
}

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
  if (!base || !secret) throw new Error('ops ingest not configured (OPS_INGEST_URL / OPS_INGEST_SECRET missing)');
  const r = await postJson(base.replace(/\/$/, '') + '/api/ingest/lead',
    { 'Authorization': 'Bearer ' + secret },
    {
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
    });
  if (r.status < 200 || r.status >= 300) {
    throw new Error('ops ingest responded ' + r.status + (r.body ? ': ' + r.body.slice(0, 120) : ''));
  }
  return true;
}

async function sendEmail(data) {
  const host = process.env.EMAIL_HOST, user = process.env.EMAIL_USER, pass = process.env.EMAIL_PASSWORD;
  if (!host || !user || !pass) throw new Error('email not configured (EMAIL_HOST / EMAIL_USER / EMAIL_PASSWORD missing)');
  const transporter = nodemailer.createTransport({
    host: host,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: parseInt(process.env.EMAIL_PORT || '587', 10) === 465,
    auth: { user: user, pass: pass },
  });
  const rows = [
    ['Name', data.name], ['Email', data.email], ['Phone', data.phone || '-'],
    ['Business', data.business_name], ['What they do', data.business_desc],
    ['Needs', data.needs], ['Budget', data.budget || '-'], ['Timeline', data.timeline || '-'],
  ].map(function (r) {
    return '<tr><td style="padding:4px 14px 4px 0;color:#666;font-weight:600;vertical-align:top">' + r[0] +
           '</td><td style="padding:4px 0">' + escapeHtml(r[1]) + '</td></tr>';
  }).join('');
  const html = '<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;color:#222">' +
    '<h2 style="margin:0 0 12px">New lead from wellwaltstudios.com</h2>' +
    '<table style="font-size:14px;border-collapse:collapse">' + rows + '</table>' +
    '<h3 style="margin:18px 0 6px">Details</h3>' +
    '<p style="white-space:pre-wrap;font-size:14px;margin:0">' + escapeHtml(data.details) + '</p>' +
    '<p style="font-size:12px;color:#999;margin-top:18px">Submitted ' + new Date().toISOString() + ' via /start</p></div>';
  await transporter.sendMail({
    from: '"' + (process.env.EMAIL_FROM_NAME || 'Well Walt Studios') + '" <' + (process.env.EMAIL_FROM || user) + '>',
    to: process.env.LEAD_EMAIL || 'ariel@wellwaltstudios.com',
    replyTo: data.email,
    subject: 'New lead - ' + (data.business_name || data.name),
    html: html,
  });
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

  const opsErr = ops.status === 'rejected' ? String(ops.reason && ops.reason.message || ops.reason) : null;
  const emailErr = email.status === 'rejected' ? String(email.reason && email.reason.message || email.reason) : null;
  if (opsErr) console.error('[intake] ops save failed:', opsErr);
  if (emailErr) console.error('[intake] email send failed:', emailErr);

  // Succeed if either path worked; the lead is not lost as long as one lands.
  if (ops.status === 'fulfilled' || email.status === 'fulfilled') {
    return res.status(200).json({ success: true });
  }

  console.error('[intake] both ops save and email failed for', data.email);
  return res.status(502).json({
    success: false,
    error: 'Could not deliver your submission',
    detail: { ops: opsErr, email: emailErr },
  });
};
