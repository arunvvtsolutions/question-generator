import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verfiyAuthentication } from "@/utils";

export const GET = async (request: NextRequest) => {
  try {
    console.log(request.headers);

    const user: any = verfiyAuthentication(
      request.headers.get("authorization")
    );
    if (user.status === 401) return user;
    const generatedTestList = await prisma.generated_test.findMany({
      where: {
        user_id: user.id,
      },
      select: {
        s_no: true,
        ai_model_id: true,
        user_id: true,
        stream_id: true,
        test_title: true,
        description: true,
        question_type_id: true,
        no_of_questions: true,
        duration: true,
        level: true,
        created_at: true,
        updated_at: true,
        generated_test_question: {
          select: {
            s_no: true,
            question_id: true,
            chapter_id: true,
            subject_id: true,
            topic_id: true,
            test_id: true,
            ai_questions: {
              select: {
                id: true,
                uuid: true,
                question: true,
                answerDesc: true,
                difficulty: true,
                questionType: true,
                addedDate: true,
                subjectId: true,
                chapterId: true,
                topicId: true,
                optionA: true,
                optionB: true,
                optionC: true,
                optionD: true,
                correctOpt: true,
                model_id: true,
                updatedDate: true,
                cognitive_level: true,
                estimated_time: true,
                cognitiveLevel: true,
              },
            },
          },
        },
      },
    });
    const resModal = generatedTestList.map((item) => {
      return {
        id: item.s_no,
        aiModelId: item.ai_model_id,
        userId: item.user_id,
        streamId: item.stream_id,
        testTitle: item.test_title,
        description: item.description,
        questionTypeId: item.question_type_id,
        noOfQuestions: item.no_of_questions,
        duration: item.duration,
        level: item.level,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        generatedTestQuestion: item.generated_test_question.map((q: any) => ({
          id: q.s_no,
          questionId: q.question_id,
          chapterId: q.chapter_id,
          subjectId: q.subject_id,
          topicId: q.topic_id,
          testId: q.test_id,
          aiQuestions: {
            id: q.ai_questions.id,
            uuid: q.ai_questions.uuid,
            question: q.ai_questions.question,
            answerDesc: q.ai_questions.answerDesc,
            difficulty: q.ai_questions.difficulty,
            questionType: q.ai_questions.questionType,
            addedDate: q.ai_questions.addedDate,
            subjectId: q.ai_questions.subjectId,
            chapterId: q.ai_questions.chapterId,
            topicId: q.ai_questions.topicId,
            optionA: q.ai_questions.optionA,
            optionB: q.ai_questions.optionB,
            optionC: q.ai_questions.optionC,
            optionD: q.ai_questions.optionD,
            correctOpt: q.ai_questions.correctOpt,
            modelId: q.ai_questions.model_id,
            updatedDate: q.ai_questions.updatedDate,
            cognitiveLevel: q.ai_questions.cognitiveLevel,
            estimatedTime: q.ai_questions.estimated_time,
          },
        })),
      };
    });
    console.log("resModal", resModal);
    return NextResponse.json(
      {
        success: true,
        data: resModal,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// ============== post method ==============
const levelMap = {
  easy: 1,
  medium: 2,
  hard: 3,
  veryHard: 4,
};
type DifficultyLabel = keyof typeof levelMap;

// Zod validation
const testSchema = z.object({
  questionId: z.number().int(),
  examId: z.number().int(),
  aiModelId: z.number().int(),
  userId: z.number().int(),
  testTitle: z.string().min(1),
  description: z.string().optional(),
  level: z.number().int(),
  duration: z.number().int().positive(),
  noOfQuestions: z.number().int().positive(),
  questions: z.array(
    z.object({
      subjectId: z.number().int(),
      chapters: z.array(
        z.object({
          chapterId: z.number().int(),
          topics: z.array(
            z.object({
              topicId: z.number().int(),
            })
          ),
        })
      ),
    })
  ),
  levels: z.object({
    easy: z.number().min(0),
    medium: z.number().min(0),
    hard: z.number().min(0),
    veryHard: z.number().min(0),
  }),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = testSchema.safeParse(body);
    console.log("Received request body:", body);
    console.log("Parsed data:", parsed);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const targetCount = data.noOfQuestions;
    const levelSplit = data.levels;

    // Validate that the sum of levels matches noOfQuestions
    const totalRequested = Object.values(levelSplit).reduce(
      (sum, val) => sum + val,
      0
    );
    if (totalRequested !== targetCount) {
      return NextResponse.json(
        {
          success: false,
          message: `Sum of questions in levels (${totalRequested}) does not match noOfQuestions (${targetCount})`,
        },
        { status: 400 }
      );
    }

    // Flatten questions into { subjectId, chapterId, topicId } format
    const formattedQuestions = data.questions.flatMap((question) =>
      question.chapters.flatMap((chapter) =>
        chapter.topics.map((topic) => ({
          subjectId: question.subjectId,
          chapterId: chapter.chapterId,
          topicId: topic.topicId,
        }))
      )
    );

    // Distribute questions across topics
    const questionsPerTopic = Math.ceil(
      targetCount / formattedQuestions.length
    );
    const allQuestions: any[] = [];
    const usedQuestionIds = new Set<number>();

    // Difficulty levels in order for fallback (easy -> medium -> hard -> veryHard)
    const difficultyOrder: DifficultyLabel[] = [
      "easy",
      "medium",
      "hard",
      "veryHard",
    ];

    // Track remaining questions needed
    let remainingTotalQuestions = targetCount;

    for (const filter of formattedQuestions) {
      if (remainingTotalQuestions <= 0) break;

      // Calculate questions needed for this topic
      const questionsForTopic = Math.min(
        questionsPerTopic,
        remainingTotalQuestions
      );

      // Distribute questions across difficulty levels proportionally
      const topicLevelSplit: { [key in DifficultyLabel]: number } = {
        easy: Math.ceil((levelSplit.easy / targetCount) * questionsForTopic),
        medium: Math.ceil(
          (levelSplit.medium / targetCount) * questionsForTopic
        ),
        hard: Math.ceil((levelSplit.hard / targetCount) * questionsForTopic),
        veryHard: Math.ceil(
          (levelSplit.veryHard / targetCount) * questionsForTopic
        ),
      };

      // Adjust to fit within questionsForTopic
      let totalForTopic = Object.values(topicLevelSplit).reduce(
        (sum, val) => sum + val,
        0
      );
      if (totalForTopic > questionsForTopic) {
        const scale = questionsForTopic / totalForTopic;
        for (const level of Object.keys(topicLevelSplit) as DifficultyLabel[]) {
          topicLevelSplit[level] = Math.floor(topicLevelSplit[level] * scale);
        }
        totalForTopic = questionsForTopic;
      }

      let remainingForTopic = totalForTopic;

      // Primary fetch: Try each difficulty level in order
      for (
        let i = 0;
        i < difficultyOrder.length && remainingForTopic > 0;
        i++
      ) {
        const level = difficultyOrder[i];
        let questionsNeeded = topicLevelSplit[level];

        if (questionsNeeded <= 0) continue;

    
       

        const questions = await prisma.aiQuestions.findMany({
          where: {
            subjectId: filter.subjectId,
            chapterId: filter.chapterId,
            topicId: filter.topicId,
            difficulty: levelMap[level],
            id: { notIn: Array.from(usedQuestionIds) },
          },
          take: questionsNeeded,
          orderBy: { addedDate: "desc" },
        });

        

        allQuestions.push(...questions);
        questions.forEach((q) => usedQuestionIds.add(q.id));
        remainingForTopic -= questions.length;
        remainingTotalQuestions -= questions.length;

        // Fallback to next difficulty level if needed
        let fallbackQuestionsNeeded = questionsNeeded - questions.length;
        if (fallbackQuestionsNeeded > 0 && remainingForTopic > 0) {
          for (
            let j = i + 1;
            j < difficultyOrder.length && fallbackQuestionsNeeded > 0;
            j++
          ) {
            const fallbackLevel = difficultyOrder[j];
            console.log(
              `Fallback: Fetching ${fallbackQuestionsNeeded} questions for topicId: ${filter.topicId}, difficulty: ${fallbackLevel}`
            );

            const fallbackQuestions = await prisma.aiQuestions.findMany({
              where: {
                subjectId: filter.subjectId,
                chapterId: filter.chapterId,
                topicId: filter.topicId,
                difficulty: levelMap[fallbackLevel],
                id: { notIn: Array.from(usedQuestionIds) },
              },
              take: fallbackQuestionsNeeded,
              orderBy: { addedDate: "desc" },
            });

            console.log(
              `Fallback found ${fallbackQuestions.length} questions for topicId: ${filter.topicId}, difficulty: ${fallbackLevel}`
            );

            allQuestions.push(...fallbackQuestions);
            fallbackQuestions.forEach((q) => usedQuestionIds.add(q.id));
            remainingForTopic -= fallbackQuestions.length;
            remainingTotalQuestions -= fallbackQuestions.length;
            fallbackQuestionsNeeded -= fallbackQuestions.length;

            if (remainingTotalQuestions <= 0) break;
          }
        }

        if (remainingTotalQuestions <= 0) break;
      }

      // Fallback to other topics is handled implicitly by moving to the next topic in the loop
    }

    // Final fallback: If still not enough questions, try any difficulty for any topic
    if (remainingTotalQuestions > 0) {
      console.log(
        `Final fallback: Fetching ${remainingTotalQuestions} more questions`
      );
      const fallbackQuestions = await prisma.aiQuestions.findMany({
        where: {
          subjectId: { in: formattedQuestions.map((f) => f.subjectId) },
          chapterId: { in: formattedQuestions.map((f) => f.chapterId) },
          topicId: { in: formattedQuestions.map((f) => f.topicId) },
          difficulty: { in: Object.values(levelMap) },
          id: { notIn: Array.from(usedQuestionIds) },
        },
        take: remainingTotalQuestions,
        orderBy: { addedDate: "desc" },
      });

      console.log(`Final fallback found ${fallbackQuestions.length} questions`);
      allQuestions.push(...fallbackQuestions);
      fallbackQuestions.forEach((q) => usedQuestionIds.add(q.id));
      remainingTotalQuestions -= fallbackQuestions.length;
    }

    console.log(
      "All fetched questions:",
      allQuestions.map((q) => ({
        id: q.id,
        subjectId: q.subjectId,
        difficulty: q.difficulty,
      }))
    );

    const finalQuestions = allQuestions.slice(0, targetCount);

    // Verify questions distribution
    const subjectCounts = finalQuestions.reduce((acc, q) => {
      acc[q.subjectId] = (acc[q.subjectId] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    console.log("Questions per subject:", subjectCounts);

    // Check if enough questions were found
    if (finalQuestions.length < targetCount) {
      console.warn(
        `Only found ${finalQuestions.length} questions out of ${targetCount} requested`
      );
      return NextResponse.json(
        {
          success: false,
          message: `Insufficient questions available. Found ${finalQuestions.length} out of ${targetCount} requested.`,
          questions: finalQuestions,
          subjectCounts,
        },
        { status: 200 }
      );
    }

    // Use transaction to store test and questions
    const generatedTest = await prisma.$transaction(async (tx) => {
      // Create the test record
      const test = await tx.generated_test.create({
        data: {
          test_title: data.testTitle,
          description: data.description || "",
          stream_id: data.examId,
          user_id: data.userId,
          ai_model_id: data.aiModelId,
          no_of_questions: data.noOfQuestions,
          duration: data.duration,
          level: data.level,
          question_type_id: data.questionId,
        },
      });

      // Create the question records
      await tx.generated_test_question.createMany({
        data: finalQuestions.map((q) => ({
          test_id: test.s_no,
          question_id: q.id,
          subject_id: q.subjectId,
          chapter_id: q.chapterId,
          topic_id: q.topicId,
        })),
      });

      return test;
    });

    return NextResponse.json({
      success: true,
      testId: generatedTest.s_no,
      questions: finalQuestions,
      subjectCounts,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
