"use server";

import { 
  insertOneMessage, 
  selectMessages, 
  selectOneMessage, 
  updateOneMessage, 
  deleteOneMessage 
} from "./dbNeon";

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
export async function createOneMessage(message: MessageInput) {
  console.log("1.0 BACK createMessage Début");
  return await insertOneMessage(message);
}

//--------------------------------------------------------------------------------
//------------------------ 2  Fonction selectionMessages ----------------------------
//--------------------------------------------------------------------------------
export async function selectionMessages() {
  console.log("2.0 Début selectMessages");
  return await selectMessages();
}

//--------------------------------------------------------------------------------
//------------------------ 3  Fonction selectionOneMessage ----------------------------
//--------------------------------------------------------------------------------
export async function selectionOneMessage(id: number) {
  console.log("3.0 Début selectOneMessage avec l'id =", id);
  return await selectOneMessage(id);
}

//--------------------------------------------------------------------------------
//------------------------ 4  Fonction actualiserOneMessage ----------------------------
//--------------------------------------------------------------------------------
export async function actualiserOneMessage(id: number, message: MessageInput) {
  console.log("4.0 Début updateMessage pour l'id =", id);
  return await updateOneMessage(id, message);
}

//--------------------------------------------------------------------------------
//------------------------ 5  Fonction suppOneMessage ----------------------------
//--------------------------------------------------------------------------------
export async function suppOneMessage(id: number) {
  console.log("5.0 Début deleteMessage pour l'id =", id);
  return await deleteOneMessage(id);
}
