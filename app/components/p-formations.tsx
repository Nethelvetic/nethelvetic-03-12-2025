"use client";

import React, { useState, useEffect } from "react";
import { selectionFormation } from "../db/dbQuery-Formations";
import CarteVImgTitreBgN from './cart-V-Img-Titre-BgN';
import ListHImgTxtBtnBgGN from './list-H-Img-Txt-Btn-BgGN';


const FormationPage: React.FC = () => {
//---------------------------------------------------------------------
//------------------------1 Début data dynamique ----------------------
//---------------------------------------------------------------------
  const [cardData, setCardData] = useState<any[]>([]);


//---------------------------------------------------------------------
//------------------------2 Début comportement ------------------------
//---------------------------------------------------------------------
  useEffect(() => {
    console.log("2 debut useEffect");
    async function fetchFormations() {
      const data = await selectionFormation ();
      setCardData(data);
      console.log("2.1 reponse data =", data);
    }
    fetchFormations();
  }, []);


//---------------------------------------------------------------------
//------------------------3 Début affichage ---------------------------
//---------------------------------------------------------------------
  return (
    <div>

       {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
       <div className='p-6'>
            <CarteVImgTitreBgN imageSrc='/smileStudentBg.png' title="Propulse ton business : Formations pour l'équilibre"/>
        </div>  



        {/*-----------0 DEBUT espace entre les sections */} 
        <div className="h-20 md:h-50"></div>
      

        {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BdG */}
        <div className="p-6">
          <ListHImgTxtBtnBgGN  cards={cardData} />
         </div>
    </div>
  );
};

export default FormationPage;
