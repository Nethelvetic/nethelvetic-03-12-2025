"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import CarteVImgTxtBgGN from "./cart-V-Img-Txt-BgGN";
import ContBtnLgBgG from "./cont-Btn-Lg-BgG";
import envoiOneEmail from "../email/email-Inscription"; 


type FormDataType = {
  email: string;
  password: string;
  confirmPassword: string;
};


const initialFormData: FormDataType = {
  email: " ",
  password: " ",
  confirmPassword: " ",
};



const FormInscription: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique   --------------------
  //---------------------------------------------------------------------
  console.log("1.0 FormInscription debut");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();



  //---------------------------------------------------------------------
  //------------------------2 Début comportement   ----------------------
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  //    2.1.0 handleSubmit sur clique du bouton s'inscrire  
  //---------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("2.1.0 FormInscription handleSubmit debut");
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log("2.1.1 FormInscription handleSubmit Connexion avec :", { username, password, confirmPassword });
    
    try {
      console.log("2.1.2 FormInscription handleSubmit try avant");
      const result = await envoiOneEmail();
       if (result && result.success) {
         console.log("2.1.3 FormInscription handleSubmit resultat = success");
         router.push("/formulaire/contact");
       } else {
         console.log("2.1.4 FormInscription handleSubmit resultat = incorrects");
         alert("Identifiants incorrects.");
       }
    } catch (error) {
      console.log("2.1.5 FormInscription handleSubmit erreur :", error);
      console.error("Erreur de connexion :", error);
      alert("Une erreur est survenue lors de la connexion.");
    }
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
      <CarteVImgTxtBgGN imageSrc="/ordinateurEmail.webp" title="">
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

          {/* Champ Confirmation mot de passe */}
          <div className="w-full">
            <label className="block text-sm md:text-xl font-medium text-left">
              Confirmation mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(confirmPassword)}`}
            />
          </div>

          {/* Bouton "Se connecter" */}
          <div className="w-full pt-3 pb-3">
            <ContBtnLgBgG>
              <button type="submit" className="w-full h-full">
                S'inscrire
              </button>
            </ContBtnLgBgG>
          </div>
        </form>
      </CarteVImgTxtBgGN>
    </div>
  );
};

export default FormInscription;
