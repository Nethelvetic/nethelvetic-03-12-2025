"use client";

import React, { useState, useEffect } from "react";
import { selectionUsers } from "../db/dbQuery-Users";
import CartVTitreTxtBgGN from './cart-V-Titre-Txt-BgGN';
import ListHUserBtnMBgG from './list-H-Users-btnM-bgG';
import ListHUserBtnMBgGN from './list-H-Users-btnM-bgGN';
import BtnLgBgG from './btn-Lg-BgG';




const PageAdmUser: React.FC = () => {

//---------------------------------------------------------------------
//------------------------2 Début data dynamique ----------------------
//---------------------------------------------------------------------
  const [cardData, setCardData] = useState<any[]>([]);



//---------------------------------------------------------------------
//------------------------2 Début comportement ------------------------
//---------------------------------------------------------------------
  useEffect(() => {
    console.log("PageAdmUser useEffect debut" )
    async function fetchUsers() {
      const data = await selectionUsers ();
      console.log("PageAdmUser useEffect selectionUsers users =>", data )
      setCardData(data);
    }
    fetchUsers();
  }, []);

//---------------------------------------------------------------------
//------------------------2 Début affichage   -------------------------
//--------------------------------------------------------------------- 
  return (
    <div >

         {/*-----------------------------1 DEBUT CONTENEUR carte-V-Titre-Txt-BgNG*/}
         <div className='p-6'>
            <CartVTitreTxtBgGN  title='Gestion des Users '>
              Ici, vous pouvez créer de nouveaux users ou modifier ceux qui existent déjà
            </CartVTitreTxtBgGN >
        </div>


         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
         <div className='p-6'>
            <BtnLgBgG interneUrl='/admin/users/add' >
              Creer
            </BtnLgBgG >
        </div>



         {/*-----------0 DEBUT espace entre les sections */} 
         <div className="h-35 md:h-50"></div>



         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BdG */}
         <div className="p-6">
            <ListHUserBtnMBgGN  cards={cardData} />
         </div>

    
    </div>
    );
  }

export default PageAdmUser;
    