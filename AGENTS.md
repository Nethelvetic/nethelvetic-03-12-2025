# AGENTS.md

> **But** : permettre à l’agent Codex de s’aligner sur **ma façon de penser**, de structurer, nommer et commenter mon code.

---

kebab
## 📁 Organisation des fichiers

- Chaque module métier (users, formations, événements, CRM…) vit dans son propre fichier `dbNeon-*.ts` ou `schema.ts`.
- Les composants React sont rangés sous `app/components/` (fichiers `*.tsx`), avec nommage **PascalCase**.
- Les pages Next.js sous `app/` (directory-based routing).

---

## 🛠️ Dépendances principales

- **Drizzle-ORM** (Postgres‐JS / Neon / Supabase)
- **supabase-js** ou **@neondatabase/serverless**
- **Next.js 13+** (app router, React Server/Client Components)
- **Tailwind CSS** pour le style
- **Zustand** pour le state global
- **js-cookie** pour la persistance navigateur

---

## ✍️ Conventions de nommage

| Entité               | Conventions                   |
|----------------------|-------------------------------|
| Types/Interfaces     | `PascalCase` (ex. `FormatUserInput`)      |
| Fonctions exportées  | `camelCase` ou `entityAction` (ex. `userOneInsert`, `crmUserEmailAndPwSelect`) |
| Composants React     | `PascalCase` (ex. `FormAdmUserModif`)     |
| Fichiers             | kebab-case (ex. `form-se-connecter.tsx`)   |
| Tables/Schémas Drizzle | `snake_case` (ex. `usersTable`, `crm_users_table`) |

---

## 🔢 Logging hiérarchique

- **Préfixe numérique** : chaque bloc log commence par un « niveau »  
  - ex. `console.log("1.0 myFunction début")`  
  - paliers `.1`, `.2`, `.3`, … pour sous-étapes  
  - `STOP` marquant un point de sortie ou un retour anticipé
- **Format** :
  ```ts
  console.log("3.1.2 ../.?/ dbNeon  userOneInsert => User exist OK/NO");


Construis une explication détaillée et bien structurée pour la création d'une page internet complète avec les technologies spécifiées.

Assure-toi de suivre une approche pédagogique, en te mettant dans la peau d'une développeuse junior cherchant à améliorer ses compétences.

# Steps


1. **Gestion des données avec Drizzle et PostgreSQL :**
- ORM Drizzle avec la base de données PostgreSQL via l'URL de connexion fournie.
postgresql://nethelvetic-03-12-2025_owner:npg_kRPHEjTO7e3q@ep-soft-recipe-a26py0fa-pooler.eu-central-1.aws.neon.tech/nethelvetic-03-12-2025?sslmode=require


2. **Développement du frontend :**
- Implémente un design responsive utilisant Tailwind CSS.
- Construit un layout de base et plusieurs composants réutilisables en Next.js.

3. **Fonctionnalités :**
- Implémente une navigation fluide des pages.
- Email via Resend => const resend = new Resend("re_NxZRa7bC_Q6DNSPB7y9fai8ZJLWAVrwYg");
- Ajoute le support pour plusieurs langues à l'application.

4. **Optimisations :**
- Intègre le SEO de base avec des balises meta et des titres.
- Utilise `next/image` pour optimiser les images du site.
- Implémente le lazy loading pour les composants non essentiels.

# Output Format

Produis un texte structuré et détaillé expliquant chaque étape du processus de développement, adapté à un niveau débutant à intermédiaire et en francais. Utilise des sections claires et concises pour chaque étape, en respectant la séquence logique de développement.


# Notes

- Assure-toi que l'explication est adaptée à un public débutant.
- Incorpore des liens vers la documentation officielle des technologies utilisées où c'est pertinent.
- N'oublie pas d'encourager une bonne pratique par la réflexion avant chaque étape importante.
- Tout les explications sont en francais 