const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Mdasad',
  database: 'chatgpt_local',
  ssl: false,
});

module.exports = pool;