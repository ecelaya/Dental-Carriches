document.addEventListener('click', function(e) {
  document.querySelectorAll('.header-cta-wrap[open]').forEach(function(d) {
    if (!d.contains(e.target)) d.removeAttribute('open');
  });
});
