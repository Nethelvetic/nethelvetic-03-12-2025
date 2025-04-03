"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import CarteVImgTxtBgGN from "./cart-V-Img-Txt-BgGN";
import ContBtnLgBgG from "./cont-Btn-Lg-BgG";
import { selectionUserWithEmailAndPassword } from "../db/dbQuery-Users"; 

const FormSeConnecter: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique   --------------------
  //---------------------------------------------------------------------
  console.log("1.0 FormSeConnecter debut");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  //---------------------------------------------------------------------
  //------------------------2 Début comportement   ----------------------
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  //    2.1.0 handleSubmit sur clique du bouton se connecter  
  //---------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("2.1.0 FormSeConnecter handleSubmit debut");
    e.preventDefault();
    if (!username || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    console.log("2.1.1 FormSeConnecter handleSubmit Connexion avec :", { username, password });
    try {
      console.log("2.1.2 FormSeConnecter handleSubmit try avant");
      const result = await selectionUserWithEmailAndPassword(username, password);
      if (result && result.success) {
        console.log("2.1.3 FormSeConnecter handleSubmit resultat = success");
        router.push("/formulaire/contact");
      } else {
        console.log("2.1.4 FormSeConnecter handleSubmit resultat = incorrects");
        alert("Identifiants incorrects.");
      }
    } catch (error) {
      console.log("2.1.5 FormSeConnecter handleSubmit erreur :", error);
      console.error("Erreur de connexion :", error);
      alert("Une erreur est survenue lors de la connexion.");
    }
  };

  //---------------------------------------------------------------------
  //    2.2.0 handleForgotPassword sur clique du bouton "mot de passe oublié"  
  //---------------------------------------------------------------------
  const handleForgotPassword = async () => {
    console.log("2.2.0 handleForgotPassword debut username :", username);
    if (!username) {
      alert("Veuillez renseigner votre email pour réinitialiser votre mot de passe.");
      return;
    }
    try {
      console.log("2.2.1 handleForgotPassword try avant");
      alert("Un email de réinitialisation a été envoyé à " + username);
    } catch (error) {
      console.error("2.2.2 handleForgotPassword Erreur:", error);
      alert("Erreur lors de l'envoi de l'email.");
    }
  };


//---------------------------------------------------------------------
  //    2.3.0 handleInscription sur clique du bouton "Inscription"  
  //---------------------------------------------------------------------
  const handleInscription = async () => {
    console.log("2.3.0 handleInscription debut username :");
    router.push("/formulaire/inscription");
     
  };


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
          {/* Champ Email */}
          <div className="w-full">
            <label className="block text-sm md:text-xl font-medium text-left">
              Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(username)}`}
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="w-full">
            <label className="block text-sm md:text-xl font-medium text-left">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(password)}`}
            />
          </div>

          {/* Bouton "Se connecter" */}
          <div className="w-full pt-3 pb-3">
            <ContBtnLgBgG>
              <button type="submit" className="w-full h-full">
                Se connecter
              </button>
            </ContBtnLgBgG>
          </div>

          {/* Boutons "Mot de passe oublié" et "S'inscrire" sur la même ligne, avec uniquement une bordure en bas */}
          <div className="w-full pt-3 pb-3">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="flex-1 h-12 border-b !border-white !bg-black text-white py-2 rounded cursor-pointer transition-all duration-300 hover:!bg-gray-800"
              >
                Mot de passe oublié  
              </button>
              <button
                type="button"
                onClick={handleInscription}
                className="flex-1 h-12 border-b !border-white !bg-black text-white py-2 rounded cursor-pointer transition-all duration-300 hover:!bg-gray-800"
              >
                S'inscrire
              </button>
            </div>
          </div>
        </form>
      </CarteVImgTxtBgGN>
    </div>
  );
};

export default FormSeConnecter;
