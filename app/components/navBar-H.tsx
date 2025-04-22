"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import VarZustand from "../util/zustand";

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

// Définition du type pour le cookie JSON "myData"
interface MyDataType {
  userAdmin?: string;
  userImgUrl?: string;
  userEmail?: string;
}

const NavBarH: React.FC<NavBarHProps> = ({ items, logo }) => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique   --------------------
  //---------------------------------------------------------------------
  console.log("1.0.0 NavBarH debut");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [cookieData, setCookieData] = useState<MyDataType | undefined>(undefined);

  //---------------------------------------------------------------------
  // Récupère les valeurs zustand
  const { userAdmin, setUserAdmin } = VarZustand();
  console.log("1.0.0 NavBarH var zustand userAdmin =", userAdmin);

  //---------------------------------------------------------------------
  //------------------------2 Début Comportement   ----------------------
  //---------------------------------------------------------------------
  // useEffect s'execute au changement de userAdmin,
  useEffect(() => {
    console.log("2.0.0 NavBarH useEffect début");
    //---------------------------------------------------------------
    // Récupère les data du cookie "myData"
    const cookieStr = Cookies.get("myData");
    console.log("2.0.2 NavBarH useEffect Cookie récupéré =", cookieStr);

    //---------------------------------------------------------------
    // Parse les data et définit la variable cookieData
    if (cookieStr) {
      try {
        const parsed: MyDataType = JSON.parse(cookieStr);
        setCookieData(parsed);
      } catch (error) {
        console.error("Erreur lors du parsing du cookie 'myData':", error);
        setCookieData(undefined);
      }
    } else {
      setCookieData(undefined);
    }
  }, [userAdmin]);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  //---------------------------------------------------------------------
  // Déconnexion : supprime le cookie "myData" et met à jour l'état 
  //---------------------------------------------------------------------
  const handleLogout = () => {
    console.log("2.0.2 NavBarH handleLogout");
    Cookies.remove("myData", { path: "/" });
    setCookieData(undefined);
    setUserAdmin("");
  };

  //---------------------------------------------------------------------
  //------------------------3 Affichage  --------------------------------
  //---------------------------------------------------------------------
  return (
    <nav className="flex items-center justify-between fixed top-0 left-0 w-full bg-gray-800/70 backdrop-blur-sm py-2 px-6 z-50">
      {/* Conteneur gauche : Logo et infos d'authentification */}
      <div className="flex items-center gap-4">
        <div className="logo">
          <img
            src={logo}
            alt="Logo"
            className="h-8 sm:h-12 md:h-14 lg:h-16"
          />
        </div>
        {/* Bloc auth pour grand écran */}
        <div className="hidden md:flex items-center gap-4">
          {!cookieData ? (
            <a
              href="/formulaire/seConnecter"
              className="text-white hover:text-gray-200 font-openSansRegular text-base md:text-lg"
            >
              Connecter
            </a>
          ) : (
            <>
              <img
                src={cookieData.userImgUrl}
                alt="User"
                className="h-10 w-10 md:h-16 md:w-16 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="ml-2 text-white hover:text-gray-200 font-openSansRegular text-base md:text-lg cursor-pointer"
              >
                Quitter
              </button>
            </>
          )}
        </div>
        {/* Bloc auth pour petit écran (affiché à droite du logo) */}
        <div className="flex md:hidden items-center gap-2">
          {!cookieData ? (
            <a
              href="/formulaire/seConnecter"
              className="text-white hover:text-gray-200 font-openSansRegular text-base"
            >
              Connecter
            </a>
          ) : (
            <>
              <img
                src={cookieData.userImgUrl}
                alt="User"
                className="h-10 w-10 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200 font-openSansRegular text-base cursor-pointer"
              >
                Quitter
              </button>
            </>
          )}
        </div>
      </div>

      {/* Conteneur central pour grand écran : Menu items */}
      <div className="hidden md:flex space-x-4 items-center">
        {items.map((item, index) => (
          <div key={index} className="relative">
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleDropdown(index)}
                  className="text-white hover:text-gray-200 font-openSansRegular text-base md:text-lg focus:outline-none"
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
                className="text-white hover:text-gray-200 font-openSansRegular text-base md:text-lg"
              >
                {item.title}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Conteneur droit pour petit écran : uniquement le bouton hamburger */}
      <div className="flex md:hidden items-center">
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
          {/* Bouton de fermeture */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-2xl focus:outline-none"
              aria-label="Fermer le menu"
            >
              &times;
            </button>
          </div>
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
                          onClick={() => setIsMenuOpen(false)}
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
                  onClick={() => setIsMenuOpen(false)}
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
