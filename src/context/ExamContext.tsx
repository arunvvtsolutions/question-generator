'use client'
import React, { createContext, useContext, useState } from 'react'
import { ExamWithQuestions } from '@/components/features/exam-questions/exam-list/MainExamList'

interface ExamContextType {
  selectedExam: ExamWithQuestions | null
  setSelectedExam: (exam: ExamWithQuestions | null) => void
}

const ExamContext = createContext<ExamContextType | undefined>(undefined)

export function ExamProvider({ children }: { children: React.ReactNode }) {
  const [selectedExam, setSelectedExam] = useState<ExamWithQuestions | null>(null)

  return (
    <ExamContext.Provider value={{ selectedExam, setSelectedExam }}>
      {children}
    </ExamContext.Provider>
  )
}

export function useExam() {
  const context = useContext(ExamContext)
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider')
  }
  return context
}
