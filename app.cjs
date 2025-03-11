
// Servidor Express para hospedar a aplicação React no Heroku
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Log de inicialização
console.log(`Iniciando servidor na porta ${PORT}`);
console.log("Versão do Node:", process.version);

// Middleware para registrar requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Verificar se a pasta dist existe
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  console.log("Pasta dist encontrada");
  
  // Servir arquivos estáticos da pasta dist
  app.use(express.static(distPath));
  
  // Rota para todas as requisições - redireciona para index.html (SPA)
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.error("ERRO: Pasta dist não encontrada!");
  app.get('*', (req, res) => {
    res.status(500).send('Erro: Pasta dist não encontrada. Execute "npm run build" antes do deploy.');
  });
}

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).send('Erro interno do servidor');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

