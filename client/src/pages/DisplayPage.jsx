import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

export default function DisplayPage() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [currentTexts, setCurrentTexts] = useState({});
  const [languages, setLanguages] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const scrollRef = useRef(null);

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
      setCurrentTexts(prev => ({
        ...prev,
        [entry.language]: entry.text,
      }));

      // Auto-scroll to bottom
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });

    socket.on('error', (err) => console.error(err));

    return () => socket.disconnect();
  }, [sessionId]);

  // Fetch prayer times
  useEffect(() => {
    if (session?.city) {
      fetch(`/api/prayer-times/${session.city}`)
        .then(r => r.json())
        .then(data => setPrayerTimes(data))
        .catch(() => {});
    }
  }, [session?.city]);

  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/60 text-lg">Connecting to masjid display...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header bar */}
      <div className="flex items-center justify-between px-8 py-4 bg-gray-900/50 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-sm font-medium">{isLive ? 'LIVE' : 'STANDBY'}</span>
          </div>
          <span className="text-white/60">|</span>
          <span className="text-lg font-semibold">{session.masjidName}</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/60">
          {prayerTimes && (
            <span>Jumu'ah: {prayerTimes.jumuah}</span>
          )}
          <span>{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        </div>
      </div>

      {/* Main display area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-12 py-16 space-y-12">
        {languages.map(lang => {
          const text = currentTexts[lang.code];
          if (!text) return null;

          return (
            <div key={lang.code} className="space-y-2">
              <p
                className="text-4xl font-bold leading-relaxed"
                dir={lang.dir}
                style={{
                  color: lang.code === 'ar' ? '#34d399' :
                         lang.code === 'ur' ? '#fbbf24' :
                         lang.code === 'bn' ? '#60a5fa' :
                         lang.code === 'so' ? '#f472b6' : '#ffffff',
                }}
              >
                {text}
              </p>
              <p className="text-sm text-white/30">{lang.name}</p>
            </div>
          );
        })}

        {!isLive && Object.keys(currentTexts).length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/30 text-2xl">Waiting for khutbah to begin...</p>
          </div>
        )}
      </div>

      {/* Footer — language indicators */}
      <div className="px-8 py-3 bg-gray-900/50 border-t border-gray-800 flex items-center gap-6 text-sm">
        {languages.map(lang => (
          <div key={lang.code} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: lang.code === 'ar' ? '#34d399' :
                                  lang.code === 'ur' ? '#fbbf24' :
                                  lang.code === 'bn' ? '#60a5fa' :
                                  lang.code === 'so' ? '#f472b6' : '#ffffff',
              }}
            ></div>
            <span className="text-white/60">{lang.name}</span>
          </div>
        ))}
        <div className="ml-auto">
          <span className="text-white/30 text-xs">khutba.io</span>
        </div>
      </div>
    </div>
  );
}
