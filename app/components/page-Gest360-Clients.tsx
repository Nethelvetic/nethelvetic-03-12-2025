"use client";

import React, { useState, useEffect } from "react";
import { selectionUsers } from "../db/dbQuery-Users";
import CarteVImgTitreBgN from './cart-V-Img-Titre-BgN';
import ListHImgTxtBtnBgGN from './list-H-Img-Txt-Btn-BgGN';


const PageGest360Clients: React.FC = () => {
//---------------------------------------------------------------------
//------------------------1 Début data dynamique ----------------------
//---------------------------------------------------------------------
  const [cardData, setCardData] = useState<any[]>([]);


//---------------------------------------------------------------------
//------------------------2 Début comportement ------------------------
//---------------------------------------------------------------------
  useEffect(() => {
    console.log("2.0 PageGest360Clients useEffect");
    async function fetch() {
      const data = await selectionUsers();
      setCardData(data);
      console.log("2.1 PageGest360Clients useEffect data =", data);
    }
    fetch();
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

export default PageGest360Clients;

