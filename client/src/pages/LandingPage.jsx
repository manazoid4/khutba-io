import { Link } from 'react-router-dom';
import DemoRequestForm from '../components/DemoRequestForm';

const proofPoints = [
  ['Existing screens', 'Open one display link on the TV or projector you already use.'],
  ['One Friday workflow', 'Connect audio, run readiness, press Start, and leave the display alone.'],
  ['Mosque-first language', 'Arabic, English, Urdu, Bengali and Somali are core—not edge cases.'],
];

const faq = [
  ['Does the congregation need phones?', 'No. The hero experience is the shared prayer-hall screen. A personal-language link can remain optional for overflow and accessibility.'],
  ['What if our imam already translates?', 'Keep the imam’s chosen delivery. Khutba helps when one spoken language cannot serve a multilingual congregation and removes dependence on a weekly volunteer.'],
  ['Can we trust AI with Qur’an and Hadith?', 'No generic system should be trusted blindly. The pilot starts with mosque-approved terminology and human review. Verified Qur’an replacement and confidence handling will only be claimed after they are proven.'],
  ['Do we need technical staff?', 'No. A volunteer needs a browser, a clean audio feed or microphone, and the display link. The target setup time is under ten minutes.'],
  ['What happens if the internet drops?', 'The screen holds a calm standby state and reconnects automatically. The operator sees connection health before going live. Provider failover remains a production roadmap item.'],
  ['Is audio stored?', 'The current flow does not create an audio recording. Any future archive will be opt-in, mosque-controlled, and paired with retention and deletion settings.'],
];

function Wordmark() {
  return <Link to="/" className="inline-flex items-baseline gap-2" aria-label="Khutba.io home"><span className="font-editorial text-xl font-bold text-[#F4EDDF]">khutba</span><span className="text-[10px] font-bold uppercase tracking-[.28em] text-[#88CED0]">.io</span></Link>;
}

function ScreenPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#88CED0]/20 bg-[#08131F] shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-[#88CED0]/10 px-5 py-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#88CED0]/70"><span className="flex items-center gap-2"><i className="size-2 rounded-full bg-red-500" /> Live</span><span>Central Masjid</span><span>13:21</span></div>
      <div className="tile-pattern flex min-h-[330px] flex-col justify-center px-7 py-10 text-center md:min-h-[390px] md:px-12">
        <p className="display-text-ar text-2xl text-[#D6A64A]" dir="rtl">ٱلْجُمُعَة</p>
        <p className="font-editorial mx-auto mt-7 max-w-xl text-2xl leading-relaxed text-[#F4EDDF] md:text-4xl">“And whoever relies upon Allah—then He is sufficient for them.”</p>
        <div className="mx-auto my-6 h-px w-24 bg-gradient-to-r from-transparent via-[#D6A64A]/70 to-transparent" />
        <p className="text-[10px] font-bold uppercase tracking-[.35em] text-[#88CED0]">English</p>
      </div>
      <div className="grid grid-cols-5 border-t border-[#88CED0]/10 bg-[#0B1B2A] px-4 py-3 text-center">{['Fajr 04:42', 'Dhuhr 13:18', 'Asr 17:24', 'Maghrib 20:41', 'Isha 22:05'].map(item => <span key={item} className="text-[9px] uppercase tracking-wider text-[#E7D6B5]/65">{item}</span>)}</div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#08131F] text-[#F4EDDF]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#88CED0]/10 bg-[#08131F]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8"><Wordmark /><div className="hidden gap-7 text-sm text-[#E7D6B5]/65 md:flex"><a href="#product">Product</a><a href="#reliability">Reliability</a><Link to="/pricing">Pricing</Link></div><Link to="/demo" className="rounded-full border border-[#D6A64A]/50 bg-[#D6A64A]/10 px-4 py-2 text-sm font-semibold text-[#F0C978]">Try live demo</Link></div>
      </nav>

      <header className="relative min-h-[820px] pt-16 lg:min-h-[900px]">
        <img src="/khutba-courtyard-hero.png" alt="Painterly blue-hour Islamic courtyard with tiled arches and warm lantern light" className="absolute inset-0 h-full w-full object-cover object-[66%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#08131F_0%,rgba(8,19,31,.96)_30%,rgba(8,19,31,.5)_60%,rgba(8,19,31,.2)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08131F] via-transparent to-[#08131F]/20" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-5 py-20 md:px-8 lg:min-h-[840px]">
          <div className="max-w-3xl">
            <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[.28em] text-[#88CED0]"><span className="h-px w-10 bg-[#D6A64A]" /> The live language layer for the masjid</p>
            <h1 className="font-editorial text-5xl leading-[1.08] tracking-[-.04em] sm:text-6xl lg:text-[5.4rem]">Let every heart understand the khutbah.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#E7D6B5]/80 md:text-xl">Live translation on the screen your congregation already watches—built around the Friday workflow, Islamic language, and the volunteers who keep a masjid running.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Link to="/demo" className="rounded-full bg-[#D6A64A] px-7 py-3.5 text-center font-bold text-[#08131F] hover:bg-[#F0C978]">Experience the display</Link><a href="#pilot" className="rounded-full border border-[#88CED0]/35 bg-[#08131F]/45 px-7 py-3.5 text-center font-semibold">Book a 4-Friday pilot</a></div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#E7D6B5]/62"><span>Existing screen</span><span>Browser setup</span><span>No worshipper app</span><span>Archive off by default</span></div>
          </div>
        </div>
      </header>

      <main>
        <section className="border-y border-[#88CED0]/10 bg-[#0B1B2A]"><div className="mx-auto grid max-w-7xl divide-y divide-[#88CED0]/10 px-5 md:grid-cols-4 md:divide-x md:divide-y-0 md:px-8">{[['01', 'Imam speaks'], ['02', 'Khutba understands'], ['03', 'Screen translates'], ['04', 'Congregation follows']].map(([n, label]) => <div key={n} className="flex items-center gap-4 px-4 py-6 md:justify-center"><span className="font-editorial text-xl text-[#D6A64A]">{n}</span><span className="text-sm font-semibold">{label}</span></div>)}</div></section>

        <section id="product" className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:py-32">
          <div><p className="text-xs font-bold uppercase tracking-[.28em] text-[#88CED0]">The product wedge</p><h2 className="font-editorial mt-5 text-4xl leading-tight md:text-5xl">One shared screen. One clear weekly job.</h2><p className="mt-6 text-lg leading-8 text-[#E7D6B5]/66">Friday translation is the reason to install Khutba. A quiet daily prayer-and-announcement screen is what makes it too useful to remove.</p><div className="mt-9 space-y-7">{proofPoints.map(([title, body]) => <div key={title} className="border-l border-[#D6A64A]/45 pl-5"><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-[#E7D6B5]/58">{body}</p></div>)}</div></div><ScreenPreview />
        </section>

        <section id="reliability" className="relative border-y border-[#88CED0]/10 bg-[#0A1826] py-24"><div className="tile-pattern absolute inset-0 opacity-50" /><div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2 lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.28em] text-[#88CED0]">Friday readiness</p><h2 className="font-editorial mt-5 text-4xl leading-tight md:text-5xl">Trust is won before the imam begins.</h2><p className="mt-6 text-lg leading-8 text-[#E7D6B5]/65">A fixed weekly moment cannot tolerate mystery. Khutba makes microphone, connection, display, and language health visible before Jumu’ah.</p></div><div className="brand-panel rounded-2xl p-6 md:p-8"><div className="flex items-center justify-between border-b border-[#88CED0]/12 pb-5"><div><p className="text-xs uppercase tracking-[.24em] text-[#88CED0]/65">Central Masjid</p><p className="mt-1 text-xl font-semibold">Ready for Jumu’ah</p></div><span className="rounded-full bg-[#1F9EAD]/15 px-3 py-1 text-xs font-bold text-[#88CED0]">READY</span></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{['Microphone detected', 'Display connected', 'Internet stable', 'Languages selected', 'Caption test passed', 'Standby cached'].map(item => <div key={item} className="flex gap-3 rounded-lg bg-[#08131F]/55 px-4 py-3 text-sm text-[#E7D6B5]/78"><span className="text-[#F0C978]">✓</span>{item}</div>)}</div></div></div></section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-[.8fr_1.2fr] lg:py-32"><div><p className="text-xs font-bold uppercase tracking-[.28em] text-[#88CED0]">Accuracy first</p><h2 className="font-editorial mt-5 text-4xl leading-tight md:text-5xl">Religious language is not generic content.</h2><p className="mt-6 text-lg leading-8 text-[#E7D6B5]/65">Khutba’s intelligence roadmap protects meaning with mosque-approved terms, verified source replacement, confidence handling, and evaluation against real sermons.</p></div><div className="grid gap-4 sm:grid-cols-2">{[['Mosque glossary', 'Preferred vocabulary stays consistent.'], ['Verified Qur’an', 'Matched verses use an approved published translation.'], ['Speaker context', 'Consent-based profiles improve recurring names and accents.'], ['Visible confidence', 'Low-confidence religious text falls back safely.']].map(([title, body]) => <article key={title} className="brand-panel rounded-xl p-6"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#D6A64A]">Planned intelligence</p><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#E7D6B5]/58">{body}</p></article>)}</div></section>

        <section className="border-y border-[#88CED0]/10 bg-[#F4EDDF] py-24 text-[#162027]"><div className="mx-auto max-w-7xl px-5 md:px-8"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.28em] text-[#175EA8]">Simple commercial model</p><h2 className="font-editorial mt-5 max-w-2xl text-4xl leading-tight md:text-5xl">Buy reliability, not a bucket of AI minutes.</h2></div><Link to="/pricing" className="font-bold text-[#123E73] underline decoration-[#D6A64A] underline-offset-8">See annual pricing</Link></div><div className="mt-12 grid gap-5 md:grid-cols-3">{[['4 Fridays', 'Pilot'], ['£79 / month', 'Core'], ['£790 / year', 'Annual']].map(([price, title]) => <article key={title} className="border-t-2 border-[#123E73] pt-6"><p className="font-editorial text-3xl text-[#123E73]">{price}</p><h3 className="mt-3 font-bold">{title}</h3></article>)}</div></div></section>

        <section className="mx-auto max-w-5xl px-5 py-24 md:px-8 lg:py-32"><p className="text-center text-xs font-bold uppercase tracking-[.28em] text-[#88CED0]">Questions mosque committees ask</p><h2 className="font-editorial mt-5 text-center text-4xl md:text-5xl">Clear answers, before the pilot.</h2><div className="mt-12 divide-y divide-[#88CED0]/14 border-y border-[#88CED0]/14">{faq.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold"><span>{question}</span><span className="text-[#D6A64A]">+</span></summary><p className="max-w-3xl pt-4 leading-7 text-[#E7D6B5]/62">{answer}</p></details>)}</div></section>

        <section id="pilot" className="border-t border-[#88CED0]/10 bg-[#0B1B2A] py-24"><div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[.85fr_1.15fr]"><div><p className="text-xs font-bold uppercase tracking-[.28em] text-[#88CED0]">Founding mosque pilot</p><h2 className="font-editorial mt-5 text-4xl leading-tight md:text-5xl">Four Fridays to earn your committee’s trust.</h2><p className="mt-6 text-lg leading-8 text-[#E7D6B5]/65">We set up the display, test your audio, agree terminology, and review each Friday. Your result is the proof.</p></div><DemoRequestForm /></div></section>
      </main>

      <footer className="border-t border-[#88CED0]/10 py-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-[#E7D6B5]/45 md:flex-row md:items-center md:justify-between md:px-8"><Wordmark /><p>Built in Birmingham for multilingual masjid communities.</p><div className="flex gap-5"><Link to="/demo">Demo</Link><Link to="/pricing">Pricing</Link></div></div></footer>
    </div>
  );
}
