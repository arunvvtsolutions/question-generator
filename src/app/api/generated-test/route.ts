import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Difficulty map
const levelMap = {
  easy: 1,
  medium: 2,
  hard: 3,
  veryHard: 4
};
type DifficultyLabel = keyof typeof levelMap;

// Zod validation
const testSchema = z.object({
  testTitle: z.string().min(1),
  description: z.string().optional(),
  streamId: z.number().int(),
  userId : z.number().int(),
  level : z.number().int(),
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
          )
        })
      )
    })
  ),
  levels: z.object({
    easy: z.number().min(0),
    medium: z.number().min(0),
    hard: z.number().min(0),
    veryHard: z.number().min(0)
  })
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
    const totalRequested = Object.values(levelSplit).reduce((sum, val) => sum + val, 0);
    if (totalRequested !== targetCount) {
      return NextResponse.json(
        {
          success: false,
          message: `Sum of questions in levels (${totalRequested}) does not match noOfQuestions (${targetCount})`,
        },
        { status: 400 }
      );
    }

    // Extract filters by subject
    const filtersBySubject: {
      [subjectId: number]: { subjectId: number; chapterId: number; topicId: number }[];
    } = {};

    for (const subject of data.questions) {
      filtersBySubject[subject.subjectId] = [];
      for (const chapter of subject.chapters) {
        for (const topic of chapter.topics) {
          filtersBySubject[subject.subjectId].push({
            subjectId: subject.subjectId,
            chapterId: chapter.chapterId,
            topicId: topic.topicId
          });
        }
      }
    }

    const allQuestions: any[] = [];
    const usedQuestionIds = new Set<number>();
    const subjects = Object.keys(filtersBySubject).map(Number);
    const questionsPerSubject = Math.ceil(targetCount / subjects.length); // e.g., 5 per subject for 2 subjects

    for (const subjectId of subjects) {
      let remainingForSubject = Math.min(questionsPerSubject, targetCount - allQuestions.length);
      console.log(`Fetching ${remainingForSubject} questions for subjectId: ${subjectId}`);

      // Distribute difficulty levels proportionally for this subject
      const subjectLevelSplit: { [key in DifficultyLabel]: number } = {
        easy: Math.ceil((levelSplit.easy / targetCount) * remainingForSubject),
        medium: Math.ceil((levelSplit.medium / targetCount) * remainingForSubject),
        hard: Math.ceil((levelSplit.hard / targetCount) * remainingForSubject),
        veryHard: Math.ceil((levelSplit.veryHard / targetCount) * remainingForSubject)
      };

      // Track total questions needed for this subject
      let totalForSubject = Object.values(subjectLevelSplit).reduce((sum, val) => sum + val, 0);
      if (totalForSubject > remainingForSubject) {
        // Adjust to fit within remainingForSubject
        const scale = remainingForSubject / totalForSubject;
        for (const level of Object.keys(subjectLevelSplit) as DifficultyLabel[]) {
          subjectLevelSplit[level] = Math.floor(subjectLevelSplit[level] * scale);
        }
        totalForSubject = remainingForSubject;
      }

      const filters = filtersBySubject[subjectId];
      const questionsPerTopic = Math.ceil(totalForSubject / filters.length);

      // Primary fetch: Try to get questions for requested difficulties
      for (const level of Object.keys(levelSplit) as DifficultyLabel[]) {
        const difficulty = levelMap[level];
        let remaining = subjectLevelSplit[level];

        if (remaining <= 0) continue;

        console.log(`Fetching ${remaining} questions for difficulty: ${level} (value: ${difficulty}) in subjectId: ${subjectId}`);

        for (const filter of filters) {
          if (remaining <= 0) break;

          console.log(`Attempting to fetch ${questionsPerTopic} questions with criteria:`, {
            subjectId: filter.subjectId,
            chapterId: filter.chapterId,
            topicId: filter.topicId,
            difficulty,
            excludedIds: Array.from(usedQuestionIds)
          });

          const questions = await prisma.aiQuestions.findMany({
            where: {
              subjectId: filter.subjectId,
              chapterId: filter.chapterId,
              topicId: filter.topicId,
              difficulty,
              id: { notIn: Array.from(usedQuestionIds) }
            },
            take: questionsPerTopic,
            orderBy: { addedDate: "desc" }
          });

          console.log(
            `Found ${questions.length} questions for subjectId: ${filter.subjectId}, ` +
            `chapterId: ${filter.chapterId}, topicId: ${filter.topicId}, difficulty: ${difficulty}`
          );

          allQuestions.push(...questions);
          questions.forEach((q) => usedQuestionIds.add(q.id));
          remaining -= questions.length;
          totalForSubject -= questions.length;

          if (allQuestions.length >= targetCount) break;
        }

        if (allQuestions.length >= targetCount) break;
      }

      // Fallback: If not enough questions for this subject, try other difficulties
      if (totalForSubject > 0 && allQuestions.length < targetCount) {
        console.log(`Fallback: Attempting to fetch ${totalForSubject} more questions for subjectId: ${subjectId}`);
        const fallbackQuestions = await prisma.aiQuestions.findMany({
          where: {
            subjectId,
            chapterId: { in: filters.map(f => f.chapterId) },
            topicId: { in: filters.map(f => f.topicId) },
            difficulty: { in: Object.values(levelMap) },
            id: { notIn: Array.from(usedQuestionIds) }
          },
          take: totalForSubject,
          orderBy: { addedDate: "desc" }
        });

        console.log(`Fallback found ${fallbackQuestions.length} questions for subjectId: ${subjectId}`);
        allQuestions.push(...fallbackQuestions);
        fallbackQuestions.forEach((q) => usedQuestionIds.add(q.id));
        totalForSubject -= fallbackQuestions.length;

        if (allQuestions.length >= targetCount) break;
      }
    }

    console.log('All fetched questions:', allQuestions.map(q => ({ id: q.id, subjectId: q.subjectId, difficulty: q.difficulty })));

    const finalQuestions = allQuestions.slice(0, targetCount);

    // Verify questions from both subjects
    const subjectCounts = finalQuestions.reduce((acc, q) => {
      acc[q.subjectId] = (acc[q.subjectId] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    console.log('Questions per subject:', subjectCounts);

    // Check if enough questions were found
    if (finalQuestions.length < targetCount) {
      console.warn(`Only found ${finalQuestions.length} questions out of ${targetCount} requested`);
      return NextResponse.json(
        {
          success: false,
          message: `Insufficient questions available. Found ${finalQuestions.length} out of ${targetCount} requested.`,
          questions: finalQuestions,
          subjectCounts
        },
        { status: 200 }
      );
    }

    // Use transaction to store test and questions
    const generatedTest = await prisma.$transaction(async (tx) => {
      // Create the test record first
      const test = await tx.generated_test.create({
        data: {
          test_title: data.testTitle,
          description: data.description || '',
          stream_id: data.streamId,
          user_id: data.userId,
          no_of_questions: data.noOfQuestions,
          duration: data.duration,
          level: data.level
        }
      });

      // Create the question records
      await tx.generated_test_question.createMany({
        data: finalQuestions.map(q => ({
          test_id: test.s_no,
          question_id: q.id,
          subject_id: q.subjectId,
          chapter_id: q.chapterId,
          topic_id: q.topicId
        }))
      });

      return test;
    });

    return NextResponse.json({
      success: true,
      testId: generatedTest.s_no,
      questions: finalQuestions,
      subjectCounts
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};