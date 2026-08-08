import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const segments = [
  { ar: 'الحمد لله نحمده ونستعينه ونستغفره', en: 'All praise is for Allah. We praise Him, seek His help, and ask His forgiveness.', label: 'Opening praise' },
  { ar: 'أوصيكم عباد الله ونفسي بتقوى الله', en: 'Servants of Allah, I counsel you and myself to remain mindful of Allah.', label: 'Khutbah' },
  { ar: 'ومن يتوكل على الله فهو حسبه', en: 'And whoever relies upon Allah—then He is sufficient for them.', label: 'Qur’an · 65:3' },
  { ar: 'اجعلوا هذا اليوم بداية لعمل صالح دائم', en: 'Let this day be the beginning of a good deed that endures.', label: 'Khutbah' },
];

const prayerTimes = [['Fajr', '04:42'], ['Dhuhr', '13:18'], ['Asr', '17:24'], ['Maghrib', '20:41'], ['Isha', '22:05']];

export default function DemoPage() {
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  };

  const startDemo = () => {
    setPlaying(true);
    setIndex(0);
    setElapsed(0);
    speak(segments[0].ar);
  };

  useEffect(() => {
    if (!playing) return undefined;
    timerRef.current = window.setInterval(() => {
      setElapsed(value => value + 1);
      setIndex(value => {
        const next = value + 1;
        if (next >= segments.length) {
          setPlaying(false);
          return value;
        }
        speak(segments[next].ar);
        return next;
      });
    }, 6500);
    return () => window.clearInterval(timerRef.current);
  }, [playing]);

  const active = segments[index];
  const progress = playing ? Math.min(100, ((index + elapsed / 7) / segments.length) * 100) : index === segments.length - 1 ? 100 : 0;

  return (
    <div className="min-h-screen bg-[#050D16] text-[#F4EDDF]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#88CED0]/10 bg-[#08131F] px-5 py-4 md:px-8">
        <Link to="/" className="font-editorial text-xl font-bold">khutba<span className="text-[#88CED0]">.io</span></Link>
        <div className="flex items-center gap-3"><span className="hidden text-xs text-[#E7D6B5]/45 sm:inline">Scripted demo · not an accuracy benchmark</span><Link to="/#pilot" className="rounded-full bg-[#D6A64A] px-4 py-2 text-sm font-bold text-[#08131F]">Book a pilot</Link></div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-5 md:px-6 md:py-7">
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.24em] text-[#88CED0]">Interactive display demo</p><h1 className="font-editorial mt-2 text-3xl md:text-4xl">Hear Arabic. Watch the masjid screen respond.</h1></div>
          <button onClick={startDemo} className="min-h-11 rounded-full border border-[#D6A64A]/55 bg-[#D6A64A]/10 px-6 font-bold text-[#F0C978] hover:bg-[#D6A64A]/20">{playing ? 'Restart demonstration' : progress === 100 ? 'Play again' : 'Play 30-second demo'}</button>
        </div>

        <section className="relative flex min-h-[680px] flex-col overflow-hidden rounded-2xl border border-[#88CED0]/18 bg-[#08131F] shadow-2xl shadow-black/50 md:min-h-[760px]">
          <div className="absolute inset-0 tile-pattern opacity-60" />
          <div className="relative flex items-center justify-between border-b border-[#88CED0]/12 bg-[#0B1B2A]/90 px-5 py-4 md:px-8">
            <div className="flex items-center gap-4"><span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.22em] text-red-400"><i className={`size-2 rounded-full ${playing ? 'animate-live-pulse bg-red-500' : 'bg-[#E7D6B5]/30'}`} />{playing ? 'Live demo' : 'Standby'}</span><span className="hidden h-4 w-px bg-[#88CED0]/20 sm:block" /><span className="text-sm font-semibold">Birmingham Central Masjid</span></div>
            <time className="text-sm tabular-nums text-[#E7D6B5]/55">Friday · 13:21</time>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-12 text-center md:px-16 lg:px-28">
            {!playing && progress === 0 ? (
              <div className="max-w-2xl"><div className="mx-auto mb-8 flex h-20 w-20 items-end justify-center gap-1 rounded-full border border-[#88CED0]/20 bg-[#123E73]/20 p-5">{[45, 80, 60, 95, 52].map((height, i) => <i key={height} className="signal-bar w-1 rounded-full bg-[#88CED0]" style={{ height: `${height}%`, animationDelay: `${i * 90}ms` }} />)}</div><p className="font-editorial text-3xl md:text-5xl">Ready when you are.</p><p className="mt-4 text-[#E7D6B5]/55">Press play. Your browser will speak the Arabic sample while the translation appears as it would across the hall.</p></div>
            ) : (
              <div key={index} className="animate-text-fade-in max-w-6xl">
                <p className="display-text-ar text-[clamp(2.2rem,4.2vw,4.8rem)] leading-[1.55] text-[#F4EDDF]" dir="rtl">{active.ar}</p>
                <div className="mx-auto my-8 h-px w-32 bg-gradient-to-r from-transparent via-[#D6A64A]/75 to-transparent" />
                <p className="font-editorial text-[clamp(2.1rem,4.6vw,5.6rem)] leading-[1.22] tracking-[-.03em] text-[#F4EDDF]">{active.en}</p>
                <p className="mt-8 text-xs font-bold uppercase tracking-[.35em] text-[#88CED0]">English · {active.label}</p>
              </div>
            )}
          </div>

          <div className="relative h-1 bg-[#123E73]/30"><div className="h-full bg-[#D6A64A] transition-[width] duration-700" style={{ width: `${progress}%` }} /></div>
          <div className="relative grid grid-cols-5 border-t border-[#88CED0]/10 bg-[#0B1B2A]/95 px-3 py-4 md:px-8">{prayerTimes.map(([name, time]) => <div key={name} className="text-center"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#88CED0]/55">{name}</p><p className="mt-1 text-sm font-semibold tabular-nums text-[#E7D6B5] md:text-base">{time}</p></div>)}</div>
        </section>
        <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-5 text-[#E7D6B5]/38">This front-end demonstration uses a fixed sample and browser speech synthesis. A mosque pilot benchmarks the real imam, microphone, room acoustics, languages and end-to-end latency.</p>
      </main>
    </div>
  );
}
