require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const setupPool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'postgres',
  password: process.env.DB_PASSWORD || 'Mdasad',
  port: process.env.DB_PORT || 5432,
});

async function setupDatabase() {
  const dbName = process.env.DB_NAME || 'ollama_chat';
  
  try {
    console.log(' Setting up database...');
    
    const dbCheck = await setupPool.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbName]
    );
    
    if (dbCheck.rows.length === 0) {
      console.log(` Creating database: ${dbName}`);
      await setupPool.query(`CREATE DATABASE ${dbName}`);
    } else {
      console.log(` Database ${dbName} already exists`);
    }
    
    await setupPool.end();
    
    const targetPool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: dbName,
      password: process.env.DB_PASSWORD || 'Mdasad',
      port: process.env.DB_PORT || 5432,
    });
    
    const schemaPath = path.join(__dirname, '../lib/init-db.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Creating tables and indexes...');
    await targetPool.query(schema);
    
    console.log(' Database setup completed successfully!');
    console.log(` Database: ${dbName}`);
    console.log(' Tables created: conversations, messages');
    
    await targetPool.end();
    
  } catch (error) {
    console.error(' Database setup failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;