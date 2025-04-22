"use server";

import { 
  insertOneUser, 
  selectUsers, 
  selectOneUser, 
  updateOneUser, 
  deleteOneUser,
  selectUserWithEmailAndPassword,
  selectUserWithActiveSaas
} from "./dbQuery";

  type UserInput = {
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
export async function createOneUser(user: UserInput) {
  console.log("1.0 createUser Début");
  return await insertOneUser(user);
}

//-------------------------------------------------------------------------------
//------------------------2  Fonction selectionUsers ----------------------------
//-------------------------------------------------------------------------------
export async function selectionUsers() {
  console.log("2.0 Début selectUsers");
  return await selectUsers();
}

//--------------------------------------------------------------------------------
//------------------------3  Fonction selectionOneUser ----------------------------
//--------------------------------------------------------------------------------
export async function selectionOneUser(id: number) {
  console.log("3.0 Début selectOneUser avec l'id =", id);
  return await selectOneUser(id);
}

//--------------------------------------------------------------------------------
//------------------------4  Fonction actualiserOneUser ----------------------------
//--------------------------------------------------------------------------------
export async function actualiserOneUser(id: number, user: UserInput) {
  console.log("4.0 Début updateUser pour l'id =", id);
  return await updateOneUser(id, user);
}

//--------------------------------------------------------------------------------
//------------------------5  Fonction suppOneUser ----------------------------
//--------------------------------------------------------------------------------
export async function suppOneUser(id: number) {
  console.log("5.0 Début deleteUser pour l'id =", id);
  return await deleteOneUser(id);
}



//--------------------------------------------------------------------------------
//-------------6  Fonction select user with email et passWord --------------------
//--------------------------------------------------------------------------------
export async function selectionUserWithEmailAndPassword(email: string, motDePasse: string ) {
  console.log("6.0 selectionUserWithEmailAndPassword pour l'email =", email);
  return await selectUserWithEmailAndPassword(email, motDePasse );
}
selectUserWithActiveSaas



//--------------------------------------------------------------------------------
//-------------6 Fonction select user with active Saas --------------------
//--------------------------------------------------------------------------------
export async function selectionUserWithActiveSaas(email: string, motDePasse: string ) {
  console.log("6.0 selectionUserWithEmailAndPassword pour l'email =", email);
  return await selectUserWithActiveSaas(email, motDePasse );
}