"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

interface ContanerBdGProps {
  children: ReactNode;
}

const ContanerBdG: React.FC<ContanerBdGProps> = ({ children }) => {
  // ---------------------------------------------------------------------
  // ------------------------ 1 Début data dynamique --------------------
  // ---------------------------------------------------------------------
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);



  // ---------------------------------------------------------------------
  // ------------------------ 2 Début data comportement ------------------
  // ---------------------------------------------------------------------
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



  // ---------------------------------------------------------------------
  // ------------------------ 3 Début Affichage --------------------------
  // ---------------------------------------------------------------------
  return (
    <div
      ref={containerRef}
      className={`min-h-24 w-full mx-auto rounded-lg border border-b-gardient bg-black mb-6 ${
        isVisible ? "animate-slide-in-slow" : "animate-fade-out-slow"
      }`}
    >
      <div className="w-full flex flex-col justify-center items-stretch rounded-lg">
        {children}
      </div>
    </div> 
  );
};

export default ContanerBdG;
