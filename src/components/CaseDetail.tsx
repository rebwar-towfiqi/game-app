// src/components/CaseDetail.tsx

interface LegalCase {
  id: number;
  title: string;
  summary: string;
  description: string;
  full_text?: string;
}

import React from 'react';
import { useLocation } from 'react-router-dom';
import cases from '../lib/cases';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CaseDetail() {
  const query = useQuery();
  const id = query.get('id');
  const caseId = id ? parseInt(id, 10) : null;
  const selectedCase = cases.find(c => c.id === caseId);

  if (!selectedCase) {
    return <div className="p-4">❌ پرونده‌ای با این شناسه پیدا نشد.</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">📂 {selectedCase.title}</h2>
      <p className="text-gray-700 whitespace-pre-wrap">{selectedCase.description}</p>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">📣 وظیفهٔ شما:</h3>
        <p className="text-gray-800">
          لطفاً بر اساس نقش انتخاب‌شده خود (قاضی، وکیل شاکی یا متهم)، دفاعیه‌ای ارائه دهید تا رأی هیأت منصفه صادر شود.
        </p>
      </div>
    </div>
  );
}
