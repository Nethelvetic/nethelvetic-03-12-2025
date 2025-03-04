"use client";

import React from 'react';
import ContainerBtnLgBgG2 from './cont-Btn-Lg-BgG2';
import { useRouter } from 'next/navigation';

interface BtnLgBgG2Props {
  route?: string;
  externalUrl?: string; // Lien externe ajouté
  children: React.ReactNode;
}

const BtnLgBgG2: React.FC<BtnLgBgG2Props> = ({ route, externalUrl, children }) => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique  ---------------------
  //---------------------------------------------------------------------
  const router = useRouter();

  //---------------------------------------------------------------------
  //------------------------2 Début comportement  -----------------------
  //---------------------------------------------------------------------
  const onClick = () => {
    // Navigation interne sur une page de votre site, si la route existe
    if (route) {
      router.push(route);
    }
    // Ouverture du lien externe dans un nouvel onglet, si l'URL existe
    if (externalUrl) {
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

export default BtnLgBgG2;
