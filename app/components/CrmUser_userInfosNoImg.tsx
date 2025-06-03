"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { crmUser_userUpdateOne, crmUser_userSupprimer } from "../db/dbNeon-CrmUsers_user";
import ContainerBGN from "./cont-BgGN";
import ContBtnLgNoEffectBgG from "./cont-Btn-Lg-NoEffet-BgG";
import CrmUser_userInfosSimple from "./crmUser_userInfosSimple";
import CrmUser_userInfos_Modif from "./CrmUser_userInfos_Modif";

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


interface CrmUserUserInfosProps {
  userData: UserDataType;
  setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
}

const CrmUser_userInfosNoImg: React.FC<CrmUserUserInfosProps> = ({ userData, setUserData }) => {
  //---------------------------------------------------------------------
  //------------------------1 data dynamique ----------------------------
  //---------------------------------------------------------------------
  const unUserData = userData;
  const router = useRouter();
  const [showModif, setShowModif] = useState(false);
  const userIdNumber = unUserData.userId;
  const getInputClass = (value: string) =>
    value
      ? "bg-gradient-to-l from-gray-800 to-black text-gray-300 placeholder-gray-400"
      : "bg-gradient-to-l from-gray-800 to-black text-white placeholder-white";

  const cardData = {
    id: unUserData.userId,
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
  //------------------------2 Affichage --------------------------------
  //---------------------------------------------------------------------
  if (showModif) {
    return <CrmUser_userInfos_Modif />;
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">

      <ContainerBGN>
        <div className="w-full">
          <form className="space-y-4 p-4 w-full">
            <div className="flex flex-col md:flex-row items-start p-3">
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
                {/* Date de naissance & Date de création */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label>Date de naissance</label>
                    <input
                      type="date"
                      value={unUserData.date_de_naissance}
                      onChange={e =>
                        setUserData({ ...unUserData, date_de_naissance: e.target.value })
                      }
                      className={`w-full border-b ${getInputClass(unUserData.date_de_naissance)}`}
                    />
                  </div>
                  <div>
                    <label>Date de création</label>
                    <input
                      type="date"
                      value={unUserData.date_creation}
                      onChange={e =>
                        setUserData({ ...unUserData, date_creation: e.target.value })
                      }
                      className={`w-full border-b ${getInputClass(unUserData.date_creation)}`}
                    />
                  </div>
                </div>
                {/* Username & Status */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label>Username</label>
                    <input
                      value={unUserData.username}
                      onChange={e =>
                        setUserData({ ...unUserData, username: e.target.value })
                      }
                      className={`w-full border-b ${getInputClass(unUserData.username)}`}
                    />
                  </div>
                  <div>
                    <label>Status</label>
                    <input
                      value={unUserData.status}
                      onChange={e =>
                        setUserData({ ...unUserData, status: e.target.value })
                      }
                      className={`w-full border-b ${getInputClass(unUserData.status)}`}
                    />
                  </div>
                </div>
                {/* Employeur & Statut professionnel */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label>Employeur</label>
                    <input
                      value={unUserData.employeur}
                      onChange={e =>
                        setUserData({ ...unUserData, employeur: e.target.value })
                      }
                      className={`w-full border-b ${getInputClass(unUserData.employeur)}`}
                    />
                  </div>
                  <div>
                    <label>Statut professionnel</label>
                    <input
                      value={unUserData.status_professionnel}
                      onChange={e =>
                        setUserData({
                          ...unUserData,
                          status_professionnel: e.target.value,
                        })
                      }
                      className={`w-full border-b ${getInputClass(unUserData.status_professionnel)}`}
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
                    <button type="button" onClick={() => setShowModif(true)}>
                      Modifier
                    </button>
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

export default CrmUser_userInfosNoImg;

