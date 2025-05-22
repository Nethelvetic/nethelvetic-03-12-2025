"use client";

import React from 'react';
import ContainerBgGN from './cont-BgGN';
import { useRouter } from "next/navigation";
import ContBtnLgNoEffectBgG from './cont-Btn-Lg-NoEffet-BgG';
import Cookies from "js-cookie";

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

        // Handler pour le 2ème bouton (tu peux adapter le comportement ici)
        const handleButtonCrmUserClick = () => {
          console.log("2.0.0 ../ dbNeon ListHUsersBtnMBgGN => handleButtonCrmUserClick : id  ", card.id);

           //2.1.8 set cookies
          const myData = {
            userJerome: "false",
            crmUserAdmin: "user2025Nethelvetic",
            crmUserImgUrl: card.imgUrl,
            crmUserAdminEmail: card.email,
            crmUserId: card.id
          };
        Cookies.set('myData', JSON.stringify(myData), { expires: 1, path: '/' });
         router.push("/gestion360/identifier");
        };

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

                {/* 1 boutons sur desktop */}
                <div className="pt-1 pb-1 md:pt-3 md:pb-3 hidden md:flex gap-4">
                  <ContBtnLgNoEffectBgG>
                    <button
                      className="w-full h-full"
                      onClick={handleButtonClick}
                    >
                      {buttonTitle}
                    </button>
                  </ContBtnLgNoEffectBgG>
                </div>
              </div>
            </div>
          </div>
        );

        //------------------------------------------------------
        // Version mobile : on clique sur tout le container
        const modifUrlMobile = buttonUrl;

        return (
          <React.Fragment key={index}>
            <div
              className="md:hidden cursor-pointer"
              onClick={() => router.push(modifUrlMobile)}
            >
              <ContainerBgGN>{content}</ContainerBgGN>
            </div>
            <div className="hidden md:block">
              <ContainerBgGN>{content}</ContainerBgGN>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ListCrmUser_userBtnBgGN
