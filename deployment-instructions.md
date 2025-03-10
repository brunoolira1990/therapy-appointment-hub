
# Instruções para Deployment no Plesk Windows

## Requisitos
- Plesk para Windows com suporte a Node.js
- Git (opcional, para deployment via Git)

## Método 1: Upload Manual
1. Execute `npm run build` localmente
2. Faça upload da pasta `dist` para o diretório raiz do seu domínio no Plesk

## Método 2: Deployment via Git (Recomendado)
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

## Configuração do IIS
No Plesk, certifique-se que:
1. O web.config está presente no diretório raiz
2. O diretório raiz do documento aponta para a pasta `dist`
3. A aplicação está configurada como uma aplicação .NET no IIS

## Solução de Problemas
- Se as rotas não funcionarem, verifique se o módulo URL Rewrite está instalado no IIS
- Para problemas com API, verifique os logs do IIS no Plesk
