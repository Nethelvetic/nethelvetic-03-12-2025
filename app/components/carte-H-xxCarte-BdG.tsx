"use client";

import React, { ReactNode } from 'react';
import CarteVImgTxtBdG from './carte-V-Img-Txt-BdG';
import ContainerBgN from './cont-BgN';

interface CarteData {
  imageSrc: string;
  title: string;
  children: ReactNode;
}

interface CarteH3xCarteBdGProps {
  cards: CarteData[];
}

const CarteH3xCarteBdG: React.FC<CarteH3xCarteBdGProps> = ({ cards }) => {
  return (
    <ContainerBgN>
      <div className='flex flex-col md:flex-row w-full'>
        {cards.map((card, index) => (
          <div key={index} className='p-6 flex-1 min-w-0'>
            <CarteVImgTxtBdG imageSrc={card.imageSrc} title={card.title}>
              {card.children}
            </CarteVImgTxtBdG>
          </div>
        ))}
      </div>
    </ContainerBgN>
  );
};

export default CarteH3xCarteBdG;
