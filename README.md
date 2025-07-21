Here’s the updated README with **Node.js** and **PostgreSQL** included, assuming you're using Node for backend integration and PostgreSQL for storing chat history or sessions:

---

# Local ChatGPT with Ollama

A ChatGPT-style interface built with **Next.js**, **Node.js**, **PostgreSQL**, and **Ollama** for local AI chat. No external APIs required — everything runs locally.

## Features

* Chat interface similar to ChatGPT
* Real-time streaming responses
* Multiple chat sessions with history stored in PostgreSQL
* Local Ollama model integration (e.g., `gemma3:1b`)
* Responsive UI
* Fully local, no OpenAI API needed

## Prerequisites

1. **Install Node.js**
   Download from [https://nodejs.org](https://nodejs.org)

2. **Install PostgreSQL**
   Download from [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

3. **Install Ollama**
   Download from [https://ollama.ai](https://ollama.ai)

4. **Pull an Ollama model**
   Run in terminal:

   ```bash
   ollama pull gemma3:1b
   ```

## Setup

1. **Clone the repo & install dependencies**

   ```bash
   git clone <your-repo-url>
   cd your-project
   npm install
   ```

2. **Configure environment variables**
   Create a `.env` file and add your PostgreSQL connection string:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/your_db_name
   ```

3. **Start PostgreSQL** (make sure the DB is running and accessible)

4. **Run migrations or initialize the DB** (if using Prisma or another ORM)

   ```bash
   npx prisma migrate dev
   ```

5. **Start Ollama**

   ```bash
   ollama serve
   ```

6. **Check if model is available**

   ```bash
   ollama list
   ```

7. **Start the development server**

   ```bash
   npm run dev
   ```

8. **Visit** [http://localhost:3000](http://localhost:3000)

## Usage

* Click **"New Chat"** to start a new session
* Messages are saved to PostgreSQL
* Real-time AI replies powered by Ollama
* Sessions are listed in the sidebar

## Troubleshooting

* **"Failed to get response"**
  Make sure Ollama is running:

  ```bash
  ollama serve
  ```

* **"Model not found"**
  Pull it manually:

  ```bash
  ollama pull gemma3:1b
  ```

* **"Connection refused"**
  Confirm Ollama is running on port `11434`

* **PostgreSQL errors**
  Ensure the DB is running and your `.env` is correct

## Customization

To use a different AI model, edit `app/api/chat/route.ts` and change the `model` value (e.g., `llama2`, `mistral`, etc.).

## Tech Stack

* **Node.js** – Server runtime
* **Next.js 14** – Full-stack framework (App Router)
* **PostgreSQL** – Database for chat/session storage
* **TypeScript** – Type safety
* **Tailwind CSS** – Styling
* **Ollama API** – Local AI model runtime

---

Let me know if you're using any ORM (like Prisma or TypeORM), so I can include that setup too.
