"use client";

import React, { useState, useEffect } from "react";
import { crmUsers_usersAllSelection} from "../db/dbQuery-CrmUsers_user";
import CartVTitreTxtBgGN from "./cart-V-Titre-Txt-BgGN";
import BtnLgNoEffetBgG from "./btn-Lg-NoEf-Url-BgG";
import ListHUserBtnBgGN from "./li-H-Users-btn-bgGN";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Page360CrmUser_userBtnM: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique ----------------------
  //---------------------------------------------------------------------
  const [cardData, setCardData] = useState<any[]>([]);
    const router = useRouter();


  //---------------------------------------------------------------------
  //------------------------2 Début comportement ------------------------
  //---------------------------------------------------------------------
  useEffect(() => {

    console.log("2.0.1 FRONT PageGest360CrmUser => useEffect debut");

    //---------------------------------------------------------------------
    //2.0.2 ../.? gest360CrmUser => useEffect => get cookies
    const cookieStr = Cookies.get("myData");
    console.log("2.0.2 ../../ FRONT PageGest360CrmUser => useE => get cookies: ", cookieStr);

    //---------------------------------------------------------------------
    //2.0.3 ../../ gest360CrmUser => useEffect => cookies NO OK => push > formulaire/seConnecter
    if (!cookieStr) {
      console.log("2.0.3 ../../ FRONT PageGest360CrmUser  => useE => cookies NO OK => push > fromul/seConnecter");
      router.push("/formulaire/seConnecter");
      ///////////////////////////////////////////////////////////////////
      //                    STOP 1
      ///////////////////////////////////////////////////////////////////
      return;
    }

    //---------------------------------------------------------------------
    //2.0.4 ../../.?/ gest360CrmUser => useE => cookies OK => parse Cookie
    console.log("2.0.4 ../../.?/ FRONT PageGest360CrmUser  => useE => cookies => parse Cookie OK/NO"); 
    let cookieData: any;
    
    try {
      cookieData = JSON.parse(cookieStr);
    } catch (e) {
      console.log("2.0.5 ../../../ FRONT PageGest360CrmUser  => useE => cookies => parse Cookie NO OK"); 
      router.push("/formulaire/seConnecter");
      ///////////////////////////////////////////////////////////////////
      //                    STOP 2
      ///////////////////////////////////////////////////////////////////
      return;
    }

     //---------------------------------------------------------------------
    //2.0.6 ../../../.?/ gest360CrmUser => useEf => cookies => parse Cookie => get userAdmin2
    if (cookieData.userAdmin === "jerome1872Troistorrents") {
      console.log("2.0.6 ../../../../ FRONT PageGest360CrmUser  => useEf => cookies => parse Cookie => get userAdmin2 & push admin/user: ", cookieData.userAdmin );
      router.push("/admin/users");
      ///////////////////////////////////////////////////////////////////
      //                    STOP 3
      ///////////////////////////////////////////////////////////////////
      return

      //---------------------------------------------------------------------
      //2.0.7 ../../.?/ gest360CrmUser => useEffect => cookies OK => parse Cookie => get userAdmin1
    } else if (cookieData.userAdmin === "user2025Nethelvetic") {
      // Utilisateur normal : on reste ici, on ne fait rien
      console.log("2.0.7 ../../../../ FRONT PageGest360CrmUser  => useE => cookies => parse Cookie => userAdmin1 OK", cookieData.userAdmin);;
      ///////////////////////////////////////////////////////////////////
      //               CONTINUIE
      ///////////////////////////////////////////////////////////////////


    } else {
      // Valeur inattendue → renvoyer à la connexion
      console.log("2.0.8 ../../../../../ FRONT PageGest360CrmUser  => useE => cookies => parse Cookie => userAdmin NO OK => push formulaire/seConnecter", cookieData.userAdmin);;
      router.push("/formulaire/seConnecter");
      ///////////////////////////////////////////////////////////////////
      //                    STOP 4
      ///////////////////////////////////////////////////////////////////
    }


    //---------------------------------------------------------------------
    //2.0.9 ../../../ gest360CrmUser => useEffect => cookies => parse Cookie => get userAdmin1 OK
    console.log("2.0.9 ../../../../.?/ Back PageGest360CrmUser  => useE => cookies => parse Cookie => userAdmin => crmUsersAllSelect_User Ok/NO");
    async function fetchUsers() {

      const crmUsersAllSelect_UserRes = await crmUsers_usersAllSelection(cookieData.userId);

      if (crmUsersAllSelect_UserRes.success) {
        // On s'assure que user est bien un tableau (et non null)
        console.log("2.0.10 ../../../../../ Front PageGest360CrmUser  => useE=> cookies => parse Cookie => userAdmin => crmUsersAllSelect_User OK");
        const usersArray = crmUsersAllSelect_UserRes.users ?? [];
        setCardData(usersArray);
      } else {
        console.log("2.0.11 ../../../ Front PageGest360CrmUser  => useE => cookies => parse Cookie => userAdmin => crmUsersAllSelect_UserRes NO OK");
        // selon besoin on peut afficher un message à l'utilisateur ici
        setCardData([]);
      }
    }
    fetchUsers();
  }, []);

  //---------------------------------------------------------------------
  //------------------------3 Début affichage ---------------------------
  //---------------------------------------------------------------------
  return (
    <div>
         {/*-----------------------------1 DEBUT CONTENEUR carte-V-Titre-Txt-BgNG*/}
         <div className='p-6'>
            <CartVTitreTxtBgGN  title='Gestion des Users '>
              Ici, vous pouvez créer de nouveaux users ou modifier ceux qui existent déjà
            </CartVTitreTxtBgGN >
        </div>


         {/*-----------------------------1 DEBUT CONTENEUR carte-H-Img-Titre-BgN */}
         <div className='p-6'>
            <BtnLgNoEffetBgG  interneUrl='/gestion360/identifier/crmUser_userAdd' >
              Creer
            </BtnLgNoEffetBgG  >
        </div>



         {/*-----------0 DEBUT espace entre les sections */} 
         <div className="h-35 md:h-50"></div>

      {/*-----------------------------1 DEBUT CONTENEUR liste de cartes */}
      <div className="p-6">
        <ListHUserBtnBgGN
          cards={cardData}
          buttonTitle="Modifier"
          buttonUrlPrefix="/gestion360/identifier"
        />
      </div>
    </div>
  );
};

export default Page360CrmUser_userBtnM;
