document.documentElement.classList.add('js');

const toggle = document.querySelector('.nav-toggle');
const toggleLabel = document.querySelector('.nav-toggle-label');
const nav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a')];

const closeMenu = () => {
  document.body.classList.remove('nav-open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Open navigation');
  if (toggleLabel) toggleLabel.textContent = 'Menu';
};

toggle?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('nav-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  if (toggleLabel) toggleLabel.textContent = isOpen ? 'Close' : 'Menu';
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.addEventListener('click', (event) => {
  if (document.body.classList.contains('nav-open') && !nav?.contains(event.target) && !toggle?.contains(event.target)) {
    closeMenu();
  }
});

const revealItems = document.querySelectorAll('[data-reveal]');
const pageSections = document.querySelectorAll('main section[id]');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-30% 0px -60%', threshold: 0 });

  pageSections.forEach((section) => sectionObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
