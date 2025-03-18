"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import PageAdmEventModif from '../../../components/page-Adm-Event-Modif';


export default function ModificationFormation() {
  const { modif_id } = useParams();

  return (
    <div className="w-full md:w-5xl mx-auto">
      <PageAdmEventModif />
    </div>
  );
}
