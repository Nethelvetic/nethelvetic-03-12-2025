"use client";

import React, { useState, useRef } from "react";
import { createOneUser } from "../db/dbQuery-Users";
import ContainerBGN from "./cont-BgGN";
import ContBtnLgNoEffectBgG from "./cont-Btn-Lg-NoEffet-BgG";
import { useRouter } from "next/navigation";
// Note : Import de la Server Action pour Vercel Blob
import fileStoreVercelBlob from "../util/fileStoreVercelBlob"; 

type UserDataType = {
  nom_entreprise: string;
  personne_a_contacter: string;
  ville: string;
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
  btnTexte: string;
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
  imgUrl: "/singeCalculateur.webp", // Image par défaut
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

const FormAdminUserAdd: React.FC = () => {

  //---------------------------------------------------------------------
  //------------------------1 data dynamique ----------------------------
  //---------------------------------------------------------------------
  console.log("1.0.0 Front FormAdminUserAdd  Début");
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
  //------------------------2 Comportement ------------------------------
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  // 2.0.0 ../FormAdminUserAdd => handleClick (déclenche sur clique button)
  //---------------------------------------------------------------------
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("2.0.0 ../Front FormAdminUserAdd => handleClick debut");
    e.preventDefault();

  //------------------------------------------------------------
  // 2.0.1 ../.?/FormAdminUserAdd => handleClick => champs remplis OK ou NO OK
  console.log("1.0.1 ../.?/Front FormAdminUserAdd => H.C. => champs remplis ou NON");
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
      console.log("2.0.2 ../../Front FormAdminUserAdd => H.C. => champs NO OK");
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const dataToInsert = {
      nom_entreprise: unUserData.nom_entreprise,
      personne_a_contacter: unUserData.personne_a_contacter,
      ville: unUserData.ville,
      code_postal: unUserData.code_postal,
      telephone: unUserData.telephone ?? "",
      date_de_naissance: unUserData.date_de_naissance ?? "",
      date_creation: unUserData.date_creation,
      email: unUserData.email,
      mot_de_passe: unUserData.mot_de_passe ?? "",
      username: unUserData.username ?? "",
      status: unUserData.status ?? "",
      domaine_activite: unUserData.domaine_activite,
      employeur: unUserData.employeur ?? "",
      status_professionnel: unUserData.status_professionnel ?? "",
      adresse: unUserData.adresse,
      imgUrl: unUserData.imgUrl ?? "",
      btnUrlInt: "/formulaire/contact",
      btnUrlExt: "",
      btnTexte: "modification",
      btnModifUrl: "/admin/users"
    };

    //------------------------------------------------------------
    // 2.0.3 ../.?/FormAdminUserAdd => H.C. => champs OK => reatOneUser Ok ou NO
    try {
      console.log("2.0.3 ../../.?Back FormAdminUserAdd => H.C. => champs OK => creatOneUser Ok ou NO");
      const response = await createOneUser(dataToInsert);

      //------------------------------------------------------------
      // 2.0.4 ../.?/FormAdminUserAdd => handleClick => champs remplis OK => creatOneUser ok
      if (response.success) {
        console.log("2.0.4 ../../../../ Front FormAdminUserAdd => H.C. => champs OK => creatOneUser Ok => push admin/users");
        setUnUserData(initialUserData);
        /////////////////////////////////////////////////////////////////////
        //         STOP 1 => ADMIN/USERS
        ////////////////////////////////////////////////////////////////////
        router.push("/admin/users");
      }
    } catch (error) {
      console.error("2.0.5 ../../../../ Front FormAdminUserAdd => H.C. => champs OK => creatOneUser NO OK", error);
    }
  };


  //---------------------------------------------------------------------
  // 3.0.0 ../FormAdminUserAdd => handleImageUpload (uploader une image via Vercel Blob)
  //---------------------------------------------------------------------
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

  //---------------------------------------------------------------------
  // 3.0.1 ../.?/FormAdminUserAdd => handleImageUpload => select file
    console.log("3.0.1 ../.?/ Front FormAdminUserAdd => handleImageUpload => selec file Ok ou NO OK");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("3.0.2 ../../ Front FormAdminUserAdd => handleImageUpload => selec file Ok", file);

      //---------------------------------------------------------------------
      // 3.0.3 ../../.?/ FormAdminUserAdd => handleImageUpload => select file => store in Vercel
      try {
        console.log("3.0.3 ../../.?/ Back FormAdminUserAdd => handleImageUpload => selec file Ok => fileStoreVercelBlob ", file);
        const uploadedUrl = await fileStoreVercelBlob(file);
        console.log("3.0.4 ../../.?/ Back FormAdminUserAdd => handleImageUpload => selec file Ok => fileStoreVercelBlob OK: ", uploadedUrl);
        setUnUserData({ ...unUserData, imgUrl: uploadedUrl });
      } catch (error) {
        console.error("3.0.4 ../../.?/ Back FormAdminUserAdd => handleImageUpload => selec file Ok => fileStoreVercelBlob NO OK: ", error);
      }
    }
  };


  //---------------------------------------------------------------------
  //------------------------2 Affichage ---------------------------------
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
                      onChange={(e) => setUnUserData({ ...unUserData, email: e.target.value })}
                      className={`w-full border-b border-gray-300 shadow-sm font-bold text-2xl md:text-3xl ${getInputClass(unUserData.email)}`}
                    />
                  </h4>
                </div>

                {/* Ligne 1 : Nom de l'entreprise et Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm md:text-xl font-medium">Nom de l'entreprise</label>
                    <input
                      type="text"
                      value={unUserData.nom_entreprise}
                      onChange={(e) =>
                        setUnUserData({ ...unUserData, nom_entreprise: e.target.value })
                      }
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(unUserData.nom_entreprise)}`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm md:text-xl font-medium">Contact</label>
                    <input
                      type="text"
                      value={unUserData.personne_a_contacter}
                      onChange={(e) =>
                        setUnUserData({ ...unUserData, personne_a_contacter: e.target.value })
                      }
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(unUserData.personne_a_contacter)}`}
                    />
                  </div>
                </div>

                {/* Ligne 2 : Code postal et Ville */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm md:text-xl font-medium">Code postal</label>
                    <input
                      type="text"
                      value={unUserData.code_postal}
                      onChange={(e) =>
                        setUnUserData({ ...unUserData, code_postal: e.target.value })
                      }
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(unUserData.code_postal || "")}`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm md:text-xl font-medium">Ville</label>
                    <input
                      type="text"
                      value={unUserData.ville}
                      onChange={(e) =>
                        setUnUserData({ ...unUserData, ville: e.target.value })
                      }
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(unUserData.ville)}`}
                    />
                  </div>
                </div>

                {/* Ligne 3 : Adresse et Téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm md:text-xl font-medium">Adresse</label>
                    <input
                      type="text"
                      value={unUserData.adresse}
                      onChange={(e) =>
                        setUnUserData({ ...unUserData, adresse: e.target.value })
                      }
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(unUserData.adresse || "")}`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm md:text-xl font-medium">Téléphone</label>
                    <input
                      type="text"
                      value={unUserData.telephone}
                      onChange={(e) =>
                        setUnUserData({ ...unUserData, telephone: e.target.value })
                      }
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(unUserData.telephone || "")}`}
                    />
                  </div>
                </div>

                {/* Ligne 4 : Domaine d'activité (plein largeur) */}
                <div className="mt-4">
                  <label className="text-sm md:text-xl font-medium">Domaine d'activité</label>
                  <select
                    value={unUserData.domaine_activite}
                    onChange={(e) =>
                      setUnUserData({ ...unUserData, domaine_activite: e.target.value })
                    }
                    className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(unUserData.domaine_activite || "")}`}
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

                {/* Bouton */}
                <div className="w-full pt-3 pb-3 flex space-x-4">
                  <ContBtnLgNoEffectBgG >
                    <button type="submit">Creer</button>
                  </ContBtnLgNoEffectBgG >
                </div>
              </div>
            </div>
          </form>
        </div>
      </ContainerBGN>
    </div>
  );
};

export default FormAdminUserAdd;
