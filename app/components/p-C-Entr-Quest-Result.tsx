"use client";

import PageCrEntrFormuPremium from "./p-C-Entr-Formu_Premium";
import PageCrEntrFormuGratuite from "./p-C-Entr-Formu-Gratuite";
import { useSearchParams } from "next/navigation";

export default function PageResultatQuestion() {
  // Récupération des search params côté client
  const searchParams = useSearchParams();
  const score = searchParams.get("score"); // string ou null
  const scoreNum = Number(score) || 0;

  // Sélection du contenu à afficher selon le score
  let content;
  if (scoreNum < 31) {
    content = <PageCrEntrFormuPremium />;
  } else {
    content = <PageCrEntrFormuGratuite />;
  }

  return <div>{content}</div>;
}
