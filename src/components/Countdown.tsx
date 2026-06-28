import { useState, useEffect } from "react";
import { weddingData } from "../data";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const targetDate = new Date(weddingData.eventDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsFinished(true);
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isFinished) {
    return (
      <div className="text-center py-6">
        <span className="font-serif text-2xl font-semibold text-rosegold-700 uppercase tracking-widest bg-rosegold-100/50 px-8 py-3 rounded-full border border-rosegold-200">
          Hari Bahagia Telah Tiba 🎉
        </span>
      </div>
    );
  }

  const items = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 md:py-8" id="wedding-countdown-timer">
      <h3 className="font-serif text-sm tracking-[0.2em] uppercase text-rosegold-700/80 mb-6 text-center font-medium">
        Menuju Hari Bahagia
      </h3>
      <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-5 justify-items-center">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-16 sm:w-20 md:w-24 h-20 sm:h-24 md:h-28 bg-white rounded-2xl shadow-md border border-rosegold-200/50 relative overflow-hidden group hover:border-rosegold-400 transition-colors duration-300 transform scale-100 hover:scale-[1.03]"
          >
            {/* Top tiny decorative line */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-rosegold-200 to-rosegold-400"></div>

            <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-rosegold-800 tracking-tight">
              {item.value.toString().padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-[11px] md:text-xs uppercase tracking-widest text-gray-400 font-medium mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
