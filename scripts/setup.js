const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Local ChatGPT with Ollama...\n');

const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  const exampleEnv = fs.readFileSync(path.join(__dirname, '..', '.env.local.example'), 'utf8');
  fs.writeFileSync(envPath, exampleEnv);
  console.log('✅ .env.local created. Please update with your database credentials.\n');
} else {
  console.log('✅ .env.local already exists.\n');
}

try {
  execSync('ollama --version', { stdio: 'ignore' });
  console.log('✅ Ollama is installed.');
} catch (error) {
  console.log('❌ Ollama is not installed. Please install from https://ollama.com/download');
  process.exit(1);
}

try {
  const models = execSync('ollama list', { encoding: 'utf8' });
  if (models.includes('gemma3:1b')) {
    console.log('✅ gemma3:1b model is available.');
  } else {
    console.log('📦 Pulling gemma3:1b model...');
    execSync('ollama pull gemma3:1b', { stdio: 'inherit' });
    console.log('✅ gemma3:1b model downloaded.');
  }
} catch (error) {
  console.log('❌ Failed to check/download Ollama model:', error.message);
  process.exit(1);
}

console.log('\n🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Update .env.local with your PostgreSQL credentials');
console.log('2. Run: npm run db:migrate');
console.log('3. Start Ollama: ollama serve');
console.log('4. Run the app: npm run dev');