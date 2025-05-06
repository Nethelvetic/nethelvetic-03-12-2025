"use client";

import React from 'react';
import ContainerBgGN from './cont-BgGN';
import BtnLgModifBgG from './btn-Lg-Modif-BgG';
import BtnLgNoEfUrlBgG from './btn-Lg-NoEf-Url-BgG';
import ContBtnLgNoEffectBgG from './cont-Btn-Lg-NoEffet-BgG';
import { useRouter } from "next/navigation";
import { crmUsersAllSection } from "../db/dbQuery-CrmUsers";

interface CarteData {
  id: number;
  nom_entreprise: string;
  personne_a_contacter: string;
  ville: string;
  code_postal: string;
  telephone?: string;
  date_de_naissance?: string;
  date_creation: string;
  email: string;
  mot_de_naissance?: string;
  mot_de_passe?: string;
  username?: string;
  status?: string;
  domaine_activite?: string;
  employeur?: string;
  status_professionnel?: string;
  adresse?: string;
  imgUrl?: string;
  btnUrlInt?: string;
  btnUrlExt?: string;
  btnTexte: string;
  btnModifUrl: string;
}

interface LiCrmUsersBtCrmUser_userBgGNProps {
  cards: CarteData[];
}

const LiCrmUsersBtCrmUser_userBgGN: React.FC<LiCrmUsersBtCrmUser_userBgGNProps > = ({ cards }) => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique ----------------------
  //---------------------------------------------------------------------
  console.log("1.0 LiAdmUsersBtCrmBgGN debut",);
  const router = useRouter();

  // Tri des cartes par ordre croissant en fonction du nom de l'entreprise
  const sortedCards = [...cards].sort((a, b) =>
    a.nom_entreprise.localeCompare(b.nom_entreprise)
  );


  //---------------------------------------------------------------------
  //------------------------2 Début comportement ------------------------
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  // 2.0.0 handleClick
  //---------------------------------------------------------------------
  const handleClick = async (e: React.FormEvent) => {
    console.log("2.0.0 ../ Front LiAdmUsersBtCrmBgGN => handleClick debut");
    e.preventDefault();


    //---------------------------------------------------------------------
   //    2.0.2 ../../ LiAdmUsersBtCrmBgGN => H.C. => crmUsersAllSection 
    try {
      console.log("2.0.3 ../.?/ Back FormConnect => H.S. => crmUsersAllSection OK/NO");
      const crmUsersAllSectionRes = await crmUsersAllSection();

      //------------------------------------------------------------
      // 2.0.4 ../../.?/ FormConnect => H.S. => crmUsersAllSection => set Zustand/cookies
      if (crmUsersAllSectionRes.success) {
        console.log("2.0.3 ../../ Back FormConnect => H.S. => crmUsersAllSection OK/");
        const { users } = crmUsersAllSectionRes;
        
        console.log("2.1.7 ../../../ Front FormConnect => H.S. => crmUserEmailAndPwSelect  OK => set Zustand/Cookies");
        // 2.1.7 set Zustand
        setUserAdmin(crm.identification);

        //2.1.8 set cookies
        const myData = {
          userAdmin: crm.identification,
          userImgUrl: user.imgUrl,
          userAdminEmail: user.email,
          userId: user.id
        };
        Cookies.set('myData', JSON.stringify(myData), { expires: 1, path: '/' });

        //2.1.9 route push
        if (crm.identification === "jerome1872Troistorrents") {
          console.log("2.1.9 ../../../../ Front FormConnect => H.S. => crmUserEmailAndPwSelect  => set Zustand/Cookies => Push -> admin/users");
          router.push("/admin/users");
        } else if (crm.identification === "user2025Nethelvetic") {
          console.log("2.1.10 ../../../../ Front FormConnect => H.S. => crmUserEmailAndPwSelect  => set Zustand/Cookies => Push -> gestion360/identifier");
          //////////////////////////////////////////////////////////////////////
          //    CONTINUE A GESTION360/IDENTIFIER
          /////////////////////////////////////////////////////////////////////
          router.push("/gestion360/identifier");
        } else {
          //////////////////////////////////////////////////////////////////////
          //                         STOP 
          /////////////////////////////////////////////////////////////////////
          return;
        }
      } else {
        //------------------------------------------------------------
        // 2.1.10 ../../ Front FormConnect handleSubmit  => selectionUserWithEmailAndPw NO SUCCES
        console.log("2.1.10 ../../.?/ Front FormConnect => H.S. => crmUserEmailAndPwSelect  NO OK => set Cookies");

        // 2.1.11 set cookies
        const myData = {
          userAdmin: crmUserEmailAndPwSelectRes.user?.email === "golliard73@gmail.com" ? "jerome1872Troistorrents": "user2025Nethelvetic",
          userImgUrl: crmUserEmailAndPwSelectRes.user?.imgUrl || "",
          userAdminEmail: crmUserEmailAndPwSelectRes.user?.email || "",
          userId: crmUserEmailAndPwSelectRes.user?.id || ""
        };
        Cookies.set('myData', JSON.stringify(myData), { expires: 1, path: '/' });
        alert(crmUserEmailAndPwSelectRes.message);
      }
    } catch (error) {
      console.log("2.1.11 ../../ Front FormConnect => H.S. => crmUserEmailAndPwSelect  NO OK");
      alert("Une erreur est survenue lors de la connexion.");
    }
  };

  //---------------------------------------------------------------------
  //    2.2.0 handleForgotPassword sur clic du bouton "mot de passe oublié"
  //---------------------------------------------------------------------
  const handleForgotPassword = async () => {
    console.log("2.2.0 ../ Front FormConnect => handleForgotPassword debut");
    if (!username) {
      alert("Veuillez renseigner votre email pour réinitialiser votre mot de passe.");
      return;
    }

    //------------------------------------------------------------
    // 2.2.1 ../ Front FormConnect => H.F.Pw => set Cookies
     console.log("2.2.1 ../../ Front FormConnect => H.F.Pw => set Cookies ");

    // 2.2.2 set cookies
     const myData = {
       userAdmin: username === "golliard73@gmail.com" ? "jerome1872Troistorrents": "user2025Nethelvetic",
       userImgUrl: "",
       userEmail: username || "",
       userId: "",
     };
     Cookies.set('myData', JSON.stringify(myData), { expires: 1, path: '/' });

    try {
      console.log("2.2.3 ../../../ Back FormConnect => H.F.Pw => set Cookies => courrielPw OK NO");
      const courrielPeResult = await courrielPw(username);

      // 2.2.4 Back FormConnect handleForgotPassword => courrielPw() SUCESS
      if (courrielPeResult && courrielPeResult.success) {
        console.log("2.2.3 ../../../ FRONT FormConnect => H.F.Pw => set Cookies => courrielPw OK");
        alert("Un email de réinitialisation a été envoyé à " + username);
      } else {
        alert(
          courrielPeResult?.message ||
            "Une erreur est survenue lors de l'envoi de l'email de réinitialisation."
        );
      }
    } catch (error) {
      console.log("2.2.4 ../../../ Front FormConnect => H.F.Pw => set Cookies => courrielPw NO OK");
      alert("Erreur lors de l'envoi de l'email.");
    }
  };

  
  //---------------------------------------------------------------------
  //------------------------2 affichage ---------------------------------
  //---------------------------------------------------------------------
  return (
    <div>
      {sortedCards.map((card, index) => {

        //------------------------------------------------------
        const content = (
          <div className="w-full">
            <div className="flex flex-row items-start p-1 md:p-3">
              {/* Conteneur image avec largeur réduite (1/4) */}
              <div className="w-1/4 h-28 md:h-56 overflow-hidden">
                <img
                  src={card.imgUrl}
                  alt={card.nom_entreprise}
                  className="object-contain w-full h-full"
                />
              </div>
              {/* Conteneur texte avec largeur ajustée (3/4) */}
              <div className="w-3/4 flex flex-col text-left pl-1 md:pl-4 mt-0 md:mt-4">
                <h4 className="font-bold text-2xl md:text-3xl">{card.email}</h4>
                <h2 className="font-bold text-3xl md:text-5xl">{card.nom_entreprise}</h2>
                <div className="text-base md:text-lg mt-0">{card.ville}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span style={{ color: "#fff" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </span>
                  <p className="m-0 text-xs md:text-lg">{card.personne_a_contacter}</p>
                  <span style={{ color: "#fff" }} className="ml-4">☎</span>
                  <p className="m-0 text-xs md:text-lg">{card.telephone}</p>
                </div>
                
                {/* Bouton visible uniquement sur grand écran */}
                <div className="pt-1 pb-1 md:pt-3 md:pb-3 hidden md:block">
                <ContBtnLgNoEffectBgG >
                    <button className='w-full h-full' onClick={onClick(card.id)}>
                     crm user
                     </button>
                 </ContBtnLgNoEffectBgG >
                </div>
              </div>
            </div>
          </div>
        );

        return (
          <React.Fragment key={index}>
            {/* Version mobile : conteneur cliquable qui inclut le container */}
            <div
              className="md:hidden cursor-pointer"
              onClick={() => router.push(modifUrl)}
            >
              <ContainerBgGN>{content}</ContainerBgGN>
            </div>
            {/* Version desktop : conteneur standard avec bouton */}
            <div className="hidden md:block">
              <ContainerBgGN>{content}</ContainerBgGN>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default LiCrmUsersBtCrmUser_userBgGN;
