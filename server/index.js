// khutba.io — backend placeholder
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('display connected:', socket.id);
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => console.log(`khutba.io server on :${PORT}`));
