
# Instruções para Deployment no Heroku

## Preparação Local

1. Instale o Heroku CLI
   - Baixe e instale o [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
   - Verifique a instalação com `heroku --version`

2. Faça login no Heroku
   ```
   heroku login
   ```

3. Prepare seu aplicativo React para produção
   ```
   npm run build
   ```

## Configuração do Heroku

1. Crie um novo aplicativo Heroku (se ainda não tiver um)
   ```
   heroku create nome-do-seu-app
   ```

2. Adicione um arquivo Procfile na raiz do projeto
   ```
   echo "web: node app.cjs" > Procfile
   ```

3. Configure o buildpack do Node.js
   ```
   heroku buildpacks:set heroku/nodejs
   ```

4. Verifique se seu package.json contém:
   - A dependência do Express: `"express": "4.18.2"`
   - A versão do Node.js nos engines: `"engines": { "node": "20.x" }`
   - Um script start: `"start": "node app.cjs"`

## Deployment

1. Adicione todos os arquivos ao Git
   ```
   git add .
   ```

2. Faça commit das alterações
   ```
   git commit -m "Preparando para deploy no Heroku"
   ```

3. Faça push para o Heroku
   ```
   git push heroku main
   ```
   (ou `git push heroku master` se você estiver usando a branch master)

4. Abra o aplicativo no navegador
   ```
   heroku open
   ```

## Verificação e Solução de Problemas

1. Para ver os logs do aplicativo:
   ```
   heroku logs --tail
   ```

2. Para verificar o status do aplicativo:
   ```
   heroku ps
   ```

3. Se encontrar problemas:
   - Verifique se o Procfile está configurado corretamente
   - Confirme que o app.cjs está servindo os arquivos estáticos da pasta dist
   - Verifique se as versões do Node.js e Express são compatíveis
   - Assegure-se de que todas as dependências necessárias estão listadas no package.json

4. Para reiniciar o aplicativo:
   ```
   heroku restart
   ```

## Configurações Adicionais (se necessário)

1. Para adicionar variáveis de ambiente:
   ```
   heroku config:set NOME_DA_VARIAVEL=valor
   ```

2. Para configurar um domínio personalizado:
   ```
   heroku domains:add www.seudominio.com
   ```

3. Para habilitar HTTPS automático:
   ```
   heroku features:enable http-session-affinity
   ```

## Manutenção

1. Para atualizar seu aplicativo, faça as alterações localmente, commit e:
   ```
   git push heroku main
   ```

2. Para escalar seu aplicativo:
   ```
   heroku ps:scale web=2
   ```
   (aumenta para 2 dynos - note que isso pode gerar custos adicionais)

