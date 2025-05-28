import {

  IGenrateQstBodyProps,

} from "@/types/generate-questions";
import {
  generateAiQuestions,
  getChaptersByIds,
  getSubjectsByIds,
  getTokenDetails,
  getTopicByids,
} from "./query";
import {  generateUuid } from "@/utils";

export const generateAiQuestionsService = async (userId: number, data: IGenrateQstBodyProps) => {
  try {
    const { subjectIds, chapterIds, questionLevels, selectedCognitiveLevel, topicIds, totalQuestion ,questionQuality,stream } = data;

    const uuid = generateUuid();

    const subjectIdsArray = subjectIds.split(",").map((id) => Number(id));
    const chapterIdsArray = chapterIds.split(",").map((id) => Number(id));
    const topicIdsArray = topicIds.split(",").map((id) => Number(id));

    const [subject, chapter, topic] = await Promise.all([
      getSubjectsByIds(subjectIdsArray),
      getChaptersByIds(chapterIdsArray),
      getTopicByids(topicIdsArray),
    ]);

    const payload = {
      user_id: userId,
      uuid: uuid,
      subject_name: subject?.map((subj) => subj.subjectName) || [],
      chapter_name: chapter?.map((chap) => chap.chapterName) || [],
      topic_name: topic?.map((top) => top.topicName) || [],
      difficulty: questionLevels,
      number_of_questions: Number(totalQuestion),
      cognitive_level: selectedCognitiveLevel,
      model:questionQuality,
      stream
    };

    const tokenDetails = await getTokenDetails(userId);

    if (!tokenDetails) {
        return {
       success: false,
        message: "Token details not found for the user.",
      };
    }

    if (Number(totalQuestion) > tokenDetails.remainingTokens) {
  return {
    success: false,
    message: "Not enough tokens to generate the requested number of questions.",
     };
}

    const res = await generateAiQuestions(payload);
    return res;

  } catch (error:any ) {
    throw new Error(error.message || "Failed to generate practice test questions. Please try again.");
  }
};









