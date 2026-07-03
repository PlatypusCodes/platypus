const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const cards = document.querySelectorAll('.trait-card');
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), index * 90);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  cards.forEach((card) => observer.observe(card));
} else {
  cards.forEach((card) => card.classList.add('in-view'));
}

const mascot = document.getElementById('heroMascot');
const hero = document.getElementById('hero');
if (mascot && hero && !prefersReducedMotion) {
  hero.addEventListener('mousemove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mascot.style.transform = `rotate(${x * 6}deg) translate(${x * 10}px, ${y * 10}px)`;
  });
  hero.addEventListener('mouseleave', () => {
    mascot.style.transform = 'rotate(0deg) translate(0, 0)';
  });
}
