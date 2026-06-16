/**
 * scenes.js
 * Handles scene setup. Real background image is set via CSS.
 * If per-scene images are added later, swap them here.
 */
const Scenes = (() => {
  function init() {
    /* Nothing to paint — CSS handles the background image.
       When you have per-area photos, load them here:
       document.querySelectorAll('.s-img').forEach((el, i) => {
         el.style.backgroundImage = `url('assets/images/area-${i}.jpg')`;
       });
    */
  }
  return { init };
})();
