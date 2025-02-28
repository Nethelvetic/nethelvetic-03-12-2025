"use client";

import React, { ReactNode } from 'react';
import ContainerBgN from './cont-BgN';
import CarteVImgTxtBdG from './carte-V-Img-Txt-BdG';

interface CarteData {
  imageSrc: string;
  title: string;
  children: ReactNode;
}

interface CarteHxxCarteBtnBdGProps {
  cards: CarteData[];
}

const CarteHxxCarteBdG: React.FC<CarteHxxCarteBtnBdGProps> = ({ cards }) => {
  return (
    <ContainerBgN>
      <div
        className="w-full gap-6 mx-auto"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          justifyContent: 'center'
        }}
      >
        {cards.map((card, index) => (
          <div key={index} className="p-6">
            <CarteVImgTxtBdG 
              imageSrc={card.imageSrc}
              title={card.title} >
              {card.children}
            </CarteVImgTxtBdG>
          </div>
        ))}
      </div>
    </ContainerBgN>
  );
};

export default CarteHxxCarteBdG;
