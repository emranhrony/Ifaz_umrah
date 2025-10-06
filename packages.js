
// packages.js v1 — read packages from LocalStorage and render
(function(){
  const KEY = 'ifaz_packages_v1';
  const FALLBACK = [
    { title:'✈️ ৭ দিন', price:'Call for Price', note:'Visa, Ticket, Hotel, Transport', ctaText:'Get Quote', ctaHref:'#booking-form' },
    { title:'🕌 ১০ দিন', price:'Call for Price', note:'Group / Family rooms',           ctaText:'Get Quote', ctaHref:'#booking-form' },
    { title:'🏨 ১৪ দিন', price:'৳১,৪৫০০০',       note:'খাবার ছাড়া · Near Haram',       ctaText:'Get Quote', ctaHref:'#booking-form' },
    { title:'📅 October 2025 (Group)', price:'Early-bird available', note:'19 Oct departure · Guide included', ctaText:'Reserve', ctaHref:'#booking-form' },
    { title:'📅 November 2025 (Group)', price:'Discount available',  note:'1 Nov departure · Flexible dates', ctaText:'Reserve', ctaHref:'#booking-form' },
    { title:'⭐ Custom / Private Umrah', price:'Tailored Itinerary', note:'Premium hotel · Private transport', ctaText:'Call for Plan', ctaHref:'#booking-form' },
    { title:'🛫 Air Ticket & Visa Assist', price:'JED / MED', note:'Multiple airlines · Quick processing',     ctaText:'Get Quote', ctaHref:'#booking-form' },
  ];

  function read(){ try{ const x = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(x)&&x.length? x : FALLBACK }catch{ return FALLBACK } }
  function render(list){
    const grid = document.getElementById('packages-grid');
    if(!grid) return;
    grid.innerHTML = '';
    list.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h4>${p.title||''}</h4>
        <p class="price">${p.price||''}</p>
        <p class="note" style="color:#64748b">${p.note||''}</p>
        <div><a class="btn" style="background:#334155;border-color:#334155;color:#fff" href="${p.ctaHref||'#'}">${p.ctaText||'Details'}</a></div>
      `;
      grid.appendChild(card);
    });
  }

  const pkgs = read();
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', ()=>render(pkgs), {once:true});
  } else { render(pkgs); }
})();
