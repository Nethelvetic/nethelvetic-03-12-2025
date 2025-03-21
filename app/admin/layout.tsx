// src/app/admin/layout.tsx (ou votre layout admin)
import type { Metadata } from "next"; 
import { Bebas_Neue, Open_Sans } from "next/font/google";
import "../../app/globals.css";
import NavBarVAdmin from "../components/navBar-V-Admin";
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "black" }}>
      <header>
        <NavBarVAdmin 
          items={[
            { title: "Clients", link: "./clients" },
            { title: "News-Letter", link: "./newsLetter" },
            {
              title: "Evénements",
              subItems: [
                { title: "Formations", link: "./formations" },
                { title: "Evenements", link: "./evenements" },
                { title: "Communaute", link: "./Communaute" },
              ],
            },
            { title: "Blog", link: "./blog" },
            { title: "Contact", link: "./contact" },
          ]}
        />
      </header>

      {/* Espace entre les sections */}
      <div className="h-10 md:h-15"></div>

      <div className="flex-grow">{children}</div>
    </div>
  );
}
