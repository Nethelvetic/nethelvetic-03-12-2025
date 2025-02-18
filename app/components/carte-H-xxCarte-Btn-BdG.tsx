"use client";

import React, { ReactNode } from 'react';
import CarteVImgTxtBtnBdG from './carte-V-Img-Txt-Btn-BdG';
import ContainerBgN from './cont-BgN';

interface CarteData {
  imageSrc: string;
  title: string;
  route: string;
  btnTxt:string;
  children: ReactNode;
}

interface CarteHxxCarteBtnBdGProps {
  cards: CarteData[];
}

const CarteH3xCarteBdG: React.FC<CarteHxxCarteBtnBdGProps> = ({ cards }) => {
  return (
    <ContainerBgN>
      <div className='flex flex-col md:flex-row w-full'>
        {cards.map((card, index) => (
          <div key={index} className='p-6 flex-1 min-w-0'>
            <CarteVImgTxtBtnBdG imageSrc={card.imageSrc} title={card.title} route={card.route}  btnTxt={card.btnTxt} >
              {card.children}
            </CarteVImgTxtBtnBdG>
          </div>
        ))}
      </div>
    </ContainerBgN>
  );
};

export default CarteH3xCarteBdG;
