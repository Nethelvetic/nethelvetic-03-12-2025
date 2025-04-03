"use client";

import React, {  ReactNode } from 'react';
import ContainerBdG from './cont-BdG';
import BtnLgBgG from './btn-Lg-BgG';

interface CarteVImgTxtBtnBdGProps {
  imageSrc: string;
  title: string;
  route?: string;
  externalUrl?: string;
  btnTxt?: string;
  children: ReactNode;
}

const CarteVImgTxtBtnBdG: React.FC<CarteVImgTxtBtnBdGProps> = ({ imageSrc, title, route, externalUrl, btnTxt, children }) => {

  
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
        <h3 className="font-bold text-3xl text-center md:text-6xl my-6">
          {title}
        </h3>
      </div>


       {/*----------------1.3 DEBUT Btn   */}
       <div>
        <p className="text-base md:text-lg text-center">
          {children}
        </p>
      </div>


       {/*----------------1.4 DEBUT CONTENEUR texte/children   */}
       <div className="w-full pt-6 ">
        <BtnLgBgG interneUrl={route} externalUrl={externalUrl}>
            {btnTxt}
        </BtnLgBgG>
      </div>
    </ContainerBdG>
    //-----------------------------1 DEBUT CONTAINER-BdG
  );
};

export default CarteVImgTxtBtnBdG;
