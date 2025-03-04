import React from 'react';
import CarteHImgTxtBgG from './cart-H-Img-Txt-BgG';
import CarteVImgTxtBdG from './cart-V-Img-Txt-BdG';
import CarteVImgTxtBgGN from './cart-V-Img-Txt-BgGN';
import CarteH3xCarteBdG from './cart-H-xxCarte-BdG';
import CarteHxxCarteBtnBdG from './cart-H-xxCarte-Btn-BdG';
import CarteVTitreTxtBgN from './cart-V-Titre-Txt-BgN';
import CarteVTitreTxtBgGN from './cart-V-Titre-Txt-BgGN';
import CarteVImgTitreBgN from './cart-V-Img-Titre-BgN';
import BtnLgBgG from './btn-Lg-BgG';
import BtnSmBgG from './btn-Sm-BgG';




const PageAcceuil: React.FC = () => {

//---------------------------------------------------------------------
//------------------------2 Début data dynamique ----------------------
//---------------------------------------------------------------------
const cardData = [
    {
      route:"/creation-entreprise",
      btnTxt:"Découvrir",
      imageSrc: '/jeroNum851Bg.png',
      title: 'Création d’entreprise rapide.',
      children: <p>Créer ton entreprise en Suisse, en simplifiant toutes les démarches.</p>,
    },
    {
      route:"/",
      btnTxt:"Découvrir",
      imageSrc: '/jeroNum831Bg.png',
      title: 'Automatiser les tâches répétitives',
      children: <p>Libère jusqu'à 20 heures par semaine.</p>,
    },
    {
      route:"/",
      btnTxt:"Découvrir",
      imageSrc: '/jeroNum711Bg.png',
      title: 'Facture - Offre - Comptabilité.',
      children: <p>Des applications prêts à l’emploi pour organiser ton entreprise.</p>,
    },
  ];



//---------------------------------------------------------------------
//------------------------2 Début affichage ---------------------------
//---------------------------------------------------------------------
  return (
    <div>
         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
        <div className='p-6'>
            <CarteVImgTitreBgN imageSrc='/jeroNum651Bg.png' title='Simplifie ton entreprise'/>
        </div>


        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>



        {/*-----------------------------2 DEBUT CONTENEUR carte-V-Titre-TxT-BgN */}
        <div className='p-6'>
            <CarteVTitreTxtBgGN title="Rejoignez nous et accédez à une communauté d'entrepreneurs">
                Partagez vos expériences, apprenez des autres et collaborez pour propulser votre activité au niveau supérieur. 
            </CarteVTitreTxtBgGN >
        </div>



        {/*-----------------------------3 DEBUT CONTENEUR btn-Sm-BgG */}
        <div className='p-6'>
            <BtnSmBgG route='/communaute'>
              Rejoins nous 
            </BtnSmBgG>
        </div>



        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>



        {/*-----------------------------4 DEBUT CONTENEUR carte-V-Img-Txt-BgGN */}
        <div className='p-6'>
            <CarteVImgTxtBgGN imageSrc='/cerveauBg.png' title='Et si tu pouvais cloner ton équipe ? Je l’ai fait… sans exploser mon budget.'>
            <p>Moi aussi, j’ai connu le stress de tout faire toute seule : gérer les plannings, facturer, produire du contenu, répondre aux emails… Et puis, j’ai découvert des solutions qui change la donne.
                <br></br>
                <br></br>
                Pendant longtemps, je croyais que c’était réservé aux grandes entreprises avec des budgets énormes. Mais aujourd’hui, grâce aux bons outils et à la bonne méthodologie, c’est à la portée de tous.
                <br></br>
                <br></br>
                <strong>Le meilleur dans tout ça ?</strong>
                <br></br>
                Je n’ai plus besoin de tout faire moi-même. Je peux enfin me concentrer sur ce qui apporte vraiment de la valeur à mon business (et profiter de ma famille le soir)..</p>
            </CarteVImgTxtBgGN>
        </div>


        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>



        {/*-----------------------------5 DEBUT CONTENEUR carte-V-Titre-TxT-BgN */}
        <div className='p-6'>
            <CarteVTitreTxtBgN title="Le collaborateur unique pour toutes les tâches"/>
        </div>



        {/*-----------------------------6 DEBUT CONTENEUR carte-H-xxCarteBtnBdG */}
        <div className='p-6'>
            <CarteHxxCarteBtnBdG cards={cardData} />
        </div>
    </div>


  );
};

export default PageAcceuil;
