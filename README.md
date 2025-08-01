# ToDo

## Visão geral
- Projeto para treinar conhecimentos em NextJS, NestJS e MongoDB

## Estrutura
/backend
  /src
    /domain
      /entities
        task.entity.ts
      /repositories
        task.repository.ts
    /application
      /use-cases
        create-task.usecase.ts
        get-tasks.usecase.ts
        ...
      /dto
        create-task.dto.ts
    /infrastructure
      /database
        /schemas
          task.schema.ts
        /repositories
          task-mongo.repository.ts
      /auth
        auth.module.ts
        jwt.strategy.ts
        auth.service.ts
        ...
    /presentation
      /controllers
        task.controller.ts
      /validators
        create-task.validator.ts
    app.module.ts
    main.ts

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