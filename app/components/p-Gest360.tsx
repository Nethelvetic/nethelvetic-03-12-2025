"use client";


import React from 'react';
import CarteVImgTitreBgN from './cart-V-Img-Titre-BgN';
import CarteVTitreTxtBgGN from './cart-V-Titre-Txt-BgGN';
import CarteHImgTxtBgG from './cart-H-Img-Txt-BgG';
import CarteHxxBdG from './cart-H-xxCarte-BdG';
import CarteVTitreTxtBgN from './cart-V-Titre-Txt-BgGN';
import BtnSmBgG from './btn-Sm-BgG';
import Counter from '../util/zustand';


const PageGestion360: React.FC = () => {

//---------------------------------------------------------------------
//------------------------2 Début data dynamique ----------------------
//---------------------------------------------------------------------
const cardData = [
  {
    route:"/evenements",
    btnTxt:"En savoir plus",
    imageSrc: '/team.webp',
    title: 'Gestion des clients',
    children: "Accédez facilement à votre base de clients et suivez leur évolution en temps réel.",
  },
  {
    route:"/evenements",
    btnTxt:"En savoir plus",
    imageSrc: '/offre.webp',
    title: 'Création d’offres',
    children: "Personnalisez et envoyez vos offres en quelques clics.",
  },
  {
    route:"/evenements",
    btnTxt:"En savoir plus",
    imageSrc: '/facture.webp',
    title: 'Facturation simplifiée',
    children: "Émettez vos factures de manière automatique et sécurisée.",
  },
  {
    route:"/evenements",
    btnTxt:"En savoir plus",
    imageSrc: '/compta.webp',
    title: 'Comptabilité optimisée',
    children: "Centralisez toutes vos données financières pour une gestion comptable transparente.",
  },
  {
    route:"/evenements",
    btnTxt:"En savoir plus",
    imageSrc: '/dashbord.webp',
    title: 'Tableau de bord',
    children: "Visualisez en temps réel vos flux financiers et surveillez la santé de votre entreprise.",
  },
];




const cardDataOffre = [
  {
    route:"/evenements",
    btnTxt:"En savoir plus",
    imageSrc: '/gestion360Offre1.png',
    title: 'Membres No Bullsh*T',
    children: "Accès illimité à Gestion 360, totalement GRATUIT et sans aucune restriction.",
  },
  {
    route:"/evenements",
    btnTxt:"En savoir plus",
    imageSrc: '/gestion360Offre2.png',
    title: 'Participants à nos formations ',
    children: "Recevez un an d'accès offert à Gestion 360 dès votre première formation. Chaque formation supplémentaire vous apporte des bons d’accès gratuits supplémentaires.",
  },
  {
    route:"/evenements",
    btnTxt:"En savoir plus",
    imageSrc: '/gestion360Offre3.png',
    title: 'Nouveaux utilisateurs ',
    children: "Profitez d'un essai totalement gratuit de 6 mois pour découvrir sans engagement tous les bénéfices de Gestion 360. À l'issue de votre essai, choisissez la simplicité : CHF 12.- par mois ou CHF 120.- par an.",
  } 
];



  // Récupère la valeur count de suzstand
  const { count, setCount } = Counter();
  console.log("1.0.0 PageGestion360 var suzstand count= ", count)


//---------------------------------------------------------------------
//------------------------2 Début affichage   -------------------------
//--------------------------------------------------------------------- 
  return (
    <div>

         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
        <div className='p-6'>
            <CarteVImgTitreBgN imageSrc='/graph10.webp' title="Gestion 360 – Centralisez, Optimisez, Réussissez"/>
        </div>


        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-10 md:h-25"></div>



        {/*-----------------------------2 DEBUT CONTENEUR carte-V-Titre-TxT-BgN */}
        <div className='p-6'>
            <CarteHxxBdG cards={cardData}></CarteHxxBdG>
        </div>



      {/*-----------0 DEBUT espace entre les sections */}
      <div className="h-10 md:h-25"></div>



         {/*-----------------------------5 DEBUT CONTENEUR carte-V-Titre-TxT-BgN */}
         <div className='p-6'>
         <CarteVTitreTxtBgGN title="Ne laissez plus la complexité vous freiner.">
         Rejoignez la révolution de la gestion tout-en-un avec Gestion 360 et transformez votre quotidien professionnel. 
         </CarteVTitreTxtBgGN >
         </div> 



         {/*-----------------------------3 DEBUT CONTENEUR btn-Sm-BgG */}
         <div className='p-6'>
             <BtnSmBgG route='/formulaire/login'>
             Découvrez Gestion 360 dès aujourd'hui
             </BtnSmBgG>
         </div>



        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>



        {/*-----------------------------3 DEBUT CONTENEUR btn-Sm-BgG */}
        <div>
          <CarteVTitreTxtBgN title='offre exclusive '/>
        </div>



        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-15 md:h-30"></div>



        {/*-----------------------------3 DEBUT CONTENEUR btn-Sm-BgG */}
         <div>
          <CarteHImgTxtBgG cards={cardDataOffre}/>
         </div>



       {/*-----------0 DEBUT espace entre les sections */}
       <div className="h-15 md:h-30"></div>
    
    </div>
    );
  }

      export default PageGestion360
    