"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CarteVImgTxtBgGN from "./cart-V-Img-Txt-BgGN";
import ContBtnLgBgG from "./cont-Btn-Lg-BgG";

interface FormData {
  email: string;
  name: string;       // correspond à "name" dans la DB
  prenom: string;     // correspond à "prenom" dans la DB
  ville: string;      // correspond à "ville" dans la DB
  telephone: string;  // correspond à "telephone" dans la DB
  age?: number;        // correspond à "age" dans la DB
  newsletter: boolean;
  noBullshit: boolean;
}

const FormUser: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Données du formulaire :", data);
    // Ici, vous pourrez envoyer 'data' à votre API / DB (via Drizzle, fetch, etc.)
  };

  return (
    <div>
      <div className="p-6">
        {/*-----------------------------1 DEBUT CONTENEUR carte-V-Img-Txt-BgGN */}
        <CarteVImgTxtBgGN imageSrc="/ordinateur2Bg.png" title="">
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
                className="mt-1 block w-full border-b border-gray-300 shadow-sm"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            {/* Champ Nom -> 'name' dans la DB */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Nom</label>
              <input
                type="text"
                {...register("name", { required: "Le nom est requis" })}
                className="mt-1 block w-full border-b border-gray-300 shadow-sm"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
              )}
            </div>

            {/* Champ Prénom -> 'prenom' dans la DB */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Prénom</label>
              <input
                type="text"
                {...register("prenom", { required: "Le prénom est requis" })}
                className="mt-1 block w-full border-b border-gray-300 shadow-sm"
              />
              {errors.prenom && (
                <span className="text-red-500 text-sm">{errors.prenom.message}</span>
              )}
            </div>

            {/* Champ Ville -> 'ville' dans la DB */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Ville</label>
              <input
                type="text"
                {...register("ville", { required: "La ville est requise" })}
                className="mt-1 block w-full border-b border-gray-300 shadow-sm"
              />
              {errors.ville && (
                <span className="text-red-500 text-sm">{errors.ville.message}</span>
              )}
            </div>

            {/* Champ Téléphone -> 'telephone' dans la DB */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Téléphone</label>
              <input
                type="text"
                {...register("telephone", { required: "Le téléphone est requis" })}
                className="mt-1 block w-full border-b border-gray-300 shadow-sm"
              />
              {errors.telephone && (
                <span className="text-red-500 text-sm">{errors.telephone.message}</span>
              )}
            </div>

            {/* Bouton de soumission */}
            <ContBtnLgBgG>
              <button type="submit" className="w-full h-full">
                Envoyer
              </button>
            </ContBtnLgBgG>
          </form>
        </CarteVImgTxtBgGN>
        {/*-----------------------------1 FIN CONTENEUR carte-V-Img-Txt-BgGN */}
      </div>
    </div>
  );
};

export default FormUser;
