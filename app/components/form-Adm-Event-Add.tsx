"use client";

import React, { useState } from "react";
import { createEvenement } from "../db/dbQuery-Evenements";
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
  btnUrlInt: "/formulaire/evenement",
  btnUrlExt: " ",
  btnTexte: "S'inscrire",
  btnModifUrl: "/admin/evenements/",
};

const FormAdmEventAdd: React.FC = () => {

  //---------------------------------------------------------------------
  //------------------------1 Début Data dynamique   --------------------
  //---------------------------------------------------------------------
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const { imgUrl, titre, texte, date, prix, heure, lieu } = formData;

  const router = useRouter();


  //---------------------------------------------------------------------
  //------------------------2 Début comportement ------------------------
  //---------------------------------------------------------------------
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.titre ||
      !formData.texte ||
      !formData.date ||
      !formData.heure ||
      !formData.imgUrl ||
      !formData.lieu
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const dataToInsert = {
      ...formData,
      btnUrlInt: "/formulaire/evenement",
      btnModifUrl: "/admin/evenements/",
    };

    try {
      const response = await createEvenement(dataToInsert);
      if (response.success) {
        setFormData(initialFormData);
        router.push("/admin/evenements");
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'événement:", error);
    }
  };


  //---------------------------------------------------------------------
  //------------------------3 Début affichage ---------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6">
      <ContainerBGN>
        <form onSubmit={handleClick} className="space-y-4 p-4 w-full">
          <div className="flex flex-col md:flex-row items-start p-3">
            <div className="w-full flex flex-col md:w-1/3 h-48 md:h-88 overflow-hidden">
              <div>
                <label className="block text-base md:text-lg font-bold">Image url</label>
                <input
                  type="text"
                  value={imgUrl}
                  onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
                  className="mt-1 block w-full border-b border-gray-300 shadow-sm"
                />
              </div>
              <div className="w-full overflow-hidden">
                <img src={imgUrl} alt={titre} className="object-contain w-full h-full" />
              </div>
            </div>

            <div className="w-full md:w-2/3 flex flex-col text-left pl-4 mt-4">
              <div className="w-full flex flex-col mt-4">
                <label className="block text-base md:text-lg font-bold">Date</label>
                <h4 className="mt-1 block">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border-b border-gray-300 shadow-sm font-bold text-2xl md:text-3xl"
                  />
                </h4>
              </div>

              {/* Champ Titre */}
              <div className="w-full mt-4">
                <label className="block text-base md:text-lg font-bold">Titre</label>
                <h3>
                  <textarea
                    rows={2}
                    value={titre}
                    onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                    className="w-full border-b border-gray-300 shadow-sm font-bold text-3xl md:text-5xl"
                  />
                </h3>
              </div>

              <div className="w-full mt-4">
                <label className="block text-base md:text-lg font-bold">Description</label>
                  <textarea
                    value={texte}
                    onChange={(e) => setFormData({ ...formData, texte: e.target.value })}
                    className="block w-full border-b border-gray-300 text-base md:text-lg shadow-sm mt-4"
                    rows={4}>
                  </textarea>
              </div>

              <div className="w-full mt-4">
                <label className="block text-base md:text-lg font-bold">Prix</label>
                <input
                  type="number"
                  value={prix}
                  onChange={(e) => setFormData({ ...formData, prix: parseInt(e.target.value) })}
                  className="mt-1 block w-full border-b border-gray-300 text-base md:text-lg shadow-sm"
                />
              </div>

              <div className="w-full mt-4">
                <label className="block text-base md:text-lg font-bold">Heure</label>
                <input
                  type="time"
                  value={heure}
                  onChange={(e) => setFormData({ ...formData, heure: e.target.value })}
                  className="mt-1 block w-full border-b border-gray-300 text-base md:text-lg shadow-sm"
                />
              </div>

              <div className="w-full mt-4">
                <label className="block text-base md:text-lg font-bold">Lieu</label>
                <input
                  type="text"
                  value={lieu}
                  onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                  className="mt-1 block w-full border-b border-gray-300 text-base md:text-lg shadow-sm"
                />
              </div>

              <div className="w-full pt-3 pb-3">
                <ContainerBtnLgBgG>
                  <button type="submit">Creer</button>
                </ContainerBtnLgBgG>
              </div>
            </div>
          </div>
        </form>
      </ContainerBGN>
    </div>
  );
};

export default FormAdmEventAdd;