/**
 * cursor.js
 * Custom cursor — dot follows mouse instantly,
 * ring follows with smooth lag for a weighted feel.
 */

const Cursor = (() => {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  let mouseX = window.innerWidth  / 2;
  let mouseY = window.innerHeight / 2;
  let ringX  = mouseX;
  let ringY  = mouseY;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  }

  function animateRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }

  function expand()   { ring.classList.add('expanded');    }
  function collapse() { ring.classList.remove('expanded'); }

  function init() {
    document.addEventListener('mousemove', onMouseMove);
    animateRing();

    /* Expand ring when hovering interactive elements */
    document.querySelectorAll('.s-img, button, a, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', expand);
      el.addEventListener('mouseleave', collapse);
    });
  }

  return { init, expand, collapse };
})();
