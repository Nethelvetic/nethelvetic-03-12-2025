"use client";

import React, { useState, useRef, useEffect } from "react";
import { userSelectOne, userUpdateOne } from "../db/dbQuery-Users";
import ContainerBGN from "./cont-BgGN";
import ContBtnLgNoEffectBgG from "./cont-Btn-Lg-NoEffet-BgG";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import fileStoreVercelBlob from "../util/fileStoreVercelBlob";

type UserDataType = {
  nom_entreprise: string;
  personne_a_contacter: string;
  ville: string;
  code_postal: string;
  telephone: string;
  date_de_naissance: string;
  date_creation: string;
  email: string;
  username: string;
  status: string;
  domaine_activite: string;
  employeur: string;
  status_professionnel: string;
  adresse: string;
  imgUrl: string;
  btnUrlInt: string;
  btnUrlExt: string;
  btnTexte: string;
  btnModifUrl: string;
  userId: number;
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
  username: "",
  status: "",
  domaine_activite: "",
  employeur: "",
  status_professionnel: "",
  adresse: "",
  imgUrl: "/singeCalculateur.webp",
  btnUrlInt: "/formulaire/contact",
  btnUrlExt: "",
  btnTexte: "modification",
  btnModifUrl: "",
  userId: 0,
};

const FormCrmUserCompteInfoPerso: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 data dynamique ----------------------------
  //---------------------------------------------------------------------
  console.log("1.0.0 Front FormCrmUserCompte  Début");
  const [unUserData, setUnUserData] = useState<UserDataType>(initialUserData);
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);

  //------------------------------------------------------------
  //    1.0.1 background du formulaire
  const getInputClass = (value: string) =>
    value
      ? "bg-gradient-to-l from-gray-800 to-black text-gray-300 placeholder-gray-400"
      : "bg-gradient-to-l from-gray-800 to-black text-white placeholder-white";

  //---------------------------------------------------------------------
  //------------------------useEffect chargement user -------------------
  //---------------------------------------------------------------------
  useEffect(() => {
    console.log("1.1.0 Front FormCrmUserCompte useEffect Début");
    async function fetchUserData() {
      //-----------------------------------------------------------------
      // 1.1.1 get Cookies
      //-----------------------------------------------------------------
      console.log("1.1.1 Front FormCrmUserCompte useEffect => get Cookies");
      const cookieStr = Cookies.get("myData");
      const cookieData = cookieStr ? JSON.parse(cookieStr) : undefined;
      const userId = cookieData?.userId;
      console.log("1.1.2 Front FormCrmUserCompte useEffect => cookieData =", cookieData);

      if (!userId) {
        console.log("1.1.3 Front FormCrmUserCompte useEffect => userId invalide, arrêt");
        return;
      }

      //-----------------------------------------------------------------
      // 1.1.4 appel userSelectOne
      //-----------------------------------------------------------------
      console.log("1.1.4 Front FormCrmUserCompte useEffect => userSelectOne(", userId, ")");
      try {
        const userSelectOneRes = await userSelectOne(userId);
        console.log("1.1.5 Front FormCrmUserCompte useEffect => userSelectOneRes =", userSelectOneRes);

        if (userSelectOneRes.success && userSelectOneRes.user) {
          const u = userSelectOneRes.user;
          //-----------------------------------------------------------------
          // 1.1.6 setUnUserData avec coalescence des null en ""
          //-----------------------------------------------------------------
          setUnUserData({
            nom_entreprise:        u.nom_entreprise        ?? "",
            personne_a_contacter:  u.personne_a_contacter  ?? "",
            ville:                 u.ville                 ?? "",
            code_postal:           u.code_postal           ?? "",
            telephone:             u.telephone             ?? "",
            date_de_naissance:     u.date_de_naissance     ?? "",
            date_creation:         u.date_creation         ?? "",
            email:                 u.email                 ?? "",
            username:              u.username              ?? "",
            status:                u.status                ?? "",
            domaine_activite:      u.domaine_activite      ?? "",
            employeur:             u.employeur             ?? "",
            status_professionnel:  u.status_professionnel  ?? "",
            adresse:               u.adresse               ?? "",
            imgUrl:                u.imgUrl                ?? initialUserData.imgUrl,
            btnUrlInt:             u.btnUrlInt             ?? initialUserData.btnUrlInt,
            btnUrlExt:             u.btnUrlExt             ?? initialUserData.btnUrlExt,
            btnTexte:              u.btnTexte              ?? initialUserData.btnTexte,
            btnModifUrl:           u.btnModifUrl           ?? initialUserData.btnModifUrl,
            userId:                userId,
          });
          console.log("1.1.7 Front FormCrmUserCompte useEffect => setUnUserData OK");
        } else {
          console.error("1.1.8 Front FormCrmUserCompte useEffect => userSelectOneRes NO OK");
        }
      } catch (err) {
        console.error("1.1.9 Front FormCrmUserCompte useEffect => erreur userSelectOne", err);
      }
    }

    fetchUserData();
  }, []);

  //---------------------------------------------------------------------
  //------------------------2 Comportement handleClick ------------------
  //---------------------------------------------------------------------
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("2.0.0 ../Front FormCrmUserCompte  => handleClick debut");
    e.preventDefault();

    //------------------------------------------------------------
    // 2.0.1 champsUser OK/NO
    //------------------------------------------------------------
    console.log("2.0.1 ../.?/ Front FormCrmUserCompte  => H.C. => champsUser OK/NO");
    if (
      !unUserData.email ||
      !unUserData.nom_entreprise ||
      !unUserData.personne_a_contacter ||
      !unUserData.ville ||
      !unUserData.code_postal ||
      !unUserData.adresse ||
      !unUserData.telephone ||
      !unUserData.domaine_activite
    ) {
      console.log("2.0.2 ../.?/ Front FormCrmUserCompte => H.C. => champsUser NO OK");
      alert("Veuillez remplir tous les champs.");
      return;
    }

    //------------------------------------------------------------
    // 2.0.3 get Cookies
    //------------------------------------------------------------
    console.log("2.0.3 ../../FRONT FormCrmUserCompte => H.C. => get Cookies");
    const cookieStr = Cookies.get("myData");
    const cookieData = cookieStr ? JSON.parse(cookieStr) : undefined;
    const userIdFromCookie = cookieData?.userId ?? 0;
    console.log("2.0.4 ../../FRONT FormCrmUserCompte => H.C. => get Cookies =", cookieData);

    //------------------------------------------------------------
    // 2.0.5 préparer dataToInsert
    //------------------------------------------------------------
    const dataToInsert = {
      nom_entreprise:          unUserData.nom_entreprise,
      personne_a_contacter:    unUserData.personne_a_contacter,
      ville:                   unUserData.ville,
      code_postal:             unUserData.code_postal,
      telephone:               unUserData.telephone,
      date_de_naissance:       unUserData.date_de_naissance,
      date_creation:           unUserData.date_creation,
      email:                   unUserData.email,
      username:                unUserData.username,
      status:                  unUserData.status,
      domaine_activite:        unUserData.domaine_activite,
      employeur:               unUserData.employeur,
      status_professionnel:    unUserData.status_professionnel,
      adresse:                 unUserData.adresse,
      imgUrl:                  unUserData.imgUrl,
      btnUrlInt:               unUserData.btnUrlInt,
      btnUrlExt:               unUserData.btnUrlExt,
      btnTexte:                unUserData.btnTexte,
      btnModifUrl:             "/gestion360/identifier",
      userId:                  userIdFromCookie,
    };

    //------------------------------------------------------------
    // 2.0.6 appel userUpdateOne
    //------------------------------------------------------------
    console.log("2.0.5 ../../../BACK FormCrmUserCompte => H.C. => userData => userUpdateOne OK/NO");
    try {
      const crmUserUpdateRes = await userUpdateOne(userIdFromCookie, dataToInsert);

      //------------------------------------------------------------
      // 2.0.6 update OK
      //------------------------------------------------------------
      if (crmUserUpdateRes.success) {
        console.log("2.0.6 ../../../FRONT FormCrmUserCompte => H.C. => userUpdateOne OK");
        setUnUserData(initialUserData);
        router.push("/gestion360/identifier");
      } else {
        console.error("2.0.7 ../../../FRONT FormCrmUserCompte => H.C. => userUpdateOne NO OK", crmUserUpdateRes.message);
        alert("La modification a échoué : " + crmUserUpdateRes.message);
      }
    } catch (error) {
      console.error("2.0.8 ../../../FRONT FormCrmUserCompte => H.C. => userUpdateOne erreur", error);
      alert("Une erreur est survenue, veuillez réessayer.");
    }
  };

  //---------------------------------------------------------------------
  // 3.0.0 handleImageUpload
  //---------------------------------------------------------------------
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("3.0.1 Front FormCrmUserCompte => handleImageUpload debut");
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      try {
        console.log("3.0.2 Front FormCrmUserCompte => upload via Vercel Blob", file);
        const uploadedUrl = await fileStoreVercelBlob(file);
        console.log("3.0.3 Front FormCrmUserCompte => upload OK", uploadedUrl);
        setUnUserData({ ...unUserData, imgUrl: uploadedUrl });
      } catch (err) {
        console.error("3.0.4 Front FormCrmUserCompte => upload error", err);
        alert("L’image n’a pas pu être sélectionnée.");
      }
    }
  };

  //---------------------------------------------------------------------
  //------------------------4 Affichage du formulaire -------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6">
      <ContainerBGN>
        <div className="w-full">
          <form onSubmit={handleClick} className="space-y-4 p-4 w-full">
            <div className="flex flex-row items-start p-3">
              {/* Section Image */}
              <div className="w-full flex flex-col md:w-1/3 h-48 md:h-104 overflow-hidden">
                <div className="w-full overflow-hidden mt-15">
                  <img
                    src={unUserData.imgUrl}
                    alt="Image uploadée"
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* Champ pour uploader l'image */}
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={inputFileRef}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => inputFileRef.current?.click()}
                    className="mt-1 block w-full border border-gray-300 shadow-sm px-4 py-2"
                  >
                    Charger une image
                  </button>
                </div>
              </div>

              {/* Section Autres champs (colonne de droite) */}
              <div className="w-full md:w-2/3 flex flex-col text-left pl-4 mt-4">
                {/* Email */}
                <div className="w-full flex flex-col mt-4">
                  <label className="block text-sm md:text-xl font-medium">Email</label>
                  <h4 className="font-bold text-2xl md:text-3xl">
                    <input
                      type="email"
                      value={unUserData.email}
                      onChange={(e) =>
                        setUnUserData({ ...unUserData, email: e.target.value })
                      }
                      className={`w-full border-b border-gray-300 shadow-sm font-bold text-2xl md:text-3xl ${getInputClass(
                        unUserData.email
                      )}`}
                    />
                  </h4>
                </div>

                {/* Ligne 1 : Nom de l'entreprise et Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm md:text-xl font-medium">
                      Nom de l'entreprise
                    </label>
                    <input
                      type="text"
                      value={unUserData.nom_entreprise}
                      onChange={(e) =>
                        setUnUserData({ ...unUserData, nom_entreprise: e.target.value })
                      }
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(
                        unUserData.nom_entreprise
                      )}`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm md:text-xl font-medium">
                      Contact
                    </label>
                    <input
                      type="text"
                      value={unUserData.personne_a_contacter}
                      onChange={(e) =>
                        setUnUserData({ ...unUserData, personne_a_contacter: e.target.value })
                      }
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(
                        unUserData.personne_a_contacter
                      )}`}
                    />
                  </div>
                </div>

                {/* Ligne 2 : Code postal et Ville */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm md:text-xl font-medium">
                      Code postal
                    </label>
                    <input
                      type="text"
                      value={unUserData.code_postal}
                      onChange={(e) =>
                        setUnUserData({ ...unUserData, code_postal: e.target.value })
                      }
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(
                        unUserData.code_postal
                      )}`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm md:text-xl font-medium">
                      Ville
                    </label>
                    <input
                      type="text"
                      value={unUserData.ville}
                      onChange={(e) =>
                        setUnUserData({ ...unUserData, ville: e.target.value })
                      }
                      className={`w-full border-b border-gray-300 shadow 
-sm mt-2 ${getInputClass(unUserData.ville)}`}
                    />
                  </div>
                </div>

                {/* Ligne 3 : Adresse et Téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm md:text-xl font-medium">
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={unUserData.adresse}
                      onChange={(e) =>
                        setUnUserData({ ...unUserData, adresse: e.target.value })
                      }
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(
                        unUserData.adresse
                      )}`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm md:text-xl font-medium">
                      Téléphone
                    </label>
                    <input
                      type="text"
                      value={unUserData.telephone}
                      onChange={(e) =>
                        setUnUserData({ ...unUserData, telephone: e.target.value })
                      }
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(
                        unUserData.telephone
                      )}`}
                    />
                  </div>
                </div>

                {/* Ligne 4 : Domaine d'activité */}
                <div className="mt-4">
                  <label className="text-sm md:text-xl font-medium">
                    Domaine d'activité
                  </label>
                  <select
                    value={unUserData.domaine_activite}
                    onChange={(e) =>
                      setUnUserData({ ...unUserData, domaine_activite: e.target.value })
                    }
                    className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(
                      unUserData.domaine_activite
                    )}`}
                  >
                    <option value="">Sélectionnez un domaine</option>
                    <option value="Administration publique">Administration publique</option>
                    <option value="Art, Design, culture, mode">Art, Design, culture, mode</option>
                    <option value="Banques, assurances">Banques, assurances</option>
                    <option value="Formation, social">Formation, social</option>
                    <option value="Industrie">Industrie</option>
                    <option value="Management, compta, RH">Management, compta, RH</option>
                    <option value="Média, informatique, communication">Média, informatique, communication</option>
                    <option value="Vente, commerce">Vente, commerce</option>
                    <option value="Hôtellerie, alimentation, tourisme">Hôtellerie, alimentation, tourisme</option>
                    <option value="Nature, environnement">Nature, environnement</option>
                    <option value="Santé, bien-être">Santé, bien-être</option>
                    <option value="Sport">Sport</option>
                    <option value="Transports, véhicules">Transports, véhicules</option>
                  </select>
                </div>

                {/* Bouton Modifier */}
                <div className="w-full pt-3 pb-3 flex space-x-4">
                  <ContBtnLgNoEffectBgG>
                    <button type="submit">Modifier</button>
                  </ContBtnLgNoEffectBgG>
                </div>
              </div>
            </div>
          </form>
        </div>
      </ContainerBGN>
    </div>
  );
};

export default FormCrmUserCompteInfoPerso;
