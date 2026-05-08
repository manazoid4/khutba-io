# khutba.io

**Live khutbah translation on your masjid screen.**

Screen-first. Unlimited minutes. Built in Birmingham, UK.

## What It Does

Captures live mic audio → real-time speech-to-text → translates into multiple languages → displays large auto-scrolling text on any screen in the masjid.

## Why It Exists

- Non-Arabic speakers miss the meaning of khutbah every week
- No dedicated affordable product exists for UK masjids
- Volunteer translators are unreliable and exhausting
- Every competitor is phone-first — we're screen-first

## Competitive Edge

| | khutba.io | MinbarLive |
|---|---|---|
| Display | Screen-first | Phone-only (QR) |
| Minutes | Unlimited | Capped (100-800) |
| Price | £29/mo entry | €59/mo entry |
| Focus | 5 UK languages, done right | 135+ (quality varies) |
| Origin | Birmingham, UK | Bosnia |

## Stack

- Frontend: React + Vite + TailwindCSS
- Backend: Node/Express + Socket.io
- Speech-to-text: Deepgram (browser STT for v1)
- Translation: Google Translate API
- DB: Supabase
- Billing: Stripe

## Languages

Arabic · English · Urdu · Somali · Bengali

## Quick Start

```bash
# Install dependencies
npm install

# Copy env vars
cp .env.example .env

# Start server + client
npm run start
```

Server runs on `:3001`, client on `:5173`.

## Project Structure

```
khutba-io/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx    # Marketing site
│   │   │   ├── PricingPage.jsx    # Pricing + comparison
│   │   │   ├── DisplayPage.jsx    # Screen display (core product)
│   │   │   └── AdminPage.jsx      # Admin control panel
│   │   ├── components/
│   │   │   └── RamadanCountdown.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── index.html
├── server/
│   └── index.js                   # Socket.io + API routes
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Status

🟡 Early development — Birmingham UK launch target

## Ramadan 2027

Launch target: January 2027 (2 months before Ramadan, estimated March 1, 2027).
