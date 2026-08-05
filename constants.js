// ─────────────────────────────────────────────────────────────────────────────
// Well Walt Studios — site-wide CTA constants.
// All three WellTemp CTAs + the WellShip buy link live here.
// Update this file; every page that loads it picks up the change automatically.
// ─────────────────────────────────────────────────────────────────────────────

// TODO ①  Create your WellTemp product on Polar.sh, then paste the
//          generated checkout URL below to activate the "Buy the template" button.
var POLAR_WELLTEMP_URL = 'https://buy.polar.sh/polar_cl_TUqA0YSh6jUUrIZRGa4fqK9sybNLQZHUblBLv1QIebR';

var WWS_LINKS = {
  welltemp: {
    diy:       POLAR_WELLTEMP_URL,                                              // DIY — $59 one-time
    setupCall: 'https://cal.com/wellwaltstudios/setup-call',                   // Setup Call — $299
    fullBuild: 'mailto:ariel@wellwaltstudios.com'
              + '?subject=WellTemp%20Full%20Build%20enquiry'
              + '&body=Hi%20Ariel%2C%20I%27m%20interested%20in%20a%20full%20WellTemp%20build.%20My%20business%20is%3A',
  },
  wellship: {
    buy: 'https://buy.polar.sh/polar_cl_8sYTIh4uUAh0VfsgSu5hLhd4Q67f1vYbXQ1ET4F2okM',
  },
};

// TODO ②  Sign up at plausible.io, add wellwaltstudios.com, and verify the
//          domain. The script tag in each page already points to this domain;
//          no other configuration is needed once it's verified.
var PLAUSIBLE_DOMAIN = 'wellwaltstudios.com';

// Wire all [data-wws-cta] elements to their URLs.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-wws-cta]').forEach(function (el) {
    var parts = el.getAttribute('data-wws-cta').split('.');
    var group = WWS_LINKS[parts[0]];
    if (group && group[parts[1]]) el.href = group[parts[1]];
  });
});
