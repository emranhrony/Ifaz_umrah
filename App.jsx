import React, { useState } from "react";
import { Phone, MessageCircle, CalendarDays, MapPin, Clock4, ChevronRight, Plane, CheckCircle2, Images } from "lucide-react";

const CTA_WHATSAPP = "https://api.whatsapp.com/send/?phone=8801712055858&text=Assalamu%20Alaikum!%20I%20want%20to%20book%20the%2014-day%20Umrah%20package.&type=phone_number&app_absent=0";
const CTA_CALL_1 = "tel:+8801712055858";
const CTA_CALL_2 = "tel:+8801714642113";
const CTA_MESSENGER = "https://m.me/"; // publish হলে আপনার পেজ ইউজারনেম দিন

// GitHub Pages লাইভে ছবি দেখাতে public/posters ফোল্ডারে ইমেজ রাখুন
const POSTERS_DEFAULT = [
  "/posters/poster1.jpg",
  "/posters/poster2.jpg",
  "/posters/poster3.jpg",
];

export default function App() {
  const [openForm, setOpenForm] = useState(false);
  const [posters, setPosters] = useState(POSTERS_DEFAULT);

  // শুধু লোকাল/প্রিভিউর জন্য (ডেপ্লয়ড সাইটে ফাইল সেভ হবে না)
  const onPosterUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((f) => URL.createObjectURL(f));
    if (urls.length) setPosters((prev) => [...urls, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50 to-slate-100 text-slate-900">
      {/* Top Bar */}
      <header className="w-full bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
              <Plane className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Ifaz Travels — উমরাহ ও হজ সেবা</h1>
              <p className="text-xs opacity-80 flex items-center gap-2"><MapPin className="w-3 h-3"/> এক্সট্রা-১, ৩য় তলা, গোল্ডেন টাওয়ার, আম্বরখানা, সিলেট</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href={CTA_WHATSAPP} className="inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-medium hover:bg-green-600 transition"><MessageCircle className="w-4 h-4"/> WhatsApp</a>
            <a href={CTA_CALL_1} className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-medium hover:bg-amber-600 transition"><Phone className="w-4 h-4"/> 01712-055858</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100 via-white to-slate-100" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-medium mb-4">
              <CalendarDays className="w-3 h-3"/> অক্টোবর ও নভেম্বর ২০২৫
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              উমরাহ প্যাকেজ — <span className="text-amber-600">১৪ দিন</span>
            </h2>
            <p className="mt-4 text-slate-700 text-base md:text-lg max-w-prose">
              সিলেট ও ঢাকা থেকে যাত্রা। ভিসা, এয়ার টিকিট, হারাম ও মসজিদে নববীর নিকটবর্তী হোটেল, ট্রান্সপোর্ট ও পূর্ণ গাইডেন্স — সব একসাথে।
            </p>
            <ul className="mt-6 space-y-2 text-slate-800">
              {[
                "গ্রুপ ডিপার্চার: ১৯ অক্টোবর ও ০১ নভেম্বর ২০২৫",
                "৳১,৪৫,০০০ মাত্র (খাবার ছাড়া)",
                "মক্কা ও মদিনায় হারামাইন সংলগ্ন হোটেল",
                "বাংলা/আরবি গাইড ও এয়ারপোর্ট পিকআপ",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5"/><span>{t}</span></li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={CTA_WHATSAPP} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white font-semibold shadow hover:scale-[1.01] transition"><MessageCircle className="w-5 h-5"/> WhatsApp</a>
              <a href={CTA_CALL_1} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold shadow hover:scale-[1.01] transition"><Phone className="w-5 h-5"/> কল: 01712-055858</a>
              <button onClick={() => setOpenForm(true)} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold shadow hover:bg-slate-50 border border-slate-200"><ChevronRight className="w-5 h-5"/> ফর্ম পূরণ করুন</button>
            </div>

            <p className="mt-3 text-xs text-slate-500">প্রাইস পরিবর্তন হতে পারে। ভিসা এম্বাসির অনুমোদনের উপর নির্ভরশীল।</p>
          </div>

          {/* Hero Visual (replace with real images from /public) */}
          <div className="bg-white rounded-3xl shadow-xl ring-1 ring-slate-200 p-6 md:p-8">
            <div className="aspect-video w-full rounded-2xl overflow-hidden">
              {/* <img src="/hero-kaaba.jpg" className="w-full h-full object-cover" alt="Kaaba at night" /> */}
              <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center text-white">
                <div className="text-center px-6">
                  <p className="text-sm opacity-80">হিরো ইমেজ</p>
                  <h3 className="text-2xl font-bold">কাবা শরীফ (রাত) · সবুজ গম্বুজ</h3>
                  <p className="mt-2 text-sm opacity-90">GitHub-এ /public ফোল্ডারে ইমেজ আপলোড করুন।</p>
                </div>
              </div>
            </div>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Feature label="ভিসা ও টিকিট" />
              <Feature label="হারামের নিকট হোটেল" />
              <Feature label="ট্রান্সপোর্ট" />
              <Feature label="বাংলা/আরবি গাইড" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl md:text-3xl font-bold">ফিচার্ড প্যাকেজসমূহ</h3>
          <p className="text-sm text-slate-500"><Clock4 className="inline w-4 h-4 mr-1"/> শনি–বৃহস্পতি ১০:০০–১৯:০০ · শুক্র ১৫:০০–১৯:০০</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard
            title="উমরাহ প্যাকেজ — অক্টোবর ২০২৫"
            points={[
              "ফ্লাইট: সিলেট → ঢাকা → জেদ্দা",
              "হোটেল: হারাম ও মসজিদে নববীর নিকটে",
              "ভিসা, ট্রান্সপোর্ট, গাইড অন্তর্ভুক্ত",
              "মূল্য: ৳১,৪৫,০০০ (খাবার ছাড়া)",
            ]}
            cta={{ label: "বুক করতে মেসেজ দিন", href: CTA_WHATSAPP }}
          />
          <ServiceCard
            title="উমরাহ প্যাকেজ — নভেম্বর ২০২৫"
            points={[
              "ফ্লেক্সিবল তারিখ",
              "গ্রুপ ও ফ্যামিলি রুম",
              "আর্লি–বার্ড ডিসকাউন্ট",
              "মূল্য: ৳১,৪৫,০০০ (খাবার ছাড়া)",
            ]}
            cta={{ label: "তারিখ জানতে WhatsApp", href: CTA_WHATSAPP }}
          />
          <ServiceCard
            title="কাস্টম/প্রাইভেট উমরাহ"
            points={["প্রিমিয়াম হোটেল", "প্রাইভেট ট্রান্সপোর্ট", "কনসিয়ার্জ সাপোর্ট"]}
            cta={{ label: "কল করে জানতে চান", href: CTA_CALL_1 }}
          />
        </div>
      </section>

      {/* Posters (New) */}
      <section id="posters" className="mx-auto max-w-6xl px-4 pb-14">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-2"><Images className="w-6 h-6"/> পোস্টার গ্যালারি</h3>
          <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
            <input type="file" accept="image/*" multiple className="hidden" onChange={onPosterUpload} />
            <span className="rounded-full bg-white border px-4 py-2 shadow hover:bg-slate-50">Add Posters (Preview)</span>
          </label>
        </div>
        <p className="text-sm text-slate-600 mb-6">GitHub-এ লাইভের জন্য ছবি রাখুন: <code className="bg-slate-100 px-1 rounded">/public/posters/</code> এবং উপরের <code>POSTERS_DEFAULT</code> লিস্টে নাম দিন। এখানে বাটনটি কেবল প্রিভিউ দেখায়।</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posters.map((src, i) => (
            <figure key={src + i} className="group relative overflow-hidden rounded-2xl bg-white shadow ring-1 ring-slate-200">
              <img src={src} alt={`Poster ${i+1}`} className="w-full h-64 object-cover" onError={(e)=>{e.currentTarget.src = "https://placehold.co/800x1000/png?text=Upload+poster%0A/public/posters";}}/>
              <figcaption className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 transition">Poster {i+1}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Lead Capture Banner */}
      <section className="bg-amber-50 border-y border-amber-200">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-amber-800">লিমিটেড সিট · গ্রুপ ডিপার্চার</p>
            <h4 className="text-xl md:text-2xl font-bold">১৯ অক্টোবর ও ০১ নভেম্বর ২০২৫</h4>
          </div>
          <div className="flex items-center gap-3">
            <a href={CTA_WHATSAPP} className="rounded-xl bg-green-600 px-5 py-3 text-white font-semibold shadow">এখনই WhatsApp</a>
            <a href={CTA_CALL_2} className="rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold shadow">কল: 01714-642113</a>
          </div>
        </div>
      </section>

      {/* About & Trust */}
      <section className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold">Ifaz Travels সম্পর্কে</h3>
          <p className="mt-4 text-slate-700 leading-relaxed">
            ইফাজ ট্রাভেলস — সিলেট ও ঢাকাভিত্তিক বিশ্বস্ত হজ ও উমরাহ সেবাদাতা। জেদ্দা/মদিনা রুটে এয়ার টিকিট, ভিসা প্রসেসিং, হারাম-সংলগ্ন হোটেল, এয়ারপোর্ট-পিকআপ, ট্রান্সপোর্ট, আরবি/বাংলা গাইড—সব এক জায়গায়। আপনার ইবাদতকে সহজ করতে আমরা প্রতিশ্রুতিবদ্ধ।
          </p>
          <ul className="mt-6 space-y-2">
            {[
              "রিয়েল কাস্টমার ফটো (কনসেন্টসহ)",
              "অফিস সাইনেজ ও টিম পরিচিতি",
              "পজিটিভ WhatsApp ফিডব্যাক (ব্লার করা)",
              "টার্মস: এয়ারলাইন/এম্বাসি নীতিমালার উপর নির্ভরশীল",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5"/><span>{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-3xl shadow-xl ring-1 ring-slate-200 p-6 md:p-8">
          <h4 className="text-xl font-semibold">Messenger ও WhatsApp Auto-Reply</h4>
          <div className="mt-4 text-sm space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border">“আসসালামু আলাইকুম! Ifaz Travels-এ মেসেজের জন্য ধন্যবাদ। আপনার নাম, যাত্রার মাস (অক্টোবর/নভেম্বর), যাত্রী সংখ্যা ও ফোন নম্বর লিখুন। আমাদের টিম ১৫ মিনিটের মধ্যে রিপ্লাই দেবে ইনশাআল্লাহ।”</div>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "October Package Details",
                "November Package Details",
                "Hotel Near Haram",
                "Visa & Ticket Support",
                "Call Me Back",
              ].map((x) => (
                <span key={x} className="px-3 py-2 rounded-full bg-slate-100 text-slate-700 text-xs border inline-flex items-center justify-center">{x}</span>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">WhatsApp Greeting: “Ifaz Travels — Umrah Assistance. অনুগ্রহ করে নাম, যাত্রী সংখ্যা, যাত্রার মাস, সিটি (Sylhet/Dhaka) লিখুন।”</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold">Ifaz Travels — উমরাহ ও হজ সেবা</h4>
            <p className="mt-4 text-sm opacity-90 flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5"/> এক্সট্রা-১, ৩য় তলা, গোল্ডেন টাওয়ার, আম্বরখানা, সিলেট</p>
            <p className="mt-1 text-sm opacity-90 flex items-center gap-2"><Clock4 className="w-4 h-4"/> শনি–বৃহস্পতি ১০:০০–১৯:০০ · শুক্র ১৫:০০–১৯:০০</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">যোগাযোগ</h4>
            <div className="mt-4 space-y-2 text-sm">
              <a href={CTA_CALL_1} className="block hover:underline">📞 গোলাম রব্বানী: 01712-055858</a>
              <a href={CTA_CALL_2} className="block hover:underline">📞 ইমরান এইচ রনি: 01714-642113</a>
              <a href={CTA_WHATSAPP} className="block hover:underline">🌐 WhatsApp Direct</a>
              <a href="mailto:ifaztravel@gmail.com" className="block hover:underline">✉️ Email: ifaztravel@gmail.com</a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold">নোটিস</h4>
            <p className="mt-4 text-sm opacity-90">প্রাইস পরিবর্তন হতে পারে। ভিসা এম্বাসির অনুমোদনের উপর নির্ভরশীল। কনসেন্টসহ বাস্তব ছবি ব্যবহার করুন।</p>
          </div>
        </div>
        <div className="py-4 text-center text-xs text-slate-400 border-t border-slate-800">© {new Date().getFullYear()} Ifaz Travels</div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-4 inset-x-4 md:hidden flex items-center justify-center gap-3">
        <a href={CTA_WHATSAPP} className="flex-1 text-center rounded-full bg-green-600 py-3 text-white font-semibold shadow">WhatsApp</a>
        <a href={CTA_CALL_1} className="flex-1 text-center rounded-full bg-slate-900 py-3 text-white font-semibold shadow">Call</a>
      </div>

      {/* Lead Form Modal */}
      {openForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setOpenForm(false)}>
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 p-6" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-semibold">দ্রুত লিড ফর্ম</h4>
              <button onClick={()=>setOpenForm(false)} className="text-slate-500 hover:text-slate-700">✕</button>
            </div>
            <form className="mt-4 grid grid-cols-1 gap-3" onSubmit={(e)=>{e.preventDefault(); window.location.href = CTA_WHATSAPP;}}>
              <input required placeholder="পূর্ণ নাম" className="w-full rounded-xl border px-4 py-3"/>
              <input required placeholder="ফোন নম্বর" className="w-full rounded-xl	border px-4 py-3"/>
              <div className="grid grid-cols-2 gap-3">
                <select className="rounded-xl border px-4 py-3"><option>October</option><option>November</option></select>
                <input placeholder="যাত্রী সংখ্যা (যেমন ৪)" className="rounded-xl border px-4 py-3"/>
              </div>
              <select className="rounded-xl border px-4 py-3"><option>Sylhet</option><option>Dhaka</option><option>Other</option></select>
              <textarea placeholder="নোট/চাহিদা" className="rounded-xl border px-4 py-3 min-h-[100px]"/>
              <button type="submit" className="mt-2 rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold">Submit & Open WhatsApp</button>
              <p className="text-xs text-slate-500">অফিস টাইমে ১৫ মিনিটের মধ্যে রিপ্লাই পাবেন।</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceCard({ title, points, cta }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl ring-1 ring-slate-200 p-6 flex flex-col">
      <h4 className="text-lg font-semibold">{title}</h4>
      <ul className="mt-4 space-y-2 text-slate-700 flex-1">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <a href={cta.href} className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:scale-[1.01] transition">
        {cta.label}
      </a>
    </div>
  );
}

function Feature({ label }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
      <span>{label}</span>
    </div>
  );
}
