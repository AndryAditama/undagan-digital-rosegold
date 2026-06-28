import { useState } from "react";
import { Camera, ZoomIn, X, Sparkles } from "lucide-react";

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // High quality curated unsplash wedding and romantic couple photos
  const galleryImages = [
    {
      id: "img-1",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
      title: "Momen Bahagia",
      sizeClass: "md:col-span-2 md:row-span-2"
    },
    {
      id: "img-2",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600",
      title: "Janji Suci",
      sizeClass: "md:col-span-1 md:row-span-1"
    },
    {
      id: "img-3",
      url: "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=600",
      title: "Dekorasi Cantik",
      sizeClass: "md:col-span-1 md:row-span-1"
    },
    {
      id: "img-4",
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800",
      title: "Langkah Bersama",
      sizeClass: "md:col-span-1 md:row-span-2"
    },
    {
      id: "img-5",
      url: "https://images.unsplash.com/photo-1473177104440-ffee2f37e098?auto=format&fit=crop&q=80&w=600",
      title: "Ketulusan Cinta",
      sizeClass: "md:col-span-1 md:row-span-1"
    },
    {
      id: "img-6",
      url: "https://images.unsplash.com/photo-1520854221256-17451cc35953?auto=format&fit=crop&q=80&w=600",
      title: "Menatap Masa Depan",
      sizeClass: "md:col-span-1 md:row-span-1"
    }
  ];

  return (
    <section className="px-6 py-20 bg-gradient-to-b from-white via-rosegold-50 to-white" id="gallery-section">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3">
          <Camera className="w-6 h-6 text-rosegold-500 mx-auto opacity-70" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-rosegold-600">Our Photo Gallery</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-800 font-bold">Galeri Kemesraan</h2>
          <div className="w-16 h-[1.5px] bg-rosegold-300 mx-auto mt-2"></div>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px]">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img.url)}
              className={`relative rounded-3xl overflow-hidden shadow-sm group cursor-zoom-in border border-rosegold-100 bg-gray-50 transform hover:scale-[1.01] transition-all duration-300 ${img.sizeClass}`}
            >
              <img
                src={img.url}
                alt={img.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Overlapping Hover Tint Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-rosegold-900/60 via-rosegold-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div className="text-white space-y-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-rosegold-200">Lihat Foto</span>
                  </div>
                  <h4 className="font-serif text-sm font-semibold tracking-wide">{img.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal overlay view */}
        {activeImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
            onClick={() => setActiveImage(null)}
          >
            {/* Upper floating close button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main large picture content wrapped in safe referrer policies */}
            <div 
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()} // stop close on image click
            >
              <img
                src={activeImage}
                alt="Enlarged gallery view"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[80vh] object-contain mx-auto"
              />
              
              {/* Bottom luxury accent detail */}
              <div className="absolute bottom-0 inset-x-0 bg-black/40 backdrop-blur-sm p-3 text-center text-xs text-rosegold-200 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-rosegold-400" />
                <span>Rania &amp; Aditya • Memori Indah</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
