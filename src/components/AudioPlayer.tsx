import { useState, useEffect, useRef } from "react";
import { Music, Music2 } from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  visible?: boolean;
}

export default function AudioPlayer({ isPlaying, setIsPlaying, visible = true }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted] = useState(false);

  useEffect(() => {
    // Beautiful romantic soft piano melody
    const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3";
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.45;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.log("Autoplay blocked by browser. User gesture needed.", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-700 ease-out transform ${
      visible 
        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
        : "opacity-0 translate-y-12 scale-75 pointer-events-none"
    }`}>
      <button
        onClick={togglePlay}
        id="audio-toggle-button"
        className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
          isPlaying
            ? "bg-rosegold-500 text-white animate-spin-slow border-2 border-rosegold-200"
            : "bg-white text-rosegold-600 hover:bg-rosegold-100 border-2 border-rosegold-200"
        }`}
        aria-label="Toggle Background Music"
        title={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? (
          <Music className="w-5 h-5 animate-pulse" />
        ) : (
          <Music2 className="w-5 h-5 text-gray-400" />
        )}
        
        {/* Decorative dynamic ripples when active */}
        {isPlaying && (
          <>
            <span className="absolute inline-flex h-full w-full rounded-full bg-rosegold-400 opacity-20 animate-ping -z-10"></span>
            <span className="absolute inline-flex h-14 w-14 rounded-full bg-rosegold-500 opacity-10 animate-ping -z-10"></span>
          </>
        )}
      </button>

      {/* Embedded spinning rotational support styled directly in React */}
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
