import { NextRequest, NextResponse } from "next/server";
import { JLPT_QUESTIONS } from "@/data/jlptQuestions";
import { JLPTScoringEngine, JlptLevel } from "@/lib/scoring/jlptScoringEngine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { level, userAnswers } = body;

    const questions = JLPT_QUESTIONS[level as JlptLevel];
    if (!questions) {
      return NextResponse.json({ message: "Invalid JLPT level" }, { status: 400 });
    }

    const evaluation = JLPTScoringEngine.evaluateExam(
      level as JlptLevel,
      questions,
      userAnswers || {}
    );

    return NextResponse.json({
      success: true,
      evaluation,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Evaluation error" },
      { status: 500 }
    );
  }
}
