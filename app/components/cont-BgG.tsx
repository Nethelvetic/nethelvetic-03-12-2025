"use client";

import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ContanerHBgProps {
  children: ReactNode;
}

const ContanerHBg: React.FC<ContanerHBgProps> = ({ children }) => {
  // ---------------------------------------------------------------------
  // ------------------------ 2 Début data dynamique --------------------
  // ---------------------------------------------------------------------
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);


  
  // ---------------------------------------------------------------------
  // ------------------------ 2 Début comportement ------------------------
  // ---------------------------------------------------------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);




  // ---------------------------------------------------------------------
  // ------------------------ 2 Début affichage --------------------------
  // ---------------------------------------------------------------------
  return (
    //-------------------------1 DEBUT CONTAINER PRINCIPALE
      <div
        ref={containerRef}
        className={`min-h-24 w-full mx-auto rounded-lg bg-bgGardient1 mb-6 
        ${isVisible ? "animate-slide-in-slow" : "animate-fade-out-slow"}`}>

        {/*--------1.1 DEBUT CONTENEUR texte/children   */}
        <div className="w-full flex flex-col justify-center items-stretch rounded-lg">
          {children}
        </div>
      </div>
    //-------------------------1 FIN CONTAINER PRINCIPALEf
  );
};

export default ContanerHBg;
