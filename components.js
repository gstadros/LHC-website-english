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

}

document.addEventListener('DOMContentLoaded', initComponents);
