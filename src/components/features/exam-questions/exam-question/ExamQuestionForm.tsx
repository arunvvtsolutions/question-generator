"use client";
import { Button } from "@/components/ui/button";
import { IChapterDetailsProps, ISubjectProps, ITopicDatas } from "@/types";
import React, { FC, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/icons/LoadingSpinner";
import { CREATE_STUDY_PLAN } from "@/service/enums/texts";
import FeedbackLoader from "@/components/q-bank/view-ai-questions/FeedbackLoader";
import { IMainExamQuestionProps } from ".";
import MultiSelect, { IValueProps } from "@/components/common/MultiSelect";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { createExamTestQuestions } from "@/utils/api/exam-question/exam-question";

interface IQuestionLevel {
  easy: number;
  medium: number;
  hard: number;
  veryHard: number;
}

type DifficultyLevel = "easy" | "medium" | "hard" | "veryHard";

const difficultyLevels = [
  {
    label: "Easy",
    value: "easy",
    description: "50% Easy, 30% Medium, 15% Hard, 5% Very Hard",
  },
  {
    label: "Medium",
    value: "medium",
    description: "20% Easy, 50% Medium, 20% Hard, 10% Very Hard",
  },
  {
    label: "Hard",
    value: "hard",
    description: "10% Easy, 20% Medium, 50% Hard, 20% Very Hard",
  },
  {
    label: "Very Hard",
    value: "veryHard",
    description: "5% Easy, 15% Medium, 30% Hard, 50% Very Hard",
  },
];

const getQuestionDistribution = (
  totalQuestions: number,
  selectedDifficulty: DifficultyLevel
): IQuestionLevel => {
  let distribution: IQuestionLevel;

  switch (selectedDifficulty) {
    case "easy":
      distribution = {
        easy: Math.round(totalQuestions * 0.5), // 50%
        medium: Math.round(totalQuestions * 0.3), // 30%
        hard: Math.round(totalQuestions * 0.15), // 15%
        veryHard: Math.round(totalQuestions * 0.05), // 5%
      };
      break;
    case "medium":
      distribution = {
        easy: Math.round(totalQuestions * 0.2), // 20%
        medium: Math.round(totalQuestions * 0.5), // 50%
        hard: Math.round(totalQuestions * 0.2), // 20%
        veryHard: Math.round(totalQuestions * 0.1), // 10%
      };
      break;
    case "hard":
      distribution = {
        easy: Math.round(totalQuestions * 0.1), // 10%
        medium: Math.round(totalQuestions * 0.2), // 20%
        hard: Math.round(totalQuestions * 0.5), // 50%
        veryHard: Math.round(totalQuestions * 0.2), // 20%
      };
      break;
    case "veryHard":
      distribution = {
        easy: Math.round(totalQuestions * 0.05), // 5%
        medium: Math.round(totalQuestions * 0.15), // 15%
        hard: Math.round(totalQuestions * 0.3), // 30%
        veryHard: Math.round(totalQuestions * 0.5), // 50%
      };
      break;
    default:
      distribution = {
        easy: Math.round(totalQuestions * 0.25),
        medium: Math.round(totalQuestions * 0.25),
        hard: Math.round(totalQuestions * 0.25),
        veryHard: Math.round(totalQuestions * 0.25),
      };
  }

  // Adjust to ensure total matches exactly
  const currentTotal =
    distribution.easy +
    distribution.medium +
    distribution.hard +
    distribution.veryHard;
  const diff = totalQuestions - currentTotal;

  if (diff !== 0) {
    // Add or subtract the difference from the primary category for the selected difficulty
    switch (selectedDifficulty) {
      case "easy":
        distribution.easy += diff;
        break;
      case "medium":
        distribution.medium += diff;
        break;
      case "hard":
        distribution.hard += diff;
        break;
      case "veryHard":
        distribution.veryHard += diff;
        break;
    }
  }

  return distribution;
};
const ExamQuestionForm: FC<IMainExamQuestionProps> = ({
  topics,
  chapters,
  subjects,
  cognitiveLevel,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<IValueProps[]>([]);
  const [selectedChapters, setSelectedChapters] = useState<IValueProps[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<IValueProps[]>([]);
  const [testTitle, setTestTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("30");
  const [noOfQuestions, setNoOfQuestions] = useState("10");
  const [level, setLevel] = useState("1");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyLevel>("medium");
  const [levels, setLevels] = useState<IQuestionLevel>({
    easy: 2,
    medium: 2,
    hard: 4,
    veryHard: 2,
  });

  const subjectOptions: IValueProps[] = subjects.map((subject) => ({
    label: subject.subjectName,
    value: subject.id.toString(),
  }));

  const filteredChapters = chapters.filter((chapter) =>
    selectedSubjects.some(
      (subject) => subject.value === chapter.subjectId.toString()
    )
  );

  const chapterOptions: IValueProps[] = filteredChapters.map((chapter) => ({
    label: chapter.chapterName,
    value: chapter.id.toString(),
  }));

  const filteredTopics = topics.filter((topic) =>
    selectedChapters.some(
      (chapter) => chapter.value === topic.chapterId.toString()
    )
  );

  const topicOptions: IValueProps[] = filteredTopics.map((topic) => ({
    label: topic.topicName,
    value: topic.id.toString(),
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(e, "form submit");
    
    if (!testTitle) {
      toast({
        title: "Error",
        description: "Please enter test title",
        variant: "destructive",
      });
      return;
    }

    if (selectedSubjects.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one subject",
        variant: "destructive",
      });
      return;
    }
    if (selectedChapters.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one chapter",
        variant: "destructive",
      });
      return;
    }
    if (selectedTopics.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one topic",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Create questions array with the required structure
      const questions = selectedSubjects.map((subject) => ({
        subjectId: parseInt(subject.value),
        chapters: selectedChapters
          .filter(
            (chapter) =>
              chapters
                .find((c) => c.id.toString() === chapter.value)
                ?.subjectId.toString() === subject.value
          )
          .map((chapter) => ({
            chapterId: parseInt(chapter.value),
            topics: selectedTopics
              .filter(
                (topic) =>
                  topics
                    .find((t) => t.id.toString() === topic.value)
                    ?.chapterId.toString() === chapter.value
              )
              .map((topic) => ({ topicId: parseInt(topic.value) })),
          })),
      }));

      // Clean up chapters by removing those with empty topics
      const cleanedQuestions = questions.map(subject => ({
        subjectId: subject.subjectId,
        chapters: subject.chapters.filter(chapter => {
          // Only include chapters that either have no topics array or have non-empty topics
          return !chapter.topics || chapter.topics.length > 0;
        })
      })).filter(subject => subject.chapters.length > 0); // Remove subjects with no chapters

      const payload = {
        testTitle,
        description,
        streamId: 2,
        userId: 365,
        level: 1,
        duration: parseInt(duration),
        noOfQuestions: parseInt(noOfQuestions),
        questions: cleanedQuestions,
        levels,
      };
      await createExamTestQuestions(payload);
      console.log(payload);
      toast({
        title: "Success",
        description: "Question paper created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <FeedbackLoader />
        </div>
      ) : (
        <div className="w-[85%] mt-5 mx-auto p-6 bg-[#Ffff] border-[1px] dark:bg-[#0E0E0E]  rounded-[16px] dark:border-transparent">
          <div className="py-3 border-b mb-8">
            <h1 className="text-[20px] lg:text-[24px] font-semibold text-gray-800 dark:text-white">
              Create the Question Paper
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-12">
              {/* Left Section - Form Fields */}
              <div className="space-y-6 w-[60%] pr-8 border-r border-gray-200 dark:border-gray-700">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Test Title
                  </label>
                  <Input
                    value={testTitle}
                    onChange={(e) => setTestTitle(e.target.value)}
                    placeholder="Enter test title"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter test description"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Duration (minutes)
                    </label>
                    <Input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      No. of Questions
                    </label>
                    <Input
                      type="number"
                      value={noOfQuestions}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNoOfQuestions(value);
                        const total = parseInt(value);
                        if (!isNaN(total)) {
                          setLevels(
                            getQuestionDistribution(total, selectedDifficulty)
                          );
                        }
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subjects
                    </label>
                    <MultiSelect
                      options={subjectOptions}
                      selectedValues={selectedSubjects}
                      handleSelectChange={setSelectedSubjects}
                      placeHolder="Select subjects"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Chapters
                  </label>
                  <MultiSelect
                    options={chapterOptions}
                    selectedValues={selectedChapters}
                    handleSelectChange={setSelectedChapters}
                    placeHolder="Select chapters"
                    isSearch
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Topics
                  </label>
                  <MultiSelect
                    options={topicOptions}
                    selectedValues={selectedTopics}
                    handleSelectChange={setSelectedTopics}
                    placeHolder="Select topics"
                    isSearch
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Difficulty Level
                  </label>
                  <Select
                    value={selectedDifficulty}
                    onValueChange={(value: DifficultyLevel) => {
                      setSelectedDifficulty(value);
                      const total = parseInt(noOfQuestions);
                      if (!isNaN(total)) {
                        setLevels(getQuestionDistribution(total, value));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty">
                        {selectedDifficulty &&
                          difficultyLevels.find(
                            (l) => l.value === selectedDifficulty
                          )?.label}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyLevels.map((level) => (
                        <SelectItem
                          key={level.value}
                          value={level.value}
                          textValue={level.label}
                        >
                          <div className="flex flex-col gap-1">
                            <div className="font-medium">{level.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {level.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#0B57D0] hover:bg-[#0B57D0]/90 text-white font-medium py-2.5 rounded-lg transition-colors"
                  disabled={
                    loading ||
                    levels.easy +
                      levels.medium +
                      levels.hard +
                      levels.veryHard !==
                      parseInt(noOfQuestions)
                  }
                >
                  {loading && <LoadingSpinner />}
                  <span className="ms-3">
                    {loading
                      ? CREATE_STUDY_PLAN.GENERATING
                      : CREATE_STUDY_PLAN.GENERATE_QUES}
                  </span>
                </Button>
              </div>
              {/* Right Section - Distribution */}
              <div className="space-y-6 py-6 w-[40%] bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Question Distribution
                </h3>

                <div className="space-y-4">
                  {/* Easy Questions */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          Easy (
                          {selectedDifficulty === "easy"
                            ? "50"
                            : selectedDifficulty === "medium"
                            ? "20"
                            : selectedDifficulty === "hard"
                            ? "10"
                            : "5"}
                          %)
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {levels.easy} questions
                      </span>
                    </div>
                    <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{
                          width:
                            selectedDifficulty === "easy"
                              ? "50%"
                              : selectedDifficulty === "medium"
                              ? "20%"
                              : selectedDifficulty === "hard"
                              ? "10%"
                              : "5%",
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Medium Questions */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          Medium (
                          {selectedDifficulty === "easy"
                            ? "30"
                            : selectedDifficulty === "medium"
                            ? "50"
                            : selectedDifficulty === "hard"
                            ? "20"
                            : "15"}
                          %)
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {levels.medium} questions
                      </span>
                    </div>
                    <div className="w-full h-2 bg-yellow-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 transition-all duration-300"
                        style={{
                          width:
                            selectedDifficulty === "easy"
                              ? "30%"
                              : selectedDifficulty === "medium"
                              ? "50%"
                              : selectedDifficulty === "hard"
                              ? "20%"
                              : "15%",
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Hard Questions */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          Hard (
                          {selectedDifficulty === "easy"
                            ? "15"
                            : selectedDifficulty === "medium"
                            ? "20"
                            : selectedDifficulty === "hard"
                            ? "50"
                            : "30"}
                          %)
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {levels.hard} questions
                      </span>
                    </div>
                    <div className="w-full h-2 bg-red-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 transition-all duration-300"
                        style={{
                          width:
                            selectedDifficulty === "easy"
                              ? "15%"
                              : selectedDifficulty === "medium"
                              ? "20%"
                              : selectedDifficulty === "hard"
                              ? "50%"
                              : "30%",
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Very Hard Questions */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          Very Hard (
                          {selectedDifficulty === "easy"
                            ? "5"
                            : selectedDifficulty === "medium"
                            ? "10"
                            : selectedDifficulty === "hard"
                            ? "20"
                            : "50"}
                          %)
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {levels.veryHard} questions
                      </span>
                    </div>
                    <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 transition-all duration-300"
                        style={{
                          width:
                            selectedDifficulty === "easy"
                              ? "5%"
                              : selectedDifficulty === "medium"
                              ? "10%"
                              : selectedDifficulty === "hard"
                              ? "20%"
                              : "50%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t mt-4">
                  <span className="text-sm font-medium">Total Questions</span>
                  <span
                    className={`text-sm font-medium ${
                      levels.easy +
                        levels.medium +
                        levels.hard +
                        levels.veryHard !==
                      parseInt(noOfQuestions)
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {levels.easy +
                      levels.medium +
                      levels.hard +
                      levels.veryHard}{" "}
                    / {noOfQuestions}
                  </span>
                </div>
                {levels.easy + levels.medium + levels.hard + levels.veryHard !==
                  parseInt(noOfQuestions) && (
                  <p className="text-xs text-red-500 mt-1">
                    Total questions must match the specified number of questions
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ExamQuestionForm;
