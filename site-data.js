// site-data.js
(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    const pkgs = JSON.parse(localStorage.getItem('ifaz_packages')||'null');
    const office = JSON.parse(localStorage.getItem('ifaz_office')||'null');

    // Update packages on index page
    const cards = document.querySelectorAll('#packages .card');
    if(pkgs && cards.length){
      pkgs.forEach((p, idx)=>{
        const card = cards[idx]; if(!card) return;
        const h4 = card.querySelector('h4'); const price = card.querySelector('.price'); const note = card.querySelector('.note');
        const btn  = card.querySelector('.btn');
        if(h4 && p.title) h4.textContent = p.title;
        if(price && p.price) price.textContent = p.price;
        if(note && p.note) note.textContent = p.note;
        if(btn && p.btn) btn.textContent = p.btn;
      });
    }

    // Update contact info (if present)
    if(office){
      // in index contact card
      const links = document.querySelectorAll('#contact a[href^="tel:"]');
      if(links[0] && office.ph1){ links[0].textContent = office.ph1; links[0].setAttribute('href','tel:'+office.ph1.replace(/\D+/g,'')); }
      if(links[1] && office.ph2){ links[1].textContent = office.ph2; links[1].setAttribute('href','tel:'+office.ph2.replace(/\D+/g,'')); }
      const addr = document.querySelector('#contact .card p:nth-of-type(4)');
      if(addr && office.addr){ addr.innerHTML = '📍 ' + office.addr; }
    }
  });
})();
