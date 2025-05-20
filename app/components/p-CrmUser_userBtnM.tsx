"use client";

import React, { useState, useEffect } from "react";
import { crmUsers_usersAllSelection} from "../db/dbNeon-CrmUsers_user";
import CartVTitreTxtBgGN from "./cart-V-Titre-Txt-BgGN";
import BtnLgNoEffetBgG from "./btn-Lg-NoEf-Url-BgG";
import LiCrmUser_userBtnBgGN from "./li-CrmUser_usersBtn-bgGN";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const PageCrmUser_userBtnM: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique ----------------------
  //---------------------------------------------------------------------
  const [cardData, setCardData] = useState<any[]>([]);
    const router = useRouter();


  //---------------------------------------------------------------------
  //------------------------2 Début comportement ------------------------
  //---------------------------------------------------------------------
  useEffect(() => {

    console.log("2.0.1 FRONT PageCrmUser_user  => useEffect debut");

    //---------------------------------------------------------------------
    //2.0.2 ../.? gest360CrmUser => useEffect => get cookies
    const cookieStr = Cookies.get("myData");
    console.log("2.0.2 ../../ FRONT PageCrmUser_user  => useE => get cookies: ", cookieStr);

    //---------------------------------------------------------------------
    //2.0.3 ../../ gest360CrmUser => useEffect => cookies NO OK => push > formulaire/seConnecter
    if (!cookieStr) {
      console.log("2.0.3 ../../ FRONT PageCrmUser_user   => useE => cookies NO OK => push > fromul/seConnecter");
      router.push("/formulaire/seConnecter");
      ///////////////////////////////////////////////////////////////////
      //                    STOP 1
      ///////////////////////////////////////////////////////////////////
      return;
    }

    //---------------------------------------------------------------------
    //2.0.4 ../../.?/ gest360CrmUser => useE => cookies OK => parse Cookie
    console.log("2.0.4 ../../.?/ FRONT PageCrmUser_user => useE => cookies => parse Cookie OK/NO"); 
    let cookieData: any;
    
    try {
      cookieData = JSON.parse(cookieStr);
    } catch (e) {
      console.log("2.0.5 ../../../ FRONT PageCrmUser_user => useE => cookies => parse Cookie NO OK"); 
      router.push("/formulaire/seConnecter");
      ///////////////////////////////////////////////////////////////////
      //                    STOP 2
      ///////////////////////////////////////////////////////////////////
      return;
    }

     //---------------------------------------------------------------------
    //2.0.6 ../../../.?/ gest360CrmUser => useEf => cookies => parse Cookie => get userAdmin2
    if (cookieData.crmUserAdmin === "jerome1872Troistorrents") {
      console.log("2.0.6 ../../../../ FRONT PageCrmUser_user => useEf => cookies => parse Cookie => get userAdmin2 & push admin/user: ", cookieData.userAdmin );
      router.push("/admin/users");
      ///////////////////////////////////////////////////////////////////
      //                    STOP 3
      ///////////////////////////////////////////////////////////////////
      return

      //---------------------------------------------------------------------
      //2.0.7 ../../.?/ gest360CrmUser => useEffect => cookies OK => parse Cookie => get userAdmin1
    } else if (cookieData.crmUserAdmin === "user2025Nethelvetic") {
      // Utilisateur normal : on reste ici, on ne fait rien
      console.log("2.0.7 ../../../../ FRONT PageCrmUser_user => useE => cookies => parse Cookie => userAdmin1 OK", cookieData.userAdmin);;
      ///////////////////////////////////////////////////////////////////
      //               CONTINUIE
      ///////////////////////////////////////////////////////////////////


    } else {
      // Valeur inattendue → renvoyer à la connexion
      console.log("2.0.8 ../../../../../ FRONT PageCrmUser_user => useE => cookies => parse Cookie => userAdmin NO OK => push formulaire/seConnecter", cookieData.userAdmin);;
      router.push("/formulaire/seConnecter");
      ///////////////////////////////////////////////////////////////////
      //                    STOP 4
      ///////////////////////////////////////////////////////////////////
    }


    //---------------------------------------------------------------------
    //2.0.9 ../../../ gest360CrmUser => useEffect => cookies => parse Cookie => get userAdmin1 OK
    console.log("2.0.9 ../../../../.?/ Back PageCrmUser_user => useE => cookies => parse Cookie => userAdmin => crmUsersAllSelect_User Ok/NO");
    async function fetchUsers() {

      const crmUsers_usersAllSelectRes = await crmUsers_usersAllSelection(cookieData.userId);

      if (crmUsers_usersAllSelectRes.success) {
        // On s'assure que user est bien un tableau (et non null)
        console.log("2.0.10 ../../../../../ Front PageCrmUser_user => useE=> cookies => parse Cookie => userAdmin => crmUsersAllSelect_User OK");
        const usersArray = crmUsers_usersAllSelectRes.users ?? [];
        setCardData(usersArray);
      } else {
        console.log("2.0.11 ../../../ Front PageCrmUser_user => useE => cookies => parse Cookie => userAdmin => crmUsersAllSelect_UserRes NO OK");
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
        <LiCrmUser_userBtnBgGN 
          cards={cardData}
          buttonTitle="Modifier"
          buttonUrlPrefix="/gestion360/identifier/crmUser_userModif"
        />
      </div>
    </div>
  );
};

export default PageCrmUser_userBtnM;
