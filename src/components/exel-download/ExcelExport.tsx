"use client";

import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IAiQuestionsProps } from "@/types/generate-questions";
import { Button } from "../ui/button";

interface WorksheetData {
  name: string;
  data: IAiQuestionsProps[];
}

interface ExcelExportProps {
  filename: string;
  worksheets: WorksheetData[];
}

const cleanMarkdownForDocx = (text: string | undefined): string => {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // bold
    .replace(/\*(.*?)\*/g, "$1") // italic
    .replace(/`(.*?)`/g, "$1") // inline code
    .replace(/~~(.*?)~~/g, "$1") // strikethrough
    .replace(/#/g, "") // remove markdown headings
    .trim();
};
function s2ab(s: string) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}

const ExcelExport: React.FC<ExcelExportProps> = ({ filename, worksheets }) => {
  const handleExport = () => {
    const workbook = XLSX.utils.book_new();

    worksheets.forEach(({ name, data }) => {
      const formattedData = data.map((row) => ({
        ID: row.id,
        Question: cleanMarkdownForDocx(row.question),
        "Option 1": cleanMarkdownForDocx(row.optionA),
        "Option 2": cleanMarkdownForDocx(row.optionB),
        "Option 3": cleanMarkdownForDocx(row.optionC),
        "Option 4": cleanMarkdownForDocx(row.optionD),
        "Correct Option": row.correctOpt,
        "Answer Description": cleanMarkdownForDocx(row.answerDesc),
        Difficulty: row.difficulty === 1 ? "Easy" : row.difficulty === 2 ? "Medium" : "Hard",
        "Estimated Time (min)": row.estimated_time,
        Subject: row.subjects?.subjectName || "",
        Chapter: row.chapters?.chapterName || "",
        Topic: row.topics?.topicName || "",
        "Cognitive Level": row.cognitiveLevel?.title || "",
        Keywords: row.keywords || "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, name);
    });

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    const blob = new Blob([s2ab(excelBuffer)], { type: "application/octet-stream" });
    saveAs(blob, filename);
  };

  return (
    <Button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
    >
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16.5,12C19,12 21,14 21,16.5C21,17.38 20.75,18.21 20.31,18.9L23.39,22L22,23.39L18.88,20.32C18.19,20.75 17.37,21 16.5,21C14,21 12,19 12,16.5C12,14 14,12 16.5,12M16.5,14A2.5,2.5 0 0,0 14,16.5A2.5,2.5 0 0,0 16.5,19A2.5,2.5 0 0,0 19,16.5A2.5,2.5 0 0,0 16.5,14M6,2C4.89,2 4,2.89 4,4V16H6V4H13V9H18V12.34C18.66,12.12 19.32,12 20,12V8L14,2H6Z" />
      </svg>
      <span>Excel Download</span>
    </Button>
  );
};

export default ExcelExport;
