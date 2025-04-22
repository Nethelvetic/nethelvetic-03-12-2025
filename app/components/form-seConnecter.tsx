"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import CarteVImgTxtBgGN from "./cart-V-Img-Txt-BgGN";
import ContBtnLgNoEffetBgG from "./cont-Btn-Lg-NoEffet-BgG";
import { selectionUserWithActiveSaas } from "../db/dbQuery-Users"; 
import VarZustand from '../util/zustand';
import Cookies from "js-cookie";

const FormSeConnecter: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique   --------------------
  //---------------------------------------------------------------------
  console.log("1.0 FormSeConnecter debut");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  //------------------------------------------------------------
  //    1.0.2 Data dynamique de zustand 
  //------------------------------------------------------------
  const {setUserAdmin } = VarZustand ();




  //---------------------------------------------------------------------
  //------------------------2 Début comportement   ----------------------
  //---------------------------------------------------------------------
  
  //------------------------------------------------------------
  //  useEffect pour vérifier le cookie JSON à l'ouverture du composant
  //------------------------------------------------------------
  useEffect(() => {
    console.log("2.0.0 FormSeConnecter useEffect debut");
    const cookieStr = Cookies.get('myData');
    const cookieData = cookieStr ? JSON.parse(cookieStr) : undefined;
    console.log("2.0.1 FormSeConnecter useEffect Cookie=", cookieData);
  
    if (cookieData) {
      if (cookieData.userAdmin === "jerome1872Troistorrents") {
        console.log("2.0.2 FormSeConnecter useEffect: userAdmin = jerome1872Troistorrents");

        //------------------------------------------------------------
        // 2.0.3 FormSeConnecter useEffect: userAdmin = jerome1872Troistorrents => set Zustand
        setUserAdmin("jerome1872Troistorrents")
        router.push("/admin/users");

      } else if (cookieData.userAdmin === "user2025Nethelvetic") {
        console.log("2.0.3 FormSeConnecter useEffect: userAdmin = user2025Nethelvetic");

        //------------------------------------------------------------
        // 2.0.3 FormSeConnecter useEffect: userAdmin = user2025Nethelvetic => set Zustand
        setUserAdmin("user2025Nethelvetic")
        router.push("/gestion360/identifier");


      } else {
        console.log("2.0.4 FormSeConnecter useEffect: userAdmin = vide ");
        router.push("/formulaire/seConnecter");
      }
    }
  }, [router]);
  
  //---------------------------------------------------------------------
  //    2.1.0 handleSubmit si le cookie est non présent 
  //---------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("2.1.3 FormSeConnecter handleSubmit debut");
    e.preventDefault();

    if (!username || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    console.log("2.1.4 FormSeConnecter handleSubmit Connexion avec :", { username, password });

    
    //---------------------------------------------------------
    // 2.1.5 FormSeConnecter handleSubmit selectUserWithActiveSaas debut
    try {
      console.log("2.1.5 FormSeConnecter handleSubmit selectUserWithActiveSaas try avant");
      const result = await selectionUserWithActiveSaas(username, password);

      
      if (result && result.success) {
        console.log("2.1.6 FormSeConnecter handleSubmit selectUserWithActiveSaas SUCCESS");

        //--------------------------------------------------------
        // 2.1.6 FormSeConnecter handleSubmit selectUserWithActiveSaas SUCCESS => set Zustand
         setUserAdmin(result.user.saas.identification);

        //--------------------------------------------------------
        // 2.1.7 FormSeConnecter handleSubmit selectUserWithActiveSaas SUCCESS => set Coockies
        const myData = {
          userAdmin: result.user.saas.identification,
          userImgUrl: result.user.users.imgUrl,
          userEmail: result.user.users.email,
        };

        // Stocke l'objet JSON dans le cookie "myData"
        Cookies.set('myData', JSON.stringify(myData), { expires: 1, path: '/' });

        //--------------------------------------------------------
        // 2.1.8 FormSeConnecter handleSubmit selectUserWithActiveSaas SUCCESS => page admin/user ou getion360
        if (result.user.saas.identification  === "jerome1872Troistorrents") {
          router.push("/admin/users");
        } else if (result.user.saas.identification === "user2025Nethelvetic") {     
          router.push("/gestion360/identifier");
        } else {
          router.push("/formulaire/seConnecter");
        }

      //--------------------------------------------------------
      // 2.1.6 FormSeConnecter handleSubmit selectUserWithActiveSaas NO SUCCESS
      } else {
        console.log("2.1.9 Résultat incorrect dans handleSubmit");
        alert("Identifiants incorrects.");
      }

    //---------------------------------------------------------
    // 2.1.10 FormSeConnecter handleSubmit selectUserWithActiveSaas catch(error)
    } catch (error) {
      console.log("2.1.10 FormSeConnecter handleSubmit selectUserWithActiveSaas Erreur", error);
      alert("Une erreur est survenue lors de la connexion.");
    }
  };

  //---------------------------------------------------------------------
  //    2.2.0 handleForgotPassword sur clic du bouton "mot de passe oublié"
  //---------------------------------------------------------------------
  const handleForgotPassword = async () => {
    console.log("2.2.0 FormSeConnecter handleForgotPassword debut, username:", username);
    if (!username) {
      alert("Veuillez renseigner votre email pour réinitialiser votre mot de passe.");
      return;
    }
    try {
      console.log("2.2.1 FormSeConnecter handleForgotPassword try avant");
      alert("Un email de réinitialisation a été envoyé à " + username);
    } catch (error) {
      console.error("2.2.2 Erreur dans handleForgotPassword:", error);
      alert("Erreur lors de l'envoi de l'email.");
    }
  };

  //---------------------------------------------------------------------
  //    2.3.0 handleInscription sur clic du bouton "Inscription"
  //---------------------------------------------------------------------
  const handleInscription = async () => {
    console.log("2.3.0 FormSeConnecter handleInscription debut");
    router.push("/formulaire/inscription");
  };

  //---------------------------------------------------------------------
  //    Fonction de style pour les inputs
  //---------------------------------------------------------------------
  const getInputClass = (value: string) =>
    value
      ? "bg-white text-black placeholder-gray-500"
      : "bg-transparent text-white placeholder-white";

  //---------------------------------------------------------------------
  //------------------------3 Début affichage   ---------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6">
      <CarteVImgTxtBgGN imageSrc="/ordinateur3Bg.png" title="Se connecter">
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
            <ContBtnLgNoEffetBgG>
              <button type="submit" className="w-full h-full">
                Se connecter
              </button>
            </ContBtnLgNoEffetBgG>
          </div>

          {/* Boutons "Mot de passe oublié" et "S'inscrire" */}
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
