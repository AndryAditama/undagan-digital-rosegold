import { Instagram, Heart, Sparkles } from "lucide-react";
import { weddingData } from "../data";

export default function CoupleSection() {
  return (
    <section className="relative px-6 py-20 bg-gradient-to-b from-rosegold-50 via-white to-rosegold-50 overflow-hidden" id="couple-section">
      {/* Decorative background shapes */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-rosegold-200/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-rosegold-300/10 rounded-full blur-2xl -z-10"></div>

      {/* Ar-Rum Quote / Wedding Verse */}
      <div className="max-w-2xl mx-auto text-center space-y-6 mb-20 px-4">
        <Sparkles className="w-5 h-5 text-rosegold-400 mx-auto animate-pulse" />
        <h3 className="font-serif text-2xl font-semibold text-rosegold-800 italic">QS. Ar-Rum: 21</h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
        </p>
        <div className="w-12 h-[1px] bg-rosegold-300 mx-auto mt-4"></div>
      </div>

      {/* Couple Profiles */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center relative">
        {/* Divider Heart Icon for large screens */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center z-10">
          <div className="w-[1px] h-64 bg-gradient-to-b from-transparent via-rosegold-300 to-transparent"></div>
          <div className="absolute w-12 h-12 bg-white rounded-full border border-rosegold-200 flex items-center justify-center shadow-sm">
            <Heart className="w-5 h-5 text-rosegold-500 animate-pulse fill-rosegold-200" />
          </div>
        </div>

        {/* Bride Profil */}
        <div className="flex flex-col items-center text-center space-y-4 group">
          {/* Avatar representation using exquisite hand-crafted SVG framework to avoid broken external placeholders */}
          <div className="relative w-44 h-44 rounded-full p-2.5 bg-gradient-to-tr from-rosegold-300 to-rosegold-100 shadow-md group-hover:shadow-lg transition-shadow duration-500">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
              {/* Abstract gorgeous vector wedding silhouette representing the Bride */}
              <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-rosegold-400/80 mt-2">
                <path fill="currentColor" d="M50 20c-8.3 0-15 6.7-15 15 0 3.7 1.4 7.1 3.6 9.7-.8 1.4-1.6 3.1-2.2 4.9-2.9.5-5.2 2.7-5.7 5.7-.7 4.1.3 8 2.6 10.9L35 80h30l1.7-13.8c2.3-2.9 3.3-6.8 2.6-10.9-.5-3-2.8-5.2-5.7-5.7-.6-1.8-1.4-3.5-2.2-4.9 2.2-2.6 3.6-6 3.6-9.7 0-8.3-6.7-15-15-15zm-8 15c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8zM42 63c-1.1 0-2-.9-2-2 0-3.3 2.7-6 6-6h8c3.3 0 6 2.7 6 6 0 1.1-.9 2-2 2H42z"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-rosegold-100/30 to-transparent"></div>
            </div>
            
            {/* Soft decorative flower ornament */}
            <div className="absolute -bottom-2 -right-1 w-8 h-8 rounded-full bg-rosegold-100 border border-rosegold-300 flex items-center justify-center text-rosegold-600 shadow-sm">
              ✨
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="font-script text-4xl text-rosegold-800 font-semibold">{weddingData.brideName}</h2>
            <h3 className="font-serif text-lg font-medium text-gray-800">{weddingData.brideFullName}</h3>
            <p className="text-xs text-rosegold-600 font-semibold tracking-widest uppercase mt-1">Putri Tercinta Dari:</p>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">{weddingData.brideFather}</p>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">&amp; {weddingData.brideMother}</p>
          </div>

          <a
            href={`https://instagram.com/${weddingData.brideInstagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rosegold-100 hover:bg-rosegold-200 text-rosegold-700 text-xs font-semibold tracking-wide transition-all duration-300 transform group-hover:translate-y-[-2px]"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@{weddingData.brideInstagram}</span>
          </a>
        </div>

        {/* Small Heart divider for mobile layout */}
        <div className="flex md:hidden items-center justify-center py-4">
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent to-rosegold-200"></div>
          <div className="mx-3 text-rosegold-400">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <div className="w-16 h-[1.5px] bg-gradient-to-l from-transparent to-rosegold-200"></div>
        </div>

        {/* Groom Profil */}
        <div className="flex flex-col items-center text-center space-y-4 group">
          {/* Avatar representation using exquisite hand-crafted SVG framework to avoid broken external placeholders */}
          <div className="relative w-44 h-44 rounded-full p-2.5 bg-gradient-to-tr from-rosegold-300 to-rosegold-100 shadow-md group-hover:shadow-lg transition-shadow duration-500">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden相对">
              {/* Abstract gorgeous vector wedding silhouette representing the Groom */}
              <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-rosegold-400/80 mt-2">
                <path fill="currentColor" d="M50 20c-8.3 0-15 6.7-15 15 0 3.7 1.4 7.1 3.6 9.7-.8 1.4-1.6 3.1-2.2 4.9-2.9.5-5.2 2.7-5.7 5.7-.7 4.1.3 8 2.6 10.9L35 80h30l1.7-13.8c2.3-2.9 3.3-6.8 2.6-10.9-.5-3-2.8-5.2-5.7-5.7-.6-1.8-1.4-3.5-2.2-4.9 2.2-2.6 3.6-6 3.6-9.7 0-8.3-6.7-15-15-15zm-8 15c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8zM42 63c-1.1 0-2-.9-2-2 0-3.3 2.7-6 6-6h8c3.3 0 6 2.7 6 6 0 1.1-.9 2-2 2H42z" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-rosegold-100/30 to-transparent"></div>
            </div>
            
            {/* Soft decorative leaf ornament */}
            <div className="absolute -bottom-2 -right-1 w-8 h-8 rounded-full bg-rosegold-100 border border-rosegold-300 flex items-center justify-center text-rosegold-600 shadow-sm">
              🌿
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="font-script text-4xl text-rosegold-800 font-semibold">{weddingData.groomName}</h2>
            <h3 className="font-serif text-lg font-medium text-gray-800">{weddingData.groomFullName}</h3>
            <p className="text-xs text-rosegold-600 font-semibold tracking-widest uppercase mt-1">Putra Tercinta Dari:</p>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">{weddingData.groomFather}</p>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">&amp; {weddingData.groomMother}</p>
          </div>

          <a
            href={`https://instagram.com/${weddingData.groomInstagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rosegold-100 hover:bg-rosegold-200 text-rosegold-700 text-xs font-semibold tracking-wide transition-all duration-300 transform group-hover:translate-y-[-2px]"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@{weddingData.groomInstagram}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
