import "dotenv/config"; 
import { neon } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { formationTable, evenementsTable, usersTable} from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

type FormatEventInput = {
  titre: string;
  texte: string;
  date: string;
  heure: string;
  prix: number;
  imgUrl: string;
  lieu: string;
  btnUrlInt: string;
  btnUrlExt: string;
  btnTexte: string;
  btnModifUrl: string;
};

type FormatUserInput = {
  nom: string;                     // Nom de l'utilisateur (varchar(255) non nul)
  prenom: string;                  // Prénom de l'utilisateur (varchar(255) non nul)
  texte: string;                   // Texte (par exemple, une description ou un commentaire)
  date_creation: string;           // Date de création du compte (format ISO string)
  email: string;                   // Email (varchar(255) non nul et unique)
};





// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//                        DEFINR TABLES FORMATION
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------




//---------------------------------------------------------------------
//------------------------1.1 Fonction insert one Formation  ----------
//---------------------------------------------------------------------
export async function insertFormation(formation: FormatEventInput) {

  console.log("4.0 debut insertFormation : formation= ", formation);

  try {
    console.log("4.1 debut insertFormation try avant");
    await db.insert(formationTable).values(formation);
    console.log("4.2 debut insertFormation try await après");
    return { success: true, message: "4.3 Formation ajoutée avec succès !" };
  } catch (error) {
    console.error("4.4 Erreur lors de l'insertion de la formation :", error);
    return { success: false, message: "Une erreur est survenue lors de l'ajout de la formation." };
  }
}



//---------------------------------------------------------------------
//------------------------1.2 Fonction select all Formation  ----------
//---------------------------------------------------------------------
export async function selectFormation() {
  try {
    const formations = await db.select().from(formationTable);
    return formations;
  } catch (error) {
    console.error("Erreur lors de la sélection des formations :", error);
    throw error;
  }
}



//---------------------------------------------------------------------
//------------------------1.3 Fonction select one Formation  ----------
//---------------------------------------------------------------------
export async function selectUneFormation(id: number) {
  console.log("3 dbQuery selectUneFormation avec l'id= ", id);
  try {
    const uneFormation = await db
      .select()
      .from(formationTable)
      .where(eq(formationTable.id, id))
      .limit(1); // Optionnel : pour limiter le résultat à un seul enregistrement
    return uneFormation;
  } catch (error) {
    console.error("3 dbQuery selectUneFormation erreur: ", error);
    throw error;
  }
}


//---------------------------------------------------------------------
//------------------------1.4 Fonction update one Formation  ----------
//---------------------------------------------------------------------
export async function updateUneFormation(id: number, formation: FormatEventInput) {
  try {
    await db
      .update(formationTable)
      .set(formation)
      .where(eq(formationTable.id, id));
    return { success: true, message: "Formation mise à jour avec succès !" };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la formation :", error);
    return { success: false, message: "Une erreur est survenue lors de la mise à jour de la formation." };
  }
}


//---------------------------------------------------------------------
//------------------------1.5 Fonction delete one Formation  ----------
//---------------------------------------------------------------------
export async function deleteUneFormation(id: number) {
  try {
    await db.delete(formationTable).where(eq(formationTable.id, id));
    return { success: true, message: "Formation supprimée avec succès !" };
  } catch (error) {
    console.error("Erreur lors de la suppression de la formation :", error);
    return { success: false, message: "Une erreur est survenue lors de la suppression de la formation." };
  }
}








// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//                        DEFINR TABLES EVENEMENT
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------





//---------------------------------------------------------------------
//------------------------2.1 Fonction insertEvenment  ------------------
//---------------------------------------------------------------------
export async function insertEvenement(evenement: FormatEventInput) {
 console.log("2.0 dbQuery  insertEvenement : evenement= ", evenement);

  try {
    console.log("2.0a dbQuery insertEvenement try avant");
    await db.insert(evenementsTable).values(evenement);
    console.log("2.0b dbQuery insertEvenement try await après");
    return { success: true, message: "2.0c dbQuery insertEvenement Evenement ajoutée avec succès !" };
  } catch (error) {
    console.error("2.0d dbQuery insertEvenement Erreur:", error);
    return { success: false, message: "Une erreur est survenue lors de l'ajout d'un évenement." };
  }
}


//--------------------------------------------------------------------------------
//------------------------2.2  Fonction selectFormation ----------------------------
//--------------------------------------------------------------------------------
export async function selectEvenements() {
  console.log("2.1 dbQuery  selectEvenements");
  try {
    const evenements = await db.select().from(evenementsTable);
    return evenements;
  } catch (error) {
    console.error("2.1 dbQuery selectEvenements Erreur :", error);
    throw error;
  }
}





//--------------------------------------------------------------------------------
//------------------------2.3  Fonction selectUnEvenement ------------------------
//--------------------------------------------------------------------------------
export async function selectUnEvenement(id: number) {
  console.log("2.2  dbQuery selectUnEvenement avec l'id= ", id);
  try {
    const unEvenement = await db
      .select()
      .from(evenementsTable)
      .where(eq(evenementsTable.id, id))
      .limit(1); // Optionnel : pour limiter le résultat à un seul enregistrement
    return unEvenement;
  } catch (error) {
    console.error("2.2 dbQuery selectUnEvenement erreur: ", error);
    throw error;
  }
}


//--------------------------------------------------------------------------------
//------------------------2.4  Fonction updateUnEvenement ------------------------
//--------------------------------------------------------------------------------
export async function updateUnEvenement(id: number, evenement: FormatEventInput) {
  console.log("2.3 dbQuery  updateUnEvenement");

  try {
    await db
      .update(evenementsTable)
      .set(evenement)
      .where(eq(evenementsTable.id, id));
    return { success: true, message: "Evenement mise à jour avec succès !" };
  } catch (error) {
    console.error("2.3 dbQuery updateUnEvenement erreur:", error);
    return { success: false, message: "Une erreur est survenue lors de la mise à jour de l'événement." };
  }
}



//---------------------------------------------------------------------
//------------------------2.5  Fonction deleteUnEvenement -------------
//---------------------------------------------------------------------
export async function deleteUnEvenement(id: number) {
  console.log("2.4 dbQuery  deleteUnEvenement");

  try {
    await db.delete(evenementsTable).where(eq(evenementsTable.id, id));
    return { success: true, message: "Evénement supprimée avec succès !" };
  } catch (error) {
    console.error("2.4 dbQuery  deleteUnEvenement Erreur:", error);
    return { success: false, message: "Une erreur est survenue lors de la suppression de l'événement." };
  }
}





// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//                        DEFINR TABLES USER
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------



//---------------------------------------------------------------------
//------------------------4.1 Début insert user -----------------------
//---------------------------------------------------------------------
export async function insertUser(user: FormatUserInput) {
  console.log("Début insertUser, données:", user);
  try {
    await db.insert(usersTable).values(user);
    console.log("Insertion réussie");
    return { success: true, message: "Utilisateur ajouté avec succès !" };
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur :", error);
    return { success: false, message: "Une erreur est survenue lors de l'ajout de l'utilisateur." };
  }
}



//---------------------------------------------------------------------
//------------------------4.2 Début select tout users -----------------
//---------------------------------------------------------------------
export async function selectUsers() {
  try {
    const users = await db.select().from(usersTable);
    return users;
  } catch (error) {
    console.error("Erreur lors de la sélection des utilisateurs :", error);
    throw error;
  }
}



//---------------------------------------------------------------------
//------------------------4.3 Début select one users ------------------
//---------------------------------------------------------------------
export async function selectOneUser(id: number) {
  console.log("Sélection de l'utilisateur avec l'id =", id);
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
    return user;
  } catch (error) {
    console.error("Erreur lors de la sélection de l'utilisateur :", error);
    throw error;
  }
}



//---------------------------------------------------------------------
//------------------------4.4 Début update one user -------------------
//---------------------------------------------------------------------
export async function updateUser(id: number, user: FormatUserInput) {
  console.log("Mise à jour de l'utilisateur avec l'id =", id, "données:", user);
  try {
    await db
      .update(usersTable)
      .set(user)
      .where(eq(usersTable.id, id));
    return { success: true, message: "Utilisateur mis à jour avec succès !" };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    return { success: false, message: "Une erreur est survenue lors de la mise à jour de l'utilisateur." };
  }
}




//---------------------------------------------------------------------
//------------------------4.5 Début delete one users ------------------
//---------------------------------------------------------------------
export async function deleteUser(id: number) {
  console.log("Suppression de l'utilisateur avec l'id =", id);
  try {
    await db.delete(usersTable).where(eq(usersTable.id, id));
    return { success: true, message: "Utilisateur supprimé avec succès !" };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    return { success: false, message: "Une erreur est survenue lors de la suppression de l'utilisateur." };
  }
}

