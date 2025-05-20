"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import CarteVImgTxtBgGN from "./cart-V-Img-Txt-BgGN";
import ContBtnLgNoEffetBgG from "./cont-Btn-Lg-NoEffet-BgG";
import courrielInscription from "../email/crmUser_EmailInscrit"; 
import { crmUserInsertion} from "../db/dbNeon-CrmUserInscrit"; 
import VarZustand from "../util/zustand";
import Cookies from "js-cookie";

type UserDataType = {
  nom_entreprise?: string;
  personne_a_contacter?: string;
  ville?: string;
  code_postal?: string;
  telephone?: string;
  date_de_naissance?: string;
  date_creation: string;
  email: string;
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
  btnTexte?: string;
  btnModifUrl: string;
  date?: string;
  titre?: string;
  texte?: string;
  prix?: number;
  heure?: string;
  lieu?: string;
};

const initialUserData: UserDataType = {
  nom_entreprise: "",
  personne_a_contacter: "",
  ville: "",
  code_postal: "",
  telephone: "",
  date_de_naissance: "",
  date_creation: "",
  email: "",
  mot_de_passe: "",
  username: "",
  status: "",
  domaine_activite: "",
  employeur: "",
  status_professionnel: "",
  adresse: "",
  imgUrl: "",
  btnUrlInt: "/formulaire/contact",
  btnUrlExt: "",
  btnTexte: "modification",
  btnModifUrl: "/admin/users",
  date: "",
  titre: "",
  texte: "",
  prix: 0,
  heure: "",
  lieu: ""
};

const  FormCrmUserIns: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique   --------------------
  //---------------------------------------------------------------------
  console.log("1.0.0 CrmUser-Form debut");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();


  //------------------------------------------------------------
  //    1.0.2 varibale globale zustand 
  //------------------------------------------------------------
  const {  setUserAdmin } = VarZustand();


  //------------------------------------------------------------
  //    1.0.3 background du formulaire
  //------------------------------------------------------------
  const getInputClass = (value: string) =>
    value
      ? "bg-white text-black placeholder-gray-500"
      : "bg-transparent text-white placeholder-white";



  //---------------------------------------------------------------------
  //------------------------2 Début comportement   ----------------------
  //---------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("2.1.0 Front CrmUser-Form HandleSubmit debut");
    e.preventDefault();

    //-------------------------------------------------------------------
    // 2.1.1 ../.?/ CrmUser-Form => H.S.=> name/password ok ou No
    //-------------------------------------------------------------------
    console.log("2.1.2 ../.?/ FRONT CrmUser-Form => H.S. => crmUser-Pw OK/NO :")
    if (!username || !password || !confirmPassword) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log("2.1.3 ../../ FRONT CrmUser-Form => H.S. => crmUser-Pw ok ", { username, password, confirmPassword });
    

  
      const userToInsert = {
        nom_entreprise: "",
        personne_a_contacter: "",
        ville: "",
        code_postal: "",
        telephone: "",
        date_de_naissance: "",
        date_creation: new Date().toISOString().slice(0, 10), // format "YYYY-MM-DD"
        email: username, // Utilise la valeur saisie dans le champ Email
        mot_de_passe: password,
        username: "",
        status: "",
        domaine_activite: "",
        employeur: "",
        status_professionnel: "",
        adresse: "",
        imgUrl: "",
        btnUrlInt: "/formulaire/contact",
        btnUrlExt: "",
        btnTexte: "modification",
        btnModifUrl: "/admin/users",
      };


    //-------------------------------------------------------------------
    // 2.1.4 ../../.?/ CrmUser-Form => H.S. => crmUser-Pw ok => CrmUser-Ins
    //-------------------------------------------------------------------
    try {
          console.log("2.1.5 ../../.?/ Back CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins Ok/NO");
          const crmUserInsertionRes = await crmUserInsertion(userToInsert, password);

          //-------------------------------------------------------------------
          // 2.1.6 ../../.?/ FRONT CrmUser-Form => H.S. => crmUser-Pw ok => CrmUser-Ins NO OK
          if (!crmUserInsertionRes) {
            console.error("2.1.6 ../../../ FRONT CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins NO OK");
            alert("Une erreur est survenue lors de la création de votre compte.");
            //////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////
            //////////////          STOP 1        ////////////////////////////
            //////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////
            return;
          }  
         
        
          ///////////////////////////////////////////////////////////////////////
          // 2.2.7 ../../../ CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins OK
          ///////////////////////////////////////////////////////////////////////
          if (crmUserInsertionRes.success) {
            console.log("2.2.7 ../../../ FRONT CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins OK");
          

            //------------------------------------------------------------
            // 2.2.8 ../../../.?/ CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins => set Zust/coock  
            if (crmUserInsertionRes.user) {
              console.log("2.2.8 ../../../.?/ FRONT CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins => set Zust/coock");
              const userObj = Array.isArray(crmUserInsertionRes.user)
                ? crmUserInsertionRes.user[0]   // si c’est un tableau, on prend le premier élément
                : crmUserInsertionRes.user;     // sinon, c’est déjà un objet
            
                //------------------------------------------------------------
                // 2.2.9 ../../../ FRONT CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins => set Zust/coock  email = golliard73@g
                if (userObj.email === "golliard73@gmail.com") {
                  console.log(" 2.2.9 ../../../ FRONT CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins => set Zust/coock >golliard73@g");
                
                  setUserAdmin("jerome1872Troistorrents")

                  const myCookieData = {
                    userJerome: "jerome1872Troistorrents",
                    crmUserAdmin: "jerome1872Troistorrents",  
                    crmUserImgUrl: userObj.imgUrl,
                    crmUserAdminEmail: username,  
                    crmUserId: userObj.id           
                  };
                  Cookies.set('myData', JSON.stringify(myCookieData), { expires: 1, path: '/' });
                
                  //------------------------------------------------------------
                  // 2.2.10 ../../../ FRONT CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins => set Zust/coock  email = !golliard73@g
                }  else  if (crmUserInsertionRes.crm) {
                  console.log("2.2.10 ../../../ FRONT CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins => set Zust/coock  >!golliard73@g");
                
                  const crmObj = Array.isArray(crmUserInsertionRes.crm)
                    ? crmUserInsertionRes.crm[0]  
                    : crmUserInsertionRes.crm;     
                
                  setUserAdmin(crmObj.identification ?? "");
                
                  const myCookieData = {
                    userJerome: "false",
                    crmUserAdmin: "user2025Nethelvetic",  
                    crmUserImgUrl: userObj.imgUrl, 
                    crmUserAdminEmail: username, 
                    crmUserId: userObj.id           
                  };
                  Cookies.set('myData', JSON.stringify(myCookieData), { expires: 1, path: '/' });
                }
            }


            /////////////////////////////////////////////////////////////////////
            // 2.2.11 ../../../ FRONT CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins NO OK
            //////////////////////////////////////////////////////////////////////
          } else {
           console.log("2.2.11 ../../../ FRONT CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins NO OK");
           alert(crmUserInsertionRes.message);
         
           router.push("/formulaire/seConnecter");
           ///////////////////////////////////////////
           /////////    STOP              ////////////
           ///////////////////////////////////////////
           return;
         }

     //----------------------------------------------------------------------
     // 2.2.12 ../../.?/ CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins NO OK
    } catch (error) {
      console.error("2.2.12 ../../../ FRONT CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins NO OK");
      alert(`Erreur lors de la création du compte ${error}`);
      return;
    }

    //-------------------------------------------------------------------
    //    2.3.0  ../../../ F.H. => crmUser-Pw  => CrmUser-Ins=> send email
    //-------------------------------------------------------------------
    try {
      console.log("2.3.1 ../../.?/ BACK CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins => send email OK/NO");
      const result = await courrielInscription(username);
      if (result && result.success) {
        console.log("2.3.2 ../../../ BACK CrmUser-Form => H.S. => crmUser-Pw  => CrmUser-Ins => send email OK");

        // Redirection vers la page de gestion en cas de succès
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////          STOP 1        ////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        router.push("/gestion360/identifier")
        return;
        
      } else {
        console.log("2.3.3 ../../../ Front Back F.H. => crmUser-Pw  => CrmUser-Ins => email NO OK");
        alert("Identifiants incorrects.");
      }
    } catch (error) {
      console.error("2.3.4 ../../../ Front Back F.H. => crmUser-Pw  => CrmUser-Ins => email ERREUR");
      alert("Une erreur est survenue lors de l'envoi de l'email.");
    }
  };

  //---------------------------------------------------------------------
  //------------------------3 Début affichage   ---------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6">
      <CarteVImgTxtBgGN imageSrc="/ordinateurEmail.webp" title="S'inscrire">
        <form onSubmit={handleSubmit} className="space-y-4 p-4 mx-auto max-w-md">
          {/* Champ Email */}
          <div className="w-full">
            <label className="block text-sm md:text-xl font-medium text-left">
              Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(username)}`}
            />
          </div>
          {/* Champ Mot de passe */}
          <div className="w-full">
            <label className="block text-sm md:text-xl font-medium text-left">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(password)}`}
            />
          </div>
          {/* Champ Confirmation mot de passe */}
          <div className="w-full">
            <label className="block text-sm md:text-xl font-medium text-left">
              Confirmation mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(confirmPassword)}`}
            />
          </div>
          {/* Bouton "S'inscrire" */}
          <div className="w-full pt-3 pb-3">
            <ContBtnLgNoEffetBgG>
              <button type="submit" className="w-full h-full">
                S'inscrire
              </button>
            </ContBtnLgNoEffetBgG>
          </div>
        </form>
      </CarteVImgTxtBgGN>
    </div>
  );
};

export default FormCrmUserIns;
