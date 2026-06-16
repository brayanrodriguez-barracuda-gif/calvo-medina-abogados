document.addEventListener('DOMContentLoaded', () => {

  const sc = document.getElementById('scroll-container');

  /* ── Scroll config ── */
  const TOTAL         = 18000;
  const HERO_END      = 0.05;
  const NOS_START     = 0.07;
  const NOS_END       = 0.18;
  const AREAS_START   = 0.20;
  const AREA_SPAN     = 0.03;
  const N             = 7;
  const CONTACT_START = AREAS_START + N * AREA_SPAN + 0.04;

  document.getElementById('scroll-track').style.height = TOTAL + 'px';

  /* ── Areas data ── */
  const AREAS_DATA = [
    { num:'01', title:'Propiedad Intelectual',
      p1:'Protegemos aquello que hace único tu negocio. Nuestro equipo experto trabaja para salvaguardar tus marcas, diseños industriales, obras y demás activos intangibles, brindándote la seguridad necesaria para innovar y competir en mercados globales.',
      p2:'Acompañamos todo el proceso desde la búsqueda de antecedentes hasta el registro, vigilancia y defensa en procesos de oposición. Diseñamos estrategias personalizadas para la protección frente a infracciones y gestionamos portafolios a nivel nacional e internacional.' },
    { num:'02', title:'Resolución de Conflictos',
      p1:'Defendemos tus intereses con solidez y visión estratégica, ofreciendo soluciones integrales que abarcan desde mecanismos alternativos de resolución de conflictos hasta la representación en litigios complejos en materia civil, comercial y administrativa.',
      p2:'Priorizamos soluciones ágiles mediante negociación, conciliación, mediación y arbitraje, reduciendo costos y tiempos frente al litigio tradicional. También representamos a nuestros clientes en la defensa de sus derechos de propiedad intelectual.' },
    { num:'03', title:'Derecho Contractual',
      p1:'Asesoramos a clientes nacionales e internacionales en la elaboración, negociación e interpretación de contratos de toda naturaleza, asegurando soluciones eficientes, claras y alineadas con sus intereses comerciales.',
      p2:'Garantizamos acuerdos sólidos alineados con la normativa vigente y las mejores prácticas del sector. Nuestra experiencia abarca contratos de licencia, distribución, suministro, maquila y alianzas estratégicas en diversos sectores.' },
    { num:'04', title:'Derecho Corporativo',
      p1:'Acompañamos a las empresas en su crecimiento y consolidación, proporcionando herramientas legales para proteger sus activos y optimizar su estructura societaria. Diseñamos estrategias que permiten a nuestros clientes mantenerse competitivos.',
      p2:'Nuestra práctica corporativa cubre constitución y reorganización de sociedades, fusiones y adquisiciones, due diligence, gobierno corporativo y reestructuraciones empresariales con enfoque orientado a resultados.' },
    { num:'05', title:'Derecho Laboral',
      p1:'Asesoramos a empresas nacionales e internacionales en todos los aspectos del derecho laboral y la seguridad social, gestionando el talento humano con visión legal estratégica. Acompañamos en contratación, relaciones laborales y auditorías.',
      p2:'Representamos a nuestros clientes ante el Ministerio de Trabajo y la UGPP. Brindamos asesoría en pensiones, salud, riesgos laborales y sistemas de gestión de seguridad y salud en el trabajo.' },
    { num:'06', title:'Derecho de Familia',
      p1:'Brindamos acompañamiento integral en la gestión de relaciones familiares y resolución de conflictos, incluyendo asuntos de pareja, hijos y patrimonio, con asesoría en trámites notariales, administrativos y judiciales.',
      p2:'Nuestra práctica familiar abarca capitulaciones matrimoniales, divorcios, custodia y patria potestad, obligaciones alimentarias, sucesiones y testamentos, adopciones y exequátur de sentencias extranjeras.' },
    { num:'07', title:'Derecho Tributario',
      p1:'Ofrecemos asesoría integral en materia tributaria, cambiaria y de planificación patrimonial. Combinamos enfoque técnico con visión estratégica para garantizar el cumplimiento normativo y optimizar cargas fiscales.',
      p2:'Atendemos a empresas, emprendedores y personas naturales en estructuración de obligaciones tributarias, representación ante la DIAN, planeación fiscal nacional e internacional y gestión de disputas tributarias.' },
  ];

  /* ── Helpers ── */
  function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
  function easeOut(t)  { return 1-(1-t)*(1-t); }
  function easeOutCubic(t){ return 1-Math.pow(1-t,3); }

  /* ── DOM refs ── */
  const heroContent = document.getElementById('hero-content');
  const heroCue     = document.getElementById('hero-scroll-cue');
  const nosScr      = document.getElementById('nosotros-screen');
  const areasScr    = document.getElementById('areas-screen');
  const areasGrid   = document.getElementById('areas-grid');
  const conScr      = document.getElementById('contacto-screen');
  const footerEl    = document.getElementById('site-footer');
  const navEl       = document.getElementById('nav');
  const dots        = document.querySelectorAll('.ndot');
  const gridCards   = document.querySelectorAll('.grid-card');

  /* ── Particles ── */
  const cvs = document.getElementById('particles-canvas');
  const px  = cvs.getContext('2d');
  let PW, PH;
  function rsz(){ PW=cvs.width=window.innerWidth; PH=cvs.height=window.innerHeight; }
  rsz(); window.addEventListener('resize', rsz);
  const pts = Array.from({length:55},()=>({
    x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight,
    r:Math.random()*1.3+0.2, vx:(Math.random()-0.5)*0.08,
    vy:-(Math.random()*0.13+0.02), o:Math.random()*0.4+0.08, ph:Math.random()*Math.PI*2
  }));
  (function ap(){
    requestAnimationFrame(ap); px.clearRect(0,0,PW,PH);
    pts.forEach(p=>{
      p.ph+=0.007; p.x+=p.vx; p.y+=p.vy;
      if(p.y<-4)p.y=PH+4; if(p.x<0)p.x=PW; if(p.x>PW)p.x=0;
      const a=p.o*(0.55+0.45*Math.sin(p.ph));
      px.beginPath(); px.arc(p.x,p.y,p.r,0,Math.PI*2);
      px.fillStyle=`rgba(184,149,42,${a.toFixed(3)})`; px.fill();
    });
  })();

  /* ── Accordion ── */
  let activeIndex = -1;
  let clickLocked = false;

  function expandCard(i) {
    activeIndex = i;
    const d = AREAS_DATA[i];
    gridCards.forEach((card, idx) => {
      const content = card.querySelector('.gc-expand-content');
      if (idx === i) {
        card.classList.add('expanded');
        card.style.flex = '4';
        if (content) {
          content.querySelector('.gce-num').textContent   = 'Área ' + d.num;
          content.querySelector('.gce-title').textContent = d.title;
          content.querySelector('.gce-p1').textContent    = d.p1;
          content.querySelector('.gce-p2').textContent    = d.p2;
          content.style.opacity = '1';
        }
      } else {
        card.classList.remove('expanded');
        card.style.flex = '1';
        if (content) content.style.opacity = '0';
      }
    });
  }

  function collapseAll() {
    activeIndex = -1;
    gridCards.forEach(card => {
      card.classList.remove('expanded');
      card.style.flex = '1';
      const content = card.querySelector('.gc-expand-content');
      if (content) content.style.opacity = '0';
    });
  }

  gridCards.forEach((card, i) => {
    card.addEventListener('click', () => {
      clickLocked = true;
      if (activeIndex === i) { collapseAll(); clickLocked = false; }
      else expandCard(i);
    });
  });

  /* ── Navigation ── */
  window.goTo = function(section) {
    const map = { hero:0, nosotros:TOTAL*0.08, areas:TOTAL*0.22, contacto:TOTAL*0.94 };
    sc.scrollTo({ top: map[section] ?? 0, behavior: 'instant' });
    closeMenu();
  };

  window.goToArea = function(i) {
    sc.scrollTo({ top: TOTAL * (AREAS_START + i * AREA_SPAN), behavior: 'instant' });
    setTimeout(() => expandCard(i), 50);
    closeMenu();
  };

  /* ── Menu ── */
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('hamburger').classList.toggle('open');
    document.getElementById('menu-overlay').classList.toggle('open');
  });

  window.closeMenu = function() {
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('menu-overlay').classList.remove('open');
  };

  window.toggleSub = function(e) {
    e.preventDefault();
    document.getElementById('menu-areas-item').classList.toggle('sub-open');
  };

  /* ── Scroll ── */
  function onScroll() {
    const sy   = sc.scrollTop;
    const prog = sy / (TOTAL - window.innerHeight);

    navEl.classList.toggle('scrolled', sy > 60);

    /* Hero */
    const hT = clamp(prog/HERO_END,0,1);
    heroContent.style.opacity   = 1-easeOut(hT);
    heroContent.style.transform = `translateY(${-hT*40}px)`;
    heroCue.style.opacity       = (1-easeOut(hT))*0.6;

    /* Nosotros */
    const nIn  = clamp((prog-NOS_START)/0.05,0,1);
    const nOut = clamp((prog-(NOS_END-0.04))/0.04,0,1);
    const nOp  = easeOutCubic(nIn)*(1-easeOut(nOut));
    nosScr.style.opacity       = nOp;
    nosScr.style.pointerEvents = nOp>0.1?'all':'none';

    /* Areas */
    const aIn  = clamp((prog-(AREAS_START-0.02))/0.03,0,1);
    const aOut = clamp((prog-CONTACT_START)/0.04,0,1);
    areasScr.style.opacity = easeOut(aIn)*(1-easeOut(aOut));
    areasGrid.style.pointerEvents = prog >= AREAS_START-0.02 ? 'all' : 'none';

    /* Scroll accordion */
    if (!clickLocked) {
      let scrollActive = -1;
      for (let i=0; i<N; i++) {
        const start = AREAS_START + i*AREA_SPAN;
        if (prog >= start && prog < start+AREA_SPAN) { scrollActive=i; break; }
      }
      if (scrollActive !== activeIndex) {
        if (scrollActive >= 0) expandCard(scrollActive);
        else collapseAll();
      }
    }

    /* Contacto */
    const cT = clamp((prog-CONTACT_START)/0.05,0,1);
    conScr.style.opacity       = easeOutCubic(cT);
    conScr.style.pointerEvents = cT>0.1?'all':'none';
    footerEl.classList.toggle('visible', cT>0.8);
    if (cT>0.3) { collapseAll(); clickLocked=false; }

    /* Dots */
    let ad=0;
    if (cT>0.1)                      ad=3;
    else if (prog>=AREAS_START-0.02) ad=2;
    else if (prog>=NOS_START)        ad=1;
    dots.forEach((d,i)=>d.classList.toggle('active',i===ad));
  }

  sc.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
});