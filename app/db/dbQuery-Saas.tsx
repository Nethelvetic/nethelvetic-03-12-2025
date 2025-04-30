"use server"; 
import { insertSaas, selectSaas, selectUnSaas, updateUnSaas, deleteUnSaas   } from "./dbQuery";

type SaasInput = {
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
//------------------------1.1  Fonction insert Saas ------------------------------
//--------------------------------------------------------------------------------
export async function createSaas(saas: SaasInput) {
  console.log("1.0 dbQuery-Saas createSaas ");
  return await insertSaas(saas);
}



//--------------------------------------------------------------------------------
//------------------------1.2  Fonction selectSaas ----------------------------
//--------------------------------------------------------------------------------
export async function selectionSaas() {
  console.log("1.2 dbQuery-Saas  selectSaas");
  return await selectSaas();
}



//--------------------------------------------------------------------------------
//------------------------1.3  Fonction selectUnSaas -----------------------------
//--------------------------------------------------------------------------------
export async function selectionUnSaas(id:number) {
  console.log("1.3 dbQuery-Saas selectUnSaas");
  return await selectUnSaas(id);
}



//--------------------------------------------------------------------------------
//------------------------1.4  Fonction updateUnSaas -----------------------------
//--------------------------------------------------------------------------------
export async function actualiserUnSaas(id:number, saas:SaasInput) {
  console.log("1.4 dbQuery-Saas actualiserUnSaas");
  return await updateUnSaas(id, saas);
}


//--------------------------------------------------------------------------------
//------------------------1.5  Fonction suppUnSaas -------------------------------
//--------------------------------------------------------------------------------
export async function suppUnSaas(id:number) {
  console.log("1.5 BACK dbQuery-Saas  suppUnSaas");
  return await deleteUnSaas(id);
}

