"use client";

import React, { ReactNode } from 'react';
import ContainerBgN from './cont-BgN';
import CartVImgTxtBtnBdG from './cart-V-Img-Txt-Btn-BdG';

interface CarteData {
  imageSrc: string;
  title: string;
  route?: string;
  externalUrl?: string;
  btnTxt: string;
  children: ReactNode;
}

interface CarteHxxCarteBtnBdGProps {
  cards: CarteData[];
}

const CarteHxxCarteBtnBdG: React.FC<CarteHxxCarteBtnBdGProps> = ({ cards }) => { 
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
            <CartVImgTxtBtnBdG
              imageSrc={card.imageSrc}
              title={card.title}
              route={card.route}
              externalUrl={card.externalUrl}
              btnTxt={card.btnTxt}
            >
              {card.children}
            </CartVImgTxtBtnBdG>
          </div>
        ))}
      </div>
    </ContainerBgN>
  );
};

export default CarteHxxCarteBtnBdG;
