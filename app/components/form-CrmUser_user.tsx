"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  crmUser_userOneSelection,
  crmUser_userUpdateOne,
  crmUser_userSupprimer,
} from "../db/dbNeon-CrmUsers_user";
import ContainerBGN from "./cont-BgGN";
import ContBtnLgNoEffectBgG from "./cont-Btn-Lg-NoEffet-BgG";
import CrmUser_userFactures from "./CrmUser_userFactures";
import CrmUser_userOffre from "./CrmUser_userOffre";
import CrmUser_user from "./CrmUser_user";
import fileStoreVercelBlob from "../util/fileStoreVercelBlob";

// TypeScript interface reprenant la structure du formulaire de modification
interface UserDataType {
  nom_entreprise: string;
  personne_a_contacter: string;
  ville: string;
  code_postal: string;
  telephone: string;
  date_de_naissance: string;
  date_creation: string;
  email: string;
  username: string;
  status: string;
  domaine_activite: string;
  employeur: string;
  status_professionnel: string;
  adresse: string;
  imgUrl: string;
  btnUrlInt: string;
  btnUrlExt: string;
  btnTexte: string;
  btnModifUrl: string;
  userId: number;
}

const initialUserData: UserDataType = {
  nom_entreprise: "",
  personne_a_contacter: "",
  ville: "",
  code_postal: "",
  telephone: "",
  date_de_naissance: "",
  date_creation: "",
  email: "",
  username: "",
  status: "",
  domaine_activite: "",
  employeur: "",
  status_professionnel: "",
  adresse: "",
  imgUrl: "/singeCalculateur.webp",
  btnUrlInt: "/formulaire/contact",
  btnUrlExt: "",
  btnTexte: "modification",
  btnModifUrl: "",
  userId: 0,
};

const FormCrmUser_user: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 data dynamique ----------------------------
  //---------------------------------------------------------------------
  const [unUserData, setUnUserData] = useState<UserDataType>(initialUserData);
  const [activeTab, setActiveTab] =
    useState<"factures" | "offres" | "infos">("factures");
  const { userId } = useParams();
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const userIdStr = Array.isArray(userId) ? userId[0] : userId;
  const userIdNumber = userIdStr ? parseInt(userIdStr, 10) : NaN;
  const getInputClass = (value: string) =>
    value
      ? "bg-gradient-to-l from-gray-800 to-black text-gray-300 placeholder-gray-400"
      : "bg-gradient-to-l from-gray-800 to-black text-white placeholder-white";

  //---------------------------------------------------------------------
  //------------------------useEffect chargement user -------------------
  //---------------------------------------------------------------------
  useEffect(() => {
    async function fetchUser() {
      if (!userIdStr) return;
      const res = await crmUser_userOneSelection(userIdStr);
      if (res.success && res.user) {
        const u = res.user;
        setUnUserData({
          nom_entreprise: u.nom_entreprise ?? "",
          personne_a_contacter: u.personne_a_contacter ?? "",
          ville: u.ville ?? "",
          code_postal: u.code_postal ?? "",
          telephone: u.telephone ?? "",
          date_de_naissance: u.date_de_naissance ?? "",
          date_creation: u.date_creation ?? "",
          email: u.email ?? "",
          username: u.username ?? "",
          status: u.status ?? "",
          domaine_activite: u.domaine_activite ?? "",
          employeur: u.employeur ?? "",
          status_professionnel: u.status_professionnel ?? "",
          adresse: u.adresse ?? "",
          imgUrl: u.imgUrl ?? initialUserData.imgUrl,
          btnUrlInt: u.btnUrlInt ?? initialUserData.btnUrlInt,
          btnUrlExt: u.btnUrlExt ?? initialUserData.btnUrlExt,
          btnTexte: u.btnTexte ?? initialUserData.btnTexte,
          btnModifUrl: u.btnModifUrl ?? initialUserData.btnModifUrl,
          userId: u.userId ?? initialUserData.userId,
        });
      }
    }
    fetchUser();
  }, [userIdStr, userIdNumber]);

  //---------------------------------------------------------------------
  //2.1.0  FormCrmUser_user => handleClick
  //---------------------------------------------------------------------
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !unUserData.email ||
      !unUserData.nom_entreprise ||
      !unUserData.personne_a_contacter ||
      !unUserData.ville ||
      !unUserData.code_postal ||
      !unUserData.adresse ||
      !unUserData.telephone ||
      !unUserData.domaine_activite
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const payload: UserDataType = { ...unUserData };

    try {
      const res = await crmUser_userUpdateOne(userIdNumber, payload);
      if (res.success) {
        router.push("/gestion360/identifier");
      } else {
        alert("La modification a échoué, veuillez réessayer.");
      }
    } catch (error) {
      alert("La modification a échoué, veuillez réessayer.");
    }
  };

  //---------------------------------------------------------------------
  //2.2.0  FormCrmUser_user => handleDelete
  //---------------------------------------------------------------------
  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        const res = await crmUser_userSupprimer(userIdNumber);
        if (res.success) {
          router.push("/gestion360/identifier");
        }
      } catch (error) {
        alert("La suppression a échoué, veuillez réessayer.");
      }
    }
  };

  //---------------------------------------------------------------------
  //2.3.0  FormCrmUser_user => handleImageUpload
  //---------------------------------------------------------------------
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const uploadedUrl = await fileStoreVercelBlob(e.target.files[0]);
        setUnUserData({ ...unUserData, imgUrl: uploadedUrl });
      } catch {
        alert("L’image n’a pas pu être sélectionnée, veuillez réessayer.");
      }
    }
  };

  //---------------------------------------------------------------------
  //------------------------2 Affichage --------------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6 space-y-6">
      <ContainerBGN>
        <div className="flex justify-center space-x-4 p-4">
          <button
            onClick={() => setActiveTab("factures")}
            className={`px-4 py-2 rounded ${
              activeTab === "factures"
                ? "bg-gray-700 text-white"
                : "bg-gray-500 text-gray-300"
            } hover:bg-gray-600`}
          >
            Factures
          </button>
          <button
            onClick={() => setActiveTab("offres")}
            className={`px-4 py-2 rounded ${
              activeTab === "offres"
                ? "bg-gray-700 text-white"
                : "bg-gray-500 text-gray-300"
            } hover:bg-gray-600`}
          >
            Offres
          </button>
          <button
            onClick={() => setActiveTab("infos")}
            className={`px-4 py-2 rounded ${
              activeTab === "infos"
                ? "bg-gray-700 text-white"
                : "bg-gray-500 text-gray-300"
            } hover:bg-gray-600`}
          >
            Infos contact
          </button>
        </div>
        <div className="p-4">
          {activeTab === "factures" && <CrmUser_userFactures />}
          {activeTab === "offres" && <CrmUser_userOffre />}
          {activeTab === "infos" && <CrmUser_user />}
        </div>
      </ContainerBGN>
    </div>
  );
};

export default FormCrmUser_user;

