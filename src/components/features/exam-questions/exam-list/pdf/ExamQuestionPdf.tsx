'use client'
import React from 'react'
import QuestionPdfDownloadTemplete from '@/components/QuestionPdfDownTemplete/PdfTemplete'
import { useExam } from '@/context/ExamContext'

const ExamQuestionPdf: React.FC = () => {
  const { selectedExam } = useExam()

  if (!selectedExam) {
    return (
      <div className="container mx-auto py-6 text-center text-red-500">
        No exam data available
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <QuestionPdfDownloadTemplete data={selectedExam.generatedTestQuestion.map(q => ({
        id: q.id,
        user_id: 0,
        uuid: q.aiQuestions.uuid,
        question: q.aiQuestions.question,
        correctOpt: q.aiQuestions.correctOpt,
        optionA: q.aiQuestions.optionA,
        optionB: q.aiQuestions.optionB,
        optionC: q.aiQuestions.optionC,
        optionD: q.aiQuestions.optionD,
        answerDesc: q.aiQuestions.answerDesc,
        difficulty: q.aiQuestions.difficulty,
        topicId: q.topicId,
        subjectId: q.subjectId,
        chapterId: q.chapterId,
        estimated_time: q.aiQuestions.estimatedTime || 0,
        cognitive_level: q.aiQuestions.cognitiveLevel.id,
        keywords: '',
        topics: { id: q.topicId, topicName: '' },
        subjects: { id: q.subjectId, subjectName: '' },
        chapters: { id: q.chapterId, chapterName: '' },
        cognitiveLevel: q.aiQuestions.cognitiveLevel
      }))} />
    </div>
  )
}

export default ExamQuestionPdf