'use client';
import { useEffect, useState } from 'react';
import QuestionTable from './QuestionTable';
import { viewGeneratedQuestions } from '@/utils/api/generate-questions';

export interface IViewGeneratedQsts {
  subjectIds: string;
  subjectNames: string;
  uuid: string;
  addedDate: string;
  examId: number;
  didExamAttend: 1 | 0 | null;
  examName: string;
}

const GeneratedQuestions = () => {
  const [generatedQsts, setGeneratedQsts] = useState<IViewGeneratedQsts[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await viewGeneratedQuestions();
      data.success && setGeneratedQsts(data.data);
      setLoading(false);
    };
    getData();
  }, []);
  return (
    <div className="p-5 lg:px-[100px] ">
      <h3 className="text-[#101010] dark:text-[#fff] font-semibold text-[24px] mb-5">
        Generated Questions
      </h3>
      <QuestionTable data={generatedQsts || []} loading={loading} />
    </div>
  );
};

export default GeneratedQuestions;
