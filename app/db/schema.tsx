import { 
  integer, 
  pgTable, 
  varchar, 
  date, 
  text, 
  json 
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// -------------------
// 1. Définition des tables
// -------------------

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nom: varchar({ length: 255 }).notNull(),
  prenom: varchar({ length: 255 }).notNull(),
  // Vous pouvez conserver "ville" si nécessaire, ou le réutiliser dans l'adresse
  ville: varchar({ length: 255 }),
  telephone: varchar({ length: 20 }).unique(),
  // Remplacement de "age" par "date_de_naissance"
  date_de_naissance: date(),
  // Date de création du compte
  date_creation: date().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  // Nouveaux champs ajoutés
  mot_de_passe: varchar({ length: 255 }),
  username: varchar({ length: 255 }).unique(),
  statut: varchar({ length: 50 }), // ex: "actif", "inactif", "suspendu"
  profession: varchar({ length: 255 }),        // Métier ou domaine professionnel
  employeur: varchar({ length: 255 }),           // Entreprise ou organisation
  statut_professionnel: varchar({ length: 255 }),  // ex: "indépendant", "salarié", "freelance"
  // Adresse postale complète (vous pouvez aussi la décomposer en plusieurs colonnes si besoin)
  adresse: text(),
});

export const formationTable = pgTable("formations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  titre: varchar({ length: 255 }).notNull(),
  texte: varchar({ length: 255 }).notNull(),
  date: date().notNull(),
  heure: varchar({ length: 5 }).notNull(),
  prix: integer().notNull(),
  imgUrl: varchar({ length: 255 }).notNull(),
  lieu: varchar({ length: 255 }).notNull(),
  btnUrlInt: varchar({ length: 255 }),
  btnUrlExt: varchar({ length: 255 }),
  btnTexte: varchar({ length: 255 }).notNull(),
  btnModifUrl: varchar({ length: 255 }).notNull(),
  date_dernier_payment: date(),    
  status_paiement: varchar({ length: 50 }).notNull().default("non payé"),
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }),
});

export const evenementsTable = pgTable("evenements", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  titre: varchar({ length: 255 }).notNull(),
  texte: varchar({ length: 255 }).notNull(),
  date: date().notNull(),
  heure: varchar({ length: 5 }).notNull(),
  prix: integer(),
  imgUrl: varchar({ length: 255 }).notNull(),
  lieu: varchar({ length: 255 }).notNull(),
  btnUrlInt: varchar({ length: 255 }),
  btnUrlExt: varchar({ length: 255 }),
  btnTexte: varchar({ length: 255 }).notNull(),
  btnModifUrl: varchar({ length: 255 }).notNull(),
  date_dernier_payment: date(),    
  status_paiement: varchar({ length: 50 }).notNull().default("non payé"),
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }),
});

// Table Communauté (déjà définie)
export const communauteTable = pgTable("communaute", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().references(() => usersTable.id, { onDelete: "cascade" }),
  date_debut_abonnement: date().notNull(),
  date_fin_abonnement: date(),            // Peut être null si l'appartenance est en cours
  date_invitation: date(),     // Optionnel
  statut: varchar({ length: 50 }).notNull(), // ex: "actif", "en attente", "suspendu"
  role: varchar({ length: 50 }).notNull(),   // ex: "membre", "modérateur", "administrateur"
  date_debut_test: date(),                // Date de début de la période d'essai
  date_fin_test: date(),                  // Date de fin de la période d'essai
  date_dernier_payment: date(),           // Date à laquelle la cotisation a été réglée
  date_prochain_payment: date(), 
  status_paiement: varchar({ length: 50 }).notNull().default("non payé"),
});

// Nouvelle table Saas
export const saasTable = pgTable("saas", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().references(() => usersTable.id, { onDelete: "cascade" }),
  plan: varchar({ length: 255 }).notNull(), // Nom ou identifiant du plan (Free, Pro, Premium, etc.)
  plan_details: json("plan_details").notNull(), // Détails ou configuration du plan, stockés en JSON
  date_debut_abonnement: date().notNull(), // Date de début de l'abonnement effectif
  date_fin_abonnement: date(),              // Date de fin de l'abonnement (si temporaire ou résilié)
  date_debut_test: date(),                  // Date de début de la période d’essai
  date_fin_test: date(),                    // Date de fin de la période d’essai
  status_abonnement: varchar({ length: 50 }).notNull(), // ex: "actif", "en période d'essai", "résilié", "suspendu"
  date_dernier_payment: date(),                // Date du dernier paiement effectué
  date_prochain_payment: date(),                // Date prévue pour le prochain paiement
  status_paiement: varchar({ length: 50 }).notNull().default("non payé"),
  mode_paiement: varchar({ length: 100 }),    // Mode de paiement utilisé (carte bancaire, PayPal, etc.)
  facturation_info: text(),                 // Informations complémentaires de facturation (adresse, périodicité, etc.)
});

// -------------------
// 2. Définition des relations
// -------------------

// a) Relations côté "parent" : Users
export const userRelations = relations(usersTable, ({ many }) => ({
  formations: many(formationTable),
  evenements: many(evenementsTable),
  communaute: many(communauteTable),
  saas: many(saasTable),
}));

// b) Relations côté "enfant" : Formation
export const formationRelations = relations(formationTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [formationTable.userId],
    references: [usersTable.id],
  }),
}));

// c) Relations côté "enfant" : Evenements
export const evenementsRelations = relations(evenementsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [evenementsTable.userId],
    references: [usersTable.id],
  }),
}));

// d) Relation côté "enfant" : Communauté
export const communauteRelations = relations(communauteTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [communauteTable.user_id],
    references: [usersTable.id],
  }),
}));

// e) Relation côté "enfant" : Saas
export const saasRelations = relations(saasTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [saasTable.user_id],
    references: [usersTable.id],
  }),
}));
