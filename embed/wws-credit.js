/*!
 * <wws-credit> — Well Walt Studios client-site credit footer
 * Host at: https://www.wellwaltstudios.com/embed/wws-credit.js
 *
 * Usage:
 *   <script src="https://www.wellwaltstudios.com/embed/wws-credit.js" defer></script>
 *   <wws-credit variant="badge">
 *     <a href="https://www.wellwaltstudios.com">Site by Well Walt Studios</a>
 *   </wws-credit>
 *
 * Attributes:
 *   variant  "badge" (default) | "full"
 *   theme    badge: "inherit" (default) | "dark" | "light"
 *            full:  "dark" (default) | "light"
 *   align    badge only: "center" (default) | "start" | "end"
 *   label    badge eyebrow text (default "Designed & built by")
 *   rel      link rel (default "noopener"); set "nofollow noopener" for sitewide placements
 *   logo     override logo URL
 *   fonts    "none" to skip injecting Google Fonts (falls back to system UI)
 *
 * The light-DOM <a> is the no-JS / crawler fallback; it is replaced visually once upgraded.
 */
(() => {
  if (customElements.get('wws-credit')) return;

  const ORIGIN = 'https://www.wellwaltstudios.com';
  const LOGO = `${ORIGIN}/brand/wws-mark.webp`;
  const BOOK = 'https://cal.com/wellwaltstudios/website-intro-call';
  const IG = 'https://instagram.com/wellwaltstudios';
  const EMAIL = 'ariel@wellwaltstudios.com';
  const FONTS_HREF =
    'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500&family=IBM+Plex+Mono:wght@500&display=swap';

  const utm = (variant, content) => {
    const u = new URL(ORIGIN + '/');
    u.searchParams.set('utm_source', location.hostname || 'client-site');
    u.searchParams.set('utm_medium', 'referral');
    u.searchParams.set('utm_campaign', 'client-credit');
    u.searchParams.set('utm_content', content || variant);
    return u.toString();
  };

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const ensureFonts = () => {
    if (document.querySelector('link[data-wws-fonts]')) return;
    for (const href of ['https://fonts.googleapis.com', 'https://fonts.gstatic.com']) {
      const pc = document.createElement('link');
      pc.rel = 'preconnect';
      pc.href = href;
      if (href.includes('gstatic')) pc.crossOrigin = '';
      document.head.appendChild(pc);
    }
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = FONTS_HREF;
    l.dataset.wwsFonts = '';
    document.head.appendChild(l);
  };

  const ARROW = `<svg class="arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M5 11L11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const BASE_CSS = `
    :host{
      --wws-pink-deep:#D63C74; --wws-pink:#E0629F; --wws-pink-soft:#F386AC;
      --wws-font:"DM Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
      --wws-display:"Fraunces",Georgia,"Times New Roman",serif;
      --wws-mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
      display:block; box-sizing:border-box; font-family:var(--wws-font);
      -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
    }
    :host([hidden]){display:none}
    *,*::before,*::after{box-sizing:inherit}
    a{color:inherit;text-decoration:none}
    a:focus-visible{outline:2px solid var(--wws-pink);outline-offset:3px;border-radius:999px}
    img{display:block;height:auto}
    .arrow{width:.9em;height:.9em;flex:none;transition:transform .25s ease}
    @media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
  `;

  const BADGE_CSS = `
    :host{
      --fg:currentColor; --muted:currentColor; --muted-o:.62;
      --line:color-mix(in srgb,currentColor 18%,transparent);
      --bg:transparent;
      padding:20px 16px; text-align:center;
    }
    :host([theme=dark]){--fg:#F4ECDE;--muted-o:.6;--line:rgba(244,236,222,.14);--bg:#17130E;background:var(--bg);color:var(--fg)}
    :host([theme=light]){--fg:#0F2536;--muted-o:.7;--line:#E7E0D6;--bg:#FBF8F2;background:var(--bg);color:var(--fg)}
    :host([align=start]){text-align:left}
    :host([align=end]){text-align:right}
    .badge{
      display:inline-flex; align-items:center; gap:12px;
      padding:8px 16px 8px 10px; border:1px solid var(--line); border-radius:999px;
      color:var(--fg); line-height:1.15;
      transition:border-color .25s ease, background-color .25s ease, transform .25s ease;
    }
    .badge:hover{border-color:color-mix(in srgb,var(--wws-pink) 65%,transparent);background:color-mix(in srgb,var(--wws-pink) 7%,transparent)}
    .badge:hover .mark{transform:translateY(-1px) rotate(-4deg)}
    .badge:hover .arrow{transform:translate(2px,-2px);opacity:1}
    .mark{width:38px;transition:transform .35s cubic-bezier(.3,1.4,.5,1)}
    .text{display:flex;flex-direction:column;align-items:flex-start;text-align:left}
    .eyebrow{font-size:10.5px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;opacity:var(--muted-o)}
    .name{display:inline-flex;align-items:center;gap:4px;font-size:14.5px;font-weight:600;letter-spacing:-.005em}
    .name .arrow{opacity:.45}
  `;

  const FULL_CSS = `
    :host{
      --bg:#17130E; --fg:#F4ECDE; --muted:rgba(244,236,222,.64); --faint:rgba(244,236,222,.42);
      --line:rgba(244,236,222,.12); --card:rgba(244,236,222,.04);
      --grad:linear-gradient(95deg,var(--wws-pink-deep) 0%,var(--wws-pink) 45%,var(--wws-pink-soft) 100%);
      --cta-fg:#17130E;
      background:var(--bg); color:var(--fg);
      container-type:inline-size; position:relative; overflow:hidden;
    }
    :host([theme=light]){
      --bg:#FBF8F2; --fg:#0F2536; --muted:#3E5468; --faint:#5B7285;
      --line:#E7E0D6; --card:#FFFFFF;
      --grad:linear-gradient(95deg,#C42F66 0%,var(--wws-pink-deep) 50%,var(--wws-pink) 100%);
      --cta-fg:#FFFFFF;
    }
    :host::before{ /* hairline brand rule */
      content:""; position:absolute; inset:0 0 auto 0; height:3px; background:var(--grad);
    }
    .wrap{max-width:1080px;margin:0 auto;padding:44px 28px 22px}
    .top{display:grid;grid-template-columns:1.15fr 1fr auto;gap:40px;align-items:center}
    .brand{display:flex;align-items:center;gap:18px;width:max-content;max-width:100%}
    .brand .mark{width:76px;flex:none;transition:transform .4s cubic-bezier(.3,1.4,.5,1)}
    .brand:hover .mark{transform:rotate(-5deg) translateY(-2px)}
    .eyebrow{
      display:block;font-family:var(--wws-mono);font-size:11px;font-weight:500;
      letter-spacing:.16em;text-transform:uppercase;color:var(--faint);margin-bottom:8px
    }
    .word{
      display:block;font-weight:700;font-size:21px;letter-spacing:.14em;text-transform:uppercase;line-height:1;
      background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;
      white-space:nowrap
    }
    .pitch{margin:0;font-family:var(--wws-display);font-weight:500;font-style:italic;font-size:19px;line-height:1.4;color:var(--fg)}
    .pitch small{display:block;margin-top:8px;font-family:var(--wws-font);font-style:normal;font-size:14px;line-height:1.5;color:var(--muted)}
    .actions{display:flex;flex-direction:column;gap:10px;align-items:stretch}
    .btn{
      display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;
      font-size:14.5px;font-weight:700;padding:12px 20px;border-radius:999px;
      transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease, background-color .2s ease
    }
    .btn-primary{background:var(--wws-pink-soft);color:var(--cta-fg);box-shadow:0 6px 20px -8px rgba(224,98,159,.65)}
    :host([theme=light]) .btn-primary{background:var(--wws-pink-deep)}
    .btn-primary:hover{transform:translateY(-1px);box-shadow:0 10px 26px -8px rgba(224,98,159,.8)}
    .btn-ghost{border:1px solid var(--line);color:var(--fg);background:var(--card)}
    .btn-ghost:hover{border-color:var(--wws-pink)}
    .btn:hover .arrow{transform:translate(2px,-2px)}
    .bottom{
      display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;
      margin-top:36px;padding-top:18px;border-top:1px solid var(--line);
      font-size:13px;color:var(--muted)
    }
    .bottom strong{font-weight:600;color:var(--fg)}
    .nw{white-space:nowrap}
    .links{display:flex;gap:20px;flex-wrap:wrap;list-style:none;margin:0;padding:0}
    .links a{display:inline-flex;align-items:center;gap:6px;transition:color .2s ease}
    .links a:hover{color:var(--wws-pink-soft)}
    :host([theme=light]) .links a:hover{color:var(--wws-pink-deep)}
    .links svg{width:15px;height:15px}

    @container (max-width: 860px){
      .top{grid-template-columns:1fr auto;gap:28px 32px}
      .pitch{grid-column:1 / -1;grid-row:2}
    }
    @container (max-width: 560px){
      .wrap{padding:36px 22px 20px}
      .top{grid-template-columns:1fr;gap:24px}
      .pitch{grid-row:auto}
      .brand .mark{width:60px}
      .word{font-size:17px}
      .actions{flex-direction:row;flex-wrap:wrap}
      .btn{flex:1 1 auto}
      .bottom{flex-direction:column;align-items:flex-start;margin-top:28px}
    }
  `;

  const IG_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor"/></svg>`;
  const MAIL_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`;

  class WWSCredit extends HTMLElement {
    static get observedAttributes() { return ['variant', 'theme', 'align', 'label', 'rel', 'logo']; }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      if (this.getAttribute('fonts') !== 'none') ensureFonts();
      this.render();
    }

    attributeChangedCallback() { if (this.isConnected) this.render(); }

    render() {
      const variant = this.getAttribute('variant') === 'full' ? 'full' : 'badge';
      const rel = esc(this.getAttribute('rel') || 'noopener');
      const logo = esc(this.getAttribute('logo') || LOGO);
      const ext = `target="_blank" rel="${rel}"`;

      if (variant === 'badge') {
        const label = esc(this.getAttribute('label') || 'Designed & built by');
        this.shadowRoot.innerHTML = `
          <style>${BASE_CSS}${BADGE_CSS}</style>
          <a class="badge" href="${esc(utm('badge'))}" ${ext} aria-label="${label} Well Walt Studios (opens in a new tab)">
            <img class="mark" src="${logo}" width="236" height="149" alt="" loading="lazy" decoding="async">
            <span class="text">
              <span class="eyebrow">${label}</span>
              <span class="name">Well Walt Studios ${ARROW}</span>
            </span>
          </a>`;
        return;
      }

      const year = new Date().getFullYear();
      this.shadowRoot.innerHTML = `
        <style>${BASE_CSS}${FULL_CSS}</style>
        <div class="wrap">
          <div class="top">
            <a class="brand" href="${esc(utm('full', 'full-logo'))}" ${ext} aria-label="Well Walt Studios (opens in a new tab)">
              <img class="mark" src="${logo}" width="236" height="149" alt="" loading="lazy" decoding="async">
              <span>
                <span class="eyebrow">Colophon · Site by</span>
                <span class="word">Well Walt Studios</span>
              </span>
            </a>
            <p class="pitch">I build software that brings small businesses more customers.
              <small>Websites, apps &amp; automation from New Orleans. Like this site? Let’s make yours.</small>
            </p>
            <div class="actions">
              <a class="btn btn-primary" href="${BOOK}" ${ext}>Book a free call ${ARROW}</a>
              <a class="btn btn-ghost" href="${esc(utm('full', 'full-work'))}" ${ext}>See my work</a>
            </div>
          </div>
          <div class="bottom">
            <span>This site was designed &amp; built by <strong>Well Walt Studios</strong> <span class="nw">· © ${year}</span></span>
            <ul class="links">
              <li><a href="${esc(utm('full', 'full-site'))}" ${ext}>wellwaltstudios.com</a></li>
              <li><a href="${IG}" ${ext} aria-label="Instagram (opens in a new tab)">${IG_ICON}Instagram</a></li>
              <li><a href="mailto:${EMAIL}">${MAIL_ICON}Email</a></li>
            </ul>
          </div>
        </div>`;
    }
  }

  customElements.define('wws-credit', WWSCredit);
})();
