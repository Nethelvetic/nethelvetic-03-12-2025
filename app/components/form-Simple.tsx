"use client";

import React, { useState } from "react";
import CarteVImgTxtBgGN from "./cart-V-Img-Txt-BgGN";
import ContBtnLgBgG from "./cont-Btn-Lg-BgG";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";

interface FormData {
  email: string;
  nom: string;
  prenom: string;
  newsletter: boolean;
  noBullshit: boolean;
}

const FormSimple: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  // Utilisation de watch pour surveiller la valeur des champs
  const watchedEmail = watch("email", "");
  const watchedNom = watch("nom", "");
  const watchedPrenom = watch("prenom", "");

  // Fonction pour déterminer la classe CSS en fonction de la présence de texte
  const getInputClass = (value: string) =>
    value
      ? "bg-white text-black placeholder-gray-500"
      : "bg-transparent text-white placeholder-white";

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Données du formulaire :", data);
  };

  return (
    <div>
      <div className="p-6">
        <CarteVImgTxtBgGN imageSrc="/ordinateurBg.png" title="">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-md mx-auto">
            {/* Champ Email */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "L'email est requis",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Email invalide",
                  },
                })}
                className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(watchedEmail)}`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            {/* Champ Nom */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Nom</label>
              <input
                type="text"
                {...register("nom", { required: "Le nom est requis" })}
                className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(watchedNom)}`}
              />
              {errors.nom && (
                <span className="text-red-500 text-sm">{errors.nom.message}</span>
              )}
            </div>

            {/* Champ Prénom */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Prénom</label>
              <input
                type="text"
                {...register("prenom", { required: "Le prénom est requis" })}
                className={`mt-1 block w-full border-b border-gray-300 shadow-sm ${getInputClass(watchedPrenom)}`}
              />
              {errors.prenom && (
                <span className="text-red-500 text-sm">{errors.prenom.message}</span>
              )}
            </div>

            {/* Checkbox Newsletter */}
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("newsletter")}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm md:text-xl">S'inscrire à la newsletter</label>
            </div>

            {/* Checkbox Communauté No BullSH*T */}
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("noBullshit")}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm md:text-xl">Faire partie de la communauté No BullSH*T</label>
            </div>

            {/* Bouton de soumission */}
            <ContBtnLgBgG>
              <button type="submit" className="w-full h-full">
                Envoyer
              </button>
            </ContBtnLgBgG>
          </form>
        </CarteVImgTxtBgGN>
      </div>
    </div>
  );
};

export default FormSimple; 
