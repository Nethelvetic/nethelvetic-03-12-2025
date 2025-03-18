import React, { useState, useEffect } from "react";
import { selectFormation } from "../db/dbQuery";
import CarteVImgTitreBgN from './cart-V-Img-Titre-BgN';
import CartHImgTxtBtnBdG from './list-H-Img-Txt-Btn-BgGN';


const FormationPage: React.FC = () => {
//---------------------------------------------------------------------
//------------------------1 Début data dynamique ----------------------
//---------------------------------------------------------------------
  const [cardData, setCardData] = useState<any[]>([]);


//---------------------------------------------------------------------
//------------------------2 Début comportement ------------------------
//---------------------------------------------------------------------
  useEffect(() => {
    async function fetchFormations() {
      const data = await selectFormation();
      setCardData(data);
    }
    fetchFormations();
  }, []);


//---------------------------------------------------------------------
//------------------------3 Début affichage ---------------------------
//---------------------------------------------------------------------
  return (
    <div>
      {cardData.map((card, index) => (
        <div key={index}>
          {/* Exemple d'affichage des données */}
          <img src={card.img} alt={card.titre} className="object-contain w-full h-full" />
          <h2>{card.titre}</h2>
          <p>{card.texte}</p>
          <p>{card.date}</p>
          <p>{card.heure}</p>
          <p>{card.lieu}</p>
          <p>{card.prix}</p>
          <p>{card.urlBtn}</p>
        </div>
      ))}

       {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
       <div className='p-6'>
            <CarteVImgTitreBgN imageSrc='/smileStudentBg.png' title="Propulse ton business : Formations pour l'équilibre"/>
        </div>  



        {/*-----------0 DEBUT espace entre les sections */} 
        <div className="h-20 md:h-50"></div>



         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BdG */}
         <div className="p-6">
            <CartHImgTxtBtnBdG cards={cardData} />
         </div>
    </div>
  );
};

export default FormationPage;
