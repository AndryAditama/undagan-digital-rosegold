import { useState, useEffect } from "react";
import { Link2, Copy, Check, Share2, MessageCircle, HelpCircle } from "lucide-react";

export default function LinkGenerator() {
  const [guestName, setGuestName] = useState("");
  const [prefix, setPrefix] = useState("Yth. ");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedWa, setCopiedWa] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Read current origin URL to build a real working link
  useEffect(() => {
    const origin = window.location.origin + window.location.pathname;
    if (guestName.trim()) {
      const formattedName = encodeURIComponent(prefix + guestName.trim());
      setGeneratedUrl(`${origin}?to=${formattedName}`);
    } else {
      setGeneratedUrl(origin);
    }
  }, [guestName, prefix]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getWhatsAppMessage = () => {
    const formattedName = prefix + (guestName.trim() || "[Nama Tamu]");
    return `Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i *${formattedName}* untuk menghadiri acara pernikahan kami.\n\nDetail undangan dapat diakses melalui link berikut:\n${generatedUrl}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;
  };

  const handleCopyWA = () => {
    navigator.clipboard.writeText(getWhatsAppMessage());
    setCopiedWa(true);
    setTimeout(() => setCopiedWa(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(getWhatsAppMessage());
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  };

  return (
    <section className="px-6 py-16 bg-white border-t border-b border-rosegold-100" id="link-generator-section">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-rosegold-100 flex items-center justify-center text-rosegold-600 mx-auto">
            <Link2 className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-rosegold-600">Share Invitation</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-gray-800 font-bold">Pembuat Link Undangan Kustom</h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Tulis nama tamu undangan Anda di bawah ini untuk membuat link khusus yang menampilkan nama mereka secara personal di cover website undangan.
          </p>
          <div className="w-16 h-[1.5px] bg-rosegold-300 mx-auto mt-2"></div>
        </div>

        {/* Builder Panel */}
        <div className="bg-rosegold-50/50 rounded-3xl border border-rosegold-200/50 p-6 sm:p-8 space-y-6 shadow-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Greeting prefix Selector */}
            <div className="space-y-1.5 sm:col-span-1">
              <label htmlFor="prefix-select" className="text-xs uppercase tracking-wider font-semibold text-gray-500 block">
                Panggilan / Sebutan
              </label>
              <select
                id="prefix-select"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-rosegold-400 focus:ring focus:ring-rosegold-200/50 text-sm cursor-pointer"
              >
                <option value="Yth. ">Yth. </option>
                <option value="Kepada Yth. ">Kepada Yth. </option>
                <option value="Bapak ">Bapak </option>
                <option value="Ibu ">Ibu </option>
                <option value="Kakak ">Kakak </option>
                <option value="Sahabatku ">Sahabatku </option>
                <option value="Keluarga ">Keluarga </option>
                <option value="">Tanpa Panggilan</option>
              </select>
            </div>

            {/* Guest Name input field */}
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="input-guest-name" className="text-xs uppercase tracking-wider font-semibold text-gray-500 block">
                Nama Tamu Undangan
              </label>
              <input
                type="text"
                id="input-guest-name"
                placeholder="Simulasi: Budi Santoso &amp; Rekan"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-rosegold-400 focus:ring focus:ring-rosegold-200/50 text-sm"
              />
            </div>
          </div>

          {/* Generated Result Container */}
          <div className="space-y-3 bg-white p-5 rounded-2xl border border-rosegold-200/30">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block">Hasil Link Undangan Kustom:</span>
            
            <div className="flex items-center gap-2 bg-gray-50 px-3.5 py-2.5 rounded-xl border border-gray-200">
              <span className="text-xs font-mono text-gray-600 truncate flex-1 leading-none select-all" id="generated-url-text">
                {generatedUrl}
              </span>
              
              <button
                onClick={handleCopyLink}
                className="p-2 text-rosegold-600 hover:bg-rosegold-100 rounded-lg transition-colors cursor-pointer"
                title="Copy Link to Clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-green-600 animate-bounce" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Mini preview notification */}
            {guestName.trim() && (
              <p className="text-[11px] text-gray-400 italic">
                Akan memunculkan tulisan personal: <b className="text-rosegold-700 not-italic">"Kepada Yth. Bapak/Ibu/Saudara/i {prefix}{guestName.trim()}"</b> di bagian depan sampul undangan.
              </p>
            )}
          </div>

          {/* Share Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Copy template message */}
            <button
              onClick={handleCopyWA}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-rosegold-300 text-rosegold-700 hover:bg-rosegold-100/50 transition-colors duration-300 text-xs font-semibold cursor-pointer shadow-sm"
            >
              {copiedWa ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Template Pesan Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-rosegold-500" />
                  <span>Salin Template Pesan WA</span>
                </>
              )}
            </button>

            {/* Direct Open WhatsApp */}
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white transition-colors duration-300 text-xs font-semibold cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Kirim via WhatsApp</span>
            </button>
          </div>

          {/* Toggle Interactive Guide Info */}
          <div className="text-center">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-rosegold-600 cursor-pointer transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showGuide ? "Sembunyikan Panduan URL Parameter" : "Bagaimana cara kerja manual tanpa tools ini?"}</span>
            </button>

            {showGuide && (
              <div className="mt-4 p-5 rounded-2xl bg-white text-left border border-gray-100 text-xs text-gray-500 space-y-3 leading-relaxed animate-fade-in">
                <p>
                  Sistem undangan mendeteksi parameter <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-rosegold-700">?to=</code> pada link URL Anda. Anda dapat membuat custom link secara langsung atau manual dengan cara:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>Gunakan link utama Anda, contoh: <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[10px]">https://domain-undangan.com/</code></li>
                  <li>Tambahkan tanda tanya di belakangnya: <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[10px]">?to=</code></li>
                  <li>Masukkan nama tamu undangan di kelanjutannya, pisahkan spasi dengan tanda tambah (+), contoh: <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[10px]">?to=Budi+Santoso</code></li>
                  <li>Selesai! Saat tamu membuka link <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[10px]">.../?to=Budi+Santoso</code>, sampul depan undangan otomatis menyambut nama mereka.</li>
                </ol>
                <p className="text-[10px] text-gray-400 italic">
                  Catatan: Anda juga bisa menggunakan kata kunci alternatif seperti <code className="font-mono text-[9px]">?guest=</code> atau <code className="font-mono text-[9px]">?tamu=</code>.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
