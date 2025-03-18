"use client";

import React, { useState, useEffect } from "react";
import { actualiserUnEvenement, suppUnEvenement, selectionUnEvenement } from "../db/dbQuery-Evenements";
import ContainerBGN from "./cont-BgGN";
import ContainerBtnLgBgG from "./cont-Btn-Lg-BgG";
import { useParams, useRouter } from "next/navigation";

type FormDataType = {
  titre: string;
  texte: string;
  date: string;
  heure: string;
  prix: number;
  imgUrl: string;
  lieu: string;
  btnUrlInt: string;
  btnUrlExt: string;
  btnTexte: string;
  btnModifUrl: string;
};

const initialFormData: FormDataType = {
  titre: " ",
  texte: " ",
  date: " ",
  heure: " ",
  prix: 0,
  imgUrl: " ",
  lieu: " ",
  btnUrlInt: "/formulaire/evenemnt",
  btnUrlExt: " ",
  btnTexte: "S'inscrire",
  btnModifUrl: "/admin/evenements/",
};

const FormAdmEventModif: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début Data dynamique   --------------------
  //---------------------------------------------------------------------
  console.log("1.0 FormAdmEventModif Début ");
  const [unEventData, setUnEventData] = useState<FormDataType>(initialFormData);
  const { modif_id } = useParams();
  const router = useRouter();

  // Conversion de modif_id en nombre
  const modifIdStr = Array.isArray(modif_id) ? modif_id[0] : modif_id;
  const modifId = modifIdStr ? parseInt(modifIdStr, 10) : NaN;

  //---------------------------------------------------------------------
  //------------------------2 Début comportement ------------------------
  //---------------------------------------------------------------------
  useEffect(() => {
    console.log("2.1 FormAdmEventModif useEffect Début ");
    async function fetchEvenement() {
      console.log("2.2 FormAdmEventModif fetchEvenement() Début ");
      if (isNaN(modifId)) {
        console.error("2.3 FormAdmEventModif fetchEvenement  modif_id non valide :", modif_id);
        return;
      }
      const data = await selectionUnEvenement(modifId);
      console.log("2.4 FormAdmEventModif selectionUnEvenement après réponse data = ", data);
      if (data && data.length > 0) {
        const evenement = data[0];
        // Transformation pour garantir que btnUrlInt et btnUrlExt ne soient pas null,
        // et que 'prix' soit toujours un nombre (0 si null)
        const fetchedEvenement: FormDataType = {
          titre: evenement.titre,
          texte: evenement.texte,
          date: evenement.date,
          heure: evenement.heure,
          prix: evenement.prix ?? 0,
          imgUrl: evenement.imgUrl,
          lieu: evenement.lieu,
          btnUrlInt: evenement.btnUrlInt ?? "",
          btnUrlExt: evenement.btnUrlExt ?? "",
          btnTexte: evenement.btnTexte,
          btnModifUrl: evenement.btnModifUrl,
        };
        setUnEventData(fetchedEvenement);
        console.log("2.5 FormAdmEventModif evenement:", evenement);
      } else {
        console.error("2.6 FormAdmEventModif aucun id  :", modifId);
      }
    }
    fetchEvenement();
  }, [modifId, modif_id]);

  //---------------------------------------------------------------------
  //------------------------3 Début comportement   ----------------------
  //---------------------------------------------------------------------
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("3 FormAdmEventModif handleClick");
    e.preventDefault();
    if (
      !unEventData.titre ||
      !unEventData.texte ||
      !unEventData.date ||
      !unEventData.heure ||
      !unEventData.prix ||
      !unEventData.imgUrl ||
      !unEventData.lieu 
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    const dataToInsert = {
      titre: unEventData.titre,
      texte: unEventData.texte,
      date: unEventData.date,
      heure: unEventData.heure,
      prix: unEventData.prix,
      imgUrl: unEventData.imgUrl,
      lieu: unEventData.lieu,
      btnUrlInt: "/formulaire/evenement",
      btnUrlExt: " ",
      btnTexte: "S'inscrire",
      btnModifUrl: "/admin/evenements"
    };
    try {
      console.log("3.1 FormAdmEventModif handleClick actualiserUnEvent avant :", dataToInsert);
      const response = await actualiserUnEvenement(modifId, dataToInsert);
      console.log("3.1 FormAdmEventModif handleClick actualiserUnEvent après réponse :", response);
      if (response.success) {
        // Réinitialisation du formulaire après succès
        setUnEventData(initialFormData);
        // Redirection vers la route /admin/formations
        router.push("/admin/evenements");
      }
    } catch (error) {
      console.error("3.1 FormAdmEventModif handleClick actualiserUnEvent erreur:", error);
    }
  };

  // Nouveau handle pour la suppression
  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
      try {
        console.log("3.2 FormAdmEventModif handleDelete suppUnEvenement() id= ", modifId);
        const response = await suppUnEvenement(modifId);
        console.log("3.2 FormAdmEventModif handleDelete suppUnEvenement() réponse:", response);
        if (response.success) {
          router.push("/admin/evenements");
        }
      } catch (error) {
        console.error("3.2 FormAdmEventModif handleDelete suppUnEvenement() erreur:", error);
      }
    }
  };

  //---------------------------------------------------------------------
  //------------------------4 Début Affichage   -------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6">
      <ContainerBGN>
        <div className="w-full">
          {/* Début du formulaire */}
          <form onSubmit={handleClick} className="space-y-4 p-4 w-full">
            <div className="flex flex-col md:flex-row items-start p-3">
              {/* Section Image */}
              <div className="w-full flex flex-col md:w-1/3 h-48 md:h-88 overflow-hidden">
                <div>
                  <label className="block text-sm md:text-xl font-medium">
                    Image url
                  </label>
                  <input
                    type="text"
                    value={unEventData.imgUrl}
                    onChange={(e) =>
                      setUnEventData({ ...unEventData, imgUrl: e.target.value })
                    }
                    className="mt-1 block w-full border-b border-gray-300 shadow-sm"
                  />
                </div>
                <div className="w-full overflow-hidden">
                  <img
                    src={unEventData.imgUrl}
                    alt={unEventData.titre}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
              {/* Section Autres champs */}
              <div className="w-full md:w-2/3 flex flex-col text-left pl-4 mt-4">
                {/* Champ Date */}
                <div className="w-full flex flex-col mt-4">
                  <label className="block text-sm md:text-xl font-medium">
                    Date
                  </label>
                  <h4 className="mt-1 block">
                    <input
                      type="date"
                      value={unEventData.date.trim() === "" ? "" : unEventData.date}
                      onChange={(e) =>
                        setUnEventData({ ...unEventData, date: e.target.value })
                      }
                      className="w-full border-b border-gray-300 shadow-sm font-bold text-2xl md:text-3xl"
                    />
                  </h4>
                </div>
                {/* Champ Titre (affiché sur 2 lignes) */}
                <div className="w-full mt-4">
                  <label className="block text-sm md:text-xl font-medium">
                    Titre
                  </label>
                  <h3 className="mt-1 block">
                    <textarea
                      rows={3}
                      value={unEventData.titre}
                      onChange={(e) =>
                        setUnEventData({ ...unEventData, titre: e.target.value })
                      }
                      className="block w-full border-b border-gray-300 shadow-sm mt-4 resize-none font-bold text-3xl md:text-5xl"
                    />
                  </h3>
                </div>
                {/* Champ Description */}
                <div className="w-full mt-4">
                  <label className="block text-sm md:text-xl font-medium">
                    Description
                  </label>
                  <textarea
                    value={unEventData.texte}
                    onChange={(e) =>
                      setUnEventData({ ...unEventData, texte: e.target.value })
                    }
                    className="block w-full border-b border-gray-300 shadow-sm mt-4"
                    rows={4}
                  ></textarea>
                </div>
                {/* Champ Prix */}
                <div className="w-full mt-4">
                  <label className="block text-sm md:text-xl font-medium">
                    Prix
                  </label>
                  <input
                    type="number"
                    value={unEventData.prix}
                    onChange={(e) =>
                      setUnEventData({
                        ...unEventData,
                        prix: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full border-b border-gray-300 shadow-sm"
                  />
                </div>
                {/* Champ Heure */}
                <div className="w-full mt-4">
                  <label className="block text-sm md:text-xl font-medium">
                    Heure
                  </label>
                  <input
                    type="time"
                    value={unEventData.heure.trim() === "" ? "" : unEventData.heure}
                    onChange={(e) =>
                      setUnEventData({ ...unEventData, heure: e.target.value })
                    }
                    className="mt-1 block w-full border-b border-gray-300 shadow-sm"
                  />
                </div>
                {/* Champ Lieu */}
                <div className="w-full mt-4">
                  <label className="block text-sm md:text-xl font-medium">
                    Lieu
                  </label>
                  <input
                    type="text"
                    value={unEventData.lieu}
                    onChange={(e) =>
                      setUnEventData({ ...unEventData, lieu: e.target.value })
                    }
                    className="mt-1 block w-full border-b border-gray-300 shadow-sm"
                  />
                </div>
                {/* Boutons de soumission */}
                <div className="w-full pt-3 pb-3 flex space-x-4">
                  <ContainerBtnLgBgG>
                    <button type="submit">Modifier</button>
                  </ContainerBtnLgBgG>
                  <ContainerBtnLgBgG>
                    <button type="button" onClick={handleDelete}>Supprimer</button>
                  </ContainerBtnLgBgG>
                </div>
              </div>
            </div>
          </form>
          {/* Fin du formulaire */}
        </div>
      </ContainerBGN>
    </div>
  );
};

export default FormAdmEventModif;
