import React, { ReactNode } from 'react';
import ContainerBgN from './cont-BgN';

interface CarteVTitreTxtBgNProps {
  title: string;
  children?: ReactNode;
}

const CarteVTitreTxtBgN: React.FC<CarteVTitreTxtBgNProps> = ({ title, children }) => {




//---------------------------------------------------------------------
//------------------------2 Début affichage  --------------------------
//---------------------------------------------------------------------
  return (

     //-----------------------------1 DEBUT CONTAINER-BgN
     <ContainerBgN>
      
        {/*----------------1.1 DEBUT CONTENEUR titre  */}
        <div>
            <h3 className="font-bold text-3xl md:text-7xl my-6">
              {title}
            </h3>
          </div>
        
  
        {/*----------------1.2 DEBUT TEXTE/CHILDREN */}
        <div className="text-sm md:text-xl text-center"> 
          {children}
        </div>
     
    </ContainerBgN>
    //-----------------------------1 FIN CONTAINER-BgN
  );
};

export default CarteVTitreTxtBgN;
