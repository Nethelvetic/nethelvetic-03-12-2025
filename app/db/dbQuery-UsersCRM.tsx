"use server";

import { selectUsersCrmUsers, insertOneCrmUser} from "./dbQuery";

  type UserCrmUsersInput = {
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
  
  

//-------------------------------------------------------------------------------
//------------------------2  Fonction selectionUsers ----------------------------
//-------------------------------------------------------------------------------
export async function selectionUsersCrmUsers(id: string) {
  console.log("2.0 back selectionUsersCrmUsers debut");
  return await selectUsersCrmUsers(id);
}



//-------------------------------------------------------------------------------
//------------------------2  Fonction creation on CrmUsers ----------------------------
//-------------------------------------------------------------------------------
export async function insertionCrmUsers(user: UserCrmUsersInput) {
  console.log("2.0 back selectionUsersCrmUsers debut");
  return await insertOneCrmUser(user);
}
