import React from 'react';
import CarteHImgTxtBgG from './cart-H-Img-Txt-BgG';
import CarteHImgTxtBdG from './cart-V-Img-Txt-BdG';
import CarteVImgTxtBgGN from './cart-V-Img-Txt-BgGN';
import CarteVImgTxtBtnBdG from './cart-V-Img-Txt-Btn-BdG';
import CarteHxxCarteBtnBdG from './cart-H-xxCarte-Btn-BdG';
import CarteVTitreTxtBgN from './cart-V-Titre-Txt-BgN';
import CarteVTitreTxtBgGN from './cart-V-Titre-Txt-BgGN';
import CarteVImgTitreBgN from './cart-V-Img-Titre-BgN';
import BtnLgBgG from './btn-Lg-BgG';
import BtnSmBgG from './btn-Sm-BgG';






const PageCreerEntrPremium: React.FC = () => {

//---------------------------------------------------------------------
//------------------------2 Début data dynamique ----------------------
//---------------------------------------------------------------------
const cardData = [
  {
    route:"/creation-entreprise/formule-gratuite",
    btnTxt:"Réserver mon entretien",
    imageSrc: '/jeroNum631.jpg',
    title: 'Entretien Personnel (350 CHF)',
    children: <p>Un appel vidéo de 60 min pour clarifier votre projet.</p>,
  },
  {
    route:"/formation",
    btnTxt:"Découvrir",
    imageSrc: '/jeroNum621.jpg',
    title: 'Formation Collective',
    children: <p>Apprendre à moindre coût, dans une ambiance collaborative.</p>,
  },
  {
    route:"/creation-entreprise/formule-premium",
    btnTxt:"Découvrir",
    imageSrc: '/jeroNum611.jpg',
    title: 'Ressources Gratuites',
    children: <p>Guides PDF, vidéos pour approfondir vos connaissances</p>,
  },
];



//---------------------------------------------------------------------
//------------------------2 Début affichage ---------------------------
//---------------------------------------------------------------------
  return (
    <div>
         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
        <div className='p-6'>
            <CarteVImgTitreBgN imageSrc='/lumiere2Bg.png' title='Besoin d’un Coup de Pouce'/>
        </div>



        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>



        {/*-----------------------------2 DEBUT CONTENEUR carte-V-Titre-TxT-BgN */}
        <div className='p-6'>
            <CarteVTitreTxtBgGN title="Vous manquez des pièces pour décoller !">
            <p><strong>Ne restez pas bloqué(e)</strong></p>
            <br></br>
            <p>Réserver un entretient ou une formation collectif afin de vous Aider pour:</p>
            <br></br>
            <ul className="list-disc ml-6">
              <li>Faire le point sur votre projet et votre motivation.</li>
              <li>Comprendre les obligations administratives et fiscales.</li>
              <li>Répartir les priorités pour avancer efficacement.</li>
            </ul>
            <br></br>
            <br></br>
            <p>Ou, si vous préférez approfondir en solo, découvrez notre guide gratuit pour affiner votre projet.</p>
            </CarteVTitreTxtBgGN>
        </div>




        {/*-----------------------------5 DEBUT CONTENEUR carte-H-3xCarte */}
        <div className='p-6'>
            <CarteHxxCarteBtnBdG cards={cardData} />
        </div>
    </div>
  );
};

export default PageCreerEntrPremium;
