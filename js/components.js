// ── Load Components (Navbar & Footer)
async function loadComponents() {
  try {
    // Load navbar
    const navResponse = await fetch('/navbar.html');
    if (navResponse.ok) {
      const navHTML = await navResponse.text();
      const navContainer = document.createElement('div');
      navContainer.innerHTML = navHTML;
      document.body.insertBefore(navContainer.firstElementChild, document.body.firstChild);
    }

    // Load footer
    const footerResponse = await fetch('/footer.html');
    if (footerResponse.ok) {
      const footerHTML = await footerResponse.text();
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    // Initialize nav functionality after components are loaded
    initializeNav();
  } catch (error) {
    console.warn('Could not load components:', error);
  }
}

// ── Initialize Nav Functionality
function initializeNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!navbar || !hamburger || !navLinks) return;

  // Nav scroll shadow
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Handle dropdown menus on mobile
  if (window.innerWidth <= 768) {
    navLinks.querySelectorAll('li').forEach(li => {
      const link = li.querySelector('a');
      const dropdown = li.querySelector('.dropdown-menu');
      
      if (dropdown) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          li.classList.toggle('active');
        });
      }
    });
  }
}

// ── Floating Particles (for hero section only)
function initializeParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 60 + 20;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 20 + 14}s;
      animation-delay: ${Math.random() * -25}s;
    `;
    container.appendChild(p);
  }
}

// ── Scroll Reveal Animation
function initializeScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left');
  if (revealEls.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// ── Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadComponents();
  initializeParticles();
  initializeScrollReveal();
});

// Re-initialize scroll reveal if page content changes
const mutationObserver = new MutationObserver(() => {
  initializeScrollReveal();
});

mutationObserver.observe(document.body, { childList: true, subtree: true });
