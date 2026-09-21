// ─────────────────────────────────────────────────────────────────────────────
// Well Walt Studios — site-wide config & CTA constants.
// Every placeholder you need to fill in lives in this one file.
// Update it, and every page that loads /constants.js picks up the change.
// ─────────────────────────────────────────────────────────────────────────────

// ── DONE-FOR-YOU SERVICE — edit these ───────────────────────────────────────
// Headline price for the done-for-you STARTER site — a professional site built
// from a proven template and launched for you (a deal vs. a full custom build).
// Shown anywhere with data-wws-text="sitePrice".
var SITE_PRICE     = '$699';

// Optional monthly care / retainer add-on. Shown with data-wws-text="retainerPrice".
var RETAINER_PRICE = '$150/mo';

// TODO ①  Primary CTA — your booking link (Cal.com, etc.). Wired to every
//          [data-wws-cta="service.book"] element (the "Book a call" buttons).
var BOOKING_URL    = 'https://cal.com/wellwaltstudios/discovery-call';

// Demo — the WellTemp sample site, served from this repo at /demo (built from
// the welltemp-starter-kit with SITE_BASE=/demo). Wired to
// [data-wws-cta="service.demo"] on the portfolio page.
var DEMO_URL       = 'https://wellwaltstudios.com/demo';

// Where lead notifications go. Also used for the mailto scoping CTA.
var LEAD_EMAIL     = 'ariel@wellwaltstudios.com';

// TODO ③  Intake form endpoint. Sign up (free) at https://web3forms.com, set
//          LEAD_EMAIL above as the recipient in their dashboard, paste the
//          access key here. The /start form posts to Web3Forms with this key.
var WEB3FORMS_KEY  = 'YOUR_WEB3FORMS_ACCESS_KEY';

// ── EXISTING PRODUCT LINKS ───────────────────────────────────────────────────
// TODO ④  WellTemp product on Polar.sh → paste the checkout URL here.
var POLAR_WELLTEMP_URL = 'https://buy.polar.sh/polar_cl_TUqA0YSh6jUUrIZRGa4fqK9sybNLQZHUblBLv1QIebR';

// TODO ⑤  Sign up at plausible.io, add wellwaltstudios.com, verify the domain.
//          The script tag in each page already points here — nothing else needed.
var PLAUSIBLE_DOMAIN = 'wellwaltstudios.com';

// ── CTA WIRING TABLE ─────────────────────────────────────────────────────────
var WWS_LINKS = {
  service: {
    start: '/start',                                                           // primary path — intake form
    book:  BOOKING_URL,                                                         // secondary — book a call
    scope: 'mailto:' + LEAD_EMAIL
          + '?subject=New%20project%20enquiry%20%E2%80%94%20Well%20Walt%20Studios'
          + '&body=Hi%20Ariel%2C%0A%0AMy%20business%3A%20%0AWhat%20we%20do%3A%20%0AWhat%20I%20need%20(new%20site%20%2F%20redesign%20%2F%20automations)%3A%20%0ATimeline%3A%20%0ABudget%3A%20%0A',
    demo:  DEMO_URL,
  },
  welltemp: {
    diy:       POLAR_WELLTEMP_URL,                                             // DIY — $59 one-time
    setupCall: 'https://cal.com/wellwaltstudios/setup-call',                   // Setup Call — $299
    fullBuild: 'mailto:ariel@wellwaltstudios.com'
              + '?subject=WellTemp%20Full%20Build%20enquiry'
              + '&body=Hi%20Ariel%2C%20I%27m%20interested%20in%20a%20full%20WellTemp%20build.%20My%20business%20is%3A',
  },
  wellship: {
    buy: 'https://buy.polar.sh/polar_cl_8sYTIh4uUAh0VfsgSu5hLhd4Q67f1vYbXQ1ET4F2okM',
  },
};

// Editable text tokens (prices) injected into [data-wws-text] elements.
var WWS_TEXT = {
  sitePrice:     SITE_PRICE,
  retainerPrice: RETAINER_PRICE,
  leadEmail:     LEAD_EMAIL,
};

// ── DOM WIRING ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  // Wire hrefs: data-wws-cta="group.key"
  document.querySelectorAll('[data-wws-cta]').forEach(function (el) {
    var parts = el.getAttribute('data-wws-cta').split('.');
    var group = WWS_LINKS[parts[0]];
    if (group && group[parts[1]]) el.href = group[parts[1]];
  });

  // Wire text: data-wws-text="key"
  document.querySelectorAll('[data-wws-text]').forEach(function (el) {
    var key = el.getAttribute('data-wws-text');
    if (WWS_TEXT[key] != null) el.textContent = WWS_TEXT[key];
  });

  // Auto year stamp for any [data-year] element.
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
