import { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';

export default function AdminPage() {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const masjidName = searchParams.get('masjid') || 'My Masjid';
  
  const [session, setSession] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(['en', 'ur', 'ar']);
  const [transcript, setTranscript] = useState([]);
  const [micActive, setMicActive] = useState(false);
  const [city, setCity] = useState('birmingham');
  
  const recognitionRef = useRef(null);
  const socketRef = useRef(null);
  const transcriptRef = useRef(null);

  const LANGUAGES = [
    { code: 'ar', name: 'العربية (Arabic)', stt: 'ar-SA' },
    { code: 'en', name: 'English', stt: 'en-GB' },
    { code: 'ur', name: 'اردو (Urdu)', stt: 'ur-PK' },
    { code: 'so', name: 'Af-Soomaali (Somali)', stt: 'so-SO' },
    { code: 'bn', name: 'বাংলা (Bengali)', stt: 'bn-BD' },
  ];

  useEffect(() => {
    socketRef.current = io(process.env.SERVER_URL || 'http://localhost:3001');

    socketRef.current.emit('admin:join', { sessionId });

    socketRef.current.on('admin:joined', ({ session }) => {
      setSession(session);
      setSelectedLanguages(session.languages);
    });

    socketRef.current.on('error', (err) => console.error(err));

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      stopMic();
    };
  }, [sessionId]);

  const startMic = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported. Use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-GB'; // Primary language for STT

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        // Send to server for translation broadcast
        socketRef.current.emit('admin:transcript', {
          sessionId,
          text: finalTranscript,
          language: 'en',
          isFinal: true,
        });

        setTranscript(prev => [...prev, { text: finalTranscript, time: new Date(), isFinal: true }]);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setMicActive(false);
    };

    recognition.onend = () => {
      // Auto-restart if still supposed to be live
      if (isLive) {
        recognition.start();
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
    setMicActive(true);
    setIsLive(true);
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setMicActive(false);
    setIsLive(false);
    socketRef.current?.emit('admin:end', { sessionId });
  };

  const toggleLanguage = (code) => {
    setSelectedLanguages(prev =>
      prev.includes(code) ? prev.filter(l => l !== code) : [...prev, code]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{masjidName}</h1>
            <p className="text-sm text-gray-500">Session: {sessionId}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className="text-sm font-medium">{isLive ? 'LIVE' : 'Offline'}</span>
            </div>
            <a
              href={`/display/${sessionId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-700 hover:text-emerald-800 font-medium"
            >
              Open Display ↗
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Mic Control */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Microphone</h2>
            <button
              onClick={isLive ? stopMic : startMic}
              className={`w-full py-4 rounded-lg font-medium text-lg transition ${
                isLive
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-emerald-700 text-white hover:bg-emerald-800'
              }`}
            >
              {isLive ? '⏹ Stop Broadcast' : '🎤 Start Broadcast'}
            </button>
            <p className="text-xs text-gray-400 mt-3">
              Uses browser speech recognition. For best results, use Chrome with a dedicated mic.
            </p>
          </div>

          {/* Languages */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Display Languages</h2>
            <div className="space-y-2">
              {LANGUAGES.map(lang => (
                <label key={lang.code} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes(lang.code)}
                    onChange={() => toggleLanguage(lang.code)}
                    className="w-4 h-4 text-emerald-700 rounded"
                  />
                  <span className="text-sm text-gray-700">{lang.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* City / Prayer Times */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Location</h2>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="birmingham">Birmingham</option>
              <option value="london">London</option>
              <option value="manchester">Manchester</option>
              <option value="leeds">Leeds</option>
              <option value="bradford">Bradford</option>
            </select>
          </div>

          {/* Quick Share */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Share</h2>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Assalamu Alaikum! ${masjidName} is using khutba.io for live khutbah translations.\nWatch: ${window.location.origin}/display/${sessionId}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Share on WhatsApp
            </a>
          </div>
        </div>

        {/* Transcript */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
            <h2 className="font-semibold text-gray-900 mb-4">Live Transcript</h2>
            <div
              ref={transcriptRef}
              className="h-96 overflow-y-auto space-y-3 text-sm"
            >
              {transcript.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">No transcript yet. Start broadcasting to begin.</p>
                </div>
              ) : (
                transcript.map((entry, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-900">{entry.text}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {entry.time.toLocaleTimeString('en-GB')}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
