"use client";

import React, { useEffect, useRef, useState } from 'react';
import ContainerBtnSmBgG from './cont-Btn-Sm-BgG';
import { useRouter } from 'next/navigation';

interface BtnSmBgGProps {
  route: string;
  children: React.ReactNode;
}

const BtnLgBgG: React.FC<BtnSmBgGProps> = ({ route, children}) => {
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
    <ContainerBtnSmBgG>
      <button className='w-full h-full'  onClick={onClick}>
        {children}
      </button>
    </ContainerBtnSmBgG>
  );
};

export default BtnLgBgG;
