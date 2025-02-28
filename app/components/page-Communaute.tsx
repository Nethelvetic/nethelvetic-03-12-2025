import React from 'react';
import CarteVImgTitreBgN from './carte-V-Img-Titre-BgN';
import CarteVTitreTxtBgGN from './carte-V-Titre-Txt-BgGN';
import CarteVImgTxtBgGN from './carte-V-Img-Txt-BgGN';
import CarteHxxCarteBtnBdG from './carte-H-xxCarte-Btn-BdG';
import CarteVImgTxtBdG from './carte-V-Img-Txt-BdG';
import BtnSmBgG from './btn-Sm-BgG';


const PageCommunaute: React.FC = () => {

//---------------------------------------------------------------------
//------------------------2 Début data dynamique ----------------------
//---------------------------------------------------------------------
const cardData = [
  {
    route:"/evenements",
    btnTxt:"En savoir plus",
    imageSrc: '/PortraitRobotBg.png',
    title: 'Ne ratez plus nos événements',
    children: <p>Découvrez nos journées thématiques et rencontrez la communauté hors du cadre pro ! </p>,
  },
  {
    route:"/formulaire-simple",
    btnTxt:"Je M’inscris Maintenant",
    imageSrc: '/radioruporBg.png',
    title: 'La NO BULLSH*T Newsletter ',
    children: <p>la <strong>NO BULLSH*T Newsletter</strong>, un concentré d’info brute, d’astuces franc-parlées et d’opportunités concrètes.</p>,
  },
];




//---------------------------------------------------------------------
//------------------------2 Début affichage   -------------------------
//--------------------------------------------------------------------- 
  return (
    <div>

         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
        <div className='p-6'>
            <CarteVImgTitreBgN imageSrc='/jeroNum1001Bg.png' title="Bienvenue dans la Communauté ''NO BULLSH*T''"/>
        </div>


        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>



        {/*-----------------------------2 DEBUT CONTENEUR carte-V-Titre-TxT-BgN */}
        <div className='p-6'>
            <CarteVTitreTxtBgGN title="On ne veut pas entendre “tout va bien”. On veut la réalité.">
            <p>
            Tu en as assez de ces réseaux d’entrepreneurs <i>où tout le monde est beau, tout le monde est gentil</i>, et où personne n’ose parler des vrais problèmes ? Nous aussi.
            
            <br></br>
            <br></br>
            
            Ici, on aborde <strong> les vrais chiffres, les vrais échecs</strong>, et les vrais doutes sans fard. Parce que c’est en analysant ce qui ne va pas qu’on apprend à avancer <strong> pour de vrai.</strong>
            </p>
            </CarteVTitreTxtBgGN>
        </div>



        {/*-----------------------------3 DEBUT CONTENEUR btn-Sm-BgG */}
        <div className='p-6'>
            <BtnSmBgG route='/formulaire-simple'>
              Candidater
            </BtnSmBgG>
        </div>



      {/*-----------0 DEBUT espace entre les sections */}
      <div className="h-20 md:h-50"></div>



      {/*-----------------------------4 DEBUT CONTENEUR carte-V-Img-Txt-BgGN */}
      <div className='p-6'>
          <CarteVImgTxtBgGN imageSrc='/colorfulBg.png' title='Notre ADN : la confrontation pour construire'>
          <p>
            <strong>Assez de la complaisance</strong> où tout le monde hoche la tête en mode “super idée, j’adore”.
            Dans la Communauté NO BULLSH*T, on organise des <strong>débats</strong> (voire des fights bienveillants) :
          </p>
          <br></br>
          <ul className="list-disc ml-6">
            <li>
              <strong>Le “Dinosaure” du business vs. le Jeune Loup</strong> : L’expérience contre la fougue.
            </li>
            <li>
            <strong>Le “Fortuné” vs. le “Parti de Rien”</strong> : Deux visions de l’entrepreneuriat qui s’affrontent.
            </li>
            <li>
            <strong>Le Marathonien vs. le Sprinteur</strong> : Business construit sur le long terme vs. besoin de résultats immédiats.
            </li>
          </ul>
           <br></br> 
          <p>
            On se dit les choses, on se confronte aux visions différentes. Et c’est dans ce choc d’idées que naît l’innovation.
          </p>
          </CarteVImgTxtBgGN>
      </div>



        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>



        {/*-----------------------------5 DEBUT CONTENEUR carte-Img-Txt-Bdg */}
        <div className='p-6'>
            <CarteVImgTxtBgGN  imageSrc='/boucheBg.png' title='Ce que tu vas trouver chez NO BULLSH*T'>
              <p><strong>Des Discussions Sans Tabou</strong></p><p>Coaching collectif où chacun peut être “récadré” (mais avec bienveillance) pour avancer plus vite.</p>
              <br></br>
              <p><strong>Des Débats Style “Fight Club”</strong></p><p>Opposer deux profils radicalement différents pour faire émerger la meilleure approche.</p>
              <br></br>
              <p><strong>Un espace collaboratif anti-polissé</strong></p><p>Tu veux booster ton business ? On te dira si ton idée est brillante… ou si elle ne tiendra pas la route.</p>
              <br></br>
              <p><strong>Outils pratiques pour les entrepreneurs.</strong></p><p>Des ressources prêtes à l’emploi qui simplifient la gestion de leur activité.<p/></p>
            </CarteVImgTxtBgGN >
        </div>



        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>




        {/*-----------------------------6 DEBUT CONTENEUR carte-V-Titre-TxT-BgN */}
        <div className='p-6'>
            <CarteVTitreTxtBgGN title="Comment rejoindre le Mouvement ?">
              <strong>Candidature </strong>
              <p>Tu remplis un formulaire</p>

            <br></br>

              <strong>Accès immédiat </strong>
              <p>Tu entres gratuitement.</p>
              <p>Découvres les débats, nos ressources et notre énergie.</p>
           
            <br></br>
       
              <strong>Essai gratuit de 2 mois</strong>
              <p>Après 2 mois, si tu kiffes, deviens membre moyennant une cotisation.</p> 
              <p> Sinon, aucun souci : tu peux nous quitter sans frais, ni rancune.</p>
            
            </CarteVTitreTxtBgGN>
        </div>



        {/*-----------------------------7 DEBUT CONTENEUR btn-Sm-BgG */}
        <div className='p-6'>
            <BtnSmBgG route='/formulaire-simple'>
              Candidater
            </BtnSmBgG>
        </div>



        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>



        {/*-----------------------------5 DEBUT CONTENEUR carte-H-3xCarte */}
        <div className='p-6'>
            <CarteHxxCarteBtnBdG cards={cardData} />
        </div>

    
    </div>
    );
  }

      export default PageCommunaute
    