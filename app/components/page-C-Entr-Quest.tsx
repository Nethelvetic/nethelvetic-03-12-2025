"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CarteVTitreTxtBgGN from './carte-V-Titre-Txt-BgGN';
import { useQuestionnaireStore } from "../util/questionnaireStore"; // Adaptez le chemin selon votre projet

interface Choice {
  text: string;
  points: number;
}

interface Question {
  question: string;
  choices: Choice[];
  type: "radio" | "checkbox";
}

const questions: Question[] = [
  {
    question: "Quel est ton niveau de connaissance des risques et obligations d’un indépendant ?",
    choices: [
      { text: "Quasiment inexistant", points: 0 },
      { text: "Basique : charges sociales, déclarations…", points: 10 },
      { text: "Solide : je comprends les risques.", points: 20 },
    ],
    type: "radio",
  },
  {
    question: "As-tu défini l’activité que tu vas exercer ?",
    choices: [
      { text: "Non : j’ai juste une vague idée.", points: 0 },
      { text: "La direction, mais pas les détails.", points: 10 },
      { text: "Oui : j’ai une offre précise.", points: 20 },
    ],
    type: "radio",
  },
  {
    question: "Branding & Outils (nom, logo, site)",
    choices: [
      { text: "Rien du tout : je pars de zéro.", points: 0 },
      { text: "Partiel: un nom et peut-être un logo…", points: 10 },
      { text: "Tout est prêt et déjà bien avancé.", points: 20 },
    ],
    type: "radio",
  },
  {
    question: "Plein temps ou partiel ?",
    choices: [
      { text: "Juste un complément", points: 0 },
      { text: "Peut-être plus tard", points: 10 },
      { text: "À 100%", points: 20 },
    ],
    type: "radio",
  },
  {
    question: "Prêt(e) à être indépendant(e) maintenant ?",
    choices: [
      { text: "Hésitant(e)", points: 0 },
      { text: "Motivé(e mais prudent(e)", points: 10 },
      { text: "Déterminé(e) : j’y vais, c’est décidé !", points: 20 },
    ],
    type: "radio",
  },
  {
    question: "Gagnes-tu déjà de l’argent ?",
    choices: [
      { text: "Pas encore de revenus liés à mon projet.", points: 0 },
      { text: "Un peu : j’ai déjà facturé des clients.", points: 10 },
      { text: "Oui : j’ai un flux régulier de revenus.", points: 20 },
    ],
    type: "radio",
  },
];




const QuestionnaireIndependant: React.FC = () => {



//---------------------------------------------------------------------
//------------------------1 Début data dynamique ----------------------
//---------------------------------------------------------------------
  const router = useRouter();
  const { answers, currentStep, setAnswers, setCurrentStep } = useQuestionnaireStore();
  const [errorMsg, setErrorMsg] = useState("");



//---------------------------------------------------------------------
//------------------------2 Début comportement ------------------------
//---------------------------------------------------------------------
  const handleNext = () => {
    const selectedAnswers = answers[currentStep] || [];
    if (selectedAnswers.length === 0) {
      setErrorMsg("Veuillez sélectionner au moins une réponse pour continuer.");
      return;
    }
    setErrorMsg("");

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calcul du score total
      let totalScore = 0;
      for (const qIndex in answers) {
        const selectedIdxArray = answers[Number(qIndex)];
        selectedIdxArray.forEach((choiceIdx) => {
          totalScore += questions[Number(qIndex)].choices[choiceIdx].points;
        });
      }
      router.push(`/creation-entreprise/resultat?score=${totalScore}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (choiceIndex: number) => {
    const questionType = questions[currentStep].type;
    const currentAnswers = answers[currentStep] || [];
    let newAnswers: number[];
    if (questionType === "radio") {
      newAnswers = [choiceIndex];
    } else {
      if (currentAnswers.includes(choiceIndex)) {
        newAnswers = currentAnswers.filter((c) => c !== choiceIndex);
      } else {
        newAnswers = [...currentAnswers, choiceIndex];
      }
    }
    setAnswers(currentStep, newAnswers);
    setErrorMsg("");
  };

  const currentQuestion = questions[currentStep];
  const selectedAnswers = answers[currentStep] || [];



//---------------------------------------------------------------------
//------------------------3 Début affichage ---------------------------
//---------------------------------------------------------------------
  return (
    <div>

        {/*-----------0 DEBUT espace entre les sections */}
        <div className="h-10 md:h-20"></div>


        {/*-----------------------------1 DEBUT CONTENEUR carte-V-TitreBgGN*/}
        <div className='p-6'>
            <CarteVTitreTxtBgGN title={`Question ${currentStep + 1} sur ${questions.length}`}>
                <p className="mb-4 text-base font-openSansRegular sm:text-lg md:text-xl">
                {currentQuestion.question}
                </p>

                <div className="space-y-2 mb-4">
                    {currentQuestion.choices.map((choiceObj, idx) => {
                        const isChecked = selectedAnswers.includes(idx);
                        return (
                        <label key={idx} className="flex items-center space-x-2">
                            <input
                            type={currentQuestion.type === "radio" ? "radio" : "checkbox"}
                            name={`question-${currentStep}`}
                            value={idx}
                            checked={isChecked}
                            onChange={() => handleChange(idx)}
                            className="text-bg-gradient"
                            />
                            <span>{choiceObj.text}</span>
                        </label>
                        );
                    })}
                    </div>

                    {errorMsg && (
                    <div className="text-red-400 mb-4 font-semibold">
                        {errorMsg}
                    </div>
                    )}

                    <div className="flex justify-end space-x-2">
                    {currentStep > 0 && (
                        <button
                        onClick={handlePrevious}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                        >
                        Précédent
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-bg-gradient hover:bg-bg-gradient2 text-white rounded"
                    >
                        {currentStep < questions.length - 1 ? "Suivant" : "Terminer"}
                    </button>
                </div>
            </CarteVTitreTxtBgGN>
        </div>
        {/*-----------------------------1 DEBUT CONTENEUR carte-V-TitreBgGN*/}
    </div>
  );
};

export default QuestionnaireIndependant;
