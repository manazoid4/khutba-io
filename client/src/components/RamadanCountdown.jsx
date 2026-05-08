import { useState, useEffect } from 'react';

const RAMADAN_2027 = new Date('2027-03-01T00:00:00Z');
const RAJAB_2027 = new Date('2027-01-01T00:00:00Z');

export default function RamadanCountdown() {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = RAMADAN_2027 - now;
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, isRamadan: true });
      } else {
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setCountdown({ days, hours, isRamadan: false });
      }
    };
    update();
    const interval = setInterval(update, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  if (!countdown) return null;

  if (countdown.isRamadan) {
    return (
      <div className="inline-flex items-center gap-3 bg-emerald-600 rounded-xl px-5 py-3">
        <span className="text-2xl">🌙</span>
        <p className="text-white text-sm font-semibold">Ramadan Mubarak! Your masjid screen is live.</p>
      </div>
    );
  }

  const beforeRajab = new Date() < RAJAB_2027;

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌙</span>
          <div>
            <p className="text-white font-bold text-base">Ramadan starts March 1, 2027</p>
            <p className="text-emerald-100 text-sm">
              {countdown.days} days, {countdown.hours} hours to go — get your mosque ready
            </p>
          </div>
        </div>
        {beforeRajab && (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 shrink-0">
            <p className="text-white text-xs font-semibold">Set up before Rajab</p>
            <p className="text-emerald-100 text-xs">Get 3 months free</p>
          </div>
        )}
      </div>
    </div>
  );
}
