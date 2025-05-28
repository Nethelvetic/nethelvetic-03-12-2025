import {
  integer,
  pgTable,
  varchar,
  date,
  text,
  json,
  numeric,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { sql as drizzleSql, relations } from "drizzle-orm";
import { ADMIN_ID_JEROME } from "@/admin-config";

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//                        DEFINIR LES TABLES
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------



//---------------------------------------------------------------------
//------------------------1.1 Début Table users -----------------------
//---------------------------------------------------------------------
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nom_entreprise: varchar({ length: 255 }),
  personne_a_contacter: varchar({ length: 255 }),
  ville: varchar({ length: 255 }),
  code_postal: varchar({ length: 20 }),
  telephone: varchar({ length: 20 }).unique(),
  date_de_naissance: date(),
  date_creation: date().notNull(), 
  email: varchar({ length: 255 }).notNull().unique(),
  username: varchar({ length: 255 }),
  status: varchar({ length: 50 }), // ex: "actif", "inactif", "suspendu"
  domaine_activite: varchar({ length: 255 }),
  employeur: varchar({ length: 255 }),
  status_professionnel: varchar({ length: 255 }),
  adresse: text(),
  imgUrl: varchar({ length: 255 }),
  btnUrlInt: varchar({ length: 255 }),
  btnUrlExt: varchar({ length: 255 }),
  btnTexte: varchar({ length: 255 }),
  btnModifUrl: varchar({ length: 255 }).notNull(),
});



//---------------------------------------------------------------------
//------------------------1.2 Début Table userrs_CRM_users ------------
//---------------------------------------------------------------------


//---------------------------------------------------------------------
//------------------------1.2 Début Table userrs_CRM_users ------------
//---------------------------------------------------------------------
export const crmUser_UsersTable = pgTable("crmUser_users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nom_entreprise: varchar({ length: 255 }),
  personne_a_contacter: varchar({ length: 255 }),
  ville: varchar({ length: 255 }),
  code_postal: varchar({ length: 20 }),
  telephone: varchar({ length: 20 }).unique(),
  date_de_naissance: date(),
  date_creation: date().notNull(), 
  email: varchar({ length: 255 }).notNull().unique(),
  username: varchar({ length: 255 }),
  status: varchar({ length: 50 }), // ex: "actif", "inactif", "suspendu"
  domaine_activite: varchar({ length: 255 }),
  employeur: varchar({ length: 255 }),
  status_professionnel: varchar({ length: 255 }),
  adresse: text(),
  imgUrl: varchar({ length: 255 }),
  btnUrlInt: varchar({ length: 255 }),
  btnUrlExt: varchar({ length: 255 }),
  btnTexte: varchar({ length: 255 }),
  btnModifUrl: varchar({ length: 255 }).notNull(),
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }),
});



//---------------------------------------------------------------------
//------------------------2.0 Début Table formation ---------------------
//---------------------------------------------------------------------
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


//---------------------------------------------------------------------
//------------------------3.0 Début Table evenements --------------------
//---------------------------------------------------------------------
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


//---------------------------------------------------------------------
//------------------------4.0 Début Table communaute --------------------
//---------------------------------------------------------------------
export const communauteTable = pgTable("communaute", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date_debut_abonnement: date().notNull(),
  date_fin_abonnement: date(),            // Peut être null si l'appartenance est en cours
  date_invitation: date(),     // Optionnel
  status: varchar({ length: 50 }).notNull(), // ex: "actif", "en attente", "suspendu"
  role: varchar({ length: 50 }).notNull(),   // ex: "membre", "modérateur", "administrateur"
  date_debut_test: date(),                // Période d'essai
  date_fin_test: date(),
  date_dernier_payment: date(),           
  date_prochain_payment: date(), 
  status_paiement: varchar({ length: 50 }).notNull().default("non payé"),
});


//---------------------------------------------------------------------
//------------------------5.0 Début Table crm --------------------------
//---------------------------------------------------------------------

export const crmUsersTable = pgTable("crmUsers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  plan: varchar({ length: 255 }).notNull(), // ex: "Free", "Pro", "Premium"
  plan_details: json("plan_details").notNull(),
  mot_de_passe: varchar({ length: 255 }),
  date_debut_abonnement: date().notNull(),
  date_fin_abonnement: date(),
  date_debut_test: date(),
  date_fin_test: date(),
  status_abonnement: varchar({ length: 50 }).notNull(), // ex: "actif", "en période d'essai", etc.
  date_dernier_payment: date(),
  date_prochain_payment: date(),
  status_paiement: varchar({ length: 50 }).notNull().default("non payé"),
  mode_paiement: varchar({ length: 100 }),
  facturation_info: text(),
  identification: varchar({ length: 50 }).notNull().default(ADMIN_ID_JEROME),
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }),
});



//---------------------------------------------------------------------
//------------------------6.0 Début Table message ---------------------
//---------------------------------------------------------------------
export const messageTable = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull(),
  nom_entreprise: varchar({ length: 255 }).notNull(),
  personne_a_contacter: varchar({ length: 255 }).notNull(),
  ville: varchar({ length: 255 }).notNull(),
  code_postal: varchar({ length: 20 }),
  message: varchar({ length: 255 }).notNull(),
  date: date().notNull(),
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }),
});


//---------------------------------------------------------------------
//------------------------7.0 Début Table crmUsers_userOffre ----------
//---------------------------------------------------------------------
export const crmUsers_userOffreTable = pgTable("crmUsers_userOffre", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  numero_devis: varchar({ length: 255 }),
  date_devis: date(),
  validite_devis: varchar({ length: 50 }),
  etat_devis: varchar({ length: 50 }),
  site_web_emetteur: varchar({ length: 255 }),
  adresse_emetteur: text(),
  lignes_offre: json("lignes_offre"),
  crmUserId: integer().references(() => crmUsersTable.id, { onDelete: "cascade" }),
  crmUsers_userId: integer().references(() => crmUser_UsersTable.id, { onDelete: "cascade" }),
  sous_total: numeric("sous_total"),
  tva_taux: numeric("tva_taux"),
  tva_montant: numeric("tva_montant"),
  total: numeric("total"),
  termes_conditions: text("termes_conditions"),
  signature: varchar({ length: 255 }),
  mention_signature: varchar({ length: 255 }),
  notes_internes: text("notes_internes"),
  date_creation: timestamp("date_creation"),
  date_modification: timestamp("date_modification"),
  est_supprime: boolean("est_supprime").default(false),
});


//---------------------------------------------------------------------
//------------------------8.0 Début Table crmUsers_userFactures -------
//---------------------------------------------------------------------
export const crmUsers_userFacturesTable = pgTable("crm_users_user_factures", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  numero_facture: varchar({ length: 255 }),
  date_facture: date(),
  etat_facture: varchar({ length: 50 }),
  site_web_emetteur: varchar({ length: 255 }),
  adresse_emetteur: text(),
  sous_total: numeric("sous_total"),
  crmUserId: integer().references(() => crmUsersTable.id, { onDelete: "cascade" }),
  crmUsers_userId: integer().references(() => crmUser_UsersTable.id, { onDelete: "cascade" }),
  tva_taux: numeric("tva_taux"),
  tva_montant: numeric("tva_montant"),
  total: numeric("total"),
  ordre_paiement: varchar({ length: 255 }),
  numero_compte_bancaire: varchar({ length: 255 }),
  conditions_paiement: varchar({ length: 255 }),
  date_paiement_effectue: date(),
  methode_paiement: varchar({ length: 50 }),
  notes_internes: text("notes_internes"),
  date_creation: timestamp("date_creation"),
  date_modification: timestamp("date_modification"),
  est_supprime: boolean("est_supprime").default(false),
  devise: varchar({ length: 10 }),
  reference_devis_associe: integer().references(() => crmUsers_userOffreTable.id, { onDelete: "set null" }),
  url_pdf: varchar({ length: 255 }),
  envoyee_a: varchar({ length: 255 }),
});

//---------------------------------------------------------------------
//------------------------9.0 Début Table ligne_facture ---------------
//---------------------------------------------------------------------
export const ligneFactureTable = pgTable("ligne_facture", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  facture_id: integer().references(() => crmUsers_userFacturesTable.id, { onDelete: "cascade" }),
  description: varchar({ length: 255 }),
  prix_unitaire: numeric("prix_unitaire"),
  quantite: integer(),
  total_ligne: numeric("total_ligne"),
});






// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//                   TABLES DE LIASON (pour relations many-to-many)
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------


//---------------------------------------------------------------------
//--------------------2.1 Table de liaison formations/users ----------
//---------------------------------------------------------------------
export const formationUsersTable = pgTable("formation_users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  formationId: integer().references(() => formationTable.id, { onDelete: "cascade" }),
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }),
});


//---------------------------------------------------------------------
//--------------------2.2 Table de liaison evenements/users ---------
//---------------------------------------------------------------------
export const evenementsUsersTable = pgTable("evenements_users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  evenementId: integer().references(() => evenementsTable.id, { onDelete: "cascade" }),
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }),
});


//---------------------------------------------------------------------
//------------------------2.3 Table de liaison communautes/users --------
//---------------------------------------------------------------------
export const communauteUsersTable = pgTable("communaute_users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  communauteId: integer().references(() => communauteTable.id, { onDelete: "cascade" }),
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }),
});





// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//                   DÉFINIR LES RELATIONS
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------



//---------------------------------------------------------------------
//------------------------2.2 realation formation/users ---------------
//---------------------------------------------------------------------
export const formationRelations = relations(formationTable, ({ one, many }) => ({
  creator: one(usersTable, {
    fields: [formationTable.userId],
    references: [usersTable.id],
  }),
  participants: many(formationUsersTable),
}));
export const formationUsersRelations = relations(formationUsersTable, ({ one }) => ({
  formation: one(formationTable, {
    fields: [formationUsersTable.formationId],
    references: [formationTable.id],
  }),
  user: one(usersTable, {
    fields: [formationUsersTable.userId],
    references: [usersTable.id],
  }),
}));


//---------------------------------------------------------------------
//------------------------2.3 realation evenement/users ---------------
//---------------------------------------------------------------------
export const evenementsRelations = relations(evenementsTable, ({ one, many }) => ({
  organizer: one(usersTable, {
    fields: [evenementsTable.userId],
    references: [usersTable.id],
  }),
  participants: many(evenementsUsersTable),
}));
export const evenementsUsersRelations = relations(evenementsUsersTable, ({ one }) => ({
  evenement: one(evenementsTable, {
    fields: [evenementsUsersTable.evenementId],
    references: [evenementsTable.id],
  }),
  user: one(usersTable, {
    fields: [evenementsUsersTable.userId],
    references: [usersTable.id],
  }),
}));


//---------------------------------------------------------------------
//------------------------2.4 realation communaute/users --------------
//---------------------------------------------------------------------
export const communauteRelations = relations(communauteTable, ({ many }) => ({
  members: many(communauteUsersTable),
}));
export const communauteUsersRelations = relations(communauteUsersTable, ({ one }) => ({
  communaute: one(communauteTable, {
    fields: [communauteUsersTable.communauteId],
    references: [communauteTable.id],
  }),
  user: one(usersTable, {
    fields: [communauteUsersTable.userId],
    references: [usersTable.id],
  }),
}));



//---------------------------------------------------------------------
//------------------------Relations pour messageTable -----------------
//---------------------------------------------------------------------
export const messageUserRelations = relations(messageTable, ({ one }) => ({
  sender: one(usersTable, {
    fields: [messageTable.userId],
    references: [usersTable.id],
  }),
}));