"use server";

import { crmUsers_UsersAllSelect, crmUser_userUpdateById, crmUser_userDelete, crmUser_userInsert, crmUsers_usersOneSelect} from "./dbNeon";

  type CrmUsers_userType = {
    nom_entreprise: string;             // varchar(255) non null
    personne_a_contacter: string;        // varchar(255) non null
    ville: string;                       // varchar(255), optionnel
    code_postal: string;
    telephone: string;                  // varchar(20), unique, optionnel
    date_de_naissance: string;          // date, optionnel
    date_creation: string;               // date non null (format ISO ou "YYYY-MM-DD")
    email: string;                       // varchar(255) non null, unique
    username: string;                   // varchar(255), unique, optionnel
    status: string;                     // varchar(50), optionnel (ex: "actif", "inactif", "suspendu")
    domaine_activite: string;           // varchar(255), optionnel (anciennement "profession")
    employeur: string;                  // varchar(255), optionnel
    status_professionnel: string;       // varchar(255), optionnel
    adresse: string;                    // text(), optionnel
    imgUrl: string;                     // varchar(255), optionnel (URL de l'image de profil)
    btnUrlInt: string;                  // varchar(255), optionnel
    btnUrlExt: string;                  // varchar(255), optionnel
    btnTexte: string;                    // varchar(255) non null
    btnModifUrl: string;                 // varchar(255) non null
    userId: number;                      // référence à usersTable.id
  };


  type CrmUsersType = {
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

  
  
  
  

//-------------------------------------------------------------------------------
//------------------------1  Fonction selectionUsers ----------------------------
//-------------------------------------------------------------------------------
export async function crmUsers_usersAllSelection(id: string) {
  console.log("2.0 back crmUsers_usersAllSelection debut");
  return await crmUsers_UsersAllSelect(id);
}



//-------------------------------------------------------------------------------
//------------------------2  Fonction creation on CrmUsers ----------------------
//-------------------------------------------------------------------------------
// export async function crmUser_userInsertioncrmUser_user: CrmUsers_userType) {
export async function crmUser_userInsertion(crmUser_user: CrmUsers_userType) {
  console.log("2.0 crmUser_userInsertion debut");
  return await crmUser_userInsert(crmUser_user);
}


//-------------------------------------------------------------------------------
//------------------------3  Fonction selections One user CRM -------------------
//-------------------------------------------------------------------------------
export async function crmUser_userOneSelection(crmUser_userId: string) {
  console.log("3.0 crmUser_userOneSelection debut");
  return await crmUsers_usersOneSelect(crmUser_userId);
}



//-------------------------------------------------------------------------------
//------------------------4  Fonction supprimer One user CRM -------------------
//-------------------------------------------------------------------------------
  console.log("4.0 crmUser_userSupprimer debut");
export async function crmUser_userSupprimer(crmUser_userId: number) {
  console.log("2.0 crmUser_userSupprimer debut");
  return await crmUser_userDelete(crmUser_userId);
}





//-------------------------------------------------------------------------------
//------------------------5  Fonction supprimer One user CRM -------------------
//-------------------------------------------------------------------------------
export async function crmUser_userUpdateOne(crmUser_userId: number, crmUser_user: CrmUsers_userType ) {
  console.log("5.0 crmUser_userUpdateOne debut");
  return await crmUser_userUpdateById(crmUser_userId, crmUser_user);
}




