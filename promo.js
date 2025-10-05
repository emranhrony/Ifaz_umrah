/* promo.js v4 — text-only shared promo slider */
(function () {
  try {
    // Mount খুঁজে না পেলে হেডারের নিচে অটো-ইনজেক্ট
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

    /* -------- Slides (TEXT ONLY) --------
       title, subtitle, href, badge, theme (blue/green/rose/amber/sky/lime)
    */
    const slides = [
      { id:'dhaka-jed',   title:'Dhaka → Riyad Air Ticket',  subtitle:'Lowest Price • Book Now', href:'contact.html', badge:'Hot',     theme:'sky'   },
      { id:'china-visa',  title:'China Business Visa',                  subtitle:'No Visa • No Fee'subtitle:'12000 Taka Only',       href:'contact.html', badge:'Visa',    theme:'rose'  },
      { id:'domestic-5',  title:'Domestic Air Ticket',         subtitle:'Flat 5% Discount',       href:'contact.html', badge:'Deal',    theme:'amber' },

      { id:'malaysia',    title:'Malaysia Single/Multiple Visit Visa',               subtitle:'Fast Processing • Tourist / Business', href:'contact.html', badge:'New',   theme:'green' },
      { id:'hajj-pre',    title:'Hajj Pre-Registration চলছে.....',       subtitle:'সহজ প্রক্রিয়া • সীমিত আসন',          href:'contact.html', badge:'Hajj',  theme:'blue'  },
      { id:'gamca',       title:'GAMCA Medical Slip',          subtitle:'Instant e-Slip • Verified',             href:'contact.html', badge:'Work',  theme:'lime'  },
      { id:'one-minute',  title:'কাতার ম্যানপাওয়ার',           subtitle:'Attached/Non-Atteched → WhatsApp',           href:'https://api.whatsapp.com/send?phone=8801712055858', badge:'Instant', theme:'sky' }
    ];
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

    const track  = mount.querySelector('.promo-track');
    const dots   = mount.querySelector('.promo-dots');
    const prevBt = mount.querySelector('.promo-nav.prev');
    const nextBt = mount.querySelector('.promo-nav.next');

    // Create text-only slides
    slides.forEach((s, i) => {
      const a = document.createElement('a');
      a.className = `promo-slide theme-${s.theme || 'blue'}`;
      a.href = s.href || '#';
      a.setAttribute('role','tab');
      a.setAttribute('aria-label', s.title);

      a.innerHTML = `
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

    prevBt.addEventListener('click', prev);
    nextBt.addEventListener('click', next);

    // Hide arrows on mobile (JS fallback; CSS already hides)
    function toggleArrows(){
      const mobile = window.matchMedia('(max-width:768px)').matches;
      prevBt.style.display = nextBt.style.display = mobile ? 'none' : 'block';
    }
    toggleArrows(); window.addEventListener('resize', toggleArrows);

    // Init
    goTo(0); startAuto();

  } catch (e) {
    console.error('[promo.js] init error:', e);
  }
})();
