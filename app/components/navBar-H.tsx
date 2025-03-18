"use client";

import React, { useState } from 'react';

interface NavSubItem {
  title: string;
  link: string;
}

interface NavItem {
  title: string;
  link?: string;
  subItems?: NavSubItem[];
}

interface NavBarHProps {
  items: NavItem[];
  logo: string;
}

const NavBarH: React.FC<NavBarHProps> = ({ items, logo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  return (
    <nav className="flex items-center justify-between fixed top-0 left-0 w-full bg-gray-800/70 backdrop-blur-sm py-2 px-6 z-50">
      {/* Logo */}
      <div className="logo">
        <img 
          src={logo} 
          alt="Logo" 
          className="h-8 sm:h-12 md:h-14 lg:h-16"
        />
      </div>

      {/* Menu visible sur grand écran */}
      <div className="hidden md:flex space-x-4 items-center">
        {items.map((item, index) => (
          <div key={index} className="relative">
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleDropdown(index)}
                  className="text-white hover:text-gray-200 font-openSansRegular focus:outline-none"
                >
                  {item.title} &gt;
                </button>
                {openDropdown === index && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-gray-700 rounded shadow-lg z-50">
                    {item.subItems.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.link}
                        className="block px-4 py-2 text-white hover:bg-gray-600"
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <a 
                href={item.link}
                className="text-white hover:text-gray-200 font-openSansRegular"
              >
                {item.title}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Bouton hamburger visible sur petit écran */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Menu déroulant pour petit écran */}
      {isMenuOpen && (
        <div className="fixed top-12 left-0 w-full bg-black backdrop-blur-md flex flex-col space-y-2 md:hidden py-3 px-6 z-60 border-b-gardient">
          {items.map((item, index) => (
            <div key={index} className="relative">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="font-bebas text-left text-3xl text-white hover:opacity-80 w-full"
                  >
                    {item.title} &gt;
                  </button>
                  {openDropdown === index && (
                    <div className="mt-2 flex flex-col items-center">
                      {item.subItems.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.link}
                          className="block text-center text-xl text-white hover:opacity-80 w-full"
                        >
                          {subItem.title}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a 
                  href={item.link}
                  className="font-bebas text-left text-3xl text-white hover:opacity-80"
                >
                  {item.title}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBarH;
