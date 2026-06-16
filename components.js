/**
 * components.js
 * Fetches nav.html and footer.html and injects them into the page.
 */
const BASE_URL = 'https://www.liverhealthconnect.com';

// ── Google Analytics 4 ────────────────────────────────────────────────────
(function() {
  const s1 = document.createElement('script');
  s1.async = true;
  s1.src = 'https://www.googletagmanager.com/gtag/js?id=G-M4HPXH7NMH';
  document.head.appendChild(s1);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-M4HPXH7NMH');
})();

// ── Derive root path from this script's location ──────────────────────────
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

  // ── Dropdown: JS-controlled with close delay ───────────────────────────
  const menuItems = document.querySelectorAll('.nav-links > li');
  menuItems.forEach(li => {
    const dropdown = li.querySelector('.dropdown');
    if (!dropdown) return;

    let closeTimer = null;

    const openDropdown = () => {
      clearTimeout(closeTimer);
      document.querySelectorAll('.nav-links > li .dropdown.open').forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });
      dropdown.classList.add('open');
    };

    const scheduleClose = () => {
      closeTimer = setTimeout(() => {
        dropdown.classList.remove('open');
      }, 150);
    };

    li.addEventListener('mouseenter', openDropdown);
    li.addEventListener('mouseleave', scheduleClose);
    dropdown.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    dropdown.addEventListener('mouseleave', scheduleClose);
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links')) {
      document.querySelectorAll('.nav-links > li .dropdown.open')
        .forEach(d => d.classList.remove('open'));
    }
  });
}

document.addEventListener('DOMContentLoaded', initComponents);
