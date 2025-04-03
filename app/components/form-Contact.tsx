"use client";

import React, { useState } from "react";
import ContainerBGN from "./cont-BgGN";
import ContBtnLgBgG from "./cont-Btn-Lg-BgG";
import { useRouter } from "next/navigation";
import { createOneUser } from "../db/dbQuery-Users";
import { createOneMessage } from "../db/dbQuery-Message";
import CarteVImgTxtBgGN from "./cart-V-Img-Txt-BgGN";

//------------------------1 Début format typage table USER
type UserDataType = {
  nom_entreprise: string;             
  personne_a_contacter: string;        
  ville: string;                       
  code_postal: string;
  telephone: string;                  
  date_de_naissance: string;          
  date_creation: string;               
  email: string;                           
  mot_de_passe: string;                
  username: string;                    
  statut: string;                      
  domaine_activite: string;            
  employeur: string;                   
  statut_professionnel: string;        
  adresse: string;                     
  imgUrl: string;                      
  btnUrlInt: string;                   
  btnUrlExt: string;                   
  btnTexte: string;                    
  btnModifUrl: string;                 
  message: string;
};

//------------------------3 Début format date dd/mm/yyyy
const today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0");
const yyyy = today.getFullYear();
const defaultDate = `${yyyy}-${mm}-${dd}`;

const initialUserData: UserDataType = {
  nom_entreprise: "",
  personne_a_contacter: "",
  ville: "",
  code_postal: "",
  telephone: "",
  date_de_naissance: "",
  date_creation: defaultDate, // insertion de defaultDate
  email: "",
  mot_de_passe: "",
  username: "",
  statut: "",
  domaine_activite: "",
  employeur: "",
  statut_professionnel: "",
  adresse: "",
  imgUrl: "/singeCalculateur.webp",
  btnUrlInt: "/formulaire/contact",
  btnUrlExt: "",
  btnTexte: "modification",
  btnModifUrl: "/admin/users",
  message: ""
};

//------------------------2 Début format typage table MESSAGE
type MessageDataType = {
  email: string;
  nom_entreprise: string;            
  personne_a_contacter: string;       
  ville: string;                      
  code_postal: string;                
  message: string;
  userId: number;
  date: string;
};

const initialMessageData: MessageDataType = {
  email: "",
  nom_entreprise: "",
  personne_a_contacter: "",
  ville: "",
  code_postal: "",
  message: "",
  userId: 0,
  date: defaultDate // insertion de defaultDate
};

const FormContact: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique ----------------------
  //---------------------------------------------------------------------
  const [userData, setUserData] = useState<UserDataType>(initialUserData);
  const [messageData, setMessageData] = useState<MessageDataType>(initialMessageData);
  const router = useRouter();

  // Fonction pour déterminer la classe CSS selon que le champ soit vide ou non
  const getInputClass = (value: string) =>
    value ? "bg-gray-800 text-gray-300 placeholder-gray-400" : "bg-transparent text-white placeholder-white";

  //---------------------------------------------------------------------
  //------------------------2 Début comportement ------------------------
  //---------------------------------------------------------------------
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("2.0 handleClick début");
    e.preventDefault();

    if (
      !userData.email ||
      !userData.nom_entreprise ||
      !userData.personne_a_contacter ||
      !userData.ville ||
      !userData.code_postal ||
      !userData.message
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      console.log("2.1 handleClick erreur : tous les champs obligatoires");
      return;
    }

    try {
      // Insérer un user dans userTable
      console.log("2.2 await createOneUser avant => userData:", userData);
      const userResponse = await createOneUser(userData);
      console.log("2.3 await createOneUser après => réponse", userResponse);

      if (userResponse.success) {
        // Récupérer l'id de l'utilisateur inséré et l'intégrer dans messageData
        const userId = userResponse.id;
        const messageDataWithUserId = { ...messageData, userId };

        console.log("2.4 await createOneMessage avant => messageDataWithUserId:", messageDataWithUserId);
        const messageResponse = await createOneMessage(messageDataWithUserId);
        console.log("2.5 await createOneMessage après => messageRéponse:", messageResponse);

        if (messageResponse.success) {
          console.log("2.6 messageResponse.success");
          setMessageData(initialMessageData);
          router.push("/");
        } else {
          console.log("2.7 messageResponse.message: ", messageResponse.message);
          alert(messageResponse.message);
        }
      } else {
        console.log("2.8 userResponse.message: ", userResponse.message);
        alert(userResponse.message);
      }
    } catch (error) {
      console.error("2.9 await createOneUser après => erreur :", error);
    }
  };

  //---------------------------------------------------------------------
  //------------------------3 Début affichage ---------------------------
  //--------------------------------------------------------------------
  return (
    <div className="p-6">
      <CarteVImgTxtBgGN imageSrc="/ordinateur3Bg.png" title="">
        <div className="w-full"> 
          <form onSubmit={handleClick} className="space-y-4 p-4 max-w-md mx-auto">
            {/* Champ Email */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Email</label>
              <input
                type="email"
                value={messageData.email}
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                  setMessageData({ ...messageData, email: e.target.value });
                }}
                className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(messageData.email)}`}
              />
            </div>

            {/* Champ Nom d'entreprise */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Nom d'entreprise</label>
              <input
                type="text"
                value={messageData.nom_entreprise}
                onChange={(e) => {
                  setUserData({ ...userData, nom_entreprise: e.target.value });
                  setMessageData({ ...messageData, nom_entreprise: e.target.value });
                }}
                className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(messageData.nom_entreprise)}`}
              />
            </div>

            {/* Champ Personne à contacter */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Personne à contacter</label>
              <input
                type="text"
                value={messageData.personne_a_contacter}
                onChange={(e) => {
                  setUserData({ ...userData, personne_a_contacter: e.target.value });
                  setMessageData({ ...messageData, personne_a_contacter: e.target.value });
                }}
                className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(messageData.personne_a_contacter)}`}
              />
            </div>

            {/* Champs Ville et Code Postal sur la même ligne */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <label className="block text-sm md:text-xl font-medium">Code Postal</label>
                <input
                  type="text"
                  value={messageData.code_postal}
                  onChange={(e) => {
                    setUserData({ ...userData, code_postal: e.target.value });
                    setMessageData({ ...messageData, code_postal: e.target.value });
                  }}
                  className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(messageData.code_postal)}`}
                />
              </div>
              <div className="w-full md:w-2/3">
                <label className="block text-sm md:text-xl font-medium">Ville</label>
                <input
                  type="text"
                  value={messageData.ville}
                  onChange={(e) => {
                    setUserData({ ...userData, ville: e.target.value });
                    setMessageData({ ...messageData, ville: e.target.value });
                  }}
                  className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(messageData.ville)}`}
                />
              </div>
            </div>

            {/* Champ Message */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Message</label>
              <textarea
                rows={4}
                value={messageData.message}
                onChange={(e) => {
                  setUserData({ ...userData, message: e.target.value });
                  setMessageData({ ...messageData, message: e.target.value });
                }}
                className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(messageData.message)}`}
              ></textarea>
            </div>

            {/* Bouton de soumission */}
            <div className="w-full pt-3 pb-3">
              <ContBtnLgBgG>
                <button type="submit" className="w-full h-full">
                  Envoyer
                </button>
              </ContBtnLgBgG>
            </div>
          </form>
        </div>
      </CarteVImgTxtBgGN>
    </div>
  );
};

export default FormContact;
