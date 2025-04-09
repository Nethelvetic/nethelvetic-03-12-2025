"use client";

import React, { useState, useEffect, useRef } from "react";
import { actualiserOneUser, suppOneUser, selectionOneUser, selectionUsers } from "../db/dbQuery-Users";
import ContainerBGN from "./cont-BgGN";
import ContainerBtnLgBgG from "./cont-Btn-Lg-BgG";
import { useParams, useRouter } from "next/navigation";
// Note : Import de la Server Action pour Vercel Blob
import fileStoreVercelBlob from "../util/fileStoreVercelBlob";

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
  statut?: string;
  domaine_activite?: string;
  employeur?: string;
  statut_professionnel?: string;
  adresse?: string;
  imgUrl?: string;
  btnUrlInt?: string;
  btnUrlExt?: string;
  btnTexte?: string;
  btnModifUrl: string;
  // Champs supplémentaires utilisés dans le formulaire
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
  statut: "",
  domaine_activite: "",
  employeur: "",
  statut_professionnel: "",
  adresse: "",
  imgUrl: "",
  btnUrlInt: "/formulaire/contact",
  btnUrlExt: "",
  btnTexte: "modification",
  btnModifUrl: "/admin/users",
  // Initialisation des champs additionnels si besoin
  date: "",
  titre: "",
  texte: "",
  prix: 0,
  heure: "",
  lieu: ""
};

const FormAdmUserModif: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 data dynamique ----------------------------
  //---------------------------------------------------------------------
  console.log("1.0 FormAdmUserModif Début ");
  const [unUserData, setUnUserData] = useState<UserDataType>(initialUserData);
  const { modif_id } = useParams();
  const router = useRouter();

  // Référence pour l'input file personnalisé
  const inputFileRef = useRef<HTMLInputElement>(null);

  // Fonction de style dynamique pour les inputs
  const getInputClass = (value: string) =>
    value
      ? "bg-gradient-to-l from-gray-800 to-black text-gray-300 placeholder-gray-400"
      : "bg-gradient-to-l from-gray-800 to-black text-white placeholder-white";

  // Conversion de modif_id en nombre
  const modifIdStr = Array.isArray(modif_id) ? modif_id[0] : modif_id;
  const modifId = modifIdStr ? parseInt(modifIdStr, 10) : NaN;

  //---------------------------------------------------------------------
  //------------------------2 comportement  -----------------------------
  //---------------------------------------------------------------------

  //------------------------------------------------------------------------
  // fonction qui se lance au démarrage pour trouver un user
  //------------------------------------------------------------------------
  useEffect(() => {
    console.log("2.1 FormAdmUserModif useEffect Début ");
    async function fetchUser() {
      console.log("2.2 FormAdmUserModif fetchUser Début ");
      if (isNaN(modifId)) {
        console.error("2.3 FormAdmUserModif fetchUser modif_id non valide :", modif_id);
        return;
      }
      const data = await selectionOneUser(modifId);
      console.log("2.4 FormAdmUserModif selectionOneUser après réponse data = ", data);
      if (data && data.length > 0) {
        const user = data[0];
        const fetchedUser: UserDataType = {
          nom_entreprise: user.nom_entreprise ?? "",
          personne_a_contacter: user.personne_a_contacter ?? "",
          ville: user.ville ?? "",
          code_postal: user.code_postal ?? "",
          telephone: user.telephone ?? "",
          date_de_naissance: user.date_de_naissance ?? "",
          date_creation: user.date_de_naissance ? user.date_de_naissance : "",
          email: user.email,
          mot_de_passe: user.mot_de_passe ?? "",
          username: user.username ?? "",
          statut: user.statut ?? "",
          domaine_activite: user.domaine_activite ?? "",
          employeur: user.employeur ?? "",
          statut_professionnel: user.statut_professionnel ?? "",
          adresse: user.adresse ?? "",
          imgUrl: user.imgUrl ?? "",
          btnUrlInt: "/formulaire/contact",
          btnUrlExt: "",
          btnTexte: "modification",
          btnModifUrl: "/admin/users",
        };
        setUnUserData(fetchedUser);
        console.log("2.5 FormAdmUserModif User :", user);
      } else {
        console.error("2.6 FormAdmUserModif aucun id  :", modifId);
      }
    }
    fetchUser();
  }, [modifId, modif_id]);

  
  //------------------------------------------------------------------------
  // fonction pour ajouter un user
  //------------------------------------------------------------------------
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("3  FormAdmUserModif handleClick debut");
    e.preventDefault();

    if (
      !unUserData.email ||
      !unUserData.nom_entreprise ||
      !unUserData.personne_a_contacter ||
      !unUserData.ville ||
      !unUserData.code_postal
    ) {
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
      statut: unUserData.statut ?? "",
      domaine_activite: unUserData.domaine_activite ?? "",
      employeur: unUserData.employeur ?? "",
      statut_professionnel: unUserData.statut_professionnel ?? "",
      adresse: unUserData.adresse ?? "",
      imgUrl: unUserData.imgUrl ?? "",
      btnUrlInt: "/formulaire/contact",
      btnUrlExt: "",
      btnTexte: "modification",
      btnModifUrl: "/admin/users"
    };

    try {
      console.log("3.1 FormAdmUserModif handleClick avant actualiserOneUser => dataToInsert:", dataToInsert);
      const response = await actualiserOneUser(modifId, dataToInsert);
      console.log("3.2 FormAdmUserModif handleClick après actualiserOneUser => réponse:", response);
      if (response.success) {
        setUnUserData(initialUserData);
        router.push("/admin/users");
      }
    } catch (error) {
      console.error("3.3 FormAdmUserModif handleClick actualiserOneUser erreur:", error);
    }
  };

  //------------------------------------------------------------------------
  // fonction pour supprimer un user
  //------------------------------------------------------------------------
  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
      try {
        console.log("3.4 FormAdmUserModif handleClick suppOneUser avec id :", modifId);
        const response = await suppOneUser(modifId);
        console.log("3.4 FormAdmUserModif handleClick suppOneUser avec réponse:", response);
        if (response.success) {
          router.push("/admin/users");
        }
      } catch (error) {
        console.error("3.4 FormAdmUserModif handleClick suppOneUser erreur:", error);
      }
    }
  };

  //------------------------------------------------------------------------
  // Ajout de la fonction handleImageUpload pour gérer la sélection d'une image
  // et appeler la Server Action fileStoreVercelBlob pour uploader l'image sur Vercel Blob
  //------------------------------------------------------------------------
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Uploading file:", file);
      try {
        // Note : Appel de la Server Action pour uploader l'image via Vercel Blob
        const uploadedUrl = await fileStoreVercelBlob(file);
        console.log("URL de l'image uploadée:", uploadedUrl);
        // Mise à jour de l'URL de l'image dans l'état
        setUnUserData({ ...unUserData, imgUrl: uploadedUrl });
      } catch (error) {
        console.error("Erreur lors de l'upload de l'image:", error);
      }
    }
  };

  //---------------------------------------------------------------------
  //------------------------3 affichage  --------------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6">
      <ContainerBGN>
        <div className="w-full">
          <form onSubmit={handleClick} className="space-y-4 p-4 w-full">
            <div className="flex flex-row items-start p-3">
              {/* Section Image */}
              <div className="w-full flex flex-col md:w-1/3 h-48 md:h-88 overflow-hidden">
                {/* Champ pour uploader l'image */}
                <div className="mt-2">
                  {/* Input caché */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={inputFileRef}
                    className="hidden"
                  />
                  {/* Bouton personnalisé */}
                  <button
                    type="button"
                    onClick={() => inputFileRef.current?.click()}
                    className="mt-1 block w-full border border-gray-300 shadow-sm px-4 py-2"
                  >
                    charger un fichier
                  </button>
                </div>
                <div className="w-full overflow-hidden mt-2">
                  <img
                    src={unUserData.imgUrl}
                    alt="Image uploadée"
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              {/* Section Autres champs (colonne de droite) */}
              <div className="w-full md:w-2/3 flex flex-col text-left pl-4 mt-4">
                {/* Email (inchangé) */}
                <div className="w-full flex flex-col mt-4">
                  <label className="block text-sm md:text-xl font-medium">Email</label>
                  <h4 className="font-bold text-2xl md:text-3xl">
                    <input
                      type="email"
                      value={unUserData.email}
                      onChange={(e) => setUnUserData({ ...unUserData, email: e.target.value })}
                      className="w-full border-b border-gray-300 shadow-sm font-bold text-2xl md:text-3xl"
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
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(unUserData.nom_entreprise ?? "")}`}
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
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(unUserData.personne_a_contacter ?? "")}`}
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
                      className={`w-full border-b border-gray-300 shadow-sm mt-2 ${getInputClass(unUserData.ville ?? "")}`}
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

                {/* Boutons */}
                <div className="w-full pt-3 pb-3 flex space-x-4">
                  <ContainerBtnLgBgG>
                    <button type="submit">Modifier</button>
                  </ContainerBtnLgBgG>
                  <ContainerBtnLgBgG>
                    <button type="button" onClick={handleDelete}>
                      Supprimer
                    </button>
                  </ContainerBtnLgBgG>
                </div>
              </div>
            </div>
          </form>
        </div>
      </ContainerBGN>
    </div>
  );
};

export default FormAdmUserModif;
