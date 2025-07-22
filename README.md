# Ollama Chat Application

ChatGPT-style chat application powered by Ollama.


## Requirements

- [Node.js](https://nodejs.org/) (v14 or newer)
- [Ollama](https://ollama.ai/) installed and running on your computer
- [PostgreSQL](https://www.postgresql.org/) database

## Quick Start

### 1. Clone this repository

```bash
git clone [your-repository-url]
cd [repository-name]
```

### 2. Set up the database

Make sure PostgreSQL is running, then:

```bash
cd api
npm run setup-db
```

### 3. Start the API server

```bash
cd api
npm install
npm start
```

The API will run on http://localhost:3001 by default.

### 4. Start the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The web interface will be available at http://localhost:3000.

## Features

- Chat with any model available in your Ollama installation
- Save and continue conversations
- Simple, clean interface similar to ChatGPT
- Fully local - your data stays on your computer

## Project Structure

- `/api` - Node.js backend server that communicates with Ollama
- `/frontend` - Next.js web application

## Configuration

The API server uses environment variables for configuration. Create a `.env` file in the `/api` directory with:

```
PORT=3001
DATABASE_URL=postgresql://username:password@localhost:5432/ollama_chat
OLLAMA_HOST=http://localhost:11434
```

## License

MIT