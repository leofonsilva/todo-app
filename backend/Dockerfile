# Usar imagem leve e com Node 18
FROM node:18

# Diretório padrão do app
WORKDIR /app

# Copiar apenas os arquivos de dependência primeiro (otimiza o cache do Docker)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Agora copiar o restante do código
COPY . .

# Habilita hot reload (usando ts-node-dev ou start:dev)
CMD ["npm", "run", "start:dev"]