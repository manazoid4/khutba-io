import { Link } from 'react-router-dom';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-emerald-700">khutba.io</Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm">← Back to home</Link>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Priced for masjid budgets.</h1>
        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
          Not SaaS enterprise pricing. Real prices for real communities.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
          <span className="text-amber-700 text-sm font-medium">🌙 Ramadan 2027: Get 2 months free with annual billing</span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="border border-gray-200 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-gray-900">Starter</h3>
            <p className="text-gray-500 text-sm mt-1">For small masjids getting started</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-gray-900">£29</span>
              <span className="text-gray-500">/mo</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Less than MinbarLive's entry price</p>
            <ul className="mt-8 space-y-3">
              {[
                'Unlimited minutes',
                '3 languages (Arabic, English, Urdu)',
                'Live screen display',
                'Auto-scroll + RTL support',
                'UK prayer times',
                'WhatsApp sharing',
                '10-minute setup',
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full mt-8 bg-emerald-700 text-white py-3 rounded-lg font-medium hover:bg-emerald-800 transition">
              Start Free Trial
            </button>
          </div>

          {/* Masjid — Featured */}
          <div className="border-2 border-emerald-700 rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-xs font-medium px-3 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Masjid</h3>
            <p className="text-gray-500 text-sm mt-1">For growing communities</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-gray-900">£59</span>
              <span className="text-gray-500">/mo</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Same price as MinbarLive — but unlimited</p>
            <ul className="mt-8 space-y-3">
              {[
                'Everything in Starter',
                '6 languages (add Bengali, Somali)',
                'Khutbah archive (searchable)',
                'Masjid branding on display',
                'Ramadan mode (taraweeh support)',
                'Export khutbahs as PDF',
                'Priority WhatsApp support',
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full mt-8 bg-emerald-700 text-white py-3 rounded-lg font-medium hover:bg-emerald-800 transition">
              Start Free Trial
            </button>
          </div>

          {/* Centre */}
          <div className="border border-gray-200 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-gray-900">Centre</h3>
            <p className="text-gray-500 text-sm mt-1">For multi-room Islamic centres</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-gray-900">£99</span>
              <span className="text-gray-500">/mo</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">3x less than MinbarLive's multi-room plan</p>
            <ul className="mt-8 space-y-3">
              {[
                'Everything in Masjid',
                'Unlimited languages',
                'Multi-room / multi-screen',
                'Custom branding (logo, colours)',
                'Dedicated account manager',
                'API access for integrations',
                'Annual billing: 2 months free',
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full mt-8 bg-emerald-700 text-white py-3 rounded-lg font-medium hover:bg-emerald-800 transition">
              Contact Us
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">khutba.io vs MinbarLive</h2>
          <p className="text-gray-600 mb-8">The only two live khutbah translation tools. Here's the difference.</p>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-5 text-gray-500 font-medium text-sm">Feature</th>
                  <th className="p-5 bg-emerald-50">
                    <div className="text-emerald-700 font-bold">khutba.io</div>
                    <div className="text-xs text-emerald-600">Screen-first · UK · Unlimited</div>
                  </th>
                  <th className="p-5">
                    <div className="text-gray-700 font-bold">MinbarLive</div>
                    <div className="text-xs text-gray-500">Phone-first · Europe · Capped</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Entry price', '£29/mo', '€59/mo'],
                  ['Minutes included', 'Unlimited', '100 min (Standard)'],
                  ['Display', 'Screen-first (built for screens)', 'Phone-only (QR codes)'],
                  ['Currency', 'GBP (UK pricing)', 'EUR (Europe pricing)'],
                  ['RTL support', 'Built-in from day one', 'Not confirmed'],
                  ['UK prayer times', 'Included', 'Not available'],
                  ['Ramadan mode', 'Built in', 'Not available'],
                  ['WhatsApp sharing', 'Built in', 'Not available'],
                  ['Masjid branding', 'All tiers', 'Higher tiers only'],
                  ['Archive', 'Included in £59+', 'All tiers'],
                  ['Languages', '5 UK-focused, done right', '135+ (quality varies)'],
                  ['Setup time', '10 minutes', '15-20 minutes'],
                  ['Free trial', 'Yes — no card needed', '60 min one-time'],
                  ['Cancel anytime', 'Yes', 'Yes'],
                  ['Origin', 'Birmingham, UK', 'Bosnia'],
                ].map(([feature, us, them], i) => (
                  <tr key={feature} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="p-4 px-5 font-medium text-gray-700 text-sm">{feature}</td>
                    <td className="p-4 px-5 text-emerald-700 font-medium text-sm bg-emerald-50/30">{us}</td>
                    <td className="p-4 px-5 text-gray-500 text-sm">{them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Common questions</h2>
          {[
            {
              q: "Why is it cheaper than MinbarLive?",
              a: "We focus on one thing — live translation on screen. MinbarLive has 7 modules. We don't charge you for features you don't need. Our API cost is ~$3/mo per masjid — the rest goes to keeping the service running and improving it."
            },
            {
              q: "What does 'unlimited minutes' mean?",
              a: "Exactly that. Run khutbahs every Friday, every Ramadan, every taraweeh night. No caps. There's a fair use policy at 20 hours/month — which covers even the most active masjid."
            },
            {
              q: "Do we need to buy any hardware?",
              a: "No. If your masjid has a screen (TV, projector, monitor) and a laptop, you're ready. Open the browser, connect the mic, and you're live."
            },
            {
              q: "Can we try it before paying?",
              a: "Yes. Free trial, no card needed. Set it up, run a test khutbah, see how it looks on your screen. Then decide."
            },
            {
              q: "What languages do you support?",
              a: "Arabic, English, Urdu, Bengali, Somali. These are the languages UK masjids actually need. We focus on quality over quantity — your Urdu translation will be better than a tool that claims 135 languages."
            },
            {
              q: "Is our data stored in the UK?",
              a: "Yes. All data is stored on UK servers. We're GDPR compliant. Archive is opt-in — you control what gets stored."
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-gray-200 py-6">
              <h3 className="font-semibold text-gray-900">{q}</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-20 bg-emerald-700 rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Know another masjid that needs this?</h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
            Share khutba.io with your mosque committee's WhatsApp group. One message is all it takes.
          </p>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              "Assalamu Alaikum! We started using khutba.io — it shows live translations of the khutbah on our screen in Urdu, Bengali, and English. Takes 10 minutes to set up. Costs less than a box of flyers per month. Want me to show you? https://khutba.io"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Share on WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
          © 2026 khutba.io — Built in Birmingham, UK
        </div>
      </footer>
    </div>
  );
}
