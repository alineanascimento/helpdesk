# HelpDesk API

Sistema de gerenciamento de chamados desenvolvido com Node.js, TypeScript e PostgreSQL.

## Tecnologias
- Node.js + TypeScript
- Express.js
- PostgreSQL
- Knex.js
- Docker

## Como rodar localmente

### Pré-requisitos
- Node.js 18+
- Docker

### Passos
1. Clone o repositório
2. Instale as dependências: `npm install`
3. Suba o PostgreSQL: `docker-compose up -d`
4. Rode as migrations: `npx knex migrate:latest`
5. Rode as seeds: `npx knex seed:run`
6. Inicie o servidor: `npm run dev`

## Status
🚧 Em desenvolvimento