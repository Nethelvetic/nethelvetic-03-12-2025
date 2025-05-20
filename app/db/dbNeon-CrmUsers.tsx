"use server"; 
import { crmUserInsert,  crmUsersAllSelect, crmUserOneSelect, crmUserUpdate, crmUserDelete, crmUserEmailAndPwSelect, crmUserActif   } from "./dbNeon";

type crmUserType = {
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

//--------------------------------------------------------------------------------
//------------------------1.1  Fonction insert crm ------------------------------
//--------------------------------------------------------------------------------
export async function crmUserInsertion(crmUser: crmUserType) {
  console.log("1.0 dbNeon -crm crmUserInsertion ");
  return await crmUserInsert(crmUser);
}



//--------------------------------------------------------------------------------
//------------------------1.2  Fonction crmUsersAllSelect ------------------------
//--------------------------------------------------------------------------------
export async function crmUsersAllSection() {
  console.log("1.2 dbNeon -crm  crmUsersAllSelect");
  return await crmUsersAllSelect;
}



//--------------------------------------------------------------------------------
//------------------------1.3  Fonction crmUserOneSelect -------------------------
//--------------------------------------------------------------------------------
// export async function crmUserOneSelection(id:number) {
export async function crmUserOneSelection(id:number) {
  console.log("1.3 dbNeon -crm crmUserOneSelect");
  return await crmUserOneSelect(id);
}



//--------------------------------------------------------------------------------
//------------------------1.4  Fonction crmUserUpdate -----------------------------
//--------------------------------------------------------------------------------
export async function crmUserUpdateOne(id:number, crm:crmUserType) {
  console.log("1.4 dbNeon -crm actualiserUncrm");
  return await crmUserUpdate(id, crm);
}


//--------------------------------------------------------------------------------
//------------------------1.5  Fonction suppUncrm -------------------------------
//--------------------------------------------------------------------------------
export async function crmUserSupp(id:number) {
  console.log("1.5 BACK dbNeon -crm  suppUncrm");
  return await crmUserDelete(id);
}




//--------------------------------------------------------------------------------
//-------------6  Fonction select user with email et passWord --------------------
//--------------------------------------------------------------------------------
export async function  crmUserEmailAndPwSelection(email: string, motDePasse: string ) {
  console.log("6.0 crmUserEmailAndPwSelection pour l'email =", email);
  return await  crmUserEmailAndPwSelect(email, motDePasse );
}



//--------------------------------------------------------------------------------
//-------------6 Fonction select user with active crm --------------------
//--------------------------------------------------------------------------------
export async function crmUserSelectOneActif(email: string, motDePasse: string ) {
  console.log("6.0 crmUserSelectOneActif pour l'email =", email);
  return await crmUserActif(email );
}