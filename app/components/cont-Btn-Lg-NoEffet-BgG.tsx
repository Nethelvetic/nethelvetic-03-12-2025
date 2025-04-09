"use client";

import React, { ReactNode } from 'react';

interface ContainerBtnLgNoEffetBgGProps {
  children: ReactNode;
}

const ContainerBtnLgNoEffetBgG: React.FC<ContainerBtnLgNoEffetBgGProps> = ({ children }) => {
  return (
    //-------------------------1 DEBUT CONTAINER PRINCIPALE
    <div className="max-w-5xl mx-auto px-4 rounded-lg bg-bgGardient1 flex items-center justify-center hover:brightness-75">
      {/*--------1.1 DEBUT container texte/children   */}
      <div className="w-full h-full flex items-center justify-center text-base md:text-lg p-1 md:p-3">
        {children}
      </div>
    </div>
    //-------------------------1 FIN CONTAINER PRINCIPALE
  );
};

export default ContainerBtnLgNoEffetBgG;
