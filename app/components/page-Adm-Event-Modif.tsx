"use client";

import React from "react";
import FormAdmEventModif from './/form-Adm-Event-Modif';


const AdmFormaModif: React.FC = () => {



//---------------------------------------------------------------------
//------------------------3 Début affichage ---------------------------
//---------------------------------------------------------------------
  return (
    <div>

        {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BdG */}
        <div className="p-6">
          <FormAdmEventModif />
         </div>
    </div>
  );
};

export default AdmFormaModif;
