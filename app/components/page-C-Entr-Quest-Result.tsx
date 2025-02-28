"use client";

import PageCrEntrFormuPremium from './page-C-Entr-Formu_Premium';
import PageCrEntrFormuGratuite from './page-C-Entr-Formu-Gratuite';
import { useSearchParams } from "next/navigation";




export default function PageResultatQuestion() {


//---------------------------------------------------------------------
//-------------------------1 Début data dynamique ---------------------
//---------------------------------------------------------------------
const searchParams = useSearchParams();
const score = searchParams.get("score"); // string ou null
const scoreNum = Number(score) || 0;

//---------------------------------------------------------------------
//------------------------2 Début comportement ------------------------
//---------------------------------------------------------------------
let content;
if (scoreNum < 31) {
  content = < PageCrEntrFormuPremium  />;
} else {
  content = < PageCrEntrFormuGratuite  />;
}



//---------------------------------------------------------------------
//------------------------2 Début affichage   -------------------------
//--------------------------------------------------------------------- 
    return ( 
            <div>
                {content}
            </div>
    );
  }
  