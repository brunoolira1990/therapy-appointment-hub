
// Este arquivo é necessário para o IIS no Windows
// Usando sintaxe CommonJS para evitar problemas com ES modules

console.log("Starting application via IIS...");

// Verificando o ambiente
const isIIS = process.env.WEBSITE_SITE_NAME || process.env.IIS_NODE || true;
console.log("Running in IIS environment:", isIIS);

// Configuração básica para o IIS
const path = require('path');
const fs = require('fs');

// Log de diretório atual para diagnóstico
console.log("Current directory:", __dirname);
console.log("Files in current directory:", fs.readdirSync(__dirname));

// Verificar se o arquivo index.html existe
const indexPath = path.join(__dirname, 'index.html');
console.log("Index.html path:", indexPath);
console.log("Index.html exists:", fs.existsSync(indexPath));

// Exportando um objeto vazio para compatibilidade com CommonJS
exports = module.exports = {
  info: {
    name: "FisioHub Application",
    environment: process.env.NODE_ENV || "production",
    startTime: new Date().toISOString()
  }
};

// Log de inicialização
console.log("Application initialized successfully");
