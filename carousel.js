function initCarousel(carousel) {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  let idx = 0;

  function show(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, j) => s.classList.toggle('active', j === idx));
    dots.forEach((d, j) => d.classList.toggle('active', j === idx));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => show(idx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => show(idx + 1));
  dots.forEach((d, j) => d.addEventListener('click', () => show(j)));

  show(0);
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
        c.style.display = c.getAttribute('data-sede') === sede ? '' : 'none';
      });
      requestAnimationFrame(() => {
        carousels.forEach(c => { c.style.opacity = '1'; });
      });
    }, 250);
  });
});
