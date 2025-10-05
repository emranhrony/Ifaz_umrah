/* promo.js — reusable slider that mounts itself on any page */

(function(){
  // === EDIT ONLY THIS PART (slides config) ====================
  const slidesConfig = [
    {
      tag:"Air Ticket",
      title:"Dhaka–Jeddah Air Ticket",
      subtitle:"Lowest Price · Book Now",
      ctaText:"Book Now →",
      href:"air-ticket-dhaka-jeddah.html",
      theme:"b1"
    },
    {
      tag:"Visa Service",
      title:"China Visa",
      subtitle:"No Visa, No Fee",
      ctaText:"Apply Now →",
      href:"china-visa.html",
      theme:"b2"
    },
    {
      tag:"Domestic Flight",
      title:"Domestic Ticket 5% Discount",
      subtitle:"Limited time · Online booking",
      ctaText:"Grab Offer →",
      href:"domestic-ticket.html",
      theme:"b3"
    }
  ];
  const intervalMs = 4500;  // auto-slide interval
  // ============================================================

  function createSliderEl(){
    const wrap = document.createElement('section');
    wrap.className = 'promo-wrap container';
    wrap.setAttribute('aria-label','Featured banners');

    wrap.innerHTML = `
      <div class="promo-slider" aria-roledescription="carousel">
        <div class="promo-track" id="promoTrack"></div>
        <button class="promo-arrow promo-prev" id="promoPrev" aria-label="Previous slide">‹</button>
        <button class="promo-arrow promo-next" id="promoNext" aria-label="Next slide">›</button>
        <div class="promo-dots" id="promoDots" role="tablist" aria-label="Slide dots"></div>
      </div>
    `;
    return wrap;
  }

  function mountSlider(){
    // Priority 1: explicit mount point
    let slot = document.querySelector('#promo-slot');

    // Fallback: auto-insert right after <header> if slot not found
    if(!slot){
      const header = document.querySelector('header');
      const after = createSliderEl();
      if(header && header.parentNode){
        header.parentNode.insertBefore(after, header.nextSibling);
        initSlider(after);
        return;
      }
      // If even header not found, append to body top
      document.body.prepend(after);
      initSlider(after);
      return;
    }

    // If slot exists, fill it
    const el = createSliderEl();
    slot.replaceWith(el);
    initSlider(el);
  }

  function initSlider(root){
    const track = root.querySelector('#promoTrack');
    const prev  = root.querySelector('#promoPrev');
    const next  = root.querySelector('#promoNext');
    const dotsWrap = root.querySelector('#promoDots');

    // Render slides
    track.innerHTML = slidesConfig.map(s => `
      <div class="promo-slide">
        <a href="${s.href || '#'}" aria-label="${s.title || 'Banner'}">
          <div class="promo-banner ${s.theme || ''}">
            <div class="inner">
              ${s.tag ? `<span class="tag">${s.tag}</span>` : ""}
              ${s.title ? `<h3>${s.title}</h3>` : ""}
              ${s.subtitle ? `<p>${s.subtitle}</p>` : ""}
              ${s.ctaText ? `<span class="cta-chip">${s.ctaText}</span>` : ""}
            </div>
          </div>
        </a>
      </div>
    `).join('');

    const slides = Array.from(track.children);
    const total  = slides.length;
    let index = 0, timer = null, touchStartX = 0, touchDiff = 0;

    // Dots
    dotsWrap.innerHTML = "";
    slides.forEach((_, i)=>{
      const d = document.createElement('button');
      d.className = 'promo-dot' + (i===0?' active':'');
      d.setAttribute('aria-label', `Go to slide ${i+1}`);
      d.addEventListener('click', ()=>go(i,true));
      dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.children);

    function update(){
      track.style.transform = `translateX(-${index*100}%)`;
      dots.forEach((d,i)=>d.classList.toggle('active', i===index));
    }
    function go(i, user=false){
      index = (i+total)%total;
      update();
      if(user) restart();
    }
    function nextSlide(){ go(index+1); }
    function prevSlide(){ go(index-1); }

    function start(){ if(timer) return; timer = setInterval(nextSlide, intervalMs); }
    function stop(){ clearInterval(timer); timer = null; }
    function restart(){ stop(); start(); }

    if(next) next.addEventListener('click', ()=>go(index+1,true));
    if(prev) prev.addEventListener('click', ()=>go(index-1,true));

    // Keyboard
    const sliderBox = root.querySelector('.promo-slider');
    sliderBox.setAttribute('tabindex','0');
    sliderBox.addEventListener('keydown', (e)=>{
      if(e.key==='ArrowRight'){ e.preventDefault(); go(index+1,true); }
      if(e.key==='ArrowLeft'){  e.preventDefault(); go(index-1,true); }
    });

    // Touch swipe
    sliderBox.addEventListener('touchstart', (e)=>{ touchStartX = e.touches[0].clientX; touchDiff=0; stop(); }, {passive:true});
    sliderBox.addEventListener('touchmove',  (e)=>{ touchDiff = e.touches[0].clientX - touchStartX; }, {passive:true});
    sliderBox.addEventListener('touchend',   ()=>{
      if(Math.abs(touchDiff) > 50){ (touchDiff < 0) ? go(index+1,true) : go(index-1,true); }
      start();
    });

    // Pause when tab hidden
    document.addEventListener('visibilitychange', ()=>{
      if(document.hidden) stop(); else start();
    });

    update(); start();
  }

  // Mount on DOM ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', mountSlider);
  }else{
    mountSlider();
  }
})();
