"use client";

import React, { useState, useEffect } from "react";
import { selectionEvenements } from "../db/dbNeon-Evenements";
import CartVTitreTxtBgGN from './cart-V-Titre-Txt-BgGN';
import ListHImgTxtBtnMBgGN from './li-Img-Txt-BtnM-BgGN';
import BtnLgBgG from './btn-Lg-BgG';




const PageAdmEvenements: React.FC = () => {

//---------------------------------------------------------------------
//------------------------2 Début data dynamique ----------------------
//---------------------------------------------------------------------
  const [cardData, setCardData] = useState<any[]>([]);



//---------------------------------------------------------------------
//------------------------2 Début comportement ------------------------
//---------------------------------------------------------------------
  useEffect(() => {
    async function fetchEvenements() {
      const data = await selectionEvenements ();
      setCardData(data);
    }
    fetchEvenements();
  }, []);

//---------------------------------------------------------------------
//------------------------2 Début affichage   -------------------------
//--------------------------------------------------------------------- 
  return (
    <div >

         {/*-----------------------------1 DEBUT CONTENEUR carte-V-Titre-Txt-BgNG*/}
         <div className='p-6'>
            <CartVTitreTxtBgGN  title='Gestion des événements '>
              Ici, vous pouvez créer de nouveaux événments ou modifier ceux qui existent déjà
            </CartVTitreTxtBgGN >
        </div>


         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
         <div className='p-6'>
            <BtnLgBgG interneUrl='/admin/evenements/add' >
              Creer
            </BtnLgBgG >
        </div>



         {/*-----------0 DEBUT espace entre les sections */} 
         <div className="h-35 md:h-50"></div>



         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BdG */}
         <div className="p-6">
            <ListHImgTxtBtnMBgGN  cards={cardData} />
         </div>

    
    </div>
    );
  }

export default PageAdmEvenements;
    