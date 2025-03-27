"use client";

import React from 'react';
import ContainerBgGN from './cont-BgGN';
import ContainerBgG from './cont-BgG';
import BtnLgModifBgGViolet from './btn-Lg-Modif-BgGViolet';

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
  statut?: string;                     
  domaine_activite?: string;           
  employeur?: string;                  
  statut_professionnel?: string;       
  adresse?: string;                    
  imgUrl?: string;                     
  btnUrlInt?: string;                  
  btnUrlExt?: string;                  
  btnTexte: string;                    
  btnModifUrl: string;
}

interface ListHUsersBtnMBgGNProps {
  cards: CarteData[];
}

const ListHUsersBtnMBgGN: React.FC<ListHUsersBtnMBgGNProps> = ({ cards }) => {
  console.log("1.0 debut ListHUsersBtnMBgGN => cards", cards);
  
  return (
    <div>
      {cards.map((card, index) => {
        const content = (
          <div className="w-full">
            <div className="flex flex-row items-start p-3">
              {/* Conteneur image */}
              <div className="w-full md:w-1/3 h-32 md:h-56 overflow-hidden">
                <img
                  src={card.imgUrl}
                  alt={card.nom_entreprise}
                  className="object-contain w-full h-full"
                />
              </div>
              {/* Conteneur texte */}
              <div className="w-full md:w-2/3 flex flex-col text-left pl-4 mt-4">
                <h4 className="font-bold text-2xl md:text-3xl">{card.email}</h4>
                <h3 className="w-full font-bold text-3xl md:text-5xl">{card.nom_entreprise}</h3>
                <div className="w-full text-base md:text-lg mt-0">{card.ville}</div>
                <div className="w-full mt-0 flex items-center gap-2">
                  <span style={{ color: "#fff" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </span>
                  <p className="m-0 text-base md:text-lg">{card.personne_a_contacter}</p>
                  <span style={{ color: "#fff" }} className="ml-4">☎</span>
                  <p className="m-0 text-base md:text-lg">{card.telephone}</p>
                </div>
                {/* Bouton */}
                <div className="w-full pt-3 pb-3">
                  <BtnLgModifBgGViolet modifUrl={`${card.btnModifUrl}/${card.id}`}>
                    modification
                  </BtnLgModifBgGViolet>
                </div>
              </div>
            </div>
          </div>
        );

        return index % 2 !== 0 
          ? <ContainerBgG key={index}>{content}</ContainerBgG>
          : <ContainerBgGN key={index}>{content}</ContainerBgGN>;
      })}
    </div>
  );
};

export default ListHUsersBtnMBgGN;
