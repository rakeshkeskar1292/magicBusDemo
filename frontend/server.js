const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const DIST_DIR = path.join(__dirname, 'dist');

// Health check endpoint - Azure App Service requires this
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve static assets
app.use(express.static(DIST_DIR, {
  maxAge: '1d',
  etag: false
}));

// SPA route - serve index.html for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
