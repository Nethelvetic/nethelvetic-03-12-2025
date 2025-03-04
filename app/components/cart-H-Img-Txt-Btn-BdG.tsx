"use client";

import React, { ReactNode } from 'react';
import ContainerBdG from './cont-BdG';
import ContainerBG from './cont-BgG';
import BtnLgBgG from './btn-Lg-BgG';
import BtnLgBgG2 from './btn-Lg-BgG2';

interface CarteData {
  imageSrc: string;
  title: string;
  date?: Date;
  externalUrl?: string;
  route?: string;
  btnTxt: string;
  children: ReactNode;
}

interface CartHImgTxtBtnBgGProps {
  cards: CarteData[];
}

const CarteHImgTxtBtnBdG: React.FC<CartHImgTxtBtnBgGProps> = ({ cards }) => {
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
                    src={card.imageSrc}
                    alt={card.title}
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* Conteneur texte (date, titre, children) aligné à gauche */}
                <div className="w-full md:w-2/3 flex flex-col text-left pl-4 mt-4">
                  <h4 className="font-bold text-2xl md:text-3xl">
                    {card.date ? card.date.toLocaleDateString() : ""}
                  </h4>
                  <h2 className="w-full font-bold text-3xl md:text-5xl">
                    {card.title}
                  </h2>
                  <div className="w-full mt-4">
                    {card.children}
                  </div>
                  {/* Conteneur bouton */}
                  <div className="w-full pt-3 pb-3">
                    <BtnLgBgG2 route={card.route} externalUrl={card.externalUrl}>
                      {card.btnTxt}
                    </BtnLgBgG2>
                  </div>
                </div>
              </div>
            </div>
          </ContainerBG>
          //------------------1 Fébut index impaire 
        ) : 
        (
          //------------------2 Début index paire 
          <ContainerBdG key={index}>
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-start p-3">
                {/* Conteneur image aligné à gauche sur 1/3 de la largeur */}
                <div className="w-full md:w-1/3 h-32 md:h-56 overflow-hidden">
                  <img
                    src={card.imageSrc}
                    alt={card.title}
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* Conteneur texte (date, titre, children) aligné à gauche */}
                <div className="w-full md:w-2/3 flex flex-col text-left pl-4 mt-4">
                  <h4 className="font-bold text-2xl md:text-3xl ">
                    {card.date ? card.date.toLocaleDateString() : ""}
                  </h4>
                  <h3 className="w-full font-bold text-3xl md:text-5xl">
                    {card.title}
                  </h3>
                  <div className="w-full mt-4">
                    {card.children}
                  </div>
                  {/* Conteneur bouton */}
                  <div className="w-full pt-3 pb-3">
                    <BtnLgBgG route={card.route} externalUrl={card.externalUrl}>
                      {card.btnTxt}
                    </BtnLgBgG>
                  </div>
                </div>
              </div>
            </div>
          </ContainerBdG>
          //------------------2 Fin index paire 
        )
      )}
    </div>
  );
};

export default CarteHImgTxtBtnBdG;
