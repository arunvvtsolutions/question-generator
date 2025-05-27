"use client";
import { Button } from "@/components/ui/button";
import type { IChapterDetailsProps, ISubjectProps, ITopicDatas } from "@/types";
import { type FC, useState } from "react";
import CustomGenerateSelect, { type IOptionProps } from "../../common/CustomCheckList";
import * as Yup from "yup";
import { useFormik } from "formik";
import { generateQuestions } from "@/utils/api/generate-questions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type ITokenProps from "@/types/generate-questions";
import type { ICognitiveLevelProps } from "@/types/generate-questions";
import LoadingSpinner from "@/components/icons/LoadingSpinner";
import { CREATE_STUDY_PLAN } from "@/service/enums/texts";
import { Input } from "@/components/ui/input";
import FeedbackLoader from "../view-ai-questions/FeedbackLoader";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IGenerateQuesProps {
  chapters?: IChapterDetailsProps[];
  subjects?: ISubjectProps[];
  topics?: ITopicDatas[];
  cognitiveLevel: ICognitiveLevelProps[];
  tokenDetails?: ITokenProps;
}

export interface IGenerateQuestBodyProps {
  subjectIds: string;
  chapterIds: string;
  topicIds: string;
  questionLevels: string;
  totalQuestion: string;
  selectedCognitiveLevel: string;
  questionQuality: number;
  stream: string;
}

// Custom Quality Select Component
const QualitySelect = ({
  value,
  onValueChange,
  error,
}: {
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const qualityOptions = [
    { value: "basic", label: "Basic", credit: "0.5 Credit" },
    { value: "standard", label: "Standard", credit: "1 Credit" },
    { value: "premium", label: "Premium", credit: "2 Credits" },
    { value: "elite", label: "Elite", credit: "3 Credits" },
  ];

  const selectedOption = qualityOptions.find((option) => option.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500"
        )}
      >
        <span className={cn("text-gray-400", value && "text-foreground")}>
          {selectedOption ? selectedOption.label : "Choose Quality"}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          <div className="p-1">
            <div className="px-2 py-1.5 text-sm font-semibold">Quality Levels</div>
            {qualityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onValueChange(option.value);
                  setIsOpen(false);
                }}
                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex justify-between items-center w-full">
                  <span>{option.label}</span>
                  <span className="text-sm text-muted-foreground">{option.credit}</span>
                </div>
                {value === option.value && (
                  <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="h-4 w-4" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

const QUALITY_LEVEL_MAP: Record<string, number> = {
  basic: 1,
  standard: 2,
  premium: 3,
  elite: 4,
};

const GenerateQusForm: FC<IGenerateQuesProps> = ({ topics, chapters, subjects, cognitiveLevel, tokenDetails }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [subjectOptions, setSubjectOptions] = useState<IOptionProps[]>([
    { label: "All Subjects", value: "0" },
    ...(subjects?.map((sub) => ({
      label: sub.subjectName,
      value: String(sub.id),
    })) || []),
  ]);

  const [chapterOptions, setChapterOptions] = useState<IOptionProps[]>([]);
  const [topicOptions, setTopicOptions] = useState<IOptionProps[]>([]);

  const validationSchema = Yup.object({
    difficultLevel: Yup.string()
      .oneOf(["easy", "medium", "hard"], "Please select a valid difficulty level")
      .required("Difficulty level is required"),
    selectedStream: Yup.string()
      .oneOf(["Neet", "Jee", "Cbse"], "Please select a valid stream")
      .required("Stream is required"),
    questionQuality: Yup.string()
      .oneOf(["basic", "standard", "premium", "elite"], "Select a valid question quality")
      .required("Question quality is required"),
    selectedSubjects: Yup.array()
      .min(1, "Should Select atleast one Subject")
      .required("Should Select atleast one Subject"),
    selectedChapters: Yup.array()
      .min(1, "Should Select atleast one Chapters")
      .required("Should Select atleast one Chapters"),
    totalQuestions: Yup.number()
      .transform((value, originalValue) => (originalValue === "" ? undefined : value))
      .min(1, "At least 1 question needed")
      .max(200, "Cannot select more than 200 questions")
      .required("Total Questions is required"),

    selectedTopics: Yup.array().min(1, "Should Select at least one Topic").required("Should Select at least one Topic"),
    selectedCognitiveLevel: Yup.string().required("Please select a cognitive level."),
  });

  const formik = useFormik({
    initialValues: {
      difficultLevel: "",
      selectedSubjects: [],
      selectedChapters: [],
      selectedTopics: [],
      totalQuestions: "",
      activePyqs: false,
      selectedCognitiveLevel: "",
      selectedStream: "",
      questionQuality: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const data: IGenerateQuestBodyProps = {
          subjectIds: values.selectedSubjects.map((subject: IOptionProps) => subject.value).join(","),
          chapterIds: values.selectedChapters.map((chapter: IOptionProps) => chapter.value).join(","),
          topicIds: values.selectedTopics.map((topic: IOptionProps) => topic.value).join(","),
          questionLevels: values.difficultLevel,
          totalQuestion: values.totalQuestions,
          selectedCognitiveLevel: values.selectedCognitiveLevel,
          questionQuality: QUALITY_LEVEL_MAP[values.questionQuality] ?? 1,
          stream: values.selectedStream,
        };

        const res = await generateQuestions(data);
        if (res.success) {
          toast({
            title: "Questions generated",
            description: "Questions were successfully generated based on your selected options.",
          });

          router.push(`/view-ai-questions/${res.uuid}`);
        } else {
          throw new Error(typeof res.message === "string" ? res.message : "Question generation failed.");
        }
      } catch (error: any) {
        toast({
          title: "Error generating questions",
          description: error.message || "An unexpected error occurred while generating questions.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const getFilterSelectedValues = (selectedOpts: IOptionProps[], selectedValues: IOptionProps[]) => {
    return selectedValues.filter((value) => selectedOpts.some((opt) => opt.value === (value.optionalValue || "")));
  };

  const handleSubjectSelect = (selectedOpts: IOptionProps[]) => {
    const totalQues = Number(formik.values.totalQuestions);

    if (totalQues && selectedOpts.length > totalQues) {
      toast({
        title: `Limit Exceeded`,
        description: `Your question count is ${totalQues}. You can't select more than ${totalQues} subjects. To select more, increase the question count.`,
        variant: "destructive",
      });
      return;
    }

    formik.setFieldValue("selectedSubjects", selectedOpts);
    selectedOpts.length && formik.setFieldTouched("selectedSubjects", false);

    const updateSelectedChapter = getFilterSelectedValues(selectedOpts, formik.values.selectedChapters);
    formik.setFieldValue("selectedChapters", updateSelectedChapter);

    const chap: IOptionProps[] =
      chapters
        ?.filter((c) => selectedOpts.some((opt) => Number(opt.value) === c.subjectId))
        .map((c) => ({
          label: c.chapterName,
          value: String(c.id),
          optionalValue: c.subjectId,
        })) || [];

    setChapterOptions([{ label: "All Chapters", value: "0" }, ...chap]);
  };

  const handleChapterSelect = (selectedOpts: IOptionProps[]) => {
    const totalQues = Number(formik.values.totalQuestions);

    if (totalQues && selectedOpts.length > totalQues) {
      toast({
        title: `Limit Exceeded`,
        description: `Your question count is ${totalQues}. You can't select more than ${totalQues} chapters. To select more, increase the question count.`,
        variant: "destructive",
      });
      return;
    }

    formik.setFieldValue("selectedChapters", selectedOpts);
    selectedOpts.length && formik.setFieldTouched("selectedChapters", false);

    const updateSelectedTopics = getFilterSelectedValues(selectedOpts, formik.values.selectedTopics);
    formik.setFieldValue("selectedTopics", updateSelectedTopics);

    const filteredTopics: IOptionProps[] =
      topics
        ?.filter((t) => selectedOpts.some((opt) => Number(opt.value) === t.chapterId))
        .map((t) => ({
          label: t.topicName,
          value: String(t.id),
          optionalValue: t.chapterId,
        })) || [];

    setTopicOptions([{ label: "All Topics", value: "0" }, ...filteredTopics]);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <FeedbackLoader />
        </div>
      ) : (
        <div className="">
          <div className="w-full md:w-[600px] mx-auto flex flex-col justify-center items-center md:items-center mb-4 px-2">
            <h2 className="text-[22px] lg:text-[26px] font-bold text-gray-800 dark:text-white">
              {CREATE_STUDY_PLAN.HEADING || "Generate Question Paper"}
            </h2>
          </div>
          <div className="mt-5 mx-auto  p-[16px] lg:p-[28px] lg:pb-[23px] bg-[#Ffff] border-[1px] dark:bg-[#0E0E0E] shadow-none  w-full md:w-[600px] rounded-[16px] dark:border-transparent ">
            <div className="py-2 border-b mb-5">
              <h1 className="text-[18px] lg:text-[22px] font-semibold">{CREATE_STUDY_PLAN.GENERATE_QUES_FOM}</h1>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
              noValidate
            >
              <div className="w-full">
                <label htmlFor="totalQuestionsInput" className="lg:text-[15px] block text-[14px] mb-2">
                  Enter Total Questions
                </label>
                <Input
                  id="totalQuestionsInput"
                  type="number"
                  name="totalQuestions"
                  value={formik.values.totalQuestions}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      formik.setFieldValue("totalQuestions", "");
                    } else {
                      formik.setFieldValue("totalQuestions", Number(value));
                    }
                  }}
                  placeholder="Enter number of questions"
                  className="h-[48px] mt-[5px]"
                  min={1}
                />
                {formik.errors.totalQuestions && formik.touched.totalQuestions && (
                  <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-1 text-start">
                    {String(formik.errors.totalQuestions)}
                  </p>
                )}
              </div>

              <div className="space-y-1 mt-2">
                <label htmlFor="chatpers" className="lg:text-[15px] text-[14px] mb-2">
                  {CREATE_STUDY_PLAN.SELECT_SUBJECTS}
                </label>
                <CustomGenerateSelect
                  handleSelectChange={(selectedOpts) => handleSubjectSelect(selectedOpts)}
                  options={subjectOptions}
                  selectedValues={formik.values.selectedSubjects}
                  listHeight={100}
                  placeHolder={`Select Subjects ${
                    formik.values.selectedSubjects.length
                      ? `: ${
                          formik.values.selectedSubjects.some((value: any) => value.value === "0")
                            ? subjectOptions.length - 1
                            : formik.values.selectedSubjects.length
                        }`
                      : ""
                  }`}
                  error={
                    formik.touched.selectedSubjects && formik.errors.selectedSubjects
                      ? String(formik.errors.selectedSubjects)
                      : ""
                  }
                />
              </div>

              <div className="space-y-1 mt-2">
                <label htmlFor="chatpers" className="lg:text-[15px] text-[14px] mb-2">
                  {CREATE_STUDY_PLAN.SELECT_CHAPTERS}
                </label>
                <CustomGenerateSelect
                  handleSelectChange={(options) => handleChapterSelect(options)}
                  options={chapterOptions || []}
                  selectedValues={formik.values.selectedChapters}
                  listHeight={100}
                  placeHolder={`Select Chapters ${
                    formik.values.selectedChapters.length
                      ? `: ${
                          formik.values.selectedChapters.some((value: any) => value.value === "0")
                            ? chapterOptions.length - 1
                            : formik.values.selectedChapters.length
                        }`
                      : ""
                  }`}
                  error={
                    formik.touched.selectedChapters && formik.errors.selectedChapters
                      ? String(formik.errors.selectedChapters)
                      : ""
                  }
                />
              </div>

              <div className="space-y-1 mt-2">
                <label htmlFor="topics" className="lg:text-[15px] text-[14px] mb-2">
                  {CREATE_STUDY_PLAN.SELECT_TOPICS}
                </label>
                <CustomGenerateSelect
                  handleSelectChange={(selectedOpts) => {
                    const totalQues = Number(formik.values.totalQuestions);

                    if (totalQues && selectedOpts.length > totalQues) {
                      toast({
                        title: `Limit Exceeded`,
                        description: `Your question count is ${totalQues}. You can't select more than ${totalQues} topics. To select more, increase the question count.`,
                        variant: "destructive",
                      });
                      return;
                    }
                    formik.setFieldValue("selectedTopics", selectedOpts);
                  }}
                  options={topicOptions || []}
                  selectedValues={formik.values.selectedTopics}
                  listHeight={100}
                  placeHolder={`Select Topics ${
                    formik.values.selectedTopics.length
                      ? `: ${
                          formik.values.selectedTopics.some((value: any) => value.value === "0")
                            ? topicOptions.length - 1
                            : formik.values.selectedTopics.length
                        }`
                      : ""
                  }`}
                  error={
                    formik.touched.selectedTopics && formik.errors.selectedTopics
                      ? String(formik.errors.selectedTopics)
                      : ""
                  }
                />
              </div>

              <div className="w-full mb-6">
                <label htmlFor="difficulty" className="lg:text-[15px] block text-[14px] mb-2">
                  Stream
                </label>
                <Select
                  onValueChange={(value) => formik.setFieldValue("selectedStream", value)}
                  value={formik.values.selectedStream}
                >
                  <SelectTrigger className="w-full text-gray-400">
                    <SelectValue placeholder="Choose Stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Streams</SelectLabel>
                      <SelectItem value="Neet">NEET</SelectItem>
                      <SelectItem value="Jee">JEE</SelectItem>
                      <SelectItem value="Cbse">CBSE</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {formik.errors.selectedStream && formik.touched.selectedStream && (
                  <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-1 text-start">
                    {String(formik.errors.selectedStream)}
                  </p>
                )}
              </div>

              {/* Custom Question Quality Dropdown */}
              <div className="w-full mb-6">
                <label htmlFor="questionQuality" className="lg:text-[15px] block text-[14px] mb-2">
                  Question Quality
                </label>
                <QualitySelect
                  value={formik.values.questionQuality}
                  onValueChange={(value) => formik.setFieldValue("questionQuality", value)}
                  error={
                    formik.errors.questionQuality && formik.touched.questionQuality
                      ? String(formik.errors.questionQuality)
                      : undefined
                  }
                />
                {formik.errors.questionQuality && formik.touched.questionQuality && (
                  <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-1 text-start">
                    {String(formik.errors.questionQuality)}
                  </p>
                )}
              </div>
              <div className="w-full mb-6">
                <label htmlFor="difficulty" className="lg:text-[15px] block text-[14px] mb-2">
                  Select Difficulty Level
                </label>
                <Select
                  onValueChange={(value) => formik.setFieldValue("difficultLevel", value)}
                  value={formik.values.difficultLevel}
                >
                  <SelectTrigger className="w-full text-gray-400">
                    <SelectValue placeholder="Choose Difficulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Difficulty Level</SelectLabel>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {formik.errors.difficultLevel && formik.touched.difficultLevel && (
                  <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-1 text-start">
                    {String(formik.errors.difficultLevel)}
                  </p>
                )}
              </div>

              <div className="w-full mb-6">
                <label htmlFor="cognitiveLevel" className="lg:text-[15px] block text-[14px] mb-2">
                  Select Cognitive Level
                </label>
                <Select
                  onValueChange={(value) => formik.setFieldValue("selectedCognitiveLevel", value)}
                  value={formik.values.selectedCognitiveLevel}
                >
                  <SelectTrigger className="w-full text-gray-400">
                    <SelectValue placeholder="Choose Cognitive Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="">Cognitive Levels</SelectLabel>
                      {cognitiveLevel.map((level) => (
                        <SelectItem key={level.id} value={String(level.title)}>
                          {level.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {formik.errors.selectedCognitiveLevel && formik.touched.selectedCognitiveLevel && (
                  <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-1 text-start">
                    {String(formik.errors.selectedCognitiveLevel)}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="mt-4 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-9 px-4 py-6 rounded-[4px] bg-[#0B57D0] hover:bg-[#0B57D0] w-full text-[#fff]"
              >
                {loading && <LoadingSpinner />}{" "}
                <p className="ms-3">{loading ? CREATE_STUDY_PLAN.GENERATING : CREATE_STUDY_PLAN.GENERATE_QUES}</p>
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateQusForm;
