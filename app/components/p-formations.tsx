"use client";

import React, { useState, useEffect } from "react";
import { selectionAllFormations } from "../db/dbNeon-Formations";
import CarteVImgTitreBgN from './cart-V-Img-Titre-BgN';
import ListHImgTxtBtnBgGN from './li-Img-Txt-Btn-BgGN';


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
      const data = await selectionAllFormations();
      if (data.success) {
        setCardData(data.formations ?? []);
        console.log("2.1 reponse data =", data.formations);
      }
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
