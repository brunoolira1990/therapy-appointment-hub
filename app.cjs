
// Este arquivo é necessário para o IIS no Windows
// Usando sintaxe CommonJS para evitar problemas com ES modules

console.log("Starting application via IIS...");

// Configuração para servir arquivos estáticos
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Log de diretório atual para diagnóstico
console.log("Current directory:", __dirname);

// Servir arquivos estáticos da raiz do site
app.use(express.static(__dirname));

// Rota para todas as requisições - redireciona para index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar o servidor apenas se o arquivo for executado diretamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
