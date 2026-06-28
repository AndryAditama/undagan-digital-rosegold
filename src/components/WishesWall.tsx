import { useState } from "react";
import { MessageCircle, Heart, Search, Users, CalendarCheck, CalendarX, SlidersHorizontal, Cloud, RefreshCw, AlertCircle } from "lucide-react";
import { RSVP } from "../types";

interface WishesWallProps {
  wishes: RSVP[];
  onLikeWish: (id: string) => void;
  isSyncing?: boolean;
  syncError?: boolean;
}

export default function WishesWall({ wishes, onLikeWish, isSyncing, syncError }: WishesWallProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "hadir" | "tidak_hadir">("all");

  // Sum Stats
  const totalWishes = wishes.length;
  const attendingRsvps = wishes.filter(w => w.status === "hadir");
  const totalAttendingGuests = attendingRsvps.reduce((acc, current) => acc + (current.guestsCount || 1), 0);
  const totalRegrets = wishes.filter(w => w.status === "tidak_hadir").length;

  // Filter logic
  const filteredWishes = wishes.filter(wish => {
    const matchesSearch = wish.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          wish.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || wish.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Simple relative date formatting for Indoneisan language
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) return "Baru saja";
      if (diffMins < 60) return `${diffMins} menit yang lalu`;
      if (diffHours < 24) return `${diffHours} jam yang lalu`;
      if (diffDays < 7) return `${diffDays} hari yang lalu`;

      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "Baru saja";
    }
  };

  return (
    <div className="space-y-8" id="wishes-wall-container">
      
      {/* RSVP Stats Summary Grid */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
        {/* Stat: Total Hadir RSVPs */}
        <div className="bg-white p-4 rounded-2xl border border-rosegold-100 shadow-sm flex flex-col items-center justify-center">
          <CalendarCheck className="w-5 h-5 text-green-500 mb-1" />
          <span className="text-lg md:text-xl font-bold text-gray-800">{attendingRsvps.length}</span>
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">RSVP Hadir</span>
        </div>

        {/* Stat: Total Guests Sum */}
        <div className="bg-white p-4 rounded-2xl border border-rosegold-100 shadow-sm flex flex-col items-center justify-center">
          <Users className="w-5 h-5 text-rosegold-500 mb-1" />
          <span className="text-lg md:text-xl font-bold text-gray-800">{totalAttendingGuests}</span>
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Total Pax Tamu</span>
        </div>

        {/* Stat: Regrets */}
        <div className="bg-white p-4 rounded-2xl border border-rosegold-100 shadow-sm flex flex-col items-center justify-center">
          <CalendarX className="w-5 h-5 text-gray-400 mb-1" />
          <span className="text-lg md:text-xl font-bold text-gray-800">{totalRegrets}</span>
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Absen (Tidak Hadir)</span>
        </div>
      </div>

      {/* Control Block: Search & Filter */}
      <div className="bg-white rounded-2xl border border-rosegold-100 p-4 shadow-sm space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari ucapan atau nama pengirim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 rounded-xl border border-gray-200 focus:border-rosegold-300 focus:ring focus:ring-rosegold-100/50 text-xs transition-all duration-300"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-400 font-medium inline-flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            <span>Filter Status:</span>
          </span>
          
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              statusFilter === "all"
                ? "bg-rosegold-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-205"
            }`}
          >
            Semua ({totalWishes})
          </button>

          <button
            onClick={() => setStatusFilter("hadir")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              statusFilter === "hadir"
                ? "bg-green-500 text-white"
                : "bg-green-50 text-green-700 hover:bg-green-100"
            }`}
          >
            Hadir ({attendingRsvps.length})
          </button>

          <button
            onClick={() => setStatusFilter("tidak_hadir")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              statusFilter === "tidak_hadir"
                ? "bg-gray-400 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Tidak Hadir ({totalRegrets})
          </button>
        </div>

        {/* Syncing Status Indicator */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-[10px]">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Cloud className="w-3.5 h-3.5 text-rosegold-400 fill-rosegold-100/50" />
            <span>Database: <span className="text-gray-500 font-semibold uppercase">Google Sheets Live</span></span>
          </div>
          
          <div className="flex items-center gap-1 font-medium">
            {isSyncing ? (
              <span className="text-rosegold-600 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin text-rosegold-400" />
                <span>Mensinkronkan...</span>
              </span>
            ) : syncError ? (
              <span className="text-amber-600 flex items-center gap-1" title="Koneksi lembur, menggunakan data lokal">
                <AlertCircle className="w-3 h-3 text-amber-505" />
                <span>Offline Fallback</span>
              </span>
            ) : (
              <span className="text-green-600 flex items-center gap-1 px-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-0.5 animate-pulse"></span>
                <span>Terupdate</span>
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Wishes Feed Scrollable Container */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredWishes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-rosegold-100 shadow-sm text-gray-400 italic text-xs">
            Tidak ada ucapan ditemukan matching kriteria pencarian.
          </div>
        ) : (
          filteredWishes.map((wish) => (
            <div
              key={wish.id}
              className="bg-white rounded-2xl p-5 border border-rosegold-100/80 shadow-sm space-y-3 relative hover:border-rosegold-200/100 transition-colors duration-300 animate-fade-in"
            >
              {/* Header card info */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-gray-800 text-sm">{wish.name}</span>
                  
                  {/* Status Badge */}
                  {wish.status === "hadir" ? (
                    <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 font-semibold rounded-full border border-green-200/60 inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      <span>Hadir ({wish.guestsCount || 1} Pax)</span>
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-500 font-semibold rounded-full border border-gray-200 inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                      <span>Maaf, Tidak Hadir</span>
                    </span>
                  )}
                </div>

                {/* Relative Timestamp */}
                <span className="text-[10px] text-gray-400 font-normal">
                  {formatTime(wish.createdAt)}
                </span>
              </div>

              {/* Message text */}
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                {wish.message}
              </p>

              {/* Bottom footer: Hearts/likes block */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 text-rosegold-400" />
                  <span>Doa Restu</span>
                </span>

                <button
                  onClick={() => onLikeWish(wish.id)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors duration-300 font-semibold cursor-pointer active:scale-95 shadow-sm"
                  title="Kirim Cinta"
                >
                  <Heart className="w-3.5 h-3.5 fill-red-400 text-red-500 animate-pulse" />
                  <span>{wish.likes}</span>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      <style>{`
        /* Minimalist thin custom scrollbar to match luxury feeling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(183, 83, 101, 0.05);
          border-radius: 9px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(183, 83, 101, 0.2);
          border-radius: 9px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(183, 83, 101, 0.45);
        }
      `}</style>

    </div>
  );
}
