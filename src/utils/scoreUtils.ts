// src/utils/scoreUtils.ts

type GameResult = {
  caseTitle: string
  role: string
  points: number
  date: string
}

const STORAGE_KEY = 'legalGameScore'

export function saveGameResult(caseTitle: string, role: string, points: number) {
  const existingData = getStoredResults()
  const newResult: GameResult = {
    caseTitle,
    role,
    points,
    date: new Date().toISOString(),
  }
  const updatedData = {
    history: [...existingData.history, newResult],
    totalPoints: existingData.totalPoints + points,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData))
}

export function getStoredResults(): {
  history: GameResult[]
  totalPoints: number
} {
  if (typeof window === 'undefined') return { history: [], totalPoints: 0 }

  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return { history: [], totalPoints: 0 }

  try {
    return JSON.parse(raw)
  } catch {
    return { history: [], totalPoints: 0 }
  }
}

export function getRLCEquivalent(totalPoints: number): number {
  return Math.floor(totalPoints / 100) // مثال: هر 100 امتیاز = 1 RLC
}

