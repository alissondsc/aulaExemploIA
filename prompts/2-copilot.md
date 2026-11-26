Quero que você desenvolva e organize uma aplicação utilizando os projetos existentes no meu computador, respeitando os seguintes caminhos:

**CAMINHOS DOS PROJETOS**

- Back-end: `C:\Users\alisson62314316\aula-exemplo-backend-jp-2026`
- Front-end: `C:\Users\alisson62314316\Documents\spec-to-solution`

## 1. BACK-END

Desenvolva e organize o back-end utilizando Node.js e Express, seguindo boas práticas de desenvolvimento e organização de código.

### Tecnologias obrigatórias:
- Node.js
- Express
- PostgreSQL (PG)
- Sequelize (ORM)
- NPM
- Nodemon para desenvolvimento

### Requisitos de desenvolvimento:

1. Utilize o Express para configurar o servidor e gerenciar as rotas HTTP, respeitando os métodos e códigos de status HTTP adequados.
2. Implemente as operações CRUD completas:
   - Create (criar).
   - Read (consultar).
   - Update (atualizar).
   - Delete (excluir).
3. Utilize PostgreSQL como banco de dados.
4. Utilize Sequelize para realizar o mapeamento e as operações com o banco de dados.
5. Implemente tratamento adequado de erros e exceções, evitando que falhas interrompam inesperadamente a aplicação.
6. Utilize respostas HTTP apropriadas para situações de sucesso, erros de validação, recursos não encontrados e erros internos.
7. Organize o código seguindo o padrão MVC e separação de responsabilidades.

### Estrutura obrigatória de pastas e arquivos:

Organize o back-end seguindo esta estrutura:

```text
back-end/
│
├── src/
│   ├── router/
│   │   └── routes.js
│   │
│   ├── model/
│   │   └── models.js
│   │
│   ├── service/
│   │   └── services.js
│   │
│   ├── controller/
│   │   └── controllers.js
│   │
│   └── config/
│       └── database.js
│
├── index.html
├── server.js
├── .gitignore
├── .env
├── .env.example
└── package.json
```

Os nomes dos arquivos podem ser ajustados conforme a necessidade do projeto, desde que a separação entre rotas, modelos, serviços e controladores seja mantida.

### Configurações adicionais:

- Configure corretamente a conexão com o PostgreSQL utilizando Sequelize.
- Utilize variáveis de ambiente para armazenar credenciais e configurações sensíveis.
- Configure o `.gitignore` para ignorar `node_modules`, `.env` e outros arquivos desnecessários.
- Configure o Nodemon para monitorar alterações durante o desenvolvimento.
- Disponibilize o comando `npm run dev` no `package.json` para iniciar o servidor em modo de desenvolvimento.
- Utilize `npm start` para execução em produção, se aplicável.

## 2. FRONT-END

Utilize o projeto existente no seguinte diretório:

`C:\Users\alisson62314316\Documents\spec-to-solution`

Analise a estrutura atual do front-end antes de realizar qualquer alteração.

Mantenha a identidade visual, os componentes e as funcionalidades já existentes, realizando apenas as modificações necessárias para integrar o front-end ao back-end.

Configure corretamente as requisições HTTP para consumir as rotas disponibilizadas pela API.

## 3. INTEGRAÇÃO ENTRE FRONT-END E BACK-END

- Configure a comunicação entre front-end e back-end.
- Utilize requisições HTTP para realizar as operações CRUD.
- Garanta que os dados cadastrados sejam armazenados no PostgreSQL.
- Implemente a atualização e exclusão de registros.
- Trate os erros retornados pela API no front-end.
- Configure o CORS quando necessário.

## 4. ORIENTAÇÕES IMPORTANTES

Antes de começar:

1. Analise os arquivos e a estrutura dos dois projetos.
2. Verifique quais funcionalidades já estão implementadas.
3. Identifique o que precisa ser criado, corrigido ou reorganizado.
4. Evite excluir ou sobrescrever funcionalidades existentes sem necessidade.
5. Preserve o que já está funcionando.

Durante o desenvolvimento:

- Escreva códigos limpos, organizados e reutilizáveis.
- Utilize boas práticas de programação.
- Mantenha a separação de responsabilidades.
- Evite duplicação de código.
- Comente trechos importantes quando necessário.
- Garanta que os arquivos estejam corretamente conectados entre si.

## 5. VALIDAÇÃO FINAL

Ao concluir o desenvolvimento:

- Verifique se todas as dependências estão instaladas.
- Confirme se a conexão com o PostgreSQL está funcionando.
- Teste todas as operações CRUD.
- Verifique se as rotas estão respondendo corretamente.
- Confirme se o front-end está consumindo a API.
- Verifique se não existem erros de execução.

**IMPORTANTE:** Não quero apenas exemplos de código ou explicações. Quero que você trabalhe diretamente nos arquivos dos projetos, implementando e organizando o código necessário.

Ao finalizar, apresente um resumo das alterações realizadas, os arquivos criados ou modificados, as dependências necessárias e os comandos para executar o front-end e o back-end.