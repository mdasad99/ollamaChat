require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ollama_chat',
  password: process.env.DB_PASSWORD || 'Mdasad',
  port: process.env.DB_PORT || 5432,
});

async function checkAndCreateTables() {
  try {
    console.log('Checking database tables...');
    
    const conversationsCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'conversations'
      );
    `);
    
    if (!conversationsCheck.rows[0].exists) {
      console.log('Creating conversations table...');
      await pool.query(`
        CREATE TABLE conversations (
          id UUID PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Conversations table created successfully.');
    } else {
      console.log('Conversations table already exists.');
    }
    
    const messagesCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'messages'
      );
    `);
    
    if (!messagesCheck.rows[0].exists) {
      console.log('Creating messages table...');
      await pool.query(`
        CREATE TABLE messages (
          id UUID PRIMARY KEY,
          conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
          content TEXT NOT NULL,
          role VARCHAR(50) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT valid_role CHECK (role IN ('user', 'assistant'))
        );
      `);
      console.log('Messages table created successfully.');
    } else {
      console.log('Messages table already exists.');
    }
    
    console.log('Database setup complete!');
  } catch (error) {
    console.error('Database setup error:', error);
  } finally {
    await pool.end();
  }
}

checkAndCreateTables();