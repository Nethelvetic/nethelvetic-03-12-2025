import React from 'react';
import CarteHImgTxtBgG from './cart-H-Img-Txt-BgG';
import CarteVImgTxtBgGN from './cart-V-Img-Txt-BgGN';
import CarteVImgTxtBdG from './cart-V-Img-Txt-BdG';
import CarteVTitreTxtBgN from './cart-V-Titre-Txt-BgN';
import CarteVImgTitreBgN from './cart-V-Img-Titre-BgN';
import FormUser from './form-User';
import Calendar from './calendar';
import BtnLgBgG from './btn-Lg-BgG';
import BtnSmBgG from './btn-Sm-BgG';




const PageToutComponents: React.FC = () => {

//---------------------------------------------------------------------
//------------------------1 Début data dynamique ----------------------
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
//------------------------3 Début affichage ---------------------------
//---------------------------------------------------------------------
  return (
    <div>


      {/*-----------------------------1 DEBUT CONTENEUR calendar */}
      <div className=" p-6 ">
        <Calendar />
      </div>



      {/*-----------------------------2 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
      <div className=" p-6 ">
        <CarteVImgTitreBgN imageSrc='jeroNum651Bg.png' title='carte-V-Img-Titre car'/>
      </div>




  
      {/*-----------------------------2 DEBUT CONTENEUR carte-H-Img-Txt-BgG */}
      <div className=" p-6 ">
        <CarteHImgTxtBgG cards={cardData} />
      </div>
      {/*-----------------------------2 FIN CONTENEUR carte-H-Img-Txt-BgG */}




      {/*-----------------------------3 DEBUT CONTENEUR BtnLgBgG */} 
            <div className="p-6">
        <BtnLgBgG >
          BtnLgBgG 
        </BtnLgBgG >
      </div>
      {/*-----------------------------3 DEBUT CONTENEUR BtnLgBgG */} 




      {/*-----------------------------3 DEBUT CONTENEUR BtnSmBgG */} 
            <div className="p-6">
        <BtnSmBgG route='' >
          BtnLgBgG 
        </BtnSmBgG >
      </div>
      {/*-----------------------------3 DEBUT CONTENEUR BtnSmBgG */} 




      {/*-----------------------------4 DEBUT CONTENEUR Carte-V-Img-Txt-BgGN */}
      <div className="p-6 ">
        <CarteVImgTxtBgGN imageSrc="jeroNum691Bg.png" title="Carte-V-Img-Txt-BgGN">
        Un petit lorem pour démontrer que nous somme avec un container noir dégrader 
        </CarteVImgTxtBgGN>
      </div>
      {/*-----------------------------4 FIN CONTENEUR Carte-V-Img-Txt-BgGN */}




      {/*-----------------------------5 DEBUT CONTENEUR Carte-V-Titre-TxtBgN */} 
      <div className="p-6 ">
        <CarteVTitreTxtBgN  title="Carte-V-Titre-TxtBgN ">
        Un petit lorem pour démontrer que nous somme avec un container noir dégrader 
        </CarteVTitreTxtBgN >
      </div>
      {/*-----------------------------5 FIN CONTENEUR Carte-V-Titre-TxtBgN */} 




      {/*-----------------------------6 DEBUT CONTENEUR BtnLgBgG */} 
      <div className="p-6">
        <BtnLgBgG >
          BtnLgBgG 
        </BtnLgBgG >
      </div>
      {/*-----------------------------6 DEBUT CONTENEUR BtnLgBgG */} 




      {/*-----------------------------7 DEBUT CONTENEUR BtnTest */} 
      <div className="p-6 ">
        <CarteVImgTxtBdG  imageSrc="jeroNum691Bg.png" title="Votre Titre">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur metus nec metus porttitor, 
          eget malesuada leo dapibus. Nulla facilisi. Integer imperdiet ligula nec leo consequat, vitae cursus lorem 
          dictum. Suspendisse potenti. Vivamus bibendum erat nec felis faucibus, eget vestibulum lacus pellentesque. 
          Phasellus non congue lorem. Sed ut dolor ut purus malesuada consequat. Praesent ac malesuada lorem. Fusce at 
          ligula vel eros auctor mollis. Cras vel malesuada neque, a ullamcorper arcu. Aliquam vitae tellus libero. 
          Nullam ac velit sed nisi faucibus convallis. In eget est ut ante pulvinar cursus. Pellentesque habitant morbi 
          tristique senectus et netus et malesuada fames ac turpis egestas. Morbi condimentum, eros non hendrerit luctus, 
          urna orci dignissim enim, in lacinia nunc nisi a leo. Vestibulum ante ipsum primis in faucibus orci luctus et 
          ultrices posuere cubilia curae; In at quam nec sapien dapibus ultricies.      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur metus nec metus porttitor, 
          eget malesuada leo dapibus. Nulla facilisi. Integer imperdiet ligula nec leo consequat, vitae cursus lorem 
          dictum. Suspendisse potenti. Vivamus bibendum erat nec felis faucibus, eget vestibulum lacus pellentesque. 
          Phasellus non congue lorem. Sed ut dolor ut purus malesuada consequat. Praesent ac malesuada lorem. Fusce at 
          ligula vel eros auctor mollis. Cras vel malesuada neque, a ullamcorper arcu. Aliquam vitae tellus libero. 
          Nullam ac velit sed nisi faucibus convallis. In eget est ut ante pulvinar cursus. Pellentesque habitant morbi 
          tristique senectus et netus et malesuada fames ac turpis egestas. Morbi condimentum, eros non hendrerit luctus, 
          urna orci dignissim enim, in lacinia nunc nisi a leo. Vestibulum ante ipsum primis in faucibus orci luctus et 
          ultrices posuere cubilia curae; In at quam nec sapien dapibus ultricies.
        </CarteVImgTxtBdG >
      </div>
      {/*-----------------------------7 DEBUT CONTENEUR BtnTest */} 



      {/*-----------------------------8 DEBUT FormUser */} 
      <div>
        <FormUser>

        </FormUser>
      </div>
    </div>
  );
};

export default PageToutComponents;
