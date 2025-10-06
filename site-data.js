// site-data.js
(function(){
  function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' }[m]))}

  document.addEventListener('DOMContentLoaded', ()=>{
    const pkgs   = JSON.parse(localStorage.getItem('ifaz_packages')||'null');
    const office = JSON.parse(localStorage.getItem('ifaz_office')||'null');

    // ---- Rebuild packages grid from localStorage ----
    if(pkgs && Array.isArray(pkgs)){
      const grid = document.querySelector('#packages .grid');
      if(grid){
        grid.innerHTML = pkgs.map(p => `
          <div class="card">
            <h4>${esc(p.title || 'Package')}</h4>
            <p class="price">${esc(p.price || 'Call for Price')}</p>
            <p class="note">${esc(p.note  || '')}</p>
            <div>
              <a class="btn" href="#booking-form" style="background:#334155;border-color:#334155">
                ${esc(p.btn || 'Details')}
              </a>
            </div>
          </div>
        `).join('');
      }
    }

    // ---- Update contact info if present ----
    if(office){
      const links = document.querySelectorAll('#contact a[href^="tel:"]');
      if(links[0] && office.ph1){
        links[0].textContent = office.ph1;
        links[0].setAttribute('href','tel:'+office.ph1.replace(/\D+/g,''));
      }
      if(links[1] && office.ph2){
        links[1].textContent = office.ph2;
        links[1].setAttribute('href','tel:'+office.ph2.replace(/\D+/g,''));
      }
      const addr = document.querySelector('#contact .card p:nth-of-type(4)');
      if(addr && office.addr){ addr.innerHTML = '📍 ' + esc(office.addr); }
    }
  });
})();
