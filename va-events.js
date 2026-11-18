// Bridge: fire Vercel Web Analytics custom events from the existing
// plausible-event-name="" CTA tags, so conversion tracking survives the move
// off Plausible. Reads the class token, turns "Get+Started+-+Nav" into
// "Get Started - Nav", and reports it to window.va (Vercel's queue/stub).
document.addEventListener('click', function (e) {
  var el = e.target.closest && e.target.closest('[class*="plausible-event-name="]');
  if (!el || typeof window.va !== 'function') return;
  el.className.split(/\s+/).forEach(function (c) {
    if (c.indexOf('plausible-event-name=') === 0) {
      window.va('event', { name: c.slice(21).split('+').join(' ') });
    }
  });
}, true);
