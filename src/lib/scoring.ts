export interface SectionScoreResult {
  sectionType: string;
  name: string;
  rawEarned: number;
  rawPossible: number;
  scaledScore: number;
  maxScore: number;
  threshold: number;
  isPassedSection: boolean;
  percentage: number;
}

export interface ExamScoreResult {
  level: 'N1' | 'N2' | 'N3' | 'N4' | 'N5' | string;
  totalScore: number;
  maxScore: number;
  passScoreTotal: number;
  isTotalPassed: boolean;
  isAllSectionsPassed: boolean;
  isPassed: boolean; // Must meet BOTH total pass score AND all sectional thresholds
  gradeText: 'A' | 'B' | 'C' | 'D' | 'F';
  sectionBreakdown: SectionScoreResult[];
  totalQuestions: number;
  correctQuestions: number;
  accuracyRate: number;
  summaryMessage: string;
}

export const JLPT_CRITERIA = {
  N1: {
    passScoreTotal: 100,
    maxScore: 180,
    sections: [
      { key: 'VOCABULARY_GRAMMAR', name: '言語知識（文字・語彙・文法）', maxScore: 60, threshold: 19 },
      { key: 'READING', name: '読解 (Dokkai)', maxScore: 60, threshold: 19 },
      { key: 'LISTENING', name: '聴解 (Choukai)', maxScore: 60, threshold: 19 },
    ],
  },
  N2: {
    passScoreTotal: 90,
    maxScore: 180,
    sections: [
      { key: 'VOCABULARY_GRAMMAR', name: '言語知識（文字・語彙・文法）', maxScore: 60, threshold: 19 },
      { key: 'READING', name: '読解 (Dokkai)', maxScore: 60, threshold: 19 },
      { key: 'LISTENING', name: '聴解 (Choukai)', maxScore: 60, threshold: 19 },
    ],
  },
  N3: {
    passScoreTotal: 95,
    maxScore: 180,
    sections: [
      { key: 'VOCABULARY_GRAMMAR', name: '言語知識（文字・語彙・文法）', maxScore: 60, threshold: 19 },
      { key: 'READING', name: '読解 (Dokkai)', maxScore: 60, threshold: 19 },
      { key: 'LISTENING', name: '聴解 (Choukai)', maxScore: 60, threshold: 19 },
    ],
  },
  N4: {
    passScoreTotal: 90,
    maxScore: 180,
    sections: [
      { key: 'LANGUAGE_KNOWLEDGE_READING', name: '言語知識・読解 (Gengo Chishiki & Dokkai)', maxScore: 120, threshold: 38 },
      { key: 'LISTENING', name: '聴解 (Choukai)', maxScore: 60, threshold: 19 },
    ],
  },
  N5: {
    passScoreTotal: 80,
    maxScore: 180,
    sections: [
      { key: 'LANGUAGE_KNOWLEDGE_READING', name: '言語知識・読解 (Gengo Chishiki & Dokkai)', maxScore: 120, threshold: 38 },
      { key: 'LISTENING', name: '聴解 (Choukai)', maxScore: 60, threshold: 19 },
    ],
  },
};

export function calculateJlptScore(params: {
  level: string;
  sections: Array<{
    id: string;
    sectionType: string;
    name: string;
    questions: Array<{
      id: string;
      correctOption: number;
      weight: number;
    }>;
  }>;
  userAnswers: Record<string, number | null | undefined>; // questionId -> selectedOption (1..4)
}): ExamScoreResult {
  const levelKey = (params.level.toUpperCase() as keyof typeof JLPT_CRITERIA) || 'N5';
  const criteria = JLPT_CRITERIA[levelKey] || JLPT_CRITERIA.N5;

  let totalQuestionsCount = 0;
  let correctQuestionsCount = 0;

  // Compute raw points per section
  const sectionBreakdown: SectionScoreResult[] = [];

  // If level is N4 or N5, we merge non-listening into Section 1 (max 120)
  if (levelKey === 'N4' || levelKey === 'N5') {
    let langRawEarned = 0;
    let langRawPossible = 0;
    let choukaiRawEarned = 0;
    let choukaiRawPossible = 0;

    for (const sec of params.sections) {
      for (const q of sec.questions) {
        totalQuestionsCount++;
        const userChoice = params.userAnswers[q.id];
        const isCorrect = userChoice === q.correctOption;
        if (isCorrect) correctQuestionsCount++;

        const weight = q.weight || 1;

        if (sec.sectionType === 'LISTENING') {
          choukaiRawPossible += weight;
          if (isCorrect) choukaiRawEarned += weight;
        } else {
          langRawPossible += weight;
          if (isCorrect) langRawEarned += weight;
        }
      }
    }

    // Standardize Section 1 (Lang & Reading -> Max 120)
    const s1Scaled =
      langRawPossible > 0
        ? Math.round((langRawEarned / langRawPossible) * 120)
        : 0;
    const s1Threshold = 38;
    sectionBreakdown.push({
      sectionType: 'LANGUAGE_KNOWLEDGE_READING',
      name: '言語知識・読解 (Gengo Chishiki & Dokkai)',
      rawEarned: langRawEarned,
      rawPossible: langRawPossible,
      scaledScore: s1Scaled,
      maxScore: 120,
      threshold: s1Threshold,
      isPassedSection: s1Scaled >= s1Threshold,
      percentage: langRawPossible > 0 ? Math.round((langRawEarned / langRawPossible) * 100) : 0,
    });

    // Standardize Section 2 (Listening -> Max 60)
    const s2Scaled =
      choukaiRawPossible > 0
        ? Math.round((choukaiRawEarned / choukaiRawPossible) * 60)
        : 0;
    const s2Threshold = 19;
    sectionBreakdown.push({
      sectionType: 'LISTENING',
      name: '聴解 (Choukai)',
      rawEarned: choukaiRawEarned,
      rawPossible: choukaiRawPossible,
      scaledScore: s2Scaled,
      maxScore: 60,
      threshold: s2Threshold,
      isPassedSection: s2Scaled >= s2Threshold,
      percentage: choukaiRawPossible > 0 ? Math.round((choukaiRawEarned / choukaiRawPossible) * 100) : 0,
    });
  } else {
    // For N1, N2, N3: 3 Sections (Vocab/Grammar 60, Reading 60, Listening 60)
    let vocabGrammarEarned = 0;
    let vocabGrammarPossible = 0;
    let readingEarned = 0;
    let readingPossible = 0;
    let listeningEarned = 0;
    let listeningPossible = 0;

    for (const sec of params.sections) {
      for (const q of sec.questions) {
        totalQuestionsCount++;
        const userChoice = params.userAnswers[q.id];
        const isCorrect = userChoice === q.correctOption;
        if (isCorrect) correctQuestionsCount++;

        const weight = q.weight || 1;

        if (sec.sectionType === 'LISTENING') {
          listeningPossible += weight;
          if (isCorrect) listeningEarned += weight;
        } else if (sec.sectionType === 'READING') {
          readingPossible += weight;
          if (isCorrect) readingEarned += weight;
        } else {
          // VOCABULARY or GRAMMAR
          vocabGrammarPossible += weight;
          if (isCorrect) vocabGrammarEarned += weight;
        }
      }
    }

    const s1Scaled =
      vocabGrammarPossible > 0
        ? Math.round((vocabGrammarEarned / vocabGrammarPossible) * 60)
        : 0;
    const s2Scaled =
      readingPossible > 0
        ? Math.round((readingEarned / readingPossible) * 60)
        : 0;
    const s3Scaled =
      listeningPossible > 0
        ? Math.round((listeningEarned / listeningPossible) * 60)
        : 0;

    sectionBreakdown.push({
      sectionType: 'VOCABULARY_GRAMMAR',
      name: '言語知識（文字・語彙・文法） (Gengo Chishiki)',
      rawEarned: vocabGrammarEarned,
      rawPossible: vocabGrammarPossible,
      scaledScore: s1Scaled,
      maxScore: 60,
      threshold: 19,
      isPassedSection: s1Scaled >= 19,
      percentage: vocabGrammarPossible > 0 ? Math.round((vocabGrammarEarned / vocabGrammarPossible) * 100) : 0,
    });

    sectionBreakdown.push({
      sectionType: 'READING',
      name: '読解 (Dokkai)',
      rawEarned: readingEarned,
      rawPossible: readingPossible,
      scaledScore: s2Scaled,
      maxScore: 60,
      threshold: 19,
      isPassedSection: s2Scaled >= 19,
      percentage: readingPossible > 0 ? Math.round((readingEarned / readingPossible) * 100) : 0,
    });

    sectionBreakdown.push({
      sectionType: 'LISTENING',
      name: '聴解 (Choukai)',
      rawEarned: listeningEarned,
      rawPossible: listeningPossible,
      scaledScore: s3Scaled,
      maxScore: 60,
      threshold: 19,
      isPassedSection: s3Scaled >= 19,
      percentage: listeningPossible > 0 ? Math.round((listeningEarned / listeningPossible) * 100) : 0,
    });
  }

  // Calculate Total Score
  const totalScore = sectionBreakdown.reduce((acc, curr) => acc + curr.scaledScore, 0);
  const isTotalPassed = totalScore >= criteria.passScoreTotal;
  const isAllSectionsPassed = sectionBreakdown.every((s) => s.isPassedSection);

  // Absolute Passing Condition
  const isPassed = isTotalPassed && isAllSectionsPassed;

  // Grade calculation
  let gradeText: 'A' | 'B' | 'C' | 'D' | 'F' = 'F';
  const percentageTotal = (totalScore / criteria.maxScore) * 100;
  if (percentageTotal >= 85) gradeText = 'A';
  else if (percentageTotal >= 70) gradeText = 'B';
  else if (percentageTotal >= 55) gradeText = 'C';
  else if (percentageTotal >= 45) gradeText = 'D';
  else gradeText = 'F';

  let summaryMessage = '';
  if (isPassed) {
    summaryMessage = `Selamat! Anda dinyatakan LULUS (合格 - GOUKAKU) ${levelKey} dengan perolehan ${totalScore}/${criteria.maxScore} poin. Seluruh batas aman seksional berhasil dipenuhi tanpa nilai mati.`;
  } else if (!isTotalPassed && !isAllSectionsPassed) {
    summaryMessage = `Anda dinyatakan BELUM LULUS (不合格 - FUGOUKAKU). Total skor ${totalScore}/${criteria.passScoreTotal} belum memenuhi batas kelulusan dan terdapat nilai mati pada seksi tertentu.`;
  } else if (!isTotalPassed) {
    summaryMessage = `Anda dinyatakan BELUM LULUS (不合格 - FUGOUKAKU). Meskipun nilai tiap seksi aman, total skor ${totalScore}/${criteria.passScoreTotal} belum mencapai passing grade.`;
  } else {
    summaryMessage = `Anda dinyatakan BELUM LULUS (不合格 - FUGOUKAKU). Meskipun total skor (${totalScore}) melewati passing grade, terdapat seksi yang terkena NILAI MATI (di bawah batas aman seksional).`;
  }

  const accuracyRate = totalQuestionsCount > 0 ? Math.round((correctQuestionsCount / totalQuestionsCount) * 100) : 0;

  return {
    level: levelKey,
    totalScore,
    maxScore: criteria.maxScore,
    passScoreTotal: criteria.passScoreTotal,
    isTotalPassed,
    isAllSectionsPassed,
    isPassed,
    gradeText,
    sectionBreakdown,
    totalQuestions: totalQuestionsCount,
    correctQuestions: correctQuestionsCount,
    accuracyRate,
    summaryMessage,
  };
}
