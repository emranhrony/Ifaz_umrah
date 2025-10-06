// promo.js
(function(){
  const DEFAULTS = [
    { text:'Dhaka → Jeddah Air Ticket — Lowest Price • Book Now', href:'#packages' },
    { text:'China Visa — No Visa, No Fee', href:'#contact' },
    { text:'Domestic Ticket — 5% Discount', href:'#packages' },
    { text:'Malaysia Visa Support', href:'#services' },
    { text:'Hajj Pre-Registration — চলছে', href:'#services' },
    { text:'GAMCA Medical Slip — 1 Minute Delivery*', href:'#services' }
  ];
  const promos = JSON.parse(localStorage.getItem('ifaz_promos')||'null') || DEFAULTS;

  const mount = document.getElementById('promo-slot');
  if(!mount) return;

  // Minimal inline styles (promo.css থাকলে সেটাই প্রাধান্য পাবে)
  const style = document.createElement('style');
  style.textContent = `
  .promo{position:relative;overflow:hidden;border:1px solid #e5e7eb;border-radius:14px;background:#fff;box-shadow:0 10px 24px rgba(2,8,23,.06)}
  .promo-track{display:flex;transition:transform .6s ease}
  .promo-item{min-width:100%;padding:16px;display:grid;place-items:center;height:76px}
  .promo-item a{font-weight:800;text-decoration:none}
  .grad0{background:linear-gradient(90deg,#e0f2fe,#f0f9ff)}
  .grad1{background:linear-gradient(90deg,#fef3c7,#e0f2fe)}
  .grad2{background:linear-gradient(90deg,#dcfce7,#e0f2fe)}
  .grad3{background:linear-gradient(90deg,#fee2e2,#e0f2fe)}
  .promo .nav{position:absolute;inset:0;display:flex;justify-content:space-between;align-items:center;padding:0 6px}
  .promo button{border:none;background:rgba(255,255,255,.8);width:34px;height:34px;border-radius:50%;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.18)}
  @media(max-width:640px){ .promo .nav{display:none} }
  `;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.className = 'promo';
  wrap.innerHTML = `
    <div class="promo-track"></div>
    <div class="nav">
      <button id="pPrev">‹</button>
      <button id="pNext">›</button>
    </div>
  `;
  mount.appendChild(wrap);

  const track = wrap.querySelector('.promo-track');
  promos.forEach((p,i)=>{
    const it=document.createElement('div');
    it.className = `promo-item grad${i%4}`;
    it.innerHTML = `<a href="${p.href||'#'}">${p.text || ''}</a>`;
    track.appendChild(it);
  });

  let i=0, N=promos.length;
  function go(k){ i=(k+N)%N; track.style.transform=`translateX(-${i*100}%)`; }
  wrap.querySelector('#pPrev').onclick = ()=>go(i-1);
  wrap.querySelector('#pNext').onclick = ()=>go(i+1);
  setInterval(()=>go(i+1), 4500);
})();
