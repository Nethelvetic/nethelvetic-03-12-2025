"use client";

import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ContainerBtnLgBgG2Props {
  children: ReactNode;
}

const ContainerBtnLgBgG2: React.FC<ContainerBtnLgBgG2Props> = ({ children }) => {
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
      className={`max-w-5xl mx-auto px-4 rounded-lg bg-bgGardient2 flex items-center justify-center hover:brightness-75 ${isVisible ? "animate-slide-in-slow" : "animate-fade-out-slow"}`}>

      {/*--------1.1 DEBUT container texte/children   */}
      <div className="w-full h-full flex items-center justify-center p-1 md:p-3 ">
        {children}
      </div>
    </div>
    //-------------------------1 FIN CONTAINER PRINCIPALE
  );
};

export default ContainerBtnLgBgG2;
