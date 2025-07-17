// src/pages/api/argument/stats/[caseId].ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { caseId: _caseId } = req.query; // فعلاً استفاده نمی‌شود ولی آماده است

  return res
    .status(200)
    .json({ message: 'Handler آماده است اما داده‌ای استفاده نشده.' });
}
