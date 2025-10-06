<!-- index.html, gallery.html, contact.html, admin.html—সকল পেজে এই ফাইল লোড করবেন -->
<script>
// promo.js v8 — slider + packages (localStorage powered)

const PROMO_KEY = 'ifaz_promos_v1';
const PKG_KEY   = 'ifaz_packages_v1';

// Fallbacks (only used if nothing saved yet)
const DEFAULT_PROMOS = [
  { title:'Dhaka → Jeddah Air Ticket',  subtitle:'Lowest Price • Book Now',       badge:'Hot',    theme:'sky',   href:'contact.html' },
  { title:'China Visa',                  subtitle:'No Visa • No Fee',             badge:'Visa',   theme:'rose',  href:'contact.html' },
  { title:'Domestic Air Ticket',         subtitle:'Flat 5% Discount',             badge:'Deal',   theme:'amber', href:'contact.html' },
  { title:'Malaysia Visa',               subtitle:'Fast Processing • Tourist/Business', badge:'New', theme:'green', href:'contact.html' },
  { title:'Hajj Pre-Registration',       subtitle:'সহজ প্রক্রিয়া • সীমিত আসন',      badge:'Hajj',   theme:'blue',  href:'contact.html' },
  { title:'GAMCA Medical Slip',          subtitle:'Instant e-Slip • Verified',     badge:'Work',   theme:'lime',  href:'contact.html' },
  { title:'১ মিনিটে ডেলিভারি',           subtitle:'Visa / Slip PDF → WhatsApp',   badge:'Instant',theme:'sky',   href:'https://api.whatsapp.com/send?phone=8801712055858' },
];

const DEFAULT_PACKAGES = [
  { title:'✈️ ৭ দিন', price:'Call for Price', note:'Visa, Ticket, Hotel, Transport', ctaText:'Get Quote', ctaHref:'#booking-form' },
  { title:'🕌 ১০ দিন', price:'Call for Price', note:'Group / Family rooms',           ctaText:'Get Quote', ctaHref:'#booking-form' },
  { title:'🏨 ১৪ দিন', price:'৳১,৪৫০০০',       note:'খাবার ছাড়া · Near Haram',       ctaText:'Get Quote', ctaHref:'#booking-form' },
  { title:'📅 October 2025 (Group)', price:'Early-bird available', note:'19 Oct departure · Guide included', ctaText:'Reserve', ctaHref:'#booking-form' },
  { title:'📅 November 2025 (Group)', price:'Discount available',  note:'1 Nov departure · Flexible dates', ctaText:'Reserve', ctaHref:'#booking-form' },
  { title:'⭐ Custom / Private Umrah', price:'Tailored Itinerary', note:'Premium hotel · Private transport', ctaText:'Call for Plan', ctaHref:'#booking-form' },
  { title:'🛫 Air Ticket & Visa Assist', price:'JED / MED', note:'Multiple airlines · Quick processing',     ctaText:'Get Quote', ctaHref:'#booking-form' },
];

function readLS(key, fb){ try{ const x=JSON.parse(localStorage.getItem(key)); return Array.isArray(x)&&x.length?x:fb }catch{ return fb } }

// ---------- Promo slider ----------
function mountPromo(){
  const host = document.getElementById('promo-slot');
  if(!host) return;

  const promos = readLS(PROMO_KEY, DEFAULT_PROMOS);

  host.innerHTML = `
    <div class="promo theme-${(promos[0]?.theme||'sky')}">
      <button class="promo-nav promo-prev" aria-label="Previous">‹</button>
      <div class="promo-track"></div>
      <button class="promo-nav promo-next" aria-label="Next">›</button>
      <div class="promo-dots"></div>
    </div>
  `;

  const promoEl  = host.querySelector('.promo');
  const track    = host.querySelector('.promo-track');
  const dotsBox  = host.querySelector('.promo-dots');

  promos.forEach((p,i)=>{
    const a = document.createElement('a');
    a.className = 'promo-slide';
    a.href = p.href || '#';
    a.innerHTML = `
      <div class="promo-card">
        ${p.badge?`<span class="promo-badge">${p.badge}</span>`:''}
        <div class="promo-title">${p.title||''}</div>
        ${p.subtitle?`<div class="promo-sub">${p.subtitle}</div>`:''}
      </div>
    `;
    track.appendChild(a);

    const d = document.createElement('button');
    d.className = 'promo-dot' + (i===0?' active':'');
    d.setAttribute('aria-label','Go to slide '+(i+1));
    d.onclick = ()=>go(i);
    dotsBox.appendChild(d);
  });

  let i = 0, N = promos.length, timer = null;

  function applyTheme(idx){
    promoEl.className = 'promo theme-' + (promos[idx]?.theme || 'sky');
  }
  function go(idx){
    i = (idx+N)%N;
    track.style.transform = `translateX(${-i*100}%)`;
    dotsBox.querySelectorAll('.promo-dot').forEach((d,k)=>d.classList.toggle('active', k===i));
    applyTheme(i);
  }
  function next(){ go(i+1) }
  function prev(){ go(i-1) }

  host.querySelector('.promo-next').onclick = next;
  host.querySelector('.promo-prev').onclick = prev;

  function start(){ stop(); timer=setInterval(next, 4000) }
  function stop(){ if(timer) clearInterval(timer) }

  promoEl.addEventListener('mouseenter', stop);
  promoEl.addEventListener('mouseleave', start);
  start();

  // keep full width on resize
  window.addEventListener('resize', ()=>go(i));
}

// ---------- Packages (hydrate from localStorage) ----------
function mountPackages(){
  const grid = document.getElementById('pkg-grid') || document.querySelector('#packages .grid');
  if(!grid) return;

  const pkgs = readLS(PKG_KEY, DEFAULT_PACKAGES);
  grid.innerHTML = ''; // wipe fallback cards if any

  pkgs.forEach(p=>{
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h4>${p.title||''}</h4>
      <p class="price">${p.price||''}</p>
      <p class="note">${p.note||''}</p>
      <div><a class="btn" href="${p.ctaHref||'#'}" style="background:#334155;border-color:#334155">${p.ctaText||'Details'}</a></div>
    `;
    grid.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  mountPromo();
  mountPackages();
});
</script>
