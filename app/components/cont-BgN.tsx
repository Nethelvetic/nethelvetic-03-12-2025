"use client";

import React, { ReactNode } from 'react';

interface ContanerBgNProps {
  children: ReactNode;
}

const ContanerBgN: React.FC<ContanerBgNProps> = ({ children }) => {


  // ---------------------------------------------------------------------
  // ------------------------ 2 Début affichage ---------------------------
  // ---------------------------------------------------------------------
  return (
    //-------------------------1 DEBUT CONTAINER PRINCIPALE
    <div className="max-w-5xl mx-auto rounded-lg  bg-black mb-6  overflow-hidden">

      {/*--------1.1 DEBUT container texte/children   */}
      <div className="w-full flex flex-col justify-center items-stretch rounded-lg">
        {children}
      </div>
    </div>
    //-------------------------1 FIN CONTAINER PRINCIPALE
  );
};

export default ContanerBgN;
