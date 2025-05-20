"use server";

import { 
  userOneInsert, 
  usersSelect, 
  userOneSelect, 
  userOneUpDate, 
  userOneDelete,
  crmUserEmailAndPwSelect,
  crmUserActif
} from "./dbNeon";

  type UserInput = {
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
  };
  
  

//--------------------------------------------------------------------------------
//------------------------1  Fonction createUser ---------------------------------
//--------------------------------------------------------------------------------
export async function userInsertOne(user: UserInput) {
  console.log("1.0 BACK createUser Début");
  return await userOneInsert(user);
}

//-------------------------------------------------------------------------------
//------------------------2  Fonction selectionUsers ----------------------------
//-------------------------------------------------------------------------------
export async function usersSelectAll() {
  console.log("2.0 Début usersSelect");
  return await usersSelect();
}

//--------------------------------------------------------------------------------
//------------------------3  Fonction selectionOneUser ----------------------------
//--------------------------------------------------------------------------------
export async function userSelectOne(id: number) {
  console.log("3.0 Début userOneSelect avec l'id =", id);
  return await userOneSelect(id);
}

//--------------------------------------------------------------------------------
//------------------------4  Fonction actualiserOneUser ----------------------------
//--------------------------------------------------------------------------------
export async function userUpdateOne(id: number, user: UserInput) {
  console.log("4.0 Début updateUser pour l'id =", id);
  return await userOneUpDate(id, user);
}

//--------------------------------------------------------------------------------
//------------------------5  Fonction suppOneUser ----------------------------
//--------------------------------------------------------------------------------
export async function userDeleteOne(id: number) {
  console.log("5.0 Début deleteUser pour l'id =", id);
  return await userOneDelete(id);
}

