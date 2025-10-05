/* promo.js — shared promo slider for all pages */
(function () {
  const mount = document.getElementById('promo-slot');
  if (!mount) return;

  /* -------- Slides (EDIT HERE) -------- */
  const slides = [
    {
      id: 'dhaka-jed',
      title: 'Dhaka → Jeddah Air Ticket',
      subtitle: 'Lowest Price • Book Now',
      href: 'contact.html',
      img: 'public/banners/jedda.jpg',
      badge: 'Hot'
    },
    {
      id: 'china-visa',
      title: 'China Visa',
      subtitle: 'No Visa • No Fee',
      href: 'contact.html',
      img: 'public/banners/china.jpg',
      badge: 'Visa'
    },
    {
      id: 'domestic-5',
      title: 'Domestic Air Ticket',
      subtitle: 'Flat 5% Discount',
      href: 'contact.html',
      img: 'public/banners/domestic.jpg',
      badge: 'Deal'
    },

    /* ✅ NEW: Malaysia Visa */
    {
      id: 'malaysia-visa',
      title: 'Malaysia Visa',
      subtitle: 'Fast Processing • Tourist / Business',
      href: 'contact.html',
      img: 'public/banners/malaysia.jpg',
      badge: 'New'
    },
    /* ✅ NEW: Hajj Pre-Registration */
    {
      id: 'hajj-pre',
      title: 'Hajj Pre-Registration',
      subtitle: 'সহজ প্রক্রিয়া • সীমিত আসন',
      href: 'contact.html',
      img: 'public/banners/hajj.jpg',
      badge: 'Hajj'
    },
    /* ✅ NEW: GAMCA Medical Slip */
    {
      id: 'gamca',
      title: 'GAMCA Medical Slip',
      subtitle: 'Instant e-Slip • Verified',
      href: 'contact.html',
      img: 'public/banners/gamca.jpg',
      badge: 'Work'
    },
    /* ✅ NEW: 1 Minute Delivery */
    {
      id: 'one-minute',
      title: '১ মিনিটে ডেলিভারি',
      subtitle: 'Visa / Slip PDF → WhatsApp',
      href: 'https://api.whatsapp.com/send?phone=8801712055858',
      img: 'public/banners/instant.jpg',
      badge: 'Instant'
    }
  ];

  /* -------- Markup -------- */
  mount.innerHTML = `
    <div class="promo" role="region" aria-label="Promotions">
      <button class="promo-nav prev" aria-label="Previous slide"></button>
      <div class="promo-viewport">
        <div class="promo-track"></div>
      </div>
      <button class="promo-nav next" aria-label="Next slide"></button>
      <div class="promo-dots" role="tablist"></div>
    </div>
  `;

  const track = mount.querySelector('.promo-track');
  const dots = mount.querySelector('.promo-dots');
  const prevBtn = mount.querySelector('.promo-nav.prev');
  const nextBtn = mount.querySelector('.promo-nav.next');

  // Slides -> DOM
  slides.forEach((s, i) => {
    const a = document.c
