# khutba.io

Live auto-translation and auto-scrolling display system for masjids.

Converts spoken khutbas and speeches into real-time multilingual subtitles displayed on screens inside the masjid.

## What it does

- Captures live mic audio from the speaker
- Transcribes speech in real-time (Deepgram)
- Translates into multiple languages simultaneously (Google Translate)
- Displays large auto-scrolling text on any screen in the masjid
- Congregation can also follow along on their own device

## Languages

Arabic, English, Urdu, Somali, Bengali (more coming)

## Stack

- Frontend: React + Vite + TailwindCSS
- Backend: Node/Express
- Speech-to-text: Deepgram
- Translation: Google Translate API
- Realtime: Socket.io
- DB: Supabase
- Billing: Stripe

## Status

Early development. Target launch: Birmingham, UK masjids.
