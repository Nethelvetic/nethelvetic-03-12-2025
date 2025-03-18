"use client";

import React from 'react';
import ContainerBtnLgBgG2 from './cont-Btn-Lg-BgGViolet';
import { useRouter } from 'next/navigation';

interface BtnLgBgGVioletProps {
  interneUrl?: string;
  externalUrl?: string; 
  children: React.ReactNode;
}

const BtnLgBgGViolet: React.FC<BtnLgBgGVioletProps> = ({ interneUrl, externalUrl, children }) => {
 
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique  ---------------------
  //---------------------------------------------------------------------
  console.log("1 btnLgBgG2 début");
  const router = useRouter();

  //---------------------------------------------------------------------
  //------------------------2 Début comportement  -----------------------
  //---------------------------------------------------------------------
  const onClick = () => {
    console.log("2 btnLgBgG2 début onClick");
    console.log("2 btnLgBgG2 début onClick interneUrl= ", interneUrl);
    console.log("2 btnLgBgG2 début onClick externalUrl= ", externalUrl);
    // Navigation interne sur une page de votre site, si la route existe
    if (interneUrl) {
      console.log("2.1 btnLgBgG2 interneUrl =", interneUrl);
      router.push(interneUrl);
    }else{
      console.log("2.1 btnLgBgG2 externalUrl =", externalUrl);
      window.open(externalUrl, '_blank');
    }
  };

  //---------------------------------------------------------------------
  //------------------------3 Début affichage  --------------------------
  //---------------------------------------------------------------------
  return (
    <ContainerBtnLgBgG2>
      <button className='w-full h-full' onClick={onClick}>
        {children}
      </button>
    </ContainerBtnLgBgG2>
  );
};

export default BtnLgBgGViolet;
