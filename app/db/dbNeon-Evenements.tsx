"use server"; 

import { insertEvenement, selectEvenements, selectUnEvenement, updateUnEvenement, deleteUnEvenement   } from "./dbNeon";
 
type EvenementInput = {
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
  btnModifUrl: string
};


//--------------------------------------------------------------------------------
//------------------------1.1  Fonction insert Formation ---------------------------
//--------------------------------------------------------------------------------
export async function createEvenement(evenement: EvenementInput) {
  console.log("1.0 BACK Page dbNeon -Evenements createEvenement ");
  return await insertEvenement(evenement);
}



//--------------------------------------------------------------------------------
//------------------------1.2  Fonction selectFormation ----------------------------
//--------------------------------------------------------------------------------
export async function selectionEvenements() {
  console.log("1.2 dbNeon -Evenements  selectEvenements");
  return await selectEvenements();
}



//--------------------------------------------------------------------------------
//------------------------1.3  Fonction selectUneFormation -----------------------
//--------------------------------------------------------------------------------
export async function selectionUnEvenement(id:number) {
  console.log("1.3 dbNeon -Evenements  selectUnEvenement");
  return await selectUnEvenement(id);
}



//--------------------------------------------------------------------------------
//------------------------1.4  Fonction updateUneFormation -----------------------
//--------------------------------------------------------------------------------
export async function actualiserUnEvenement(id:number, evenement:EvenementInput) {
  console.log("1.4 dbNeon -Evenements  actualiserUnEvenement");
  return await updateUnEvenement(id, evenement);
}


//--------------------------------------------------------------------------------
//------------------------1.5  Fonction suppUneFormation -------------------------
//--------------------------------------------------------------------------------
export async function suppUnEvenement(id:number) {
  console.log("1.5 dbNeon -Evenements  suppUnEvenement");
  return await deleteUnEvenement(id);
}
