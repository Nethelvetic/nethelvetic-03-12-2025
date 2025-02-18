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
  // ------------------------ 2 Début affichage ---------------------------
  // ---------------------------------------------------------------------
  return (
    //-------------------------1 DEBUT CONTAINER PRINCIPALE
      <div
        ref={containerRef}
        className={`min-h-24 md:min-h-32 max-w-5xl mx-auto rounded-lg bg-bgGardient1 ${isVisible ? "animate-slide-in-slow" : "animate-fade-out-slow"}`}>

        {/*--------1.1 DEBUT CONTENEUR texte/children   */}
        <div className="flex flex-col items-center p-3 md:p-5  md:p-10rounded-lg">
          {children}
        </div>
      </div>
    //-------------------------1 FIN CONTAINER PRINCIPALE
  );
};

export default ContanerHBg;
