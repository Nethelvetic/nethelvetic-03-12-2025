"use server"; 


import { insertFormation, selectFormation, selectUneFormation, updateUneFormation, deleteUneFormation } from "./dbQuery";

type FormationInput = {
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
  btnModifUrl: string;
};


//--------------------------------------------------------------------------------
//------------------------1  Fonction insert Formation ---------------------------
//--------------------------------------------------------------------------------
export async function createFormation(formation: FormationInput) {
  console.log("3.0 debut createFormation ");
  return await insertFormation(formation);
}



//--------------------------------------------------------------------------------
//------------------------2  Fonction selectFormation ----------------------------
//--------------------------------------------------------------------------------
export async function selectionFormation() {
  console.log("3.1 debut selectFormation");
  return await selectFormation();
}


//--------------------------------------------------------------------------------
//------------------------3  Fonction selectUneFormation ----------------------------
//--------------------------------------------------------------------------------
export async function selectionUneFormation(id:number) {
  console.log("3.1 debut selectFormation");
  return await selectUneFormation(id);
}



//--------------------------------------------------------------------------------
//------------------------4  Fonction updateUneFormation ----------------------------
//--------------------------------------------------------------------------------
export async function actualiserUneFormation(id:number, formation:FormationInput) {
  console.log("3.1 debut selectFormation");
  return await updateUneFormation(id, formation);
}


//--------------------------------------------------------------------------------
//------------------------5  Fonction suppUneFormation ----------------------------
//--------------------------------------------------------------------------------
export async function suppUneFormation(id:number) {
  console.log("3.1 debut selectFormation");
  return await deleteUneFormation(id);
}
