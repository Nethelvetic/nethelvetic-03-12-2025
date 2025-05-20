"use server";

import { 
  userOneInsert, 
} from "./dbSupabase";

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

