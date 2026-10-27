/**
 * F&H Fitness & Health - PWA & Standalone Navigation Engine
 * Prevents iOS Safari & Android from breaking out of standalone installed app mode
 * into external browser views with top URL bars.
 */
(function() {
  'use strict';

  // Detect if running inside standalone PWA / Home Screen container
  function isStandaloneApp() {
    return (('standalone' in window.navigator) && Boolean(window.navigator.standalone)) ||
           (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
           (window.matchMedia && window.matchMedia('(display-mode: fullscreen)').matches) ||
           (window.matchMedia && window.matchMedia('(display-mode: minimal-ui)').matches) ||
           (document.referrer.includes('android-app://'));
  }

  if (isStandaloneApp()) {
    document.documentElement.classList.add('is-standalone-pwa');
    if (document.body) document.body.classList.add('is-standalone-pwa');
  }

  // Intercept internal link clicks in standalone mode so navigation stays strictly inside the app view
  document.addEventListener('click', function(e) {
    if (e.defaultPrevented) return;

    var el = e.target;
    while (el && el.nodeName !== 'A' && el.nodeName !== 'HTML') {
      el = el.parentNode;
    }
    if (!el || el.nodeName !== 'A') return;

    var href = el.getAttribute('href');
    if (!href) return;

    // Ignore hash-only anchors, javascript triggers, tel, mailto
    if (href === '#' || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return;
    }

    // Ignore search, login/register modals, cart actions
    if (el.hasAttribute('data-action') ||
        el.hasAttribute('data-search-mobile') ||
        el.hasAttribute('data-search-desk') ||
        el.closest('[data-search-mobile], [data-search-desk], [data-close-search], predictive-search')) {
      return;
    }

    // Resolve full target URL
    var targetUrl;
    try {
      targetUrl = new URL(el.href, window.location.href);
    } catch (err) {
      return;
    }

    // Only handle internal navigation within the app origin
    var isInternal = (targetUrl.origin === window.location.origin);
    if (!isInternal) return;

    // In standalone / installed web app mode:
    // Calling preventDefault() stops WebKit from launching Safari,
    // and setting window.location.href loads the destination page inside the standalone container without a top URL bar!
    if (isStandaloneApp()) {
      e.preventDefault();
      window.location.href = el.href;
    }
  }, false);

  // Register Service Worker with path adapted to current directory depth
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      var pathname = window.location.pathname;
      var swPath = './sw.js';
      if (pathname.includes('/collections/products/')) {
        swPath = '../../sw.js';
      } else if (pathname.includes('/collections/') || pathname.includes('/products/')) {
        swPath = '../sw.js';
      }
      navigator.serviceWorker.register(swPath).catch(function() {});
    });
  }
})();
