/* promo.js v6 — text-only shared promo slider with LocalStorage */
(function () {
  const KEY = 'ifaz_promos_v1';
  const FALLBACK = [
    { title:'Dhaka → Jeddah Air Ticket',  subtitle:'Lowest Price • Book Now',       href:'contact.html', badge:'Hot',    theme:'sky'   },
    { title:'China Visa',                  subtitle:'No Visa • No Fee',             href:'contact.html', badge:'Visa',   theme:'rose'  },
    { title:'Domestic Air Ticket',         subtitle:'Flat 5% Discount',             href:'contact.html', badge:'Deal',   theme:'amber' },
    { title:'Malaysia Visa',               subtitle:'Fast Processing • Tourist / Business', href:'contact.html', badge:'New',   theme:'green' },
    { title:'Hajj Pre-Registration',       subtitle:'সহজ প্রক্রিয়া • সীমিত আসন',    href:'contact.html', badge:'Hajj',  theme:'blue'  },
    { title:'GAMCA Medical Slip',          subtitle:'Instant e-Slip • Verified',    href:'contact.html', badge:'Work',  theme:'lime'  },
    { title:'১ মিনিটে ডেলিভারি',           subtitle:'Visa / Slip PDF → WhatsApp',  href:'https://api.whatsapp.com/send?phone=8801712055858', badge:'Instant', theme:'sky' }
  ];

  function getPromos(){
    try{
      const x = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(x) && x.length ? x : FALLBACK;
    }catch(e){ return FALLBACK; }
  }

  const SLIDES = getPromos();

  function init() {
    // avoid double
    if (document.documentElement.dataset.promoInited) return;
    document.documentElement.dataset.promoInited = '1';

    let mount = document.getElementById('promo-slot');
    if (!mount) {
      const header = document.querySelector('header');
      mount = document.createElement('section');
      mount.id = 'promo-slot';
      mount.className = 'promo-wrap container';
      if (header && header.parentNode) {
        header.parentNode.insertBefore(mount, header.nextElementSibling);
      } else {
        document.body.prepend(mount);
      }
    }

    if (!SLIDES.length) return;

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

    SLIDES.forEach((s, i) => {
      const a = document.createElement('a');
      a.className = `promo-slide theme-${s.theme || 'blue'}`;
      a.href = s.href || '#';
      a.innerHTML = `
        <div class="promo-content">
          ${s.badge ? `<span class="promo-badge">${s.badge}</span>` : ''}
          <h3 class="promo-title">${s.title || ''}</h3>
          ${s.subtitle ? `<p class="promo-sub">${s.subtitle}</p>` : ''}
          <span class="promo-cta">Learn more →</span>
        </div>
      `;
      track.appendChild(a);

      const d = document.createElement('button');
      d.className = 'promo-dot';
      d.addEventListener('click', () => goTo(i));
      dots.appendChild(d);
    });

    let idx = 0, timer = null;
    function vpWidth() {
      const vp = mount.querySelector('.promo-viewport');
      return vp ? vp.clientWidth : mount.clientWidth;
    }
    function update(){
      const w = vpWidth();
      track.style.transform = `translateX(-${idx * w}px)`;
      [...dots.children].forEach((el, i)=> el.classList.toggle('active', i===idx));
    }
    function goTo(i){ idx = (i+SLIDES.length)%SLIDES.length; update(); restart(); }
    function next(){ goTo(idx+1) }
    function prev(){ goTo(idx-1) }

    function start(){ stop(); timer = setInterval(next, 3500) }
    function stop(){ if(timer) clearInterval(timer); timer = null }
    function restart(){ start() }

    const ro = new ResizeObserver(update);
    ro.observe(mount.querySelector('.promo-viewport'));
    setTimeout(update,0); setTimeout(update,150);

    mount.addEventListener('mouseenter', stop);
    mount.addEventListener('mouseleave', start);
    mount.addEventListener('focusin', stop);
    mount.addEventListener('focusout', start);

    prevBt.addEventListener('click', prev);
    nextBt.addEventListener('click', next);

    function toggleArrows(){
      const mobile = matchMedia('(max-width:768px)').matches;
      prevBt.style.display = nextBt.style.display = mobile ? 'none' : 'block';
    }
    toggleArrows(); addEventListener('resize', toggleArrows);

    goTo(0); start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else { init(); }
})();
