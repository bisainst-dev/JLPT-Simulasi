import { NextRequest, NextResponse } from "next/server";
import { JLPT_QUESTIONS } from "@/data/jlptQuestions";
import { JlptLevel } from "@/lib/scoring/jlptScoringEngine";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const level = (searchParams.get("level") || "N5") as JlptLevel;

  const questions = JLPT_QUESTIONS[level] || [];
  return NextResponse.json({
    level,
    count: questions.length,
    questions,
  });
}
