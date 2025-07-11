// src/components/TokenDashboard.tsx
import { getStoredResults, getRLCEquivalent } from '../utils/scoreUtils'

export default function TokenDashboard() {
  const data = getStoredResults()
  const rlc = getRLCEquivalent(data.totalPoints)

  return (
    <div className="p-4 border rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-3">📊 داشبورد امتیاز و RLC</h2>
      <p>کل امتیازها: <strong>{data.totalPoints}</strong></p>
      <p>RLC مجازی شما: <strong>{rlc} RLC</strong></p>
      <h3 className="mt-4 font-semibold">تاریخچه بازی:</h3>
      <ul className="mt-2 list-disc pl-5 text-sm">
        {data.history.map((item, i) => (
          <li key={i}>
            {item.date.slice(0, 10)} – {item.caseTitle} ({item.role}) – امتیاز: {item.points}
          </li>
        ))}
      </ul>
    </div>
  )
}
