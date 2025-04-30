"use client";

import React from "react";
import FormAdmEventAdd from './form-Adm-Event-Add';


const AdmEventAdd: React.FC = () => {



//---------------------------------------------------------------------
//------------------------3 Début affichage ---------------------------
//---------------------------------------------------------------------
  return (
    <div>

        {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BdG */}
        <div className="p-6">
          <FormAdmEventAdd />
         </div>
    </div>
  );
};

export default AdmEventAdd;
