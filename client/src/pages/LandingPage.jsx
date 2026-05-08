import { Link } from 'react-router-dom';
import RamadanCountdown from '../components/RamadanCountdown';

const whatsappShareMessage = encodeURIComponent(
  "Salaam! Check out khutba.io — AI-powered mosque screens. Unlimited minutes, £29/month. Better than MinbarLive. https://khutba.io"
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-400">khutba.io</span>
            <span className="text-xs bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full font-medium">UK Built</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-400 hover:text-white text-sm transition">Features</a>
            <a href="#comparison" className="text-gray-400 hover:text-white text-sm transition">Compare</a>
            <Link to="/pricing" className="text-gray-400 hover:text-white text-sm transition">Pricing</Link>
            <Link to="/settings" className="text-gray-400 hover:text-white text-sm transition">Settings</Link>
            <Link to="/pricing" className="bg-emerald-500 text-gray-950 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-400 transition">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <RamadanCountdown />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-8">
              Your mosque's screen,
              <br />
              <span className="text-emerald-400">powered by AI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mt-6 leading-relaxed">
              Live khutbah translations, prayer times, and announcements — on the screen your congregation already watches.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
              <Link to="/pricing" className="bg-emerald-500 text-gray-950 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-400 transition text-lg w-full sm:w-auto text-center">
                Start Free Trial
              </Link>
              <a
                href={`https://wa.me/?text=${whatsappShareMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:border-emerald-500 hover:text-emerald-400 transition text-lg w-full sm:w-auto justify-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Share with your committee
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Unlimited minutes
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Screen-first display
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                £29/mo
              </span>
            </div>
          </div>

          {/* Mosque Screen Mock */}
          <div className="relative">
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/5 border border-gray-800">
              {/* Screen bezel */}
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">LIVE</span>
                </div>
                <span className="text-gray-500 text-xs">Birmingham Central Masjid</span>
                <div className="text-gray-500 text-xs">Jumu'ah — 1:15 PM</div>
              </div>
              {/* Screen content */}
              <div className="p-8 md:p-12 bg-gradient-to-b from-gray-900 to-gray-950 min-h-[320px] flex flex-col items-center justify-center">
                <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest">Friday Khutbah — Live Translation</p>
                <p className="text-white text-2xl md:text-3xl font-bold leading-relaxed text-center" dir="ltr">
                  The Prophet ﷺ said: "The best of you are those who learn the Quran and teach it."
                </p>
                <div className="w-16 h-px bg-emerald-500/30 my-6"></div>
                <p className="text-emerald-400 text-xl md:text-2xl leading-relaxed text-center" dir="rtl">
                  قال النبي ﷺ: "خيركم من تعلم القرآن وعلمه"
                </p>
                <div className="w-16 h-px bg-amber-500/30 my-6"></div>
                <p className="text-amber-400 text-lg md:text-xl leading-relaxed text-center" dir="rtl">
                  نبی کریم ﷺ نے فرمایا: "تم میں سے بہترین وہ ہے جو قرآن سیکھے اور سکھائے"
                </p>
              </div>
              {/* Bottom bar */}
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
                <span>English · Arabic · Urdu</span>
                <span>khutba.io</span>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-emerald-500/5 rounded-3xl blur-xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="border-y border-gray-800 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-emerald-400 font-bold text-lg">Built for UK</p>
              <p className="text-gray-500 text-sm mt-1">Birmingham · London · Manchester</p>
            </div>
            <div className="text-center">
              <p className="text-emerald-400 font-bold text-lg">5 Languages</p>
              <p className="text-gray-500 text-sm mt-1">English · Arabic · Urdu · Bengali · Turkish</p>
            </div>
            <div className="text-center">
              <p className="text-emerald-400 font-bold text-lg">GDPR Compliant</p>
              <p className="text-gray-500 text-sm mt-1">UK data residency</p>
            </div>
            <div className="text-center">
              <p className="text-emerald-400 font-bold text-lg">No App Needed</p>
              <p className="text-gray-500 text-sm mt-1">Works on any browser</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for masjids. <span className="text-emerald-400">Not phones.</span></h2>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          Every other translation tool makes people look at their phones. We put it on the screen where everyone can see.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              title: 'Screen-First Display',
              desc: 'Large text, auto-scroll, RTL support. Works on any screen your masjid already has. No hardware to buy.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Unlimited Minutes',
              desc: 'Every Friday. Every Ramadan. Every taraweeh night. No caps, no surprises, no running out mid-khutbah.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              ),
              title: 'UK Languages, Done Right',
              desc: 'Urdu, Bengali, Somali, Arabic, English. The languages UK masjids actually need — not 135 languages nobody uses.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: '10-Minute Setup',
              desc: 'Create account → connect mic → pick languages → go live. No IT person needed. Works on existing laptop + screen.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: 'Masjid Branding',
              desc: 'Your masjid name, your colours, your logo on the display. Not ours. It\'s your screen.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              title: 'Ramadan Ready',
              desc: 'Taraweeh mode for longer sessions. Ramadan theming. Built for the busiest time of the masjid year.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition">
              <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center mb-4 text-emerald-400">
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="bg-gray-900/50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't take our word for it.</h2>
          <p className="text-gray-400 text-lg mb-12">See how khutba.io compares to the only other live khutbah translation tool.</p>

          {/* Visual comparison cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* khutba.io card */}
            <div className="bg-gray-900 border-2 border-emerald-500 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-6 bg-emerald-500 text-gray-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                khutba.io
              </div>
              <div className="mt-2 space-y-4">
                {[
                  { label: 'Display', value: 'Screen-first', highlight: true },
                  { label: 'Minutes', value: 'Unlimited', highlight: true },
                  { label: 'Price', value: '£29/mo (GBP)', highlight: true },
                  { label: 'Setup', value: '10 minutes' },
                  { label: 'RTL', value: 'Built-in from day one' },
                  { label: 'UK prayer times', value: 'Included' },
                  { label: 'Ramadan mode', value: 'Built in' },
                  { label: 'WhatsApp sharing', value: 'Built in' },
                  { label: 'Origin', value: 'Birmingham, UK' },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                    <span className="text-gray-400 text-sm">{label}</span>
                    <span className={`text-sm font-medium ${highlight ? 'text-emerald-400' : 'text-white'}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* MinbarLive card */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 relative opacity-75">
              <div className="absolute -top-3 left-6 bg-gray-700 text-gray-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                MinbarLive
              </div>
              <div className="mt-2 space-y-4">
                {[
                  { label: 'Display', value: 'Phone-only (QR)' },
                  { label: 'Minutes', value: '100 min capped' },
                  { label: 'Price', value: '€59/mo (EUR)' },
                  { label: 'Setup', value: '15-20 minutes' },
                  { label: 'RTL', value: 'Not confirmed' },
                  { label: 'UK prayer times', value: 'Not available' },
                  { label: 'Ramadan mode', value: 'Not available' },
                  { label: 'WhatsApp sharing', value: 'Not available' },
                  { label: 'Origin', value: 'Bosnia' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                    <span className="text-gray-400 text-sm">{label}</span>
                    <span className="text-gray-500 text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key differentiators */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-emerald-400">£30</p>
              <p className="text-gray-400 text-sm mt-2">Cheaper per month than MinbarLive entry</p>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-emerald-400">∞</p>
              <p className="text-gray-400 text-sm mt-2">Unlimited minutes vs 100 min cap</p>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-emerald-400">1</p>
              <p className="text-gray-400 text-sm mt-2">Feature done perfectly vs 7 features done okay</p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Share Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Share with your mosque committee</h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
            One tap. Pre-written message. Send it to your masjid's WhatsApp group and let them decide.
          </p>
          <a
            href={`https://wa.me/?text=${whatsappShareMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-emerald-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transition shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Send WhatsApp Message
          </a>
          <p className="text-emerald-200/60 text-xs mt-4">
            "Salaam! Check out khutba.io — AI-powered mosque screens. Unlimited minutes, £29/month. Better than MinbarLive."
          </p>
        </div>
      </section>

      {/* Testimonial placeholder */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="border border-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <p className="text-gray-300 text-lg mb-4 italic">"We used to rely on a volunteer to translate. Now everyone follows along on the screen — in their own language."</p>
          <p className="text-emerald-400 font-medium">— Coming soon from our first Birmingham masjid</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900/50 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get your masjid Ramadan-ready.</h2>
          <p className="text-gray-400 text-lg mb-8">
            Less than a box of flyers per month. Unlimited minutes. Works on the screen you already have.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/pricing" className="bg-emerald-500 text-gray-950 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-400 transition text-lg w-full sm:w-auto text-center">
              Start Free Trial — No Card Needed
            </Link>
            <a
              href={`https://wa.me/?text=${whatsappShareMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-700 text-white px-6 py-4 rounded-lg font-medium hover:border-emerald-500 hover:text-emerald-400 transition text-lg w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Share on WhatsApp
            </a>
          </div>
          <p className="text-gray-600 text-sm mt-6">Built in Birmingham. Priced for UK masjids.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-gray-500 text-sm">© 2026 khutba.io — Built in Birmingham, UK</span>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-gray-500 hover:text-emerald-400 text-sm transition">Features</a>
            <a href="#comparison" className="text-gray-500 hover:text-emerald-400 text-sm transition">Compare</a>
            <Link to="/pricing" className="text-gray-500 hover:text-emerald-400 text-sm transition">Pricing</Link>
            <a
              href={`https://wa.me/?text=${whatsappShareMessage}`}
              className="text-gray-500 hover:text-emerald-400 text-sm transition flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Share
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
