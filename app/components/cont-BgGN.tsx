"use client";

import React, {ReactNode } from 'react';

interface ContanerHBgGNProps {
  children: ReactNode;
}

const ContanerBgGN: React.FC<ContanerHBgGNProps> = ({ children }) => {

  
  // ---------------------------------------------------------------------
  // ------------------------ 2 Début affichage ---------------------------
  // ---------------------------------------------------------------------
  return (
      //-------------------------1 DEBUT CONTAINER PRINCIPALE
      <div className="min-h-24  max-w-5xl mx-auto rounded-lg bg-bgGardientNoire2 mb-2 md:mb-4" >

        {/*--------1.1 DEBUT container texte/children   */}
        <div className="w-full flex flex-col justify-center items-stretch  rounded-lg">
          {children}
        </div>
      </div>
      //-------------------------1 FIN CONTAINER PRINCIPALE
  );
};

export default ContanerBgGN;
