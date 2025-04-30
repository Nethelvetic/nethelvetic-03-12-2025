// page.tsx (dans app/creation-entreprise/resultat/)
import { Suspense } from "react";
import PageCrEntrResultQues from "../../components/p-C-Entr-Quest-Result";

export default function PageResultatQuestion() {
  return (
    <div>
      <h1>Résultat de la création d'entreprise</h1>
      <Suspense fallback={<div>Chargement…</div>}>
        <PageCrEntrResultQues />
      </Suspense>
    </div>
  );
}
