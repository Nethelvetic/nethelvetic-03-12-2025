"use server"
import { put } from '@vercel/blob';

export default async function fileStoreVercelBlob(file: File) {
  //---------------------------------------------------------------------
  //------------------------2 Début comportement ------------------------
  //---------------------------------------------------------------------
  console.log("2.0 fileStoreVercelBlob server Début");
  
  if (!file) {
    console.log("2.1 fileStoreVercelBlob server erreur");
    throw new Error("Le fichier est indéfini.");
  }
  
  // Note : Utiliser file.name pour le chemin et file pour le contenu
  const blob = await put(file.name, file, { access: 'public' });
  console.log("2.2 fileStoreVercelBlob server blob =", blob);
  console.log("2.3 fileStoreVercelBlob server blob.url =", blob.url);

  //---------------------------------------------------------------------
  //------------------------3 Début affichage ---------------------------
  //---------------------------------------------------------------------
  return blob.url;
}
