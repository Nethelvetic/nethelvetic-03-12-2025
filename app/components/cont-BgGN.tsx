"use client";

import React, {ReactNode } from 'react';

interface ContanerHBgProps {
  children: ReactNode;
}

const ContanerBgGN: React.FC<ContanerHBgProps> = ({ children }) => {

  
  // ---------------------------------------------------------------------
  // ------------------------ 2 Début affichage ---------------------------
  // ---------------------------------------------------------------------
  return (
      //-------------------------1 DEBUT CONTAINER PRINCIPALE
      <div className="min-h-64 md:min-h-96 max-w-5xl mx-auto rounded-lg bg-bgGardientNoire2" >

        {/*--------1.1 DEBUT container texte/children   */}
        <div className="flex flex-col items-center p-3 md:p-5 rounded-lg">
          {children}
        </div>
      </div>
      //-------------------------1 FIN CONTAINER PRINCIPALE
  );
};

export default ContanerBgGN;
