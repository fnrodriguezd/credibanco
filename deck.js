// deck.js — Navegación compartida del deck de sustentación
// Teclado (flechas izquierda/derecha) + swipe táctil (deslizar izq/der)

(function () {
  function goTo(id) {
    var el = document.getElementById(id);
    if (el && el.tagName === 'A') {
      window.location.href = el.getAttribute('href');
    }
  }

  // ---------- Teclado ----------
  document.addEventListener('keydown', function (e) {
    var tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (e.key === 'ArrowRight') goTo('nav-next');
    if (e.key === 'ArrowLeft') goTo('nav-back');
  });

  // ---------- Swipe táctil ----------
  var touchStartX = 0;
  var touchStartY = 0;
  var touchStartTarget = null;
  var SWIPE_THRESHOLD = 60;   // distancia mínima horizontal en px
  var SWIPE_RESTRAINT = 80;   // desviación vertical máxima permitida

  document.addEventListener('touchstart', function (e) {
    var t = e.changedTouches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
    touchStartTarget = e.target;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    var tag = touchStartTarget && touchStartTarget.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    var t = e.changedTouches[0];
    var dx = t.clientX - touchStartX;
    var dy = t.clientY - touchStartY;

    if (Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dy) <= SWIPE_RESTRAINT) {
      if (dx < 0) {
        goTo('nav-next');   // deslizar hacia la izquierda → siguiente
      } else {
        goTo('nav-back');   // deslizar hacia la derecha → atrás
      }
    }
  }, { passive: true });
})();
