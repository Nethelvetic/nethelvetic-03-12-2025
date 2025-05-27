"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { crmUser_userUpdateOne, crmUser_userSupprimer } from "../db/dbNeon-CrmUsers_user";
import ContainerBGN from "./cont-BgGN";
import ContBtnLgNoEffectBgG from "./cont-Btn-Lg-NoEffet-BgG";
import fileStoreVercelBlob from "../util/fileStoreVercelBlob";

interface UserDataType {
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
}


interface CrmUserUserProps {
  userData: UserDataType;
  setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
}

const CrmUser_user: React.FC<CrmUserUserProps> = ({ userData, setUserData }) => {
  //---------------------------------------------------------------------
  //------------------------1 data dynamique ----------------------------
  //---------------------------------------------------------------------
  const unUserData = userData;
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const userIdNumber = unUserData.userId;
  const getInputClass = (value: string) =>
    value
      ? "bg-gradient-to-l from-gray-800 to-black text-gray-300 placeholder-gray-400"
      : "bg-gradient-to-l from-gray-800 to-black text-white placeholder-white";

  //---------------------------------------------------------------------
  //2.1.0  CrmUser_user => handleClick
  //---------------------------------------------------------------------
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const payload: UserDataType = { ...unUserData };

    try {
      const res = await crmUser_userUpdateOne(userIdNumber, payload);
      if (res.success) {
        router.push("/gestion360/identifier");
      } else {
        alert("La modification a échoué, veuillez réessayer.");
      }
    } catch (error) {
      alert("La modification a échoué, veuillez réessayer.");
    }
  };

  //---------------------------------------------------------------------
  //2.2.0  CrmUser_user => handleDelete
  //---------------------------------------------------------------------
  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        const res = await crmUser_userSupprimer(userIdNumber);
        if (res.success) {
          router.push("/gestion360/identifier");
        }
      } catch (error) {
        alert("La suppression a échoué, veuillez réessayer.");
      }
    }
  };

  //---------------------------------------------------------------------
  //2.3.0  CrmUser_user => handleImageUpload
  //---------------------------------------------------------------------
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const uploadedUrl = await fileStoreVercelBlob(e.target.files[0]);
        setUserData({ ...unUserData, imgUrl: uploadedUrl });
      } catch {
        alert("L’image n’a pas pu être sélectionnée, veuillez réessayer.");
      }
    }
  };

  //---------------------------------------------------------------------
  //------------------------2 Affichage --------------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6 space-y-6">
      <ContainerBGN>
        <div className="w-full">
          <form onSubmit={handleClick} className="space-y-4 p-4 w-full">
            <div className="flex flex-col md:flex-row items-start p-3">
              {/* Image */}
              <div className="w-full md:w-1/3 mx-auto md:mx-0 flex flex-col h-80 md:h-104 overflow-hidden">
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
                  <ContBtnLgNoEffectBgG>
                    <button
                      type="button"
                      onClick={() => inputFileRef.current?.click()}
                    >
                      Charger une image
                    </button>
                  </ContBtnLgNoEffectBgG>
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
                      setUserData({ ...unUserData, email: e.target.value })
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
                        setUserData({ ...unUserData, nom_entreprise: e.target.value })
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
                        setUserData({
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
                        setUserData({ ...unUserData, code_postal: e.target.value })
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
                        setUserData({ ...unUserData, ville: e.target.value })
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
                        setUserData({ ...unUserData, adresse: e.target.value })
                      }
                      className={`w-full border-b ${getInputClass(unUserData.adresse)}`}
                    />
                  </div>
                  <div>
                    <label>Téléphone</label>
                    <input
                      value={unUserData.telephone}
                      onChange={e =>
                        setUserData({ ...unUserData, telephone: e.target.value })
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
                      setUserData({
                        ...unUserData,
                        domaine_activite: e.target.value,
                      })
                    }
                    className={`w-full border-b ${getInputClass(
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

export default CrmUser_user;

