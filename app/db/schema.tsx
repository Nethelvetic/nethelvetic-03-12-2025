import { 
  integer, 
  pgTable, 
  varchar, 
  date, 
  text, 
  json,
} from "drizzle-orm/pg-core";
import { sql as drizzleSql, relations } from "drizzle-orm";

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
//------------------------1.2 Début Table formation ---------------------
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
//------------------------1.3 Début Table evenements --------------------
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
//------------------------1.4 Début Table communaute --------------------
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
//------------------------1.5 Début Table Saas --------------------------
//---------------------------------------------------------------------
export const saasTable = pgTable("saas", {
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
  identification: varchar({ length: 50 }).notNull().default("jerome1872Troistorrents"),
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }),
});



//---------------------------------------------------------------------
//------------------------1.6 Début Table message ---------------------
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


//---------------------------------------------------------------------
//------------------------2.4 Table de liaison Saas/users ---------------
//---------------------------------------------------------------------
export const saasUsersTable = pgTable("saas_users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  saasId: integer().references(() => saasTable.id, { onDelete: "cascade" }),
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
//------------------------2.1 realation parent/users ------------------
//---------------------------------------------------------------------
export const userRelations = relations(usersTable, ({ many }) => ({
  formations: many(formationUsersTable),
  evenements: many(evenementsUsersTable),
  communaute: many(communauteUsersTable),
  saas: many(saasUsersTable),
}));


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
//------------------------2.5 realation Saas/users --------------------
//---------------------------------------------------------------------
export const saasRelations = relations(saasTable, ({ many }) => ({
  subscribers: many(saasUsersTable),
}));
export const saasUsersRelations = relations(saasUsersTable, ({ one }) => ({
  saas: one(saasTable, {
    fields: [saasUsersTable.saasId],
    references: [saasTable.id],
  }),
  user: one(usersTable, {
    fields: [saasUsersTable.userId],
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