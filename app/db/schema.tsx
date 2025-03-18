import { integer, pgTable, varchar, date, timestamp, text } from "drizzle-orm/pg-core";


// Table des utilisateurs
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  prenom: varchar({ length: 255 }).notNull(),
  ville: varchar({ length: 255 }).notNull(),
  telephone: varchar({ length: 20 }).notNull().unique(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


// Table des formations (avec clé étrangère userId optionnelle)
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
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }), 
});


// Table des formations (avec clé étrangère userId optionnelle)
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
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }), 
});
