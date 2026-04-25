// ── NAV SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// ── SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => io.observe(el));

// ── TRANSLATE PANEL
const translateBtn = document.getElementById('translateBtn');

// Inject the panel HTML into the page
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

// Toggle panel open/close
translateBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  panel.classList.toggle('open');
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
  if (!panel.contains(e.target) && e.target !== translateBtn) {
    panel.classList.remove('open');
  }
});

// Trigger Google Translate programmatically
function doTranslate(lang) {
  panel.classList.remove('open');

  if (lang === 'en') {
    // Reset to English
    const iframe = document.querySelector('.goog-te-menu-frame');
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const items = doc.querySelectorAll('.goog-te-menu2-item span.text');
      items.forEach(item => {
        if (item.innerText === 'English') item.click();
      });
    } else {
      // fallback: reload without translate cookie
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
      window.location.reload();
    }
    return;
  }

  // Set the Google Translate cookie and reload
  const hostname = window.location.hostname;
  document.cookie = `googtrans=/en/${lang}; path=/`;
  document.cookie = `googtrans=/en/${lang}; path=/; domain=${hostname}`;

  // Use the hidden Google Translate select element
  const select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event('change'));
  } else {
    window.location.reload();
  }
}
