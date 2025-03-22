"use server";

import { 
  insertUser, 
  selectUsers, 
  selectOneUser, 
  updateUser, 
  deleteUser 
} from "./dbQuery";

type UserInput = {
  nom: string;
  prenom: string;
  texte: string;
  date_creation: string;
  email: string;
};

//--------------------------------------------------------------------------------
//------------------------1  Fonction createUser ---------------------------
//--------------------------------------------------------------------------------
export async function createUser(user: UserInput) {
  console.log("Début createUser");
  return await insertUser(user);
}

//--------------------------------------------------------------------------------
//------------------------2  Fonction selectionUsers ----------------------------
//--------------------------------------------------------------------------------
export async function selectionUsers() {
  console.log("Début selectUsers");
  return await selectUsers();
}

//--------------------------------------------------------------------------------
//------------------------3  Fonction selectionOneUser ----------------------------
//--------------------------------------------------------------------------------
export async function selectionOneUser(id: number) {
  console.log("Début selectOneUser avec l'id =", id);
  return await selectOneUser(id);
}

//--------------------------------------------------------------------------------
//------------------------4  Fonction actualiserOneUser ----------------------------
//--------------------------------------------------------------------------------
export async function actualiserOneUser(id: number, user: UserInput) {
  console.log("Début updateUser pour l'id =", id);
  return await updateUser(id, user);
}

//--------------------------------------------------------------------------------
//------------------------5  Fonction suppOneUser ----------------------------
//--------------------------------------------------------------------------------
export async function suppOneUser(id: number) {
  console.log("Début deleteUser pour l'id =", id);
  return await deleteUser(id);
}
