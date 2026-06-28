import { useState } from "react";
import { Calendar, MapPin, Copy, ExternalLink, Clock, Check } from "lucide-react";
import { weddingData } from "../data";

export default function EventDetails() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(weddingData.venueAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate Google Calendar Link for the event
  const getGoogleCalendarUrl = () => {
    const title = `Pernikahan ${weddingData.brideName} & ${weddingData.groomName}`;
    const desc = `Menghadiri undangan akad nikah & resepsi pernikahan dari Rania dan Aditya pada ${weddingData.venueName}`;
    const start = "20261010T020000Z"; // UTC timestamp matching 10 October 2026, 09:00 WIB
    const end = "20261010T090000Z"; // UTC timestamp
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(weddingData.venueAddress)}`;
  };

  return (
    <section className="px-6 py-20 bg-white" id="event-details-section">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-rosegold-600">Event Details</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-800 font-bold">Waktu &amp; Tempat Acara</h2>
          <div className="w-16 h-[1.5px] bg-rosegold-300 mx-auto mt-2"></div>
        </div>

        {/* Info Cards (Akad & Resepsi) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Card: Akad Nikah */}
          <div className="bg-rosegold-50/70 p-8 rounded-3xl border border-rosegold-200/40 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
            {/* Top gold bar accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rosegold-300 by-rosegold-400 to-rosegold-300"></div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-bold text-rosegold-800 tracking-wide">Akad Nikah</span>
                <div className="w-10 h-10 rounded-full bg-rosegold-200/50 flex items-center justify-center text-rosegold-600">
                  💍
                </div>
              </div>
              
              <div className="w-full h-[1px] bg-rosegold-200/60"></div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-rosegold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Hari &amp; Tanggal</h4>
                    <p className="text-gray-600 text-sm mt-0.5">Sabtu, 10 Oktober 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-rosegold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Waktu</h4>
                    <p className="text-gray-600 text-sm mt-0.5">{weddingData.akadTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-rosegold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Tempat</h4>
                    <p className="text-gray-600 text-sm mt-0.5">{weddingData.venueName}</p>
                    <p className="text-xs text-gray-400 italic">Khusus Keluarga &amp; Kerabat Dekat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Resepsi Pernikahan */}
          <div className="bg-rosegold-50/70 p-8 rounded-3xl border border-rosegold-200/40 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
            {/* Top gold bar accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rosegold-400 by-rosegold-500 to-rosegold-400"></div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-bold text-rosegold-800 tracking-wide">Resepsi</span>
                <div className="w-10 h-10 rounded-full bg-rosegold-200/50 flex items-center justify-center text-rosegold-600">
                  🥂
                </div>
              </div>

              <div className="w-full h-[1px] bg-rosegold-200/60"></div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-rosegold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Hari &amp; Tanggal</h4>
                    <p className="text-gray-600 text-sm mt-0.5">Sabtu, 10 Oktober 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-rosegold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Waktu</h4>
                    <p className="text-gray-600 text-sm mt-0.5">{weddingData.resepsiTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-rosegold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Tempat</h4>
                    <p className="text-gray-600 text-sm mt-0.5">{weddingData.venueName}</p>
                    <p className="text-xs text-gray-400 italic">Terbuka Untuk Umum &amp; Kolega</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Calendar Integration Action */}
        <div className="flex justify-center" id="save-date-integration">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-rosegold-600 hover:bg-rosegold-600 text-rosegold-700 hover:text-white text-xs font-semibold tracking-wider transition-all duration-300"
          >
            <Calendar className="w-4 h-4" />
            <span>SIMPAN TANGGAL DI KALENDAR</span>
          </a>
        </div>

        {/* Location & Interactive Map Section */}
        <div className="space-y-6 pt-4" id="interactive-location-map">
          <div className="space-y-3 text-center">
            <h3 className="font-serif text-xl font-bold text-gray-800">Peta Lokasi Interaktif</h3>
            <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
              {weddingData.venueAddress}
            </p>
          </div>

          {/* Map Actions (Copy, Direction) */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-50 hover:bg-rosegold-100 text-gray-700 transition-colors duration-300 text-xs font-medium shadow-sm border border-gray-200"
              title="Copy venue address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600 animate-bounce" />
                  <span className="text-green-600 font-semibold">Alamat Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-rosegold-600" />
                  <span>Salin Alamat Venue</span>
                </>
              )}
            </button>

            <a
              href={weddingData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rosegold-600 hover:bg-rosegold-700 text-white transition-colors duration-300 text-xs font-semibold shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Petunjuk Jalan (Google Maps)</span>
            </a>
          </div>

          {/* Interactive Responsive Iframe Map Wrapper */}
          <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-rosegold-200 bg-gray-100 shadow-md relative group">
            {/* Embedded interactive map */}
            <iframe
              src={weddingData.mapIframeUrl}
              className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Interaktif Venue Pernikahan"
            ></iframe>
            
            {/* Elegant tiny floating locator flag badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-rosegold-200 text-[10px] sm:text-xs text-rosegold-700 font-semibold shadow-md flex items-center gap-1.5 z-10 pointer-events-none uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-rosegold-600 animate-ping"></span>
              The Grand Rose Ballroom
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
