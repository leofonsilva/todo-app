# ToDo

## Visão geral
- Projeto para treinar conhecimentos em NextJS, NestJS e MongoDB

## Comandos
- Subir projeto
  - cd infrastructure
  - docker-compose up
    - --build 
    - -d
  - docker ps
- Parar projeto
  - docker-compose down
- Rodar o projeto normalmente
  - cd backend
  - npm install
  - npm run start:dev
- Instalar NestJS CLI
  - npm i -g @nestjs/cli
- Criar projeto backend
  - nest new backend
- Instalar dependências
  - cd backend
  - npm install @nestjs/mongoose mongoose @nestjs/jwt passport-jwt passport bcrypt
  - npm install -D @types/passport-jwt @types/bcrypt
  - npm install class-validator class-transformer
  - npm install @nestjs/passport passport
  - npm install --save-dev @types/passport
  - npm install passport-jwt
  - npm install --save-dev @types/passport-jwt