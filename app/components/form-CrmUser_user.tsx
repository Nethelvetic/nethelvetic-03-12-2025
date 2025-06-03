"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { crmUser_userOneSelection } from "../db/dbNeon-CrmUsers_user";
import ContainerBGN from "./cont-BgGN";
import CrmUser_userFactures from "./CrmUser_userFactures";
import CrmUser_userOffre from "./CrmUser_userOffre";
import CrmUser_user from "./CrmUser_userInfos";
import CrmUser_userInfosSimple from "./crmUser_userInfosSimple";

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
  const [activeTab, setActiveTab] = useState<"factures" | "offres" | "infos">(
    "infos",
  );
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const userIdStr = Array.isArray(userId) ? userId[0] : userId;
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
      setLoading(true);
      setUnUserData(initialUserData);
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
      setLoading(false);
    }
    fetchUser();
  }, [userIdStr]);

  //---------------------------------------------------------------------
  // Formulaire simplifié pour Offres et Factures
  //---------------------------------------------------------------------
  const MiniUserForm = () => {
    const cardData = {
      id: unUserData.userId,
      nom_entreprise: unUserData.nom_entreprise,
      personne_a_contacter: unUserData.personne_a_contacter,
      ville: unUserData.ville,
      code_postal: unUserData.code_postal,
      telephone: unUserData.telephone,
      date_de_naissance: unUserData.date_de_naissance,
      date_creation: unUserData.date_creation,
      email: unUserData.email,
      username: unUserData.username,
      status: unUserData.status,
      domaine_activite: unUserData.domaine_activite,
      employeur: unUserData.employeur,
      status_professionnel: unUserData.status_professionnel,
      adresse: unUserData.adresse,
      imgUrl: unUserData.imgUrl,
      btnUrlInt: unUserData.btnUrlInt,
      btnUrlExt: unUserData.btnUrlExt,
      btnTexte: unUserData.btnTexte,
      btnModifUrl: unUserData.btnModifUrl,
    };

    return <CrmUser_userInfosSimple card={cardData} />;
  };

  //---------------------------------------------------------------------
  //------------------------2 Affichage --------------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6 space-y-6">
      <ContainerBGN>
        {loading ? (
          <div className="p-4 text-center">Chargement...</div>
        ) : (
          <>
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
              {activeTab === "factures" && (
                <>
                  <MiniUserForm />
                  <CrmUser_userFactures />
                </>
              )}
              {activeTab === "offres" && (
                <>
                  <MiniUserForm />
                  <CrmUser_userOffre />
                </>
              )}
              {activeTab === "infos" && (
                <>
                  <MiniUserForm />
                  <CrmUser_user
                    key={unUserData.userId}
                    userData={unUserData}
                    setUserData={setUnUserData}
                  />
                </>
              )}
            </div>
          </>
        )}
      </ContainerBGN>
    </div>
  );
};

export default FormCrmUser_user;
