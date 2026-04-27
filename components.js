/**
 * components.js
 * Fetches nav.html and footer.html and injects them into the page.
 * Also re-runs any nav behaviour (scroll shadow, hamburger) after injection.
 */

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
  // Load nav and footer in parallel
  await Promise.all([
    loadComponent('nav-placeholder',    './nav.html'),
    loadComponent('footer-placeholder', './footer.html'),
  ]);

  // ── Nav: scroll shadow ───────────────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Nav: hamburger toggle ────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
}

document.addEventListener('DOMContentLoaded', initComponents);
