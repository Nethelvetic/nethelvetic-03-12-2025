import "dotenv/config"; 
import { neon } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, isNotNull, not } from "drizzle-orm";
import { formationTable, evenementsTable, usersTable, messageTable, saasTable, usersCrmUsersTable } from "./schema";


// 105  TABLES FORMATION
// 119    - insert one Formation
// 142    - select all Formation
// 219  TABLES EVENEMENT
// 357  TABLES USER
// 369    - insert user
// 572    - select one users
// 632    - select one users with email et mot de passe 
// 668    - select User With Active Saas 
// 856    - insert user pour inscription 
// 971  TABLES MESSAGE
// 1066 TABLES SAAS
// 1421 TABLE users_CRM_users 



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




type FormatUserCrmInput = {
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
    return { 
      success: true, 
      message: "4.3 Formation ajoutée avec succès !" };
  } catch (error) {
    console.error("1.1.4 dbQuery Erreur lors de l'insertion de la formation :", error);
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
    console.log("1.2.1 dbQuery selectFormation try avant");
    const formations = await db.select().from(formationTable);
    console.log("1.2.1 dbQuery selectFormation try après => formations", formations);
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
  console.log("1.3.0 dbQuery selectUneFormation avec l'id= ", id);
  try {
    console.log("1.3.1 dbQuery selectUneFormation OK ou NO OK");
    const uneFormation = await db
      .select()
      .from(formationTable)
      .where(eq(formationTable.id, id))
      .limit(1); // Optionnel : pour limiter le résultat à un seul enregistrement
   console.log("1.3.2 dbQuery selectUneFormation OK: ", uneFormation);
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
//------------------------3.1  Début insert user-----------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function insertOneUser(user: FormatUserInput) {
  console.log("3.1.1 dbQuery insertOneUser, données:", user);


  //--------------------------------------------------------------
  // 3.1.2 .?/ dbQuery insertOneUser => User exist OK/NO
  //--------------------------------------------------------------
  try {
    console.log("3.1.2 .?/ dbQuery insertOneUser => User exist OK/NO");
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email));


    //--------------------------------------------------------------
    // 3.1.3 ../ dbQuery insertOneCrmUser => User exist OK
    //--------------------------------------------------------------
    if (existingUser.length > 0) {
      console.log("3.1.3 ../ dbQuery insertOneUser => User exist", user.email);
      const userFromDB = existingUser[0];

    //--------------------------------------------------------------
    // 3.1.3 ../.? dbQuery insertOneUser => USER exist => upDate User OK/NO
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
      
      console.log("3.1.4 ../.?/ dbQuery insertOneUser => USER exist => upDate User OK/NO", transformedUser);
   
      const updateUserResult = await updateOneUser(userFromDB.id, transformedUser);

      //------------------------------------------------------------
      // 3.1.5 ../.. dbQuery insertOneUser => USER OK => upDate OK
      if (updateUserResult.success) {
        console.log("3.1.5 ../../ dbQuery insertOneUser => USER exist => upDate OK");

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
          message: "L'utilisateur existe déjà, mais la mise à jour a échoué : " + updateUserResult.message, 
          user: userFromDB
        };
      }
    }


    //-------------------------------------------------------------
    //3.1.6 ../ dbQuery insertOneUser => USER no exist
    //--------------------------------------------------------------
    console.log("3.1.6 ../ dbQuery insertOneUser => USER no exist");

    //--------------------------------------------------------------
    // 3.1.7 ../.? dbQuery insertOneUser => USER no exist => insert User OK/NO

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
  
      console.log("3.1.7 ../.?/ dbQuery insertOneUser => USER no exist => insert User OK/NO", userToInsert);
      const insertUserRes = await db
      .insert(usersTable)
      .values(userToInsert)
      .returning();
  
  
      //--------------------------------------------------------------
      // 3.1.8 ../.. dbQuery insertOneUser => USER no exist => insert User OK
      console.log("3.1.8 ../../ dbQuery insertOneUser => USER no exist => insert User OK");
  
      /////////////////////////////////////////////
      /////////////////////////////////////////////
      //////        STOP 1,2,3        /////////////
      /////////////////////////////////////////////
      /////////////////////////////////////////////
      return { 
        success: true, 
        message: "Utilisateur ajouté avec succès !",
        user: insertUserRes[0]
      };

  //--------------------------------------------------------------
  // 3.1.9 ../../ dbQuery insertOneUser => USER no exist => insert User erreur" 
    } catch (error) {
      console.error("3.1.9 ../../ dbQuery insertOneUser => USER no exist => insert User NO OK", error);
      return {
        success: false,
        message: "Nouvel enregistrement CRM utilisateur créé.",
        user: null,
      };   
    }

  //--------------------------------------------------------------
  // 3.1.9 ../ dbQuery insertCrmUser => USER Ok/NO erreur" 
  } catch (error) {
    console.error("3.1.9 ../ dbQuery insertOneUser => USER OK/NO erreur", error);
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
      console.log("3.3.2 dbQuery selectOneUsers OK:  ", user);

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
    console.error("3.3.3 dbQuery selectOneUsers NO OK:  ", error);
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
): Promise<{ success: boolean; message: string; user: any; saas: any }> {
  console.log("3.4.1 dbQuery selectUserEmail-Pw avec l'email:", email);

  //---------------------------------------------------------------------
  // 3.4.2 .?/ selectUserEmail-Pw => User OK/NO
  try {
    console.log("3.4.2 .?/ dbQuery selectUserEmail-Pw => user existe OK/NO");
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    //---------------------------------------------------------------------
    // 3.4.3 ../ selectUserEmail-Pw => User NO OK
    if (existingUser.length === 0) {
      console.log("3.4.3 ../ dbQuery selectUserEmail-Pw => USER NO OK");
      return {
        success: false,
        message: "Identifiants incorrects.",
        user: null,
        saas: null
      };
    }

    // 3.4.4 ../.?/ selectUserEmail-Pw =>  USER OK => select User+SaaS avec Pw
    console.log("3.4.4 ../.?/ dbQuery selectUserEmail-Pw => USER OK=> select User+SaaS-Pw OK/NO");
    try {
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

      //---------------------------------------------------------------------
      // 3.4.5 ../.?/ dbQuery selectUserEmail-Pw => USER OK => select User+SaaS-Pw OK/NO  
      if (result.length > 0) {
        console.log("3.4.5 ../../ dbQuery selectUserEmail-Pw => USER OK=> select User+SaaS-Pw OK",result[0]);
        return {
          success: true,
          message: "Authentification réussie.",
          user: result[0].users,
          saas: result[0].saas
        };
      }

      // 3.4.6 selectUserWithEmailAndPw USER EXISTANT => select User+SaaS avec Pw NO SUCCES 
      console.log("3.4.6 ../../ dbQuery selectUserEmail-Pw => USER OK=> select User+SaaS-Pw NO OK");
      return {
        success: false,
        message: "Identifiants corrects, mot de passe invalide ou non inscrit.",
        user: existingUser[0],
        saas: null
      };

    // 3.4.7 selectUserWithEmailAndPw USER EXISTANT  => select User+SaaS avec Pw NO SUCCES
    } catch (error) {
      console.error(
        "3.4.7 ../../ dbQuery selectUserEmail-Pw => USER OK => select User+SaaS-Pw NO OK",
        error
      );
      return {
        success: false,
        message: `Une erreur est survenue : ${error}`,
        user: existingUser[0],
        saas: null
      };
    }

  // 3.4.8 selectUserWithEmailAndPw USER NO EXISTANT => erreur globale
  } catch (error) {
    console.error(
      "3.4.8 dbQuery selectUserEmail-Pw => USER NO OK ",
      error
    );
    return {
      success: false,
      message: `Une erreur est survenue : ${error}`,
      user: null,
      saas: null
    };
  }
}

//---------3.4 Fin select one users with email et mot de passe 





//------------------------------------------------------------------
//--------------------------------------------------------------------
//------------------------3.5 Début update one user -----------------
//------------------------------------------------------------------
//------------------------------------------------------------------
export async function updateOneUser(id: number, user: FormatUserInput) {
  console.log("3.5.0 dbQuery updateUsers avec l'id: ", id);
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


    console.log("3.5.2 dbQuery updateUsers OK/NO");
    const updateOneUserRes = await db
      .update(usersTable)
      .set(userToUpdateRaw)
      .where(eq(usersTable.id, id));
    console.log("3.5.3 dbQuery updateUsers OK");

    return {
      success: true,
      message: "Utilisateur mis à jour avec succès !",
      user: userToUpdateRaw
    };
  } catch (error) {
    console.error("3.5.4 dbQuery updateUsers NO OK", error);
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
//---------3.7 Début sIdentifiants corrects mais abonnement inactif.elect User With Active Saas 
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
    // 3.8.2 .?/         DEBUT USER EXISTANT ou NO
    //-----------------------------------------------------------------
    console.log("3.8.2 dbQuery inOneUserInscri, USER EXIST ou NO");
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
      console.log( "3.8.4 ../         dbQuery inOneUserInscri USER EXIST: ", user.email);
      console.log( "3.8.5 ../../      dbQuery inOneUserInscri USER EXIST => saas ACTIF ou NO ");
      
      //-----------------------------------------------------------------
      // 3.8.6 ../.?/      USER EXISTANT => saas actif ou pas
      const userSaasResult = await db
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

      ///////////////////////////////////////////////////////////////////
      // 3.8.7 ../../   USER EXISTANT => Saas ACTIF
      ///////////////////////////////////////////////////////////////////
      if (userSaasResult.length > 0) {
        console.log("3.8.7 ../../     dbQuery inOneUserInscri USER EXIST => saas ACTIF");
        console.log("3.8.8 ../../../  dbQuery inOneUserInscri USER EXIST => saas ACTIF => saas Pw ou NO");

        //-----------------------------------------------------------------
        // 3.8.9 ../../.?/   USER EXISTANT => Saas ACTIF => saas Pw ou NO
        const userSaasPwResult = await db
        .select()
        .from(usersTable)
        .innerJoin(saasTable, eq(usersTable.id, saasTable.userId))
        .where(
          and(
            eq(usersTable.email, user.email),
            eq(saasTable.mot_de_passe, saasMotdePasse),
            eq(saasTable.status_abonnement, "actif")
          )
        )
        .limit(1);

        //-----------------------------------------------------------------
        // 3.8.10 ../../../USER EXISTANT => Saas ACTIF => saas Pw YES
        //-----------------------------------------------------------------
        if (userSaasPwResult.length > 0) {
          console.log("3.8.10 ../../../   dbQuery inOneUserInscri USER EXIST => saas ACTIF => saas Pw YES");
            //////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////
            //////////////          STOP 1        //////////////////////////////
            //////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////
            return {
              success: false,
              message: "Vous êtes déjà inscrit",
              user: userSaasPwResult[0].users,
              saas: userSaasPwResult[0].saas
            };
        } 

        //-----------------------------------------------------------------
        // 3.8.10 ../../../.? USER EXISTANT => Saas ACTIF => saas Pw NO => update saas Pw ou NO
        //-----------------------------------------------------------------
        const saasUpdate: FormatSaasInput = {
          plan:                  userSaasResult[0].saas.plan,
          plan_details:          userSaasResult[0].saas.plan_details,
          date_debut_abonnement: userSaasResult[0].saas.date_debut_abonnement,
          date_fin_abonnement:   userSaasResult[0].saas.date_fin_abonnement ?? undefined,
          date_debut_test:       userSaasResult[0].saas.date_debut_test     ?? undefined,
          date_fin_test:         userSaasResult[0].saas.date_fin_test       ?? undefined,
          status_abonnement:     userSaasResult[0].saas.status_abonnement,
          date_dernier_payment:  userSaasResult[0].saas.date_dernier_payment?? undefined,
          date_prochain_payment: userSaasResult[0].saas.date_prochain_payment?? undefined,
          status_paiement:       userSaasResult[0].saas.status_paiement,
          mode_paiement:         userSaasResult[0].saas.mode_paiement       ?? undefined,
          facturation_info:      userSaasResult[0].saas.facturation_info    ?? undefined,
          mot_de_passe:          saasMotdePasse,
          identification:        userSaasResult[0].saas.identification,
          userId:                userSaasResult[0].saas.userId!,
        };
        

        const userSaasPwUpdateResult = await updateUnSaas(
          userSaasResult[0].saas.id,
          saasUpdate
        );

        //-----------------------------------------------------------------
        // 3.8.11 ../../../.. USER EXISTANT => Saas ACTIF => saas Pw NO => update saas Pw SUCCES
        //-----------------------------------------------------------------
        if (userSaasPwUpdateResult.success) {
          console.log(
            "3.8.11 ../../../../dbQuery inOneUserInscri USER EXIST => saas ACTIF => saas Pw NO => update Pw SUCCES"
          );
          return {
            success: true,
            message: "Mot de passe SaaS mis à jour avec succès.",
            user:        userSaasResult[0].users,
            saas:        saasUpdate,
          };
        }
      }
      ///////////////////////////////////////////////////////////////////
      // 3.8.7 ../../ FIN   USER EXISTANT => Saas ACTIF
      ///////////////////////////////////////////////////////////////////


      ///////////////////////////////////////////////////////////////////
      // 3.8.11 ../../ DEBUT   USER EXISTANT => Saas ACTIF NO
      ///////////////////////////////////////////////////////////////////
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

      console.log("3.8.11 ../../.?  dbQuery inOneUserInscri USER EXIST => saas ACTIF NO => insertSaas()"
      );

      //-----------------------------------------------------------------
      // 3.8.11 ../../.?   USER EXISTANT => Saas ACTIF NO => insert saas ou NO
      const saasInsertResult = await insertSaas(saasDataForExistingUser);
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////          STOP 2        //////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      if (saasInsertResult.success) {
        console.log("3.8.12 ../../../  dbQuery inOneUserInscri USER EXIST => saas ACTIF NO => insertSaas() SUCESS");
        return {
          success: true,
          message: "Client inscrit",
          user: existingUser,
          saas: saasInsertResult.saas
        };
        } else {
          console.log("3.8.11 ../../  dbQuery inOneUserInscri USER EXIST => saas ACTIF NO => insertSaas() NO SUCCES");
          return {
            success: false,
            message: "Client non inscrit",
            user: existingUser,
            saas: null
          };
        }
    } else {
      ///////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////
      // 3.8.3 ../         FIN USER EXISTANT
      ///////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////


      
      ///////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////
      // 3.8.3 ../         DEBUT USER EXISTANT NO
      ///////////////////////////////////////////////////////////////////
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
      ///////////////////////////////////////////////////////////////////
      // 3.8.3 ../         FIN USER EXISTANT NO
      ///////////////////////////////////////////////////////////////////
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
  console.log("5.0.1 dbQuery insertSaas - Début, données:", saas);
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
  console.log("5.2.1 dbQuery selectSaas - Début");
  try {
    const records = await db.select().from(saasTable);
    console.log("5.2.2 dbQuery selectSaas - SaaS records récupérés :", records);
    return records;
  } catch (error) {
    console.error("5.2.3 dbQuery selectSaas - Erreur lors de la sélection :", error);
    throw error;
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------5.3 Fonction selectUnSaas -------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function selectUnSaas(id: number) {
  console.log("5.3.1 dbQuery selectUnSaas - Début, id:", id);
  try {
    const record = await db
      .select()
      .from(saasTable)
      .where(eq(saasTable.id, id))
      .limit(1);
    console.log("5.3.2 dbQuery selectUnSaas - SaaS record récupéré :", record);
    return record;
  } catch (error) {
    console.error("5.3.3 dbQuery selectUnSaas - Erreur lors de la sélection :", error);
    throw error;
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------5.4 Fonction updateUnSaas -------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function updateUnSaas(id: number, saas: FormatSaasInput) {
  console.log("5.4.1 dbQuery updateUnSaas - Début, id:", id);
  try {
    await db
      .update(saasTable)
      .set(saas)
      .where(eq(saasTable.id, id));
    console.log("5.4.2 dbQuery updateUnSaas - SaaS record mis à jour avec succès");
    return { 
      success: true, 
      message: "SaaS record updated successfully" };
  } catch (error) {
    console.error("5.4.3 dbQuery updateUnSaas - Erreur lors de la mise à jour :", error);
    return { 
      success: false, 
      message: "Error updating SaaS record" };
  }
}


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//------------------------5.5 Fonction deleteUnSaas -------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
export async function deleteUnSaas(id: number) {
  console.log("5.5.1 dbQuery deleteUnSaas - Début, id:", id);
  try {
    await db.delete(saasTable).where(eq(saasTable.id, id));
    console.log("5.5.2 dbQuery deleteUnSaas - SaaS record supprimé avec succès");
    return { success: true, message: "SaaS record deleted successfully" };
  } catch (error) {
    console.error("5.5.3 dbQuery deleteUnSaas - Erreur lors de la suppression :", error);
    return { success: false, message: "Error deleting SaaS record" };
  }
}












// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//                        DEFINR TABLES users_CRM_users
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//--------------6.0 Début select tout users_CRM_users -----------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------


export async function selectUsersCrmUsers(id: string) {
  console.log("6.0.0 dbQuery selectUsersCRM pour userId =", id);

  const userId = parseInt(id, 10);
  if (isNaN(userId)) {
    console.error("6.0.2 dbQuery selectUsersCRM => parse id NO OK");
    return { success: false, message: "Identifiant utilisateur invalide.", users: null };
  }

  try {
    console.log("6.0.3 dbQuery selectUsersCRM => sélection...");
    const users = await db
      .select()
      .from(usersCrmUsersTable)
      .where(eq(usersCrmUsersTable.userId, userId));
    console.log("6.0.4 dbQuery selectUsersCRM => OK, nb=", users.length);
    return { success: true, message: "Sélection CRM réussie.", users };
  } catch (error) {
    console.error("6.0.5 dbQuery selectUsersCRM => erreur:", error);
    return { success: false, message: "Erreur lors de la sélection CRM.", users: null };
  }
}




//---------------------------------------------------------------------
//---------------------------------------------------------------------
//--------------7.0 Début insert one User Crm -----------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------


export async function insertOneCrmUser(user: FormatUserCrmInput) {
  console.log("7.0.1 dbQuery insertOneCrmUser, user =", user);

  //--------------------------------------------------------------
  // 7.0.3 .?/ dbQuery insertOneCrmUser => User exist OK/NO 
  //--------------------------------------------------------------
  try {
    console.log("7.0.3 .?/ dbQuery insertOneCrmUser => User exist OK/NO ");
    const existingUser = await db
      .select()
      .from(usersCrmUsersTable)
      .where(
        and(
          eq(usersCrmUsersTable.email, user.email)
        )
      );

    //--------------------------------------------------------------
    // 7.0.4 ../ dbQuery insertOneCrmUser => User exist
    //--------------------------------------------------------------
    if (existingUser.length > 0) {
      console.log("6.1.4 ../ dbQuery insertOneCrmUser => User exist", existingUser[0].id);
      const userFromDB = existingUser[0];

      //--------------------------------------------------------------
      // 7.0.5 ../.?/ dbQuery insertOneCrmUser => USER exist => upDate User OK/NO
      function isNullOrEmpty(value?: string): boolean {
        return value == null || value === "";
      }
      
      const transformedUser: FormatUserCrmInput = {
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

      console.log("7.0.6 ../.? dbQuery insertOneCrmUser=> USER exist => upDate User OK/NO", transformedUser);

        const updateUserResult = await updateOneCrmUser(userFromDB.id, transformedUser);

        //------------------------------------------------------------
        // 7.0.7 ../.. dbQuery insertOneCrmUser => USER OK => upDate OK
        if (updateUserResult.success) {
          console.log("7.0.7 ../../ dbQuery insertOneCrmUser => USER exist => upDate OK");
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
            message: "L'utilisateur existe déjà, mais la mise à jour a échoué : " + updateUserResult.message, 
            user: userFromDB
          };
        }
    }

    //-----------------------------------------------------------------
    // 7.0.6 ../ dbQuery insertOneCrmUser => USER no exist 
    //-----------------------------------------------------------------
    console.log("7.0.6 ../ dbQuery insertOneCrmUser => USER no exist");

    //--------------------------------------------------------------
    // 7.0.7 ../.? dbQuery insertOneCrmUser => USER no exist => insert User OK/NO
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
  
      console.log("7.0.8 ../.?/ dbQuery insertOneCrmUser => USER no exist => insert User OK/NO", userToInsert);
      const insertUserRes = await db
        .insert(usersCrmUsersTable)
        .values(userToInsert)
        .returning();

      //--------------------------------------------------------------
      // 7.0.9 ../.. dbQuery insertOneCrmUser => USER no exist => insert User OK
      console.log("7.0.9 ../.,/ FRONT dbQuery insertOneCrmUser => USER no exist => insert User OK");
      /////////////////////////////////////////////
      /////////////////////////////////////////////
      //////        STOP 1,2,3        /////////////
      /////////////////////////////////////////////
      /////////////////////////////////////////////
      return {
        success: true,
        message: "Nouvel enregistrement CRM utilisateur créé.",
        user: insertUserRes[0],
      };

    //--------------------------------------------------------------
    // 7.0.10 ../../ dbQuery insertOneCrmUser => USER no exist => insert User erreur" 
    } catch (error) {
      console.error("7.0.10 ../../ dbQuery insertOneCrmUser => USER no exist => insert User NO OK", error);
      return {
        success: false,
        message: "Nouvel enregistrement CRM utilisateur créé.",
        user: null,
      };  
    }

  //--------------------------------------------------------------
  // 7.0.11 ../ dbQuery insertOneCrmUser => USER OK/NO erreur" 
  } catch (error) {
    console.error("7.0.11 ../ dbQuery insertOneCrmUser => USER OK/NO erreur", error);
    return {
      success: false,
      message: "Erreur lors de l’insertion ou mise à jour CRM utilisateur.",
      user: null,
    };
  }
}

//------------------------------------------------------------------
//
// updateOneCrmUser remains unchanged below
//------------------------------------------------------------------
export async function updateOneCrmUser(id: number, user: FormatUserCrmInput) {
  console.log("7.1.0 dbQuery updateOneCrmUser avec l'id: ", id);
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

    console.log("7.1.2 ../ dbQuery updateOneCrmUser OK/NO");
    const updateOneUserCrmRes = await db
      .update(usersCrmUsersTable)
      .set(userToUpdateRaw)
      .where(eq(usersCrmUsersTable.id, id));
    console.log("7.1.3 dbQuery updateOneCrmUser OK ");

    return {
      success: true,
      message: "Utilisateur mis à jour avec succès !",
      user: userToUpdateRaw
    };
  } catch (error) {
    console.error("7.1.4 dbQuery updateOneCrmUser NO OK:", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour de l'utilisateur.",
      user: null
    };
  }
}


