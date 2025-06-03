"use client";

import React from 'react';
import ContainerBgGN from './cont-BgGN';
import CrmUser_userInfosSimple from './crmUser_userInfosSimple';
import { useRouter } from "next/navigation";

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

interface ListCrmUser_userBtnBgGNProps {
  cards: CarteData[];
  buttonTitle: string;
  buttonUrlPrefix: string;
}

const ListCrmUser_userBtnBgGN: React.FC<ListCrmUser_userBtnBgGNProps> = ({
  cards,
  buttonTitle,
  buttonUrlPrefix,
}) => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique ----------------------
  //---------------------------------------------------------------------
  const router = useRouter();
  console.log("1.0 ListHUsersBtnMBgGN debut => cards", cards);

  // Tri des cartes par ordre croissant en fonction du nom de l'entreprise
  const sortedCards = [...cards].sort((a, b) =>
    a.nom_entreprise.localeCompare(b.nom_entreprise)
  );

  //---------------------------------------------------------------------
  //------------------------2 affichage ---------------------------------
  //---------------------------------------------------------------------
  return (
    <div>
      {sortedCards.map((card, index) => {
        //------------------------------------------------------
        // Construire l'URL finale du bouton
        const buttonUrl = `${buttonUrlPrefix}/${card.id}`;

        //------------------------------------------------------
        // Handler local pour ce bouton
        const handleButtonClick = () => {
          router.push(buttonUrl);
        };


        const content = <CrmUser_userInfosSimple card={card} />;

        //------------------------------------------------------
        // clic sur tout le conteneur
        return (
          <div
            key={index}
            className="cursor-pointer hover:brightness-75 transition"
            onClick={handleButtonClick}
          >
            <ContainerBgGN>{content}</ContainerBgGN>
          </div>
        );
      })}
    </div>
  );
};

export default ListCrmUser_userBtnBgGN
