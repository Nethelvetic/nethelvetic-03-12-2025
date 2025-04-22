"use client";

import React from 'react';
import PageAdmUsers from '../../components/page-Adm-Users';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";



export default function Gestion360Identifier() {
  console.log("1.0 Gestion360Identifier debut");

  //---------------------------------------------------------------------
  //------------------------1 Data dynamique ---------------------------
  //--------------------------------------------------------------------- 
  const router = useRouter();

  //---------------------------------------------------------------------
  //------------------------2 Début comportement ------------------------
  //---------------------------------------------------------------------
  useEffect(() => {
    console.log("2.0.1 gestion360/identifier => useEffect debut");

    //---------------------------------------------------------------------
    //2.0.2 gestion360/identifier layout => useEffect => get cookies
    const cookieStr = Cookies.get("myData");
    console.log("2.0.2 gestion360/identifier => useE => get cookies: ", cookieStr);

    //---------------------------------------------------------------------
    //2.0.3 gestion360/identifier layout => useEffect => get cookies NO SUCCES
    if (!cookieStr) {
      console.log("2.0.3 gestion360/identifier => useE => get cookies NO SUCCES");
      router.push("/formulaire/seConnecter");
      return;
    }

    //---------------------------------------------------------------------
    //2.0.4 gestion360/identifier => useEffect => get cookies SUCCES
    let cookieData: any;
    try {
      cookieData = JSON.parse(cookieStr);
    } catch (e) {
      console.error("2.0.4 gestion360/identifier => useEffect => get cookies SUCCES => parse NO SUCCES :", e);
      router.push("/formulaire/seConnecter");
      return;
    }

    //---------------------------------------------------------------------
    //2.0.4 gestion360/identifier => useEffect => get cookies SUCCES => get userAdmin
    if (cookieData.useradmin === "jerome1872Troistorrents") {
      // Admin
      console.log("2.0.4 gestion360/identifier => useE => get cookies SUCCES => get userAdmin1 =", cookieData.useradmin );
      router.push("/admin/users");
    } else if (cookieData.useradmin === "user2025Nethelvetic") {
      // Utilisateur normal : on reste ici, on ne fait rien
      console.log("2.0.5 gestion360/identifier => useE => get cookies NO SUCCES => get userAdmin2 =", cookieData.useradmin );;
    } else {
      // Valeur inattendue → renvoyer à la connexion
      router.push("/formulaire/seConnecter");
    }
  }, []);



//---------------------------------------------------------------------
//------------------------3 Début affichage ---------------------------
//--------------------------------------------------------------------- 
  return (
    <div className="w-full md:w-5xl mx-auto">
      <PageAdmUsers/>
    </div>
  );
}