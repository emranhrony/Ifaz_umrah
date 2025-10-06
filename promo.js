/* promo.js v6 — text-only shared promo slider (robust init) */
(function () {
  const SLIDES = [
    { id:'dhaka-jed',  title:'Dhaka → Riyad Air Ticket',  subtitle:'Lowest Price • Book Now', href:'contact.html', badge:'Hot',    theme:'sky'   },
    { id:'china-visa', title:'China Business Visa',                  subtitle:'No Visa • No Fee',       href:'contact.html', badge:'Visa',   theme:'rose'  },
    { id:'domestic-5', title:'Domestic Air Ticket',         subtitle:'Flat 5% Discount',       href:'contact.html', badge:'Deal',   theme:'amber' },
    { id:'malaysia',   title:'Malaysia Single/Multiple Visa',               subtitle:'Fast Processing • Tourist / Business', href:'contact.html', badge:'New',   theme:'green' },
    { id:'hajj-pre',   title:'Hajj Pre-Registration',       subtitle:'সহজ প্রক্রিয়া • সীমিত আসন',          href:'contact.html', badge:'Hajj',  theme:'blue'  },
    { id:'gamca',      title:'GAMCA Medical Slip',          subtitle:'Instant e-Slip • Verified',             href:'contact.html', badge:'Work',  theme:'lime'  },
    { id:'one-minute', title:'Qatar, Dubai, Saudi Arabaia, Manpower',           subtitle:'Visa / Slip PDF → WhatsApp',           href:'https://api.whatsapp.com/send?phone=8801712055858', badge:'Instant', theme:'sky' }
  ];

  function init() {
    // ডাবল-ইনিট আটকাতে
    if (document.documentElement.dataset.promoInited) return;
    document.documentElement.dataset.promoInited = '1';

    // মাউন্ট পয়েন্ট না পেলে হেডারের নিচে বানিয়ে দিন
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

    // মার্কআপ
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

    // স্লাইড DOM
    SLIDES.forEach((s, i) => {
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

    // বিহেভিয়ার
    let idx = 0, autoTimer = null;
    const total = SLIDES.length;

    function vpWidth() {
      const vp = mount.querySelector('.promo-viewport');
      return vp ? vp.clientWidth : mount.clientWidth;
    }
    function update() {
      const w = vpWidth();
      track.style.transform = `translateX(-${idx * w}px)`;
      [...dots.children].forEach((el, i) => el.classList.toggle('active', i === idx));
    }
    function goTo(i) { idx = (i + total) % total; update(); restartAuto(); }
    function next()  { goTo(idx + 1); }
    function prev()  { goTo(idx - 1); }

    function startAuto() { stopAuto(); autoTimer = setInterval(next, 3500); }
    function stopAuto()  { if (autoTimer) clearInterval(autoTimer); autoTimer = null; }
    function restartAuto(){ startAuto(); }

    // রিসাইজ অবজারভার + সেফ টাইমআউট (ফন্ট/লেআউট রিফ্লোর পরে)
    const ro = new ResizeObserver(() => update());
    ro.observe(mount.querySelector('.promo-viewport'));
    setTimeout(update, 0);
    setTimeout(update, 150);

    // হোভার/ফোকাসে পজ (ডেস্কটপ)
    mount.addEventListener('mouseenter', stopAuto);
    mount.addEventListener('mouseleave', startAuto);
    mount.addEventListener('focusin', stopAuto);
    mount.addEventListener('focusout', startAuto);

    prevBt.addEventListener('click', prev);
    nextBt.addEventListener('click', next);

    // মোবাইলে arrow হাইড (CSS ফfallback)
    function toggleArrows(){
      const mobile = window.matchMedia('(max-width:768px)').matches;
      prevBt.style.display = nextBt.style.display = mobile ? 'none' : 'block';
    }
    toggleArrows();
    window.addEventListener('resize', toggleArrows);

    // Init
    goTo(0);
    startAuto();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
