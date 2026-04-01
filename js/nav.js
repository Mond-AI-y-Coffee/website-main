(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var links  = document.getElementById('nav-links');
  var nav    = document.querySelector('.site-nav');

  if (!toggle || !links) return;

  function openMenu() {
    links.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    nav.classList.add('site-nav--open');
  }

  function closeMenu() {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    nav.classList.remove('site-nav--open');
  }

  toggle.addEventListener('click', function () {
    toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  // Close on link click (covers same-page anchors too)
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });

  // Escape key closes menu and returns focus to toggle
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });

  // Reset if viewport grows past mobile breakpoint (e.g. rotate to landscape)
  var mq = window.matchMedia('(max-width: 600px)');
  var handler = function (e) { if (!e.matches) closeMenu(); };
  mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);

}());
