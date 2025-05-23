"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CarteVImgTxtBgGN from "./cart-V-Img-Txt-BgGN";
import ContBtnLgNoEffetBgG from "./cont-Btn-Lg-NoEffet-BgG";
import { crmUserInsertion} from "../db/dbNeon-CrmUserInscrit";
import VarZustand from "../util/zustand";
import {
  ADMIN_EMAIL,
  ADMIN_ID_JEROME,
  ADMIN_ID_DEFAULT,
} from "@/admin-config";

const FormInitPw: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Données dynamiques -------------------------
  //---------------------------------------------------------------------
  const { userAdmin, setUserAdmin } = VarZustand();
  const [username, setUsername] = useState<string>("" /* sert d'affichage dans l'input */);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  //---------------------------------------------------------------------
  //------------------------2 Comportements -----------------------------
  //---------------------------------------------------------------------
  // 2.0.0 FormInitPw useEffect1 début 
  useEffect(() => {
    console.log("2.0.0 Front FormInitPw useEffect1 début");
    const cookieStr = Cookies.get('myData');
    if (cookieStr) {
      console.log("2.0.1 Front FormInitPw useE1 => cookies SUCCES");
      try {
        const data = JSON.parse(cookieStr);
        if (data.crmUserAdminEmail) {
          console.log( "2.0.2 Front FormInitPw useE1 => cookies SUCCES => setUsername useState");

          // 2.0.3 set useState username
          setUsername(data.crmUserAdminEmail);
        }
      } catch {
        console.log("2.0.3 Front FormInitPw useE => cookies No SUCCES");
      }
    }
  }, []);

  // 2.1.0 Classe CSS pour l'affichage des inputs
  const getInputClass = (value: string) =>
    value
      ? "bg-white text-black placeholder-gray-500"
      : "bg-transparent text-white placeholder-white";

  //---------------------------------------------------------------------
  // 2.2.0 FormInitPw handleSubmit debut 
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("2.2.0 Front FormInitPw handleSubmit debut");
    e.preventDefault();

    // 2.2.1 Contrôle des champs
    if (!username || !password || !confirmPassword) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // 2.2.2 FormInitPw h.s. => createOneUserInscription()
    console.log("2.2.2 Back FormInitPw h.s. => createOneUserInscription");
    const date_creation = new Date().toISOString().slice(0, 10);
    const userToInsert = {
      nom_entreprise: "",
      personne_a_contacter: "",
      ville: "",
      code_postal: "",
      telephone: "",
      date_de_naissance: "",
      date_creation,
      email: username,
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

    try {
      const res = await crmUserInsertion(userToInsert, password);

      // 2.2.4 Erreur
      if (!res.success) {
        console.log("2.2.4 Front FormInitPw h.s => Inscri NO SUCCES");
        alert(res?.message || "Une erreur est survenue lors de la réinitialisation.");
        return;
      }

      // 2.2.5 Succès
      console.log("2.2.5 Front FormInitPw h.s. => Inscri SUCCES");
      if (res.user) {
        console.log("2.2.6 FormInitPw h.s. => Inscri SUCCES => set Zustand & cookies");
        const userObj = Array.isArray(res.user) ? res.user[0] : res.user;

        if (userObj.email === ADMIN_EMAIL) {
          console.log("2.2.7 Front FormInitPw h.s. => Inscri SUCCES => admin golliard");
          setUserAdmin(ADMIN_ID_JEROME);
          Cookies.set(
            'myData',
            JSON.stringify({
              userJerome: ADMIN_ID_JEROME,
              crmUserAdmin: ADMIN_ID_JEROME,
              crmUserImgUrl: userObj.imgUrl,
              crmUserAdminEmail: username,
              crmUserId: userObj.id ?? ""
            }),
            { expires: 1, path: '/' }
          );
        } else if (res.crm) {
          console.log("2.2.8 Front FormInitPw h.s. => Inscri SUCCES => admin crm");
          const crmObj = Array.isArray(res.crm) ? res.crm[0] : res.crm;
          setUserAdmin(crmObj.identification ?? "");
          Cookies.set(
            'myData',
            JSON.stringify({
              userJerome: "false",
              crmUserAdmin: ADMIN_ID_DEFAULT,
              crmUserImgUrl: userObj.imgUrl,
              crmUserAdminEmail: username,
              crmUserId: userObj.id ?? ""
            }),
            { expires: 1, path: '/' }
          );
        }
      }

      router.push("/gestion360/identifier");
    } catch (error) {
      console.error("2.2.9 Front FormInitPw h.s. => Erreur createOneUserInscription", error);
      alert(`Erreur lors de la réinitialisation du mot de passe : ${error}`);
    }
  };

  //---------------------------------------------------------------------
  //------------------------3 Affichage ---------------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6">
      <CarteVImgTxtBgGN imageSrc="/ordinateurEmail.webp" title="Réinitialiser le mot de passe">
        <form onSubmit={handleSubmit} className="space-y-4 p-4 mx-auto max-w-md">
          {/* Champ Email */}
          <div className="w-full">
            <label className="block text-sm md:text-xl font-medium text-left">Email</label>
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
            <label className="block text-sm md:text-xl font-medium text-left">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(
                password
              )}`}
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
              className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(
                confirmPassword
              )}`}
            />
          </div>

          {/* Bouton Réinitialiser */}
          <div className="w-full pt-3 pb-3">
            <ContBtnLgNoEffetBgG>
              <button type="submit" className="w-full h-full">Réinitialiser</button>
            </ContBtnLgNoEffetBgG>
          </div>
        </form>
      </CarteVImgTxtBgGN>
    </div>
  );
};

export default FormInitPw;
