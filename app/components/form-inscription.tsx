"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import CarteVImgTxtBgGN from "./cart-V-Img-Txt-BgGN";
import ContBtnLgNoEffetBgG from "./cont-Btn-Lg-NoEffet-BgG";
import courrielInscription from "../email/email-Inscription"; 
import { createOneUserInscription } from "../db/dbQuery-Inscription"; 

//-------------------------------------------------------------------------------------
//------------------------Type d'utilisateur et données initiales-----------------------
//-------------------------------------------------------------------------------------
type UserDataType = {
  nom_entreprise?: string;
  personne_a_contacter?: string;
  ville?: string;
  code_postal?: string;
  telephone?: string;
  date_de_naissance?: string;
  date_creation: string;
  email: string;
  mot_de_passe?: string;
  username?: string;
  statut?: string;
  domaine_activite?: string;
  employeur?: string;
  statut_professionnel?: string;
  adresse?: string;
  imgUrl?: string;
  btnUrlInt?: string;
  btnUrlExt?: string;
  btnTexte?: string;
  btnModifUrl: string;
  date?: string;
  titre?: string;
  texte?: string;
  prix?: number;
  heure?: string;
  lieu?: string;
};

const initialUserData: UserDataType = {
  nom_entreprise: "",
  personne_a_contacter: "",
  ville: "",
  code_postal: "",
  telephone: "",
  date_de_naissance: "",
  date_creation: "",
  email: "",
  mot_de_passe: "",
  username: "",
  statut: "",
  domaine_activite: "",
  employeur: "",
  statut_professionnel: "",
  adresse: "",
  imgUrl: "",
  btnUrlInt: "/formulaire/contact",
  btnUrlExt: "",
  btnTexte: "modification",
  btnModifUrl: "/admin/users",
  date: "",
  titre: "",
  texte: "",
  prix: 0,
  heure: "",
  lieu: ""
};

//-------------------------------------------------------------------------------------
//------------------------Composant FormInscription-------------------------------------
//-------------------------------------------------------------------------------------
const FormInscription: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique   --------------------
  //---------------------------------------------------------------------
  console.log("1.0.0 FormInscription debut");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const getInputClass = (value: string) =>
    value
      ? "bg-white text-black placeholder-gray-500"
      : "bg-transparent text-white placeholder-white";

  //---------------------------------------------------------------------
  //------------------------2 Début comportement   ----------------------
  //---------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("2.1.0 FormInscription handleSubmit debut");
    e.preventDefault();

    //-------------------------------------------------------------------
    //    2.1.0 contrôle champs remplis et password identique 
    //-------------------------------------------------------------------
    if (!username || !password || !confirmPassword) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log("2.1.1 FormInscription handleSubmit Connexion avec :", { username, password, confirmPassword });
    
    //-------------------------------------------------------------------
    //    2.2.0 Inser User et contrôle si User existe
    //-------------------------------------------------------------------
    try {
      const userToInsert = {
        nom_entreprise: "",
        personne_a_contacter: "",
        ville: "",
        code_postal: "",
        telephone: "",
        date_de_naissance: "",
        date_creation: new Date().toISOString().slice(0, 10), // format "YYYY-MM-DD"
        email: username, // Utilise la valeur saisie dans le champ Email
        mot_de_passe: password,
        username: "",
        statut: "",
        domaine_activite: "",
        employeur: "",
        statut_professionnel: "",
        adresse: "",
        imgUrl: "",
        btnUrlInt: "/formulaire/contact",
        btnUrlExt: "",
        btnTexte: "modification",
        btnModifUrl: "/admin/users",
      };

      console.log("2.2.1 FormInscription handleSubmit try avant createOneUserInscription");
      const createResult = await createOneUserInscription(userToInsert);
      if (createResult && createResult.success) {
        console.log("2.2.2 FormInscription handleSubmit try apres success= ", createResult.success);
        alert(createResult.message);
      } else {
        console.log("2.2.3 FormInscription handleSubmit try apres No success= ", createResult.success);
        alert(createResult.message);
        // Redirection vers la page de connexion en cas d'échec
        router.push("/formulaire/seConnecter");
        return; // Arrêt de l'exécution en cas d'échec
      }
    } catch (error) {
      console.error("2.2.4 FormInscription handleSubmit try apres erreur:", error);
      alert("Erreur lors de la création du compte.");
      return;
    }

    //-------------------------------------------------------------------
    //    2.3.0 envoi d'un email 
    //-------------------------------------------------------------------
    try {
      console.log("2.3.1 FormInscription handleSubmit try avant envoi d'email");
      const result = await courrielInscription(username );
      if (result && result.success) {
        console.log("2.3.2 FormInscription handleSubmit try apres envoi d'email = success");
        router.push("/formulaire/contact");
      } else {
        console.log("2.3.3 FormInscription handleSubmit try apres envoi d'email= incorrects");
        alert("Identifiants incorrects.");
      }
    } catch (error) {
      console.log("2.3.4 FormInscription handleSubmit try apres envoi d'email erreur :", error);
      console.error("Erreur de connexion :", error);
      alert("Une erreur est survenue lors de la connexion.");
    }
  };

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

          {/* Bouton "S'inscrire" */}
          <div className="w-full pt-3 pb-3">
            <ContBtnLgNoEffetBgG>
              <button type="submit" className="w-full h-full">
                S'inscrire
              </button>
            </ContBtnLgNoEffetBgG>
          </div>
        </form>
      </CarteVImgTxtBgGN>
    </div>
  );
};

export default FormInscription;
