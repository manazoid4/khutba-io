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

function LiveIndicator({ isLive, connectionStatus }) {
  const disconnected = connectionStatus !== 'connected';
  return (
    <div className="flex items-center gap-2">
      <div className={`relative w-2.5 h-2.5 rounded-full ${disconnected ? 'bg-amber-500' : isLive ? 'bg-red-500' : 'bg-[#88CED0]/45'}`}>
        {isLive && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-500 animate-live-pulse" />
            <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-30" />
          </>
        )}
      </div>
      <span className={`text-xs font-bold uppercase tracking-[.22em] ${disconnected ? 'text-amber-400' : isLive ? 'text-red-400' : 'text-[#88CED0]/60'}`}>
        {disconnected ? 'Reconnecting' : isLive ? 'Live' : 'Standby'}
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
    <div className="px-6 md:px-10 lg:px-12 py-4 glass-panel border-t border-[#88CED0]/10">
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
                    ? 'bg-[#123E73]/25 border border-[#88CED0]/20'
                    : 'border border-transparent'
                }`}
              >
                <span className={`text-xs font-medium ${isNext ? 'text-[#88CED0]' : 'text-[#E7D6B5]/40'}`}>
                  {prayer.name}
                </span>
                <span className={`text-sm font-semibold ${isNext ? 'text-[#F0C978]' : 'text-[#E7D6B5]/75'}`}>
                  {prayer.time}
                </span>
              </div>
            );
          })}
        </div>

        {nextPrayer && (
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <p className="text-xs text-[#E7D6B5]/40">Next prayer</p>
              <p className="text-sm font-semibold text-[#F0C978]">
                {nextPrayer.name} <span className="text-[#E7D6B5]/55 font-normal">in {nextPrayer.countdown}</span>
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
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [connectionError, setConnectionError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const scrollRef = useRef(null);
  const scrollRafRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:3001');

    socket.on('connect', () => {
      setConnectionStatus('connected');
      setConnectionError('');
      socket.emit('display:join', { sessionId });
    });

    socket.on('disconnect', () => setConnectionStatus('reconnecting'));
    socket.on('connect_error', () => {
      setConnectionStatus('reconnecting');
      setConnectionError('The live service is unavailable. This screen will reconnect automatically.');
    });

    socket.on('display:joined', ({ session, languages }) => {
      setSession(session);
      setLanguages(languages);
      setIsLive(session.active);
    });

    socket.on('session:started', () => setIsLive(true));
    socket.on('session:ended', () => setIsLive(false));
    socket.on('display:languages', ({ languages }) => setLanguages(languages));

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

    socket.on('error', (err) => {
      console.error(err);
      setConnectionError(err?.message || 'This display could not join the session.');
    });

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

  const getLanguageColor = useCallback(() => {
    return '#F4EDDF';
  }, []);

  const getLanguageGlow = useCallback((code) => {
    const fonts = {
      ar: 'display-text-ar',
      ur: 'display-text-ur',
      bn: 'display-text-bn',
    };
    return fonts[code] || '';
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen bg-[#08131F] tile-pattern flex items-center justify-center px-6">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-[#88CED0]/15" />
            <div className="absolute inset-0 rounded-full border-2 border-[#D6A64A] border-t-transparent animate-spin" />
          </div>
          <p className="font-editorial text-[#F4EDDF] text-2xl">Preparing the masjid display</p>
          <p className="text-[#E7D6B5]/45 text-sm mt-3">{connectionError || 'Connecting securely…'}</p>
        </div>
      </div>
    );
  }

  const hasContent = Object.keys(currentTexts).length > 0;

  return (
    <div className="min-h-screen bg-[#08131F] text-[#F4EDDF] flex flex-col select-none">
      <div className="fixed inset-0 tile-pattern opacity-45 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#08131F]/75 via-[#08131F]/95 to-[#050D16] pointer-events-none" />

      {/* Header bar */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-10 lg:px-12 py-4 glass-panel border-b border-[#88CED0]/10">
        <div className="flex items-center gap-4 md:gap-6">
          <LiveIndicator isLive={isLive} connectionStatus={connectionStatus} />
          <div className="w-px h-5 bg-[#88CED0]/20" />
          <h1 className="text-lg md:text-xl font-semibold text-[#F4EDDF] truncate max-w-xs md:max-w-md">
            {session.masjidName}
          </h1>
        </div>
        <div className="flex items-center gap-4 md:gap-6 text-sm">
          {prayerTimes?.jumuah && (
            <span className="hidden sm:inline text-[#E7D6B5]/45">
              Jumu&apos;ah: <span className="text-[#F0C978] font-medium">{prayerTimes.jumuah}</span>
            </span>
          )}
          <time className="text-[#E7D6B5]/55 tabular-nums hidden md:inline">
            {currentTime.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </time>
          <span className="text-[#E7D6B5]/70 tabular-nums">
            {currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </header>

      {/* Main display area */}
      <main
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto scrollbar-hide px-6 md:px-12 lg:px-[7vw] py-10 md:py-14 lg:py-[7vh] space-y-12 md:space-y-16"
      >
        {languages.map(lang => {
          const text = currentTexts[lang.code];
          const prevText = prevTexts[lang.code];
          const isNew = text && text !== prevText;

          if (!text) return null;

          return (
            <div
              key={lang.code}
              className={`group space-y-4 ${isNew ? 'animate-text-fade-in' : ''}`}
            >
              <div className="flex items-start gap-5 md:gap-8">
                <div className="w-px h-16 mt-2 shrink-0 bg-gradient-to-b from-[#D6A64A] to-[#1F9EAD]/30" />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[clamp(2.4rem,5.2vw,6.6rem)] font-semibold leading-[1.3] tracking-[-.025em] ${getLanguageGlow(lang.code)}`}
                    dir={lang.dir}
                    style={{ color: getLanguageColor(lang.code) }}
                  >
                    {text}
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-[#88CED0]/65 uppercase tracking-[.32em] ml-6 md:ml-9" dir={lang.dir}>
                {lang.name}
              </p>
            </div>
          );
        })}

        {!isLive && !hasContent && (
          <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center">
            <div className="mb-8">
              <svg className="w-20 h-20 text-[#88CED0]/18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="font-editorial text-[#F4EDDF] text-2xl md:text-4xl">The screen is ready.</p>
            <p className="text-[#E7D6B5]/40 text-sm mt-4">Live translation will appear when the khutbah begins.</p>
          </div>
        )}

        {isLive && !hasContent && (
          <div className="flex items-center justify-center h-full min-h-[50vh]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#88CED0]/20 border-t-[#D6A64A] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#E7D6B5]/55 text-lg">Listening for the imam…</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer — language indicators + prayer times */}
      <footer className="relative z-10">
        <div className="px-6 md:px-10 lg:px-12 py-3 glass-panel border-t border-[#88CED0]/10">
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
                  <span className="text-xs text-[#E7D6B5]/42">{lang.name}</span>
                </div>
              ))}
            </div>
            <span className="text-[#88CED0]/28 text-xs shrink-0 ml-4">khutba.io</span>
          </div>
        </div>
        <PrayerTimesFooter prayerTimes={prayerTimes} />
      </footer>
    </div>
  );
}
