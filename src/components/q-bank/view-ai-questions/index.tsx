"use client";

import { IGroupedAiQuestion } from "@/types/generate-questions";
import { getAllQuestions } from "@/utils/api/generate-questions";
import React, { useEffect, useState } from "react";
import GroupedQuestionCard from "./GroupedQuestionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { FileQuestion } from "lucide-react";

const ViewAiQuestions = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestionData] = useState<IGroupedAiQuestion[]>([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await getAllQuestions();
        // ✅ Safely assign data or fallback to empty array
        setQuestionData(result.success && Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        setQuestionData([]);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Question Groups</h1>
        <p className="text-muted-foreground">Browse and manage your generated question groups</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[220px] w-full rounded-xl" />
          ))}
        </div>
      ) : questions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {questions.map((group) => (
            <GroupedQuestionCard key={group.groupedUuid} group={group} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="bg-muted/30 p-6 rounded-full mb-4">
            <FileQuestion size={48} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Questions Found</h3>
          <p className="text-muted-foreground max-w-md">
            You have not&nbsp;generated any question groups yet. Generate questions to see them appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewAiQuestions;
