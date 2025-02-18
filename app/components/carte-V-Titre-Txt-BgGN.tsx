import React, { ReactNode } from 'react';
import ContainerBgGN from './cont-BgGN';

interface CarteVTitreTxtBgGNProps {
  title: string;
  children?: ReactNode;
}

const CarteVTitreTxtBgGN: React.FC<CarteVTitreTxtBgGNProps> = ({ title, children }) => {




//---------------------------------------------------------------------
//------------------------2 Début affichage  --------------------------
//---------------------------------------------------------------------
  return (

     //-----------------------------1 DEBUT CONTAINER-BgN
     <ContainerBgGN >
      
        {/*----------------1.1 DEBUT CONTENEUR titre  */}
        <div>
            <h3 className="font-bold text-3xl md:text-7xl text-center my-6">
              {title}
            </h3>
          </div>
        
  
        {/*----------------1.2 DEBUT TEXTE/CHILDREN */}
        <div className="text-sm md:text-xl text-center"> 
          {children}
        </div>
     
    </ContainerBgGN>
    //-----------------------------1 FIN CONTAINER-BgN
  );
};

export default CarteVTitreTxtBgGN;
