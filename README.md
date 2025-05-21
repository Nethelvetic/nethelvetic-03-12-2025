# Nethelvetic 03-12-2025

Ce projet est une application Next.js utilisant Drizzle ORM, Supabase et Tailwind CSS. Il contient également un starter pour la génération d'e-mails avec React Email.

## Installation des dépendances

Assurez‑vous d'avoir Node.js installé puis installez les paquets :

```bash
npm install
```

## Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet et ajoutez les variables suivantes :

```env
DATABASE_URL=<url de connexion PostgreSQL>
SUPABASE_URL=<url du projet Supabase>
SUPABASE_ANON_KEY=<clef anonyme Supabase>
RESEND_API_KEY=<clef API Resend>
# facultatif pour les emails
VERCEL_URL=http://localhost:3000
```

Ces valeurs permettent à Drizzle, Supabase et Resend de fonctionner correctement.

## Lancer le serveur de développement

```bash
npm run dev
```

L'application est alors accessible sur [http://localhost:3000](http://localhost:3000).

## Commandes utiles

- `npm run lint` – lance ESLint pour analyser le code.
- `npm run build` – génère la version de production.

### Aperçu des emails

Le dossier `react-email-starter` contient un petit projet pour prévisualiser les modèles d'e-mails. Pour l'utiliser :

```bash
cd react-email-starter
npm install
npm run dev
```

Un serveur local s'ouvre sur le port 3000 pour afficher les templates.
