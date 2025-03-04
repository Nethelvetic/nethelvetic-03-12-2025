import React from 'react';
import CarteVImgTitreBgN from './cart-V-Img-Titre-BgN';
import CartHImgTxtBtnBdG from './cart-H-Img-Txt-Btn-BdG';



const PageFormation: React.FC = () => {

//---------------------------------------------------------------------
//------------------------2 Début data dynamique ----------------------
//---------------------------------------------------------------------
const cardData = [
    {
      imageSrc: '/PortraitRobotBg.png',
      title: "Tournoi d'Echec & Raclette",
      date: new Date(2025, 3, 12),
      route:"/formulaire-simple",
      btnTxt:"Je M’inscris",
      children: <p>L    Praesent ac malesuada lorem. Fusce at 
      ligula vel eros auctor mollis. Cras vel malesuada neque, a ullamcorper arcu. Aliquam vitae tellus libero. 
   . </p>,
    },
    {
      imageSrc: '/PortraitRobotBg.png',
      title: "Tournoi d'Echec & Raclette",
      date: new Date(2025, 3, 12),
      route:"/formulaire-simple",
      btnTxt:"Je M’inscris",
      children: <p>Le Vendredi 27 février 2025 vel eros auctor mollis. Cras vel malesuada neque, a ullamcorper arcu. </p>,
    },
    
  ];
  




//---------------------------------------------------------------------
//------------------------2 Début affichage   -------------------------
//--------------------------------------------------------------------- 
  return (
    <div>

         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
        <div className='p-6'>
            <CarteVImgTitreBgN imageSrc='/smileStudentBg.png' title="Découvrez nos journées thématiques"/>
        </div>



      {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BdG */}
      <div className="p-6">
         <CartHImgTxtBtnBdG cards={cardData} />
      </div>

    
    </div>
    );
  }

export default PageFormation
    