const ScrollEngine = (() => {
  const sc        = document.getElementById('scroll-container');
  const heroBgImg = document.getElementById('hero-bg-img');
  const hero      = document.getElementById('hero');
  const navEl     = document.getElementById('nav');
  const navDots   = document.getElementById('nav-dots');
  const footer    = document.getElementById('site-footer');
  const dots      = document.querySelectorAll('.ndot');

  const sections = [
    { id: 'nosotros', el: null, triggerAt: 300  },
    { id: 'areas',    el: null, triggerAt: 900  },
    { id: 'contacto', el: null, triggerAt: 1800 },
  ];

  function lerp(a, b, t) { return a + (b - a) * Math.min(1, Math.max(0, t)); }
  function easeOut(t)     { return 1 - (1 - t) * (1 - t); }
  function easeOutCubic(t){ return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3); }

  function onScroll() {
    const y = sc.scrollTop;

    /* Parallax fondo */
    heroBgImg.style.transform = `scale(1.08) translateY(${y * 0.3}px)`;

    /* Hero desaparece */
    const heroT = Math.min(1, y / 300);
    hero.style.opacity   = 1 - easeOut(heroT);
    hero.style.transform = `translateY(${-heroT * 40}px)`;

    /* Nav */
    navEl.classList.toggle('scrolled', y > 60);
    navDots.classList.toggle('visible', y > 100);

    /* Secciones suben */
    sections.forEach((sec, i) => {
      if (!sec.el) return;
      const dist  = y - sec.triggerAt;
      const t     = easeOutCubic(Math.min(1, Math.max(0, dist / 400)));
      const VH    = window.innerHeight;
      sec.el.style.transform = `translateY(${(1 - t) * VH}px)`;
      sec.el.style.opacity   = t;

      if (sec.id === 'areas' && t > 0.5) {
        sec.el.querySelectorAll('.area-card').forEach((card, ci) => {
          const ct = Math.min(1, Math.max(0, (dist - 200 - ci * 60) / 300));
          card.style.opacity   = ct;
          card.style.transform = `translateY(${(1 - ct) * 20}px)`;
        });
      }

      if (sec.id === 'contacto') {
        footer.classList.toggle('visible', t > 0.8);
      }
    });

    /* Dots */
    let active = 0;
    if (y > 1800) active = 3;
    else if (y > 900) active = 2;
    else if (y > 300) active = 1;
    dots.forEach((d, i) => d.classList.toggle('active', i === active));
  }

  function init() {
    sections.forEach(s => { s.el = document.getElementById(s.id); });
    sc.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    document.getElementById('nav-contact')?.addEventListener('click', () => {
      sc.scrollTo({ top: 1800, behavior: 'smooth' });
    });
    dots.forEach(dot => {
      const targets = { hero: 0, nosotros: 300, areas: 900, contacto: 1800 };
      dot.addEventListener('click', () => {
        sc.scrollTo({ top: targets[dot.dataset.sec] ?? 0, behavior: 'smooth' });
      });
    });
    document.querySelectorAll('#menu-list a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const targets = { nosotros: 300, areas: 900, contacto: 1800 };
        const id = a.getAttribute('href').replace('#', '');
        document.getElementById('menu-overlay').classList.remove('open');
        document.getElementById('hamburger').classList.remove('open');
        setTimeout(() => sc.scrollTo({ top: targets[id] ?? 0, behavior: 'smooth' }), 300);
      });
    });
  }

  return { init };
})();