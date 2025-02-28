import React from 'react';
import CarteHImgTxtBgG from './carte-H-Img-Txt-BgG';
import CarteHImgTxtBdG from './carte-V-Img-Txt-BdG';
import CarteVImgTxtBgGN from './carte-V-Img-Txt-BgGN';
import CarteHxxCarteBtnBdG from './carte-H-xxCarte-Btn-BdG';
import CarteVTitreTxtBgN from './carte-V-Titre-Txt-BgN';
import CarteVTitreTxtBgGN from './carte-V-Titre-Txt-BgGN';
import CarteVImgTitreBgN from './carte-V-Img-Titre-BgN';
import BtnLgBgG from './btn-Lg-BgG';
import BtnSmBgG from './btn-Sm-BgG';






const PageCreerEntreprise: React.FC = () => {

//---------------------------------------------------------------------
//------------------------2 Début data dynamique ----------------------
//---------------------------------------------------------------------
const cardData = [
    {
      route:"/creation-entreprise/formule-gratuite",
      btnTxt:"Découvrir",
      imageSrc: '/chimieFioleBg.png',
      title: 'Formule gratuite',
      children: <p>Vous êtes sûr de vous et maîtrisez l’essentiel ? Débutez immédiatement, via une demande auprès d'une caisse de compensation AVS.</p>,
    },
    {
      route:"/creation-entreprise/formule-premium",
      btnTxt:"Découvrir",
      imageSrc: '/chimieFiolesBg.png',
      title: 'Formule Premium',
      children: <p>Idéal si vous voulez un soutien complet pour éviter les pièges.</p>,
    },
  ];



//---------------------------------------------------------------------
//------------------------2 Début affichage ---------------------------
//---------------------------------------------------------------------
  return (
    <div>
         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
        <div className='p-6'>
            <CarteVImgTitreBgN imageSrc='/jeroNum1010Bg.png' title='Devenez Indépendant en Suisse, Sans Stress'/>
        </div>



        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>



        {/*-----------------------------2 DEBUT CONTENEUR carte-V-Titre-TxT-BgN */}
        <div className='p-6'>
            <CarteVTitreTxtBgGN title="Questionnaire d’Éligibilité / Diagnostic">
            Évaluer la maturité du votre projet. 
            </CarteVTitreTxtBgGN>
        </div>



        {/*-----------------------------3 DEBUT CONTENEUR btn-Sm-BgG */}
        <div className='p-6'>
            <BtnSmBgG route='/creation-entreprise/questionnaire'>
              Faire le test 
            </BtnSmBgG>
        </div>



        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>



        {/*-----------------------------4 DEBUT CONTENEUR carte-V-Img-Txt-BgGN */}
        <div className='p-6'>
            <CarteVImgTxtBgGN imageSrc='/parachuteBg.png' title='Comment Démarrer ?'>
            <p><strong>Remplissez le Questionnaire.</strong></p>
             <p>Évaluez votre niveau de préparation et obtenez instantanément votre score.
              <strong>Découvrez ensuite votre diagnostic</strong> : si votre score est élevé, finalisez vos démarches en toute autonomie. Sinon, optez pour un RDV payant ou notre <strong> Accompagnement Premium.</strong>
            </p>
            </CarteVImgTxtBgGN>
        </div>




        {/*-----------------------------5 DEBUT CONTENEUR carte-H-3xCarte */}
        <div className='p-6'>
            <CarteHxxCarteBtnBdG cards={cardData} />
        </div>



        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>



        {/*-----------------------------6 DEBUT CONTENEUR carte-V-Titre-TxT-BgN */}
        <div className='p-6'>
            <CarteVTitreTxtBgGN title="Questionnaire d’Éligibilité / Diagnostic">
            Vérifiez en 2 minutes si vous êtes prêt(e).
            </CarteVTitreTxtBgGN>
        </div>



        {/*-----------------------------7 DEBUT CONTENEUR btn-Sm-BgG */}
        <div className='p-6'>
            <BtnSmBgG route='/pageAcceuil'>
              Faire le test 
            </BtnSmBgG>
        </div>


        
        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>


    </div>


  );
};

export default PageCreerEntreprise;
