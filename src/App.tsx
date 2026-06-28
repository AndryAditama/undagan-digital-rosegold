/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Heart, Sparkles } from "lucide-react";
import { RSVP } from "./types";
import { initialWishes, weddingData } from "./data";

// Components
import WeddingCover from "./components/WeddingCover";
import AudioPlayer from "./components/AudioPlayer";
import Countdown from "./components/Countdown";
import CoupleSection from "./components/CoupleSection";
import EventDetails from "./components/EventDetails";
import GallerySection from "./components/GallerySection";
import RSVPForm from "./components/RSVPForm";
import WishesWall from "./components/WishesWall";
import GiftEnvelope from "./components/GiftEnvelope";
import LinkGenerator from "./components/LinkGenerator";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKvwHVSr-M0RtVQv4mq8SwjpNEYWrIHMappdUx20wwhrf107jDkbdkzLYUmZwC0J6X5A/exec";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wishes, setWishes] = useState<RSVP[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Safely fetch and map Google Sheets rows to the RSVP format
  const syncWishesFromSheets = async () => {
    setIsSyncing(true);
    setSyncError(false);
    try {
      // Use cache buster parameter to avoid old CDN or browser stale HTTP caching
      const response = await fetch(`${SCRIPT_URL}?_=${Date.now()}`);
      if (!response.ok) throw new Error("Gagal mengambil data dari Google Sheets");
      
      const json = await response.json();
      
      // Determine if results are in raw array, or nested in standard 'data' block
      const rawRows = Array.isArray(json) ? json : (json && Array.isArray(json.data) ? json.data : null);

      if (rawRows && rawRows.length > 0) {
        const mappedRows: RSVP[] = rawRows.map((item: any, idx: number) => {
          // Helper function for ultra-robust attribute lookup
          const getProp = (obj: any, keys: string[], fallback: any): any => {
            if (!obj || typeof obj !== "object") return fallback;
            for (const k of keys) {
              if (k in obj && obj[k] !== undefined && obj[k] !== null) return obj[k];
            }
            const lowerKeys = keys.map(k => k.toLowerCase());
            for (const objKey of Object.keys(obj)) {
              if (lowerKeys.includes(objKey.toLowerCase())) return obj[objKey];
            }
            const normKeys = keys.map(k => k.toLowerCase().replace(/[^a-z0-9]/g, ""));
            for (const objKey of Object.keys(obj)) {
              const normObjKey = objKey.toLowerCase().replace(/[^a-z0-9]/g, "");
              if (normKeys.includes(normObjKey)) return obj[objKey];
            }
            return fallback;
          };

          const id = String(getProp(item, ["ID Undangan (Sistem)", "id", "id_undangan", "idUndangan", "ID"], `wish-${idx}`));
          const name = String(getProp(item, ["Nama", "nama", "Name", "name", "sender"], "Tamu Tanpa Nama"));
          
          const rawStatus = String(getProp(item, ["Kehadiran", "status", "Status", "kehadiran_tamu", "kehadiran"], "hadir")).toLowerCase();
          const status: "hadir" | "tidak_hadir" = 
            (rawStatus.includes("tidak") || rawStatus.includes("absen") || rawStatus.includes("regret") || rawStatus.includes("non")) 
              ? "tidak_hadir" 
              : "hadir";

          const guestsCount = Number(getProp(item, ["Jumlah Tamu", "jumlah_tamu", "jumlahTamu", "guestsCount", "pax", "Pax"], status === "tidak_hadir" ? 0 : 1));
          const message = String(getProp(item, ["Ucapan", "ucapan", "pesan", "Pesan", "message"], "Berkah selalu untuk kedua mempelai."));
          const createdAt = String(getProp(item, ["Waktu Kirim", "waktu_kirim", "createdAt", "created_at", "Timestamp", "timestamp", "tanggal", "Tanggal"], new Date().toISOString()));
          const likes = Number(getProp(item, ["Likes", "likes", "Suka", "suka"], 0));

          return { id, name, status, guestsCount, message, createdAt, likes };
        });

        // Sort descending by date/id so latest wishes show up first
        mappedRows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setWishes(mappedRows);
        localStorage.setItem("wedding_rsvps", JSON.stringify(mappedRows));
      }
    } catch (err) {
      console.warn("Connection with Google Sheets had issues. Using local copy instead:", err);
      setSyncError(true);
    } finally {
      setIsSyncing(false);
    }
  };

  // Detect ?admin=true or ?builder=true context for custom guest link generator
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true" || params.get("builder") === "true") {
      setIsAdmin(true);
    }
  }, []);

  // Load RSVPs & wishes from local cache, then update from sheets
  useEffect(() => {
    const cached = localStorage.getItem("wedding_rsvps");
    if (cached) {
      try {
        setWishes(JSON.parse(cached));
      } catch (err) {
        console.error("Failed to parse cached wishes", err);
        setWishes(initialWishes);
      }
    } else {
      setWishes(initialWishes);
    }

    // Pull real-time sheets database rows
    syncWishesFromSheets();

    // Set polling interval to synchronize list every 20 seconds
    const interval = setInterval(() => {
      syncWishesFromSheets();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  // Handle new RSVP submission
  const handleAddRSVP = async (newRsvpData: Omit<RSVP, "id" | "createdAt" | "likes">) => {
    const newRsvp: RSVP = {
      ...newRsvpData,
      id: `wish-${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    // 1. Update UI and cache immediately to ensure flawless high-speed UX
    const updated = [newRsvp, ...wishes];
    setWishes(updated);
    localStorage.setItem("wedding_rsvps", JSON.stringify(updated));

    // 2. Submit to the spreadsheets REST service in the background
    try {
      const payload = {
        // Multi-language fallback mapping fields
        action: "insert",
        id: newRsvp.id,
        name: newRsvp.name,
        status: newRsvp.status,
        guestsCount: newRsvp.guestsCount,
        message: newRsvp.message,
        createdAt: newRsvp.createdAt,
        likes: newRsvp.likes,

        // Exact Indonesian Spreadsheet Column Names (mapped from Excel/Sheets headers)
        "ID Undangan (Sistem)": newRsvp.id,
        "Nama": newRsvp.name,
        "Kehadiran": newRsvp.status === "hadir" ? "hadir" : "tidak_hadir",
        "Jumlah Tamu": newRsvp.guestsCount,
        "Ucapan": newRsvp.message,
        "Waktu Kirim": newRsvp.createdAt,
        "Likes": newRsvp.likes,

        // Legacy/alternate field variables
        nama: newRsvp.name,
        kehadiran: newRsvp.status === "hadir" ? "hadir" : "tidak_hadir",
        jumlahTamu: newRsvp.guestsCount,
        ucapan: newRsvp.message,
        pesan: newRsvp.message,
        tanggal: newRsvp.createdAt
      };

      // Best practice for Google Sheets is text/plain to avoid CORS trigger options block
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      console.log("Successfully queued Google Sheets update.");
      
      // Pull fresh state after brief delay so if the sheet responds, users get full sync
      setTimeout(() => {
        syncWishesFromSheets();
      }, 1500);

    } catch (err) {
      console.error("Failed to sync background RSVP to Google Sheets:", err);
    }
  };

  // Handle heart like action on guest book entry
  const handleLikeWish = async (id: string) => {
    let currentLikes = 0;
    const updated = wishes.map((w) => {
      if (w.id === id) {
        currentLikes = w.likes;
        return { ...w, likes: w.likes + 1 };
      }
      return w;
    });

    setWishes(updated);
    localStorage.setItem("wedding_rsvps", JSON.stringify(updated));

    // Async push the like increment to Google Sheet
    try {
      const payload = {
        action: "like",
        id: id,
        "ID Undangan (Sistem)": id,
        likes: currentLikes + 1,
        "Likes": currentLikes + 1,
        suka: currentLikes + 1
      };

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn("Failed to push background wish appreciation:", err);
    }
  };

  // Turn on background audio and display main invitation content on open
  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
    
    // Smooth scroll straight to content
    setTimeout(() => {
      const element = document.getElementById("main-invitation-container");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-rosegold-50 text-rosegold-950 flex flex-col font-sans transition-colors duration-500">
      
      {/* Floating Elegant Background Music widget */}
      <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} visible={isOpen} />
      
      {/* 1. Introductory Wedding Cover Layout */}
      {!isOpen ? (
        <WeddingCover onOpen={handleOpenInvitation} />
      ) : (
        <div className="animate-fade-in relative flex-1 flex flex-col" id="main-invitation-container">
          
          {/* Majestic Hero Banner */}
          <header 
            className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-16 overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(253, 245, 246, 0.45), rgba(253, 245, 246, 0.95)), url('/src/assets/images/rose_gold_bg_1781586756488.jpg')`,
            }}
          >
            {/* Elegant luxury outer golden line border framing */}
            <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-rosegold-200/50 rounded-2xl pointer-events-none -z-0"></div>

            <div className="space-y-6 max-w-xl mx-auto z-10">
              <Sparkles className="w-5 h-5 text-rosegold-500 mx-auto animate-pulse" />
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-rosegold-600">Undangan Pernikahan</p>
              
              <h1 className="font-script text-7xl sm:text-8xl text-rosegold-600 font-light drop-shadow-sm">
                {weddingData.brideName} &amp; {weddingData.groomName}
              </h1>

              <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-rosegold-400 to-transparent mx-auto"></div>

              <p className="text-sm font-serif italic text-gray-500 max-w-sm mx-auto leading-relaxed">
                "Menyatukan dua hati, dua jiwa, dan dua keluarga dalam ikatan suci pernikahan."
              </p>

              {/* Countdown Board */}
              <Countdown />
            </div>

            {/* Cute bottom geometric down arrow indicator */}
            <div className="absolute bottom-10 flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest text-rosegold-600/80 font-semibold animate-bounce">
              <span>Scroll Ke Bawah</span>
              <span className="text-xs">↓</span>
            </div>
          </header>

          {/* 2. Couple Section (Bride & Groom Profiles) */}
          <CoupleSection />

          {/* 3. Event Details Section (Schedules, Addresses, Maps) */}
          <EventDetails />

          {/* 4. Elegant Picture Bento Gallery */}
          <GallerySection />

          {/* 5. RSVP Input & Blessings Registry Wall */}
          <section className="px-6 py-20 bg-rosegold-100/30 relative overflow-hidden" id="rsvp-wishes-registry-section">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rosegold-200/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rosegold-300/15 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Layout Header */}
              <div className="text-center space-y-3">
                <Heart className="w-6 h-6 text-rosegold-500 mx-auto fill-rosegold-100" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-rosegold-600">RSVP &amp; Guest Book</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-gray-800 font-bold">Kehadiran &amp; Doa Restu</h2>
                <div className="w-16 h-[1.5px] bg-rosegold-300 mx-auto mt-2"></div>
              </div>

              {/* Grid block: form left, gallery/feed right on large screen */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                
                {/* Form Input Area */}
                <div className="md:sticky md:top-6">
                  <RSVPForm onSubmitRSVP={handleAddRSVP} />
                </div>

                {/* Wishes guestbook feed displaying responses */}
                <WishesWall wishes={wishes} onLikeWish={handleLikeWish} isSyncing={isSyncing} syncError={syncError} />

              </div>
            </div>
          </section>

          {/* 6. Tasteful Digital Gift Envelope Drawer */}
          <GiftEnvelope />

          {/* 6.5 Premium Custom Link Generator Widget - Only visible for admin/creator */}
          {isAdmin && <LinkGenerator />}

          {/* 7. Majestic Ending Footer */}
          <footer className="bg-rosegold-950 text-rosegold-100 py-16 px-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

            <div className="max-w-md mx-auto space-y-6 relative z-10">
              <h2 className="font-script text-5xl text-rosegold-300 font-light">
                {weddingData.brideName} &amp; {weddingData.groomName}
              </h2>
              
              <div className="w-16 h-[1px] bg-rosegold-600 mx-auto"></div>

              <p className="text-xs text-rosegold-200 leading-relaxed max-w-sm mx-auto font-light">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi kami berdua.
              </p>

              <div className="space-y-1 pt-4 text-rosegold-300">
                <p className="text-xs uppercase tracking-widest font-semibold">Sampai Jumpa Di Hari Bahagia Kami</p>
                <p className="font-serif text-sm font-bold tracking-wide">10 • 10 • 2026</p>
              </div>

              <div className="text-[10px] text-rosegold-400 font-medium pt-8">
                 &copy; 2026 {weddingData.brideName} &amp; {weddingData.groomName} Wedding. All Rights Reserved.
              </div>
            </div>
          </footer>

        </div>
      )}

    </div>
  );
}
