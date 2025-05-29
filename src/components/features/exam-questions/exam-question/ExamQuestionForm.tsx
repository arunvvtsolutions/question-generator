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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createExamTestQuestions } from "@/utils/api/(ai-related)/exam-question/exam-question";
import { IOptionTypeCommonProps } from "@/types/common/db-types";
import { SelectComboBox } from "@/components/SelectComboBox";
import { RootState, useSelector } from "@/store";

interface IQuestionLevel {
  easy: number;
  medium: number;
  hard: number;
  veryHard: number;
}

type DifficultyLevel = "easy" | "medium" | "hard" | "veryHard" | "";

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

// Yup validation schema
const validationSchema = Yup.object({
  testTitle: Yup.string()
    .min(1, "Test title is required")
    .required("Test title is required"),
  description: Yup.string()
    .min(1, "Description is required")
    .required("Description is required"),
  duration: Yup.number()
    .typeError("Duration must be a number")
    .positive("Duration must be greater than 0")
    .required("Duration is required"),
  noOfQuestions: Yup.number()
    .typeError("Number of questions must be a number")
    .positive("Number of questions must be greater than 0")
    .required("Number of questions is required"),
  selectedSubjects: Yup.array()
    .min(1, "Please select at least one subject")
    .required("Please select at least one subject"),
  questionType: Yup.string()
    .min(1, "Question Type is required")
    .required("Question Type is required"),
  aiModel: Yup.string()
    .min(1, "AI Model is required")
    .required("AI Model is required"),
  examSelection: Yup.string()
    .min(1, "Exam is required")
    .required("Exam is required"),
  selectedChapters: Yup.array()
    .min(1, "Please select at least one chapter")
    .required("Please select at least one chapter"),
  selectedTopics: Yup.array()
    .min(1, "Please select at least one topic")
    .required("Please select at least one topic"),
});

const getQuestionDistribution = (
  totalQuestions: number,
  selectedDifficulty: DifficultyLevel
): IQuestionLevel => {
  let percentages: { [key in keyof IQuestionLevel]: number };

  switch (selectedDifficulty) {
    case "easy":
      percentages = {
        easy: 0.5, // 50%
        medium: 0.3, // 30%
        hard: 0.15, // 15%
        veryHard: 0.05, // 5%
      };
      break;
    case "medium":
      percentages = {
        easy: 0.2, // 20%
        medium: 0.5, // 50%
        hard: 0.2, // 20%
        veryHard: 0.1, // 10%
      };
      break;
    case "hard":
      percentages = {
        easy: 0.1, // 10%
        medium: 0.2, // 20%
        hard: 0.5, // 50%
        veryHard: 0.2, // 20%
      };
      break;
    case "veryHard":
      percentages = {
        easy: 0.05, // 5%
        medium: 0.15, // 15%
        hard: 0.3, // 30%
        veryHard: 0.5, // 50%
      };
      break;
    default:
      percentages = {
        easy: 0.25,
        medium: 0.25,
        hard: 0.25,
        veryHard: 0.25,
      };
  }

  // Calculate initial distribution using floor to prevent overallocation
  const distribution: IQuestionLevel = {
    easy: Math.floor(totalQuestions * percentages.easy),
    medium: Math.floor(totalQuestions * percentages.medium),
    hard: Math.floor(totalQuestions * percentages.hard),
    veryHard: Math.floor(totalQuestions * percentages.veryHard),
  };

  // Calculate how many questions still need to be allocated
  const currentTotal = Object.values(distribution).reduce((sum, val) => sum + val, 0);
  let remaining = totalQuestions - currentTotal;

  // Distribute remaining questions based on highest decimal remainder
  const remainders = Object.entries(percentages).map(([key, percentage]) => ({
    key,
    remainder: (totalQuestions * percentage) % 1,
  }));

  // Sort by remainder in descending order
  remainders.sort((a, b) => b.remainder - a.remainder);

  // Distribute remaining questions
  for (let i = 0; i < remaining; i++) {
    const key = remainders[i % remainders.length].key as keyof IQuestionLevel;
    distribution[key]++;
  }

  return distribution;
};

const ExamQuestionForm: FC<IMainExamQuestionProps> = ({
  topics,
  chapters,
  subjects,
  streams,
  questionTypes,
  aiModels,
  cognitiveLevel,
}) => {
  console.log(aiModels);
  const { user } = useSelector((state: RootState) => state.authReducer);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyLevel>("");
  const [streamOptions, setStreamOptions] =
    React.useState<IOptionTypeCommonProps[]>();
  const [questionTypeOptions, setQuestionTypeOptions] =
    useState<IOptionTypeCommonProps[]>();
  const [aiModelOptions, setAiModelOptions] =
    useState<IOptionTypeCommonProps[]>();

  console.log(aiModelOptions);

  useEffect(() => {
    if (questionTypes && questionTypes.length > 0) {
      const options = questionTypes.map((type) => ({
        label: type.questionType,
        value: type.id.toString(),
      }));
      setQuestionTypeOptions(options);
    }
  }, [questionTypes]);

  useEffect(() => {
    if (aiModels && aiModels.length > 0) {
      const options = aiModels.map((model) => ({
        label: model.name,
        value: model.id.toString(),
      }));
      setAiModelOptions(options);
    }
  }, [aiModels]);

  useEffect(() => {
    if (streams && streams.length > 0) {
      const options = streams.map((stream) => ({
        label: stream.streamName,
        value: stream.id.toString(),
      }));
      setStreamOptions(options);
    }
  }, [streams]);
  console.log(streamOptions);
  console.log(questionTypeOptions);

  const [levels, setLevels] = useState<IQuestionLevel>();

  const subjectOptions: IValueProps[] = subjects.map((subject) => ({
    label: subject.subjectName,
    value: subject.id.toString(),
    group: "Subjects",
  }));

  const getChapterOptions = (selectedSubjects: IValueProps[]) => {
    const filteredChapters = chapters.filter((chapter) =>
      selectedSubjects.some(
        (subject) => subject.value === chapter.subjectId.toString()
      )
    );

    return filteredChapters.map((chapter) => {
      const subject = subjects.find((s) => s.id === chapter.subjectId);
      return {
        label: `${chapter.chapterName} (${
          subject?.subjectName || "Unknown Subject"
        })`,
        value: chapter.id.toString(),
        group: subject?.subjectName || "Other",
      };
    });
  };

  const getTopicOptions = (selectedChapters: IValueProps[]) => {
    const filteredTopics = topics.filter((topic) =>
      selectedChapters.some(
        (chapter) => chapter.value === topic.chapterId.toString()
      )
    );

    return filteredTopics.map((topic) => {
      const chapter = chapters.find((c) => c.id === topic.chapterId);
      return {
        label: `${topic.topicName} (${
          chapter?.chapterName || "Unknown Chapter"
        })`,
        value: topic.id.toString(),
        group: chapter?.chapterName || "Other",
      };
    });
  };

  // Initial form values
  const initialValues = {
    aiModel: "",
    testTitle: "",
    description: "",
    examSelection: "",
    duration: "",
    noOfQuestions: "",
    questionType: "",
    selectedSubjects: [] as IValueProps[],
    selectedChapters: [] as IValueProps[],
    selectedTopics: [] as IValueProps[],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setLoading(true);

          // Create questions array with the required structure
          const questions = values.selectedSubjects.map((subject) => ({
            subjectId: parseInt(subject.value),
            chapters: values.selectedChapters
              .filter(
                (chapter) =>
                  chapters
                    .find((c) => c.id.toString() === chapter.value)
                    ?.subjectId.toString() === subject.value
              )
              .map((chapter) => ({
                chapterId: parseInt(chapter.value),
                topics: values.selectedTopics
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
          const cleanedQuestions = questions
            .map((subject) => ({
              subjectId: subject.subjectId,
              chapters: subject.chapters.filter(
                (chapter) => chapter.topics && chapter.topics.length > 0
              ),
            }))
            .filter((subject) => subject.chapters.length > 0);
          if (!user?.id) return;
          const payload = {
            userId: user.id,
            examId: parseInt(values.examSelection),
            questionId: parseInt(values.questionType),
            aiModelId: parseInt(values.aiModel),
            testTitle: values.testTitle,
            description: values.description,
            level: 1,
            duration: parseInt(values.duration),
            noOfQuestions: parseInt(values.noOfQuestions),
            questions: cleanedQuestions,
            levels,
          };

          await createExamTestQuestions(payload);
          console.log("payload", payload);
          toast({
            title: "Success",
            description: "Question paper created successfully",
          });
          router.push("/exam-list");
        } catch (error) {
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <>
          {loading ? (
            <div className="flex items-center justify-center">
              <FeedbackLoader />
            </div>
          ) : (
            <div className="w-full mt-5 mx-auto p-6 bg-[#Ffff] border-[1px] dark:bg-[#0E0E0E] rounded-[16px] dark:border-transparent">
              <div className="py-3 border-b mb-8">
                <h1 className="text-[20px] lg:text-[24px] font-semibold text-gray-800 dark:text-white">
                  Create the Question Paper
                </h1>
              </div>

              <Form className="space-y-6">
                <div className="flex flex-col xl:flex-row justify-between gap-12">
                  {/* Left Section - Form Fields */}
                  <div className="flex-1 space-y-6 lg:pr-8 lg:border-r border-gray-200 dark:border-gray-700">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Test Title
                      </label>
                      <Field
                        name="testTitle"
                        as={Input}
                        placeholder="Enter test title"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="testTitle"
                        component="p"
                        className="text-xs text-red-500 mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Description
                      </label>
                      <Field
                        name="description"
                        as={Input}
                        placeholder="Enter test description"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="description"
                        component="p"
                        className="text-xs text-red-500 mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Duration (minutes)
                        </label>
                        <Field
                          name="duration"
                          type="number"
                          as={Input}
                          className="w-full"
                        />
                        <ErrorMessage
                          name="duration"
                          component="p"
                          className="text-xs text-red-500 mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          No. of Questions
                        </label>
                        <Field
                          name="noOfQuestions"
                          type="number"
                          as={Input}
                          className="w-full"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const value = e.target.value;
                            setFieldValue("noOfQuestions", value);
                            const total = parseInt(value);
                            if (!isNaN(total)) {
                              setLevels(
                                getQuestionDistribution(
                                  total,
                                  selectedDifficulty
                                )
                              );
                            }
                          }}
                        />
                        <ErrorMessage
                          name="noOfQuestions"
                          component="p"
                          className="text-xs text-red-500 mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Exam Selection
                        </label>
                        <SelectComboBox
                          onChange={(value) =>
                            setFieldValue("examSelection", value)
                          }
                          options={streamOptions || []}
                          value={values.examSelection}
                          showSearch
                          placeholder="Select exam"
                        />
                        <ErrorMessage
                          name="examSelection"
                          component="p"
                          className="text-xs text-red-500 mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Select Question Type
                        </label>
                        <SelectComboBox
                          onChange={(value) =>
                            setFieldValue("questionType", value)
                          }
                          options={questionTypeOptions || []}
                          value={values.questionType}
                          showSearch
                          placeholder="Select question type"
                        />
                        <ErrorMessage
                          name="questionType"
                          component="p"
                          className="text-xs text-red-500 mt-1"
                        />
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium mb-2">
                          Select AI Model
                        </label>
                        <SelectComboBox
                          onChange={(value) => setFieldValue("aiModel", value)}
                          options={aiModelOptions || []}
                          value={values.aiModel}
                          showSearch
                          placeholder="Select AI Model"
                        />
                        <ErrorMessage
                          name="aiModel"
                          component="p"
                          className="text-xs text-red-500 mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Subjects
                      </label>
                      <MultiSelect
                        options={subjectOptions}
                        selectedValues={values.selectedSubjects}
                        handleSelectChange={(newValues) =>
                          setFieldValue("selectedSubjects", newValues)
                        }
                        placeHolder="Select subjects"
                      />
                      <ErrorMessage
                        name="selectedSubjects"
                        component="p"
                        className="text-xs text-red-500 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Chapters
                      </label>
                      <MultiSelect
                        options={getChapterOptions(values.selectedSubjects)}
                        selectedValues={values.selectedChapters}
                        handleSelectChange={(newValues) => {
                          setFieldValue("selectedChapters", newValues);
                          // Clear topics when chapters change
                          setFieldValue("selectedTopics", []);
                        }}
                        placeHolder="Select chapters by subject"
                        isSearch
                        isGrouped
                      />
                      <ErrorMessage
                        name="selectedChapters"
                        component="p"
                        className="text-xs text-red-500 mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Topics
                      </label>

                      <MultiSelect
                        options={getTopicOptions(values.selectedChapters)}
                        selectedValues={values.selectedTopics}
                        handleSelectChange={(newValues) =>
                          setFieldValue("selectedTopics", newValues)
                        }
                        placeHolder="Select topics by chapter"
                        isSearch
                        isGrouped
                      />
                      <ErrorMessage
                        name="selectedTopics"
                        component="p"
                        className="text-xs text-red-500 mt-1"
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
                          const total = parseInt(values.noOfQuestions);
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
                      // disabled={
                      //   isSubmitting ||
                      //   levels.easy +
                      //     levels.medium +
                      //     levels.hard +
                      //     levels.veryHard !==
                      //     parseInt(values.noOfQuestions)
                      // }
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
                  {levels && (
                    <div className="flex-1 lg:flex-[0.6] space-y-6 py-6 bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm mt-8 lg:mt-0">
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
                              {levels?.easy} questions
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
                              {levels?.medium} questions
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
                              {levels?.hard} questions
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
                              {levels?.veryHard} questions
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
                        <span className="text-sm font-medium">
                          Total Questions
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            levels.easy +
                              levels.medium +
                              levels.hard +
                              levels.veryHard !==
                            parseInt(values.noOfQuestions)
                              ? "text-red-500"
                              : ""
                          }`}
                        >
                          {levels.easy +
                            levels.medium +
                            levels.hard +
                            levels.veryHard}{" "}
                          / {values.noOfQuestions}
                        </span>
                      </div>
                      {levels.easy +
                        levels.medium +
                        levels.hard +
                        levels.veryHard !==
                        parseInt(values.noOfQuestions) && (
                        <p className="text-xs text-red-500 mt-1">
                          Total questions must match the specified number of
                          questions
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </Form>
            </div>
          )}
        </>
      )}
    </Formik>
  );
};

export default ExamQuestionForm;
