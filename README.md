<h1 align="center">Movie-Translations API</h1>

## Primeiros passos

1. A versão utilizada é Node.js 12
2. É necessário ter o PostgreSQL 10 ou 11 instalado, ou você pode usar o Docker.
3. Instale as dependências com `npm ci`.
4. Faça uma cópia do arquivo `.env.example` com o nome`.env`.
5. Insira a sua chave da api themoviedb no campo `API_KEY` do arquivo `.env`.
6. Se você tiver uma instalação local do PostgreSQL, crie um database vazio e configure o arquivo `.env` com as informações de acesso.
7. Se não, execute `npm run postgres:start` e `npm run database:create` para criar e configurar um database com Docker.
8. Rode o projeto localmente com `npm run dev`.
9. Execute os casos de teste com `npm test`.
10. Execute `npm start` para buildar e executar o projeto.
11. Você poderá executar o Postman realizando uma chamada GET para o endpoint: http://localhost:8000/api/movie-translations/598

-------------------------------------
Daniel Bonfim <daniel.fb88@gmail.com>
