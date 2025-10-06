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

  // Bigger height & font, nice gradients
  const style = document.createElement('style');
  style.textContent = `
  .promo{position:relative;overflow:hidden;border:1px solid #e5e7eb;border-radius:14px;background:#fff;box-shadow:0 10px 24px rgba(2,8,23,.06)}
  .promo-track{display:flex;transition:transform .6s ease}
  .promo-item{min-width:100%;min-height:110px;padding:20px 16px;display:grid;place-items:center}
  .promo-item a{font-weight:900;font-size:clamp(18px,2.6vw,24px);line-height:1.35;text-align:center;text-decoration:none;color:#0f172a}
  .grad0{background:linear-gradient(90deg,#e0f2fe 0%,#f0f9ff 100%)}
  .grad1{background:linear-gradient(90deg,#fef3c7 0%,#e0f2fe 100%)}
  .grad2{background:linear-gradient(90deg,#dcfce7 0%,#e0f2fe 100%)}
  .grad3{background:linear-gradient(90deg,#fee2e2 0%,#e0f2fe 100%)}
  .promo .nav{position:absolute;inset:0;display:flex;justify-content:space-between;align-items:center;padding:0 6px}
  .promo button{border:none;background:rgba(255,255,255,.85);width:36px;height:36px;border-radius:50%;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.18);font-size:18px}
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
    it.innerHTML = `<a href="${p.href||'#'}">${p.text||''}</a>`;
    track.appendChild(it);
  });

  let i=0, N=promos.length;
  function go(k){ i=(k+N)%N; track.style.transform=`translateX(-${i*100}%)`; }
  wrap.querySelector('#pPrev').onclick = ()=>go(i-1);
  wrap.querySelector('#pNext').onclick = ()=>go(i+1);
  setInterval(()=>go(i+1), 4500);
})();
