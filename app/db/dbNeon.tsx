import "dotenv/config"; 
import { neon } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, isNotNull, not } from "drizzle-orm";
import { formationTable, evenementsTable, usersTable, messageTable, crmUsersTable, crmUser_UsersTable, offresTable } from "./schema";


// 105  TABLES FORMATION
// 119    - insert one Formation
// 142    - select all Formation
// 219  TABLES EVENEMENT
// 404  TABLES USER
// 417    - insert user
// 572    - select one user
// 613    - select all users
// 617    - update one user
// 632    - select one user with email et mot de passe
// 684    - update one user
// 668    - select User With Active crm 
// 825  TABLES MESSAGE
// 945  TABLES crmUser
// 1001    - crmUsersAllSelect
// 1198    - insert crmUser pour inscription 
// 1421 TABLEs crmUser_user



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


type TypeCrmUsers_user = {
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
  userId: number; 
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

// Typage pour la table offresTable
type TypeOffreInput = {
  produits: any; // détails produits ou services au format JSON
  total_ht: number;
  total_ttc: number;
  statut: string;
  pieces_jointes?: any;
  cree_le: string;
  modifie_le: string;
  userId: number;
};


// Typage pour la table crmUsersTable
type TypeCrmUsers = {
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

  console.log("1.1.0 dbNeon  insertFormation : formation= ", formation);

  try {
    console.log("1.1.1 dbNeon  insertFormation try avant");
    await db.insert(formationTable).values(formation);
    console.log("1.1.2 dbNeon  insertFormation try await après");
    return { 
      success: true, 
      message: "4.3 Formation ajoutée avec succès !" };
  } catch (error) {
    console.error("1.1.4 dbNeon  Erreur lors de l'insertion de la formation :", error);
    return { 
      success: false, 
      message: "Une erreur est survenue lors de l'ajout de la formation." };
  }
}



//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------1.2 Fonction select all Formation  ----------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function selectAllFormations() {
  try {
    console.log("1.2.1 dbNeon  selectFormation try avant");
    const formations = await db.select().from(formationTable);
    console.log("1.2.1 dbNeon  selectFormation try après => formations", formations);
    return { 
      success: true, 
      message: "La sélection de toutes les formations a été effectuée avec succès.", 
      formations: formations
    };
    
  } catch (error) {
    return { 
      success: false, 
      message: "La sélection de toutes les formations a échoué.", 
      erreur: error
    };
  }
}



//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------1.3 Fonction select one Formation  ----------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function selectUneFormation(id: number) {
  console.log("1.3.0 dbNeon  selectUneFormation avec l'id= ", id);
  try {
    console.log("1.3.1 dbNeon  selectUneFormation OK ou NO OK");
    const uneFormation = await db
      .select()
      .from(formationTable)
      .where(eq(formationTable.id, id))
      .limit(1); // Optionnel : pour limiter le résultat à un seul enregistrement
   console.log("1.3.2 dbNeon  selectUneFormation OK: ", uneFormation);
    return { 
      success: true, 
      message: "La sélection d'une formation a été effectuée avec succès.", 
      formation: uneFormation
    };
    
  } catch (error) {
    return { 
      success: false, 
      message: "La sélection d'une formation a été effectuée avec succès.", 
      erreur: error
    };
  }
}



//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------1.4 Fonction update one Formation  ----------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function updateUneFormation(id: number, formation: FormatEventInput) {
  console.log("1.4.0 dbNeon  upDateUneFormation avec l'id= ", id);
  try {
    console.log("1.4.1 dbNeon  upDateUneFormation avant");
    await db
      .update(formationTable)
      .set(formation)
      .where(eq(formationTable.id, id));
    console.log("1.4.2 dbNeon  upDateUneFormation après");
    return { success: true, message: "Formation mise à jour avec succès !" };
  } catch (error) {
    console.error("1.4.2 dbNeon  Erreur lors de la mise à jour de la formation :", error);
    return { success: false, message: "Une erreur est survenue lors de la mise à jour de la formation." };
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------1.5 Fonction delete one Formation  ----------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function deleteUneFormation(id: number) {
  console.log("1.5.0 dbNeon  deleteUneFormation avec l'id= ", id);
  try {
    console.log("1.5.1 dbNeon  deleteUneFormation try avant ");
    await db.delete(formationTable).where(eq(formationTable.id, id));
    console.log("1.5.2 dbNeon  deleteUneFormation try après ");
    return { success: true, message: "Formation supprimée avec succès !" };
  } catch (error) {
    console.error("1.5.2 dbNeon  deleteUneFormation Erreur lors de la suppression de la formation :", error);
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
 console.log("2.1.0 dbNeon   insertEvenement : evenement= ", evenement);

  try {
    console.log("2.1.1 dbNeon  insertEvenement try avant");
    await db.insert(evenementsTable).values(evenement);
    console.log("2.1.2 dbNeon  insertEvenement try await après");
    return { success: true, message: "2.1.3 dbNeon  insertEvenement Evenement ajoutée avec succès !" };
  } catch (error) {
    console.error("2.1.4 dbNeon  insertEvenement Erreur:", error);
    return { success: false, message: "Une erreur est survenue lors de l'ajout d'un évenement." };
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------2.2  Fonction selectEvenement ---------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function selectEvenements() {
  console.log("2.2.0 dbNeon   selectEvenements");
  try {
    console.log("2.2.1 dbNeon   selectEvenements try avant");
    const evenements = await db.select().from(evenementsTable);
    console.log("2.2.2 dbNeon   selectEvenements try après");
    return evenements;
  } catch (error) {
    console.error("2.2.3 dbNeon  selectEvenements Erreur :", error);
    throw error;
  }
}




//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------2.3  Fonction selectUnEvenement -------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function selectUnEvenement(id: number) {
  console.log("2.3.0  dbNeon  selectUnEvenement avec l'id= ", id);
  try {
    console.log("2.3.1  dbNeon  selectUnEvenement try avant");
    const unEvenement = await db
      .select()
      .from(evenementsTable)
      .where(eq(evenementsTable.id, id))
      .limit(1); // Optionnel : pour limiter le résultat à un seul enregistrement
      console.log("2.3.2  dbNeon  selectUnEvenement try après => unEvenement: ", unEvenement);
    return unEvenement;
  } catch (error) {
    console.error("2.3.3 dbNeon  selectUnEvenement erreur: ", error);
    throw error;
  }
}


//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//------------------------2.4  Fonction updateUnEvenement ------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
export async function updateUnEvenement(id: number, evenement: FormatEventInput) {
  console.log("2.4.0 dbNeon   updateUnEvenement avec l'id:", id);

  try {
    console.log("2.4.1 dbNeon   updateUnEvenement try avant");
    await db
      .update(evenementsTable)
      .set(evenement)
      .where(eq(evenementsTable.id, id));
      console.log("2.4.2 dbNeon   updateUnEvenement try après");
    return { success: true, message: "Evenement mise à jour avec succès !" };
  } catch (error) {
    console.error("2.4.3 dbNeon  updateUnEvenement erreur:", error);
    return { success: false, message: "Une erreur est survenue lors de la mise à jour de l'événement." };
  }
}



//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//------------------------2.5  Fonction deleteUnEvenement ------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
export async function deleteUnEvenement(id: number) {
  console.log("2.5.0 dbNeon   deleteUnEvenement avec l'id:", id);

  try {
    console.log("2.5.1 dbNeon   deleteUnEvenement try avant");
    await db.delete(evenementsTable).where(eq(evenementsTable.id, id));
    console.log("2.5.2 dbNeon   deleteUnEvenement try après");
    return { success: true, message: "Evénement supprimée avec succès !" };
  } catch (error) {
    console.error("2.5.3 dbNeon   deleteUnEvenement Erreur:", error);
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
//------------------------3.1  Début insert user-----------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
// export async function userOneInsert(user: FormatUserInput) {
export async function userOneInsert (user: FormatUserInput) {
  console.log("3.1.1 dbNeon  userOneInsert, données:", user);


  //--------------------------------------------------------------
  // 3.1.2 .?/ dbNeon  userOneInsert => User exist OK/NO
  //--------------------------------------------------------------
  try {
    console.log("3.1.2 .?/ dbNeon  userOneInsert => User exist OK/NO");
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email));


    //--------------------------------------------------------------
    // 3.1.3 ../ dbNeon  userOneInsert=> User exist OK
    //--------------------------------------------------------------
    if (existingUser.length > 0) {
      console.log("3.1.3 ../ dbNeon  userOneInsert => User exist", user.email);
      const userFromDB = existingUser[0];

    //--------------------------------------------------------------
    // 3.1.3 ../.? dbNeon  userOneInsert => USER exist => upDate User OK/NO
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
      
      console.log("3.1.4 ../.?/ dbNeon  userOneInsert => USER exist => upDate User OK/NO", transformedUser);
   
      const userUpdateRes = await userOneUpDate(userFromDB.id, transformedUser);

      //------------------------------------------------------------
      // 3.1.5 ../.. dbNeon  userOneInsert => USER OK => upDate OK
      if (userUpdateRes.success) {
        console.log("3.1.5 ../../ dbNeon  userOneInsert => USER exist => upDate OK");

        /////////////////////////////////////////////
         /////////////////////////////////////////////
         //////        STOP 1        /////////////////
         /////////////////////////////////////////////
         /////////////////////////////////////////////
        return { 
          success: true, 
          message: "Un utilisateur existe déjà ; nous avons mis à jour son compte avec les informations fournies.", 
          user: userFromDB
        };
      } else {
        return { 
          success: false, 
          message: "L'utilisateur existe déjà, mais la mise à jour a échoué : " + userUpdateRes.message, 
          user: userFromDB
        };
      }
    }


    //-------------------------------------------------------------
    //3.1.6 ../ dbNeon  userOneInsert => USER no exist
    //--------------------------------------------------------------
    console.log("3.1.6 ../ dbNeon  userOneInsert => USER no exist");

    //--------------------------------------------------------------
    // 3.1.7 ../.? dbNeon  userOneInsert => USER no exist => insert User OK/NO

    try {
      
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
  
      console.log("3.1.7 ../.?/ dbNeon  userOneInsert => USER no exist => insert User OK/NO", userToInsert);
      const userInsertRes = await db
      .insert(usersTable)
      .values(userToInsert)
      .returning();
  
  
      //--------------------------------------------------------------
      // 3.1.8 ../.. dbNeon  userOneInsert => USER no exist => insert User OK
      console.log("3.1.8 ../../ dbNeon  userOneInsert => USER no exist => insert User OK");
  
      /////////////////////////////////////////////
      /////////////////////////////////////////////
      //////        STOP 1,2,3        /////////////
      /////////////////////////////////////////////
      /////////////////////////////////////////////
      return { 
        success: true, 
        message: "Utilisateur ajouté avec succès !",
        user: userInsertRes[0]
      };

  //--------------------------------------------------------------
  // 3.1.9 ../../ dbNeon  userOneInsert => USER no exist => insert User erreur" 
    } catch (error) {
      console.error("3.1.9 ../../ dbNeon  userOneInsert => USER no exist => insert User NO OK", error);
      return {
        success: false,
        message: "Nouvel enregistrement CRM utilisateur créé.",
        user: null,
      };   
    }

  //--------------------------------------------------------------
  // 3.1.9 ../ dbNeon  crmUser_userInsert=> USER Ok/NO erreur" 
  } catch (error) {
    console.error("3.1.9 ../ dbNeon  userOneInsert => USER OK/NO erreur", error);
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
export async function usersSelect() {
  console.log("3.2.0 dbNeon usersSelect debut");
  try {
    console.log("3.2.1 dbNeon usersSelect ok/No");
    const users = await db.select().from(usersTable);
    console.log("3.2.2 dbNeon usersSelect ok");

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
    console.error("3.2.3 dbNeon usersSelect no Ok", error);
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
export async function userOneSelect(id: number) {
  console.log("3.3.0 dbNeon  selectOneUsers avec l'id: ", id);
  try {
    console.log("3.3.1 dbNeon  selectOneUsers try avant");
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
      console.log("3.3.2 dbNeon  selectOneUsers OK:  ", user);

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////          STOP 1        ////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    return { 
      success: true, 
      message: "selection de un user Ok",
      user: user[0]
     };
  } catch (error) {
    console.error("3.3.3 dbNeon  selectOneUsers NO OK:  ", error);
    return { 
      success: false, 
      message: "selection de un user Erreur",
      user: null
     };
  }
}




//------------------------------------------------------------------
//--------------------------------------------------------------------
//------------------------3.5 Début update one user -----------------
//------------------------------------------------------------------
//------------------------------------------------------------------
export async function userOneUpDate(id: number, user: FormatUserInput) {
  console.log("3.5.0 dbNeon  updateUsers avec l'id: ", id);
  try {
    // On remplace les chaînes vides par `undefined` (Drizzle accepte undefined mais pas null)
    const userToUpdateRaw = {
      ...user,
      date_de_naissance:
        user.date_de_naissance?.trim() === "" ? undefined : user.date_de_naissance,
      date_creation:
        user.date_creation?.trim() === "" ? undefined : user.date_creation,
      telephone:
        user.telephone?.trim() === "" ? undefined : user.telephone,
      username:
        user.username?.trim() === "" ? undefined : user.username,
    };


    console.log("3.5.2 dbNeon  updateUsers OK/NO");
    const updateOneUserRes = await db
      .update(usersTable)
      .set(userToUpdateRaw)
      .where(eq(usersTable.id, id));
    console.log("3.5.3 dbNeon  updateUsers OK");

    return {
      success: true,
      message: "Utilisateur mis à jour avec succès !",
      user: userToUpdateRaw
    };
  } catch (error) {
    console.error("3.5.4 dbNeon  updateUsers NO OK", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour de l'utilisateur.",
      user: null
    };
  }
}



//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------3.6 Début delete one users ------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function userOneDelete(id: number) {
  console.log("3.6.0 dbNeon  deleteUsers avec l'id: ", id);
 
  try {
    console.log("3.6.1 dbNeon  deleteUsers try avant");
    await db.delete(usersTable).where(eq(usersTable.id, id));
    console.log("3.6.2 dbNeon  deleteUsers try après");

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
    console.error("3.6.2 dbNeon  deleteUsers Erreur lors de la suppression de l'utilisateur :", error);
    return { 
      success: false, 
      message: "Une erreur est survenue lors de la suppression de l'utilisateur.",
      user: null };
  }
}



//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------3.7 Début sIdentifiants corrects mais abonnement inactif.elect User With Active crm 
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function crmUserActif(
  email: string,
): Promise<{ success: boolean; message: string; user?: any }> {
  console.log("3.7.0 dbNeon  crmUserActif:");

  try {
    // Effectuer la jointure entre users et crm ,
    // et filtre sur user.email / user.MotdePass / crm.status le status 
    const crmUserActifRes = await db
      .select()
      .from(usersTable)
      .innerJoin(crmUsersTable, eq(usersTable.id, crmUsersTable.userId))
      .where(
        and(
          eq(usersTable.email, email),
          eq(crmUsersTable.status_abonnement, "actif")
        )
      )
      .limit(1);

    if (crmUserActifRes .length > 0) {
      console.log("3.7.1 dbNeon  crmUserActif abonnement actif:")

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////          STOP 1        ////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
      return { 
        success: true, 
        message: "Client trouvé avec abonnement actif", 
        user: crmUserActifRes[0],
      };
    } else {
      console.log("3.7.2 dbNeon  deleteUsers crmUserActif non abonnement actif:");
      return { 
        success: false, 
        message: "Aucun client trouvé ou abonnement non actif", 
        user: null };
    }
  } catch (error: any) {
    console.log("3.7.3 dbNeon  deleteUsers crmUserActif erreur:", error);
    return { 
      success: false, 
      message: "Une erreur est survenue lors de la recherche du client.",
      user: null };
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
  console.log("4.1.0 dbNeon  selectMessage: début");
  try {
    const messages = await db.select().from(messageTable);
    console.log("4.1.2 dbNeon  selectMessage: fin", messages);
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
  console.log("4.2.0 dbNeon  selectOneMessage avec l'id :", id);
  try {
    const message = await db
      .select()
      .from(messageTable)
      .where(eq(messageTable.id, id))
      .limit(1); // Limiter à un seul enregistrement
    console.log("4.2.1 dbNeon  selectOneMessage: fin", message);
    return message;
  } catch (error) {
    console.error("4.2.2 dbNeon  selectOneMessage Erreur:", error);
    throw error;
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------4.3 Fonction updateOneMessage ---------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function updateOneMessage(id: number, messageData: FormatMessageInput) {
  console.log("4.3.0 dbNeon  updateOneMessage avec l'id :", id);
  try {
    await db
      .update(messageTable)
      .set(messageData)
      .where(eq(messageTable.id, id));
    console.log("4.3.1 dbNeon  updateOneMessage: fin");
    return { success: true, message: "Message mis à jour avec succès !" };
  } catch (error) {
    console.error("4.3.2 dbNeon  updateOneMessage Erreur", error);
    return { success: false, message: "Une erreur est survenue lors de la mise à jour du message." };
  }
}



//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------4.4 Fonction deleteOneMessage ---------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function deleteOneMessage(id: number) {
  console.log("4.4.0 dbNeon  deleteOneMessage avec l'id :", id);
  try {
    await db.delete(messageTable).where(eq(messageTable.id, id));
    console.log("4.4.1 dbNeon  deleteOneMessage: fin");
    return { success: true, message: "Message supprimé avec succès !" };
  } catch (error) {
    console.error("4.4.1 dbNeon  deleteOneMessage Erreur: ", error);
    return { success: false, message: "Une erreur est survenue lors de la suppression du message." };
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------4.5 Fonction insertOneMessage ---------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function insertOneMessage(messageData: FormatMessageInput) {
  console.log("4.5.0 dbNeon  insertOneMessage, données:", messageData);
  try {
    await db.insert(messageTable).values(messageData);
    console.log("4.5.1 dbNeon  insertOneMessage: insertion réussie");
    return { success: true, message: "Message ajouté avec succès !" };
  } catch (error) {
    console.error("4.5.2 dbNeon  insertOneMessage Erreur: ", error);
    return { success: false, message: "Une erreur est survenue lors de l'ajout du message." };
  }
}







// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//                        DEFINR TABLES crmUsers
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------





//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------5.0 Fonction crmUser Insert -----------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function crmUserInsert(crmUser: TypeCrmUsers) {
  console.log("5.0.1 dbNeon  crmUserInsert - Début, données:", crmUser);
  try {
    const crmUsersTableInsertResult = await db.insert(crmUsersTable).values(crmUser).returning();
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////          STOP 1        ////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
    return { 
      success: true, 
      message: "crm record inserted successfully", 
      user: null,
      crmUser: crmUsersTableInsertResult
    };
  } catch (error) {
    console.error("5.0.3 dbNeon  insertcrm - No succès", error);

        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////          STOP 2        ////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
    return { 
      success: false, 
      message: "Error inserting crm record",
      user: null,
      crmUser: null
    };
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------5.2 Fonction crmUsersAll Select -------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function crmUsersAllSelect() {
  console.log("5.2.1 dbNeon  crmUsersAllSelect - Début");
  try {
    console.log("5.2.2 dbNeon  crmUsersAllSelect  OK/NO");
    const crmUsersAllSelectRes = await db.select().from(crmUsersTable);
    console.log("5.2.2 dbNeon  crmUsersAllSelect  OK: ", crmUsersAllSelectRes );
    return { 
      success: true, 
      message: "crm record updated successfully" ,
      crmUsers: crmUsersAllSelectRes
      };
  } catch (error) {
    console.error("5.2.3 dbNeon  crmUsersAllSelect Erreur :", error);
    return { 
      success: false, 
      message: "crm record updated successfully" ,
      crmUsers: null
      }; 
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------5.3 Fonction crmUserOneSelect ---------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function crmUserOneSelect(id: number) {
  console.log("5.3.1 dbNeon  crmUserOneSelect - Début, id:", id);
  try {
    const crmUserOneSelectRes = await db
      .select()
      .from(crmUsersTable)
      .where(eq(crmUsersTable.id, id))
      .limit(1);
    console.log("5.3.2 dbNeon  crmUserOneSelect - crm record récupéré :", crmUserOneSelectRes);
    if (crmUserOneSelectRes.length === 0) {
      return { 
        success: false, 
        message: "crm record not found",
        crmUsers: null
      };
    }
    return { 
      success: true, 
      message: "crm record retrieved successfully",
      crmUsers: crmUserOneSelectRes[0]
    };
  } catch (error) {
    console.error("5.3.3 dbNeon  crmUserOneSelect - Erreur lors de la sélection :", error);
    throw error;
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------5.4 Fonction crmUserUpdate -------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

export async function crmUserUpdate(id: number, crmUser: TypeCrmUsers) {
  console.log("5.4.1 dbNeon  crmUserUpdate - Début, id:", id);
  try {
    await db
      .update(crmUsersTable)
      .set(crmUser)
      .where(eq(crmUsersTable.id, id));
    console.log("5.4.2 dbNeon  crmUserUpdate - crm record mis à jour avec succès");
    return { 
      success: true, 
      message: "crm record updated successfully" };
  } catch (error) {
    console.error("5.4.3 dbNeon  crmUserUpdate - Erreur lors de la mise à jour :", error);
    return { 
      success: false, 
      message: "Error updating crm record" };
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------5.5 Fonction crmUserDelete -------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

// export async function crmUserDelete(id: number) {
export async function crmUserDelete(id: number) {
  console.log("5.5.1 dbNeon  crmUserDelete - Début, id:", id);
  try {
    await db.delete(crmUsersTable).where(eq(crmUsersTable.id, id));
    console.log("5.5.2 dbNeon  crmUserDelete - crm record supprimé avec succès");
    return { success: true, message: "crm record deleted successfully" };
  } catch (error) {
    console.error("5.5.3 dbNeon  crmUserDelete - Erreur lors de la suppression :", error);
    return { success: false, message: "Error deleting crm record" };
  }
}




//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------3.4 Début CrmUser avec email et Pw  
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function crmUserEmailAndPwSelect(
  email: string,
  motDePasse: string
): Promise<{ success: boolean; message: string; user: any; crmUser: any }> {
  console.log("3.4.1 dbNeon  crmUserMail-PwSelect avec l'email:", email);

  //---------------------------------------------------------------------
  // 3.4.2 .?/ crmUserMail-PwSelect => User OK/NO
  try {
    console.log("3.4.2 .?/ dbNeon  crmUserMail-PwSelect => user existe OK/NO");
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    //---------------------------------------------------------------------
    // 3.4.3 ../ crmUserMail-PwSelect => User NO OK
    if (existingUser.length === 0) {
      console.log("3.4.3 ../ dbNeon  crmUserMail-PwSelect => USER NO OK");
      return {
        success: false,
        message: "Identifiants incorrects.",
        user: null,
        crmUser: null
      };
    }

    // 3.4.4 ../.?/ crmUserMail-PwSelect =>  USER OK => crmUser-Pw Ok/NO
    console.log("3.4.4 ../.?/ dbNeon  crmUserMail-PwSelect => USER OK => crmUser-Pw Ok/NO");
    try {
      const result = await db
        .select()
        .from(usersTable)
        .innerJoin(crmUsersTable, eq(usersTable.id, crmUsersTable.userId))
        .where(
          and(
            eq(usersTable.email, email),
            eq(crmUsersTable.mot_de_passe, motDePasse),
            eq(crmUsersTable.status_abonnement, "actif")
          )
        )
        .limit(1);

      //---------------------------------------------------------------------
      // 3.4.5 ../.?/ dbNeon  crmUserMail-PwSelect => USER OK => crmUser-Pw OK  
      if (result.length > 0) {
        console.log("3.4.5 ../../ dbNeon  crmUserMail-PwSelect => USER OK => crmUser-Pw OK",result[0]);
        return {
          success: true,
          message: "Authentification réussie.",
          user: result[0].users,
          crmUser: result[0].crmUsers
        };
      }

      // 3.4.6 ../../ crmUserMail-PwSelect => USER OK=> crmUser-Pw NO OK
      console.log("3.4.6 ../../ dbNeon  crmUserMail-PwSelect => USER OK => crmUser-Pw NO OK");
      return {
        success: false,
        message: "Identifiants corrects, mot de passe invalide ou non inscrit.",
        user: existingUser[0],
        crmUser: null
      };

    // 3.4.7 ../../ crmUserMail-PwSelect => USER OK => crmUser-Pw erreur
    } catch (error) {
      console.error(
        "3.4.7 ../../ dbNeon  crmUserMail-PwSelect => USER OK => crmUser-Pw erreur",
        error
      );
      return {
        success: false,
        message: `Une erreur est survenue : ${error}`,
        user: existingUser[0],
        crmUser: null
      };
    }

  // 3.4.8 ../ crmUserMail-PwSelect => USER OK errueur
  } catch (error) {
    console.error(
      "3.4.8 dbNeon  crmUserMail-PwSelect => USER erreur ",
      error
    );
    return {
      success: false,
      message: `Une erreur est survenue : ${error}`,
      user: null,
      crmUser: null
    };
  }
}

//---------3.4 Fin select one users with email et mot de passe 





//---------------------------------------------------------------------
//---------------------------------------------------------------------
//-------------3.8 Début insert CrmUser inscription --------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
// export async function crmUserInscrit(user: FormatUserInput, crmMotdePasse: string) {
export async function crmUserInscrit(user: FormatUserInput, crmMotdePasse: string) {
  console.log("3.8.1 dbNeon  crmUserInscrit, user:", user);

  try {
    //-----------------------------------------------------------------
    // 3.8.2 .?/         DEBUT USER EXISTANT ou NO
    //-----------------------------------------------------------------
    console.log("3.8.2 .?/ dbNeon  crmUserInscrit, USER ok/NO");
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email));

    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    // 3.8.3 ../         DEBUT USER EXISTANT
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    if (existingUser.length > 0) {
      console.log( "3.8.4 ../         dbNeon  crmUserInscrit  USER EXIST: ", user.email);
      console.log( "3.8.5 ../../      dbNeon  crmUserInscrit  USER EXIST => crmUser ACTIF/NO ");
      
      //-----------------------------------------------------------------
      // 3.8.6 ../.?/      USER EXISTANT => crmUser ACTIF/NO
      const crmUserActifRes = await db
        .select()
        .from(usersTable)
        .innerJoin(crmUsersTable, eq(usersTable.id, crmUsersTable.userId))
        .where(
          and(
            eq(usersTable.email, user.email),
            eq(crmUsersTable.status_abonnement, "actif")
          )
        )
        .limit(1);

      ///////////////////////////////////////////////////////////////////
      // 3.8.7 ../../   USER EXISTANT => crmUser ACTIF
      ///////////////////////////////////////////////////////////////////
      if (crmUserActifRes .length > 0) {
        console.log("3.8.7 ../../     dbNeon  crmUserInscrit  USER EXIST => crmUser ACTIF");
        console.log("3.8.8 ../../../  dbNeon  crmUserInscrit  USER EXIST => crmUser ACTIF => crmUser Pw/NO");

        //-----------------------------------------------------------------
        // 3.8.9 ../../.?/   USER EXISTANT => crmUser ACTIF => crmUser Pw/NO
        const crmUserPwRes = await db
        .select()
        .from(usersTable)
        .innerJoin(crmUsersTable, eq(usersTable.id, crmUsersTable.userId))
        .where(
          and(
            eq(usersTable.email, user.email),
            eq(crmUsersTable.mot_de_passe, crmMotdePasse),
            eq(crmUsersTable.status_abonnement, "actif")
          )
        )
        .limit(1);

        //-----------------------------------------------------------------
        // 3.8.10 ../../../USER EXISTANT => crmUser ACTIF => crmUser Pw
        //-----------------------------------------------------------------
        if (crmUserPwRes.length > 0) {
          console.log("3.8.10 ../../../   dbNeon  crmUserInscrit  USER EXIST => crmUser ACTIF => crmUser Pw/Yes");
            //////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////
            //////////////          STOP 1        //////////////////////////////
            //////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////
            return {
              success: false,
              message: "Vous êtes déjà inscrit",
              user: crmUserPwRes[0].users,
              crm: crmUserPwRes[0].crmUsers
            };
        } 

        //-----------------------------------------------------------------
        // 3.8.10 ../../../.? USER EXISTANT => crmUser ACTIF  => crmUser Pw  NO => crmUser update Pw/NO
        //-----------------------------------------------------------------
        const crmUserMiserAJour: TypeCrmUsers = {
          plan:                  crmUserActifRes [0].crmUsers.plan,
          plan_details:          crmUserActifRes [0].crmUsers.plan_details,
          date_debut_abonnement: crmUserActifRes [0].crmUsers.date_debut_abonnement,
          date_fin_abonnement:   crmUserActifRes [0].crmUsers.date_fin_abonnement ?? undefined,
          date_debut_test:       crmUserActifRes [0].crmUsers.date_debut_test     ?? undefined,
          date_fin_test:         crmUserActifRes [0].crmUsers.date_fin_test       ?? undefined,
          status_abonnement:     crmUserActifRes [0].crmUsers.status_abonnement,
          date_dernier_payment:  crmUserActifRes [0].crmUsers.date_dernier_payment?? undefined,
          date_prochain_payment: crmUserActifRes [0].crmUsers.date_prochain_payment?? undefined,
          status_paiement:       crmUserActifRes [0].crmUsers.status_paiement,
          mode_paiement:         crmUserActifRes [0].crmUsers.mode_paiement       ?? undefined,
          facturation_info:      crmUserActifRes [0].crmUsers.facturation_info    ?? undefined,
          mot_de_passe:          crmMotdePasse,
          identification:        crmUserActifRes [0].crmUsers.identification,
          userId:                crmUserActifRes [0].crmUsers.userId!,
        };
        

        const crmUserPwUpdateRes = await crmUserUpdate(
          crmUserActifRes[0].crmUsers.id,
          crmUserMiserAJour
        );

        //-----------------------------------------------------------------
        // 3.8.11 ../../../.. USER EXISTANT => crmUser ACTIF  => crmUser Pw NO => crmUser Update Pw Yes
        //-----------------------------------------------------------------
        if (crmUserPwUpdateRes.success) {
          console.log(
            "3.8.11 ../../../../dbNeon  crmUserInscrit  USER EXIST => crmUser ACTIF  => crmUser Pw  NO => update Pw Yes"
          );
          return {
            success: true,
            message: "Mot de passe crm mis à jour avec succès.",
            user:        crmUserActifRes [0].users,
            crm:        crmUserMiserAJour,
          };
        }
      }
      ///////////////////////////////////////////////////////////////////
      // 3.8.7 ../../ FIN   USER EXISTANT => crmUser ACTIF 
      ///////////////////////////////////////////////////////////////////


      ///////////////////////////////////////////////////////////////////
      // 3.8.11 ../../ DEBUT   USER EXISTANT => crmUser ACTIF  NO
      ///////////////////////////////////////////////////////////////////
      const crmDataForExistingUser: TypeCrmUsers = {
        plan: "Free",
        plan_details: {},
        date_debut_abonnement: new Date().toISOString().slice(0, 10), // format "YYYY-MM-DD"
        status_abonnement: "actif",
        status_paiement: "non payé",
        mot_de_passe:  crmMotdePasse,
        identification: user.email  === "golliard73@gmail.com"? "jerome1872Troistorrents": "user2025Nethelvetic",
        userId: existingUser[0].id,
      };

      console.log("3.8.11 ../../.?  dbNeon  crmUserInscrit => USER EXIST => crmUser ACTIF  NO => crmUserInsert"
      );

      //-----------------------------------------------------------------
      // 3.8.11 ../../.?   USER EXISTANT => crmUser ACTIF  NO => insert crm ou NO
      const crmUserInsertRes = await crmUserInsert(crmDataForExistingUser);
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////          STOP 2        //////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      if (crmUserInsertRes .success) {
        console.log("3.8.12 ../../../  dbNeon  crmUserInscrit  USER EXIST => crmUser ACTIF  NO => crmUserInsert  SUCESS");
        return {
          success: true,
          message: "Client inscrit",
          user: existingUser,
          crmUser: crmUserInsertRes.crmUser
        };
        } else {
          console.log("3.8.11 ../../  dbNeon  crmUserInscrit  USER EXIST => crmUser ACTIF  NO => crmUserInsert  NO SUCCES");
          return {
            success: false,
            message: "Client non inscrit",
            user: existingUser,
            crm: null
          };
        }
    } else {
      ///////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////
      // 3.8.3 ../         FIN USER EXISTANT => crmUser ACTIF  NO
      ///////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////


      
      ///////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////
      // 3.8.3 ../         DEBUT USER EXISTANT NO
      ///////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////

      //-----------------------------------------------------------------
      // 3.8.8 USER NON EXISTANT => Définir une var pour le data USER
      console.log("3.8.8 ../ dbNeon  crmUserInscrit => USER NO EXIST ");
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
      console.log("3.8.9 ../.?/ dbNeon  crmUserInscrit => USER NO EXIST => userInsert OK ");

      //-----------------------------------------------------------------
      // 3.8.10 ../../ USER NON EXISTANT => creation user success
      if (userInserted) {
        //-----------------------------------------------------------------
        // 3.8.11 USER NON EXISTANT => creation user success => Création new crm avec User.Id
        console.log("3.8.10 ../../.?/ dbNeon  crmUserInscrit => USER NO EXIST => userInsert OK  => crmUserInsert ");

        const crmData: TypeCrmUsers = {
          plan: "Free",
          plan_details: {},
          date_debut_abonnement: new Date().toISOString().slice(0, 10), // format "YYYY-MM-DD"
          status_abonnement: "actif",
          status_paiement: "non payé",
          mot_de_passe: crmMotdePasse,
          identification: user.email  === "golliard73@gmail.com"? "jerome1872Troistorrents": "user2025Nethelvetic",
          userId: userInserted[0].id,
        };
        const crmUserInsertRes = await crmUserInsert(crmData);

        //-----------------------------------------------------------------
        // 3.8.12 USER NON EXISTANT => creation user success => Creation crm
        if (crmUserInsertRes .success) {
          console.log("3.8.12 ../../../ dbNeon  crmUserInscrit => USER NO EXIST => userInsert OK  => crmUserInsert OK");

          //////////////////////////////////////////////////////////////////
           //////////////////////////////////////////////////////////////////
           //////////////          STOP 3        ////////////////////////////
           //////////////////////////////////////////////////////////////////
           //////////////////////////////////////////////////////////////////
          return {
            success: true,
            message: "Utilisateur ajouté avec succès !",
            user: userInserted[0],
            crmUser: crmUserInsertRes.crmUser,
          };
        } else {
          console.log("3.8.13 ../../../ dbNeon  crmUserInscrit => USER NO EXIST => userInsert OK => crmUserInsert  NO OK");
          return {
            success: false,
            message: "Utilisateur non inscrit !",
            user: userInserted[0],
            crmUser: crmUserInsertRes.crmUser,
          };
        }
      } else {
        console.log("3.8.14 ../../ dbNeon  crmUserInscrit  USER NO EXIST => userInsert NO OK");
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////          STOP 4        ////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
        return {
          success: false,
          message: "erreur d'inscription !",
          user: null,
          crm: null
        };
      }
    }
      ///////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////
      // 3.8.3 ../         FIN USER EXISTANT NO
      ///////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////

  } catch (error) {
    console.error(
      "3.8.14 dbNeon  crmUserInscrit erreur",
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
//                        DEFINR TABLE crmUsers_user
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//--------------6.0 Début select CrmUser_USERS ------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

// export async function crmUsers_UsersAllSelect(id: string) {
export async function crmUsers_UsersAllSelect(id: string) {
  console.log("6.0.0 dbNeon  crmUsers_UsersAllSelect Id =", id);

  //---------------------------------------------------------------------
  // 6.0.1 .?/ dbNeon  crmUsers_UsersAllSelect => parse userId OK/NO
  const userId = parseInt(id, 10);
  if (isNaN(userId)) {
    console.error("6.0.1 dbNeon  crmUsers_UsersAllSelect => parse userId NO");
    return { 
      success: false, 
      message: "Identifiant utilisateur invalide.", 
      users: null };
  }

  //---------------------------------------------------------------------
  // 6.0.2 dbNeon  crmUsers_UsersAllSelect=> parse userId OK => selectUserCrm OK/NO 
  try {
    console.log("6.0.2 BACK dbNeon  crmUsers_UsersAllSelect => parse userId OK => userCrm_UsersSelect OK/NO");
    const crmUsers_usersRes = await db
      .select()
      .from(crmUser_UsersTable)
      .where(eq(crmUser_UsersTable.userId, userId));

    console.log("6.0.3 dbNeon  crmUsers_UsersAllSelect => parse userId OK => userCrm_UsersSelect OK");
    return { 
      success: true, 
      message: "Sélection CRM réussie.", 
      users : crmUsers_usersRes };
  } catch (error) {
    console.error("6.0.4 dbNeon  selectUsersCRM => parse userId OK => selectUserCrm erreur:", error);
    return { 
      success: false, 
      message: "Erreur lors de la sélection CRM.", 
      users: null };
  }
}




//---------------------------------------------------------------------
//---------------------------------------------------------------------
//--------------7.0 Début insert crmUser_User  ------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

// export async function crmUser_userInsert(user: typeCrmUsers_user) {
export async function crmUser_userInsert(user: TypeCrmUsers_user) {
  console.log("7.0.1 dbNeon  crmUser_userInsert  user =", user);

  //--------------------------------------------------------------
  // 7.0.3 .?/ dbNeon  crmUser_userInsert => User exist OK/NO 
  //--------------------------------------------------------------
  try {
    console.log("7.0.3 .?/ dbNeon  crmUser_userInsert => User exist OK/NO ");
    const existingUser = await db
      .select()
      .from(crmUser_UsersTable )
      .where(
        and(
          eq(crmUser_UsersTable.email, user.email)
        )
      );

    //--------------------------------------------------------------
    // 7.0.4 ../ dbNeon  crmUser_userInsert => User exist
    //--------------------------------------------------------------
    if (existingUser.length > 0) {
      console.log("6.1.4 ../ dbNeon  crmUser_userInsert => User exist", existingUser[0].id);
      const userFromDB = existingUser[0];

      //--------------------------------------------------------------
      // 7.0.5 ../.?/ dbNeon  crmUser_userInsert => USER exist => upDate User OK/NO
      function isNullOrEmpty(value?: string): boolean {
        return value == null || value === "";
      }
      
      const transformedUser: TypeCrmUsers_user = {
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
        userId: user.userId,  // unchanged, always number
      };

      console.log("7.0.6 ../.? dbNeon  crmUser_userInsert => USER exist => upDate User OK/NO", transformedUser);

        const crmUser_userUpdateRes = await crmUser_userUpdate(userFromDB.id, transformedUser);

        //------------------------------------------------------------
        // 7.0.7 ../.. dbNeon  crmUser_userInsert => USER OK => upDate OK
        if (crmUser_userUpdateRes .success) {
          console.log("7.0.7 ../../ dbNeon  crmUser_userInsert=> USER exist => upDate OK");
          /////////////////////////////////////////////
          /////////////////////////////////////////////
          //////        STOP 1        /////////////////
          /////////////////////////////////////////////
          /////////////////////////////////////////////
          return { 
            success: true, 
            message: "Un utilisateur existe déjà ; nous avons mis à jour son compte avec les informations fournies.", 
            user: userFromDB
          } ;
        } else {
          return { 
            success: false, 
            message: "L'utilisateur existe déjà, mais la mise à jour a échoué : " + crmUser_userUpdateRes .message, 
            user: userFromDB
          };
        }
    }

    //-----------------------------------------------------------------
    // 7.0.6 ../ dbNeon  crmUser_userInsert => USER no exist 
    //-----------------------------------------------------------------
    console.log("7.0.6 ../ dbNeon  crmUser_userInsert => USER no exist");

    //--------------------------------------------------------------
    // 7.0.7 ../.? dbNeon  crmUser_userInsert => USER no exist => insert User OK/NO
    try {
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
  
      console.log("7.0.8 ../.?/ dbNeon  crmUser_userInsert=> USER no exist => insert User OK/NO", userToInsert);
      const crmUserInsert_userRes = await db
        .insert(crmUser_UsersTable)
        .values(userToInsert)
        .returning();

      //--------------------------------------------------------------
      // 7.0.9 ../.. dbNeon  crmUser_userInsert=> USER no exist => insert User OK
      console.log("7.0.9 ../.,/ FRONT dbNeon  crmUser_userInsert=> USER no exist => insert User OK");
      /////////////////////////////////////////////
      /////////////////////////////////////////////
      //////        STOP 1,2,3        /////////////
      /////////////////////////////////////////////
      /////////////////////////////////////////////
      return {
        success: true,
        message: "Nouvel enregistrement CRM utilisateur créé.",
        user: crmUserInsert_userRes[0],
      };

    //--------------------------------------------------------------
    // 7.0.10 ../../ dbNeon  crmUser_userInsert => USER no exist => insert User erreur" 
    } catch (error) {
      console.error("7.0.10 ../../ dbNeon  crmUser_userInsert => USER no exist => insert User NO OK", error);
      return {
        success: false,
        message: "Nouvel enregistrement CRM utilisateur créé.",
        user: null,
      };  
    }

  //--------------------------------------------------------------
  // 7.0.11 ../ dbNeon  crmUser_userInsert=> USER OK/NO erreur" 
  } catch (error) {
    console.error("7.0.11 ../ dbNeon  crmUser_userInsert=> USER OK/NO erreur", error);
    return {
      success: false,
      message: "Erreur lors de l’insertion ou mise à jour CRM utilisateur.",
      user: null,
    };
  }
}

//------------------------------------------------------------------
// crmUser_userUpdate  remains unchanged below
//------------------------------------------------------------------
// export async function crmUser_userUpdate(id: number, user: typeCrmUsers_user) {
export async function crmUser_userUpdate(id: number, user: TypeCrmUsers_user) {
  console.log("7.1.0 dbNeon  crmUser_userUpdate  avec l'id: ", id);
  try {
    const userToUpdateRaw = {
      ...user,
      date_de_naissance:
        user.date_de_naissance?.trim() === "" ? undefined : user.date_de_naissance,
      date_creation:
        user.date_creation?.trim() === "" ? undefined : user.date_creation,
      telephone:
        user.telephone?.trim() === "" ? undefined : user.telephone,
      username:
        user.username?.trim() === "" ? undefined : user.username,
    };

    console.log("7.1.2 ../ dbNeon  crmUser_userUpdate  OK/NO");
    const updateOneUserCrmRes = await db
      .update(crmUser_UsersTable)
      .set(userToUpdateRaw)
      .where(eq(crmUser_UsersTable.id, id));
    console.log("7.1.3 dbNeon  crmUser_userUpdate  OK ");

    return {
      success: true,
      message: "Utilisateur mis à jour avec succès !",
      user: userToUpdateRaw
    };
  } catch (error) {
    console.error("7.1.4 dbNeon  crmUser_userUpdate  NO OK:", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour de l'utilisateur.",
      user: null
    };
  }
}




//---------------------------------------------------------------------
//---------------------------------------------------------------------
//--------------8.0 Début select crmUser_userAllSelect ----------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

export async function crmUsers_usersAllSelect(userIdStr: string) {
  console.log("8.0.0 dbNeon  crmUsersAllSelect_userById Début userId =", userIdStr);

  //-------------------------------------------------------------------
  // 8.0.1 Parse userId
  //-------------------------------------------------------------------
  const userId = parseInt(userIdStr, 10);
  if (isNaN(userId)) {
    console.error("8.0.1 ../ dbNeon  crmUsersAllSelect_userById => parse userId NO OK");
    return {
      success: false,
      message: "Identifiant CRM utilisateur invalide.",
      user: null,
    };
  }

  //-------------------------------------------------------------------
  // 8.0.2 Query table for single record
  //-------------------------------------------------------------------
  try {
    console.log("8.0.2 ../.?/ BACK dbNeon  crmUsersAllSelect_userById => parse userId => selectOneUserCrm OK/NO");
    const records = await db
      .select()
      .from(crmUser_UsersTable)
      .where(eq(crmUser_UsersTable.userId, userId ))
      .limit(1);

    if (records.length === 0) {
      console.log("8.0.3 ../../ dbNeon  crmUsersAllSelect_userById = >parse userId => selectOneUserCrm NO OK");
      ////////////////////////////////////
      ///////     STOP 1,2,3     /////////
      ////////////////////////////////////
      return {
        success: false,
        message: "Aucun enregistrement CRM trouvé pour cet utilisateur.",
        user: null,
      };
    }

    console.log("8.0.4 ../../ dbNeon  crmUsersAllSelect_userById = >parse userId => selectOneUserCrm OK");
    return {
      success: true,
      message: "Sélection CRM utilisateur réussie.",
      user: records[0],
    };
  } catch (error) {
    console.error("8.0.5 ../../ dbNeon  crmUsersAllSelect_userById = >parse userId => selectOneUserCrm  erreur :", error);
    return {
      success: false,
      message: "Erreur lors de la sélection CRM utilisateur.",
      user: null,
    };
  }
}



//---------------------------------------------------------------------
//---------------------------------------------------------------------
//--------------8.0 Début select crmUser_userOneSelect ----------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function crmUsers_usersOneSelect(crmUser_userId: string) {
  console.log("8.0.0 dbNeon  crmUsers_usersOneSelect Début userId =", crmUser_userId);

  //-------------------------------------------------------------------
  // 8.0.1 Parse userId
  //-------------------------------------------------------------------
  const userId = parseInt(crmUser_userId, 10);
  if (isNaN(userId)) {
    console.error("8.0.1 ../ dbNeon  crmUsers_usersOneSelect => parse userId NO OK");
    return {
      success: false,
      message: "Identifiant CRM utilisateur invalide.",
      user: null,
    };
  }

  //-------------------------------------------------------------------
  // 8.0.2 Query table for single record
  //-------------------------------------------------------------------
  try {
    console.log("8.0.2 ../.?/ BACK dbNeon  crmUsers_usersOneSelect => parse userId => selectOneUserCrm OK/NO");
    const records = await db
      .select()
      .from(crmUser_UsersTable)
      .where(eq(crmUser_UsersTable.id, userId ))
      .limit(1);

    if (records.length === 0) {
      console.log("8.0.3 ../../ dbNeon  crmUsers_usersOneSelect => parse userId => selectOneUserCrm NO OK");
      ////////////////////////////////////
      ///////     STOP 1,2,3     /////////
      ////////////////////////////////////
      return {
        success: false,
        message: "Aucun enregistrement CRM trouvé pour cet utilisateur.",
        user: null,
      };
    }

    console.log("8.0.4 ../../ dbNeon  crmUsers_usersOneSelect  => parse userId => selectOneUserCrm OK");
    return {
      success: true,
      message: "Sélection CRM utilisateur réussie.",
      user: records[0],
    };
  } catch (error) {
    console.error("8.0.5 ../../ dbNeon  crmUsers_usersOneSelect  => parse userId => selectOneUserCrm  erreur :", error);
    return {
      success: false,
      message: "Erreur lors de la sélection CRM utilisateur.",
      user: null,
    };
  }
}






//---------------------------------------------------------------------
//---------------------------------------------------------------------
//--------------8.1 Début delete crmUser_userDelete -------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

// export async function crmUser_userDelete(userId: number) {
export async function crmUser_userDelete(userId: number) {
  console.log("8.1.0 dbNeon  crmUser_userDelete Début userId =", userId);

  try {
    console.log("8.1.1 ../ dbNeon  crmUser_userDelete => suppression en cours");
    const result = await db
      .delete(crmUser_UsersTable)
      .where(eq(crmUser_UsersTable.id, userId));
    console.log("8.1.2 ../ dbNeon  crmUser_userDelete => suppression OK");
    return {
      success: true,
      message: "Enregistrement CRM utilisateur supprimé avec succès.",
      deletedCount: result.rowCount ?? 0
    };
  } catch (error) {
    console.error("8.1.3 ../ dbNeon  crmUser_userDelete => erreur lors de la suppression :", error);
    return {
      success: false,
      message: "Erreur lors de la suppression CRM utilisateur.",
      deletedCount: 0
    };
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//--------------8.2 Début update crmUser_user --------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//export async function crmUser_userUpdateById(id: number, user: FormatUserInput) {

export async function crmUser_userUpdateById(id: number, user: FormatUserInput) {
  console.log("3.5.0 dbNeon  crmUser_userUpdateById: ", id);
  try {
    // On remplace les chaînes vides par `undefined` (Drizzle accepte undefined mais pas null)
    const userToUpdateRaw = {
      ...user,
      date_de_naissance:
        user.date_de_naissance?.trim() === "" ? undefined : user.date_de_naissance,
      date_creation:
        user.date_creation?.trim() === "" ? undefined : user.date_creation,
      telephone:
        user.telephone?.trim() === "" ? undefined : user.telephone,
      username:
        user.username?.trim() === "" ? undefined : user.username,
    };


    console.log("3.5.2 dbNeon  crmUser_userUpdateById OK/NO");
    const updateOneUserRes = await db
      .update(crmUser_UsersTable)
      .set(userToUpdateRaw)
      .where(eq(crmUser_UsersTable.id, id));
    console.log("3.5.3 dbNeon  crmUser_userUpdateById OK");

    return {
      success: true,
      message: "Utilisateur mis à jour avec succès !",
      user: userToUpdateRaw
    };
  } catch (error) {
    console.error("3.5.4 dbNeon  crmUser_userUpdateById NO OK", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour de l'utilisateur.",
      user: null
    };
  }
}

// --------------------------------------------------------------------
// ------------------------9.0  Début CRUD Offres ---------------------
// --------------------------------------------------------------------

export async function insertOffre(offre: TypeOffreInput) {
  console.log("9.1.0 dbNeon  insertOffre : offre= ", offre);
  try {
    await db.insert(offresTable).values(offre);
    console.log("9.1.1 dbNeon  insertOffre ok");
    return { success: true, message: "Offre ajoutée avec succès !" };
  } catch (error) {
    console.error("9.1.2 dbNeon  insertOffre erreur", error);
    return { success: false, message: "Erreur lors de l'ajout de l'offre." };
  }
}

export async function selectOffres() {
  console.log("9.2.0 dbNeon  selectOffres");
  try {
    const offres = await db.select().from(offresTable);
    console.log("9.2.1 dbNeon  selectOffres ok", offres);
    return offres;
  } catch (error) {
    console.error("9.2.2 dbNeon  selectOffres erreur", error);
    throw error;
  }
}

export async function selectOneOffre(id: number) {
  console.log("9.3.0 dbNeon  selectOneOffre id=", id);
  try {
    const offre = await db
      .select()
      .from(offresTable)
      .where(eq(offresTable.id, id))
      .limit(1);
    console.log("9.3.1 dbNeon  selectOneOffre ok", offre);
    return offre;
  } catch (error) {
    console.error("9.3.2 dbNeon  selectOneOffre erreur", error);
    throw error;
  }
}

export async function updateOffre(id: number, offre: TypeOffreInput) {
  console.log("9.4.0 dbNeon  updateOffre id=", id);
  try {
    await db.update(offresTable).set(offre).where(eq(offresTable.id, id));
    console.log("9.4.1 dbNeon  updateOffre ok");
    return { success: true, message: "Offre mise à jour avec succès !" };
  } catch (error) {
    console.error("9.4.2 dbNeon  updateOffre erreur", error);
    return { success: false, message: "Erreur lors de la mise à jour." };
  }
}

export async function deleteOffre(id: number) {
  console.log("9.5.0 dbNeon  deleteOffre id=", id);
  try {
    await db.delete(offresTable).where(eq(offresTable.id, id));
    console.log("9.5.1 dbNeon  deleteOffre ok");
    return { success: true, message: "Offre supprimée avec succès !" };
  } catch (error) {
    console.error("9.5.2 dbNeon  deleteOffre erreur", error);
    return { success: false, message: "Erreur lors de la suppression." };
  }
}

export async function duplicateOffre(id: number) {
  console.log("9.6.0 dbNeon  duplicateOffre id=", id);
  try {
    const offre = await db
      .select()
      .from(offresTable)
      .where(eq(offresTable.id, id))
      .limit(1);
    if (offre.length === 0) {
      return { success: false, message: "Offre introuvable" };
    }
    const copy = { ...offre[0], id: undefined } as any;
    await db.insert(offresTable).values(copy);
    console.log("9.6.1 dbNeon  duplicateOffre ok");
    return { success: true, message: "Offre dupliquée" };
  } catch (error) {
    console.error("9.6.2 dbNeon  duplicateOffre erreur", error);
    return { success: false, message: "Erreur duplication" };
  }
}

export async function updateOffreStatut(id: number, statut: string) {
  console.log("9.7.0 dbNeon  updateOffreStatut id=", id, statut);
  try {
    await db
      .update(offresTable)
      .set({ statut })
      .where(eq(offresTable.id, id));
    console.log("9.7.1 dbNeon  updateOffreStatut ok");
    return { success: true, message: "Statut mis à jour" };
  } catch (error) {
    console.error("9.7.2 dbNeon  updateOffreStatut erreur", error);
    return { success: false, message: "Erreur changement de statut" };
  }
}

