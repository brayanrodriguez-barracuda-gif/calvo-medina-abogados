/**
 * textures.js
 * Procedurally generates atmospheric color-field textures
 * for each practice area scene canvas.
 *
 * When real photography is available, replace this module:
 * just set each .s-canvas as an <img> or CSS background-image.
 */

const Textures = (() => {

  function paintScene(canvas, palette) {
    canvas.width  = 900;
    canvas.height = 580;
    const ctx = canvas.getContext('2d');

    /* Base fill — darkest tone */
    const [r0, g0, b0] = palette[0];
    ctx.fillStyle = `rgb(${r0},${g0},${b0})`;
    ctx.fillRect(0, 0, 900, 580);

    /* Large soft gradient blobs */
    for (let j = 0; j < 8; j++) {
      const col = palette[Math.min(j + 1, palette.length - 1)];
      const cx  = 100 + Math.random() * 700;
      const cy  = 80  + Math.random() * 420;
      const rad = 100 + Math.random() * 220;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      grd.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},0.5)`);
      grd.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 900, 580);
    }

    /* Small detail sparkles */
    for (let k = 0; k < 25; k++) {
      const col = palette[Math.floor(Math.random() * palette.length)];
      const px  = Math.random() * 900;
      const py  = Math.random() * 580;
      const pr  = Math.random() * 40 + 8;
      const g2  = ctx.createRadialGradient(px, py, 0, px, py, pr);
      g2.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},0.18)`);
      g2.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fill();
    }

    /* Bottom fade to dark for text legibility */
    const gBot = ctx.createLinearGradient(0, 260, 0, 580);
    gBot.addColorStop(0, `rgba(${r0},${g0},${b0},0)`);
    gBot.addColorStop(1, `rgba(${r0},${g0},${b0},0.92)`);
    ctx.fillStyle = gBot;
    ctx.fillRect(0, 0, 900, 580);
  }

  function init() {
    const canvases  = document.querySelectorAll('.s-canvas');
    const palettes  = CM_CONFIG.palettes;

    canvases.forEach((canvas, i) => {
      if (palettes[i]) paintScene(canvas, palettes[i]);
    });
  }

  return { init };
})();
