import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { io } from 'socket.io-client';

const LANGUAGES = [
  { code: 'ar', name: 'العربية', label: 'Arabic', stt: 'ar-SA', dir: 'rtl', color: '#34d399' },
  { code: 'en', name: 'English', label: 'English', stt: 'en-GB', dir: 'ltr', color: '#ffffff' },
  { code: 'ur', name: 'اردو', label: 'Urdu', stt: 'ur-PK', dir: 'rtl', color: '#fbbf24' },
  { code: 'so', name: 'Af-Soomaali', label: 'Somali', stt: 'so-SO', dir: 'ltr', color: '#f472b6' },
  { code: 'bn', name: 'বাংলা', label: 'Bengali', stt: 'bn-BD', dir: 'ltr', color: '#60a5fa' },
];

const CITIES = [
  { value: 'birmingham', label: 'Birmingham' },
  { value: 'london', label: 'London' },
  { value: 'manchester', label: 'Manchester' },
  { value: 'leeds', label: 'Leeds' },
  { value: 'bradford', label: 'Bradford' },
  { value: 'liverpool', label: 'Liverpool' },
  { value: 'sheffield', label: 'Sheffield' },
  { value: 'bristol', label: 'Bristol' },
];

function StatusBadge({ isLive, isPaused }) {
  if (isPaused) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-xs font-semibold text-amber-400 tracking-wider">PAUSED</span>
      </div>
    );
  }
  if (isLive) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full">
        <div className="relative w-2 h-2 rounded-full bg-red-500">
          <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30" />
        </div>
        <span className="text-xs font-semibold text-red-400 tracking-wider">LIVE</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-full">
      <div className="w-2 h-2 rounded-full bg-gray-500" />
      <span className="text-xs font-semibold text-gray-400 tracking-wider">OFFLINE</span>
    </div>
  );
}

function PreviewDisplay({ session, languages, currentTexts, isLive, isPaused }) {
  const previewScrollRef = useRef(null);

  useEffect(() => {
    if (previewScrollRef.current) {
      previewScrollRef.current.scrollTop = previewScrollRef.current.scrollHeight;
    }
  }, [currentTexts]);

  return (
    <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/80 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLive && !isPaused ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`} />
          <span className="text-xs text-gray-400 font-medium">Preview</span>
        </div>
        <span className="text-xs text-gray-600">{session?.masjidName || 'Masjid'}</span>
      </div>

      <div ref={previewScrollRef} className="h-64 overflow-y-auto scrollbar-hide px-4 py-6 space-y-4">
        {languages.map(code => {
          const lang = LANGUAGES.find(l => l.code === code);
          const text = currentTexts[code];
          if (!text || !lang) return null;
          return (
            <div key={code} className="space-y-1 animate-text-fade-in">
              <p
                className="text-lg font-bold leading-relaxed"
                dir={lang.dir}
                style={{ color: lang.color }}
              >
                {text}
              </p>
              <p className="text-xs text-gray-600 uppercase tracking-wider">{lang.label}</p>
            </div>
          );
        })}

        {!isLive && Object.keys(currentTexts).length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-sm">Waiting for broadcast...</p>
          </div>
        )}
      </div>

      <div className="px-4 py-2 bg-gray-900/80 border-t border-gray-800 flex items-center gap-3">
        {languages.map(code => {
          const lang = LANGUAGES.find(l => l.code === code);
          if (!lang) return null;
          return (
            <div key={code} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lang.color }} />
              <span className="text-xs text-gray-600">{lang.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TestPattern({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
        <h2 className="text-white font-semibold">Test Pattern</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition"
        >
          Close
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-12">
        <div className="max-w-3xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-white">Test Pattern</h1>
            <p className="text-gray-400 text-xl">If you can read this, your display is working correctly</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {LANGUAGES.map(lang => (
              <div key={lang.code} className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                <p className="text-2xl font-bold mb-2" dir={lang.dir} style={{ color: lang.color }}>
                  {lang.code === 'ar' && 'اختبار النص العربي'}
                  {lang.code === 'en' && 'English text test'}
                  {lang.code === 'ur' && 'اردو متن کا ٹیسٹ'}
                  {lang.code === 'so' && 'Imtixaanka qoraalka Soomaaliga'}
                  {lang.code === 'bn' && 'বাংলা টেক্সট পরীক্ষা'}
                </p>
                <p className="text-sm text-gray-500">{lang.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <span>Resolution: {window.innerWidth} x {window.innerHeight}</span>
            <span>DPR: {window.devicePixelRatio}</span>
            <span>Browser: {navigator.userAgent.split(' ').pop()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const masjidName = searchParams.get('masjid') || 'My Masjid';

  const [session, setSession] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(['en', 'ur', 'ar']);
  const [transcript, setTranscript] = useState([]);
  const [micActive, setMicActive] = useState(false);
  const [city, setCity] = useState('birmingham');
  const [showPreview, setShowPreview] = useState(true);
  const [showTestPattern, setShowTestPattern] = useState(false);
  const [volume, setVolume] = useState(80);
  const [activeTab, setActiveTab] = useState('controls');
  const [previewTexts, setPreviewTexts] = useState({});

  const recognitionRef = useRef(null);
  const socketRef = useRef(null);
  const transcriptRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:3001');

    socketRef.current.emit('admin:join', { sessionId });

    socketRef.current.on('admin:joined', ({ session }) => {
      setSession(session);
      setSelectedLanguages(session.languages || ['en', 'ur', 'ar']);
    });

    socketRef.current.on('error', (err) => console.error(err));

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      stopMic();
    };
  }, [sessionId]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const startMic = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported. Use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-GB';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += t;
        } else {
          interimTranscript += t;
        }
      }

      if (finalTranscript) {
        socketRef.current.emit('admin:transcript', {
          sessionId,
          text: finalTranscript,
          language: 'en',
          isFinal: true,
        });

        setTranscript(prev => [...prev, { text: finalTranscript, time: new Date(), isFinal: true }]);
        setPreviewTexts(prev => ({ ...prev, en: finalTranscript }));
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setMicActive(false);
    };

    recognition.onend = () => {
      if (isLive && !isPaused) {
        recognition.start();
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
    setMicActive(true);
    setIsLive(true);
    setIsPaused(false);
  }, [sessionId, isLive, isPaused]);

  const stopMic = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setMicActive(false);
    setIsLive(false);
    setIsPaused(false);
    socketRef.current?.emit('admin:end', { sessionId });
  }, [sessionId]);

  const pauseSession = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setMicActive(false);
    setIsPaused(true);
  }, []);

  const resumeSession = useCallback(() => {
    if (isLive) {
      startMic();
    }
    setIsPaused(false);
  }, [isLive, startMic]);

  const toggleLanguage = useCallback((code) => {
    setSelectedLanguages(prev => {
      const next = prev.includes(code)
        ? prev.filter(l => l !== code)
        : [...prev, code];
      socketRef.current?.emit('admin:languages', { sessionId, languages: next });
      return next;
    });
  }, [sessionId]);

  const runTestPattern = useCallback(() => {
    const testTexts = {
      en: 'This is a test message in English to verify display output.',
      ar: 'هذه رسالة اختبار باللغة العربية للتحقق من عرض الشاشة.',
      ur: 'یہ ڈسپلے آؤٹ پٹ کی تصدیق کے لیے اردو میں ایک پیغام ہے۔',
      bn: 'ডিসপ্লে আউটপুট যাচাই করার জন্য এটি বাংলায় একটি বার্তা।',
      so: 'Tani waa fariin tijaabo ah oo ku qoran Af-Soomaaliga.',
    };

    setPreviewTexts(testTexts);
    selectedLanguages.forEach(code => {
      socketRef.current?.emit('admin:transcript', {
        sessionId,
        text: testTexts[code] || testTexts.en,
        language: code,
        isFinal: true,
      });
    });
  }, [selectedLanguages, sessionId]);

  const displayUrl = `${window.location.origin}/display/${sessionId}`;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {showTestPattern && <TestPattern onClose={() => setShowTestPattern(false)} />}

      {/* Header */}
      <header className="bg-gray-900/80 border-b border-gray-800 px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-bold text-white">{masjidName}</h1>
              <p className="text-xs text-gray-500 font-mono">{sessionId}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge isLive={isLive} isPaused={isPaused} />

            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                showPreview ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-800 text-gray-400 border border-gray-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </button>

            <Link
              to="/settings"
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-gray-400 border border-gray-700 rounded-lg text-xs font-medium hover:bg-gray-700 hover:text-white transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>

            <a
              href={displayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-medium hover:bg-emerald-500/20 transition"
            >
              Open Display
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Mobile tab bar */}
        <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {['controls', 'transcript', 'preview'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition ${
                activeTab === tab
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-gray-900 text-gray-400 border border-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left sidebar - Controls */}
          <div className={`lg:col-span-4 space-y-5 ${activeTab !== 'controls' ? 'hidden lg:block' : ''}`}>
            {/* Mic Control */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8.25m6.5 0h3.75M12 4a7 7 0 017 7" />
                </svg>
                Microphone
              </h2>

              <div className="space-y-3">
                {!isLive ? (
                  <button
                    onClick={startMic}
                    className="w-full py-3.5 rounded-lg font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Start Broadcast
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {isPaused ? (
                      <button
                        onClick={resumeSession}
                        className="py-3 rounded-lg font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Resume
                      </button>
                    ) : (
                      <button
                        onClick={pauseSession}
                        className="py-3 rounded-lg font-semibold bg-amber-600 text-white hover:bg-amber-500 transition flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                        Pause
                      </button>
                    )}
                    <button
                      onClick={stopMic}
                      className="py-3 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-500 transition flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 6h12v12H6z" />
                      </svg>
                      Stop
                    </button>
                  </div>
                )}
              </div>

              {/* Volume Control */}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-gray-500">Audio Level</label>
                  <span className="text-xs text-gray-400 font-mono">{volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between mt-1">
                  <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  </svg>
                  <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
                  </svg>
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-3">
                Uses browser speech recognition. Chrome or Edge recommended.
              </p>
            </div>

            {/* Languages */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Languages
              </h2>
              <div className="space-y-1.5">
                {LANGUAGES.map(lang => {
                  const isActive = selectedLanguages.includes(lang.code);
                  return (
                    <button
                      key={lang.code}
                      onClick={() => toggleLanguage(lang.code)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all text-left ${
                        isActive
                          ? 'bg-gray-800 border border-gray-700'
                          : 'bg-transparent border border-transparent hover:bg-gray-800/50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        isActive ? 'border-emerald-500 bg-emerald-500' : 'border-gray-600'
                      }`}>
                        {isActive && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: lang.color, opacity: isActive ? 1 : 0.3 }}
                      />
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm ${isActive ? 'text-white' : 'text-gray-500'}`}>
                          {lang.name}
                        </span>
                        <span className="text-xs text-gray-600 ml-2">({lang.label})</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location
              </h2>
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
              >
                {CITIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 space-y-3">
              <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Actions
              </h2>

              <button
                onClick={runTestPattern}
                className="w-full py-2.5 rounded-lg text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Test Pattern
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Assalamu Alaikum! ${masjidName} is using khutba.io for live khutbah translations.\nWatch: ${displayUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-600/20 text-green-400 border border-green-600/30 py-2.5 rounded-lg text-sm font-medium hover:bg-green-600/30 transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Share on WhatsApp
              </a>
            </div>
          </div>

          {/* Center - Transcript */}
          <div className={`lg:col-span-5 ${activeTab !== 'transcript' ? 'hidden lg:block' : ''}`}>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Live Transcript
                </h2>
                {transcript.length > 0 && (
                  <span className="text-xs text-gray-600">{transcript.length} entries</span>
                )}
              </div>

              <div
                ref={transcriptRef}
                className="flex-1 overflow-y-auto scrollbar-hide space-y-2 min-h-[300px] max-h-[600px] lg:max-h-none"
              >
                {transcript.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                    <svg className="w-12 h-12 text-gray-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p className="text-gray-600 text-sm">No transcript yet</p>
                    <p className="text-gray-700 text-xs mt-1">Start broadcasting to see live captions</p>
                  </div>
                ) : (
                  transcript.map((entry, i) => (
                    <div key={i} className="p-3 bg-gray-800/50 rounded-lg border border-gray-800">
                      <p className="text-gray-200 text-sm leading-relaxed">{entry.text}</p>
                      <p className="text-gray-600 text-xs mt-1.5 tabular-nums">
                        {entry.time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right - Preview */}
          <div className={`lg:col-span-3 ${activeTab !== 'preview' ? 'hidden lg:block' : ''}`}>
            <div className="sticky top-6 space-y-5">
              <PreviewDisplay
                session={session}
                languages={selectedLanguages}
                currentTexts={previewTexts}
                isLive={isLive}
                isPaused={isPaused}
              />

              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Display URL</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={displayUrl}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-400 font-mono truncate"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(displayUrl)}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition"
                    title="Copy URL"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
