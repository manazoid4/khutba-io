import { useState } from 'react';

const initialForm = {
  masjidName: '',
  contactName: '',
  whatsapp: '',
  city: 'Birmingham',
  languages: ['English', 'Urdu'],
  notes: '',
};

const languageOptions = ['English', 'Arabic', 'Urdu', 'Bengali', 'Somali'];

export default function DemoRequestForm({ variant = 'dark' }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const isDark = variant === 'dark';

  const update = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setStatus('idle');
    setError('');
  };

  const toggleLanguage = (language) => {
    const next = form.languages.includes(language)
      ? form.languages.filter(item => item !== language)
      : [...form.languages, language];
    update('languages', next);
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const apiBase = import.meta.env.VITE_SERVER_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '');
      const response = await fetch(`${apiBase}/api/demo-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Pilot requests are not connected on this preview yet. You can still try the interactive demo.');
      }
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Could not save request');
      }

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Could not save request');
    }
  };

  const inputClass = isDark
    ? 'bg-[#08131F]/80 border-[#88CED0]/18 text-[#F4EDDF] placeholder-[#E7D6B5]/25 focus:border-[#D6A64A] focus:ring-[#D6A64A]/20'
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#175EA8] focus:ring-[#175EA8]/20';

  const labelClass = isDark ? 'text-[#E7D6B5]/75' : 'text-gray-700';
  const helpClass = isDark ? 'text-[#E7D6B5]/42' : 'text-gray-500';

  return (
    <form onSubmit={submit} className={`rounded-2xl border p-6 md:p-8 ${isDark ? 'brand-panel border-[#88CED0]/16' : 'bg-blue-50 border-blue-100'}`}>
      <div className="mb-6">
        <p className={`text-sm font-semibold ${isDark ? 'text-[#88CED0]' : 'text-[#123E73]'}`}>Four-Friday pilot</p>
        <h2 className={`text-2xl font-bold mt-1 ${isDark ? 'text-[#F4EDDF]' : 'text-gray-900'}`}>Book a 15-minute masjid screen demo</h2>
        <p className={`text-sm mt-2 ${helpClass}`}>
          Test your own imam, audio feed, languages and screens before asking the committee to subscribe.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="block">
          <span className={`block text-sm font-medium mb-1.5 ${labelClass}`}>Masjid name</span>
          <input
            required
            value={form.masjidName}
            onChange={event => update('masjidName', event.target.value)}
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ring-2 ring-transparent transition ${inputClass}`}
            placeholder="Birmingham Central Masjid"
          />
        </label>

        <label className="block">
          <span className={`block text-sm font-medium mb-1.5 ${labelClass}`}>Your name</span>
          <input
            required
            value={form.contactName}
            onChange={event => update('contactName', event.target.value)}
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ring-2 ring-transparent transition ${inputClass}`}
            placeholder="Committee member"
          />
        </label>

        <label className="block">
          <span className={`block text-sm font-medium mb-1.5 ${labelClass}`}>WhatsApp number</span>
          <input
            required
            value={form.whatsapp}
            onChange={event => update('whatsapp', event.target.value)}
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ring-2 ring-transparent transition ${inputClass}`}
            placeholder="+44 7..."
            inputMode="tel"
          />
        </label>

        <label className="block">
          <span className={`block text-sm font-medium mb-1.5 ${labelClass}`}>City</span>
          <input
            required
            value={form.city}
            onChange={event => update('city', event.target.value)}
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ring-2 ring-transparent transition ${inputClass}`}
            placeholder="Birmingham"
          />
        </label>
      </div>

      <div className="mt-5">
        <span className={`block text-sm font-medium mb-2 ${labelClass}`}>Languages needed</span>
        <div className="flex flex-wrap gap-2">
          {languageOptions.map(language => {
            const active = form.languages.includes(language);
            return (
              <button
                type="button"
                key={language}
                onClick={() => toggleLanguage(language)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${
                  active
                    ? 'bg-[#D6A64A] border-[#D6A64A] text-[#08131F]'
                    : isDark
                      ? 'border-[#88CED0]/18 text-[#E7D6B5]/70 hover:border-[#88CED0]'
                      : 'border-gray-300 text-gray-700 hover:border-[#175EA8]'
                }`}
              >
                {language}
              </button>
            );
          })}
        </div>
      </div>

      <label className="block mt-5">
        <span className={`block text-sm font-medium mb-1.5 ${labelClass}`}>What should the demo prove?</span>
        <textarea
          value={form.notes}
          onChange={event => update('notes', event.target.value)}
          rows={3}
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ring-2 ring-transparent transition resize-none ${inputClass}`}
          placeholder="Example: Urdu translation on the main hall screen before Jumu'ah"
        />
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full mt-6 bg-[#D6A64A] text-[#08131F] py-3 rounded-lg font-bold hover:bg-[#F0C978] transition disabled:opacity-60 disabled:cursor-wait"
      >
        {status === 'submitting' ? 'Saving request...' : 'Request WhatsApp demo'}
      </button>

      {status === 'success' && (
        <p className={`mt-4 text-sm font-medium ${isDark ? 'text-[#88CED0]' : 'text-[#123E73]'}`}>
          Request saved. We will follow up to arrange the live screen test.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
      )}
    </form>
  );
}
