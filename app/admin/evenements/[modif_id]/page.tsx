"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import PageAdmEventModif from '../../../components/page-Adm-Event-Modif';


export default function ModificationFormation() {

  return (
    <div className="w-full md:w-5xl mx-auto">
      <PageAdmEventModif />
    </div>
  );
}
