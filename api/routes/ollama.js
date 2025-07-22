/**
 * Ollama-specific routes
 */
const ollamaService = require('../services/ollama');

async function ollamaRouter(req, res, path) {
  const method = req.method;

  try {
    if (path === '/api/ollama/health' && method === 'GET') {
      const isAvailable = await ollamaService.checkAvailability();
      
      if (isAvailable) {
        res.json(200, { 
          status: 'ok', 
          host: ollamaService.host,
          currentModel: ollamaService.model
        });
      } else {
        res.json(503, { 
          status: 'error', 
          host: ollamaService.host,
          message: 'Ollama service is not available'
        });
      }
    }
    
    else if (path === '/api/ollama/models' && method === 'GET') {
      const models = await ollamaService.listModels();
      res.json(200, { models });
    }
    
    else if (path === '/api/ollama/generate' && method === 'POST') {
      const { prompt, stream = false } = req.body;
      
      if (!prompt) {
        res.json(400, { error: 'Prompt is required' });
        return;
      }
      
      if (stream) {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Cache-Control'
        });
        
        const ollamaResponse = await ollamaService.generateResponse(prompt, { stream: true, signal: req.signal });
        const reader = ollamaResponse.body?.getReader();
        
        if (reader) {
          let fullResponse = '';
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n').filter(line => line.trim());
            
            for (const line of lines) {
              try {
                const data = JSON.parse(line);
                if (data.response) {
                  fullResponse += data.response;
                  res.write(`data: ${JSON.stringify({ token: data.response })}\n\n`);
                }
                if (data.done) {
                  res.write(`data: ${JSON.stringify({ done: true, fullResponse })}\n\n`);
                  res.end();
                  return;
                }
              } catch (e) {
                console.error('JSON parse error:', e);
              }
            }
          }
        }
      } else {
        const ollamaResponse = await ollamaService.generateResponse(prompt, { stream: false });
        const data = await ollamaResponse.json();
        res.json(200, data);
      }
    }
    
    else {
      res.json(404, { error: 'Ollama endpoint not found' });
    }
    
  } catch (error) {
    console.error('Ollama route error:', error);
    res.json(500, { error: 'Internal server error' });
  }
}

module.exports = ollamaRouter;