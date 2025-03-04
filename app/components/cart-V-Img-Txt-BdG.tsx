"use client";

import React, {  ReactNode } from 'react';
import ContainerBdG from './cont-BdG';

interface CarteVImgTxtBdGProps {
  imageSrc: string;
  title: string;
  children: ReactNode;
}

const CarteVImgTxtBdG: React.FC<CarteVImgTxtBdGProps> = ({ imageSrc, title, children }) => {

  
  //---------------------------------------------------------------------
  //------------------------2 Début affichage ---------------------------
  //---------------------------------------------------------------------
  return (
    //-----------------------------1 DEBUT CONTAINER-BdG
    <ContainerBdG>

      {/*----------------1.2 DEBUT CONTENEUR  image   */}
      <div className="w-full h-64 md:h-64 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="object-contain w-full h-full"/>
      </div>

      
      {/*----------------1.2 DEBUT CONTENEUR  titre   */}
      <div>
        <h3 className="font-bold text-3xl text-center md:text-7xl my-6">
          {title}
        </h3>
      </div>


       {/*----------------1.3 DEBUT Btn   */}
       <div>
        <p className="text-sm md:text-xl text-center">
          {children}
        </p>
      </div>
    </ContainerBdG>
    //-----------------------------1 DEBUT CONTAINER-BdG
  );
};

export default CarteVImgTxtBdG;
