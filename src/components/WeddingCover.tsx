import { Mail } from "lucide-react";
import { weddingData } from "../data";

interface WeddingCoverProps {
  onOpen: () => void;
}

export default function WeddingCover({ onOpen }: WeddingCoverProps) {
  // Parse guest name from URL parameters (e.g., ?to=Ringgo&Keluarga or ?guest=Bapak%20Prabowo)
  const getGuestName = () => {
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get("to") || params.get("guest") || params.get("name") || params.get("tamu");
    return guestParam ? decodeURIComponent(guestParam) : null;
  };

  const guestName = getGuestName();

  // Try to use our generated rose gold bg, fallback to a elegant gradient if anything happens
  const bgPath = "/src/assets/images/rose_gold_bg_1781586756488.jpg";

  return (
    <div 
      className="relative flex flex-col items-center justify-between min-h-screen w-full px-6 py-12 md:py-16 text-center select-none overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(253, 245, 246, 0.85), rgba(253, 245, 246, 0.95)), url('${bgPath}')`,
      }}
    >
      {/* Top Border Accent */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-rosegold-200 via-rosegold-400 to-rosegold-200"></div>

      {/* Header Accent */}
      <div className="space-y-2 mt-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <p className="text-sm uppercase tracking-[0.25em] font-medium text-rosegold-600">The Wedding Invitation of</p>
        <div className="w-16 h-[1px] bg-rosegold-300 mx-auto mt-2"></div>
      </div>

      {/* Main Couple Names */}
      <div className="my-auto space-y-4 py-8">
        <h1 className="font-script text-6xl md:text-7xl lg:text-8xl text-rosegold-600 animate-fade-in drop-shadow-sm font-light">
          {weddingData.brideName} &amp; {weddingData.groomName}
        </h1>
        
        {/* Date Display */}
        <p className="font-serif text-lg md:text-xl text-gray-600 tracking-wide mt-2">
          Sabtu, 10 Oktober 2026
        </p>
      </div>

      {/* Guest Name & Opening Action Area */}
      <div className="w-full max-w-md space-y-6 mt-auto">
        {guestName ? (
          <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-rosegold-100 shadow-md transform transition-all duration-500 scale-100 hover:scale-[1.02] mx-auto w-11/12 max-w-xs md:max-w-sm">
            <p className="text-xs text-gray-500 uppercase tracking-widest leading-relaxed">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <h2 className="font-serif text-lg md:text-xl font-semibold text-rosegold-800 mt-2 line-clamp-2">
              {guestName}
            </h2>
            <div className="w-8 h-[1.5px] bg-rosegold-300 mx-auto my- dark:bg-rosegold-400/50 mt-3 mb-2"></div>
            <p className="text-[11px] text-gray-400 italic">Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di momen bahagia kami.</p>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-md py-4 px-6 rounded-2xl border border-rosegold-100/100 shadow-sm max-w-xs mx-auto">
            <p className="text-xs text-rosegold-700 font-medium tracking-wide">
              Spesial Teruntuk Sahabat &amp; Keluarga Tercinta
            </p>
          </div>
        )}

        {/* Button to Open */}
        <button
          onClick={onOpen}
          id="btn-buka-undangan"
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-rosegold-600 text-white rounded-full font-medium tracking-wider text-sm shadow-md hover:bg-rosegold-750 transition-all duration-300 active:scale-95 cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rosegold-300"
        >
          <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span>BUKA UNDANGAN</span>
          
          {/* Subtle button gleam effect */}
          <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-rosegold-200/60 rounded-bl-md"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-rosegold-200/60 rounded-br-md"></div>
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-rosegold-200/60 rounded-tl-md"></div>
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-rosegold-200/60 rounded-tr-md"></div>
    </div>
  );
}
