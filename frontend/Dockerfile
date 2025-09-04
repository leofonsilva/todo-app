# Frontend Dockerfile
FROM node:22-bullseye-slim

# Diretório de trabalho
WORKDIR /app

# Copiar dependências primeiro (cache)
COPY package*.json ./

# Instalar todas as dependências (incluindo dev)
RUN npm ci

# Copiar código do projeto
COPY . .

# Expor porta
EXPOSE 3001

# Rodar frontend com hot reload
CMD ["npm", "run", "dev"]
