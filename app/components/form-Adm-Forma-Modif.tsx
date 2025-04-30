"use client";

import React, { useState, useEffect } from "react";
import { actualiserUneFormation, suppUneFormation, selectionUneFormation } from "../db/dbQuery-Formations";
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
  btnUrlInt: "/formulaire/formation",
  btnUrlExt: " ",
  btnTexte: "S'inscrire",
  btnModifUrl: "/admin/formations/",
};

const FormAdmFormaModif: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début Data dynamique   --------------------
  //---------------------------------------------------------------------
  console.log("1.0.0 Front FormAdmFormaModif Début ");
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const { modif_id } = useParams();
  const router = useRouter();

  // Conversion de modif_id en nombre
  const modifIdStr = Array.isArray(modif_id) ? modif_id[0] : modif_id;
  const modifId = modifIdStr ? parseInt(modifIdStr, 10) : NaN;

  //---------------------------------------------------------------------
  //------------------------2 Début comportement ------------------------
  //---------------------------------------------------------------------
  useEffect(() => {
    console.log("2.0.1 ../ Front FormAdmFormaModif => useEffect Début ");

    async function fetchFormations() {
      console.log("2.0.2 ../.?/ Front FormAdmFormaModif => useE => modifId Ok ou NO ok ");
      if (isNaN(modifId)) {
        console.error("2.0.3 ../../ Front FormAdmFormaModif => useE => modifId  NO ok ", modif_id);
        //////////////////////////////////////////
        //////            STOP 1        //////////
        //////////////////////////////////////////
        return;
      }

      //---------------------------------------------------------------------
      //2.0.4 ../../.?/ BACK FormAdmFormaModif => useE => modifId ok => selectUneFormation Ok ou NO 
      console.log("2.0.4 ../../.?/ BACK FormAdmFormaModif => useE => modifId ok => selectUneFormation Ok ou No OK ");
      const data = await selectionUneFormation(modifId);
    

      if (data.success && data.formation) {
        console.log("2.0.4 ../../.?/ FRONT FormAdmFormaModif => useE => modifId ok => selectUneFormation Ok ");
        // Assurer qu'on a un tableau
        const formationsArray = Array.isArray(data.formation)
          ? data.formation
          : [data.formation];
        if (formationsArray.length === 0) {
          console.error("2.6 FormAdmFormaModif aucun id  :", modifId);
          return;
        }
        const formation = formationsArray[0];

        // Transformation pour garantir que btnUrlInt et btnUrlExt ne soient pas null
        const fetchedFormation: FormDataType = {
          titre: formation.titre,
          texte: formation.texte,
          date: formation.date,
          heure: formation.heure,
          prix: formation.prix,
          imgUrl: formation.imgUrl,
          lieu: formation.lieu,
          btnUrlInt: formation.btnUrlInt ?? "",
          btnUrlExt: formation.btnUrlExt ?? "",
          btnTexte: formation.btnTexte,
          btnModifUrl: formation.btnModifUrl,
        };

        //---------------------------------------------------------------------
       //2.0.5 ../../../../ FRONT FormAdmFormaModif => useE => modifId ok => selectUneFormation Ok => set useState
        setFormData(fetchedFormation);
        console.log("2.0.5 ../../../../ FRONT FormAdmFormaModif => useE => modifId ok => selectUneFormation Ok => set useState");
      } else {
        console.error("2.0.5 ../../../../ FRONT FormAdmFormaModif => useE => modifId NO OK ", modifId);
      }
    }
    fetchFormations();
  }, [modifId, modif_id]);

  //---------------------------------------------------------------------
  //------------------------3 Début comportement   ----------------------
  //---------------------------------------------------------------------
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("3 Début handleClick");
    e.preventDefault();
    if (
      !formData.titre ||
      !formData.texte ||
      !formData.date ||
      !formData.heure ||
      !formData.prix ||
      !formData.imgUrl ||
      !formData.lieu 
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    const dataToInsert = {
      titre: formData.titre,
      texte: formData.texte,
      date: formData.date,
      heure: formData.heure,
      prix: formData.prix,
      imgUrl: formData.imgUrl,
      lieu: formData.lieu,
      btnUrlInt: "/formulaire/formation",
      btnUrlExt: " ",
      btnTexte: "S'inscrire",
      btnModifUrl: "/admin/formations"
    };
    try {
      console.log("Création de la formation avec :", dataToInsert);
      const response = await actualiserUneFormation(modifId, dataToInsert);
      console.log("Réponse API :", response);
      if (response.success) {
        // Réinitialisation du formulaire après succès
        setFormData(initialFormData);
        // Redirection vers la route /admin/formations
        router.push("/admin/formations");
      }
    } catch (error) {
      console.error("Erreur lors de la création :", error);
    }
  };

  // Nouveau handle pour la suppression
  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
      try {
        console.log("Suppression de la formation avec id :", modifId);
        const response = await suppUneFormation(modifId);
        console.log("Réponse API (suppression) :", response);
        if (response.success) {
          router.push("/admin/formations");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
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
                    value={formData.imgUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imgUrl: e.target.value })
                    }
                    className="mt-1 block w-full border-b border-gray-300 shadow-sm"
                  />
                </div>
                <div className="w-full overflow-hidden">
                  <img
                    src={formData.imgUrl}
                    alt={formData.titre}
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
                      value={formData.date.trim() === "" ? "" : formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
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
                      value={formData.titre}
                      onChange={(e) =>
                        setFormData({ ...formData, titre: e.target.value })
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
                    value={formData.texte}
                    onChange={(e) =>
                      setFormData({ ...formData, texte: e.target.value })
                    }
                    className="block w-full border-b border-gray-300 shadow-sm mt-4"
                    rows={4}
                  />
                </div>
                {/* Champ Prix */}
                <div className="w-full mt-4">
                  <label className="block text-sm md:text-xl font-medium">
                    Prix
                  </label>
                  <input
                    type="number"
                    value={formData.prix}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prix: parseInt(e.target.value, 10),
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
                    value={formData.heure.trim() === "" ? "" : formData.heure}
                    onChange={(e) =>
                      setFormData({ ...formData, heure: e.target.value })
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
                    value={formData.lieu}
                    onChange={(e) =>
                      setFormData({ ...formData, lieu: e.target.value })
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

export default FormAdmFormaModif;
