/* ============================================================
   Gurí Cafetería — interacción y animación
   ============================================================ */
(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav-menu');

  /* ---- Sombra del header al hacer scroll ---- */
  function onScroll() {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Menú móvil ---- */
  function closeNav() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  }
  function openNav() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
  }

  toggle.addEventListener('click', function () {
    if (nav.classList.contains('open')) closeNav();
    else openNav();
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  document.addEventListener('click', function (e) {
    if (!nav.classList.contains('open')) return;
    if (e.target.closest('#nav-menu') || e.target.closest('#nav-toggle')) return;
    closeNav();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeNav();
  });

  /* ---- Aparición de secciones al hacer scroll ---- */
  var revealables = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---- Nosotros: cada box cambia de foto al azar, con fundidos lentos ---- */
  var ngBoxes = Array.prototype.slice.call(document.querySelectorAll('.nosotros-gallery .ng-box'));
  if (ngBoxes.length && !reduceMotion) {
    var rand = function (min, max) { return min + Math.random() * (max - min); };

    ngBoxes.forEach(function (box) {
      var imgs = Array.prototype.slice.call(box.querySelectorAll('img'));
      if (imgs.length < 2) return;
      var idx = 0;
      imgs.forEach(function (im, j) { im.classList.toggle('is-active', j === 0); });

      function tick() {
        var next = idx;
        while (next === idx) { next = Math.floor(Math.random() * imgs.length); }
        imgs[idx].classList.remove('is-active');
        imgs[next].classList.add('is-active');
        idx = next;
        window.setTimeout(tick, rand(5000, 10000));
      }

      window.setTimeout(tick, rand(2000, 6500));
    });
  }

  /* ---- Reseñas: una opinión visible por vez ---- */
  var reviewCards = Array.prototype.slice.call(document.querySelectorAll('.review-card'));
  if (reviewCards.length > 1 && !reduceMotion) {
    var activeReview = 0;
    window.setInterval(function () {
      reviewCards[activeReview].classList.remove('is-active');
      activeReview = (activeReview + 1) % reviewCards.length;
      reviewCards[activeReview].classList.add('is-active');
    }, 7000);
  }

  /* ---- Año actual en el footer ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
