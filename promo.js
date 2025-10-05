/* promo.js v3 — shared promo slider for all pages */
(function () {
  try {
    // Find mount point; if missing, auto-insert under header
    let mount = document.getElementById('promo-slot');
    if (!mount) {
      const header = document.querySelector('header');
      mount = document.createElement('section');
      mount.id = 'promo-slot';
      mount.className = 'promo-wrap container';
      (header && header.nextElementSibling)
        ? header.parentNode.insertBefore(mount, header.nextElementSibling)
        : document.body.prepend(mount);
    }

    /* -------- Slides (EDIT HERE) -------- */
    const slides = [
      { id:'dhaka-jed', title:'Dhaka → Jeddah Air Ticket', subtitle:'Lowest Price • Book Now', href:'contact.html', img:'public/banners/jedda.jpg', badge:'Hot' },
      { id:'china-visa', title:'China Visa', subtitle:'No Visa • No Fee', href:'contact.html', img:'public/banners/china.jpg', badge:'Visa' },
      { id:'domestic-5', title:'Domestic Air Ticket', subtitle:'Flat 5% Discount', href:'contact.html', img:'public/banners/domestic.jpg', badge:'Deal' },

      // NEW promos you asked for:
      { id:'malaysia-visa', title:'Malaysia Visa', subtitle:'Fast Processing • Tourist / Business', href:'contact.html', img:'public/banners/malaysia.jpg', badge:'New' },
      { id:'hajj-pre', title:'Hajj Pre-Registration', subtitle:'সহজ প্রক্রিয়া • সীমিত আসন', href:'contact.html', img:'public/banners/hajj.jpg', badge:'Hajj' },
      { id:'gamca', title:'GAMCA Medical Slip', subtitle:'Instant e-Slip • Verified', href:'contact.html', img:'public/banners/gamca.jpg', badge:'Work' },
      { id:'one-minute', title:'১ মিনিটে ডেলিভারি', subtitle:'Visa / Slip PDF → WhatsApp', href:'https://api.whatsapp.com/send?phone=8801712055858', img:'public/banners/instant.jpg', badge:'Instant' }
    ];

    // Guard: no slides
    if (!slides.length) return;

    /* -------- Markup -------- */
    mount.innerHTML = `
      <div class="promo" role="region" aria-label="Promotions">
        <button class="promo-nav prev" aria-label="Previous slide"></button>
        <div class="promo-viewport"><div class="promo-track"></div></div>
        <button class="promo-nav next" aria-label="Next slide"></button>
        <div class="promo-dots" role="tablist"></div>
      </div>
    `;

    const track = mount.querySelector('.promo-track');
    const dots  = mount.querySelector('.promo-dots');
    const prevBtn = mount.querySelector('.promo-nav.prev');
    const nextBtn = mount.querySelector('.promo-nav.next');

    // Create slides
    slides.forEach((s, i) => {
      const a = document.createElement('a');
      a.className = 'promo-slide';
      a.href = s.href || '#';
      a.setAttribute('role','tab');
      a.setAttribute('aria-label', s.title);

      const media = (s.img)
        ? `<img src="${s.img}" alt="${s.title}" onerror="this.style.display='none';this.parentNode.innerHTML='<div class=&quot;promo-fallback&quot;></div>'">`
        : `<div class="promo-fallback"></div>`;

      a.innerHTML = `
        <div class="promo-media">${media}</div>
        <div class="promo-content">
          ${s.badge ? `<span class="promo-badge">${s.badge}</span>` : ''}
          <h3 class="promo-title">${s.title}</h3>
          ${s.subtitle ? `<p class="promo-sub">${s.subtitle}</p>` : ''}
          <span class="promo-cta">Learn more →</span>
        </div>
      `;
      track.appendChild(a);

      const d = document.createElement('button');
      d.className = 'promo-dot';
      d.setAttribute('aria-label', `Go to slide ${i+1}`);
      d.addEventListener('click', () => goTo(i));
      dots.appendChild(d);
    });

    /* -------- Behavior -------- */
    let idx = 0, autoTimer = null;
    const total = slides.length;

    function viewportWidth(){
      const vp = mount.querySelector('.promo-viewport');
      return vp ? vp.clientWidth : mount.clientWidth;
    }
    function update(){
      const w = viewportWidth();
      track.style.transform = `translateX(-${idx * w}px)`;
      [...dots.children].forEach((el, i)=>el.classList.toggle('active', i===idx));
    }
    function goTo(i){ idx = (i + total) % total; update(); restartAuto(); }
    function next(){ goTo(idx+1); }
    function prev(){ goTo(idx-1); }

    function startAuto(){ stopAuto(); autoTimer = setInterval(next, 3500); }
    function stopAuto(){ if(autoTimer) clearInterval(autoTimer); autoTimer=null; }
    function restartAuto(){ startAuto(); }

    // Resize observer to keep width synced
    const ro = new ResizeObserver(update);
    ro.observe(mount.querySelector('.promo-viewport'));

    // Pause on hover/focus (desktop / a11y)
    mount.addEventListener('mouseenter', stopAuto);
    mount.addEventListener('mouseleave', startAuto);
    mount.addEventListener('focusin', stopAuto);
    mount.addEventListener('focusout', startAuto);

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    // Hide arrows on mobile (JS fallback; CSS already hides)
    function toggleArrows(){
      const mobile = window.matchMedia('(max-width:768px)').matches;
      prevBtn.style.display = nextBtn.style.display = mobile ? 'none' : 'block';
    }
    toggleArrows(); window.addEventListener('resize', toggleArrows);

    // Init
    goTo(0); startAuto();

  } catch (e) {
    console.error('[promo.js] init error:', e);
  }
})();
