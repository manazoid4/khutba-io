# Khutba.io Product, Research, Revenue and Category Decision

**Decision date:** 8 August 2026  
**Scope:** UK-first live khutbah translation, then mosque communication infrastructure  
**Evidence standard:** Public claims were checked on 8 August 2026. “Not published” means the vendor does not disclose it. Non-UK/US market totals are transparent planning ranges, not audited counts.

## 1. Executive verdict

Khutba.io should become the software a mosque opens before Jumu'ah, leaves on its screen through the week, and keeps because its language preferences, operating history and congregation workflows live there.

The immediate business is not “AI translation.” It is a dependable, screen-first **Live Khutbah Platform** for UK mosques with existing mixers and displays. Connect the mixer, run Friday Readiness, press Start, and show calm multilingual captions without asking worshippers to install an app or use a phone.

The expansion is a **Mosque Communication OS**: prayer times, multilingual notices, Friday mode, events, Ramadan schedules and remote screen management. Translation is the hero acquisition feature; daily screen utility is the retention layer.

The repository is now a persuasive product prototype, not a production translation service. Its React display/admin pairing works, but speech is still a browser placeholder; it lacks production STT/translation, persistence, authentication, billing, provider failover and verified prayer-time integration. Close that reliability gap before broadening features.

## 2. Category

**Own now:** Live Khutbah Platform  
**Descriptive line:** The live language layer for the masjid.  
**Long-term category:** Mosque Communication OS

“Live Khutbah Platform” is concrete enough for a committee to understand and search for. “Mosque Communication OS” is the destination, but leading with it before daily screen functions exist would overstate the product.

imam/mixer → Friday Readiness → Islamic-language pipeline → existing masjid screen → congregation

The category question to create between committees is: **“Do you have Khutba on your screens?”**

## 3. Best ICP

Sell first to a **medium-to-large UK multilingual independent or central mosque** with 400–1,500 Friday attendees, an existing mixer and screen/projector, a recurring Arabic/Urdu/Bengali/Somali/English comprehension gap, a volunteer operator, and a committee able to approve about £790 annually. Visible local mosques compound referrals.

| Segment | Buyer / user / decision-maker | WTP and friction | Main pain / strongest feature | Cycle, churn, expansion |
|---|---|---|---|---|
| Small independent mosque | Chair / volunteer / committee | £29–49/mo; screen/budget gaps | No translator / browser starter | 2–6 weeks; high churn; screen kit |
| Medium community mosque | Secretary / AV volunteer / committee | £69–99/mo | Recurring language gap / readiness + display | 2–8 weeks; medium-low churn; daily screen |
| Major central mosque | Ops lead / AV team / trustees | £149–249/mo; security review | Scale and trust / Pro + SLA | 1–4 months; low churn; archive/livestream |
| Multi-site group | COO / site admins / board | £300–1,500+/mo; procurement | Inconsistent sites / central control | 2–6 months; very low churn; sites |
| Islamic centre | Director / comms / board | £79–199/mo | Khutbah + programmes / display OS | 1–3 months; low-medium churn |
| Islamic school | Head / teacher / governors | £69–149/mo; safeguarding | Assemblies/parents / multilingual notices | 1–3 months; seasonal; announcements |
| University ISoc | President / AV / SU | £29–79/mo; annual turnover | Temporary venues / portable setup | 2–6 weeks; high churn; event pack |
| Conference organiser | Producer / AV / organiser | £300–3,000/event | Many speakers/languages / event console | Days–2 months; episodic |
| Islamic charity | Comms director / producer / leadership | £149–1,000+/mo | Tours/livestreams / overlays | 1–4 months; medium churn; multi-site |
| Ramadan venue | Committee / volunteer / committee | £199–999/season | Intensive temporary use / Ramadan mode | Fast; seasonal renewal |
| Other multilingual institution | Director / AV / board | £149–1,500+/mo | Service accessibility / white label | 1–6 months; low churn |

Do not target tiny no-screen prayer rooms, GCC public procurement or consumers first. They bring lower workflow fit, slower learning or weaker retention.

## 4. Competitor map

The market is already crowded. Direct competitors combine mosque terminology, QR access, screens, archives and Qur'an-aware modes. Khutba.io must win through the most dependable UK screen workflow, not a false “only competitor” claim.

| Product | Customer / geography | Published price | Product and languages | Engine / latency | Strength | Khutba opening |
|---|---|---|---|---|---|---|
| [MinbarLive](https://minbarlive.com/modules/live-captions-translation/) | Mosques/events; Europe/global | Free 80 min/mo, 1 source + 1 target; paid custom | QR, display, archive; 135+ paid | Not published | Qur'an Mode, TTS, AutoPilot, quality dashboard | Simpler UK screen operations and transparent package |
| [KhutbahLive](https://www.khutbah-live.com/) | Mosques; Denmark/Europe | Not published; early access | Screen-first; current English/Danish | Under 4 sec claimed; engines not published | Mixer feed, multiple screens, established Qur'an translation matching | Wider benchmarked UK priority languages |
| [Bayaan](https://www.bayaan.ai/) | Mosques; Netherlands/global | Custom | Phone/QR + screen; 50+ | About 2.5 sec claimed; engines not published | Donations, membership, announcements | Narrower operational focus and explicit pricing |
| [Clear Khutbah](https://apps.apple.com/us/app/clear-khutbah-ai-translator/id6756271069) | Consumers; global | US$4.99/mo | iPhone, TV, summaries/history | Not published | Extremely low price | No mosque workflow, readiness, glossary or support |
| [Tarjama.ai](https://tarjama.ai/pricing) | Islamic video; global | Free 15 min; £4.99/120; £9.99/500 | Post-produced translation | Not fully published | Strong Islamic-meaning/terminology brand | Not live venue operations; a quality/brand reference |
| [Masjidbox](https://masjidbox.com/pricing) | Mosques; Europe/global | Free; €29/product; €62 suite | Prayer/signage/web/mobile | Translation not core | €49/€199 players, offline/autostart | Incumbent risk and integration/channel opportunity |
| [MasjidConnect](https://www.masjidconnect.co.uk/pricing) | UK mosques | £349/£499/£999 packages; hardware/install extra | Installed digital signage | Translation not core | UK hardware and onsite support | Strong partner/reseller candidate and hardware competitor |
| [LiveWord](https://liveword.app/) | Churches; global | $39/mo or $390/yr/12h; $79/$790/30h | Projector, glossary, scripture detection | Not published | Validates weekly religious workflow/annual pricing | Islamic specialisation and mosque distribution |
| [ChurchTranslator](https://app.churchtranslator.ai/) | Churches; global | $149/mo, published unlimited + 6 languages | Display + OBS | Not published | Simple multi-output workflow | No Islamic trust/data layer |
| [OpenEar](https://openearproject.org/) | Technical churches | Free/open source | Local/offline | Stack-dependent | Privacy and no subscription | Khutba must sell support/reliability, not tokens |
| [Koine](https://www.getkoine.com/) | Churches/events | $49/12 language-hours; $149/40 | Live translation | Not published | Clear usage economics | Predictable mosque annual plan and screen-first UX |

Substitutes matter: a human translator, bilingual imam, pre-written translation, YouTube/meeting captions and doing nothing. They often carry less committee risk.

**Choose Khutba today:** existing screen/mixer, account-free demo, hall-distance typography, volunteer-first readiness, and a four-Friday proof period.

**Stay five years:** the mosque accumulates its approved glossary, speaker profiles with consent, display templates, readiness/session history, archives and daily notices; its volunteers know the workflow and sites share settings.

**Why a cheap API cannot displace it:** an API does not supply mixer setup, Friday checks, approved Qur'an policy, volunteer UX, archive, incident history, training, human support, installer channel or committee trust.

## 5. Market size

The strongest UK directory counted **1,895 actual masjids** and **2,110 active masjids/prayer rooms** in 2026 ([Muslims in Britain](https://www.muslimsinbritain.org/statistics/statistics01.php)). The US Mosque Survey found **2,769 US mosques** in 2020; 76% were entirely volunteer-managed, median annual budget was $80,000 and average Friday attendance was 410 ([ISPU](https://ispu.org/reports-and-analysis/report-1-mosque-survey-2020/)). That supports volunteer-first UX and a selective ICP, not “every mosque.”

| Region | Planning universe | Near-term digitally serviceable | Interpretation |
|---|---:|---:|---|
| UK | 1,895 verified; 2,110 incl. prayer rooms | 600–1,100 | Beachhead; 100–300 ICP sites can create visibility |
| Europe excluding UK | 12,000–20,000 estimate | 3,000–7,000 | Fragmented; partner-led countries |
| North America | 3,500–4,500 range; 2,769 US verified in 2020 | 1,500–3,000 | Higher WTP and church-tech precedent |
| GCC | 25,000–45,000 estimate | 3,000–8,000 commercially accessible | Screens are common; procurement/state systems constrain access |
| South Asia | 150,000+ broad estimate | 10,000–25,000 | Huge base, lower ARPA, reseller economics |
| Africa | 120,000+ broad estimate | 8,000–20,000 | Uneven budgets/connectivity; institution-led |
| Global | 280,000+ location proxy | 35,000–70,000 plausible digital SAM | Prove 1,000 paid sites before using broad TAM |

At £1,000 blended annual value, the verified UK mosque base is a £1.9m theoretical annual universe before centres/schools/events. A realistic five-year UK aim is 500–800 paying sites (£0.5m–£1.2m ARR depending mix), not every prayer room.

## 6. Product wedge

The smallest winning product:

1. Create mosque and select source/target languages.
2. Pair a browser display by link/QR.
3. Run Friday Readiness: microphone, connection, display, provider, languages and cached standby.
4. Press Start explicitly.
5. Show huge, low-distraction translations.
6. Degrade visibly and reconnect automatically.
7. End and optionally retain a private transcript.

The wedge is not the largest language list. It is **the most trusted 45 minutes of the mosque's week**.

| Objection | Product answer |
|---|---|
| “We have a translator.” | Complement them for overflow/second language; do not replace what works. |
| “Everyone understands English.” | Pilot one underserved cohort; do not manufacture need. |
| “No phones in the khutbah.” | Screen-first; optional QR can be disabled. |
| “AI may mistranslate religion.” | Approved glossary/Qur'an policy, confidence handling and published benchmark. |
| “We already have screens.” | Ideal: open one URL on the existing player. |
| “No technical staff.” | Six-step setup, readiness and optional Khutba Box. |
| “£79 is too much.” | Four-Friday proof, annual value and later daily screen utility. |
| “Internet may fail.” | Cached standby, reconnect, degraded captions, optional managed device. |
| “Can it handle Urdu/Arabic?” | Benchmark the real imam before purchase; language count is not proof. |
| “Qur'an and Hadith?” | Match Qur'an to a verified corpus/approved translation; never invent Hadith sources. |
| “Privacy?” | No audience tracking; no audio retention by default; mosque-owned data and deletion. |
| “Must the imam wear something?” | Prefer existing mixer line-out; USB mic is fallback. |

## 7. Product expansion

live translation → Friday screen workflow → daily mosque screen → archive/embeds → multi-site communication

- **Hero/acquisition:** Friday translation.
- **Trust:** readiness, failover, accuracy policy, glossary.
- **Retention:** prayer/standby/announcement modes and screen health.
- **Expansion:** archive, livestream overlay, embeds, rooms/sites, SLA.
- **Platform:** centrally scheduled multilingual communication.

Later, package the engine for Islamic conferences/broadcasters as “Khutba Live Events.” Do not confuse the mosque brand with generic events until mosque retention repeats.

## 8. Pricing

| Plan | Monthly | Annual | Outcome |
|---|---:|---:|---|
| Core | £79 | £790 | One site, up to three text languages, readiness, support, fair-use live translation |
| Pro | £149 | £1,490 | Multiple outputs, glossary, optional archive, livestream, priority support |
| Network | from £399 | £3,990 | Three sites, central management, shared packs, roles, onboarding |
| Enterprise/events | Custom | Annual/event | SLA, many sites/rooms, installation and reserved capacity |

Offer a **four-Friday pilot**, not a forever-free mosque plan. Keep the account-free scripted demo free.

Do not promise unlimited. Derive fair-use thresholds from observed use and never cut off mid-sermon. Taraweeh, lectures, TTS and many simultaneous languages require scheduled capacity. Annual buyers get two months equivalent discount, guided readiness and term price lock. Include hardware only when annual gross-profit payback stays below six months.

## 9. ARR model

Scenario, not forecast:

| Customers | Base £790 ACV | Strong £1,200 ACV | Category leader £1,800 ACV |
|---:|---:|---:|---:|
| 100 | £79,000 | £120,000 | £180,000 |
| 500 | £395,000 | £600,000 | £900,000 |
| 1,000 | £790,000 | £1,200,000 | £1,800,000 |
| 5,000 | £3,950,000 | £6,000,000 | £9,000,000 |
| 10,000 | £7,900,000 | £12,000,000 | £18,000,000 |

Base is mostly Core; Strong includes Pro/network; Category Leader assumes mature multi-site communications. Ten thousand needs international partner distribution and should not shape current infrastructure.

One hundred Core annual prepayments produce £79,000 cash rather than roughly £7,900 monthly steady-state billings. That improves cash/churn but must not hide poor weekly activation.

## 10. Unit economics

[Deepgram](https://deepgram.com/pricing) publishes Nova-3 mono streaming at $0.0048/min and multilingual at $0.0058/min. [Google Cloud Translation](https://cloud.google.com/translate/pricing) publishes $20/million NMT characters and $10/million Translation LLM characters; [AWS Translate](https://aws.amazon.com/translate/pricing/) publishes $15/million. Benchmark Islamic quality rather than inferring it from price.

Assumptions: 4.33 sessions/month, 780 source characters/min, three target languages, $0.0058 STT and $20/million translation.

| Weekly duration | Monthly minutes | STT | 3-target translation | Direct AI |
|---:|---:|---:|---:|---:|
| 30 min | 130 | $0.75 | $6.08 | $6.83 |
| 45 min | 195 | $1.13 | $9.12 | $10.25 |
| 60 min | 260 | $1.51 | $12.17 | $13.68 |

A $10/million tier halves translation cost subject to quality. Add estimated £3–8/customer/month for infrastructure, monitoring, payment and pooled support. Core plausibly sustains 75–90% gross margin in normal Friday use; Ramadan/Taraweeh are outliers.

Targets: founder CAC £250–500; partner CAC £150–350; ARPA £90–120/mo; gross margin 80–88%; payback 3–6 months; annual logo churn below 12%. Illustrative gross-profit LTV is about £7,900 at £950 annual GP/12% churn and £4,750 at 20% churn. Replace assumptions with cohorts after 30 renewals.

## 11. Customer acquisition system

1. Build strong-ICP lists city by city.
2. Send a human WhatsApp plus 90-second demo.
3. Run a 15-minute readiness call.
4. Prove four Fridays.
5. Close annual.
6. Ask for two committee/imam introductions and a reference.
7. Show configurable “Translation powered by khutba.io” only in standby/end state.

Prospect schema: mosque, city, charity number, attendance band, public contact, languages, screen/mixer evidence, incumbent signage, decision-makers, source, last/next contact, pilot Fridays, readiness, objections, consent, outcome and referrer.

Prioritise mosque AV/prayer-display installers, Muslim umbrella organisations, imam/operations referrals, founder visits in Birmingham/London/Manchester/Bradford/Leicester, conference demonstrations and useful search content. Do not scrape private numbers or spam.

## 12. Sales playbook

**Initial WhatsApp**

> As-salamu alaykum — I’m building Khutba.io for mosques that want live khutbah translation on the screen they already use, without asking worshippers to use phones. We set up the mixer, display and languages, then prove it across four Fridays before any subscription. Would a 90-second demo help the person responsible for Jumu'ah or AV?

**Cadence:** day 0 demo; day 3 one relevant screenshot; day 10 readiness call; day 21 consented local proof; day 35 close loop.

**15-minute demo:** establish who misses meaning and wiring; run /demo; show readiness/display; disclose limitations and benchmark; agree the next Friday and equipment owner.

**Pilot:** Friday 0 equipment/glossary; Friday 1 assisted baseline; Friday 2 tune audio/glossary/font; Friday 3 volunteer operates; Friday 4 proof summary and annual proposal.

Close on successful live minutes, uptime, p50/p95 latency, operator confidence, languages, corrections and feedback. Ask for £790 annual; fall back to monthly only if approval timing requires it. Onboarding target is under ten minutes once audio access exists.

## 13. Retention engine

- Before: readiness reminder, screen heartbeat, one-click test.
- During: health, reconnect, degraded mode, escalation.
- After: success summary, correction inbox, optional archive.
- Daily: prayer/standby/announcements with remote scheduling.
- Seasonal: Ramadan, Eid, emergency modes.
- Organisational: roles, multi-site templates, audit and glossary.

North-star reliability metric: **successful live minutes / intended live minutes**. Activation is two successful Fridays run by a mosque volunteer, not account creation. Leading indicators: four-week activation, readiness completion, daily display uptime, glossary additions, archive/embed use and referrals.

Track mosque-level system health, not worshippers, faces, phones or sermon engagement.

## 14. Moat stack

Impact/revenue are 1–5; copyability 1 is hardest to copy.

| Rank | Moat | Impact | Difficulty / time | Capital | Copyability | Revenue |
|---:|---|---:|---|---|---:|---:|
| 1 | Friday workflow + Display OS | 5 | Hard / 6–18 mo | Medium | 2 | 5 |
| 2 | Mosque glossary/pronunciation | 5 | Medium / 3–12 mo | Low-med | 2 | 5 |
| 3 | Islamic benchmark/correction data | 5 | Hard / 6–24 mo | Medium | 1 | 4 |
| 4 | Trust/review/incident transparency | 5 | Hard / years | Medium | 1 | 5 |
| 5 | Installer/organisation distribution | 5 | Hard / 6–24 mo | Medium | 2 | 5 |
| 6 | Multi-site management | 4 | Hard / 9–18 mo | Medium | 3 | 5 |
| 7 | Private archive and embeds | 4 | Medium / 3–9 mo | Medium | 3 | 4 |
| 8 | Consented speaker profiles | 4 | Medium / 6–12 mo | Low | 2 | 3 |
| 9 | Mosque support/readiness history | 4 | Operational / now | Medium | 2 | 4 |
| 10 | Prayer/signage/stream integrations | 4 | Hard / 6–18 mo | Medium | 3 | 4 |
| 11 | Approved shared terminology packs | 4 | Medium / 6–18 mo | Low | 2 | 3 |
| 12 | Optional managed Khutba Box | 3 | Medium / 3–9 mo | Med-high | 4 | 4 |
| 13 | Provider abstraction/failover data | 4 | Hard / 3–9 mo | Medium | 3 | 3 |
| 14 | Brand/category association | 4 | Hard / years | Med-high | 1 | 5 |
| 15 | Screen-visible referral loop | 4 | Medium / 3–12 mo | Low | 3 | 4 |

The defence is the relationship + workflow + specialised data + screen + support + distribution operating together.

## 15. Islamic translation intelligence strategy

**Khutba Intelligence Layer**

mixer → voice activity/noise control → streaming ASR → language ID/code-switching → Islamic term recognition → Qur'an/Hadith candidates → contextual translation → mosque glossary → confidence policy → display formatter

Rules: preserve names/honorifics and local conventions; separate transcription and translation confidence; never invent a Qur'an/Hadith reference; use a conservative fallback below threshold; store audio only by explicit opt-in; keep mosque corrections mosque-owned; make cross-mosque learning separately permissioned/anonymised.

### Qur'an detection

The [Quran Foundation API](https://api-docs.quran.com/docs/api-reference/) provides verse content and published translations. Its [content guidance](https://api-docs.quran.com/docs/content_apis_versioned/4.0.0/content-apis/) warns developers not to retranslate vetted translations.

1. Normalise Arabic ASR while retaining the original.
2. Run phonetic/fuzzy retrieval against a verified verse corpus over a context window.
3. Require calibrated contiguous evidence.
4. On a confident match, use the mosque-selected approved published translation and verse reference.
5. Start in shadow mode: log candidates for review without changing live output.
6. Treat false verse replacement as a critical safety metric.

Seed evaluation with the [Quranic ASR Benchmark](https://huggingface.co/datasets/Quran-Lab/quranic-asr-benchmark), then build a consented sermon set covering UK acoustics, embedded recitation and code-switching.

### Mosque-controlled dictionary

Let each mosque choose Salah/prayer, Jumu'ah/Friday prayer, Allah/God, Qur'an translation, imam/scholar/local names, fiqh vocabulary, transliteration, honorific style (ﷺ, رضي الله عنه), and Urdu/Bengali/Somali terms. Entries are versioned with approver, scope and last use; mosques can export/delete them. Shared packs need attribution and recipient approval.

### Provider benchmark

Compare Deepgram, Google, Azure, AWS and OpenAI/Gemini candidates on the same clips:

- WER/CER per priority language;
- Islamic-term/entity error rate and code-switch boundaries;
- Qur'an retrieval precision/recall/false replacements;
- p50/p95 end-to-end latency and partial-result flicker;
- reconnect/outage behaviour and cost/successful live minute;
- UK accent, imam and room-acoustic slices;
- data region, retention, training use and deletion terms.

Use an ASR/translation provider interface. Select primary/fallback per language pair from evidence; batch-quality challengers need not win the live path.

## 16. Product roadmap

Scores for ARR, retention and moat are relative 1–5.

### NOW — 0–30 days

| Feature | Problem | ARR | Retention | Moat | Cost | Priority |
|---|---|---:|---:|---:|---|---|
| 10 four-Friday pilots | Assumptions unproven | 5 | 5 | 4 | Medium ops | P0 |
| Provider abstraction + benchmark | Prototype is not translation | 5 | 5 | 4 | High | P0 |
| Auth/persistent sessions/roles | Current URLs/sockets are insecure | 5 | 5 | 3 | High | P0 |
| Readiness + health telemetry | Friday failure destroys trust | 5 | 5 | 4 | Medium | P0 |
| Privacy/DPA/retention controls | Committee cannot assess risk | 4 | 5 | 4 | Medium | P0 |
| Durable leads + annual billing | Site cannot reliably convert/charge | 5 | 3 | 2 | Medium | P0 |
| Verified prayer times or remove | Wrong sacred-time display is unacceptable | 3 | 5 | 3 | Low-med | P0 |

### NEXT — 30–90 days

| Feature | Problem | ARR | Retention | Moat | Cost | Priority |
|---|---|---:|---:|---:|---|---|
| Mosque glossary v1 | Terms/names vary | 5 | 5 | 5 | Medium | P1 |
| Qur'an shadow detector | Generic verse translation is unsafe | 4 | 5 | 5 | High | P1 |
| Standby/prayer/announcement modes | Weekly-only value can churn | 4 | 5 | 4 | Medium | P1 |
| Pilot proof summary | Committee needs evidence | 5 | 3 | 2 | Low | P1 |
| Opt-in archive/deletion | Reuse without forced storage | 4 | 4 | 4 | Medium | P1 |
| Referral source/prompt | Paid acquisition is costly | 4 | 3 | 4 | Low | P1 |

### LATER — 3–12 months

| Feature | Problem | ARR | Retention | Moat | Cost | Priority |
|---|---|---:|---:|---:|---|---|
| Installer partner console | Founder cannot install nationally | 5 | 4 | 5 | Medium | P2 |
| OBS overlay/website embed | Translation trapped on screen | 4 | 4 | 4 | Medium | P2 |
| Multi-site/roles/shared glossary | Groups repeat work | 5 | 5 | 5 | High | P2 |
| Consented imam profiles | Recurring speaker errors | 3 | 4 | 4 | Medium | P2 |
| Khutba Box pilot | Player reliability varies | 3 | 5 | 3 | Med-high | P2 |
| Shared approved packs | Corrections are duplicated | 3 | 4 | 5 | Medium | P2 |

**12–24 months:** country packs, reseller Europe/North America, enterprise SLA, mosque-group communications, donor-backed markets, and a separate live-events package—but only after UK cohort renewal.

**NEVER while proving core:** consumer social feed; AI sermon writing; mandatory hardware; vanity language counts; unmetered TTS; audience surveillance; required worshipper app; 10,000-customer infrastructure before 100 renew.

## 17. Visual redesign strategy

Direction: **Islamic architectural heritage × premium modern software × live broadcast interface**.

The UI now uses midnight, lapis, cobalt, turquoise, ceramic, aged gold, sand and plaster; an original painterly courtyard; editorial serif headlines; Naskh-inspired Arabic; subtle tile geometry; arch-like frames and calm negative space. It borrows the confidence and Islamic-meaning focus of [Tarjama.ai](https://tarjama.ai/about) without copying its composition.

Landing pages may be cinematic. The live display remains restrained, low-motion and legible at 1080p/1440p/4K distance. Translation is warm plaster with small language indicators, never rainbow paragraphs. Gold means action/readiness, turquoise health, red live. Ornament stays behind content. No generic emerald SaaS, neon, clip-art crescents or cheap Ramadan art. DESIGN.md is the implementation contract.

## 18. Implementation changes

- Rebuilt landing around category, product chain, display, readiness, planned intelligence, pricing, objections and pilot.
- Added account-free /demo with a scripted Arabic-to-screen experience clearly labelled non-benchmark.
- Added an original generated architectural hero under client/public.
- Reworked display for TV typography, single-colour translation, reconnection and language updates.
- Reworked admin around connection/mic/readiness and inline operator errors.
- Fixed a reliability bug where opening admin marked a session live; live now requires explicit admin:start.
- Added validated language broadcasts and disconnect/end propagation.
- Replaced pricing with Core/Pro/Network monthly/annual plans.
- Removed unsupported unlimited, “only competitor,” GDPR and UK-residency claims.
- Updated metadata, fonts, tokens, motion/accessibility and Vercel SPA setup.
- Added this decision document and DESIGN.md.

Not built: production STT/translation, Qur'an matching, auth, durable sessions, billing, provider failover, verified prayer times, durable production lead destination or hosted realtime backend. Those remain explicit release gates.

## 19. Risks

| Risk | Severity | Current reality | Mitigation |
|---|---|---|---|
| Religious mistranslation | Critical | Browser STT placeholder | Shadow benchmarks, glossary/Qur'an policy, conservative confidence, review |
| Friday outage/latency | Critical | In-memory single server | Telemetry, provider failover, retries, degraded mode, rehearsals |
| Unauthenticated control | Critical | Session IDs/socket events lack prod auth | Roles, signed pairing tokens, origin limits, rate limits |
| Privacy breach | High | No complete retention system | Minimise, encrypt, delete, DPA, subprocessors, audit |
| Placeholder prayer times | Critical if public | Static values exist | Verified source + mosque override or remove |
| Vercel/realtime mismatch | High | Vercel hosts front-end/demo, not persistent Socket.IO | Deploy regional realtime service; configure VITE_SERVER_URL |
| Lead loss | High | No durable hosted lead processor | Connect consented CRM/email before outreach |
| Planned-feature overclaim | Medium | Intelligence cards are labelled planned | Keep labels until measured |
| Committee adoption | High | Volunteer/committee cycle | Four-Friday proof and local references |
| Cheap/free competition | High | Direct, consumer and OSS exist | Sell workflow, trust, support and data |
| Seasonal churn | Medium | Weekly core can feel optional | Daily modes + annual after proof |
| Inflated TAM | Medium | Many regional counts are estimates | Build verified country lists and use conversions |

Never claim GDPR compliance, UK residency, no audio storage or encryption guarantees until architecture, contracts and tests substantiate each sentence.

## 20. Top 10 next actions by expected ARR impact

1. Schedule 10 strong-ICP UK four-Friday pilots.
2. Benchmark providers and choose primary/fallback per priority language pair.
3. Ship authenticated persistent sessions with signed display pairing.
4. Deploy a UK/EU realtime backend and instrument successful minutes/p95 latency.
5. Connect durable lead capture, notification and Stripe annual Core checkout.
6. Publish privacy/DPA/retention/subprocessor documents.
7. Ship full Readiness: mic, display, network, provider and cached standby.
8. Build glossary v1 from pilot corrections.
9. Sign two UK mosque AV/prayer-display installer pilots.
10. Add daily screen modes after Friday reliability is proven.

**Governing principle:** own the mosque relationship, Friday workflow, specialised language data, screen, support and distribution. A copied interface or cheaper API then becomes an ingredient, not a displacement strategy.
