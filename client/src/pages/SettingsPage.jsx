import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LANGUAGES = [
  { code: 'ar', name: 'العربية', label: 'Arabic', dir: 'rtl' },
  { code: 'en', name: 'English', label: 'English', dir: 'ltr' },
  { code: 'ur', name: 'اردو', label: 'Urdu', dir: 'rtl' },
  { code: 'so', name: 'Af-Soomaali', label: 'Somali', dir: 'ltr' },
  { code: 'bn', name: 'বাংলা', label: 'Bengali', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', label: 'Turkish', dir: 'ltr' },
  { code: 'fr', name: 'Français', label: 'French', dir: 'ltr' },
];

const PRAYER_METHODS = [
  { value: 'mwl', label: 'Muslim World League', desc: 'Most common worldwide' },
  { value: 'isna', label: 'ISNA', desc: 'North America standard' },
  { value: 'egypt', label: 'Egyptian General Authority', desc: 'Used across Middle East' },
  { value: 'makkah', label: 'Umm al-Qura, Makkah', desc: 'Saudi Arabia standard' },
  { value: 'karachi', label: 'University of Karachi', desc: 'South Asia standard' },
  { value: 'tehran', label: 'Institute of Geophysics, Tehran', desc: 'Shia calculation method' },
];

const RESOLUTIONS = [
  { value: 'auto', label: 'Auto-detect' },
  { value: '1920x1080', label: '1920 x 1080 (Full HD)' },
  { value: '1366x768', label: '1366 x 768 (HD)' },
  { value: '1280x720', label: '1280 x 720 (HD)' },
  { value: '3840x2160', label: '3840 x 2160 (4K)' },
];

function Toggle({ checked, onChange, label }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 cursor-pointer group"
    >
      <div className={`w-11 h-6 rounded-full transition-colors relative ${
        checked ? 'bg-emerald-600' : 'bg-gray-700'
      }`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`} />
      </div>
      {label && <span className="text-sm text-gray-300 group-hover:text-white transition">{label}</span>}
    </button>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    masjidName: '',
    location: 'birmingham',
    resolution: 'auto',
    languages: ['en', 'ar', 'ur'],
    prayerMethod: 'mwl',
    autoStart: false,
    kioskMode: false,
    showPrayerTimes: true,
    showCountdown: true,
    scrollSpeed: 'normal',
    fontSize: 'large',
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('khutba-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const update = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const toggleLanguage = (code) => {
    const next = settings.languages.includes(code)
      ? settings.languages.filter(l => l !== code)
      : [...settings.languages, code];
    update('languages', next);
  };

  const save = () => {
    localStorage.setItem('khutba-settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900/80 border-b border-gray-800 px-4 md:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-emerald-400">khutba.io</Link>
            <span className="text-gray-700">/</span>
            <h1 className="text-lg font-semibold text-white">Settings</h1>
          </div>
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Back to home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {/* Masjid Info */}
        <Section
          title="Masjid Information"
          icon={
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Masjid Name</label>
              <input
                type="text"
                value={settings.masjidName}
                onChange={e => update('masjidName', e.target.value)}
                placeholder="e.g. Birmingham Central Masjid"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Location</label>
              <select
                value={settings.location}
                onChange={e => update('location', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
              >
                <option value="birmingham">Birmingham</option>
                <option value="london">London</option>
                <option value="manchester">Manchester</option>
                <option value="leeds">Leeds</option>
                <option value="bradford">Bradford</option>
                <option value="liverpool">Liverpool</option>
                <option value="sheffield">Sheffield</option>
                <option value="bristol">Bristol</option>
              </select>
            </div>
          </div>
        </Section>

        {/* Display Settings */}
        <Section
          title="Display Settings"
          icon={
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Screen Resolution</label>
              <select
                value={settings.resolution}
                onChange={e => update('resolution', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
              >
                {RESOLUTIONS.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
              <p className="text-xs text-gray-600 mt-1">
                Current: {window.innerWidth} x {window.innerHeight}
              </p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Font Size</label>
              <div className="grid grid-cols-3 gap-2">
                {['medium', 'large', 'xlarge'].map(size => (
                  <button
                    key={size}
                    onClick={() => update('fontSize', size)}
                    className={`py-2 rounded-lg text-sm font-medium capitalize transition ${
                      settings.fontSize === size
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Scroll Speed</label>
              <div className="grid grid-cols-3 gap-2">
                {['slow', 'normal', 'fast'].map(speed => (
                  <button
                    key={speed}
                    onClick={() => update('scrollSpeed', speed)}
                    className={`py-2 rounded-lg text-sm font-medium capitalize transition ${
                      settings.scrollSpeed === speed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Languages */}
        <Section
          title="Language Preferences"
          icon={
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          }
        >
          <p className="text-sm text-gray-500 mb-4">Select languages to show on the display. Order matters — first language appears at top.</p>
          <div className="space-y-2">
            {LANGUAGES.map(lang => {
              const isActive = settings.languages.includes(lang.code);
              const index = settings.languages.indexOf(lang.code);
              return (
                <div
                  key={lang.code}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive ? 'bg-gray-800 border border-gray-700' : 'bg-transparent border border-transparent'
                  }`}
                >
                  <button
                    onClick={() => toggleLanguage(lang.code)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      isActive ? 'border-emerald-500 bg-emerald-500' : 'border-gray-600'
                    }`}
                  >
                    {isActive && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <span className={`text-sm flex-1 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                    {lang.name} ({lang.label})
                  </span>
                  {isActive && index >= 0 && (
                    <span className="text-xs text-gray-600 font-mono">Position: {index + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* Prayer Times */}
        <Section
          title="Prayer Times"
          icon={
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Calculation Method</label>
              <select
                value={settings.prayerMethod}
                onChange={e => update('prayerMethod', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
              >
                {PRAYER_METHODS.map(m => (
                  <option key={m.value} value={m.value}>{m.label} — {m.desc}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-800">
              <div>
                <p className="text-sm text-gray-300">Show prayer times on display</p>
                <p className="text-xs text-gray-600 mt-0.5">Display prayer times in the footer bar</p>
              </div>
              <Toggle checked={settings.showPrayerTimes} onChange={v => update('showPrayerTimes', v)} />
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-800">
              <div>
                <p className="text-sm text-gray-300">Show next prayer countdown</p>
                <p className="text-xs text-gray-600 mt-0.5">Display time remaining until next prayer</p>
              </div>
              <Toggle checked={settings.showCountdown} onChange={v => update('showCountdown', v)} />
            </div>
          </div>
        </Section>

        {/* System */}
        <Section
          title="System"
          icon={
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm text-gray-300">Auto-start on boot</p>
                <p className="text-xs text-gray-600 mt-0.5">Automatically start broadcast when the browser opens</p>
              </div>
              <Toggle checked={settings.autoStart} onChange={v => update('autoStart', v)} />
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-800">
              <div>
                <p className="text-sm text-gray-300">Kiosk mode</p>
                <p className="text-xs text-gray-600 mt-0.5">Hide cursor and UI chrome for clean display</p>
              </div>
              <Toggle checked={settings.kioskMode} onChange={v => update('kioskMode', v)} />
            </div>

            <div className="pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-600 mb-3">Browser info</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-500">Resolution</p>
                  <p className="text-gray-300 font-mono mt-1">{window.screen.width} x {window.screen.height}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-500">Device Pixel Ratio</p>
                  <p className="text-gray-300 font-mono mt-1">{window.devicePixelRatio}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-500">Viewport</p>
                  <p className="text-gray-300 font-mono mt-1">{window.innerWidth} x {window.innerHeight}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-500">User Agent</p>
                  <p className="text-gray-300 font-mono mt-1 truncate">{navigator.userAgent.split(' ').slice(-2).join(' ')}</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Save */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-xs text-gray-600">Settings are saved locally in your browser</p>
          <button
            onClick={save}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition ${
              saved
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
          >
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
