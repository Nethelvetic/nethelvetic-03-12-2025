"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import CarteVImgTxtBgGN from "./cart-V-Img-Txt-BgGN";
import ContBtnLgNoEffetBgG from "./cont-Btn-Lg-NoEffet-BgG";
import courrielInscription from "../email/email-Inscription"; 
import { createOneUserInscription } from "../db/dbQuery-Inscription"; 
import VarZustand from "../util/zustand";
import Cookies from "js-cookie";

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
  status?: string;
  domaine_activite?: string;
  employeur?: string;
  status_professionnel?: string;
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
  status: "",
  domaine_activite: "",
  employeur: "",
  status_professionnel: "",
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

const FormInscri: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique   --------------------
  //---------------------------------------------------------------------
  console.log("1.0.0 FormInscri debut");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  //------------------------------------------------------------
  //    1.0.2 varibale globale zustand 
  //------------------------------------------------------------
  const {  setUserAdmin } = VarZustand();

  //------------------------------------------------------------
  //    1.0.3 background du formulaire
  //------------------------------------------------------------
  const getInputClass = (value: string) =>
    value
      ? "bg-white text-black placeholder-gray-500"
      : "bg-transparent text-white placeholder-white";



  //---------------------------------------------------------------------
  //------------------------2 Début comportement   ----------------------
  //---------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("2.1.0 FormInscri HandleSubmit debut");
    e.preventDefault();

    //-------------------------------------------------------------------
    // 2.1.0 Contrôle : tous les champs sont remplis et les mots de passe identiques
    //-------------------------------------------------------------------
    if (!username || !password || !confirmPassword) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log("2.1.1 F.H. Connexion avec :", { username, password, confirmPassword });
    
    //-------------------------------------------------------------------
    // 2.2.0 FormInscri handleSubmit => createOneUserInscription
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
        status: "",
        domaine_activite: "",
        employeur: "",
        status_professionnel: "",
        adresse: "",
        imgUrl: "",
        btnUrlInt: "/formulaire/contact",
        btnUrlExt: "",
        btnTexte: "modification",
        btnModifUrl: "/admin/users",
      };

      const createOneUserInscResult = await createOneUserInscription(userToInsert);

      //-------------------------------------------------------------------
      // 2.2.1 F.H. => createOneUserInscri No success
      if (!createOneUserInscResult) {
        console.error("2.2.1 F.H.=> createOneUserInscri No success");
        alert("Une erreur est survenue lors de la création de votre compte.");
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////          STOP 1        ////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        return;
      }


      ///////////////////////////////////////////////////////////////////////
      // 2.2.2 FormInscri handleSubmit => createOneUserInscription SUCESS
      ///////////////////////////////////////////////////////////////////////
      if (createOneUserInscResult.success) {
        console.log("2.2.2 F.H. => createOneUserInscri SUCCESS");
        
        //------------------------------------------------------------
        // 2.2.4 F.H. => createOneUserInscri success => set Zustand & coockies
        if (createOneUserInscResult.user) {
          console.log("2.2.4 F.H. => createOneUserInscri SUCCESS => set Zustand & coockies");

          const userObj = Array.isArray(createOneUserInscResult.user)
            ? createOneUserInscResult.user[0]   // si c’est un tableau, on prend le premier élément
            : createOneUserInscResult.user;     // sinon, c’est déjà un objet

            //------------------------------------------------------------
            // 2.2.5 F.H => createOneUserInscri success => set Zustand & coockie => email = golliard73@gmail
            if (userObj.email = "golliard73@gmail.com") {
              console.log("2.2.5 F.H. => createOneUserInscri SUCCESS => set Zustand/coockies => email = golliard73@gmail");

              setUserAdmin("jerome1872Troistorrents")

              const myCookieData = {
                userAdmin: "jerome1872Troistorrents",  
                userImgUrl: userObj.imgUrl,
                userAdminEmail: username,             
              };
              Cookies.set('myData', JSON.stringify(myCookieData), { expires: 1, path: '/' });

            //------------------------------------------------------------
            // 2.2.6 F.H => createOneUserInscri success => set Zustand & coockie => email != golliard73@gmail.com
            }  else  if (createOneUserInscResult.saas) {
              console.log("2.2.6 F.H. => createOneUserInscri SUCCESS => set Zustand/coockies => emai != golliard73gmail.com");
    
              const saasObj = Array.isArray(createOneUserInscResult.saas)
                ? createOneUserInscResult.saas[0]  
                : createOneUserInscResult.saas;     
            
              setUserAdmin(saasObj.identification ?? "");

              const myCookieData = {
                userAdmin: "user2025Nethelvetic",  
                userImgUrl: userObj.imgUrl, 
                userAdminEmail: username,             
              };
              Cookies.set('myData', JSON.stringify(myCookieData), { expires: 1, path: '/' });
            }
        }


      ///////////////////////////////////////////////////////////////////////
      // 2.2.8 FormInscri handleSubmit => createOneUserInscri No SUCESS
      //////////////////////////// NO  SUCESS  //////////////////////////////
      } else {
        console.log("2.2.8 F.H. => createOneUserInscri NO SUCCES");
        alert(createOneUserInscResult.message);
      
        router.push("/formulaire/seConnecter");
        return;
      }

     //----------------------------------------------------------------------
     // 2.2.9 FormInscri handleSubmit => createOneUserInscri await erreur
    } catch (error) {
      console.error("2.2.9 F.H. => createOneUserInscri await erreur");
      alert(`Erreur lors de la création du compte ${error}`);
      return;
    }

    //-------------------------------------------------------------------
    //    2.3.0 Envoi d'un email
    //-------------------------------------------------------------------
    try {
      console.log("2.3.1 F.H. => createOneUserInscri SUCCESS => set Zustand/coockies => send email");
      const result = await courrielInscription(username);
      if (result && result.success) {
        console.log("2.3.2 F.H. => createOneUserInscri SUCCESS => set Zustand/coockies => send email SUCCES");

        // Redirection vers la page de gestion en cas de succès
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////          STOP 1        ////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        router.push("/gestion360/identifier")
        return;
        
      } else {
        console.log("2.3.3 F.H. => createOneUserInscri SUCCESS => set Zustand/coockies => send mail NO SUCCES");
        alert("Identifiants incorrects.");
      }
    } catch (error) {
      console.error("2.3.4 F.H. => createOneUserInscri SUCCESS => set Zustand/coockies => send email ERROR");
      alert("Une erreur est survenue lors de l'envoi de l'email.");
    }
  };

  //---------------------------------------------------------------------
  //------------------------3 Début affichage   ---------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6">
      <CarteVImgTxtBgGN imageSrc="/ordinateurEmail.webp" title="S'inscrire">
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

export default FormInscri;
