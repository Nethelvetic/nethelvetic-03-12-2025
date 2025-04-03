"use client"

import React, { useState, useRef } from 'react';
import fileStoreVercelBlob from '../../util/fileStoreVercelBlob';

type MessageDataType = {
  // Note : On passe de nameFile: string à file: File pour conserver l'objet complet
  file?: File; 
};

const initialMessageData: MessageDataType = {
  file: undefined,
};

export default function FormVercelBlob() {
  console.log("2.0 FormVercelBlob début");

  const [messageData, setMessageData] = useState<MessageDataType>(initialMessageData);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  //---------------------------------------------------------------------
  //------------------------3 Début comportement ------------------------
  //--------------------------------------------------------------------- 
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("2.1 FormVercelBlob handleClick début");
    e.preventDefault();

    if (!messageData.file) {
      alert("Aucun fichier à été sélectionné.");
      console.log("2.2 FormVercelBlob handleClick alert: aucun fichier sélectionné");
      return;
    }

    try {
      const file = messageData.file;
      console.log("2.3 FormVercelBlob handleClick try avant file:", file);
      // Note : On passe l'objet File en argument
      const response = await fileStoreVercelBlob(file);
      console.log("2.4 FormVercelBlob handleClick try après response:", response);
      setImageUrl(response);
    } catch (error) {
      console.error("2.4 FormVercelBlob handleClick erreur:", error);
    }
  };

  //---------------------------------------------------------------------
  //------------------------3 Début affichage ---------------------------
  //--------------------------------------------------------------------- 
  return (
    <>
      <div className="h-10 md:h-15"></div>
      <h1>Test de téléchargement de fichier</h1>
      <br />
      <form onSubmit={handleClick}>
        <input 
          type="file" 
          name="file"
          className="bg-red-500"
          ref={inputFileRef}
          // Note : pour un input de type file, il est généralement préférable d'utiliser e.target.files et non un value contrôlé
          onChange={(e) => {
            // Ici on récupère l'objet File du fichier sélectionné
            if (e.target.files && e.target.files[0]) {
              setMessageData({ file: e.target.files[0] });
            }
          }} 
        />
        <button type="submit" className="bg-blue-900 p-6 ms-4">
          téléchargement
        </button>
      </form>
      {imageUrl && (
        <div className="mt-4">
          <h2>Image retournée :</h2>
          <img src={imageUrl} alt="Réponse Blob" />
        </div>
      )}
    </>
  );
}
