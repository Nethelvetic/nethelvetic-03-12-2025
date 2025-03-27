import "dotenv/config"; 
import { neon } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { formationTable, evenementsTable, usersTable, messageTable } from "./schema";


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
  nom_entreprise: string;             // varchar(255) non null
  personne_a_contacter: string;        // varchar(255) non null
  ville: string;                       // varchar(255), optionnel
  code_postal: string;
  telephone: string;                  // varchar(20), unique, optionnel
  date_de_naissance: string;          // date, optionnel
  date_creation: string;               // date non null (format ISO ou "YYYY-MM-DD")
  email: string;                       // varchar(255) non null, unique
  mot_de_passe: string;               // varchar(255), optionnel
  username: string;                   // varchar(255), unique, optionnel
  statut: string;                     // varchar(50), optionnel (ex: "actif", "inactif", "suspendu")
  domaine_activite: string;           // varchar(255), optionnel (anciennement "profession")
  employeur: string;                  // varchar(255), optionnel
  statut_professionnel: string;       // varchar(255), optionnel
  adresse: string;                    // text(), optionnel
  imgUrl: string;                     // varchar(255), optionnel (URL de l'image de profil)
  btnUrlInt: string;                  // varchar(255), optionnel
  btnUrlExt: string;                  // varchar(255), optionnel
  btnTexte: string;                    // varchar(255) non null
  btnModifUrl: string;                 // varchar(255) non null
};



// Typage  messages
type FormatMessageInput = {
  email: string;
  nom_entreprise: string;
  personne_a_contacter: string;
  ville: string;
  code_postal: string;
  message: string;
  date: string; 
};

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//                        DEFINR TABLES FORMATION
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------






//---------------------------------------------------------------------
//------------------------1.1 Fonction insert one Formation  ----------
//---------------------------------------------------------------------
export async function insertFormation(formation: FormatEventInput) {

  console.log("1.1.0 dbQuery insertFormation : formation= ", formation);

  try {
    console.log("1.1.1 dbQuery insertFormation try avant");
    await db.insert(formationTable).values(formation);
    console.log("1.1.2 dbQuery insertFormation try await après");
    return { success: true, message: "4.3 Formation ajoutée avec succès !" };
  } catch (error) {
    console.error("1.1.4 dbQuery Erreur lors de l'insertion de la formation :", error);
    return { success: false, message: "Une erreur est survenue lors de l'ajout de la formation." };
  }
}



//---------------------------------------------------------------------
//------------------------1.2 Fonction select all Formation  ----------
//---------------------------------------------------------------------
export async function selectFormation() {
  try {
    console.log("1.2.1 dbQuery selectFormation try avant");
    const formations = await db.select().from(formationTable);
    console.log("1.2.1 dbQuery selectFormation try après => formations", formations);
    return formations;
  } catch (error) {
    console.error("1.2.2 dbQuery Erreur lors de la sélection des formations :", error);
    throw error;
  }
}



//---------------------------------------------------------------------
//------------------------1.3 Fonction select one Formation  ----------
//---------------------------------------------------------------------
export async function selectUneFormation(id: number) {
  console.log("1.3.0 dbQuery selectUneFormation avec l'id= ", id);
  try {
    console.log("1.3.1 dbQuery selectUneFormation avant");
    const uneFormation = await db
      .select()
      .from(formationTable)
      .where(eq(formationTable.id, id))
      .limit(1); // Optionnel : pour limiter le résultat à un seul enregistrement
   console.log("1.3.2 dbQuery selectUneFormation après => uneFormation:", uneFormation);
    return uneFormation;
  } catch (error) {
    console.error("1.3.3 dbQuery selectUneFormation erreur: ", error);
    throw error;
  }
}


//---------------------------------------------------------------------
//------------------------1.4 Fonction update one Formation  ----------
//---------------------------------------------------------------------
export async function updateUneFormation(id: number, formation: FormatEventInput) {
  console.log("1.4.0 dbQuery upDateUneFormation avec l'id= ", id);
  try {
    console.log("1.4.1 dbQuery upDateUneFormation avant");
    await db
      .update(formationTable)
      .set(formation)
      .where(eq(formationTable.id, id));
    console.log("1.4.2 dbQuery upDateUneFormation après");
    return { success: true, message: "Formation mise à jour avec succès !" };
  } catch (error) {
    console.error("1.4.2 dbQuery Erreur lors de la mise à jour de la formation :", error);
    return { success: false, message: "Une erreur est survenue lors de la mise à jour de la formation." };
  }
}


//---------------------------------------------------------------------
//------------------------1.5 Fonction delete one Formation  ----------
//---------------------------------------------------------------------
export async function deleteUneFormation(id: number) {
  console.log("1.5.0 dbQuery deleteUneFormation avec l'id= ", id);
  try {
    console.log("1.5.1 dbQuery deleteUneFormation try avant ");
    await db.delete(formationTable).where(eq(formationTable.id, id));
    console.log("1.5.2 dbQuery deleteUneFormation try après ");
    return { success: true, message: "Formation supprimée avec succès !" };
  } catch (error) {
    console.error("1.5.2 dbQuery deleteUneFormation Erreur lors de la suppression de la formation :", error);
    return { success: false, message: "Une erreur est survenue lors de la suppression de la formation." };
  }
}







// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//                        DEFINR TABLES EVENEMENT
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------





//---------------------------------------------------------------------
//------------------------2.1 Fonction insertEvenment  ------------------
//---------------------------------------------------------------------
export async function insertEvenement(evenement: FormatEventInput) {
 console.log("2.1.0 dbQuery  insertEvenement : evenement= ", evenement);

  try {
    console.log("2.1.1 dbQuery insertEvenement try avant");
    await db.insert(evenementsTable).values(evenement);
    console.log("2.1.2 dbQuery insertEvenement try await après");
    return { success: true, message: "2.1.3 dbQuery insertEvenement Evenement ajoutée avec succès !" };
  } catch (error) {
    console.error("2.1.4 dbQuery insertEvenement Erreur:", error);
    return { success: false, message: "Une erreur est survenue lors de l'ajout d'un évenement." };
  }
}


//--------------------------------------------------------------------------------
//------------------------2.2  Fonction selectFormation ----------------------------
//--------------------------------------------------------------------------------
export async function selectEvenements() {
  console.log("2.2.0 dbQuery  selectEvenements");
  try {
    console.log("2.2.1 dbQuery  selectEvenements try avant");
    const evenements = await db.select().from(evenementsTable);
    console.log("2.2.2 dbQuery  selectEvenements try après");
    return evenements;
  } catch (error) {
    console.error("2.2.3 dbQuery selectEvenements Erreur :", error);
    throw error;
  }
}





//--------------------------------------------------------------------------------
//------------------------2.3  Fonction selectUnEvenement ------------------------
//--------------------------------------------------------------------------------
export async function selectUnEvenement(id: number) {
  console.log("2.3.0  dbQuery selectUnEvenement avec l'id= ", id);
  try {
    console.log("2.3.1  dbQuery selectUnEvenement try avant");
    const unEvenement = await db
      .select()
      .from(evenementsTable)
      .where(eq(evenementsTable.id, id))
      .limit(1); // Optionnel : pour limiter le résultat à un seul enregistrement
      console.log("2.3.2  dbQuery selectUnEvenement try après => unEvenement: ", unEvenement);
    return unEvenement;
  } catch (error) {
    console.error("2.3.3 dbQuery selectUnEvenement erreur: ", error);
    throw error;
  }
}


//--------------------------------------------------------------------------------
//------------------------2.4  Fonction updateUnEvenement ------------------------
//--------------------------------------------------------------------------------
export async function updateUnEvenement(id: number, evenement: FormatEventInput) {
  console.log("2.4.0 dbQuery  updateUnEvenement avec l'id:", id);

  try {
    console.log("2.4.1 dbQuery  updateUnEvenement try avant");
    await db
      .update(evenementsTable)
      .set(evenement)
      .where(eq(evenementsTable.id, id));
      console.log("2.4.2 dbQuery  updateUnEvenement try après");
    return { success: true, message: "Evenement mise à jour avec succès !" };
  } catch (error) {
    console.error("2.4.3 dbQuery updateUnEvenement erreur:", error);
    return { success: false, message: "Une erreur est survenue lors de la mise à jour de l'événement." };
  }
}



//---------------------------------------------------------------------
//------------------------2.5  Fonction deleteUnEvenement -------------
//---------------------------------------------------------------------
export async function deleteUnEvenement(id: number) {
  console.log("2.5.0 dbQuery  deleteUnEvenement avec l'id:", id);

  try {
    console.log("2.5.1 dbQuery  deleteUnEvenement try avant");
    await db.delete(evenementsTable).where(eq(evenementsTable.id, id));
    console.log("2.5.2 dbQuery  deleteUnEvenement try après");
    return { success: true, message: "Evénement supprimée avec succès !" };
  } catch (error) {
    console.error("2.5.3 dbQuery  deleteUnEvenement Erreur:", error);
    return { success: false, message: "Une erreur est survenue lors de la suppression de l'événement." };
  }
}




// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//                        DEFINR TABLES USER
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------



//---------------------------------------------------------------------
//------------------------3.1 Début insert user -----------------------
//---------------------------------------------------------------------
export async function insertOneUser(user: FormatUserInput) {
  console.log("3.1.1 dbQuery insertOneUser, données:", user);
  try {
    // Vérifier si un utilisateur avec cet email existe déjà
    console.log("3.1.2 dbQuery insertOneUser, contrôle si user existe");
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email));
      
    if (existingUser.length > 0) {
      console.log("3.1.3 dbQuery insertOneUser Utilisateur existant trouvé pour l'email:", user.email);
      return { 
        success: true, 
        message: "Un utilisateur existe déjà avec cette adresse mail.", 
        id: existingUser[0].id 
      };
    }
    
    console.log("3.1.4 dbQuery insertOneUser try avant");
    const defaultDate = new Date().toISOString().slice(0, 10); // format "YYYY-MM-DD"
    const userToInsert = {
      ...user,
      date_creation: user.date_creation.trim() === "" ? defaultDate : user.date_creation,
      date_de_naissance: user.date_de_naissance.trim() === "" ? null : user.date_de_naissance,
      telephone: user.telephone.trim() === "" ? null : user.telephone,
      username: user.username.trim() === "" ? null : user.username, // Transformation de "" en null
    };
    
    const inserted = await db.insert(usersTable).values(userToInsert).returning();
    console.log("3.1.5 dbQuery insertOneUser try après", inserted);
    return { 
      success: true, 
      message: "Utilisateur ajouté avec succès !",
      id: inserted[0].id 
    };
  } catch (error) {
    console.error("3.1.6 dbQuery insertUser Erreur lors de l'insertion de l'utilisateur :", error);
    return { success: false, message: "Une erreur est survenue lors de l'ajout de l'utilisateur." };
  }
}




//---------------------------------------------------------------------
//------------------------3.2 Début select tout users -----------------
//---------------------------------------------------------------------
export async function selectUsers() {
  console.log("3.2.0 dbQuery all selectUsers");
  try {
    console.log("3.2.1 dbQuery all selectUsers try avant");
    const users = await db.select().from(usersTable);
    console.log("3.2.2 dbQuery all selectUsers try après => users:", users);
    return users;
  } catch (error) {
    console.error("3.2.3 dbQuery all selectUsers Erreur lors de la sélection des utilisateurs :", error);
    throw error;
  }
}



//---------------------------------------------------------------------
//------------------------3.3 Début select one users ------------------
//---------------------------------------------------------------------
export async function selectOneUser(id: number) {
  console.log("3.3.0 dbQuery selectOneUsers avec l'id: ", id);
  try {
    console.log("3.3.1 dbQuery selectOneUsers try avant");
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
      console.log("3.3.2 dbQuery selectOneUsers try après => user: ", user);
    return user;
  } catch (error) {
    console.error("3.3.3 dbQuery selectOneUsers Erreur lors de la sélection de l'utilisateur :", error);
    throw error;
  }
}



//---------------------------------------------------------------------
//------------------------3.4 Début update one user -------------------
//---------------------------------------------------------------------
export async function updateOneUser(id: number, user: FormatUserInput) {
  console.log("3.4.0 dbQuery updateUsers avec l'id: ", id);
  try {
    const defaultDate = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    const userToUpdate = {
      ...user,
      date_creation: user.date_creation.trim() === "" ? defaultDate : user.date_creation,
      date_de_naissance: user.date_de_naissance.trim() === "" ? null : user.date_de_naissance,
      telephone: user.telephone.trim() === "" ? null : user.telephone,
      username: user.username.trim() === "" ? null : user.username,
    };
    console.log("3.4.1 dbQuery updateUsers try  user.date_creation:",  user.date_creation);
    console.log("3.4.2 dbQuery updateUsers try avant");
    await db
      .update(usersTable)
      .set(userToUpdate)
      .where(eq(usersTable.id, id));
    console.log("3.4.3 dbQuery updateUsers try après");
    return { success: true, message: "Utilisateur mis à jour avec succès !" };
  } catch (error) {
    console.error("3.4.4 dbQuery updateUsers Erreur lors de la mise à jour de l'utilisateur :", error);
    return { success: false, message: "Une erreur est survenue lors de la mise à jour de l'utilisateur." };
  }
}





//---------------------------------------------------------------------
//------------------------3.5 Début delete one users ------------------
//---------------------------------------------------------------------
export async function deleteOneUser(id: number) {
  console.log("3.5.0 dbQuery deleteUsers avec l'id: ", id);
 
  try {
    console.log("3.5.1 dbQuery deleteUsers try avant");
    await db.delete(usersTable).where(eq(usersTable.id, id));
    console.log("3.5.2 dbQuery deleteUsers try après");
    return { success: true, message: "Utilisateur supprimé avec succès !" };
  } catch (error) {
    console.error("3.5.2 dbQuery deleteUsers Erreur lors de la suppression de l'utilisateur :", error);
    return { success: false, message: "Une erreur est survenue lors de la suppression de l'utilisateur." };
  }
}





// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//                        DEFINR TABLES MESSAGE
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------






//---------------------------------------------------------------------
//------------------------4.1Fonction selectMessage ---------------------
//---------------------------------------------------------------------
export async function selectMessages() {
  console.log("4.1.0 dbQuery selectMessage: début");
  try {
    const messages = await db.select().from(messageTable);
    console.log("4.1.2 dbQuery selectMessage: fin", messages);
    return messages;
  } catch (error) {
    console.error("4.1.3 Erreur lors de la sélection des messages :", error);
    throw error;
  }
}

//---------------------------------------------------------------------
//------------------------4.2 Fonction selectOneMessage ------------------
//---------------------------------------------------------------------
export async function selectOneMessage(id: number) {
  console.log("4.2.0 dbQuery selectOneMessage avec l'id :", id);
  try {
    const message = await db
      .select()
      .from(messageTable)
      .where(eq(messageTable.id, id))
      .limit(1); // Limiter à un seul enregistrement
    console.log("4.2.1 dbQuery selectOneMessage: fin", message);
    return message;
  } catch (error) {
    console.error("4.2.2 dbQuery selectOneMessage Erreur:", error);
    throw error;
  }
}

//---------------------------------------------------------------------
//------------------------4.3 Fonction updateOneMessage ------------------
//---------------------------------------------------------------------
export async function updateOneMessage(id: number, messageData: FormatMessageInput) {
  console.log("4.3.0 dbQuery updateOneMessage avec l'id :", id);
  try {
    await db
      .update(messageTable)
      .set(messageData)
      .where(eq(messageTable.id, id));
    console.log("4.3.1 dbQuery updateOneMessage: fin");
    return { success: true, message: "Message mis à jour avec succès !" };
  } catch (error) {
    console.error("4.3.2 dbQuery updateOneMessage Erreur", error);
    return { success: false, message: "Une erreur est survenue lors de la mise à jour du message." };
  }
}

//---------------------------------------------------------------------
//------------------------4.4 Fonction deleteOneMessage ---------------
//---------------------------------------------------------------------
export async function deleteOneMessage(id: number) {
  console.log("4.4.0 dbQuery deleteOneMessage avec l'id :", id);
  try {
    await db.delete(messageTable).where(eq(messageTable.id, id));
    console.log("4.4.1 dbQuery deleteOneMessage: fin");
    return { success: true, message: "Message supprimé avec succès !" };
  } catch (error) {
    console.error("4.4.1 dbQuery deleteOneMessage Erreur: ", error);
    return { success: false, message: "Une erreur est survenue lors de la suppression du message." };
  }
}



//---------------------------------------------------------------------
//------------------------4.5 Fonction insertOneMessage ---------------
//---------------------------------------------------------------------

export async function insertOneMessage(messageData: FormatMessageInput) {
  console.log("4.5.0 dbQuery insertOneMessage, données:", messageData);
  try {
    await db.insert(messageTable).values(messageData);
    console.log("4.5.1 dbQuery insertOneMessage: insertion réussie");
    return { success: true, message: "Message ajouté avec succès !" };
  } catch (error) {
    console.error("4.5.2 dbQuery insertOneMessage Erreur: ", error);
    return { success: false, message: "Une erreur est survenue lors de l'ajout du message." };
  }
}