import './style.css';

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

// ===== Mobile Menu Toggle =====
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  mobileToggle.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    mobileToggle.classList.remove('active');
  });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 200;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[data-section="${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounters() {
  if (counterAnimated) return;
  const statsEl = document.getElementById('hero-stats');
  if (!statsEl) return;
  const rect = statsEl.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    counterAnimated = true;
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      const duration = 2000;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }
}
window.addEventListener('scroll', animateCounters);
animateCounters();

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll(
  '.about-content, .about-image, .product-card, .process-step, .contact-content, .contact-visual, .section-header'
);
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Testimonials Slider =====
const track = document.getElementById('testimonial-track');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('slider-prev');
const nextBtn = document.getElementById('slider-next');
let currentSlide = 0;
const totalSlides = dots.length;

function goToSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
dots.forEach(dot => {
  dot.addEventListener('click', () => goToSlide(+dot.dataset.index));
});

// Auto-slide every 5 seconds
setInterval(() => goToSlide(currentSlide + 1), 5000);

// ===== Back to Top =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Newsletter Form =====
const form = document.getElementById('newsletter-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('email-input');
  const btn = document.getElementById('subscribe-btn');
  btn.textContent = '✓ Subscribed!';
  btn.style.background = 'linear-gradient(135deg, #2dd4a8, #20b090)';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 3000);
});

// ===== Smooth scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== Hero Particles =====
const particlesContainer = document.getElementById('hero-particles');
if (particlesContainer) {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position:absolute;
      width:${Math.random() * 4 + 2}px;
      height:${Math.random() * 4 + 2}px;
      background:rgba(255,107,43,${Math.random() * 0.3 + 0.1});
      border-radius:50%;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation:float ${Math.random() * 6 + 4}s ${Math.random() * 3}s ease-in-out infinite;
    `;
    particlesContainer.appendChild(particle);
  }
}
