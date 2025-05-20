"use client";

import "../../../app/globals.css";
import NavBarVAdmin from "../../components/navBar-V-Admin";



export default function Gest360IdentifierLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  //---------------------------------------------------------------------
  // définir les onglets du menu.
  //---------------------------------------------------------------------
  const navItems = [
    {
      title: "Compte",
      subItems: [
        { title: "Infos personnelles", link: "/gestion360/identifier/crmUser_compteInfosPerso" },
        { title: "Abonnement gestion360", link: "/gestion360/identifier/crmUser_compte_360Abo" },
      ],
    },
    { title: "Contacts", link: "/gestion360/identifier" },
    {
      title: "Finance",
      subItems: [
        { title: "Factures", link: "/admin/formations" },
        { title: "Dépenses", link: "/admin/evenements" },
        { title: "Comptabilité", link: "/admin/Communaute" },
      ],
    },
    {
      title: "Offre",
      subItems: [
        { title: "Factures", link: "/admin/formations" },
        { title: "Dépenses", link: "/admin/evenements" },
        { title: "Comptabilité", link: "/admin/Communaute" },
      ],
    },
    { title: "Blog", link: "/admin/blog" },
    { title: "Contact", link: "/admin/contact" },
  ];

  //---------------------------------------------------------------------
  //------------------------3 Début affichage ---------------------------
  //---------------------------------------------------------------------
  return (
    <div className="flex min-h-screen" style={{ background: "black" }}>
      {/* Sidebar fixe sur grand écran */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:left-0 bg-bgGardient1 z-20">
        <NavBarVAdmin items={navItems} />
      </aside>

      {/* Contenu principal, décalé sur grand écran */}
      <div className="flex-grow md:ml-64">
        {/* Navbar mobile dans le header */}
        <header className="md:hidden">
          <NavBarVAdmin items={navItems} />
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
