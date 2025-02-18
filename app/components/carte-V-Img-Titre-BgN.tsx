"use client";

import React from 'react';
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
        {/* Overlay avec dégradé : transparent jusqu'à 50%, puis passe au noir */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)',
            zIndex: 0,
          }}
        />
        {/* Le titre reste par-dessus l'overlay */}
        <h3
          className="absolute inset-x-0 top-5/6 z-10 flex items-center justify-center text-center font-bold text-4xl md:text-8xl"
          style={{ transform: 'translateY(calc(-50% + 20px))' }}>
          {title}
        </h3>
      </div>
    </ContainerBgN>
  );
};

export default CarteVImgTxtBgGN;
