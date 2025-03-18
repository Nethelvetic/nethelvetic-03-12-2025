"use client";

import React, { useState } from "react";
import CarteVImgTxtBgGN from './cart-V-Img-Txt-BgGN';
import ContBtnLgBgG from './cont-Btn-Lg-BgG';

const FormLogin: React.FC = () => { 
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique   --------------------
  //--------------------------------------------------------------------- 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //---------------------------------------------------------------------
  //------------------------2 Début comportement   ----------------------
  //--------------------------------------------------------------------- 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier si les champs sont remplis
    if (!username || !password) {
      setError("Veuillez remplir tous les champs."); 
      return;
    }

    setError(""); // Réinitialiser les erreurs
    console.log("Connexion avec :", { username, password });
  };

  //---------------------------------------------------------------------
  //------------------------3 Début affichage   -------------------------
  //--------------------------------------------------------------------- 
  return (
    <div className="p-6">
      {/*-----------------------------1 DEBUT CONTENEUR carte-V-Img-Txt-BgGN */}
      <CarteVImgTxtBgGN imageSrc="/ordinateur3Bg.png" title="">
        <form 
          onSubmit={handleSubmit} 
          className="space-y-4 p-4 mx-auto max-w-md">
          {/* Affichage de l'erreur */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Champ Email */}
          <div className="w-full">
            <label className="block text-sm md:text-xl font-medium">Email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}            
              className="mt-1 block w-full border-b border-gray-300 shadow-sm"
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="w-full">
            <label className="block text-sm md:text-xl font-medium">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border-b border-gray-300 shadow-sm"
            />
          </div>

          {/* Bouton de soumission */}
          <ContBtnLgBgG>
            <button type="submit" className="w-full h-full">
              Envoyer
            </button>
          </ContBtnLgBgG>
        </form>
      </CarteVImgTxtBgGN>
      {/*-----------------------------1 FIN CONTENEUR carte-V-Img-Txt-BgGN */}
    </div>
  );
};

export default FormLogin;
