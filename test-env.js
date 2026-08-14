require('dotenv').config({ path: '.env.local' });

console.log("-----------------------------------------");
console.log("Lendo DIRECT_URL:", process.env.DIRECT_URL ? "✅ ENCONTRADA" : "❌ INDEFINIDA");
console.log("Conteúdo da DIRECT_URL:", process.env.DIRECT_URL);
console.log("-----------------------------------------");