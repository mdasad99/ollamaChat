const http = require('http');
const url = require('url');
const chatRouter = require('./routes/chat');
const healthRouter = require('./routes/health');
const ollamaRouter = require('./routes/ollama');

const PORT = process.env.PORT || 3001;

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
} 

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  if (method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  req.body = method !== 'GET' ? await parseBody(req).catch(() => ({})) : {};
  req.query = parsedUrl.query;
  req.params = {};

  res.json = (statusCode, data) => sendJSON(res, statusCode, data);

  try {
    if (path.startsWith('/api/health')) {
      await healthRouter(req, res, path);
    } else if (path.startsWith('/api/chat')) {
      await chatRouter(req, res, path);
    } else if (path.startsWith('/api/ollama')) {
      await ollamaRouter(req, res, path);
    } else {
      res.json(404, { error: 'Route not found' });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.json(500, { error: 'Internal server error' });
  }
});

server.listen(PORT, () => {
  console.log(` Node.js API server running on http://localhost:${PORT}`);
  console.log(' Available endpoints:');
  console.log('  GET  /api/health');
  console.log('  GET  /api/chats');
  console.log('  POST /api/chat');
  console.log('  GET  /api/chat/:id');
  console.log('  POST /api/chat/:id/message');
  console.log('  POST /api/chat/:id/stop');
  console.log('  GET  /api/ollama/health');
  console.log('  GET  /api/ollama/models');
  console.log('  POST /api/ollama/generate');
  console.log('');
  console.log('Make sure Ollama is running with: ollama serve');
  console.log(`And ${process.env.OLLAMA_MODEL || 'gemma3:1b'} model is available: ollama pull ${process.env.OLLAMA_MODEL || 'gemma3:1b'}`);
});

module.exports = server;