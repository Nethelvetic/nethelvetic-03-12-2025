import React from 'react';
import CarteHImgTxtBdgBdG from '../../components/cart-H-Img-Txt-Btn-BdG';

type Props = {
  params: {
    dateId: string;
  };
};

const evenement = [
  {
    id: "ia-et-emplois",
    title: "L'IA et l'influence sur les emplois",
    description:
      "L'intelligence artificielle transforme profondément le marché du travail, en automatisant des tâches tout en créant de nouvelles opportunités.",
    dateId: "2025-02-13",
  },
  {
    id: "pourquoi-utiliser-ia",
    title: "Pourquoi utiliser l'IA",
    description:
      "L'IA améliore l'efficacité et permet d'analyser de grandes quantités de données, ouvrant la voie à une prise de décision optimisée.",
    dateId: "2025-02-13",
  },
  {
    id: "contraintes-ia",
    title: "Les contraintes de l'IA",
    description:
      "L'IA pose des défis éthiques, techniques et financiers qui nécessitent une attention particulière pour garantir son adoption responsable.",
    dateId: "2025-02-13",
  },
];

export default function DatePage({ params }: Props) {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique  ---------------------
  //---------------------------------------------------------------------
  const { dateId } = params;
  // Filtrer les événements qui correspondent à la dateId passée en paramètre
  const eventsForDate = evenement.filter((event) => event.dateId === dateId);

  //---------------------------------------------------------------------
  //------------------------2 Début affichage  ---------------------------
  //---------------------------------------------------------------------
  return (

    <div>
      {/* Espace entre les sections */}
      <div className="h-10 md:h-25"></div>






      {/*-----------------------------5 DEBUT CONTENEUR carte-H-3xCarte */}
      <h1 className="text-2xl font-bold text-center">Page de date : {dateId}</h1>

      <div className="max-w-2xl mx-auto p-4">
        {eventsForDate.length > 0 ? (
          eventsForDate.map((event) => (
            <div key={event.id} className="border rounded p-4 my-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600 mt-2">{event.description}</p>
              <p className="text-sm text-gray-400 mt-1">Date : {event.dateId}</p>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">Aucun événement pour cette date.</p>
        )}
      </div>
    </div>
  );
}
