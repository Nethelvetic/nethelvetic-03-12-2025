"use client";

import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ContainerBtnSmBgGProps {
  children: ReactNode;
}

const ContainerBtnSmBgG: React.FC<ContainerBtnSmBgGProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    //-------------------------1 DEBUT CONTAINER PRINCIPALE
    <div
      ref={containerRef}
      className={`max-w-3xs md:max-w-xs mx-auto px-4 rounded-lg bg-bgGardient1 flex items-center justify-center  hover:brightness-75 ${isVisible ? "animate-slide-in-slow" : "animate-fade-out-slow"}`}>

      {/*--------1.1 DEBUT container texte/children   */}
      <div className="w-full h-full flex items-center justify-center text-base md:text-lg p-3 md:p-5 ">
        {children}
      </div>
    </div>
    //-------------------------1 FIN CONTAINER PRINCIPALE
  );
};

export default ContainerBtnSmBgG;
