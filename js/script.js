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

  /* ---- Logo del hero: se achica al scrollear hasta anclarse en el header ---- */
  var heroLogo = document.querySelector('.hero-logo');
  var logoSlot = document.querySelector('.hero-logo-slot');
  var logoTarget = document.querySelector('.brand-logo');

  if (heroLogo && logoSlot && logoTarget) {
    document.documentElement.classList.add('logo-dock');
    // Fuera del hero para que ningún transform de .reveal afecte al position:fixed
    document.body.appendChild(heroLogo);

    var logoTicking = false;

    function placeLogo() {
      logoTicking = false;
      var from = logoSlot.getBoundingClientRect();
      var to = logoTarget.getBoundingClientRect();
      if (!from.width) return;

      // 0 arriba de todo; 1 cuando el hueco del logo queda tapado por el header
      var end = Math.max(1, from.bottom + window.scrollY - header.offsetHeight);
      var p = Math.min(1, Math.max(0, window.scrollY / end));
      var e = p * p * (3 - 2 * p);

      var x = from.left + (to.left - from.left) * e;
      var y = from.top + (to.top - from.top) * e;
      var scale = (from.width + (to.width - from.width) * e) / from.width;

      heroLogo.style.width = from.width + 'px';
      heroLogo.style.height = from.width + 'px';
      heroLogo.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')';
      heroLogo.classList.toggle('is-moving', p > 0);
      heroLogo.classList.toggle('is-docked', p >= 1);
    }

    function requestPlaceLogo() {
      if (!logoTicking) {
        logoTicking = true;
        window.requestAnimationFrame(placeLogo);
      }
    }

    placeLogo();
    window.addEventListener('scroll', requestPlaceLogo, { passive: true });
    window.addEventListener('resize', requestPlaceLogo);
    window.addEventListener('load', requestPlaceLogo);
    // Seguir al bloque de texto mientras hace su animación de entrada
    var heroCopy = logoSlot.closest('.hero-copy');
    if (heroCopy) heroCopy.addEventListener('transitionend', requestPlaceLogo);
    var followUntil = Date.now() + 1000;
    (function follow() {
      placeLogo();
      if (Date.now() < followUntil) window.requestAnimationFrame(follow);
    })();
  }

  /* ---- Menú móvil ---- */
  function closeNav() {
    header.classList.remove('nav-open');
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  }
  function openNav() {
    header.classList.add('nav-open');
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
