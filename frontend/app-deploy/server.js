const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const DIST_DIR = path.join(__dirname, 'dist');

console.log('Starting server...');
console.log('Port:', PORT);
console.log('Serving from:', DIST_DIR);
console.log('Dist exists:', fs.existsSync(DIST_DIR));

const server = http.createServer((req, res) => {
  // Parse URL and get file path
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

  // Security check
  const relativePath = path.relative(DIST_DIR, filePath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Try to serve the file
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      // File exists
      const ext = path.extname(filePath).toLowerCase();
      const contentTypes = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2'
      };

      res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
      
      if (ext !== '.html') {
        res.setHeader('Cache-Control', 'public, max-age=31536000');
      }

      fs.createReadStream(filePath).pipe(res);
    } else {
      // File not found, serve index.html for SPA
      const indexPath = path.join(DIST_DIR, 'index.html');
      fs.stat(indexPath, (err2, stats2) => {
        if (!err2 && stats2.isFile()) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          fs.createReadStream(indexPath).pipe(res);
        } else {
          res.writeHead(404);
          res.end('Not Found');
        }
      });
    }
  });
});

server.listen(PORT, () => {
  console.log('Server running on port', PORT);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
