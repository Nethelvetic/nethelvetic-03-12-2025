"use client";

import React, { ReactNode } from 'react';
import ContainerBgGN from './cont-BgGN';
import ContainerBgN from './cont-BgN';

interface CarteVImgTitreProps {
  imageSrc: string;
  title: string;
}

const CarteVImgTxtBgGN: React.FC<CarteVImgTitreProps> = ({ imageSrc, title }) => {
  return (
    <ContainerBgN>
      <div className="relative w-full h-100 md:h-180 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-contain"
        />
        <h3
          className="absolute inset-x-0 top-5/6 flex items-center justify-center text-center font-bold text-4xl md:text-8xl"
          style={{ transform: 'translateY(calc(-50% + 20px))' }}>
          {title}
        </h3>
      </div>
    </ContainerBgN>
  );
};

export default CarteVImgTxtBgGN;
