// src/app/layout.tsx
import type { Metadata } from "next";
import { Bebas_Neue, Open_Sans } from "next/font/google";
import  NavBarH  from "./components/navBar-H";
import  footer  from "./components/footer";
import "./globals.css";
import Footer from "./components/footer";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "black" }}>
        <header>
        <NavBarH logo="/LogoNeth.png" items={[
          { title: 'Accueil', link: '/' },
          { title: 'Communauté', link: '/communauteVIP' },
          { title: 'Blog', link: '/blog' },
          { title: 'Contact', link: '/contact' }
        ]} />
        </header>

        <main>
          {children}
        </main>

        <footer>
          <Footer/>
        </footer>
      </body>
    </html>
  );
}
