
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
   - Instale a versão LTS para Windows
2. Instale os módulos IIS necessários:
   - URL Rewrite: Baixe de [IIS URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
   - IISNode: Baixe de [GitHub iisnode](https://github.com/Azure/iisnode/releases)

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

## Instalação do Express (em caso de erro)
1. Abra o Prompt de Comando como Administrador
2. Navegue até a pasta do site (`cd C:\inetpub\wwwroot\seu-site`)
3. Execute o comando: `npm init -y`
4. Em seguida: `npm install express --save`

## Reiniciar o IIS
1. No IIS Manager, clique com o botão direito no servidor > Reiniciar
2. Alternativamente, execute `iisreset` no Prompt de Comando como administrador

## Verificar os Logs
1. Verifique os logs na pasta "iisnode" dentro do diretório do site
2. Caso não existam logs, verifique novamente as permissões da pasta

## Solução de Problemas Comuns
- **Erro 500**: Verifique permissões e logs
- **Erro 404**: Verifique o arquivo web.config e regras de rewrite
- **Node.js não encontrado**: Verifique o caminho no web.config (nodeProcessCommandLine)
