  "use server"; 
  
  import { crmUser_EmailInscrit } from "./email-Query";
  
  // Type d'entrée pour un message 
  type MessageInput = {
    email: string,
    nom_entreprise: string;            // varchar(255) non null
    personne_a_contacter: string;       // varchar(255) non null
    ville: string;                      // varchar(255) non null
    code_postal: string;                // varchar(20), optionnel selon le schema
    message: string;                    // varchar(255) non null
    date: string;
  };
  
  //--------------------------------------------------------------------------------
  //------------------------ 1  Fonction createMessage ---------------------------
  //--------------------------------------------------------------------------------
  export default async function crmUser_EmailInscription(email: string) {
    console.log("1.0 crmUser_EmailInscription Début");
    return await crmUser_EmailInscrit(email);
  }
  