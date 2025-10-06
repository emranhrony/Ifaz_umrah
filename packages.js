// packages.js v2 — LocalStorage থেকে প্যাকেজ রেন্ডার + empty state + auto refresh
(function () {
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

  // LocalStorage -> Array (খালি অ্যারে হলেও 그대로 রিটার্ন)
  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return FALLBACK;             // প্রথমবারের জন্য
      const val = JSON.parse(raw);
      return Array.isArray(val) ? val : FALLBACK;
    } catch {
      return FALLBACK;
    }
  }

  function sanitize(str) {
    return (str ?? '').toString();
  }

  function render(list) {
    const grid = document.getElementById('packages-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // একদম খালি হলে — empty state
    if (!list.length) {
      const empty = document.createElement('div');
      empty.className = 'card';
      empty.innerHTML = `
        <h4 style="margin:0 0 6px">No packages right now</h4>
        <p class="note" style="color:#64748b;margin:0 0 10px">নতুন প্যাকেজ খুব শিগগিরই যোগ করা হবে।</p>
        <div><a class="btn" style="background:#25D366;border-color:#22c55e;color:#fff" href="https://api.whatsapp.com/send?phone=8801712055858" target="_blank" rel="noopener">WhatsApp করুন</a></div>
      `;
      grid.appendChild(empty);
      return;
    }

    list.forEach(p => {
      // optional: hidden:true দিলে স্কিপ
      if (p && p.hidden) return;

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h4>${sanitize(p.title)}</h4>
        <p class="price">${sanitize(p.price)}</p>
        <p class="note" style="color:#64748b">${sanitize(p.note)}</p>
        <div>
          <a class="btn" style="background:#334155;border-color:#334155;color:#fff" href="${sanitize(p.ctaHref) || '#'}">
            ${sanitize(p.ctaText) || 'Details'}
          </a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // প্রাথমিক রেন্ডার
  function boot() {
    const data = read();
    render(data);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  // Admin পেজ থেকে সেভ করলে অটো রিফ্রেশ (অন্য ট্যাব/উইন্ডো হলেও)
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      render(read());
    }
  });

  // চাইলে ম্যানুয়ালি রিফ্রেশ করতে পারবেন
  window.ifazReloadPackages = function () {
    render(read());
  };
})();
