const fetch = globalThis.fetch || require('node-fetch');

class OllamaService {
  constructor() {
    this.host = process.env.OLLAMA_HOST || 'http://localhost:11434';
    this.model = process.env.OLLAMA_MODEL || 'gemma3:1b';
  }


  async generateResponse(prompt, options = {}) {
    const { stream = true, signal = null } = options;

    console.log(`Using Ollama model: ${this.model} at ${this.host}`);
    
    const payload = {
      model: this.model,
      prompt: prompt,
      stream: stream
    };
    
    console.log('Sending request to Ollama:', payload);
    
    const response = await fetch(`${this.host}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: signal
    });
    
    if (!response.ok) {
      console.error(`Ollama API error: ${response.status}`);
      console.error('Response:', await response.text());
      throw new Error(`Ollama API error: ${response.status}`);
    }
    
    return response;
  }


  formatChatPrompt(messages, currentMessage) {
    let prompt = '';
    
    if (messages.length > 0) {
      messages.slice(-10).forEach(msg => {
        if (msg.role === 'user') {
          prompt += `User: ${msg.content}\n`;
        } else if (msg.role === 'assistant') {
          prompt += `Assistant: ${msg.content}\n`;
        }
      });
      prompt += `User: ${currentMessage}\nAssistant:`;
    } else {
      prompt = currentMessage;
    }
    
    return prompt;
  }


  async checkAvailability() {
    try {
      const response = await fetch(`${this.host}/api/version`);
      if (response.ok) {
        const data = await response.json();
        console.log('Ollama version:', data.version);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Ollama not available:', error.message);
      return false;
    }
  }

  async listModels() {
    try {
      const response = await fetch(`${this.host}/api/tags`);
      if (response.ok) {
        const data = await response.json();
        return data.models || [];
      }
      return [];
    } catch (error) {
      console.error('Failed to list models:', error.message);
      return [];
    }
  }
}

module.exports = new OllamaService();