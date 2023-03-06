# Primeiro passo : Baixe o Docker
Acesse o site oficial do Docker em https://www.docker.com/get-started e clique no botão "Download for Windows".
Siga as instruções do instalador para concluir a instalação do Docker.

# Segundo passo : Ative o container Docker

Você deve navegar até a pasta Backend_Biopark_Predio no cmd, la dentro, use o comando :
docker-compose up -d


# Terceiro passo : Baixe o Node.
Você pode baixar e instalar o Node.js a partir do site oficial: https://nodejs.org. 


# Quarto passo : Npm install
Agora ainda dentro da pasta Backend_Biopark_Predio, use o comando :
npm install

# Quinto passo : Migrate do Prisma
Agora ainda dentro da pasta Backend_Biopark_Predio, use o comando :
npx prisma migrate dev Biopark_Reserva_Apartamento_Predio
agora tudo deve estar certo para iniciar o backend

# Sexto passo : Npm run dev
Agora ainda dentro da pasta Backend_Biopark_Predio, use o comando :
npm run dev
Com isso o backend esta funcionando

# Setimo passo : Npm install
Abra outro terminal e deixe o Backend rodando de fundo, agora dentro da pasta Frontend_Biopark_Predio, use o comando :
npm install

# Oitavo passo : Npm start
Ainda dentro de Frontend_Biopark_Predio, use o comando :
npm start

# Nono passo : Use a aplicação
A Aplicação deve agora estar rodando perfeitamente.


