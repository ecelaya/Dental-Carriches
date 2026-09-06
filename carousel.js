const AUTOPLAY_DELAY = 4000;

function initCarousel(carousel) {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  let idx = 0;
  let timer = null;

  function show(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, j) => s.classList.toggle('active', j === idx));
    dots.forEach((d, j) => d.classList.toggle('active', j === idx));
  }

  function stopAutoplay() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  function startAutoplay() {
    stopAutoplay();
    if (slides.length > 1) timer = setInterval(() => show(idx + 1), AUTOPLAY_DELAY);
  }

  function goTo(i) {
    show(i);
    startAutoplay();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(idx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(idx + 1));
  dots.forEach((d, j) => d.addEventListener('click', () => goTo(j)));

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  show(0);
  startAutoplay();

  carousel.carouselGoTo = goTo;
}

document.querySelectorAll('[data-carousel]').forEach(initCarousel);

document.querySelectorAll('[data-sede-btn]').forEach(btn => {
  btn.addEventListener('click', () => {
    const sede = btn.getAttribute('data-sede-btn');
    if (btn.classList.contains('active')) return;
    document.querySelectorAll('[data-sede-btn]').forEach(b => b.classList.toggle('active', b === btn));
    const carousels = document.querySelectorAll('[data-carousel][data-sede]');
    carousels.forEach(c => { c.style.transition = 'opacity .25s ease'; c.style.opacity = '0'; });
    setTimeout(() => {
      carousels.forEach(c => {
        const isTarget = c.getAttribute('data-sede') === sede;
        c.style.display = isTarget ? '' : 'none';
        if (isTarget && c.carouselGoTo) c.carouselGoTo(0);
      });
      requestAnimationFrame(() => {
        carousels.forEach(c => { c.style.opacity = '1'; });
      });
    }, 250);
  });
});
