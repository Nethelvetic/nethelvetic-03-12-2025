"use client";

import React, {ReactNode } from 'react';

interface ContanerHBgGProps {
  children: ReactNode;
}

const ContanerBgG: React.FC<ContanerHBgGProps> = ({ children }) => {

  
  // ---------------------------------------------------------------------
  // ------------------------ 2 Début affichage ---------------------------
  // ---------------------------------------------------------------------
  return (
      //-------------------------1 DEBUT CONTAINER PRINCIPALE
      <div className="min-h-24  max-w-5xl mx-auto bg-bgGardient1 mb-2 md:mb-4" >

        {/*--------1.1 DEBUT container texte/children   */}
        <div className="w-full flex flex-col justify-center items-stretch">
          {children}
        </div>
      </div>
      //-------------------------1 FIN CONTAINER PRINCIPALE
  );
};

export default ContanerBgG;
