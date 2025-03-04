"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ContainerBgGN from './cont-BgGN';

const MonthCalendar: React.FC = () => {
  //---------------------------------------------------------------------
  //------------------------1 Début data dynamique ----------------------
  //---------------------------------------------------------------------
  // État pour la date actuellement affichée
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();



  //---------------------------------------------------------------------
  //------------------------2 Début comportement ------------------------
  //---------------------------------------------------------------------
  // Fonctions pour naviguer entre les mois
  const goToPrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Récupération des informations sur le mois
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  // Tableau des jours de la semaine en français
  const weekdays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  // Construction du tableau des cases du calendrier
  const calendarCells: (number | null)[] = [];

  // Remplir les cases vides avant le 1er du mois
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }

  // Remplir les jours du mois
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  // Gestion du clic sur un jour du calendrier
  const handleDateClick = (day: number | null) => {
    if (!day) return;
    // Construire un objet Date pour le jour cliqué en heure locale
    const selectedDate = new Date(year, month, day);
    // Formatage manuel de la date au format "YYYY-MM-DD"
    const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
    // Redirection vers la page dynamique app/date/[dateId]/page.tsx
    router.push(`/date/${formattedDate}`);
  };



  //---------------------------------------------------------------------
  //------------------------3 Début affichage ---------------------------
  //---------------------------------------------------------------------
  return (
    <ContainerBgGN>
      <div className="max-w-md mx-auto p-4">
        {/* Espace entre les sections */}
        <div className="h-10 md:h-25"></div>

        {/* En-tête du calendrier avec navigation sur une même ligne */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPrevMonth}
            className="p-2 bg-bgGardient1 rounded hover:bg-gray-300"
            aria-label="Mois précédent"
          >
            &lt;
          </button>
          <div className="text-center">
            <h3 className="font-bold text-3xl md:text-7xl my-6">
              {currentDate.toLocaleString("fr-FR", { month: "long" })}
            </h3>
            <h3 className="font-medium text-4xl">
              {year}
            </h3>
          </div>
          <button
            onClick={goToNextMonth}
            className="p-2 bg-bgGardient1 rounded hover:bg-gray-300"
            aria-label="Mois suivant"
          >
            &gt;
          </button>
        </div>

        {/* Affichage des jours de la semaine */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {weekdays.map((weekday) => (
            <div key={weekday} className="font-semibold">
              {weekday}
            </div>
          ))}

          {/* Affichage des cases du calendrier avec clic sur chaque jour */}
          {calendarCells.map((cell, index) => (
            <div
              key={index}
              onClick={() => handleDateClick(cell)}
              className={`h-10 flex items-center justify-center border rounded ${
                cell ? "cursor-pointer hover:bg-gray-100" : ""
              }`}
            >
              {cell ? cell : ""}
            </div>
          ))}
        </div>
      </div>
    </ContainerBgGN>
  );
};

export default MonthCalendar;
