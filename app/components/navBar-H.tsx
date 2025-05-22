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
  userJerome?: string;
  crmUserAdmin?: string;
  crmUserImgUrl?: string;
  crmUserAdminEmail?: string;
  crmUserId?: string | number;
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
  console.log("1.0.0 NavBarH zustand => userAdmin =", userAdmin);

  //---------------------------------------------------------------------
  //------------------------2 Début Comportement   ----------------------
  //---------------------------------------------------------------------
  useEffect(() => {
    console.log("2.0.0 NavBarH useEffect début");
    const cookieStr = Cookies.get("myData");
    console.log("2.0.2 ../NavBarH useEffect => Cookie OK =", cookieStr);
    if (cookieStr) {
      try {
        console.log("2.0.2 ../.? NavBarH useEffect => Cookie OK  => parse Cookie Ok/NO");
        const parsed: MyDataType = JSON.parse(cookieStr);
        setCookieData(parsed);
      } catch (error) {
        console.error("2.0.3 ../.. NavBarH useEffect => Cookie OK  => parse Cookie NO ok ", error);
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
  // Déconnexion : supprime le cookie "myData", met à jour l'état et redirige
  //---------------------------------------------------------------------
  const handleLogout = () => {
    console.log("2.0.2 NavBarH handleLogout");
    Cookies.remove("myData", { path: "/" });
    setCookieData(undefined);
    setUserAdmin("");
    window.location.href = "/";
  };

  //---------------------------------------------------------------------
  //------------------------3 Affichage  --------------------------------
  //---------------------------------------------------------------------
  return (
    <nav className="flex items-center justify-between fixed top-0 left-0 w-full bg-gray-800/70 backdrop-blur-sm py-2 px-6 z-50">
      {/* ----------- logo + auth (desktop) ----------- */}
      <div className="flex items-center gap-4">
        <div className="logo">
          <img src={logo} alt="Logo" className="h-8 sm:h-12 md:h-14 lg:h-16" />
        </div>
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
              {userAdmin === "jerome1872Troistorrents" ? (
                // --- si c'est Jerome, on ne change rien (on pourrait afficher un avatar ou un label spécial) ---
                <div className="flex items-center gap-2">
                  {/* ici on laisse tel quel / ou mettre un avatar/admin placeholder */}
                  <span className="text-white font-openSansRegular text-base md:text-lg">
                    Admin
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-gray-200 font-openSansRegular text-base md:text-lg cursor-pointer"
                  >
                    Quitter
                  </button>
                </div>
              ) : (
                // --- sinon on affiche l'image et l'email du cookieData ---
                <>
                  <div className="flex flex-col items-center">
                    <a href="/formulaire/seConnecter">
                      <img
                        src={cookieData.crmUserImgUrl}
                        alt="User"
                        className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                      />
                    </a>
                    <span className="text-white font-openSansRegular text-xs md:text-sm mt-1">
                      {cookieData.crmUserAdminEmail}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-2 text-white hover:text-gray-200 font-openSansRegular text-base md:text-lg cursor-pointer"
                  >
                    Quitter
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* ----------- menu items (desktop) ----------- */}
      <div className="hidden md:flex space-x-4 items-center">
        {items.map((item, idx) => (
          <div key={idx} className="relative">
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleDropdown(idx)}
                  className="text-white hover:text-gray-200 font-openSansRegular text-base md:text-lg"
                >
                  {item.title} &gt;
                </button>
                {openDropdown === idx && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-gray-700 rounded shadow-lg z-50">
                    {item.subItems.map((sub, sidx) => (
                      <a
                        key={sidx}
                        href={sub.link}
                        className="block px-4 py-2 text-white hover:bg-gray-600"
                      >
                        {sub.title}
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

      {/* ----------- hamburger + auth (mobile) ----------- */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none mr-4"
        >
          ☰
        </button>
        {!cookieData ? (
          <a
            href="/formulaire/seConnecter"
            className="text-white hover:text-gray-200 font-openSansRegular text-base"
          >
            Connecter
          </a>
        ) : userAdmin === "jerome1872Troistorrents" ? (
          // mobile, Jerome : rien à changer non plus
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200 font-openSansRegular text-base cursor-pointer"
          >
            Quitter
          </button>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <a href="/formulaire/seConnecter">
                <img
                  src={cookieData.crmUserImgUrl}
                  alt="User"
                  className="h-8 w-8 rounded-full"
                />
              </a>
              <span className="text-white font-openSansRegular text-xs mt-1">
                {cookieData.crmUserAdminEmail}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-200 font-openSansRegular text-base cursor-pointer ml-2"
            >
              Quitter
            </button>
          </>
        )}
      </div>

      {/* ----------- menu déroulant mobile ----------- */}
      {isMenuOpen && (
        <div className="fixed top-12 left-0 w-full bg-black backdrop-blur-md flex flex-col space-y-2 py-3 px-6 z-60 border-b-gardient md:hidden">
          <div className="flex justify-end">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-2xl focus:outline-none"
              aria-label="Fermer le menu"
            >
              &times;
            </button>
          </div>
          {items.map((item, idx) => (
            <div key={idx} className="relative">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleDropdown(idx)}
                    className="font-bebas text-left text-3xl text-white hover:opacity-80 w-full"
                  >
                    {item.title} &gt;
                  </button>
                  {openDropdown === idx && (
                    <div className="mt-2 flex flex-col items-center">
                      {item.subItems.map((sub, sidx) => (
                        <a
                          key={sidx}
                          href={sub.link}
                          className="block text-center text-xl text-white hover:opacity-80 w-full"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {sub.title}
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
