# aulaExemploIA

Aplicação full stack da lista de tarefas, centralizada neste repositório.

## Estrutura

- `frontend/`: aplicação React/Vite/TanStack.
- `backend/`: API Node.js/Express/Sequelize.
- `documentos/`: especificações do projeto.
- `prompts/`: prompts utilizados no desenvolvimento.

## Instalação

```powers
npm run install:all
```

## Execução

```powers
npm run backend:dev
npm run frontend:dev
```

O front-end utiliza `http://localhost:5173` por padrão e a API utiliza `http://localhost:3000`.

## Validação

```powers
npm run frontend:build
npm run frontend:test
npm --prefix backend test
```