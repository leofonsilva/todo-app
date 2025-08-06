# Usar imagem leve e com Node 22
FROM node:22-alpine

# Diretório padrão do app
WORKDIR /app

# Copiar apenas os arquivos de dependência primeiro (otimiza o cache do Docker)
COPY package*.json ./

# Limpar cache e instalar dependências
RUN npm cache clean --force \
  && npm install

# Agora copiar o restante do código
COPY . .

# Habilita hot reload (usando ts-node-dev ou start:dev)
CMD ["npm", "run", "start:dev"]