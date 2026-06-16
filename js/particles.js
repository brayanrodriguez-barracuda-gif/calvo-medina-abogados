/**
 * particles.js
 * Ambient floating dust particles rendered on the bg canvas.
 */

const Particles = (() => {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  const cfg    = CM_CONFIG.particles;

  let W = window.innerWidth;
  let H = window.innerHeight;
  let pts = [];

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
  }

  function createParticle() {
    return {
      x:   Math.random() * W,
      y:   Math.random() * H,
      r:   Math.random() * (cfg.maxRadius - cfg.minRadius) + cfg.minRadius,
      vx:  (Math.random() - 0.5) * 0.08,
      vy: -(Math.random() * cfg.speed + 0.02),
      o:   Math.random() * (cfg.maxOpacity - cfg.minOpacity) + cfg.minOpacity,
      phase: Math.random() * Math.PI * 2,
    };
  }

  function build() {
    pts = Array.from({ length: cfg.count }, createParticle);
  }

  function draw() {
    requestAnimationFrame(draw);

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#050504';
    ctx.fillRect(0, 0, W, H);

    pts.forEach(p => {
      p.phase += 0.007;
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -4)  p.y = H + 4;
      if (p.x < 0)   p.x = W;
      if (p.x > W)   p.x = 0;

      const alpha = p.o * (0.55 + 0.45 * Math.sin(p.phase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${cfg.color},${alpha.toFixed(3)})`;
      ctx.fill();
    });
  }

  function init() {
    resize();
    build();
    draw();
    window.addEventListener('resize', resize);
  }

  return { init };
})();
