import React, { ReactNode } from 'react';
import ContainerBgGN from './cont-BgGN';

interface CarteVImgTxtBgGNProps {
  imageSrc: string;
  title?: string;
  children: ReactNode;
}

const CarteVImgTxtBgGN: React.FC<CarteVImgTxtBgGNProps> = ({ imageSrc, title, children }) => {

//---------------------------------------------------------------------
//------------------------2 Début affichage  --------------------------
//---------------------------------------------------------------------
  return (

    //-----------------------------1 DEBUT CONTAINER-BgGN
    <ContainerBgGN>
      
      {/*----------------1.1 DEBUT CONTENEUR image   */}
      <div className="w-full h-64 md:h-64 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="object-contain w-full h-full"/>
      </div>

      
      {/*----------------1.2 DEBUT CONTENEUR  titre   */}
      <div>
        <h3 className="font-bold text-3xl text-center md:text-6xl my-6">
          {title}
        </h3>
      </div>


       {/*----------------1.3 DEBUT CONTENEUR texte/children   */}
      <div>
        <div className="text-base md:text-lg text-center">
          {children}
        </div>
      </div>
    </ContainerBgGN>
    //-----------------------------1 FIN CONTAINER-BgGN
  );
};

export default CarteVImgTxtBgGN;
