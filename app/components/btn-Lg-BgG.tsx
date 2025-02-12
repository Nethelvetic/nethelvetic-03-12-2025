"use client";

import React, { useEffect, useRef, useState } from 'react';
import ContainerBtnLgBgG from './cont-Btn-Lg-BgG';
import { useRouter } from 'next/navigation';

interface BtnLgBgGProps {
  route: string;
  children: React.ReactNode;
}

const BtnLgBgG: React.FC<BtnLgBgGProps> = ({ route, children}) => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique  ---------------------
  //---------------------------------------------------------------------

  const router = useRouter();




  //---------------------------------------------------------------------
  //------------------------2 Début comportement  -----------------------
  //---------------------------------------------------------------------
  const onClick = () => {
    router.push(route);
  };




  //---------------------------------------------------------------------
  //------------------------3 Début affichage  --------------------------
  //---------------------------------------------------------------------
  return (
    <ContainerBtnLgBgG>
      <button className='w-full h-full'  onClick={onClick}>
        {children}
      </button>
    </ContainerBtnLgBgG>
  );
};

export default BtnLgBgG;
