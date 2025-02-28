"use client";

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import CarteVImgTxtBgGN from './carte-V-Img-Txt-BgGN';
import ContBtnLgBgG from './cont-Btn-Lg-BgG';

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
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Données du formulaire :", data);
  };

  return (
    <div>
      <div className='p-6' >

        {/*-----------------------------1 DEBUT CONTENEUR carte-V-Img-Txt-BgGN */}
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
                className="mt-1 block w-full border-b border-gray-300 shadow-sm"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            {/* Champ Nom */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Nom</label>
              <input
                type="text"
                {...register("nom", { required: "Le nom est requis" })}
                className="mt-1 block w-full border-b border-gray-300 shadow-sm"
              />
              {errors.nom && <span className="text-red-500 text-sm">{errors.nom.message}</span>}
            </div>

            {/* Champ Prénom */}
            <div>
              <label className="block text-sm md:text-xl font-medium">Prénom</label>
              <input
                type="text"
                {...register("prenom", { required: "Le prénom est requis" })}
                className="mt-1 block w-full border-b border-gray-300 shadow-sm"
              />
              {errors.prenom && <span className="text-red-500 text-sm">{errors.prenom.message}</span>}
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
              <button type="submit" className='w-full h-full'>
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

export default FormSimple;
