import React from 'react'

const POSTERS_DEFAULT = [
  `${import.meta.env.BASE_URL}posters/poster1.jpg`,
  `${import.meta.env.BASE_URL}posters/poster2.jpg`,
  `${import.meta.env.BASE_URL}posters/poster3.jpg`,
];

function App() {
  return (
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold">Ifaz Travels - Umrah Package</h1>
      <p className="mt-2">14 Days Package | 145,000 BDT (without food)</p>
      <a 
        href="https://api.whatsapp.com/send/?phone=8801712055858&text&type=phone_number&app_absent=0" 
        className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
      >
        WhatsApp
      </a>
    </div>
  );
}

export default App;