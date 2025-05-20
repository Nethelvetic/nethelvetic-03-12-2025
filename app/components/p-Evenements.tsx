"use client";

import React, { useState, useEffect } from "react";
import { selectionEvenements } from "../db/dbNeon-Evenements";
import CarteVImgTitreBgN from './cart-V-Img-Titre-BgN';
import ListHImgTxtBtnBgGN from './li-Img-Txt-Btn-BgGN';


const PageEvenements: React.FC = () => {

//---------------------------------------------------------------------
//------------------------1 Début data dynamique ----------------------
//---------------------------------------------------------------------
  const [cardData, setCardData] = useState<any[]>([]);



//---------------------------------------------------------------------
//------------------------2 Début comportement ------------------------
//---------------------------------------------------------------------
  useEffect(() => {
    console.log("2 debut useEffect");
    async function fetchEvenements() {
      const data = await selectionEvenements ();
      setCardData(data);
      console.log("2.1 reponse data =", data);
    }
    fetchEvenements();
  }, []);

  
//---------------------------------------------------------------------
//------------------------3 Début affichage   -------------------------
//--------------------------------------------------------------------- 
  return (
    <div>


         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
        <div className='p-6'>
            <CarteVImgTitreBgN imageSrc='/jeroNum1041Bg.png' title="Découvrez nos journées thématiques"/>
        </div>


        {/*-----------0 DEBUT espace entre les sections */} 
        <div className="h-20 md:h-50"></div>


        {/*-----------------------------5 DEBUT CONTENEUR carte-H-3xCarte */} 
        <div className='p-6'>
            <ListHImgTxtBtnBgGN  cards={cardData} />
        </div>

    
    </div>
    );
  }

export default PageEvenements
    