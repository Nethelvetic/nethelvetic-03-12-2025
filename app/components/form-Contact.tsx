"use client";

import React, { useState } from "react";
import ContainerBGN from "./cont-BgGN";
import ContBtnLgBgG from "./cont-Btn-Lg-BgG";
import { useRouter } from "next/navigation";
// Assurez-vous d'adapter le chemin vers votre fonction de création d'utilisateur
import { createUser } from "../db/dbQuery-Users";

type FormDataType = {
  email: string;
  nom: string;
  prenom: string;
  message: string;
};

const initialFormData: FormDataType = {
  email: "",
  nom: "",
  prenom: "",
  message: "",
};

const FormContact: React.FC = () => {


  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique ----------------------
  //---------------------------------------------------------------------
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const router = useRouter();



  //---------------------------------------------------------------------
  //------------------------2 Début comportement ------------------------
  //---------------------------------------------------------------------
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérification statique que tous les champs obligatoires sont remplis
    if (!formData.email || !formData.nom || !formData.prenom || !formData.message) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      console.log("Données à insérer :", formData);
      const response = await createUser(formData);
      console.log("Réponse API :", response);
      if (response.success) {
        // Réinitialisation du formulaire après succès
        setFormData(initialFormData);
        // Redirection vers la liste des utilisateurs (par exemple)
        router.push("/admin/users");
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  };



  //---------------------------------------------------------------------
  //------------------------3 Début affichage ---------------------------
  //---------------------------------------------------------------------
  return (
    <div className="p-6">
      <ContainerBGN>
        <div className="w-full">
          <form onSubmit={handleClick} className="space-y-4 p-4 max-w-md mx-auto">
            {/* Champ Email */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full border-b border-gray-300 shadow-sm"
              />
            </div>

            {/* Champ Nom */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Nom</label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="mt-1 block w-full border-b border-gray-300 shadow-sm"
              />
            </div>

            {/* Champ Prénom */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Prénom</label>
              <input
                type="text"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                className="mt-1 block w-full border-b border-gray-300 shadow-sm"
              />
            </div>

            {/* Champ Message */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Message</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1 block w-full border-b border-gray-300 shadow-sm"
              ></textarea>
            </div>

            {/* Bouton de soumission */}
            <div className="w-full pt-3 pb-3">
              <ContBtnLgBgG>
                <button type="submit" className="w-full h-full">
                  Envoyer
                </button>
              </ContBtnLgBgG>
            </div>
          </form>
        </div>
      </ContainerBGN>
    </div>
  );
};

export default FormContact;
