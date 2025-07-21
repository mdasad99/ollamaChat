## Local ChatGPT with Ollama

## Features

ChatGPT-style interface with sidebar chat history
Real-time chat with Ollama models
Multiple chat sessions
Responsive design
No external API keys required

## Prerequisites

1. **Install Ollama**: Download from [ollama.ai](https://ollama.ai)
2. **Pull the model**: Run ollama pull gemma3:1b in your terminal

## Setup

1. Install dependencies:
bash
npm install

2. Start Ollama (if not already running):
bash
ollama serve

3. Make sure the model is available:
bash
ollama list

4. Start the development server:
bash
npm run dev

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Click "New Chat" to start a conversation
2. Type your message and press Enter or click Send
3. The AI will respond using the Ollama gemma3:1b model
4. Chat history is maintained in the sidebar
5. You can switch between different chat sessions

## Troubleshooting

**"Failed to get response"**: Make sure Ollama is running (ollama serve)
**Model not found**: Install the model with ollama pull gemma3:1b
**Connection refused**: Check if Ollama is running on port 11434

## Customization

To use a different model, edit app/api/chat/route.ts and change the model field to your preferred Ollama model.

## Tech Stack

Next.js 14 (App Router)
TypeScript
Tailwind CSS
Ollama API