
# Instruções para Deployment no Plesk Windows

## Arquivos Essenciais para Download
- [web.config](/public/web.config) - Configurações do IIS para roteamento e tipos MIME
- [app.cjs](/app.cjs) - Arquivo necessário para evitar erros no IIS (deve estar na raiz do site)
- [package.json.root](/package.json.root) - Arquivo package.json alternativo para a raiz (opcional)

## Requisitos
- Plesk para Windows com suporte ao IIS
- Módulo URL Rewrite instalado no IIS
- Módulo iisnode instalado no IIS
- Git (opcional, para deployment via Git)

## Método 1: Upload Manual via Gerenciador de Arquivos
1. Execute `npm run build` localmente para gerar a pasta `dist`
2. Acesse o Painel Plesk > Seu Domínio > Gerenciador de Arquivos
3. Navegue até a pasta raiz do domínio (geralmente `httpdocs` ou `wwwroot`)
4. Faça upload do conteúdo da pasta `dist` para esta pasta
5. Certifique-se de fazer upload do arquivo `web.config` para a raiz do site
6. Importante: Após o upload, verifique se o conteúdo foi para a raiz e não dentro de uma subpasta `dist`

## Importante: Resolução do Erro ERR_REQUIRE_ESM
Este erro ocorre porque o IIS está tentando carregar app.js como um módulo CommonJS, mas o package.json do projeto define "type": "module". Você tem três opções:

### Opção 1 (Recomendada): Usar app.cjs
1. Faça upload do arquivo `app.cjs` para a raiz do site (diretamente em `httpdocs`, não dentro de outras pastas)
2. Certifique-se de que o arquivo tenha permissões de leitura/execução apropriadas

### Opção 2: Criar um package.json na raiz
1. Faça upload do arquivo `package.json.root` para a raiz do site
2. Renomeie-o para `package.json` (isso sobrescreverá a configuração "type": "module")

### Opção 3: Alterar o arquivo app.js para usando dynamic import
Se as opções acima não funcionarem, você pode modificar o arquivo app.js para usar importação dinâmica

## Configuração após o Upload
1. No Plesk, vá para Domínios > seu-dominio.com > Configurações de Hospedagem
2. Em "Documento Padrão", adicione `index.html` como primeira opção
3. Verifique se o site está configurado como Aplicação .NET (Versão 4.x ou superior)
4. Se necessário, reinicie o IIS pelo Painel do Plesk (Ferramentas & Configurações > IIS)

## Configuração de Permissões (IMPORTANTE PARA O ERRO IISNODE)
Para resolver o erro "iisnode encountered an error when processing the request", siga estes passos:

1. No Plesk, vá para Ferramentas & Configurações > IIS
2. Localize o pool de aplicativos do seu site (geralmente tem o mesmo nome do domínio)
3. Anote a identidade do pool de aplicativos (geralmente IIS AppPool\nome-do-pool)
4. No Windows Explorer do servidor:
   - Navegue até a pasta raiz do site (geralmente em C:\inetpub\vhosts\seu-dominio.com\httpdocs)
   - Clique com o botão direito na pasta > Propriedades > Segurança > Editar
   - Adicione a identidade do pool de aplicativos com permissões de: Ler, Escrever, Modificar, Executar
5. Se estiver usando um caminho personalizado para logs, certifique-se de que a mesma identidade tenha permissões nessa pasta
6. Reinicie o IIS após modificar as permissões

## Modificação do web.config para Solucionar Problemas do IISNODE
Se o problema persistir, adicione estas configurações ao seu web.config:

```xml
<system.webServer>
  <iisnode 
    nodeProcessCommandLine="C:\Program Files\nodejs\node.exe"
    loggingEnabled="true"
    logDirectory="iisnode"
    debuggingEnabled="true"
    maxLogFileSizeInKB="128"
    maxTotalLogFileSizeInKB="1024"
    maxLogFiles="20"
  />
  <!-- ... outras configurações existentes ... -->
</system.webServer>
```

## Método 2: Deployment via Git (Alternativa)
1. No painel Plesk, acesse seu domínio
2. Vá para a seção Git (ou Ferramentas & Configurações > Git)
3. Crie um novo repositório ou conecte a um existente
4. No seu projeto local, adicione o remote:
   ```
   git remote add plesk [URL_DO_REPOSITORIO_GIT_PLESK]
   ```
5. Faça push para o Plesk:
   ```
   git push plesk main
   ```
6. Configure um hook de deploy no Plesk para:
   - Executar `npm install`
   - Executar `npm run build`
   - Definir o diretório raiz do documento para a pasta `dist`
7. **Importante:** Certifique-se de copiar manualmente o arquivo `app.cjs` para a raiz do site após o deploy

## Configuração do IIS
No Plesk, certifique-se que:
1. O web.config está presente no diretório raiz
2. O diretório raiz do documento aponta para a pasta `dist`
3. A aplicação está configurada como uma aplicação .NET no IIS
4. O arquivo app.cjs está na raiz do site (diretamente em `httpdocs`)
5. O módulo iisnode está instalado no servidor

## Verificação da Instalação do IISNODE
Se seu servidor não tiver o iisnode instalado:
1. Baixe o instalador do iisnode adequado para sua versão do Windows Server em: https://github.com/Azure/iisnode/releases
2. Execute o instalador com privilégios de administrador
3. Reinicie o IIS após a instalação
4. Verifique se o módulo está carregado em: IIS Manager > Seu site > Módulos

## Solução de Problemas Gerais
- Se as rotas não funcionarem após upload, verifique se:
  1. O arquivo `web.config` está na raiz do site
  2. O módulo URL Rewrite está instalado no IIS
  3. As permissões de arquivos estão corretas
  4. O arquivo `app.cjs` está presente na raiz
- Para verificar os logs de erro, acesse o Painel Plesk > Domínios > seu-dominio.com > Logs
- Verifique também os logs do iisnode em: `[raiz-do-site]/iisnode/`

## Verificação de Erros Específicos

### Erro ERR_REQUIRE_ESM:
1. Se está usando o arquivo `app.cjs` em vez de `app.js`
2. Se há um `package.json` na raiz definindo "type": "commonjs"
3. Se o IIS está configurado corretamente para lidar com Node.js

### Erro IISNODE (HTTP 500):
1. Verifique as permissões no diretório do site
2. Confirme se o módulo iisnode está instalado corretamente
3. Verifique se o caminho para o node.exe está configurado corretamente no web.config
4. Analise os logs do Windows Event Viewer para erros relacionados ao IIS e iisnode

## Solução para Aplicações SPA React sem Node.js
Se você continuar enfrentando problemas, uma alternativa mais simples é configurar o site como uma aplicação estática (sem Node.js):

1. Modifique o web.config para remover a seção iisnode e incluir apenas as regras de URL Rewrite
2. Certifique-se que o site está configurado como uma aplicação .NET normal, não Node.js
3. Use apenas o conteúdo estático da pasta `dist` gerado pelo `npm run build`

## Checklist Final de Deployment
- [ ] Pasta `dist` gerada localmente com `npm run build`
- [ ] Conteúdo da pasta `dist` enviado para a raiz do site no Plesk
- [ ] Arquivo `web.config` presente na raiz
- [ ] Arquivo `app.cjs` presente na raiz (diretamente em `httpdocs`)
- [ ] `index.html` configurado como documento padrão
- [ ] Site configurado como aplicação .NET no IIS
- [ ] URL Rewrite instalado no servidor
- [ ] Permissões adequadas configuradas para o pool de aplicativos do IIS
- [ ] Módulo iisnode instalado e configurado (se necessário)
- [ ] Testadas várias rotas da aplicação para confirmar funcionamento
