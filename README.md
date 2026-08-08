# khutba.io

**The live language layer for the masjid.**

[View the live Vercel site](https://khutba-io.vercel.app) · [Try the account-free demo](https://khutba-io.vercel.app/demo) · [Read the product and commercial decision](docs/KHUTBA-IO-DECISION-DOCUMENT.md)

Khutba.io is a screen-first Live Khutbah Platform designed around the Friday workflow: pair the screen a mosque already owns, verify readiness, start explicitly, and present calm multilingual captions at worship-hall distance.

## Current status

This repository is an early product prototype and marketing/demo deployment.

Working today:

- React/Vite marketing site, pricing and scripted demo
- paired admin and masjid display over Socket.IO
- explicit broadcast start/stop and display reconnect states
- browser speech-recognition development path
- Friday Readiness interface and multilingual display test

Not production-ready yet:

- production speech-to-text and translation providers
- Qur'an/Hadith detection or mosque terminology intelligence
- authentication, durable sessions and billing
- provider failover and a hosted persistent realtime backend
- verified prayer-time data and durable production lead capture

The Vercel deployment hosts the front-end and account-free demo. Persistent live admin/display sessions require the Node/Socket.IO server to be deployed separately and supplied through VITE_SERVER_URL.

## Product direction

- Category now: **Live Khutbah Platform**
- Category ambition: **Mosque Communication OS**
- Initial ICP: medium-to-large multilingual UK mosques with an existing mixer and screen
- Commercial entry: four-Friday pilot, then Core at £79/month or £790/year

The evidence, competitor matrix, unit economics, moat stack and staged roadmap are in [the decision document](docs/KHUTBA-IO-DECISION-DOCUMENT.md). The visual implementation contract is in [DESIGN.md](DESIGN.md).

## Local development

~~~bash
npm install
npm run start
~~~

The client runs on http://localhost:5173 and the Express/Socket.IO server on http://localhost:3001.

Useful commands:

~~~bash
npm run dev       # Vite client only
npm run server    # Realtime/API server only
npm run start     # Both processes
npm run build     # Production front-end build
~~~

## Routes

| Route | Purpose |
|---|---|
| / | Marketing and four-Friday pilot proposition |
| /demo | Account-free scripted screen demonstration |
| /pricing | Monthly/annual Core, Pro and Network packages |
| /admin/:sessionId | Volunteer control room |
| /display/:sessionId | Full-screen masjid display |
| /settings/:sessionId | Session settings |

## Stack

- React 18, React Router, Vite and Tailwind CSS
- Node.js, Express and Socket.IO
- In-memory development state
- Vercel for the current front-end/demo deployment

## Repository map

~~~text
client/
  public/                         Original architectural hero art
  src/
    components/DemoRequestForm.jsx
    pages/
      LandingPage.jsx
      DemoPage.jsx
      PricingPage.jsx
      DisplayPage.jsx
      AdminPage.jsx
      SettingsPage.jsx
server/index.js                   Development API and realtime server
docs/KHUTBA-IO-DECISION-DOCUMENT.md
DESIGN.md
vercel.json
~~~

## Safety and claims

Do not describe the current prototype as GDPR compliant, UK-resident, religiously verified or unlimited. Do not use placeholder prayer times in a live mosque. Production deployment requires documented retention, consent, subprocessors, security controls and measured language/verse accuracy.
