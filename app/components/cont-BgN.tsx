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
    <div className="min-h-24 md:min-h-32 max-w-5xl mx-auto rounded-lg  bg-black  overflow-hidden">

      {/*--------1.1 DEBUT container texte/children   */}
      <div className="flex flex-col justify-center items-center  rounded-lg">
        {children}
      </div>
    </div>
    //-------------------------1 FIN CONTAINER PRINCIPALE
  );
};

export default ContanerBgN;
