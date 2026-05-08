import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const PRAYER_NAMES = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function getNextPrayer(prayerTimes) {
  if (!prayerTimes) return null;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'Fajr', time: prayerTimes.fajr },
    { name: 'Sunrise', time: prayerTimes.sunrise },
    { name: 'Dhuhr', time: prayerTimes.dhuhr },
    { name: 'Asr', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isha', time: prayerTimes.isha },
  ];

  for (const prayer of prayers) {
    if (!prayer.time) continue;
    const [h, m] = prayer.time.split(':').map(Number);
    const prayerMinutes = h * 60 + m;
    if (prayerMinutes > currentMinutes) {
      const diff = prayerMinutes - currentMinutes;
      const hours = Math.floor(diff / 60);
      const mins = diff % 60;
      return {
        name: prayer.name,
        time: prayer.time,
        countdown: `${hours}h ${mins}m`,
      };
    }
  }

  const [h, m] = prayers[0].time.split(':').map(Number);
  const fajrMinutes = h * 60 + m + 24 * 60;
  const diff = fajrMinutes - currentMinutes;
  const hours = Math.floor(diff / 60);
  const mins = diff % 60;
  return {
    name: 'Fajr',
    time: prayers[0].time,
    countdown: `${hours}h ${mins}m`,
  };
}

function LiveIndicator({ isLive }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`relative w-3 h-3 rounded-full ${isLive ? 'bg-red-500' : 'bg-gray-500'}`}>
        {isLive && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-500 animate-live-pulse" />
            <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-30" />
          </>
        )}
      </div>
      <span className={`text-sm font-semibold tracking-wider ${isLive ? 'text-red-400' : 'text-gray-500'}`}>
        {isLive ? 'LIVE' : 'STANDBY'}
      </span>
    </div>
  );
}

function PrayerTimesFooter({ prayerTimes }) {
  const nextPrayer = getNextPrayer(prayerTimes);

  if (!prayerTimes) return null;

  const allPrayers = [
    { name: 'Fajr', time: prayerTimes.fajr },
    { name: 'Sunrise', time: prayerTimes.sunrise },
    { name: 'Dhuhr', time: prayerTimes.dhuhr },
    { name: 'Asr', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isha', time: prayerTimes.isha },
  ];

  return (
    <div className="px-6 md:px-10 lg:px-12 py-4 glass-panel border-t border-gray-800/50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 lg:gap-8 overflow-x-auto scrollbar-hide">
          {allPrayers.map(prayer => {
            if (!prayer.time) return null;
            const isNext = nextPrayer && nextPrayer.name === prayer.name;
            return (
              <div
                key={prayer.name}
                className={`flex flex-col items-center min-w-fit px-3 py-1.5 rounded-lg transition-all ${
                  isNext
                    ? 'bg-emerald-500/10 border border-emerald-500/20'
                    : 'border border-transparent'
                }`}
              >
                <span className={`text-xs font-medium ${isNext ? 'text-emerald-400' : 'text-gray-500'}`}>
                  {prayer.name}
                </span>
                <span className={`text-sm font-semibold ${isNext ? 'text-emerald-300' : 'text-gray-300'}`}>
                  {prayer.time}
                </span>
              </div>
            );
          })}
        </div>

        {nextPrayer && (
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <p className="text-xs text-gray-500">Next prayer</p>
              <p className="text-sm font-semibold text-emerald-400">
                {nextPrayer.name} <span className="text-gray-400 font-normal">in {nextPrayer.countdown}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DisplayPage() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [currentTexts, setCurrentTexts] = useState({});
  const [prevTexts, setPrevTexts] = useState({});
  const [languages, setLanguages] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const scrollRef = useRef(null);
  const scrollRafRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const socket = io(process.env.SERVER_URL || 'http://localhost:3001');

    socket.emit('display:join', { sessionId });

    socket.on('display:joined', ({ session, languages }) => {
      setSession(session);
      setLanguages(languages);
      setIsLive(session.active);
    });

    socket.on('session:started', () => setIsLive(true));
    socket.on('session:ended', () => setIsLive(false));

    socket.on('display:text', (entry) => {
      setPrevTexts(prev => ({ ...prev }));
      setCurrentTexts(prev => ({
        ...prev,
        [entry.language]: entry.text,
      }));

      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }
      });
    });

    socket.on('error', (err) => console.error(err));

    return () => {
      socket.disconnect();
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [sessionId]);

  useEffect(() => {
    if (session?.city) {
      fetch(`/api/prayer-times/${session.city}`)
        .then(r => r.json())
        .then(data => setPrayerTimes(data))
        .catch(() => {});
    }
  }, [session?.city]);

  const getLanguageColor = useCallback((code) => {
    const colors = {
      ar: '#34d399',
      ur: '#fbbf24',
      bn: '#60a5fa',
      so: '#f472b6',
      en: '#ffffff',
    };
    return colors[code] || '#ffffff';
  }, []);

  const getLanguageGlow = useCallback((code) => {
    const glows = {
      ar: 'text-glow-emerald',
      ur: 'text-glow-amber',
      bn: 'text-glow-blue',
      so: 'text-glow-pink',
      en: '',
    };
    return glows[code] || '';
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20" />
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
          </div>
          <p className="text-gray-400 text-lg font-medium">Connecting to masjid display...</p>
          <p className="text-gray-600 text-sm mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  const hasContent = Object.keys(currentTexts).length > 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col select-none">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 pointer-events-none" />

      {/* Header bar */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-10 lg:px-12 py-4 glass-panel border-b border-gray-800/50">
        <div className="flex items-center gap-4 md:gap-6">
          <LiveIndicator isLive={isLive} />
          <div className="w-px h-5 bg-gray-700" />
          <h1 className="text-lg md:text-xl font-bold text-white truncate max-w-xs md:max-w-md">
            {session.masjidName}
          </h1>
        </div>
        <div className="flex items-center gap-4 md:gap-6 text-sm">
          {prayerTimes?.jumuah && (
            <span className="hidden sm:inline text-gray-400">
              Jumu&apos;ah: <span className="text-gray-300 font-medium">{prayerTimes.jumuah}</span>
            </span>
          )}
          <time className="text-gray-400 tabular-nums">
            {currentTime.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </time>
          <span className="text-gray-500 tabular-nums hidden sm:inline">
            {currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </header>

      {/* Main display area */}
      <main
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto scrollbar-hide px-6 md:px-10 lg:px-12 py-8 md:py-12 lg:py-16 space-y-8 md:space-y-10 lg:space-y-12"
      >
        {languages.map(lang => {
          const text = currentTexts[lang.code];
          const prevText = prevTexts[lang.code];
          const isNew = text && text !== prevText;

          if (!text) return null;

          return (
            <div
              key={lang.code}
              className={`group space-y-3 ${isNew ? 'animate-text-fade-in' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-1 h-12 rounded-full mt-1 shrink-0 opacity-40 group-hover:opacity-60 transition-opacity"
                  style={{ backgroundColor: getLanguageColor(lang.code) }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-relaxed md:leading-relaxed lg:leading-relaxed ${getLanguageGlow(lang.code)}`}
                    dir={lang.dir}
                    style={{ color: getLanguageColor(lang.code) }}
                  >
                    {text}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600 uppercase tracking-widest ml-5">
                {lang.name}
              </p>
            </div>
          );
        })}

        {!isLive && !hasContent && (
          <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center">
            <div className="animate-float mb-8">
              <svg className="w-20 h-20 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-xl md:text-2xl font-light">Waiting for khutbah to begin...</p>
            <p className="text-gray-600 text-sm mt-3">The live translation will appear here</p>
          </div>
        )}

        {isLive && !hasContent && (
          <div className="flex items-center justify-center h-full min-h-[50vh]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Listening...</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer — language indicators + prayer times */}
      <footer className="relative z-10">
        <div className="px-6 md:px-10 lg:px-12 py-3 glass-panel border-t border-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
              {languages.map(lang => (
                <div key={lang.code} className="flex items-center gap-2 shrink-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full transition-all"
                    style={{
                      backgroundColor: getLanguageColor(lang.code),
                      opacity: currentTexts[lang.code] ? 1 : 0.3,
                    }}
                  />
                  <span className="text-xs text-gray-500">{lang.name}</span>
                </div>
              ))}
            </div>
            <span className="text-gray-700 text-xs shrink-0 ml-4">khutba.io</span>
          </div>
        </div>
        <PrayerTimesFooter prayerTimes={prayerTimes} />
      </footer>
    </div>
  );
}
