import "dotenv/config"; 
import { neon } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, isNotNull, not } from "drizzle-orm";
import { formationTable, evenementsTable, usersTable, messageTable, saasTable } from "./schema";


// 90   TABLES FORMATION
// 219  TABLES EVENEMENT
// 352  TABLES USER
// 668    - select User With Active Saas 
// 809    - insert user pour inscription 
// 971  TABLES MESSAGE
// 1066 TABLES SAAS



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
  nom_entreprise: string;
  personne_a_contacter: string;
  ville: string;
  code_postal: string ;
  telephone: string;
  date_de_naissance: string;
  date_creation: string;
  email: string;
  username: string;
  status: string;
  domaine_activite: string;
  employeur: string;
  status_professionnel: string;
  adresse: string;
  imgUrl: string;
  btnUrlInt: string;
  btnUrlExt: string;
  btnTexte: string;
  btnModifUrl: string;
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


// Typage pour la table saasTable
export type FormatSaasInput = {
  plan: string;                           // ex: "Free", "Pro", "Premium"
  plan_details: any;                      // données au format JSON
  date_debut_abonnement: string;          // format "YYYY-MM-DD"
  date_fin_abonnement?: string;           // format "YYYY-MM-DD"
  date_debut_test?: string;               // format "YYYY-MM-DD"
  date_fin_test?: string;                 // format "YYYY-MM-DD"
  status_abonnement: string;              // ex: "actif", "en période d'essai", etc.
  date_dernier_payment?: string;          // format "YYYY-MM-DD"
  date_prochain_payment?: string;         // format "YYYY-MM-DD"
  status_paiement: string;                // ex: "non payé" (valeur par défaut)
  mode_paiement?: string;                 // ex: "carte bancaire", etc.
  facturation_info?: string;              // texte libre
  mot_de_passe?: string;
  identification: string;
  userId: number;                         // référence à usersTable.id
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
//--------------------------------------------------------------------- 
//------------------------1.1 Fonction insert one Formation  ----------
//---------------------------------------------------------------------
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
//---------------------------------------------------------------------
//------------------------1.2 Fonction select all Formation  ----------
//---------------------------------------------------------------------
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
//---------------------------------------------------------------------
//------------------------1.3 Fonction select one Formation  ----------
//---------------------------------------------------------------------
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
//---------------------------------------------------------------------
//------------------------1.4 Fonction update one Formation  ----------
//---------------------------------------------------------------------
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
//---------------------------------------------------------------------
//------------------------1.5 Fonction delete one Formation  ----------
//---------------------------------------------------------------------
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
//---------------------------------------------------------------------
//------------------------2.1 Fonction insertEvenment  ----------------
//---------------------------------------------------------------------
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


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------2.2  Fonction selectEvenement ---------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
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




//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------2.3  Fonction selectUnEvenement -------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
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
//--------------------------------------------------------------------------------
//------------------------2.4  Fonction updateUnEvenement ------------------------
//--------------------------------------------------------------------------------
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



//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//------------------------2.5  Fonction deleteUnEvenement ------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
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
//---------------------------------------------------------------------
//------------------------3.1 Début insert user -----------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function insertOneUser(user: FormatUserInput) {
  console.log("3.1.1 dbQuery insertOneUser, données:", user);


  try {
    //-----------------------------------------------------------------
    //------------------3.1.2 Vérifie si User existant ----------------
    //-----------------------------------------------------------------
    console.log("3.1.2 dbQuery insertOneUser, contrôle si user existe");
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email));


    //-----------------------------------------------------------------
    //------------------3.1.3 User existant ---------------------------
    //-----------------------------------------------------------------
    if (existingUser.length > 0) {
      console.log("3.1.3 dbQuery insertOneUser Utilisateur USER EXISTANT trouvé pour l'email:", user.email);
      const userFromDB = existingUser[0];


      function isNullOrEmpty(value?: string): boolean {
        return value == null || value === "";
      }
      
      const transformedUser: FormatUserInput = {
        nom_entreprise: isNullOrEmpty(user.nom_entreprise)
          ? (userFromDB.nom_entreprise ?? "")
          : user.nom_entreprise,
        personne_a_contacter: isNullOrEmpty(user.personne_a_contacter)
          ? (userFromDB.personne_a_contacter ?? "")
          : user.personne_a_contacter,
        ville: isNullOrEmpty(user.ville)
          ? (userFromDB.ville ?? "")
          : user.ville,
        code_postal: isNullOrEmpty(user.code_postal)
          ? (userFromDB.code_postal ?? "")
          : user.code_postal,
        telephone: isNullOrEmpty(user.telephone)
          ? (userFromDB.telephone ?? "")
          : user.telephone,
        date_de_naissance: isNullOrEmpty(user.date_de_naissance)
          ? (userFromDB.date_de_naissance ?? "")
          : user.date_de_naissance,
        date_creation: isNullOrEmpty(user.date_creation)
          ? (userFromDB.date_creation ?? "")
          : user.date_creation,
        email: isNullOrEmpty(user.email)
          ? (userFromDB.email ?? "")
          : user.email,
        username: isNullOrEmpty(user.username)
          ? (userFromDB.username ?? "")
          : user.username,
        status: isNullOrEmpty(user.status)
          ? (userFromDB.status ?? "")
          : user.status,
        domaine_activite: isNullOrEmpty(user.domaine_activite)
          ? (userFromDB.domaine_activite ?? "")
          : user.domaine_activite,
        employeur: isNullOrEmpty(user.employeur)
          ? (userFromDB.employeur ?? "")
          : user.employeur,
        status_professionnel: isNullOrEmpty(user.status_professionnel)
          ? (userFromDB.status_professionnel ?? "")
          : user.status_professionnel,
        adresse: isNullOrEmpty(user.adresse)
          ? (userFromDB.adresse ?? "")
          : user.adresse,
        imgUrl: isNullOrEmpty(user.imgUrl)
          ? (userFromDB.imgUrl ?? "")
          : user.imgUrl,
        btnUrlInt: isNullOrEmpty(user.btnUrlInt)
          ? (userFromDB.btnUrlInt ?? "")
          : user.btnUrlInt,
        btnUrlExt: isNullOrEmpty(user.btnUrlExt)
          ? (userFromDB.btnUrlExt ?? "")
          : user.btnUrlExt,
        btnTexte: isNullOrEmpty(user.btnTexte)
          ? (userFromDB.btnTexte ?? "")
          : user.btnTexte,
        btnModifUrl: isNullOrEmpty(user.btnModifUrl)
          ? (userFromDB.btnModifUrl ?? "")
          : user.btnModifUrl,
      };
      
      
      
      console.log("3.1.4 dbQuery insertOneUser USER EXISTANT :", transformedUser);
      console.log("3.1.5 dbQuery insertOneUser USER EXISTANT  userFromDB.id:", userFromDB.id);
      
      // Attendre la réponse de updateOneUser
      console.log("3.1.6 dbQuery insertOneUser USER EXISTANT  updateOneUser avant");
      const updateUserResult = await updateOneUser(userFromDB.id, transformedUser);
      if (updateUserResult.success) {
        console.log("3.1.7 dbQuery insertOneUser USER EXISTANT  updateOneUser success:");

        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////          STOP 1        ////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        return { 
          success: true, 
          message: "Un utilisateur existe déjà ; nous avons mis à jour son compte avec les informations fournies.", 
          user: userFromDB
        };
      } else {
        return { 
          success: false, 
          message: "L'utilisateur existe déjà, mais la mise à jour a échoué : " + updateUserResult.message, 
          user: userFromDB
        };
      }
    }


    //-----------------------------------------------------------------
    //------------------3.1.3 User NON existant -----------------------
    //-----------------------------------------------------------------
    console.log("3.1.6 dbQuery insertOneUser USER NON EXISTANT insertUser debut");
    const defaultDate = new Date().toISOString().slice(0, 10); // format "YYYY-MM-DD"
    const userToInsert = {
      ...user,
      date_creation: user.date_creation.trim() === "" ? defaultDate : user.date_creation,
      date_de_naissance: user.date_de_naissance 
        ? (user.date_de_naissance.trim() === "" ? null : user.date_de_naissance)
        : null,
      telephone: user.telephone 
        ? (user.telephone.trim() === "" ? null : user.telephone)
        : null,
      username: user.username 
        ? (user.username.trim() === "" ? null : user.username)
        : null,
    };

    //------------------3.1.7 Inserer USER -----------------------
    const insertUserResult = await db.insert(usersTable).values(userToInsert).returning();
    console.log("3.1.7 dbQuery insertOneUser USER NON EXISTANT insertUser try après");

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////          STOP 1        ////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    return { 
      success: true, 
      message: "Utilisateur ajouté avec succès !",
      user: insertUserResult[0]
    };
  } catch (error) {
    console.error("3.1.8 dbQuery insertUser USER NON EXISTANT insertUser Erreur:", error);
    return { 
      success: false, 
      message: "Une erreur est survenue lors de l'ajout de l'utilisateur.",
      user: null
     };
  }
}




//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------3.2 Début select tout users -----------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function selectUsers() {
  console.log("3.2.0 dbQuery all selectUsers");
  try {
    console.log("3.2.1 dbQuery all selectUsers try avant");
    const users = await db.select().from(usersTable);
    console.log("3.2.2 dbQuery all selectUsers try après => users:", users);

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////          STOP 1        ////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    return { 
      success: true, 
      message: "selection des users avec Success.",
      user: users
     };;
  } catch (error) {
    console.error("3.2.3 dbQuery all selectUsers Erreur lors de la sélection des utilisateurs :", error);
    return { 
      success: false, 
      message: "selection des users Erreur",
      user: null
     };
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------3.3 Début select one users ------------------
//---------------------------------------------------------------------
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

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////          STOP 1        ////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    return { 
      success: false, 
      message: "selection de un user Success",
      user: user[0]
     };
  } catch (error) {
    console.error("3.3.3 dbQuery selectOneUsers Erreur lors de la sélection de l'utilisateur :", error);
    return { 
      success: false, 
      message: "selection de un user Erreur",
      user: null
     };
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------3.4 Début select one users with email et mot de passe 
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function selectUserWithEmailAndPassword(
  email: string,
  motDePasse: string
): Promise<{ success: boolean; message: string; user: any }> {
  console.log("3.4.1 selectUserWithEmailAndPassword avec l'email:", email);

  try {
    //-----------------------------------------------------------------
    // 3.4.2 Vérifie si User existant 
    //-----------------------------------------------------------------
    console.log("3.4.2 dbQuery selectUserWithEmailAndPassword, contrôle si user existe");
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUser.length === 0) {
      console.log("3.4.3 selectUserWithEmailAndPassword user non existant pour cet email");
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////          STOP 1        ////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
      return {
        success: false,
        message: "Identifiants incorrects.",
        user: null,
      };
    }

    //-----------------------------------------------------------------
    // 3.4.4 Rechercher User+SaaS avec mot de passe et abonnement actif
    //-----------------------------------------------------------------
    const result = await db
      .select()
      .from(usersTable)
      .innerJoin(saasTable, eq(usersTable.id, saasTable.userId))
      .where(
        and(
          eq(usersTable.email, email),
          eq(saasTable.mot_de_passe, motDePasse),
          eq(saasTable.status_abonnement, "actif")
        )
      )
      .limit(1);

    //-----------------------------------------------------------------
    // 3.4.5 Authentification réussie ou non
    //-----------------------------------------------------------------
    if (result.length > 0) {
      console.log("3.4.6 selectUserWithEmailAndPassword authentification réussie :", result[0]);
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////          STOP 2        ////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
      return {
        success: true,
        message: "Authentification réussie.",
        user: result[0],
      };
    } else {
      console.log("3.4.7 selectUserWithEmailAndPassword mot de passe incorrect ou SaaS inactif");
      return {
        success: false,
        message: "Identifiants incorrects ou abonnement inactif.",
        user: null,
      };
    }

  } catch (error) {
    console.error("3.4.8 Erreur lors de la sélection de l'utilisateur :", error);
    return {
      success: false,
      message: `Une erreur est survenue : ${error}`,
      user: null,
    };
  }
}





//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------3.5 Début update one user -------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function updateOneUser(id: number, user: FormatUserInput) {
  console.log("3.5.0 dbQuery updateUsers avec l'id: ", id);
  try {
    const defaultDate = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    const userToUpdate = {
      ...user,
      date_de_naissance: user.date_de_naissance 
        ? (user.date_de_naissance.trim() === "" ? null : user.date_de_naissance)
        : null,
      telephone: user.telephone 
        ? (user.telephone.trim() === "" ? null : user.telephone)
        : null,
      username: user.username 
        ? (user.username.trim() === "" ? null : user.username)
        : null,
    };
    console.log("3.5.2 dbQuery updateUsers try avant");
    const updateOneUserResult = await db
      .update(usersTable)
      .set(userToUpdate)
      .where(eq(usersTable.id, id)
    );
    console.log("3.5.3 dbQuery updateUsers try après");

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////          STOP 1        ////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    return { 
      success: true, 
      message: "Utilisateur mis à jour avec succès !",
      user: userToUpdate
    };
  } catch (error) {
    console.error("3.5.4 dbQuery updateUsers Erreur lors de la mise à jour de l'utilisateur :", error);
    return { 
      success: false, 
      message: "Une erreur est survenue lors de la mise à jour de l'utilisateur.",
      user: null };
  }
}



//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------3.6 Début delete one users ------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function deleteOneUser(id: number) {
  console.log("3.6.0 dbQuery deleteUsers avec l'id: ", id);
 
  try {
    console.log("3.6.1 dbQuery deleteUsers try avant");
    await db.delete(usersTable).where(eq(usersTable.id, id));
    console.log("3.6.2 dbQuery deleteUsers try après");

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////          STOP 1        ////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    return { 
      success: true, 
      message: "Utilisateur supprimé avec succès !",
      user: id };
  } catch (error) {
    console.error("3.6.2 dbQuery deleteUsers Erreur lors de la suppression de l'utilisateur :", error);
    return { 
      success: false, 
      message: "Une erreur est survenue lors de la suppression de l'utilisateur.",
      user: null };
  }
}



//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------3.7 Début select User With Active Saas 
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function selectUserWithActiveSaas(
  email: string,
  motDePasse: string
): Promise<{ success: boolean; message: string; user?: any }> {
  console.log("3.7.0 dbQuery selectUserWithActiveSaas:");

  try {
    // Effectuer la jointure entre users et saas ,
    // et filtre sur user.email / user.MotdePass / saas.status le status 
    const selectUserWithSaasResult = await db
      .select()
      .from(usersTable)
      .innerJoin(saasTable, eq(usersTable.id, saasTable.userId))
      .where(
        and(
          eq(usersTable.email, email),
          eq(saasTable.status_abonnement, "actif")
        )
      )
      .limit(1);

    if (selectUserWithSaasResult.length > 0) {
      console.log("3.7.1 dbQuery selectUserWithActiveSaas abonnement actif:")

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////          STOP 1        ////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
      return { 
        success: true, 
        message: "Client trouvé avec abonnement actif", 
        user: selectUserWithSaasResult[0],
      };
    } else {
      console.log("3.7.2 dbQuery deleteUsers selectUserWithActiveSaas non abonnement actif:");
      return { 
        success: false, 
        message: "Aucun client trouvé ou abonnement non actif", 
        user: null };
    }
  } catch (error: any) {
    console.log("3.7.3 dbQuery deleteUsers selectUserWithActiveSaas erreur:", error);
    return { 
      success: false, 
      message: "Une erreur est survenue lors de la recherche du client.",
      user: null };
  }
}






//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//-------------3.8 Début insert user pour inscription -----------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function insertOneUserInscription(user: FormatUserInput, saasMotdePasse: string) {
  console.log("3.8.1 dbQuery insertOneUserInscription, user:", user);

  try {
    //-----------------------------------------------------------------
    // 3.8.2 Vérifie si User existant 
    //-----------------------------------------------------------------
    console.log("3.8.2 dbQuery inOneUserInscri, contrôle si user existe");
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email));

    ///////////////////////////////////////////////////////////////////
    // 3.8.3 DEBUT USER EXISTANT
    ///////////////////////////////////////////////////////////////////
    if (existingUser.length > 0) {
      console.log(
        "3.8.3 dbQuery inOneUserInscri USER EXIST trouvé pour l'email:",
        user.email
      );
      
      //-----------------------------------------------------------------
      // 3.8.4 USER EXISTANT => Rechercher User avec mot de passe dans table Saas
      //-----------------------------------------------------------------
      const result = await db
        .select()
        .from(usersTable)
        .innerJoin(saasTable, eq(usersTable.id, saasTable.userId))
        .where(
          and(
            eq(usersTable.email, user.email),
            eq(saasTable.status_abonnement, "actif")
          )
        )
        .limit(1);

      //-----------------------------------------------------------------
      // 3.8.5 USER EXISTANT => User avec mot de passe dans table Saas existe
      if (result.length > 0) {
        console.log(
          "3.8.5 dbQuery inOneUserInscri USER EXIST avec email et mot_de_passe."
        );
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////          STOP 1        //////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        return {
          success: false,
          message: "Vous êtes déjà inscrit",
          user: result[0].users,
          saas: result[0].saas
        };
      }

      //-----------------------------------------------------------------
      // 3.8.6 USER EXISTANT => Création new Saas
      const saasDataForExistingUser: FormatSaasInput = {
        plan: "Free",
        plan_details: {},
        date_debut_abonnement: new Date().toISOString().slice(0, 10), // format "YYYY-MM-DD"
        status_abonnement: "actif",
        status_paiement: "non payé",
        mot_de_passe:  saasMotdePasse,
        identification: user.email  === "golliard73@gmail.com"? "jerome1872Troistorrents": "user2025Nethelvetic",
        userId: existingUser[0].id,
      };
      const saasInsertResult = await insertSaas(saasDataForExistingUser);

      //-----------------------------------------------------------------
      // 3.8.6 USER EXISTANT => Création new Saas
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////          STOP 2        //////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      if (saasInsertResult.success) {
        console.log("3.8.6 dbQuery inOneUserInscri USER EXIST => insSaas SUCCES");
        return {
          success: true,
          message: "Client inscrit",
          user: existingUser,
          saas: saasInsertResult.saas
        };
      } else {
        console.log("3.8.7 dbQuery inOneUserInscri USER EXIST => insSaas NO SUCCES");
        return {
          success: false,
          message: "Client non inscrit",
          user: existingUser,
          saas: null
        };
      }

    } else {
      ///////////////////////////////////////////////////////////////////
      // FIN FIN FIN USER EXISTANT
      ///////////////////////////////////////////////////////////////////

      ///////////////////////////////////////////////////////////////////
      // DEBUT USER NON EXISTANT
      ///////////////////////////////////////////////////////////////////

      //-----------------------------------------------------------------
      // 3.8.8 USER NON EXISTANT => Définir une var pour le data USER
      console.log("3.8.8 dbQuery inOneUserInscri USER NO EXIST ");
      const defaultDate = new Date().toISOString().slice(0, 10); // format "YYYY-MM-DD"
      const userToInsert = {
        ...user,
        date_creation:
          user.date_creation.trim() === "" ? defaultDate : user.date_creation,
        date_de_naissance: user.date_de_naissance
          ? user.date_de_naissance.trim() === ""
            ? null
            : user.date_de_naissance
          : null,
        telephone: user.telephone
          ? user.telephone.trim() === ""
            ? null
            : user.telephone
          : null,
        username: user.username
          ? user.username.trim() === ""
            ? null
            : user.username
          : null,
        imgUrl: user.imgUrl
          ? user.imgUrl.trim() === ""
            ? "/singeCalculateur.webp"
            : user.imgUrl
          : "/singeCalculateur.webp",
      };

      //-----------------------------------------------------------------
      // 3.8.9 USER NON EXISTANT => creation user
      const userInserted = await db
        .insert(usersTable)
        .values(userToInsert)
        .returning();
      console.log("3.8.9 dbQuery inOneUserInscri USER NO EXIST => inUser SUCCES");

      //-----------------------------------------------------------------
      // 3.8.10 USER NON EXISTANT => creation user success
      if (userInserted) {
        //-----------------------------------------------------------------
        // 3.8.11 USER NON EXISTANT => creation user success => Création new Saas avec User.Id
        console.log("3.8.10 dbQuery inOneUserInscri USER NO EXIST => inUser SUCCES => insSaas ");

        const saasData: FormatSaasInput = {
          plan: "Free",
          plan_details: {},
          date_debut_abonnement: new Date().toISOString().slice(0, 10), // format "YYYY-MM-DD"
          status_abonnement: "actif",
          status_paiement: "non payé",
          mot_de_passe: saasMotdePasse,
          identification: user.email  === "golliard73@gmail.com"? "jerome1872Troistorrents": "user2025Nethelvetic",
          userId: userInserted[0].id,
        };
        const saasInsertResult = await insertSaas(saasData);

        //-----------------------------------------------------------------
        // 3.8.12 USER NON EXISTANT => creation user success => Creation Saas
        if (saasInsertResult.success) {
          console.log("3.8.12 dbQuery inOneUserInscri USER NO EXIST => inUser SUCCES => inSaas SUCCES");

          //////////////////////////////////////////////////////////////////
           //////////////////////////////////////////////////////////////////
           //////////////          STOP 3        ////////////////////////////
           //////////////////////////////////////////////////////////////////
           //////////////////////////////////////////////////////////////////
          return {
            success: true,
            message: "Utilisateur ajouté avec succès !",
            user: userInserted[0],
            saas: saasInsertResult.saas,
          };
        } else {
          console.log("3.8.13 dbQuery inOneUserInscri USER NO EXIST => inUser SUCCES=> inSaas NO success");
          return {
            success: false,
            message: "Utilisateur non inscrit !",
            user: userInserted[0],
            saas: saasInsertResult.saas,
          };
        }
      } else {
        console.log("3.8.14 dbQuery inOneUserInscri USER NO EXIST => inUser NO SUCCES");

      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////          STOP 4        ////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
        return {
          success: false,
          message: "erreur d'inscription !",
          user: null,
          saas: null
        };
      }
    }
    ///////////////////////////////////////////////////////////////////
    // FIN FIN FIN USER NON EXISTANT
    ///////////////////////////////////////////////////////////////////

  } catch (error) {
    console.error(
      "3.8.14 dbQuery insertOneUserInscription erreur",
      error
    );
    return {
      success: false,
      message: "Une erreur est survenue lors de l'ajout de l'utilisateur.",
    };
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
//---------------------------------------------------------------------
//------------------------4.1Fonction selectMessage -------------------
//---------------------------------------------------------------------
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
//---------------------------------------------------------------------
//------------------------4.2 Fonction selectOneMessage ---------------
//---------------------------------------------------------------------
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
//---------------------------------------------------------------------
//------------------------4.3 Fonction updateOneMessage ---------------
//---------------------------------------------------------------------
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
//---------------------------------------------------------------------
//------------------------4.4 Fonction deleteOneMessage ---------------
//---------------------------------------------------------------------
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
//---------------------------------------------------------------------
//------------------------4.5 Fonction insertOneMessage ---------------
//---------------------------------------------------------------------
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







// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//                        DEFINR TABLES SAAS
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------





//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------5.0 Fonction insertSaas ---------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function insertSaas(saas: FormatSaasInput) {
  console.log("5.0.1 insertSaas - Début, données:", saas);
  try {
    const saasTableInsertResult = await db.insert(saasTable).values(saas).returning();
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////          STOP 1        ////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
    return { 
      success: true, 
      message: "SaaS record inserted successfully", 
      user: null,
      saas: saasTableInsertResult
    };
  } catch (error) {
    console.error("5.0.3 dbQuery insertSaas - No succès", error);

        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////          STOP 2        ////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
    return { 
      success: false, 
      message: "Error inserting SaaS record",
      user: null,
      saas: null
    };
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------5.2 Fonction selectSaas ---------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function selectSaas() {
  console.log("5.2.1 selectSaas - Début");
  try {
    const records = await db.select().from(saasTable);
    console.log("5.2.2 selectSaas - SaaS records récupérés :", records);
    return records;
  } catch (error) {
    console.error("5.2.3 selectSaas - Erreur lors de la sélection :", error);
    throw error;
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------5.3 Fonction selectUnSaas -------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function selectUnSaas(id: number) {
  console.log("5.3.1 selectUnSaas - Début, id:", id);
  try {
    const record = await db
      .select()
      .from(saasTable)
      .where(eq(saasTable.id, id))
      .limit(1);
    console.log("5.3.2 selectUnSaas - SaaS record récupéré :", record);
    return record;
  } catch (error) {
    console.error("5.3.3 selectUnSaas - Erreur lors de la sélection :", error);
    throw error;
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------5.4 Fonction updateUnSaas -------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function updateUnSaas(id: number, saas: FormatSaasInput) {
  console.log("5.4.1 updateUnSaas - Début, id:", id);
  try {
    await db
      .update(saasTable)
      .set(saas)
      .where(eq(saasTable.id, id));
    console.log("5.4.2 updateUnSaas - SaaS record mis à jour avec succès");
    return { success: true, message: "SaaS record updated successfully" };
  } catch (error) {
    console.error("5.4.3 updateUnSaas - Erreur lors de la mise à jour :", error);
    return { success: false, message: "Error updating SaaS record" };
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------5.5 Fonction deleteUnSaas -------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function deleteUnSaas(id: number) {
  console.log("5.5.1 deleteUnSaas - Début, id:", id);
  try {
    await db.delete(saasTable).where(eq(saasTable.id, id));
    console.log("5.5.2 deleteUnSaas - SaaS record supprimé avec succès");
    return { success: true, message: "SaaS record deleted successfully" };
  } catch (error) {
    console.error("5.5.3 deleteUnSaas - Erreur lors de la suppression :", error);
    return { success: false, message: "Error deleting SaaS record" };
  }
}



//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------5.5 Fonction selectionSaasWithEmailAndPassword -------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
