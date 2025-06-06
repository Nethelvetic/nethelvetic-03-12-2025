"use client";

import React from "react";
import ContainerBgGN from "./cont-BgGN";

interface CarteData {
  id: number;
  nom_entreprise: string;
  personne_a_contacter: string;
  ville: string;
  code_postal: string;
  telephone?: string;
  date_de_naissance?: string;
  date_creation: string;
  email: string;
  mot_de_naissance?: string;
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
  btnTexte: string;
  btnModifUrl: string;
}

interface CrmUser_userInfosSimpleProps {
  card: CarteData;
}

const CrmUser_userInfosSimple: React.FC<CrmUser_userInfosSimpleProps> = ({ card }) => {
  const content = (
    <div className="w-full">
      <div className="flex flex-row items-start p-1 md:p-3">
        {/* Conteneur image avec largeur réduite (1/4) */}
        <div className="w-1/4 h-28 md:h-56 overflow-hidden">
          <img
            src={card.imgUrl}
            alt={card.nom_entreprise}
            className="object-contain w-full h-full"
          />
        </div>
        {/* Conteneur texte avec largeur ajustée (3/4) */}
        <div className="w-3/4 flex flex-col text-left pl-1 md:pl-4 mt-0 md:mt-4">
          <h4 className="font-bold text-2xl md:text-3xl">{card.email}</h4>
          <h2 className="font-bold text-3xl md:text-5xl">{card.nom_entreprise}</h2>
          <div className="text-base md:text-lg mt-0">{card.ville}</div>
          <div className="flex items-center gap-2 mt-1">
            <span style={{ color: "#fff" }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </span>
            <p className="m-0 text-xs md:text-lg">{card.personne_a_contacter}</p>
            <span style={{ color: "#fff" }} className="ml-4">☎</span>
            <p className="m-0 text-xs md:text-lg">{card.telephone}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return <ContainerBgGN>{content}</ContainerBgGN>;
};

export default CrmUser_userInfosSimple;
