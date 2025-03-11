
# Instruções para Deployment no Plesk Windows via Gerenciador de Arquivos

## Preparação de Arquivos Locais
1. Execute `npm run build` para gerar a pasta `dist`
2. Compacte todos os arquivos da pasta `dist` em um arquivo ZIP

## Upload de Arquivos via Plesk
1. Acesse o Painel de Controle do Plesk
2. Navegue até seu domínio
3. Clique em "Gerenciador de Arquivos"
4. Navegue até a pasta raiz do seu site (geralmente httpdocs ou public_html)
5. Use o botão "Upload" para enviar o arquivo ZIP
6. Extraia o arquivo ZIP diretamente no servidor usando a opção "Extrair" do Plesk

## Instalação do Node.js via Plesk
1. No Painel do Plesk, vá até "Hospedagem Node.js"
2. Clique em "Ativar Node.js"
3. Selecione a versão LTS mais recente (20.x)
4. Clique em "Aplicar"

## Instalação de Dependências
1. No Gerenciador de Arquivos do Plesk:
   - Crie um novo arquivo `package.json` (se não existir)
   - Adicione as dependências necessárias:
   ```json
   {
     "name": "seu-site",
     "version": "1.0.0",
     "dependencies": {
       "express": "4.18.2"
     }
   }
   ```
2. Use o Terminal do Plesk (SSH) ou o "Node.js" no painel para instalar:
   ```
   npm install
   ```

## Configuração do Handler do Node.js
1. No Plesk, vá até as configurações do seu domínio
2. Em "Configurações do Node.js":
   - Defina o "Document root" para a pasta onde estão seus arquivos
   - Configure o "Application startup file" como `app.cjs`
   - Defina a porta para 8080 (ou a que preferir)

## Verificação da Instalação
1. No Terminal do Plesk, verifique a instalação do Express:
   ```
   node -e "console.log(require('express').version)"
   ```
   Deve exibir "4.18.2"

## Configuração de Permissões
1. No Gerenciador de Arquivos:
   - Selecione todos os arquivos e pastas
   - Clique com o botão direito > "Permissões"
   - Configure as permissões para 755 para pastas e 644 para arquivos
   - Para pastas que precisam de escrita (como logs), use 775

## Solução de Problemas Comuns
- **Erro 500**: Verifique os logs no Plesk em "Log do Apache"
- **Express não encontrado**: Verifique se o package.json está correto e reinstale
- **Erro na instalação**: Use a versão exata do Express (4.18.2)
- **Problemas de permissão**: Ajuste as permissões via Gerenciador de Arquivos
- **Node.js não encontrado**: Verifique se está ativado nas configurações do domínio

## Verificação Final
1. Acesse seu site através do navegador
2. Verifique os logs do Node.js no Plesk para identificar possíveis erros
3. Se necessário, reinicie o serviço Node.js através do painel do Plesk

