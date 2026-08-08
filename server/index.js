const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// --- State ---
const sessions = new Map(); // sessionId -> { active, languages, transcript }
const displays = new Map(); // sessionId -> Set of display socket ids
const admins = new Map();   // sessionId -> admin socket id
const demoRequests = new Map(); // requestId -> structured launch lead
const dataDir = path.join(__dirname, '..', 'data');
const demoRequestFile = path.join(dataDir, 'demo-requests.jsonl');

// --- Supported languages (UK-focused) ---
const SUPPORTED_LANGUAGES = [
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ur', name: 'اردو', dir: 'rtl' },
  { code: 'so', name: 'Af-Soomaali', dir: 'ltr' },
  { code: 'bn', name: 'বাংলা', dir: 'ltr' },
];

// --- UK Mosque prayer times (simplified — would use Aladhan API in production) ---
const UK_CITIES = {
  birmingham: { lat: 52.4862, lng: -1.8904 },
  london: { lat: 51.5074, lng: -0.1278 },
  manchester: { lat: 53.4808, lng: -2.2426 },
  leeds: { lat: 53.8008, lng: -1.5491 },
  bradford: { lat: 53.7960, lng: -1.7594 },
};

// --- Ramadan 2027 countdown (March 1, 2027 estimated) ---
const RAMADAN_2027 = new Date('2027-03-01T00:00:00Z');

function getRamadanCountdown() {
  const now = new Date();
  const diff = RAMADAN_2027 - now;
  if (diff <= 0) return { days: 0, message: 'Ramadan Mubarak!' };
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return { days, message: `${days} days until Ramadan` };
}

function cleanText(value, maxLength = 240) {
  return String(value || '').trim().slice(0, maxLength);
}

async function persistDemoRequest(request) {
  await fs.promises.mkdir(dataDir, { recursive: true });
  await fs.promises.appendFile(demoRequestFile, `${JSON.stringify(request)}\n`, 'utf8');
}

function requireAdminToken(req, res, next) {
  const configuredToken = process.env.ADMIN_TOKEN;
  if (!configuredToken) {
    return res.status(403).json({ error: 'ADMIN_TOKEN is required to view demo requests' });
  }

  const header = req.get('authorization') || '';
  const providedToken = header.startsWith('Bearer ') ? header.slice(7) : req.query.token;
  if (providedToken !== configuredToken) {
    return res.status(401).json({ error: 'Invalid admin token' });
  }

  return next();
}

// --- Routes ---

// Create a new khutbah session
app.post('/api/sessions', (req, res) => {
  const { masjidName, languages, city } = req.body;
  const sessionId = crypto.randomUUID().slice(0, 8);
  
  sessions.set(sessionId, {
    id: sessionId,
    masjidName: masjidName || 'Masjid',
    languages: languages || ['en', 'ur', 'ar'],
    transcript: [],
    active: false,
    startedAt: null,
    city: city || 'birmingham',
  });
  
  displays.set(sessionId, new Set());
  
  res.json({
    sessionId,
    displayUrl: `/display/${sessionId}`,
    adminUrl: `/admin/${sessionId}`,
    shareUrl: `${process.env.BASE_URL || 'https://khutba.io'}/display/${sessionId}`,
  });
});

// Get session status
app.get('/api/sessions/:id', (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json(session);
});

// Get UK prayer times for a city
app.get('/api/prayer-times/:city', (req, res) => {
  const city = UK_CITIES[req.params.city.toLowerCase()];
  if (!city) return res.status(404).json({ error: 'City not supported' });
  
  // In production: fetch from Aladhan API
  // For now: return placeholder times
  res.json({
    city: req.params.city,
    date: new Date().toISOString().split('T')[0],
    fajr: '04:32',
    sunrise: '05:48',
    dhuhr: '12:58',
    asr: '16:42',
    maghrib: '20:08',
    isha: '21:24',
    jumuah: '13:00',
  });
});

// Ramadan countdown
app.get('/api/ramadan', (req, res) => {
  res.json(getRamadanCountdown());
});

// WhatsApp share link generator
app.get('/api/share/whatsapp', (req, res) => {
  const { masjidName, displayUrl } = req.query;
  const message = encodeURIComponent(
    `Assalamu Alaikum! ${masjidName || 'Our masjid'} is now using khutba.io for live khutbah translations on screen.\n\n` +
    `Watch live: ${displayUrl}\n\n` +
    `Screen-first. Built around the Friday workflow.\n` +
    `Learn more: https://khutba.io`
  );
  res.json({ whatsappUrl: `https://wa.me/?text=${message}` });
});

// Capture launch demo requests from masjid committees.
app.post('/api/demo-requests', async (req, res) => {
  const masjidName = cleanText(req.body.masjidName, 120);
  const contactName = cleanText(req.body.contactName, 120);
  const whatsapp = cleanText(req.body.whatsapp, 40);
  const city = cleanText(req.body.city || 'Birmingham', 80);
  const notes = cleanText(req.body.notes, 500);
  const languages = Array.isArray(req.body.languages)
    ? req.body.languages.map(language => cleanText(language, 40)).filter(Boolean).slice(0, 6)
    : [];

  if (!masjidName || !contactName || !whatsapp) {
    return res.status(400).json({ error: 'Masjid name, contact name, and WhatsApp number are required' });
  }

  const request = {
    id: crypto.randomUUID(),
    status: 'new',
    source: 'khutba.io demo form',
    sourceConfidence: 'direct inbound',
    masjidName,
    contactName,
    whatsapp,
    city,
    languages,
    notes,
    launchOffer: 'Four-Friday pilot before Core subscription',
    createdAt: new Date().toISOString(),
  };

  demoRequests.set(request.id, request);

  try {
    await persistDemoRequest(request);
  } catch (error) {
    console.error('demo request persistence failed:', error);
    return res.status(500).json({ error: 'Could not save demo request' });
  }

  return res.status(201).json({ id: request.id, status: request.status });
});

app.get('/api/demo-requests', requireAdminToken, (req, res) => {
  res.json({
    count: demoRequests.size,
    requests: [...demoRequests.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  });
});

// --- Socket.io ---

io.on('connection', (socket) => {
  console.log('connected:', socket.id);

  // Admin joins a session (controls the mic/stream)
  socket.on('admin:join', ({ sessionId }) => {
    const session = sessions.get(sessionId);
    if (!session) return socket.emit('error', { message: 'Session not found' });
    
    admins.set(sessionId, socket.id);
    socket.join(`admin:${sessionId}`);
    socket.emit('admin:joined', { session });
  });

  // Going live is explicit. Opening the control room must never start a broadcast.
  socket.on('admin:start', ({ sessionId }) => {
    const session = sessions.get(sessionId);
    if (!session || admins.get(sessionId) !== socket.id) return;
    session.active = true;
    session.startedAt = new Date().toISOString();
    io.to(`display:${sessionId}`).emit('session:started', { session });
  });

  socket.on('admin:languages', ({ sessionId, languages }) => {
    const session = sessions.get(sessionId);
    if (!session || admins.get(sessionId) !== socket.id || !Array.isArray(languages)) return;
    const allowed = new Set(SUPPORTED_LANGUAGES.map(language => language.code));
    session.languages = [...new Set(languages.filter(language => allowed.has(language)))];
    io.to(`display:${sessionId}`).emit('display:languages', {
      languages: SUPPORTED_LANGUAGES.filter(language => session.languages.includes(language.code)),
    });
  });

  // Admin sends transcribed text (from Deepgram)
  socket.on('admin:transcript', ({ sessionId, text, language, isFinal }) => {
    const session = sessions.get(sessionId);
    if (!session || !session.active) return;

    const entry = {
      id: crypto.randomUUID(),
      text,
      language,
      timestamp: new Date().toISOString(),
      isFinal,
    };

    session.transcript.push(entry);
    
    // Keep transcript manageable (last 500 entries)
    if (session.transcript.length > 500) {
      session.transcript = session.transcript.slice(-400);
    }

    // Broadcast to all displays
    io.to(`display:${sessionId}`).emit('display:text', entry);
  });

  // Admin ends session
  socket.on('admin:end', ({ sessionId }) => {
    const session = sessions.get(sessionId);
    if (session) {
      session.active = false;
      io.to(`display:${sessionId}`).emit('session:ended');
    }
    admins.delete(sessionId);
  });

  // Display joins a session (screen view)
  socket.on('display:join', ({ sessionId }) => {
    const session = sessions.get(sessionId);
    if (!session) return socket.emit('error', { message: 'Session not found' });

    const displaySet = displays.get(sessionId);
    if (displaySet) displaySet.add(socket.id);

    socket.join(`display:${sessionId}`);
    socket.emit('display:joined', {
      session: { ...session, transcript: session.transcript.slice(-50) },
      languages: SUPPORTED_LANGUAGES.filter(l => session.languages.includes(l.code)),
    });
  });

  // Display leaves
  socket.on('disconnect', () => {
    for (const [sessionId, displaySet] of displays.entries()) {
      displaySet.delete(socket.id);
    }
    for (const [sessionId, adminId] of admins.entries()) {
      if (adminId === socket.id) {
        const session = sessions.get(sessionId);
        if (session) {
          session.active = false;
          io.to(`display:${sessionId}`).emit('session:ended');
        }
        admins.delete(sessionId);
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => console.log(`khutba.io server running on :${PORT}`));
