import React, { ReactNode } from 'react';
import ContainerBgGN from './cont-BgGN';

interface CarteVImgTxtBgGNProps {
  imageSrc: string;
  title: string;
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
      <div className="w-full h-64 md:h-80 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="object-contain w-full h-full"/>
      </div>

      
      {/*----------------1.2 DEBUT CONTENEUR  titre   */}
      <div>
        <h3 className="font-bold text-3xl md:text-7xl my-6">
          {title}
        </h3>
      </div>


       {/*----------------1.3 DEBUT CONTENEUR texte/children   */}
      <div>
        <p className="text-sm md:text-xl">
          {children}
        </p>
      </div>
    </ContainerBgGN>
    //-----------------------------1 FIN CONTAINER-BgGN
  );
};

export default CarteVImgTxtBgGN;
