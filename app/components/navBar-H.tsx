"use client";

import React, { useState } from 'react';

interface NavItem {
  title: string;
  link: string;
}

interface NavBarHProps {
  items: NavItem[];
  logo: string;
}

const NavBarH: React.FC<NavBarHProps> = ({ items, logo }) => {
  //---------------------------------------------------------------------
  //------------------------ 1 Début data dynamique ----------------------
  //---------------------------------------------------------------------
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //---------------------------------------------------------------------
  //------------------------ 2 Début affichage ---------------------------
  //---------------------------------------------------------------------
  return (
    <nav className="flex items-center justify-between fixed top-0 left-0 w-full bg-gray-800/70 backdrop-blur-sm py-2 px-6 z-50">
      {/* Logo via prop */}
      <div className="logo">
        <img 
          src={logo} 
          alt="Logo" 
          className="h-8 sm:h-12 md:h-14 lg:h-16"
        />
      </div>

      {/* Menu visible sur grand écran */}
      <div className="hidden md:flex space-x-4">
        {items.map((item, index) => (
          <a 
            key={index} 
            href={item.link} 
            className="text-white hover:text-gray-200 font-openSansRegular">
            {item.title}
          </a>
        ))}
      </div>

      {/* Bouton hamburger visible sur petit écran */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none" >
          ☰
        </button>
      </div>

      {/* Menu déroulant pour petit écran */}
      {isMenuOpen && (
        <div className="fixed top-12 left-0 w-full bg-black backdrop-blur-md flex flex-col space-y-2 md:hidden py-3 px-6 z-60 border-b-gardient">
          {items.map((item, index) => (
            <a 
              key={index} 
              href={item.link} 
              className="font-bebas text-center text-3xl text-white hover:opacity-80"
            >
              {item.title}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBarH;
