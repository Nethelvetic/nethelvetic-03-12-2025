"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CarteVImgTxtBgGN from "./cart-V-Img-Txt-BgGN";
import ContBtnLgNoEffetBgG from "./cont-Btn-Lg-NoEffet-BgG";
import { selectionUserWithEmailAndPassword } from "../db/dbQuery-Users";
import VarZustand from '../util/zustand';
import Cookies from "js-cookie";
import courrielPw from "../email/email-Pw";

const FormSeConnecter: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique   --------------------
  //---------------------------------------------------------------------
  console.log("1.0 Front FormConnect debut");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserAdmin } = VarZustand();

  const router = useRouter();

  //---------------------------------------------------------------------
  //------------------------2 Début comportement   ----------------------
  //---------------------------------------------------------------------
  //------------------------------------------------------------
  //  useEffect pour vérifier le cookie JSON à l'ouverture du composant
  //------------------------------------------------------------
  useEffect(() => {
    console.log("2.0.0 Front FormConnect useEffect debut");
    const cookieStr = Cookies.get('myData');
    const cookieData = cookieStr ? JSON.parse(cookieStr) : undefined;
    console.log("2.0.1 Front FormConnect useE Cookie=", cookieData);

    if (cookieData) {
      if (cookieData.userAdmin === "jerome1872Troistorrents") {
        console.log("2.0.2 Front FormConnect useE => userAdmin = jerome1872Troistorrents");
        setUserAdmin("jerome1872Troistorrents");
        router.push("/admin/users");
      } else if (cookieData.userAdmin === "user2025Nethelvetic") {
        console.log("2.0.3 Front FormConnect useE =>  = user2025Nethelvetic");
        setUserAdmin("user2025Nethelvetic");
        router.push("/gestion360/identifier");
      } else {
        console.log("2.0.4 Front FormConnect useE =>  userAdmin = vide ");
        router.push("/formulaire/seConnecter");
      }
    }
  }, [router, setUserAdmin]);

  //---------------------------------------------------------------------
  //    2.1.0 handleSubmit si le cookie est non présent 
  //---------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("2.1.3 Front FormConnect handleSubmit debut");
    e.preventDefault();

    if (!username || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    console.log("2.1.4 Front FormConnect handleSubmit Connect avec :", { username, password });

    //---------------------------------------------------------------------
   //    2.1.0 handleSubmit => selectionUserWithEmailAndPw
    try {
      console.log("2.1.5 Back FormConnect handleSubmit => selectionUserWithEmailAndPw");
      const result = await selectionUserWithEmailAndPassword(username, password);

      //------------------------------------------------------------
      // 2.1.6 Front FormConnect handleSubmit  => selectionUserWithEmailAndPw SUCCES => set Zustand & cookies
      if (result && result.success) {
        console.log("2.1.6 Front FormConnect handleSubmit => selectionUserWithEmailAndPw SUCCESS");
        const { user, saas } = result;
        
        // 2.1.7 set Zustand
        setUserAdmin(saas.identification);

        //2.1.8 set cookies
        console.log("2.1.6 Front FormConnect handleSubmit => selectionUserWithEmailAndPw SUCCESS => set cookies");
        const myData = {
          userAdmin: saas.identification,
          userImgUrl: user.imgUrl,
          userEmail: user.email,
        };
        Cookies.set('myData', JSON.stringify(myData), { expires: 1, path: '/' });

        //2.1.9 route push
        if (saas.identification === "jerome1872Troistorrents") {
          router.push("/admin/users");
        } else if (saas.identification === "user2025Nethelvetic") {
          router.push("/gestion360/identifier");
        } else {
          router.push("/formulaire/seConnecter");
        }
      } else {
        //------------------------------------------------------------
        // 2.1.7 Front FormConnect handleSubmit  => selectionUserWithEmailAndPw NO SUCCES
        console.log("2.1.10 Front FormConnect handleSubmit selectionUserWithEmailAndPw NO SUCCESS: ", result);

        // 2.1.8 set cookies
        const myData = {
          userAdmin: result.user?.email === "golliard73@gmail.com" ? "jerome1872Troistorrents": "user2025Nethelvetic",
          userImgUrl: result.user?.imgUrl || "",
          userEmail: result.user?.email || "",
        };
        Cookies.set('myData', JSON.stringify(myData), { expires: 1, path: '/' });
        alert(result.message);
      }
    } catch (error) {
      console.error("2.1.8 Front FormConnect handleSubmit Erreur:", error);
      alert("Une erreur est survenue lors de la connexion.");
    }
  };

  //---------------------------------------------------------------------
  //    2.2.0 handleForgotPassword sur clic du bouton "mot de passe oublié"
  //---------------------------------------------------------------------
  const handleForgotPassword = async () => {
    console.log("2.2.0 Front FormConnect handleForgotPassword debut");
    if (!username) {
      alert("Veuillez renseigner votre email pour réinitialiser votre mot de passe.");
      return;
    }

    //------------------------------------------------------------
    // 2.2.1 Front FormConnect handleSubmit  => selectionUserWithEmailAndPw NO SUCCES
     console.log("2.2.1 Front FormConnect handleForgotPassword => set Cookies ");

    // 2.2.2 set cookies
     const myData = {
       userAdmin: username === "golliard73@gmail.com" ? "jerome1872Troistorrents": "user2025Nethelvetic",
       userImgUrl: "",
       userEmail: username || "",
     };
     Cookies.set('myData', JSON.stringify(myData), { expires: 1, path: '/' });

    try {
      console.log("2.2.3 Back FormConnect handleForgotPassword => courrielPw() ");
      const courrielPeResult = await courrielPw(username);

      // 2.2.4 Back FormConnect handleForgotPassword => courrielPw() SUCESS
      if (courrielPeResult && courrielPeResult.success) {
        alert("Un email de réinitialisation a été envoyé à " + username);
      } else {
        alert(
          courrielPeResult?.message ||
            "Une erreur est survenue lors de l'envoi de l'email de réinitialisation."
        );
      }
    } catch (error) {
      console.error("2.2.4 Front FormConnect handleForgotPassword erreur: ", error);
      alert("Erreur lors de l'envoi de l'email.");
    }
  };

  //---------------------------------------------------------------------
  //    2.3.0 handleInscription sur clic du bouton "Inscription"
  //---------------------------------------------------------------------
  const handleInscription = () => {
    console.log("2.3.0 Front FormConnect  handleInscription debut");
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
            <label htmlFor="email" className="block text-sm md:text-xl font-medium text-left">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(username)}`}
              autoComplete="username"
              required
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="w-full">
            <label htmlFor="password" className="block text-sm md:text-xl font-medium text-left">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(password)}`}
              autoComplete="current-password"
              required
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
