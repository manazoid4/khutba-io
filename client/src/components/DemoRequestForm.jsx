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
      const response = await fetch('/api/demo-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

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
    ? 'bg-gray-950/80 border-gray-700 text-white placeholder-gray-600 focus:border-emerald-400 focus:ring-emerald-400/30'
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-600 focus:ring-emerald-600/20';

  const labelClass = isDark ? 'text-gray-300' : 'text-gray-700';
  const helpClass = isDark ? 'text-gray-500' : 'text-gray-500';

  return (
    <form onSubmit={submit} className={`rounded-2xl border p-6 md:p-8 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-emerald-50 border-emerald-100'}`}>
      <div className="mb-6">
        <p className={`text-sm font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Launch offer</p>
        <h2 className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Book a 15-minute masjid screen demo</h2>
        <p className={`text-sm mt-2 ${helpClass}`}>
          First 10 UK masjids get setup help and the £29/month starter price locked for 12 months.
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
                    ? 'bg-emerald-500 border-emerald-500 text-gray-950'
                    : isDark
                      ? 'border-gray-700 text-gray-300 hover:border-emerald-500'
                      : 'border-gray-300 text-gray-700 hover:border-emerald-600'
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
        className="w-full mt-6 bg-emerald-500 text-gray-950 py-3 rounded-lg font-bold hover:bg-emerald-400 transition disabled:opacity-60 disabled:cursor-wait"
      >
        {status === 'submitting' ? 'Saving request...' : 'Request WhatsApp demo'}
      </button>

      {status === 'success' && (
        <p className={`mt-4 text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
          Request saved. Follow up by WhatsApp and offer a live screen test.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
      )}
    </form>
  );
}
