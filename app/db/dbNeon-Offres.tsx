"use server";

import {
  insertOffre,
  selectOffres,
  selectOneOffre,
  updateOffre,
  deleteOffre,
  duplicateOffre,
  updateOffreStatut,
} from "./dbNeon";
import { resend } from "../email/resend";

export async function createOffre(offre: any) {
  console.log("1.0 createOffre début");
  return await insertOffre(offre);
}

export async function listeOffres() {
  console.log("2.0 listeOffres début");
  return await selectOffres();
}

export async function detailOffre(id: number) {
  console.log("3.0 detailOffre id=", id);
  return await selectOneOffre(id);
}

export async function modifOffre(id: number, offre: any) {
  console.log("4.0 modifOffre id=", id);
  return await updateOffre(id, offre);
}

export async function supprimeOffre(id: number) {
  console.log("5.0 supprimeOffre id=", id);
  return await deleteOffre(id);
}

export async function dupliqueOffre(id: number) {
  console.log("6.0 dupliqueOffre id=", id);
  return await duplicateOffre(id);
}

export async function changeStatutOffre(id: number, statut: string) {
  console.log("7.0 changeStatutOffre id=", id, statut);
  return await updateOffreStatut(id, statut);
}

export async function envoyerOffreParEmail(id: number, email: string) {
  console.log("8.0 envoyerOffreParEmail id=", id);
  await resend.emails.send({
    from: 'Nethelvetic <do-not-reply@test.nethelvetic.ch>',
    to: [email],
    subject: 'Votre offre',
    text: `Voici l\'offre numéro ${id}`,
  });
  return { success: true };
}

export function lienWhatsAppOffre(id: number) {
  console.log("9.0 lienWhatsAppOffre id=", id);
  const text = encodeURIComponent(`Voici votre offre n°${id}`);
  return `https://wa.me/?text=${text}`;
}

export async function generePdfOffre(id: number) {
  console.log("10.0 generePdfOffre id=", id);
  // Placeholder pour génération PDF
  return { success: true };
}

export async function convertitEnFacture(id: number) {
  console.log("11.0 convertitEnFacture id=", id);
  // Placeholder conversion en facture
  return { success: true };
}

