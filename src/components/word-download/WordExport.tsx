import React from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { Button } from "../ui/button";
import { cleanMarkdownForDocx } from "@/lib/cleanMarkdown";

interface QuestionData {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOpt: string;
  answerDesc: string;
  difficulty: number;
  estimated_time: number | null;
  topics: { topicName: string };
  subjects: { subjectName: string };
  chapters: { chapterName: string };
  cognitiveLevel: { title: string };
  keywords: string;
}

interface ExportQuestionsToWordProps {
  questions: QuestionData[];
}

const getOptionText = (q: QuestionData): string => {
  switch (q.correctOpt) {
    case "1":
      return q.optionA;
    case "2":
      return q.optionB;
    case "3":
      return q.optionC;
    case "4":
      return q.optionD;
    default:
      return "Unknown";
  }
};

const ExportQuestionsToWord: React.FC<ExportQuestionsToWordProps> = ({ questions }) => {
  const exportToWord = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "AI-Generated Question Papper",
              heading: HeadingLevel.TITLE,
              alignment: "center",
            }),
            new Paragraph(""),
            ...questions.flatMap((q, index) => [
              new Paragraph({
                text: `Q${index + 1}: ${cleanMarkdownForDocx(q.question)}`,
                heading: HeadingLevel.HEADING_2,
              }),
              new Paragraph(`A) ${cleanMarkdownForDocx(q.optionA)}`),
              new Paragraph(`B) ${cleanMarkdownForDocx(q.optionB)}`),
              new Paragraph(`C) ${cleanMarkdownForDocx(q.optionC)}`),
              new Paragraph(`D) ${cleanMarkdownForDocx(q.optionD)}`),
              new Paragraph(""),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `✔ Correct Answer: ${getOptionText(q)}`,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph(""),
              new Paragraph({
                text: `📝 Explanation: ${cleanMarkdownForDocx(q.answerDesc)}`,
              }),
              new Paragraph(""),
              new Paragraph(`📚 Subject: ${q.subjects?.subjectName}`),
              new Paragraph(`📖 Chapter: ${q.chapters?.chapterName}`),
              new Paragraph(`🧠 Topic: ${q.topics?.topicName}`),
              new Paragraph(`🎯 Cognitive Level: ${q.cognitiveLevel?.title}`),
              new Paragraph(`⭐ Difficulty: ${["Easy", "Medium", "Hard"][q.difficulty - 1]}`),
              new Paragraph(`⏱ Estimated Time: ${q.estimated_time ?? "N/A"} min`),
              new Paragraph(`🔑 Keywords: ${q.keywords}`),
              new Paragraph(""),
              new Paragraph({
                children: [new TextRun({ break: 1 })],
              }),
            ]),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "questions.docx");
  };

  return (
    <Button
      variant="default"
      onClick={exportToWord}
      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 border border-gray-700 hover:border-blue-500"
    >
      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
      </svg>
      <span> Export to Word</span>
    </Button>
  );
};

export default ExportQuestionsToWord;
