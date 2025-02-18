"use client";

import React, { ReactNode } from 'react';
import ContainerBgG from './cont-BgG';


interface CarteHImgTxtBgGProps {
  imageSrc: string;
  title: string;
  children: ReactNode;
}

const CarteHImgTxtBgG: React.FC<CarteHImgTxtBgGProps> = ({ imageSrc, title, children }) => {



  //---------------------------------------------------------------------
  //------------------------2 Début affichage ---------------------------
  //---------------------------------------------------------------------
  return (
    //-----------------------------1 DEBUT CONTAINER-BgN
    <ContainerBgG>
        {/*----------------1.1 DEBUT CONTENEUR texte et titre */}
        <div className="w-full md:w-2/3  flex flex-col">
          <h4 className="font-bold text-3xl md:text-7xl mb-4 md:mb-10">
            {title}
          </h4>
          <p className="text-sm md:text-xl">
            {children}
          </p>
        </div>
        
        {/*----------------1.2 DEBUT CONTENEUR image */}
        <div className="md:w-1/3 w-full h-64 md:h-80 overflow-hidden ">
          <img
            src={imageSrc}
            alt={title}
            className="object-contain w-full h-full"
          />
        </div>
     
    </ContainerBgG>
     //-----------------------------1 FIN CONTAINER-BgN
      
  );
};

export default CarteHImgTxtBgG;
