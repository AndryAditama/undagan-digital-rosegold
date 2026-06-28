import { useState } from "react";
import { Gift, Copy, Check, Heart } from "lucide-react";
import { weddingData } from "../data";

export default function GiftEnvelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const bankDetails = [
    {
      id: "bank-1",
      bankName: "Bank BCA",
      accountNumber: "8690123456",
      accountHolder: "Rania Sabrina",
    },
    {
      id: "bank-2",
      bankName: "Bank Mandiri",
      accountNumber: "1370014256789",
      accountHolder: "Aditya Pratama",
    }
  ];

  const handleCopy = (num: string, id: string) => {
    navigator.clipboard.writeText(num);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  return (
    <section className="px-6 py-16 bg-gradient-to-b from-rosegold-50 via-white to-rosegold-50 text-center" id="digital-gift-envelope-section">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-2">
          <Gift className="w-8 h-8 text-rosegold-500 mx-auto animate-bounce" />
          <h2 className="font-serif text-2xl font-bold text-gray-800">Wedding Gift (Tanda Kasih)</h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, Anda dapat menyalurkannya secara digital.
          </p>
          <div className="w-12 h-[1px] bg-rosegold-300 mx-auto mt-2"></div>
        </div>

        {/* Master Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-rosegold-600 hover:bg-rosegold-700 text-white rounded-full font-semibold text-xs tracking-wider transition-all duration-300 shadow-md cursor-pointer active:scale-95 uppercase"
        >
          {isOpen ? "TUTUP INFORMASI HADIAH" : "KIRIM HADIAH / AMPLOP DIGITAL"}
        </button>

        {/* Expanding Gift Details Container */}
        {isOpen && (
          <div className="grid grid-cols-1 gap-6 pt-6 animate-fade-in">
            {bankDetails.map((bank) => (
              <div
                key={bank.id}
                className="bg-white p-6 rounded-2xl border border-rosegold-200/50 shadow-sm relative overflow-hidden flex flex-col items-center space-y-3"
              >
                {/* Thin top accent gold bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rosegold-300 to-rosegold-400"></div>

                {/* Bank badge display */}
                <div className="px-3 py-1 bg-rosegold-100 rounded-full text-rosegold-750 text-[10px] font-bold uppercase tracking-widest">
                  {bank.bankName}
                </div>

                <p className="font-mono text-lg sm:text-xl font-bold text-gray-800 tracking-wider">
                  {bank.accountNumber}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  An. {bank.accountHolder}
                </p>

                {/* Quick copy indicator and action */}
                <button
                  onClick={() => handleCopy(bank.accountNumber, bank.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border border-rosegold-200 hover:bg-rosegold-100/50 cursor-pointer text-rosegold-700 transition-colors duration-300"
                >
                  {copiedBank === bank.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600 animate-bounce" />
                      <span className="text-green-600 font-bold">Nomor Rekening Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-rosegold-500" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>
              </div>
            ))}

            {/* Delivery address option */}
            <div className="bg-rosegold-50/50 p-6 rounded-2xl border border-dashed border-rosegold-300 text-center space-y-2">
              <span className="text-rosegold-700 font-bold text-xs uppercase tracking-wider block">Kirim Kado / Logistik Fisik</span>
              <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-sm mx-auto">
                Silakan kirimkan ke alamat kediaman mempelai wanita: 
                <br />
                <span className="font-semibold text-gray-700 block mt-1">Jl. Sudirman No.Kav 21, SCBD, Jakarta Selatan (UP: Rania Sabrina)</span>
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-rosegold-500 font-medium">
                <Heart className="w-3.5 h-3.5 fill-rosegold-200" />
                <span>Terima kasih atas segala ketulusan hati Anda</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
