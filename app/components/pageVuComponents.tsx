import React from 'react';
import CarteHImgTxtBgG from './carte-H-Img-Txt-BgG';
import CarteVImgTxtBgGN from './carte-V-Img-Txt-BgGN';
import CarteVImgTxtBdG from './carte-V-Img-Txt-BdG';
import CarteVTitreTxtBgN from './carte-V-Titre-Txt-BgN';
import CarteVImgTitreBgN from './carte-V-Img-Titre-BgN';
import BtnLgBgG from './btn-Lg-BgG';
import BtnSmBgG from './btn-Sm-BgG';




const PageToutComponents: React.FC = () => {
  return (
    <div>



      {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
      <div className=" p-6 ">
        <CarteVImgTitreBgN imageSrc='jeroNum651Bg.png' title='carte-V-Img-Titre car'/>
      </div>



  
      {/*-----------------------------2 DEBUT CONTENEUR carte-H-Img-Txt-BgG */}
      <div className=" p-6 ">
        <CarteHImgTxtBgG imageSrc='jeroNum671Bg.png' title='carte-H-Img-Txt-BgG'>
          <p>
            Praesent ac malesuada lorem. Fusce at 
            ligula vel eros auctor mollis. Cras vel malesuada neque, a ullamcorper arcu. Aliquam vitae tellus libero. 
            Nullam ac velit sed nisi faucibus convallis. In eget est ut ante pulvinar cursus. Pellentesque habitant morbi 
            tristique senectus et netus et malesuada fames ac turpis egestas. Morbi condimentum, eros non hendrerit luctus, 
            urna orci dignissim enim, in lacinia nunc nisi a leo. Vestibulum ante ipsum primis in faucibus orci luctus et 
            ultrices posuere cubilia curae; In at quam nec sapien dapibus ultricies.
          </p>
        </CarteHImgTxtBgG>
      </div>
      {/*-----------------------------2 FIN CONTENEUR carte-H-Img-Txt-BgG */}




      {/*-----------------------------3 DEBUT CONTENEUR BtnLgBgG */} 
            <div className="p-6">
        <BtnLgBgG route='' >
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
        <BtnLgBgG route='' >
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

    </div>
  );
};

export default PageToutComponents;
