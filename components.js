/**
 * components.js
 * Fetches nav.html and footer.html and injects them into the page.
 *
 * ── WHEN YOU SWITCH DOMAINS ──────────────────────────────────────────────
 * Change BASE_URL to your custom domain and everything updates automatically.
 * ─────────────────────────────────────────────────────────────────────────
 */
const BASE_URL = 'https://gstadros.github.io/LHC-website-english'; // ← change this when going live

// ── Derive root path from this script's location (works at any subfolder depth)
function getRootPath() {
  const scripts = document.querySelectorAll('script[src]');
  for (const s of scripts) {
    if (s.src.includes('components.js')) {
      return s.src.replace(/components\.js.*$/, '');
    }
  }
  return BASE_URL + '/';
}

async function loadComponent(placeholderId, file) {
  const el = document.getElementById(placeholderId);
  if (!el) return;
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Could not load ${file} (${res.status})`);
    el.innerHTML = await res.text();
  } catch (e) {
    console.error('[components.js]', e);
  }
}

async function initComponents() {
  const root = getRootPath();

  await Promise.all([
    loadComponent('nav-placeholder',    root + 'nav.html'),
    loadComponent('footer-placeholder', root + 'footer.html'),
  ]);

  // ── Nav: scroll shadow ─────────────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Nav: hamburger toggle ──────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  // ── Translate button ───────────────────────────────────────────────────
  const translateBtn = document.getElementById('translateBtn');
  if (translateBtn) {
    const panel = document.createElement('div');
    panel.className = 'translate-panel';
    panel.id = 'translatePanel';
    panel.innerHTML = `
      <h4>🌐 Choose a Language</h4>
      <div class="lang-grid">
        <button class="lang-btn" onclick="doTranslate('en')"><span class="flag">🇨🇦</span> English</button>
        <button class="lang-btn" onclick="doTranslate('fr')"><span class="flag">🇫🇷</span> Français</button>
        <button class="lang-btn" onclick="doTranslate('vi')"><span class="flag">🇻🇳</span> Tiếng Việt</button>
        <button class="lang-btn" onclick="doTranslate('ko')"><span class="flag">🇰🇷</span> 한국어</button>
        <button class="lang-btn" onclick="doTranslate('zh-CN')"><span class="flag">🇨🇳</span> 中文 (简体)</button>
        <button class="lang-btn" onclick="doTranslate('zh-TW')"><span class="flag">🇹🇼</span> 中文 (繁體)</button>
        <button class="lang-btn" onclick="doTranslate('tl')"><span class="flag">🇵🇭</span> Filipino</button>
        <button class="lang-btn" onclick="doTranslate('hi')"><span class="flag">🇮🇳</span> हिन्दी</button>
        <button class="lang-btn" onclick="doTranslate('pa')"><span class="flag">🇮🇳</span> ਪੰਜਾਬੀ</button>
        <button class="lang-btn" onclick="doTranslate('ar')"><span class="flag">🇸🇦</span> العربية</button>
        <button class="lang-btn" onclick="doTranslate('es')"><span class="flag">🇪🇸</span> Español</button>
        <button class="lang-btn" onclick="doTranslate('fa')"><span class="flag">🇮🇷</span> فارسی</button>
      </div>
    `;
    document.body.appendChild(panel);

    translateBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && e.target !== translateBtn) {
        panel.classList.remove('open');
      }
    });
  }
}

window.doTranslate = function(lang) {
  const panel = document.getElementById('translatePanel');
  if (panel) panel.classList.remove('open');

  if (lang === 'en') {
    const iframe = document.querySelector('.goog-te-menu-frame');
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.querySelectorAll('.goog-te-menu2-item span.text').forEach(item => {
        if (item.innerText === 'English') item.click();
      });
    } else {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
      window.location.reload();
    }
    return;
  }

  const hostname = window.location.hostname;
  document.cookie = `googtrans=/en/${lang}; path=/`;
  document.cookie = `googtrans=/en/${lang}; path=/; domain=${hostname}`;

  const select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event('change'));
  } else {
    window.location.reload();
  }
};

document.addEventListener('DOMContentLoaded', initComponents);
