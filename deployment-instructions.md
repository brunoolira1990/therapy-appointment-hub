
# Instruções para Deployment no Plesk Windows via Acesso Remoto

## Arquivos Essenciais para o Deployment
- `web.config` - Configurações do IIS para roteamento e tipos MIME
- `app.cjs` - Arquivo necessário para evitar erros no IIS (deve estar na raiz do site)

## Requisitos no Servidor
- Plesk para Windows com suporte ao IIS
- Módulo URL Rewrite instalado no IIS
- Módulo iisnode instalado no IIS
- Node.js instalado no servidor

## Passos para Deployment via Acesso Remoto

### 1. Preparação do Ambiente
1. Conecte-se ao servidor via Área de Trabalho Remota
2. Verifique se Node.js está instalado:
   - Abra o Prompt de Comando e digite `node -v`
   - Se não estiver instalado, baixe e instale a partir de [nodejs.org](https://nodejs.org/)
3. Verifique se o módulo iisnode está instalado:
   - Abra o IIS Manager (digite "inetmgr" na Busca do Windows)
   - Selecione o servidor e verifique se "iisnode" aparece na lista de módulos
   - Se não estiver instalado, baixe do [GitHub do iisnode](https://github.com/Azure/iisnode/releases)

### 2. Instalação do URL Rewrite (Se necessário)
1. Baixe o instalador do [URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
2. Execute o instalador como administrador
3. Siga as instruções na tela para completar a instalação
4. Reinicie o IIS após a instalação (no IIS Manager: clique com o botão direito no servidor > Reiniciar)

### 3. Configuração do Site no IIS
1. No Plesk, identifique o diretório físico do seu site:
   - Abra o Painel Plesk > Domínios > seu-dominio.com > Hospedagem Web
   - Anote o caminho físico (geralmente `C:\Inetpub\vhosts\seu-dominio.com\httpdocs`)
2. No IIS Manager:
   - Expanda o servidor > Sites > Localize seu site
   - Clique com o botão direito no site > Gerenciar Aplicativo > Configurações Avançadas
   - Verifique se o "Pool de Aplicativos" está configurado corretamente
   - Anote o nome do pool de aplicativos

### 4. Configuração de Permissões (CRUCIAL)
1. Abra o Explorador de Arquivos e navegue até o diretório do site
2. Clique com o botão direito na pasta > Propriedades > Segurança > Editar
3. Adicione o usuário do Pool de Aplicativos (geralmente `IIS AppPool\nome-do-pool`)
4. Conceda permissões de: Leitura, Escrita, Modificar, Listar conteúdo
5. Clique em "Aplicar" e "OK"
6. Crie uma pasta chamada "iisnode" na raiz do site e dê as mesmas permissões

### 5. Deployment dos Arquivos
1. Execute `npm run build` localmente para gerar a pasta `dist`
2. Copie o conteúdo da pasta `dist` para o diretório raiz do site no servidor
3. Certifique-se de que os arquivos `web.config` e `app.cjs` estejam na raiz do site (diretamente no diretório httpdocs)
4. Verifique se o arquivo `index.html` está na raiz

### 6. Verificação da Configuração
1. No IIS Manager, selecione seu site
2. Clique duas vezes em "Documentos Padrão"
3. Verifique se "index.html" está na lista e movido para o topo
4. Clique duas vezes em "Configuração do Handler"
5. Verifique se existe um handler para "iisnode" que aponta para "app.cjs"

### 7. Reinicie o IIS
1. No IIS Manager, clique com o botão direito no seu site > Gerenciar Site > Reiniciar
2. Alternativamente, no Prompt de Comando como administrador, execute: `iisreset`

### 8. Verificação de Logs para Depuração
- Verifique os logs do iisnode na pasta `iisnode` dentro do diretório do site
- Verifique o Visualizador de Eventos do Windows para erros relacionados ao IIS
- No IIS Manager, selecione o site > Logs da Falha de Solicitação

## Verificação do Deployment
1. Abra um navegador e acesse seu site
2. Teste a navegação entre as diferentes rotas
3. Se encontrar erros, verifique os logs do iisnode e do IIS

## Solução de Problemas Comuns

### Erro iisnode (HTTP 500)
- **Causa mais comum**: Permissões incorretas
- **Solução**: Verifique se o usuário do Pool de Aplicativos tem permissões adequadas no diretório do site

### Erro ERR_REQUIRE_ESM
- **Causa**: Conflito entre CommonJS e ES modules
- **Solução**: Certifique-se de que o arquivo `app.cjs` está na raiz do site e configurado corretamente no web.config

### Rotas não funcionam (Erro 404)
- **Causa**: Configuração incorreta de URL Rewrite no web.config
- **Solução**: Verifique se o módulo URL Rewrite está instalado e se o web.config tem as regras corretas

### Tipos MIME incorretos
- **Causa**: Configuração incorreta de tipos MIME no IIS
- **Solução**: Verifique a seção staticContent no web.config

## Checklist Final
- [ ] Node.js instalado no servidor
- [ ] Módulo iisnode instalado no IIS
- [ ] Módulo URL Rewrite instalado no IIS
- [ ] Permissões adequadas no diretório do site
- [ ] Arquivos `web.config` e `app.cjs` na raiz do site
- [ ] Conteúdo da pasta `dist` transferido para a raiz do site
- [ ] Site reiniciado no IIS
- [ ] Pasta `iisnode` criada com permissões adequadas
- [ ] Testadas várias rotas da aplicação
