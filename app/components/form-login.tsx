"use client";

import React, { useState } from "react";
import CarteVImgTxtBgGN from "./cart-V-Img-Txt-BgGN";
import ContBtnLgBgG from "./cont-Btn-Lg-BgG";

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
    if (!username || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setError("");
    console.log("Connexion avec :", { username, password });
  };

  // Fonction pour déterminer les classes CSS en fonction du contenu du champ
  const getInputClass = (value: string) =>
    value
      ? "bg-white text-black placeholder-gray-500"
      : "bg-transparent text-white placeholder-white";

  //---------------------------------------------------------------------
  //------------------------3 Début affichage   ---------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6">
      <CarteVImgTxtBgGN imageSrc="/ordinateur3Bg.png" title="">
        <form onSubmit={handleSubmit} className="space-y-4 p-4 mx-auto max-w-md">
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Champ Email */}
          <div className="w-full">
            <label className="block text-sm md:text-xl font-medium">
              Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(
                username
              )}`}
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="w-full">
            <label className="block text-sm md:text-xl font-medium">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(
                password
              )}`}
            />
          </div>

          {/* Bouton de soumission */}
          <div className="w-full pt-3 pb-3">
            <ContBtnLgBgG>
              <button type="submit" className="w-full h-full">
                Envoyer
              </button>
            </ContBtnLgBgG>
          </div>
        </form>
      </CarteVImgTxtBgGN>
    </div>
  );
};

export default FormLogin;
