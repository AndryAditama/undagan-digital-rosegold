import { useState, FormEvent } from "react";
import { Send, CheckCircle2, Users, MessageSquare, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { RSVP } from "../types";

interface RSVPFormProps {
  onSubmitRSVP: (rsvp: Omit<RSVP, "id" | "createdAt" | "likes">) => void;
}

export default function RSVPForm({ onSubmitRSVP }: RSVPFormProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"hadir" | "tidak_hadir">("hadir");
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simple validation
    if (!name.trim()) {
      setError("Mohon isi nama lengkap Anda.");
      return;
    }
    if (!message.trim()) {
      setError("Mohon berikan ucapan atau doa restu.");
      return;
    }

    onSubmitRSVP({
      name: name.trim(),
      status,
      guestsCount: status === "hadir" ? guestsCount : 0,
      message: message.trim(),
    });

    setIsSuccess(true);

    // Elegant celebratory dual-cannon rose gold & gold confetti explosion
    try {
      const end = Date.now() + 2 * 1000; // 2 seconds
      const colors = ["#ebb5be", "#d17283", "#b75365", "#e6c79c", "#d4af37", "#ffffff"];

      // Instant center burst
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: colors,
      });

      // Continuous side fountains for 2 seconds
      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.8 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.8 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      // Delay side fountains slightly for magnificent rhythm
      setTimeout(frame, 150);
    } catch (confettiError) {
      console.warn("Confetti animation error: ", confettiError);
    }

    // Reset form
    setName("");
    setStatus("hadir");
    setGuestsCount(1);
    setMessage("");

    // Auto clear success screen after 5 seconds to let them submit again if they want
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <div className="bg-white rounded-3xl border border-rosegold-200/60 p-6 sm:p-8 md:p-10 shadow-lg relative overflow-hidden" id="rsvp-form-container">
      {/* Delicate background watercolor design simulation with border-accent */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rosegold-200 via-rosegold-400 to-rosegold-200"></div>

      {isSuccess ? (
        <div className="text-center py-10 space-y-4 animate-fade-in">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-gray-800">Terima Kasih Banyak!</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
            Respon RSVP dan doa restu berharga Anda telah terkirim dan tercatat di buku tamu digital kami.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-4 text-xs font-semibold text-rosegold-600 hover:text-rosegold-800 underline uppercase tracking-widest cursor-pointer"
          >
            Kirim Respon Lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-2xl font-bold text-gray-800">RSVP &amp; Doa Restu</h3>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
              Sampaikan kehadiran Anda serta berikan doa restu terindah untuk melengkapi kebahagiaan kedua mempelai.
            </p>
            <div className="w-12 h-[1px] bg-rosegold-300 mx-auto mt-2"></div>
          </div>

          {/* Validation Error Alert */}
          {error && (
            <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Input: Nama */}
          <div className="space-y-1.5">
            <label htmlFor="rsvp-name" className="text-xs uppercase tracking-wider font-semibold text-gray-500 block">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="rsvp-name"
              placeholder="Contoh: Budi Santoso"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rosegold-400 focus:ring focus:ring-rosegold-200/50 bg-gray-50/50 transition-all duration-300 text-sm"
              autoComplete="name"
            />
          </div>

          {/* Input: Konfirmasi Kehadiran */}
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-500 block">
              Konfirmasi Kehadiran
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("hadir")}
                className={`py-3 px-4 rounded-xl text-xs font-semibold cursor-pointer border tracking-wider transition-all duration-300 ${
                  status === "hadir"
                    ? "bg-rosegold-600 border-rosegold-600 text-white shadow-sm"
                    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                SAYA AKAN HADIR
              </button>
              <button
                type="button"
                onClick={() => setStatus("tidak_hadir")}
                className={`py-3 px-4 rounded-xl text-xs font-semibold cursor-pointer border tracking-wider transition-all duration-300 ${
                  status === "tidak_hadir"
                    ? "bg-rosegold-600 border-rosegold-600 text-white shadow-sm"
                    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                MAAF, TIDAK HADIR
              </button>
            </div>
          </div>

          {/* Input: Jumlah Tamu (Conditionally show if Hadir) */}
          {status === "hadir" && (
            <div className="space-y-1.5 animate-fade-in mb-2">
              <label htmlFor="rsvp-guests" className="text-xs uppercase tracking-wider font-semibold text-gray-500 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-rosegold-500" />
                <span>Jumlah Tamu yang Dibawa</span>
              </label>
              <select
                id="rsvp-guests"
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rosegold-400 bg-white text-sm cursor-pointer"
              >
                <option value={1}>1 Orang (Hanya Saya)</option>
                <option value={2}>2 Orang (Saya &amp; Pasangan/Teman)</option>
                <option value={3}>3 Orang</option>
                <option value={4}>4 Orang (Maksimal Keluarga)</option>
              </select>
            </div>
          )}

          {/* Input: Doa / Ucapan */}
          <div className="space-y-1.5">
            <label htmlFor="rsvp-message" className="text-xs uppercase tracking-wider font-semibold text-gray-500 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-rosegold-500" />
              <span>Ucapan &amp; Doa Restu</span>
            </label>
            <textarea
              id="rsvp-message"
              rows={4}
              placeholder="Tuliskan ucapan selamat dan doa restu terindah Anda di sini..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rosegold-400 focus:ring focus:ring-rosegold-200/50 bg-gray-50/50 transition-all duration-300 text-sm resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="rsvp-submit-button"
            className="w-full py-4 px-6 bg-rosegold-600 hover:bg-rosegold-750 text-white rounded-xl font-medium tracking-wider text-sm transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>KIRIM JAWABAN RSVP</span>
          </button>
        </form>
      )}
    </div>
  );
}
