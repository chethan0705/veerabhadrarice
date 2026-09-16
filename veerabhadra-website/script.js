// ============================================================
//  VEERABHADRA RICE DISTRIBUTORS — WEBSITE SCRIPTS
// ============================================================

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- Mobile hamburger ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  hamburger.classList.toggle('active');
  if (hamburger.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

/* ---- Scroll reveal ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children within the same parent
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

// Stagger cards within grids
function staggerReveal(selector, delay = 80) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.dataset.delay = i * delay;
  });
}

staggerReveal('.service-card',  100);
staggerReveal('.rice-card',     100);
staggerReveal('.customer-card', 90);
staggerReveal('.process-step',  80);
staggerReveal('.value-item',    60);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active-nav', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

/* ---- Add active-nav style dynamically ---- */
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active-nav {
    color: var(--gold) !important;
    border-bottom: 2px solid var(--gold);
  }
`;
document.head.appendChild(style);

/* ---- Smooth parallax on hero ---- */
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const offset = window.scrollY;
    hero.style.backgroundPositionY = `calc(center + ${offset * 0.3}px)`;
  }
});

/* ---- Counter animation (placeholder for future stats) ---- */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}

/* ---- Lazy image fallback ---- */
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    // For the hero logo specifically, show a styled SVG fallback
    if (img.id === 'heroLogoImg') {
      img.style.display = 'none';
      const fallback = document.createElement('div');
      fallback.className = 'hero-logo-ring';
      fallback.innerHTML = '<span class="hero-v">V</span><span class="hero-leaf-l">🌿</span><span class="hero-leaf-r">🌾</span>';
      img.parentNode.appendChild(fallback);
      return;
    }
    // For nav logo
    if (img.classList.contains('nav-logo-img')) {
      img.style.display = 'none';
      return;
    }
    // For other images, replace with a styled placeholder
    img.style.background = 'linear-gradient(135deg, #C8922A20, #2D6A2D20)';
    img.style.minHeight  = '150px';
    img.removeAttribute('src');
  });
});

console.log('🌾 Veerabhadra Rice Distributors — Website loaded');
