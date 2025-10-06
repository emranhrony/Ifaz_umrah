// promo.js v8 — টেক্সট-ওনলি অটো স্লাইডার (LocalStorage → ifaz_promos_v1)
(function(){
  const KEY = 'ifaz_promos_v1';
  const slot = document.getElementById('promo-slot');
  if(!slot) return;

  const defaults = [
    { title:'Dhaka → Jeddah Air Ticket',  subtitle:'Lowest Price • Book Now',              badge:'Hot',    theme:'sky',   href:'contact.html' },
    { title:'China Visa',                  subtitle:'No Visa • No Fee',                    badge:'Visa',   theme:'rose',  href:'contact.html' },
    { title:'Domestic Air Ticket',         subtitle:'Flat 5% Discount',                    badge:'Deal',   theme:'amber', href:'contact.html' },
    { title:'Malaysia Visa',               subtitle:'Fast Processing • Tourist/Business',  badge:'New',    theme:'green', href:'contact.html' },
    { title:'Hajj Pre-Registration',       subtitle:'সহজ প্রক্রিয়া • সীমিত আসন',           badge:'Hajj',   theme:'blue',  href:'contact.html' },
    { title:'GAMCA Medical Slip',          subtitle:'Instant e-Slip • Verified',           badge:'Work',   theme:'lime',  href:'contact.html' },
    { title:'১ মিনিটে ডেলিভারি',           subtitle:'Visa / Slip PDF → WhatsApp',         badge:'Instant',theme:'sky',   href:'https://api.whatsapp.com/send?phone=8801712055858' },
  ];

  function getPromos(){
    try{
      const x = JSON.parse(localStorage.getItem(KEY));
      return (Array.isArray(x) && x.length) ? x : defaults;
    }catch{ return defaults }
  }

  const promos = getPromos();

  // Build DOM
  slot.innerHTML = `
    <div class="promo" aria-roledescription="carousel">
      <div class="promo-track"></div>
      <button class="nav prev" aria-label="Previous">‹</button>
      <button class="nav next" aria-label="Next">›</button>
      <div class="dots" role="tablist"></div>
    </div>
  `;
  const root  = slot.querySelector('.promo');
  const track = slot.querySelector('.promo-track');
  const dots  = slot.querySelector('.dots');

  promos.forEach((p,i)=>{
    const a = document.createElement('a');
    a.href = p.href || '#';
    a.className = `promo-card ${p.theme||'sky'}`;
    a.innerHTML = `
      ${p.badge?`<span class="promo-badge">${p.badge}</span>`:''}
      <h3>${p.title||''}</h3>
      <p>${p.subtitle||''}</p>
    `;
    a.setAttribute('role','group');
    a.setAttribute('aria-label', `${i+1} of ${promos.length}`);
    track.appendChild(a);

    const d = document.createElement('button');
    d.className = 'dot' + (i===0?' active':'');
    d.setAttribute('aria-label', `Slide ${i+1}`);
    d.addEventListener('click', ()=> go(i));
    dots.appendChild(d);
  });

  let i = 0, timer;
  function go(n){
    i = (n+promos.length)%promos.length;
    track.style.transform = `translateX(${-i*100}%)`;
    [...dots.children].forEach((el,k)=>el.classList.toggle('active', k===i));
    restart();
  }
  function next(){ go(i+1) }
  function prev(){ go(i-1) }
  function restart(){ clearInterval(timer); timer = setInterval(next, 4000) }

  root.querySelector('.next').addEventListener('click', next);
  root.querySelector('.prev').addEventListener('click', prev);
  restart();

  // Admin tab থেকে সেভ হলে সাথে সাথে রিফ্রেশ
  window.addEventListener('storage', (e)=>{
    if(e.key === KEY || e.key === 'ifaz_last_saved'){ location.reload(); }
  });
})();
