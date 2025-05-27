"use client";
import React, { useEffect, useRef, useState } from "react";
import QuestionCard from "./questions/QuestionCard";
import OptionCard from "./questions/OptionCard";
import SubjectComponent from "./subjects";
import Footer from "./Footer";
import dynamic from "next/dynamic";
import MobileNextButtons from "./MobileNextButtons";
import Timer from "./Timer";
import TopBar from "./TopBar";
import { IExamUpdatesProps, IMcqQuestionProps, IResumedExamProps, IUpdateExamProps } from "@/types/exam";
import { toast } from "../ui/use-toast";
import {
  getExamData,
  leaveCumulativeExam,
  resumeCumulativeExam,
  resumeExam,
  submitCumulativeExam,
  submitExam,
  updateAnswer,
  updateCumulativeAnswer,
} from "@/utils/api/exam";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "@/store";
import { getExamDataSuccess, getExamQuestionSuccess } from "@/store/slices/exam";
import ExamSkelton from "./examSkelton";
import WarningModal from "./modals/WarningModal";
import { getLocalStorage, setLocalStorage } from "@/utils";
import { LOCAL_STORAGE } from "@/service/enums/localStorage";
import { EXAM_TYPE_SHORTURLS } from "@/service/enums/texts";
const SubmitModal = dynamic(() => import("./modals/SubmitModal"));
const LeaveModal = dynamic(() => import("./modals/LeaveModal"));
const MobileSubjectSheet = dynamic(() => import("./subjects/MobileSubjectSheet"));

const ExamComponent = () => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const examId = params.shortUrls[0];
  const studyPlanId = params.shortUrls[1];
  const userDetailsString = localStorage.getItem(LOCAL_STORAGE.USER_DETAILS);
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const userId = userDetails?.id;
  const router = useRouter();
  const warningRef = useRef(false);

  const { isAuthenticated, isInitialized } = useSelector((state) => state.authReducer);
  const { questions, examData } = useSelector((state) => state.examReducer);
  
  const [questionLoading, setQuestionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openSheet, setOpenSheet] = useState(false);
  const [subjectIndex, setSubjectIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isBookMarked, setIsBookmarked] = useState(false);
  const [markForReviewStatus, setMarkForReview] = useState(false);
  const [examResponses, setExamResponses] = useState<IExamUpdatesProps[]>([]);
  const [qstStartTime, setQstStartTime] = useState<Date>(new Date());
  const [selectedAns, setSelectedAns] = useState<string>("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [showWarningCount, setShowWarningCount] = useState(0);
  const [disableSubmitButtons, setDisableSubmitBtn] = useState(false);
  const [loadingAllBtns, setSetLoadingAllBts] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleRedirct = () => {
    const redirectUrl = `/exams/result-analysis/${params.shortUrls[0]}/${params.shortUrls[1] || ""}`;
    router.push(redirectUrl);
  };

  // disable options for maxQuestions
  const handleMaxQstWarnging = (section: string, subject: string) => {
    toast({
      title: "Cannot answer this Question",
      description: `You have already answered the maximum number of questions in this ${subject} and ${section}. Please continue with other subjects or sections.`,
      variant: "destructive",
      role: "alertdialog",
    });
  };

  // bookmark handler
  const handleBookMark = async (status: boolean, secId: number, sId: number, qId: number) => {
    setIsBookmarked(status);
    !status
      ? toast({
          variant: "destructive",
          title: "Book Mark removed",
          description: "Your Bookmark is removed",
        })
      : toast({
          title: "Book Mark Added",
          description: "Your Bookmark is Added",
        });
    await updateExamResponse({ secId, sId, qId, bm: status });
  };

  const handleMarkForReview = async (status: boolean, secId: number, sId: number, qId: number) => {
    setSetLoadingAllBts(true);
    setMarkForReview(status);
    !status
      ? toast({
          variant: "destructive",
          title: "UnMark for Review",
          description: "Question is Removed from review",
        })
      : toast({
          title: "Mark for review",
          description: "Question is Added for Review",
        });
    handleNext(1);
    await updateExamResponse({ secId, sId, qId, mr: status, ans: selectedAns });
    setSetLoadingAllBts(false);
  };

  // updating current qst ans bookmark status review status
  const updateStaus = (examRes: IExamUpdatesProps | undefined) => {
    if (examRes) {
      setSelectedAns(examRes.ans || "");
      setIsBookmarked(examRes.bm);
      setMarkForReview(examRes.mr);
    } else {
      setSelectedAns("");
      setIsBookmarked(false);
      setMarkForReview(false);
    }
  };

  // set selected ans
  const updateSelectedAns = (secId: number, sId: number, qId: number) => {
    const examRes = examResponses.find((exam) => exam.secId === secId && exam.sId === sId && exam.qId === qId);
    updateStaus(examRes);
  };

  const updateExamResponse = async (exmRes: IUpdateExamProps) => {
    // total time in seconds
    const tt = (new Date().getTime() - qstStartTime.getTime()) / 1000;
    const isQstAttended = examResponses.find(
      (res) => res.secId === exmRes.secId && res.sId === exmRes.sId && res.qId === exmRes.qId
    );
    const ans =
      exmRes.ans !== undefined
        ? exmRes.ans === "" && isQstAttended?.ans
          ? isQstAttended.ans
          : exmRes.ans
        : isQstAttended?.ans;

    const newAnswer = {
      secId: exmRes.secId,
      sId: exmRes.sId,
      qId: exmRes.qId,
      ans,
      tt: (isQstAttended?.tt || 0) + tt,
      bm: exmRes.bm ?? isQstAttended?.bm ?? false,
      mr: exmRes.mr ?? isQstAttended?.mr ?? false,
    };

    // updating the state with ans and total time
    setExamResponses((prevResponses) => {
      if (isQstAttended) {
        return prevResponses.map((res) =>
          res.secId === exmRes.secId && res.sId === exmRes.sId && res.qId === exmRes.qId
            ? {
                ...res,
                ...newAnswer,
              }
            : res
        );
      } else {
        // add new response
        return [...prevResponses, newAnswer];
      }
    });
    await (examData?.shortUrl === EXAM_TYPE_SHORTURLS.CUMULATIVE_TEST
      ? updateCumulativeAnswer(params.shortUrls[0], params.shortUrls[1], newAnswer)
      : updateAnswer(params.shortUrls[0], newAnswer, params.shortUrls[1]));
  };
  // for select answer
  const handleSelectAnswer = async (secId: number, sId: number, qId: number) => {
    setSetLoadingAllBts(true);
    handleNext(1);
    await updateExamResponse({ secId, sId, qId, ans: selectedAns });
    setSetLoadingAllBts(false);
  };

  // for make to not answered
  const handleSkipQuestion = async (secId: number, sId: number, qId: number, count: -1 | 1 = 1) => {
    setSetLoadingAllBts(true);
    handleNext(count);
    await updateExamResponse({ secId, sId, qId, ans: "" });
    setSetLoadingAllBts(false);
  };

  // for next and previous
  const handleNext = (count: -1 | 1) => {
    setLoading(true);
    setQuestionLoading(true);
    setSelectedAns("");
    const nextQuestionIndex = questionIndex + count;
    const currentSubject = questions[subjectIndex];
    const nextQuestion = currentSubject?.questions?.[nextQuestionIndex];
    setQstStartTime(new Date());
    if (nextQuestion) {
      setQuestionIndex(nextQuestionIndex);
      currentSubject.secId, currentSubject.sId, nextQuestion.qstId;
      updateSelectedAns(currentSubject.secId, currentSubject.sId, nextQuestion.qstId);
      setQuestionLoading(false);
      setLoading(false);
      return;
    }
    const nextSubjectIndex = subjectIndex + count;
    const nextSubject = questions[nextSubjectIndex];
    if (nextSubject) {
      setSubjectIndex(nextSubjectIndex);
      setQuestionIndex(count === 1 ? 0 : nextSubject.questions.length - 1);
      const nextQstData = nextSubject.questions[count === 1 ? 0 : nextSubject.questions.length - 1];
      updateSelectedAns(nextSubject.secId, nextSubject.sId, nextQstData.qstId);
    }
    setQuestionLoading(false);
    setLoading(false);
  };

  // to navigate directly to questions
  const handleQstIndexNext = async (
    qstIndex: number,
    subIndex: number,
    secId: number,
    sId: number,
    qId: number,
    curntSecId: number,
    curntSId: number,
    curntQId: number
  ) => {
    setSetLoadingAllBts(true);
    updateSelectedAns(curntSecId, curntSId, curntQId);
    setSubjectIndex(subIndex);
    setQuestionIndex(qstIndex);
    setOpenSheet(false);
    setQstStartTime(new Date());
    await updateExamResponse({ secId, sId, qId, ans: "" });
    setSetLoadingAllBts(false);
  };

  const updateResumedExamData = (data: IResumedExamProps, questions: IMcqQuestionProps[]) => {
    const lastAttemptedData = questions.findIndex(
      (qst) => qst.secId === data.lastsectionId && qst.sId === data.lastSubjectId
    );
    const lastAttemptedQstData = questions[lastAttemptedData]?.questions.findIndex(
      (qst) => qst.qstId === data.lastQstId
    );
    const lastAttemptedQstStatus = data.answers.find(
      (ans) => ans.secId === data.lastsectionId && ans.sId === data.lastSubjectId && ans.qId === data.lastQstId
    );
    setSubjectIndex(lastAttemptedData >= 0 ? lastAttemptedData : 0);
    setQuestionIndex(lastAttemptedQstData >= 0 ? lastAttemptedQstData : 0);
    setExamResponses(data.answers);
    setRemainingTime(data.remainingTime);
    dispatch(getExamQuestionSuccess(questions));
    updateStaus(lastAttemptedQstStatus);
  };

  // submit exam
  const handleSubmit = async () => {
    setSubmitLoading(true);
    await (examData?.shortUrl === EXAM_TYPE_SHORTURLS.CUMULATIVE_TEST
      ? submitCumulativeExam(params.shortUrls[0], params.shortUrls[1])
      : submitExam(params.shortUrls[0]));
    setLocalStorage("warningCount", null);
    handleRedirct();
    setSubmitLoading(false);
  };

  const handleTimeUp = () => {
    setShowSubmitModal(true);
    setDisableSubmitBtn(true);
    setTimeout(() => {
      handleSubmit();
      handleRedirct();
    }, 5000);
  };

  // to select answer
  const handleSelectOption = (secId: number, sId: number, option: string) => {
    const currentQst = questions.find((sec) => sec.secId === secId && sec.sId === sId)?.questions[questionIndex];
    const isCurrentQstAns = examResponses.some((res) => res.qId === currentQst?.qstId && res.ans);
    if (isCurrentQstAns) {
      setSelectedAns(option);
      return;
    }
    const totalAttendedQuestions = examResponses.filter(
      (response) => response.secId === secId && response.ans && response.sId === sId
    ).length;
    const maxQuestions = questions.find((qst) => qst.secId === secId && qst.sId === sId);

    if (maxQuestions && maxQuestions.maxAttendedQsts <= totalAttendedQuestions)
      handleMaxQstWarnging(maxQuestions.sectionName, maxQuestions.subject);
    else setSelectedAns(option);
  };

  // open mobile subject wise question number
  const handleOpenSheet = () => setOpenSheet(!openSheet);

  const leaveHandler = (open: boolean) => setShowLeaveModal(open);

  const leaveConfirmHandler = async () => {
    try {
      const res = await leaveCumulativeExam(examId, userId, studyPlanId);
      dispatch(getExamQuestionSuccess([]));
      router.push(`/`);
    } catch (error) {
      throw new Error(`Something went wrong: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleCloseWarning = (open: boolean) => setShowWarning(open);

  const submitHandler = (open: boolean) => setShowSubmitModal(open);

  // fetch resume exam data
  useEffect(() => {
    const getData = async () => {
      const examData = await getExamData(params.shortUrls[0]);
      const sections = await (examData.data.shortUrl === EXAM_TYPE_SHORTURLS.CUMULATIVE_TEST
        ? resumeCumulativeExam(params.shortUrls[0], params.shortUrls[1])
        : resumeExam(params.shortUrls[0], params.shortUrls[1]));
      if (sections.success) {
        dispatch(getExamDataSuccess(sections.data.exam));
        sections.data.examResult && updateResumedExamData(sections.data.examResult, sections.data.questions);
        setLoading(false);
      } else
        toast({
          variant: "destructive",
          title: "Exam not started or You Leaved the Exam",
          description: typeof sections.message === "string" ? sections.message : "",
        });
    };
    questions.length === 0 && params?.shortUrls?.length && isAuthenticated && isInitialized && getData();
    if (questions.length > 0) {
      setLoading(false);
      warningRef.current = true;
    }
    setShowWarningCount(Number(getLocalStorage("warningCount")) || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isInitialized, params.shortUrls, questions.length]);

  // disable right click
  useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    return document.addEventListener("contextmenu", (event) => event.preventDefault());
  }, []);

  // to check tab is active or not and clearing the examTimerId
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.hidden && warningRef.current) {
  //       setShowWarning(true);
  //       setShowWarningCount((prev) => {
  //         setLocalStorage("warningCount", String(prev + 1));
  //         return prev + 1;
  //       });
  //     }
  //   };
  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Prevent the back button by pushing the current state again
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    const handlePopState = (event: any) => {
      window.history.pushState(null, document.title, window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // auto submit after three tab change
  // useEffect(() => {
  //   if (showWarningCount >= 3) handleTimeUp();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [showWarningCount]);

  return (
    <>
      <div className="w-[100%] mb-[100px] flex flex-row justify-between relative">
        <>
          {loading || !isInitialized || questions.length === 0 ? (
            <ExamSkelton />
          ) : (
            <>
              {" "}
              {questions.length && (
                <>
                  <TopBar
                    disableAllBts={loadingAllBtns}
                    examTime={remainingTime || examData?.totalTime || 0}
                    sectionId={questions[subjectIndex].secId}
                    subjectId={questions[subjectIndex].sId}
                    qId={questions[subjectIndex].questions[questionIndex]?.qstId}
                    handleOpenSheet={handleOpenSheet}
                    submitHandler={submitHandler}
                    handleTimeUp={handleTimeUp}
                  />
                  <div className="gap-5 w-[100%] lg:max-w-[65%] max-w-[100%] mt-[3.2rem] lg:mt-0">
                    <QuestionCard
                      question={questions[subjectIndex].questions[questionIndex]}
                      handleBookMark={handleBookMark}
                      isBookMarked={isBookMarked}
                      subjectData={questions[subjectIndex]}
                      currentQstIndex={questionIndex}
                    />
                    <OptionCard
                      selectedAns={selectedAns}
                      question={questions[subjectIndex]?.questions[questionIndex]}
                      handleSelectOption={handleSelectOption}
                      section={questions[subjectIndex]}
                    />
                  </div>
                  <div className="w-[100%] max-w-[30%] hidden lg:block ">
                    <div className="sticky top-[30px]">
                      <Timer
                        examTime={remainingTime || examData?.totalTime || 0}
                        sectionId={questions[subjectIndex]?.secId}
                        subjectId={questions[subjectIndex]?.sId}
                        qId={questions[subjectIndex]?.questions[questionIndex]?.qstId}
                        handleTimeUp={handleTimeUp}
                      />
                      <SubjectComponent
                        questions={questions}
                        currSubIndex={subjectIndex}
                        currQstIndex={questionIndex}
                        examResponses={examResponses}
                        handleQstIndexNext={handleQstIndexNext}
                      />
                    </div>
                  </div>
                  <MobileNextButtons
                    disableAllBts={loadingAllBtns}
                    handleNext={handleSkipQuestion}
                    disableNext={
                      (subjectIndex === questions.length - 1 &&
                        questionIndex === questions[subjectIndex].questions.length - 1) ||
                      questionLoading
                    }
                    disablePrev={(questionIndex === 0 && subjectIndex === 0) || questionLoading}
                    subjectData={questions[subjectIndex]}
                    questionIndex={questionIndex}
                  />
                  <Footer
                    disableAllBts={loadingAllBtns}
                    selectedAns={selectedAns}
                    disableResume={examData?.shortUrl === EXAM_TYPE_SHORTURLS.BENCHMARK_TEST}
                    markForReviewStatus={markForReviewStatus}
                    disableNext={
                      (subjectIndex === questions.length - 1 &&
                        questionIndex === questions[subjectIndex].questions.length - 1) ||
                      questionLoading
                    }
                    disablePrev={(questionIndex === 0 && subjectIndex === 0) || questionLoading}
                    subjectData={questions[subjectIndex]}
                    questionIndex={questionIndex}
                    handleNext={handleSkipQuestion}
                    handleSelectAnswer={handleSelectAnswer}
                    handleMarkForReview={handleMarkForReview}
                    leaveHandler={leaveHandler}
                    submitHandler={submitHandler}
                  />
                </>
              )}
            </>
          )}
        </>
      </div>
      {openSheet && (
        <MobileSubjectSheet
          open={openSheet}
          questions={questions}
          currSubIndex={subjectIndex}
          currQstIndex={questionIndex}
          examResponses={examResponses}
          handleClose={handleOpenSheet}
          handleQstIndexNext={handleQstIndexNext}
        />
      )}
      {showLeaveModal && (
        <LeaveModal onOpenChange={leaveHandler} open={showLeaveModal} leaveConfirmHandler={leaveConfirmHandler} />
      )}
      {showSubmitModal && (
        <SubmitModal
          open={showSubmitModal}
          examResponses={examResponses}
          questions={questions}
          disableBtns={disableSubmitButtons}
          loading={submitLoading}
          onOpenChange={submitHandler}
          handleSubmit={handleSubmit}
        />
      )}
      {showWarning && <WarningModal onOpenChange={handleCloseWarning} open={showWarning} />}
    </>
  );
};

export default ExamComponent;
