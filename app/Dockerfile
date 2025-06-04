# 1. Image officielle Node.js (tu peux choisir 20-alpine ou 20-slim)
FROM node:20-alpine

# 2. Définir le dossier de travail dans le conteneur
WORKDIR /app

# 3. Copier les fichiers de dépendances
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# 4. Installer les dépendances
RUN npm install

# 5. Copier le reste du code source
COPY . .

# 6. Build l'app pour la prod
RUN npm run build

# 7. Démarrer Next.js en production
EXPOSE 3000
CMD ["npm", "start"]
