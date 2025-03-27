"use client";

import React, { useState } from "react";

interface NavSubItem {
  title: string;
  link: string;
}

interface NavItem {
  title: string;
  link?: string;
  subItems?: NavSubItem[];
}

interface NavBarProps {
  items: NavItem[];
}

const NavBarV: React.FC<NavBarProps> = ({ items}) => {


  //---------------------------------------------------------------------
  //------------------------1 Début Data dynamique   --------------------
  //---------------------------------------------------------------------
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);



  //---------------------------------------------------------------------
  //------------------------2 Début comportement   ----------------------
  //---------------------------------------------------------------------

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };



  //---------------------------------------------------------------------
  //------------------------3 Début affichage   -------------------------
  //---------------------------------------------------------------------
  return (
    <>
      {/* Bouton hamburger pour mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 text-white text-3xl"
      >
        ☰
      </button>

      {/* SIDEBAR NAVIGATION */}
      <nav
        className={`fixed left-0 top-15 h-full w-64 bg-gray-800 text-white flex flex-col items-center py-6 space-y-6 transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Fermer la navbar en mobile */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="md:hidden text-white text-3xl absolute top-4 right-4"
        >
          ✕
        </button>

        {/* MENU */}
        <div className="flex flex-col space-y-4 w-full">
          {items.map((item, index) => (
            <div key={index} className="relative w-full">
              {item.subItems ? (
                <>
                  {/* MENU AVEC SOUS-MENU */}
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="w-full text-left px-6 py-3 hover:bg-gray-700 font-semibold"
                  >
                    {item.title} ▾
                  </button>
                  {openDropdown === index && (
                    <div className="flex flex-col bg-gray-700">
                      {item.subItems.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.link}
                          className="px-8 py-2 hover:bg-gray-600"
                        >
                          {subItem.title}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* MENU SIMPLE */
                <a
                  href={item.link}
                  className="block px-6 py-3 hover:bg-gray-700 font-semibold"
                >
                  {item.title}
                </a>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavBarV;
