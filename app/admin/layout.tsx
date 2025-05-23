import type { Metadata } from "next"; 
import { Bebas_Neue, Open_Sans } from "next/font/google";
import "../../app/globals.css";
import NavBarVAdmin from "../components/navBar-V-Admin";

export const metadata: Metadata = {
  title: "Créer une application Next",
  description: "Généré par create next app",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen" style={{ background: "black" }}>
      {/* Sidebar fixe sur grand écran */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:left-0 bg-bgGardient1 z-20">
        <NavBarVAdmin
          items={[
            { title: "Users", link: "/admin/users" },
            { title: "News-Letter", link: "/admin/newsLetter" },
            {
              title: "Evénements",
              subItems: [
                { title: "Formations", link: "/admin/formations" },
                { title: "Evenements", link: "/admin/evenements" },
                { title: "Communaute", link: "/admin/Communaute" },
              ],
            },
            { title: "Blog", link: "admin/blog" },
            { title: "Contact", link: "admin/contact" },
          ]}
        />
      </aside>

      {/* Contenu principal, décalé sur grand écran */}
      <div className="flex-grow md:ml-64">
        {/* Navbar mobile dans le header */}
        <header className="md:hidden">
          <NavBarVAdmin
            items={[
              { title: "Users", link: "/admin/users" },
              { title: "News-Letter", link: "/admin/newsLetter" },
              {
                title: "Evénements",
                subItems: [
                  { title: "Formations", link: "/admin/formations" },
                  { title: "Evenements", link: "/admin/evenements" },
                  { title: "Communaute", link: "/admin/Communaute" },
                ],
              },
              { title: "Blog", link: "admin/blog" },
              { title: "Contact", link: "admin/contact" },
            ]}
          />
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
