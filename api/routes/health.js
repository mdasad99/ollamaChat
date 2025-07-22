const ollamaService = require('../services/ollama');

async function healthRouter(req, res, path) {
  const method = req.method;

  try {
    if (path === '/api/health' && method === 'GET') {
      res.json(200, { status: 'ok', timestamp: new Date().toISOString() });
    }
    else if (path === '/api/health/ollama' && method === 'GET') {
      const isAvailable = await ollamaService.checkAvailability();
      
      if (isAvailable) {
        const models = await ollamaService.listModels();
        res.json(200, { 
          status: 'ok', 
          ollama: {
            available: true,
            host: ollamaService.host,
            currentModel: ollamaService.model,
            models: models
          }
        });
      } else {
        res.json(503, { 
          status: 'error', 
          ollama: {
            available: false,
            host: ollamaService.host,
            error: 'Ollama service is not available'
          }
        });
      }
    }
    else {
      res.json(404, { error: 'Health endpoint not found' });
    }
  } catch (error) {
    console.error('Health route error:', error);
    res.json(500, { error: 'Internal server error' });
  }
}

module.exports = healthRouter;