"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  crmUser_userUpdateOne,
  crmUser_userOneSelection,
  crmUser_userSupprimer
} from "../db/dbNeon-CrmUsers_user";
import ContainerBGN from "./cont-BgGN";
import ContBtnLgNoEffectBgG from "./cont-Btn-Lg-NoEffet-BgG";
import { useParams, useRouter } from "next/navigation";
// Note : Import de la Server Action pour Vercel Blob
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
  btnModifUrl: "gestion360/identifier",
  userId: 0,
};

const FormCrmUser_userModif: React.FC = () => {
  console.log("1.0.0 FRONT FormCrmUserModif Début ");

  //---------------------------------------------------------------------
  //------------------------1 data dynamique ----------------------------
  //---------------------------------------------------------------------
  const [unUserData, setUnUserData] = useState<UserDataType>(initialUserData);
  const { modif_id } = useParams();
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const modifIdStr = Array.isArray(modif_id) ? modif_id[0] : modif_id;
  const modifId = modifIdStr ? parseInt(modifIdStr, 10) : NaN;

  const getInputClass = (value: string) =>
    value
      ? "bg-gradient-to-l from-gray-800 to-black text-gray-300 placeholder-gray-400"
      : "bg-gradient-to-l from-gray-800 to-black text-white placeholder-white";


  //---------------------------------------------------------------------
  //------------------------2 data comportement -------------------------
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  //2.0.0  FormCrmUserModif => useEffect
  //---------------------------------------------------------------------
  useEffect(() => {
    console.log("2.0.1 ../ FRONT FormCrmUserModif => useEffect Début ");
    async function fetchUser() {
      if (isNaN(modifId)) {
        console.error("modifId invalide", modif_id);
        return;
      }

      //---------------------------------------------------------------------
      //2.0.2 FormCrmUserModif => useE => selectionOneCrmUser OK/NO
      console.log("2.0.2 ../.?/ BACK FormCrmUserModif => useE => selectionOneCrmUser OK/NO");
      const res = await crmUser_userOneSelection(modifIdStr!);

      //---------------------------------------------------------------------
      //2.0.3 FormCrmUserModif => useE => selectionOneCrmUser OK
      if (res.success && res.user) {
        console.log("2.0.2 ../../ FRONT FormCrmUserModif => useE => selectionOneCrmUser OK");
        const u = res.user;

        //---------------------------------------------------------------------
        //2.0.4 FormCrmUserModif => useE => selectionOneCrmUser OK => set useState
        console.log("2.0.4 ../../../ FRONT FormCrmUserModif => useE => selectionOneCrmUser OK => set useState");

        setUnUserData({
          nom_entreprise: u.nom_entreprise ?? "",
          personne_a_contacter: u.personne_a_contacter ?? "",
          ville: u.ville ?? "",
          code_postal: u.code_postal ?? "",
          telephone: u.telephone ?? "",
          date_de_naissance: u.date_de_naissance ?? "",
          date_creation: u.date_creation ?? "",
          email: u.email ?? "",
          username: u.username ?? "",
          status: u.status ?? "",
          domaine_activite: u.domaine_activite ?? "",
          employeur: u.employeur ?? "",
          status_professionnel: u.status_professionnel ?? "",
          adresse: u.adresse ?? "",
          imgUrl: u.imgUrl ?? initialUserData.imgUrl,
          btnUrlInt: u.btnUrlInt ?? initialUserData.btnUrlInt,
          btnUrlExt: u.btnUrlExt ?? initialUserData.btnUrlExt,
          btnTexte: u.btnTexte ?? initialUserData.btnTexte,
          btnModifUrl: u.btnModifUrl ?? initialUserData.btnModifUrl,
          userId: u.userId ?? initialUserData.userId ,
        });

      //---------------------------------------------------------------------
      //2.0.5 FormCrmUserModif => useE => selectionOneCrmUser NO OK
      } else {
        console.error("2.0.5 ../../ FRONT FormCrmUserModif => useE => selectionOneCrmUser NO OK");
      }
    }
    if (!modifIdStr) return;
    fetchUser();
  }, [modifIdStr, modifId]);


  //---------------------------------------------------------------------
  //2.1.0  FormCrmUserModif => handleClick
  //---------------------------------------------------------------------
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("2.1.0 ../ FRONT FormCrmUserModif => handleClick debut");

    e.preventDefault();
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
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const payload: UserDataType = {
      nom_entreprise: unUserData.nom_entreprise,
      personne_a_contacter: unUserData.personne_a_contacter,
      ville: unUserData.ville,
      code_postal: unUserData.code_postal,
      telephone: unUserData.telephone,
      date_de_naissance: unUserData.date_de_naissance,
      date_creation: unUserData.date_creation,
      email: unUserData.email,
      username: unUserData.username,
      status: unUserData.status,
      domaine_activite: unUserData.domaine_activite,
      employeur: unUserData.employeur,
      status_professionnel: unUserData.status_professionnel,
      adresse: unUserData.adresse,
      imgUrl: unUserData.imgUrl,
      btnUrlInt: unUserData.btnUrlInt,
      btnUrlExt: unUserData.btnUrlExt,
      btnTexte: unUserData.btnTexte,
      btnModifUrl: unUserData.btnModifUrl,
      userId: unUserData.userId,
    };

    //---------------------------------------------------------------------
   //2.1.1  ../.?/ FormCrmUserModif => H.C. =>  crmUse_userUpdate
    try {
      console.log("2.1.1 ../.?/ FRONT FormCrmUserModif => H.C. => crmUse_userUpdate OK/NO");
      const res = await crmUser_userUpdateOne(modifId, payload);

      if (res.success) {
        console.log("2.1.2 ../../ FRONT FormCrmUserModif => H.C. => crmUse_userUpdate OK => push /gestion360/identifier ");
        router.push("/gestion360/identifier");
      } else {
        alert("La modification a échoué, veuillez réessayer.");
      }
    } catch (error) {
      console.error("2.1.3 ../../ FRONT FormCrmUserModif => H.C. => crmUse_userUpdate NO OK", error);
      alert("La modification a échoué, veuillez réessayer.");
    }
  };


  //---------------------------------------------------------------------
  //2.2.0  FormCrmUserModif => handleDelete
  //---------------------------------------------------------------------
  const handleDelete = async () => {
    console.log("2.2.0 ../ FRONT FormCrmUserModif => handleDelete debut ");
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {

      //---------------------------------------------------------------------
      //2.2.1  ../.?/ FormCrmUserModif => H.D. => crmUser_userSupprimer
      console.log("2.2.1 ../.? BACK FormCrmUserModif => handleDelete debut => crmUser_userSupprimer OK/NO");
      try {
        const res = await crmUser_userSupprimer(modifId);
        if (res.success) {
          console.log("2.2.2 ../../ BACK FormCrmUserModif => handleDelete debut => crmUser_userSupprimer OK => push gestion360/identifier ");
          router.push("/gestion360/identifier");
        }
      } catch (error) {
        console.error("2.2.3 ../../ BACK FormCrmUserModif => handleDelete debut => crmUser_userSupprimer erreur", error);
        alert("La suppression a échoué, veuillez réessayer.");
      }
    }
  };


  //---------------------------------------------------------------------
  //2.2.0  FormCrmUserModif => handleImageUpload 
  //---------------------------------------------------------------------
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("2.1.2 ../../ FRONT FormCrmUserModif => handleImageUploadd debut ");
    if (e.target.files && e.target.files[0]) {
      try {
        const uploadedUrl = await fileStoreVercelBlob(e.target.files[0]);
        setUnUserData({ ...unUserData, imgUrl: uploadedUrl });
      } catch {
        alert("L’image n’a pas pu être sélectionnée, veuillez réessayer.");
      }
    }
  };



  //---------------------------------------------------------------------
  //------------------------1 data affichage ----------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6">
      <ContainerBGN>
        <div className="w-full">
          <form onSubmit={handleClick} className="space-y-4 p-4 w-full">
            <div className="flex flex-col md:flex-row items-start p-3">
              {/* Image */}
              <div className="w-3/4 md:w-1/3 mx-auto md:mx-0 flex flex-col h-48 md:h-104 overflow-hidden">
                <div className="w-full overflow-hidden mt-15">
                  <img
                    src={unUserData.imgUrl}
                    alt="Image uploadée"
                    className="object-contain w-full h-full"
                  />
                </div>
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
              {/* Champs */}
              <div className="w-full md:w-2/3 pl-0 md:pl-4 space-y-4">
                {/* Email */}
                <div>
                  <label className="font-medium">Email</label>
                  <input
                    type="email"
                    value={unUserData.email}
                    onChange={e =>
                      setUnUserData({ ...unUserData, email: e.target.value })
                    }
                    className={`w-full border-b ${getInputClass(
                      unUserData.email
                    )}`}
                  />
                </div>
                {/* Entreprise & Contact */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label>Nom de l'entreprise</label>
                    <input
                      value={unUserData.nom_entreprise}
                      onChange={e =>
                        setUnUserData({ ...unUserData, nom_entreprise: e.target.value })
                      }
                      className={`w-full border-b ${getInputClass(
                        unUserData.nom_entreprise
                      )}`}
                    />
                  </div>
                  <div>
                    <label>Contact</label>
                    <input
                      value={unUserData.personne_a_contacter}
                      onChange={e =>
                        setUnUserData({
                          ...unUserData,
                          personne_a_contacter: e.target.value,
                        })
                      }
                      className={`w-full border-b ${getInputClass(
                        unUserData.personne_a_contacter
                      )}`}
                    />
                  </div>
                </div>
                {/* Code postal & Ville */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label>Code postal</label>
                    <input
                      value={unUserData.code_postal}
                      onChange={e =>
                        setUnUserData({ ...unUserData, code_postal: e.target.value })
                      }
                      className={`w-full border-b ${getInputClass(
                        unUserData.code_postal
                      )}`}
                    />
                  </div>
                  <div>
                    <label>Ville</label>
                    <input
                      value={unUserData.ville}
                      onChange={e =>
                        setUnUserData({ ...unUserData, ville: e.target.value })
                      }
                      className={`w-full border-b ${getInputClass(unUserData.ville)}`}
                    />
                  </div>
                </div>
                {/* Adresse & Téléphone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label>Adresse</label>
                    <input
                      value={unUserData.adresse}
                      onChange={e =>
                        setUnUserData({ ...unUserData, adresse: e.target.value })
                      }
                      className={`w-full border-b ${getInputClass(unUserData.adresse)}`}
                    />
                  </div>
                  <div>
                    <label>Téléphone</label>
                    <input
                      value={unUserData.telephone}
                      onChange={e =>
                        setUnUserData({ ...unUserData, telephone: e.target.value })
                      }
                      className={`w-full border-b ${getInputClass(
                        unUserData.telephone
                      )}`}
                    />
                  </div>
                </div>
                {/* Domaine d'activité */}
                <div>
                  <label>Domaine d'activité</label>
                  <select
                    value={unUserData.domaine_activite}
                    onChange={e =>
                      setUnUserData({
                        ...unUserData,
                        domaine_activite: e.target.value,
                      })
                    }
                    className={`w-full border-b ${getInputClass(
                      unUserData.domaine_activite
                    )}`}
                  >
                    <option value="">Sélectionnez un domaine</option>
                    <option value="Administration publique">
                      Administration publique
                    </option>
                    <option value="Art, Design, culture, mode">
                      Art, Design, culture, mode
                    </option>
                    <option value="Banques, assurances">Banques, assurances</option>
                    <option value="Formation, social">Formation, social</option>
                    <option value="Industrie">Industrie</option>
                    <option value="Management, compta, RH">
                      Management, compta, RH
                    </option>
                    <option value="Média, informatique, communication">
                      Média, informatique, communication
                    </option>
                    <option value="Vente, commerce">Vente, commerce</option>
                    <option value="Hôtellerie, alimentation, tourisme">
                      Hôtellerie, alimentation, tourisme
                    </option>
                    <option value="Nature, environnement">
                      Nature, environnement
                    </option>
                    <option value="Santé, bien-être">Santé, bien-être</option>
                    <option value="Sport">Sport</option>
                    <option value="Transports, véhicules">
                      Transports, véhicules
                    </option>
                  </select>
                </div>
                {/* Boutons */}
                <div className="flex space-x-4 pt-4">
                  <ContBtnLgNoEffectBgG>
                    <button type="submit">Modifier</button>
                  </ContBtnLgNoEffectBgG>
                  <ContBtnLgNoEffectBgG>
                    <button type="button" onClick={handleDelete}>
                      Supprimer
                    </button>
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

export default FormCrmUser_userModif;
