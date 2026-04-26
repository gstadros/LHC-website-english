/**
 * LHC Components - Refactored for Injection
 * Single source of truth for navbar and footer
 * Updated: April 25, 2026
 */

// ===== NAVBAR INJECTION =====
function loadNavbar() {
  const navbarHTML = `
    <nav id="navbar" class="navbar">
      <div class="nav-container">
        <a href="/" class="logo">
          <img src="/LHC_logo_transparent.png" alt="LHC Logo" class="navbar-logo">
        </a>
        <button class="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul class="nav-menu" id="nav-menu">
          <li><a href="/index.html">Home</a></li>
          <li><a href="/liver-health-basics/index.html">Liver Health Basics</a></li>
          <li><a href="/diet-and-liver-health/index.html">Diet & Liver Health</a></li>
          <li><a href="/community-events-outreach/index.html">Events & Outreach</a></li>
          <li><a href="/our-partners/index.html">Our Partners</a></li>
          <li><a href="/our-team/index.html">Our Team</a></li>
          <li><a href="/pathways-to-care/index.html">Pathways to Care</a></li>
          <li><a href="/contact-us/index.html">Contact Us</a></li>
        </ul>
      </div>
    </nav>

    <!-- Translation Panel -->
    <div id="google_translate_element" style="position: absolute; top: 10px; right: 10px;"></div>
    <script type="text/javascript">
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
      }
    </script>
    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
  `;
  
  const container = document.getElementById('navbar-container');
  if (container) {
    container.innerHTML = navbarHTML;
    
    // Initialize hamburger menu functionality
    initializeHamburgerMenu();
    // Initialize scroll-based navbar styling
    initializeNavbarScroll();
  }
}

// ===== FOOTER INJECTION =====
function loadFooter() {
  const footerHTML = `
    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h3>About LHC</h3>
          <p>Liver Health Connect is dedicated to promoting liver health awareness and education worldwide.</p>
        </div>
        
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/index.html">Home</a></li>
            <li><a href="/liver-health-basics/index.html">Liver Health Basics</a></li>
            <li><a href="/diet-and-liver-health/index.html">Diet & Liver Health</a></li>
            <li><a href="/our-partners/index.html">Our Partners</a></li>
            <li><a href="/contact-us/index.html">Contact Us</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Connect With Us</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Disclaimer</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 Liver Health Connect. All rights reserved.</p>
      </div>
    </footer>
  `;
  
  const container = document.getElementById('footer-container');
  if (container) {
    container.innerHTML = footerHTML;
  }
}

// ===== HAMBURGER MENU INITIALIZATION =====
function initializeHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }
}

// ===== NAVBAR SCROLL STYLING =====
function initializeNavbarScroll() {
  const navbar = document.getElementById('navbar');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
  loadNavbar();
  loadFooter();
  
  // Initialize scroll reveal animations if ScrollReveal library is loaded
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true
    });
    
    sr.reveal('.scroll-reveal', {
      interval: 200
    });
  }
});

// ===== UTILITY FUNCTIONS =====

/**
 * Smooth scroll navigation
 */
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Active navigation link highlighting
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// Call setActiveNavLink after navbar is loaded
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(setActiveNavLink, 100);
});
