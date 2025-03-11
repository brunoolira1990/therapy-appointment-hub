
# Instruções para Deployment no Plesk Windows via Acesso Remoto

## Preparação de Arquivos Locais
1. Execute `npm run build` para gerar a pasta `dist`
2. Copie todos os arquivos da pasta `dist` para a raiz do diretório do site

## Acessando o Servidor via Área de Trabalho Remota
1. Conecte-se ao seu servidor VPS usando Área de Trabalho Remota
2. Use as credenciais fornecidas pelo seu provedor de hospedagem

## Instalação de Requisitos
1. Instale Node.js no servidor, se ainda não estiver instalado
   - Baixe em [nodejs.org](https://nodejs.org/)
   - Instale a versão LTS para Windows (recomendamos versão 18.x ou 20.x)
   - **Importante:** Execute o instalador como Administrador

2. Instale os módulos IIS necessários:
   - URL Rewrite: Baixe de [IIS URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
   - IISNode: Baixe de [GitHub iisnode](https://github.com/Azure/iisnode/releases)
   - **Importante:** Execute os instaladores como Administrador

## Instalação de Dependências do Projeto
1. Abra o Prompt de Comando como Administrador (crucial)
2. Navegue até a pasta do site (`cd C:\inetpub\wwwroot\seu-site` ou pasta específica)
3. Execute os seguintes comandos:
   ```
   npm init -y
   npm install express@4.18.2 --save
   ```
   - **IMPORTANTE:** Use exatamente a versão 4.18.2 do Express, pois versões mais recentes podem não estar disponíveis
   - Caso ocorra erro, verifique se o Node.js está corretamente instalado
   - Verifique a conexão à internet e as permissões do diretório

## Verificação da Instalação
1. Após instalar o Express, execute este comando para verificar se foi instalado corretamente:
   ```
   node -e "console.log(require('express').version)"
   ```
   - Deve exibir "4.18.2" se a instalação foi bem-sucedida

## Configuração no IIS
1. Abra o IIS Manager (digite "inetmgr" na busca do Windows)
2. Localize seu site no painel esquerdo
3. Clique com o botão direito no site e selecione "Adicionar Aplicativo..."
   - Alias: / (raiz)
   - Caminho físico: Pasta onde estão os arquivos do site

## Configuração de Permissões (CRUCIAL)
1. Navegue até a pasta do site no Explorador de Arquivos
2. Clique com o botão direito na pasta > Propriedades > Segurança > Editar
3. Adicione o usuário do Pool de Aplicativos (tipicamente "IIS AppPool\DefaultAppPool")
4. Conceda permissões de: Leitura, Escrita, Modificar e Listar conteúdo
5. Clique em "Aplicar" e "OK"
6. Crie uma pasta chamada "iisnode" dentro da pasta do site e dê as mesmas permissões
7. **Importante:** Dê permissões completas ao usuário NETWORK SERVICE também

## Teste de Arquivo Express
1. Após instalar o Express, crie um arquivo de teste simples para verificar:
   ```javascript
   // test-express.js
   const express = require('express');
   const app = express();
   console.log('Express carregado com sucesso! Versão:', express.version);
   ```
2. Execute-o com: `node test-express.js`
3. Se não aparecer erro, o Express está instalado corretamente

## Reiniciar o IIS
1. No IIS Manager, clique com o botão direito no servidor > Reiniciar
2. Alternativamente, execute `iisreset` no Prompt de Comando como administrador

## Verificar os Logs
1. Verifique os logs na pasta "iisnode" dentro do diretório do site
2. Caso não existam logs, verifique novamente as permissões da pasta
3. Use o Event Viewer (Visualizador de Eventos) do Windows para verificar erros do IIS

## Solução de Problemas Comuns
- **Erro 500**: Verifique permissões e logs do iisnode
- **Express não encontrado**: Certifique-se de que foi instalado corretamente com a versão exata 4.18.2
- **Problemas de permissão**: Execute tudo como Administrador
- **Node.js não encontrado**: Verifique o caminho no web.config (nodeProcessCommandLine)
- **Timeout durante instalação**: Tente com uma conexão de internet mais estável
- **Erro na instalação do Express**: Use o comando com versão exata `npm install express@4.18.2 --save`

## Teste Direto do Servidor
1. Crie um arquivo `server.js` básico:
   ```javascript
   const http = require('http');
   http.createServer((req, res) => {
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end('Servidor Node.js está funcionando!');
   }).listen(8080);
   ```
2. Execute com `node server.js` para verificar se o Node.js está funcionando
