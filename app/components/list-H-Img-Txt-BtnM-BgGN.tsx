"use client";

import React from 'react';
import ContainerBgNG from './cont-BgGN';
import ContainerBG from './cont-BgG';
import BtnLgBgG from './btn-Lg-BgG';
import BtnLgModifBgGViolet from './btn-Lg-Modif-BgGViolet';

interface CarteData {
  id: number;
  titre: string;
  texte: string;
  date: string;
  heure: string;
  prix: number;
  imgUrl: string;
  lieu: string;
  btnUrlInt: string;
  btnUrlExt: string;
  btnTexte: string;
  btnModifUrl: string;
  usserid: number;
}

interface ListHImgTxtBtnMBgGProps {
  cards: CarteData[];
}

const ListHImgTxtBtnMBdG: React.FC<ListHImgTxtBtnMBgGProps> = ({ cards }) => {
  return (
    <div>
      {cards.map((card, index) =>
        index % 2 !== 0 ? (
          //------------------1 Début index impaire  
          <ContainerBG key={index}>
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-start p-3">
                {/* Conteneur image aligné à gauche sur 1/3 de la largeur */}
                <div className="w-full md:w-1/3 h-32 md:h-56 overflow-hidden">
                  <img
                    src={card.imgUrl}
                    alt={card.titre}
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* Conteneur texte (date, titre, children, etc.) aligné à gauche */}
                <div className="w-full md:w-2/3 flex flex-col text-left pl-4 mt-4">
                  <h4 className="font-bold text-2xl md:text-3xl">
                    {card.date}
                  </h4>
                  <h2 className="w-full font-bold text-3xl md:text-5xl">
                    {card.titre}
                  </h2>
                  <div className="w-full mt-4">
                    {card.texte}
                  </div>
                  <div className="w-full mt-4">
                    <span style={{ color: "var(--color-bgGardient1)" }}>☑</span> Heure: {card.heure}
                  </div>
                  <div className="w-full mt-4">
                    <span style={{ color: "var(--color-bgGardient1)" }}>☑</span> Lieu: {card.lieu}
                  </div>
                  <div className="w-full mt-4">
                    <span style={{ color: "var(--color-bgGardient1)" }}>☑</span> CHF: {card.prix}
                  </div>
                  {/* Conteneur bouton */}
                  <div className="w-full pt-3 pb-3">
                    <BtnLgModifBgGViolet modifUrl={`${card.btnModifUrl}/${card.id}`}>
                      modification
                    </BtnLgModifBgGViolet>
                  </div>
                </div>
              </div>
            </div>
          </ContainerBG>
          //------------------1 Fin index impaire 
        ) : (
          //------------------2 Début index paire 
          <ContainerBgNG key={index}>
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-start p-3">
                {/* Conteneur image aligné à gauche sur 1/3 de la largeur */}
                <div className="w-full md:w-1/3 h-32 md:h-56 overflow-hidden"> 
                  <img
                    src={card.imgUrl}
                    alt={card.titre}
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* Conteneur texte (date, titre, children, etc.) aligné à gauche */}
                <div className="w-full md:w-2/3 flex flex-col text-left pl-4 mt-4">
                  <h4 className="font-bold text-2xl md:text-3xl ">
                    {card.date}
                  </h4>
                  <h3 className="w-full font-bold text-3xl md:text-5xl">
                    {card.titre}
                  </h3>
                  <div className="w-full mt-4">
                    {card.texte}
                  </div>
                  <div className="w-full mt-4">
                    <span style={{ color: "var(--color-bgGardient1)" }}>☑</span> Heure: {card.heure}
                  </div>
                  <div className="w-full mt-4">
                    <span style={{ color: "var(--color-bgGardient1)" }}>☑</span> Lieu: {card.lieu}
                  </div>
                  <div className="w-full mt-4">
                    <span style={{ color: "var(--color-bgGardient1)" }}>☑</span> CHF: {card.prix}
                  </div>
                  {/* Conteneur bouton */}
                  <div className="w-full pt-3 pb-3">
                    <BtnLgModifBgGViolet modifUrl={`${card.btnModifUrl}/${card.id}`}>
                      modification
                    </BtnLgModifBgGViolet>
                  </div>
                </div>
              </div>
            </div>
          </ContainerBgNG>
          //------------------2 Fin index paire 
        )
      )}
    </div>
  );
};

export default ListHImgTxtBtnMBdG;
