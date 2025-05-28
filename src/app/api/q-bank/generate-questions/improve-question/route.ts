import {  NextResponse } from "next/server";

import { verfiyAuthentication } from "@/utils";
import { getTokenDetails, improveAiQuestionsQuery, ImproveQuestionProps } from "../../query";

export const POST = async (request: Request) => {
  try {
    const user: any = verfiyAuthentication(request.headers.get("authorization"));

    if (user.status === 401) return user;

    const body = await request.json();

    const payload: ImproveQuestionProps = {
      question_id: body.questionId,
      user_query: body.feedback,
    };

    const tokenDetails = await getTokenDetails(user.id);

    if (!tokenDetails) {
      return NextResponse.json(
        { success: false, message: "Token details not found for the user." },
        { status: 400 }
      );
    }

    if (tokenDetails.remainingTokens <= 0) {
      return NextResponse.json(
        { success: false, message: "You don't have enough tokens to perform this action." },
        { status: 403 }
      );
    }

    const data = await improveAiQuestionsQuery(payload, user.id);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Server error occurred." },
      { status: 500 }
    );
  }
};

