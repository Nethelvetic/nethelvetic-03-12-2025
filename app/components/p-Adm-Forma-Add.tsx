"use client";

import React from "react";
import FormAdmFormaAdd from './form-Adm-Forma-Add';


const AdmFormaAdd: React.FC = () => {



//---------------------------------------------------------------------
//------------------------3 Début affichage ---------------------------
//---------------------------------------------------------------------
  return (
    <div>

        {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BdG */}
        <div className="p-6">
          <FormAdmFormaAdd />
         </div>
    </div>
  );
};

export default AdmFormaAdd;
