import React from 'react';
import CarteVImgTitreBgN from './carte-V-Img-Titre-BgN';
import CarteVTitreTxtBgGN from './carte-V-Titre-Txt-BgGN';
import CarteVImgTxtBgGN from './carte-V-Img-Txt-BgGN';
import CarteHxxCarteBtnBdG from './carte-H-xxCarte-Btn-BdG';
import CarteVImgTxtBdG from './carte-V-Img-Txt-BdG';
import BtnSmBgG from './btn-Sm-BgG';


const PageEvenements: React.FC = () => {

//---------------------------------------------------------------------
//------------------------2 Début data dynamique ----------------------
//---------------------------------------------------------------------
const cardData = [
  {
    route:"/formulaire-simple",
    btnTxt:"Je M’inscris",
    imageSrc: '/PortraitRobotBg.png',
    title: "Tournoi d'Echec & Raclette",
    children: <p>Le Vendredi 27 février 2025 </p>,
  },
  {
    route:"/formulaire-simple",
    btnTxt:"Je M’inscris",
    imageSrc: '/radioruporBg.png',
    title: 'Brassage de Bière & Apéro-Dégustation',
    children: <p>Samedi 23 mars 2025</p>,
  },
  {
    route:"/formulaire-simple",
    btnTxt:"Je M’inscris",
    imageSrc: '/radioruporBg.png',
    title: 'Atelier Fromage & Vin',
    children: <p>Samedi 23 avril 2025</p>,
  },
  {
    route:"/formulaire-simple",
    btnTxt:"Je M’inscris",
    imageSrc: '/radioruporBg.png',
    title: 'Tournoi de cartes & Raclette ',
    children: <p>Samedi 23 mai 2025</p>,
  },
  {
    route:"/formulaire-simple",
    btnTxt:"Je M’inscris",
    imageSrc: '/radioruporBg.png',
    title: 'Journée Ski & Convivialité',
    children: <p>Samedi 23 janvier 2025</p>,
  },
];




//---------------------------------------------------------------------
//------------------------2 Début affichage   -------------------------
//--------------------------------------------------------------------- 
  return (
    <div>

         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
        <div className='p-6'>
            <CarteVImgTitreBgN imageSrc='/jeroNum1041Bg.png' title="Découvrez nos journées thématiques"/>
        </div>



        {/*-----------------------------5 DEBUT CONTENEUR carte-H-3xCarte */}
        <div className='p-6'>
            <CarteHxxCarteBtnBdG cards={cardData} />
        </div>

    
    </div>
    );
  }

export default PageEvenements
    