import React from 'react';
import CarteHImgTxtBgG from './carte-H-Img-Txt-BgG';
import CarteHImgTxtBdG from './carte-V-Img-Txt-BdG';
import CarteVImgTxtBgGN from './carte-V-Img-Txt-BgGN';
import CarteVImgTxtBtnBdG from './carte-V-Img-Txt-Btn-BdG';
import CarteHxxCarteBtnBdG from './carte-H-xxCarte-Btn-BdG';
import CarteVTitreTxtBgN from './carte-V-Titre-Txt-BgN';
import CarteVTitreTxtBgGN from './carte-V-Titre-Txt-BgGN';
import CarteVImgTitreBgN from './carte-V-Img-Titre-BgN';
import BtnLgBgG from './btn-Lg-BgG';
import BtnSmBgG from './btn-Sm-BgG';






const PageCreerEntrGratuite: React.FC = () => {

//---------------------------------------------------------------------
//------------------------2 Début data dynamique ----------------------
//---------------------------------------------------------------------


//---------------------------------------------------------------------
//------------------------2 Début affichage ---------------------------
//---------------------------------------------------------------------
  return (
    <div>
         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
        <div className='p-6'>
            <CarteVImgTitreBgN imageSrc='/positifDoigtBg.png' title='Vous êtes prêt(e) !'/>
        </div>



        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>



        {/*-----------------------------2 DEBUT CONTENEUR carte-V-Titre-TxT-BgN */}
        <div className='p-6'>
            <CarteVTitreTxtBgGN title="Remplissez le dossier officiel en ligne">
            <p>Rassemblez vos infos (identité, adresse, activité, un relevé des revenus et des dépenses, copies de factures, assurances…) pour le questionnaire officiel</p>
            <br></br>
            <p>Veuillez noter qu'une affiliation à l'avance n'est pas possible. Inscrivez-vous seulement à partir du moment où vous avez commencé votre activité et que vous pouvez prouver votre statut d'indépendant·e.</p>
            <br></br>
            <p>Tous/tes les indépendant·e·s doivent s'inscrire auprès de la caisse de compensation cantonale du siège de l'entreprise.</p>
            </CarteVTitreTxtBgGN>
        </div>



        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-20 md:h-50"></div>



        {/*-----------------------------5 DEBUT CONTENEUR carte-H-3xCarte */}
        <div className='p-6'>
            <CarteVImgTxtBtnBdG imageSrc='/ordinateur2Bg.png' title='Compléter la demande' externalUrl="https://finfo.zas.admin.ch/ahv/jsp/front.jsp?app=AHV-IV&form=318_146_online_1&lang=fr" btnTxt="déposer la demande maintenant">
            Le formulaire suivant vous permet d'introduire votre demande de travail indépendant.
            </CarteVImgTxtBtnBdG> 
        </div>
    </div>
  );
};

export default PageCreerEntrGratuite;
