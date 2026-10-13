/* =========================================================
   Theme toggle (applied before paint to avoid flash)
   ========================================================= */
(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = saved || (prefersLight ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
})();

/* =========================================================
   Year in footer
   ========================================================= */
document.getElementById('year').textContent = new Date().getFullYear();

/* =========================================================
   Mobile nav toggle
   ========================================================= */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* =========================================================
   Nav shadow on scroll
   ========================================================= */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* =========================================================
   Scroll reveal
   ========================================================= */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

/* =========================================================
   Project filters
   ========================================================= */
const filters  = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;
    projects.forEach(p => {
      const tags = (p.dataset.tags || '').split(/\s+/);
      const show = filter === 'all' || tags.includes(filter);
      p.classList.toggle('hidden', !show);
    });
  });
});

/* =========================================================
   Theme toggle button
   ========================================================= */
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* Follow OS preference changes (only if user hasn't manually chosen) */
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
  }
});
