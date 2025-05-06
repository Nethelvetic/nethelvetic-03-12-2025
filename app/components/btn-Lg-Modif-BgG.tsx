"use client";

import React from 'react';
import ContBtnLgBgG from './cont-Btn-Lg-BgG';
import { useRouter } from 'next/navigation'; 

interface BtnLgModifBgGProps {
    modifUrl: string;
    children: React.ReactNode;
}

const BtnLgModifBgG: React.FC<BtnLgModifBgGProps> = ({ modifUrl, children }) => {
 
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique  ---------------------
  //---------------------------------------------------------------------
  console.log("1 BtnLgModifBgG début");
  const router = useRouter();

  //---------------------------------------------------------------------
  //------------------------2 Début comportement  -----------------------
  //---------------------------------------------------------------------
  const onClick = () => {
    console.log("2.0 BtnLgModifBgG onClick");
    console.log("2.1 BtnLgModifBgG onClick modifUrl= ", modifUrl);
    // Navigation interne sur une page de votre site, si la route existe
      router.push(modifUrl);
  };

  //---------------------------------------------------------------------
  //------------------------3 Début affichage  --------------------------
  //---------------------------------------------------------------------
  return (
    <ContBtnLgBgG>
      <button className='w-full h-full' onClick={onClick}>
        {children}
      </button>
    </ContBtnLgBgG>
  );
};

export default BtnLgModifBgG;
