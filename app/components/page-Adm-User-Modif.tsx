"use client";

import React from "react";
import FormAdmUserModif from './form-Adm-User-Modif';


const PageAdmUserModif: React.FC = () => {



//---------------------------------------------------------------------
//------------------------3 Début affichage ---------------------------
//---------------------------------------------------------------------
  return (
    <div>

        {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BdG */}
        <div className="p-6">
          <FormAdmUserModif/>
         </div>
    </div>
  );
};

export default PageAdmUserModif;
