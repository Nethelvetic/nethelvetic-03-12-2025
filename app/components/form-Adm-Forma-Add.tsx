"use client";

import React, { useState } from "react";
import { createFormation } from "../db/dbQuery-Formations";
import ContainerBGN from "./cont-BgGN";
import ContainerBtnLgBgG from "./cont-Btn-Lg-BgG";
import { useRouter } from "next/navigation";

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

const FormAdmFormaAdd: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début Data dynamique   --------------------
  //---------------------------------------------------------------------
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  // Déstructuration pour accéder aux valeurs (correction: utiliser imgUrl au lieu de img)
  const { imgUrl, titre, texte, date, prix, heure, lieu } = formData;

  const router = useRouter();

  //---------------------------------------------------------------------
  //------------------------2 Début comportement   ----------------------
  //---------------------------------------------------------------------
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("2.0 debut handleClick");
    e.preventDefault();

    // Vérification statique que tous les champs sont remplis
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
      btnModifUrl: "/admin/formations/"
    };

    try {
      console.log("2.1 debut await createFormation(dataToInsert: )", dataToInsert);
      const response = await createFormation(dataToInsert);
      console.log("2.2 Réponse API:", response);
      if (response.success) {
        // Réinitialisation du formulaire après succès
        setFormData(initialFormData);
        // Redirection vers la route /admin/formations
        router.push("/admin/formations");
      }
    } catch (error) {
      console.error("Erreur lors de l'appel de createFormation:", error);
    }
  };

  //---------------------------------------------------------------------
  //------------------------3 Début Affichage   -------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6">
      <ContainerBGN>
        <div className="w-full">
          {/*-------------------------------------1 debut formulaire */}
          <form onSubmit={handleClick} className="space-y-4 p-4 w-full">
            {/*-----------------------2 debut conteneur flex-col md:flex-row  */}
            <div className="flex flex-col md:flex-row items-start p-3">
              {/*-----------2.1 debut Image flex-col  */}
              <div className="w-full flex flex-col md:w-1/3 h-48 md:h-88 overflow-hidden">
                {/* Image label et input */}
                <div>
                  <label className="block text-sm md:text-xl font-medium">
                    Image url
                  </label>
                  <input
                    type="text"
                    value={imgUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imgUrl: e.target.value })
                    }
                    className="mt-1 block w-full border-b border-gray-300 shadow-sm"
                  />
                </div>
                {/* Image affichage */}
                <div className="w-full overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={titre}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
              {/*-----------2.1 Fin Image flex-col  */}

              {/*-----------2.2 Debut conteneur autre champs */}
              <div className="w-full md:w-2/3 flex flex-col text-left pl-4 mt-4">
                {/* Champ Date avec balise h4 */}
                <div className="w-full flex flex-col mt-4">
                  <label className="block text-sm md:text-xl font-medium">
                    Date
                  </label>
                  <h4 className="mt-1 block">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full border-b border-gray-300 shadow-sm font-bold text-2xl md:text-3xl"
                    />
                  </h4>
                </div>
                {/* Champ Titre avec balise h3 */}
                <div className="w-full mt-4">
                  <label className="block text-sm md:text-xl font-medium">
                    Titre
                  </label>
                  <h3 className="mt-1 block">
                    <textarea
                      rows={2}
                      value={titre}
                      onChange={(e) =>
                        setFormData({ ...formData, titre: e.target.value })
                      }
                      className="w-full border-b border-gray-300 shadow-sm font-bold text-3xl md:text-5xl"
                    />
                  </h3>
                </div>
                {/* Champ Description */}
                <div className="w-full mt-4">
                  <label className="block text-sm md:text-xl font-medium">
                    Description
                  </label>
                  <textarea
                    value={texte}
                    onChange={(e) =>
                      setFormData({ ...formData, texte: e.target.value })
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
                    value={prix}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
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
                    value={heure}
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
                    value={lieu}
                    onChange={(e) =>
                      setFormData({ ...formData, lieu: e.target.value })
                    }
                    className="mt-1 block w-full border-b border-gray-300 shadow-sm"
                  />
                </div>
                {/* Bouton de soumission */}
                <div className="w-full pt-3 pb-3">
                  <ContainerBtnLgBgG>
                    <button type="submit">Creer</button>
                  </ContainerBtnLgBgG>
                </div>
              </div>
              {/*-----------2.2 Fin conteneur autre champs */}
            </div>
          </form>
          {/*-------------------------------------1 fin formulaire */}
        </div>
      </ContainerBGN>
    </div>
  );
};

export default FormAdmFormaAdd;
