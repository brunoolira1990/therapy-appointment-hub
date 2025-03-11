
// Este arquivo é necessário para o IIS no Windows
// Usando sintaxe CommonJS para evitar problemas com ES modules

console.log("Starting application...");

// Verificando o ambiente
const isIIS = process.env.WEBSITE_SITE_NAME || process.env.IIS_NODE || false;
console.log("Running in IIS environment:", isIIS);

// Exportando um objeto vazio para compatibilidade com CommonJS
exports = module.exports = {
  info: {
    name: "FisioHub Application",
    environment: process.env.NODE_ENV || "production"
  }
};

// Log de inicialização
console.log("Application initialized successfully");
