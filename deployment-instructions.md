
# Instruções para Deployment na KingHost

## Preparação Local

1. Prepare seu aplicativo React para produção
   ```
   npm run build
   ```

2. Verifique se o arquivo `app.cjs` está na raiz do projeto para servir a aplicação

## Upload para KingHost

1. Acesse o Painel de Controle da KingHost
   - Faça login em sua conta KingHost
   - Navegue até o painel de controle

2. Configure Node.js 
   - Acesse a seção de Configurações ou Aplicativos
   - Habilite o suporte a Node.js para seu domínio
   - Selecione a versão 20.x do Node.js

3. Upload de Arquivos
   - Compacte a pasta `dist` e os arquivos `app.cjs`, `package.json` e `.htaccess` em um arquivo .zip
   - Acesse o Gerenciador de Arquivos no painel da KingHost
   - Navegue até a pasta pública do seu domínio (geralmente `/public_html/`)
   - Faça upload do arquivo .zip
   - Extraia o conteúdo no local desejado

4. Configuração de Pacotes
   - Acesse o terminal SSH da KingHost (se disponível)
   - Navegue até a pasta onde os arquivos foram extraídos
   - Execute `npm install express`

## Configurações Adicionais

1. Configuração do Arquivo Inicial
   - Verifique se o arquivo `app.cjs` está definido como ponto de entrada 
   - Nas configurações da KingHost, defina `app.cjs` como o arquivo inicial da aplicação Node.js

2. Configuração de Domínio
   - Certifique-se de que o domínio está apontando para a pasta correta
   - Verifique as configurações de DNS se necessário

## Verificação e Solução de Problemas

1. Verificando Logs
   - Acesse os logs da aplicação através do painel da KingHost
   - Monitore por erros ou problemas durante a inicialização

2. Problemas Comuns:
   - **Erro 404**: Verifique se o arquivo `app.cjs` está configurado corretamente e se a pasta `dist` existe
   - **Erro 502**: Verifique se o Node.js está rodando corretamente
   - **Aplicação não inicia**: Verifique as configurações de porta (a KingHost pode exigir uma porta específica)

3. Se encontrar problemas:
   - Verifique se todas as dependências estão instaladas
   - Confirme que a versão do Node.js está correta (20.x)
   - Verifique se o arquivo `app.cjs` está configurado para servir os arquivos estáticos da pasta `dist`

## Manutenção

1. Para atualizar seu aplicativo:
   - Faça as alterações localmente
   - Execute `npm run build` para gerar uma nova versão da pasta `dist`
   - Repita o processo de upload apenas para a pasta `dist` atualizada

2. Para reiniciar a aplicação:
   - Use o painel da KingHost para reiniciar os serviços Node.js

## Configurações Específicas da KingHost

1. Para configurar variáveis de ambiente:
   - Use o painel da KingHost para adicionar variáveis de ambiente, ou
   - Crie um arquivo `.env` na raiz do projeto

2. Configurações de Memória e CPU:
   - Verifique os recursos alocados para sua aplicação
   - Ajuste conforme necessário através do painel da KingHost

3. Certificados SSL:
   - Configure o SSL através do painel da KingHost
   - Ative o HTTPS para seu domínio

4. Configurações de Cache:
   - Configure o cache para arquivos estáticos conforme necessário
