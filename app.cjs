
// Este arquivo é necessário para o IIS no Windows
// Usando sintaxe CommonJS para evitar problemas com ES modules

console.log("Iniciando aplicação via IIS...");
console.log("Versão do Node:", process.version);

// Verificação de disponibilidade do Express
try {
  const express = require('express');
  const path = require('path');
  const fs = require('fs');

  const app = express();
  const PORT = process.env.PORT || 8080;

  // Log de diretório atual para diagnóstico
  console.log("Diretório atual:", __dirname);
  console.log("Arquivos disponíveis:", fs.readdirSync(__dirname));

  // Middleware para registrar todas as requisições
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Servir arquivos estáticos da raiz do site
  app.use(express.static(__dirname));

  // Tratamento de erros para arquivos estáticos
  app.use((err, req, res, next) => {
    console.error('Erro ao servir arquivo estático:', err);
    next(err);
  });

  // Rota para todas as requisições - redireciona para index.html (SPA)
  app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error('Arquivo index.html não encontrado');
      res.status(500).send('Erro: Arquivo index.html não encontrado');
    }
  });

  // Iniciar o servidor apenas se o arquivo for executado diretamente
  if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  }

  module.exports = app;
} catch (error) {
  console.error('Erro ao inicializar o servidor Express:', error);
  // Fallback para quando o Express não está disponível
  const http = require('http');
  const fs = require('fs');
  const path = require('path');
  
  http.createServer((req, res) => {
    console.log(`Fallback server: ${req.method} ${req.url}`);
    
    try {
      // Servir index.html como fallback
      const indexPath = path.join(__dirname, 'index.html');
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      } else {
        res.writeHead(500);
        res.end('Não foi possível carregar a aplicação. Express não disponível e index.html não encontrado.');
      }
    } catch (err) {
      console.error('Erro no servidor fallback:', err);
      res.writeHead(500);
      res.end('Erro interno do servidor');
    }
  }).listen(8080);
}
