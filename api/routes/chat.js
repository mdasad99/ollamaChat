const { v4: uuidv4 } = require('uuid');
const pool = require('../lib/db');
const ollamaService = require('../services/ollama');

async function chatRouter(req, res, path) {
  const method = req.method;
  const pathParts = path.split('/');
  const chatId = pathParts[3];
  const action = pathParts[4];

  try {
    if (path === '/api/chats' && method === 'GET') {
      const result = await pool.query(
        'SELECT * FROM conversations ORDER BY created_at DESC'
      );
      res.json(200, result.rows);
    }
    
    else if (path === '/api/chat' && method === 'POST') {
      const { title } = req.body;
      const chatTitle = title || 'New Chat';
      
      const result = await pool.query(
        'INSERT INTO conversations (id, title) VALUES ($1, $2) RETURNING *',
        [uuidv4(), chatTitle]
      );
      res.json(201, result.rows[0]);
    }
    
    else if (chatId && !action && method === 'GET') {
      const chatResult = await pool.query(
        'SELECT * FROM conversations WHERE id = $1',
        [chatId]
      );
      
      if (chatResult.rows.length === 0) {
        res.json(404, { error: 'Chat not found' });
        return;
      }
      
      const messagesResult = await pool.query(
        'SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC',
        [chatId]
      );
      
      res.json(200, {
        ...chatResult.rows[0],
        messages: messagesResult.rows
      });
    }
    
    else if (chatId && action === 'message' && method === 'POST') {
      await handleChatMessage(req, res, chatId);
    }
    
    else if (chatId && action === 'stop' && method === 'POST') {
      res.json(200, { message: 'Generation stopped' });
    }
    
    else {
      res.json(404, { error: 'Chat endpoint not found' });
    }
    
  } catch (error) {
    console.error('Chat route error:', error);
    res.json(500, { error: 'Internal server error' });
  }
}

async function handleChatMessage(req, res, chatId) {
  const { content } = req.body;
  
  if (!content) {
    res.json(400, { error: 'Message content is required' });
    return;
  }
  
  const chatCheck = await pool.query(
    'SELECT id FROM conversations WHERE id = $1',
    [chatId]
  );
  
  if (chatCheck.rows.length === 0) {
    res.json(404, { error: 'Chat not found' });
    return;
  }
  
  await pool.query(
    'INSERT INTO messages (id, conversation_id, content, role) VALUES ($1, $2, $3, $4)',
    [uuidv4(), chatId, content, 'user']
  );
  
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  });
  
  try {
    const historyResult = await pool.query(
      'SELECT content, role FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC',
      [chatId]
    );
    
    const messages = historyResult.rows.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    const isOllamaRunning = await ollamaService.checkAvailability();
    if (!isOllamaRunning) {
      throw new Error('Ollama service is not running');
    }
    
    const prompt = ollamaService.formatChatPrompt(messages, content);
    console.log('Formatted prompt for Ollama:', prompt);
    
    const ollamaResponse = await ollamaService.generateResponse(prompt, { stream: true, signal: req.signal });
    console.log('Ollama response status:', ollamaResponse.status);
    
    let assistantResponse = '';
    const reader = ollamaResponse.body?.getReader();
    
    if (reader) {
      console.log('Starting to read Ollama response stream');
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('Stream complete');
          break;
        }
        
        const chunk = new TextDecoder().decode(value);
        console.log('Received chunk:', chunk);
        
        const lines = chunk.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            console.log('Parsed data:', data);
            
            if (data.response) {
              assistantResponse += data.response;
              const tokenData = JSON.stringify({ token: data.response });
              console.log('Sending token to frontend:', tokenData);
              res.write(`data: ${tokenData}\n\n`);
            }
            if (data.done) {
              console.log('Ollama indicates completion');
              res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
              
              console.log('Saving assistant response to database:', assistantResponse);
              await pool.query(
                'INSERT INTO messages (id, conversation_id, content, role) VALUES ($1, $2, $3, $4)',
                [uuidv4(), chatId, assistantResponse, 'assistant']
              );
              
              const messageCount = await pool.query(
                'SELECT COUNT(*) FROM messages WHERE conversation_id = $1',
                [chatId]
              );
              
              if (parseInt(messageCount.rows[0].count) === 2) {
                const title = generateChatTitle(content);
                console.log('Updating chat title to:', title);
                await pool.query(
                  'UPDATE conversations SET title = $1, updated_at = NOW() WHERE id = $2',
                  [title, chatId]
                );
              }
              
              res.end();
              return;
            }
          } catch (e) {
            console.error('JSON parse error:', e, 'on line:', line);
          }
        }
      }
    } else {
      console.error('No reader available for Ollama response');
    }
    
  } catch (error) {
    console.error('Ollama API error:', error);
    res.write(`data: ${JSON.stringify({ error: 'Failed to get AI response' })}\n\n`);
    res.end();
  }
}

function generateChatTitle(firstMessage) {
  const words = firstMessage.split(' ').slice(0, 4);
  let title = words.join(' ');
  if (title.length > 30) {
    title = title.substring(0, 27) + '...';
  }
  return title || 'New Chat';
}

module.exports = chatRouter;