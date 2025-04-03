  "use server"; 
  
  import { emailInscription } from "../email/email-Query";
  
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
  export default async function envoiOneEmail() {
    console.log("1.0 envoiOneEmail Début");
    return await emailInscription();
  }
  