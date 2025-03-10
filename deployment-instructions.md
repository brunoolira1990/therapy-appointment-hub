
# Instruções para Deployment no Plesk Windows

## Arquivos Essenciais para Download
- [web.config](/public/web.config) - Configurações do IIS para roteamento e tipos MIME
- [app.js](/app.js) - Arquivo necessário para evitar erros no IIS (deve estar na raiz do site)
- [app.cjs](/app.cjs) - Alternativa em formato CommonJS (use se app.js causar erros)

## Requisitos
- Plesk para Windows com suporte ao IIS
- Módulo URL Rewrite instalado no IIS
- Git (opcional, para deployment via Git)

## Método 1: Upload Manual via Gerenciador de Arquivos
1. Execute `npm run build` localmente para gerar a pasta `dist`
2. Acesse o Painel Plesk > Seu Domínio > Gerenciador de Arquivos
3. Navegue até a pasta raiz do domínio (geralmente `httpdocs` ou `wwwroot`)
4. Faça upload do conteúdo da pasta `dist` para esta pasta
5. Certifique-se de fazer upload do arquivo `web.config` para a raiz do site
6. Importante: Após o upload, verifique se o conteúdo foi para a raiz e não dentro de uma subpasta `dist`
7. **Importante:** Certifique-se de que o arquivo `app.js` ou `app.cjs` esteja presente na raiz do site (diretamente em `httpdocs`, não dentro de outras pastas)
   - Em caso de erro "ERR_REQUIRE_ESM", use o arquivo `app.cjs` em vez de `app.js`

## Configuração após o Upload
1. No Plesk, vá para Domínios > seu-dominio.com > Configurações de Hospedagem
2. Em "Documento Padrão", adicione `index.html` como primeira opção
3. Verifique se o site está configurado como Aplicação .NET (Versão 4.x ou superior)
4. Se necessário, reinicie o IIS pelo Painel do Plesk (Ferramentas & Configurações > IIS)

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
7. **Importante:** Certifique-se de copiar manualmente o arquivo `app.js` ou `app.cjs` para a raiz do site após o deploy

## Configuração do IIS
No Plesk, certifique-se que:
1. O web.config está presente no diretório raiz
2. O diretório raiz do documento aponta para a pasta `dist`
3. A aplicação está configurada como uma aplicação .NET no IIS
4. O arquivo app.js ou app.cjs está na raiz do site (diretamente em `httpdocs`)

## Solução de Problemas com ES Modules
Se você encontrar o erro `ERR_REQUIRE_ESM`, significa que o IIS está interpretando seu app.js como um módulo ES (devido à configuração "type": "module" no package.json). Para resolver:

1. Use o arquivo `app.cjs` em vez de `app.js` (extensão .cjs indica CommonJS)
2. Ou modifique o arquivo app.js para usar sintaxe CommonJS como mostrado acima
3. Ou crie um package.json separado na raiz com `{"type": "commonjs"}` para substituir a configuração

## Solução de Problemas Gerais
- Se as rotas não funcionarem após upload, verifique se:
  1. O arquivo `web.config` está na raiz do site
  2. O módulo URL Rewrite está instalado no IIS
  3. As permissões de arquivos estão corretas
  4. O arquivo `app.js` ou `app.cjs` está presente na raiz
- Para verificar os logs de erro, acesse o Painel Plesk > Domínios > seu-dominio.com > Logs

## Checklist Final de Deployment
- [ ] Pasta `dist` gerada localmente com `npm run build`
- [ ] Conteúdo da pasta `dist` enviado para a raiz do site no Plesk
- [ ] Arquivo `web.config` presente na raiz
- [ ] Arquivo `app.js` ou `app.cjs` presente na raiz (diretamente em `httpdocs`)
- [ ] `index.html` configurado como documento padrão
- [ ] Site configurado como aplicação .NET no IIS
- [ ] URL Rewrite instalado no servidor
- [ ] Testadas várias rotas da aplicação para confirmar funcionamento
