/**
 * BISA JLPT Simulation Exam - Scoring Engine (Static IRT Approximation & Passing Evaluation)
 * Implements strict JLPT dual-condition pass/fail criteria and sectional scaling.
 */

export type JlptLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';

export interface SectionThreshold {
  id: string;
  name: string;
  label: string;
  maxScore: number;
  minPassScore: number;
}

export interface LevelConfig {
  name: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalMaxScore: number;
  passingTotal: number;
  sections: SectionThreshold[];
}

export const JLPT_CONFIG: Record<JlptLevel, LevelConfig> = {
  N1: {
    name: "JLPT N1",
    title: "Tingkat Mahir (Advanced Level)",
    description: "Mampu memahami bahasa Jepang dalam berbagai situasi kompleks dan konteks akademis/profesional.",
    durationMinutes: 170,
    totalMaxScore: 180,
    passingTotal: 100,
    sections: [
      { id: "lang_know", name: "言語知識（文字・語彙・文法）", label: "Pengetahuan Bahasa (Kosakata & Tata Bahasa)", maxScore: 60, minPassScore: 19 },
      { id: "reading", name: "読解", label: "Membaca (Reading Comprehension)", maxScore: 60, minPassScore: 19 },
      { id: "listening", name: "聴解", label: "Mendengarkan (Listening Comprehension)", maxScore: 60, minPassScore: 19 }
    ]
  },
  N2: {
    name: "JLPT N2",
    title: "Tingkat Menengah Atas (Upper-Intermediate)",
    description: "Mampu memahami bahasa Jepang yang digunakan dalam situasi sehari-hari dan dalam berbagai keadaan umum.",
    durationMinutes: 155,
    totalMaxScore: 180,
    passingTotal: 90,
    sections: [
      { id: "lang_know", name: "言語知識（文字・語彙・文法）", label: "Pengetahuan Bahasa (Kosakata & Tata Bahasa)", maxScore: 60, minPassScore: 19 },
      { id: "reading", name: "読解", label: "Membaca (Reading Comprehension)", maxScore: 60, minPassScore: 19 },
      { id: "listening", name: "聴解", label: "Mendengarkan (Listening Comprehension)", maxScore: 60, minPassScore: 19 }
    ]
  },
  N3: {
    name: "JLPT N3",
    title: "Tingkat Menengah (Intermediate Level)",
    description: "Jembatan antara N4 dan N2, mampu memahami bahasa Jepang yang digunakan dalam kehidupan sehari-hari sampai tingkat tertentu.",
    durationMinutes: 140,
    totalMaxScore: 180,
    passingTotal: 95,
    sections: [
      { id: "lang_know", name: "言語知識（文字・語彙・文法）", label: "Pengetahuan Bahasa (Kosakata & Tata Bahasa)", maxScore: 60, minPassScore: 19 },
      { id: "reading", name: "読解", label: "Membaca (Reading Comprehension)", maxScore: 60, minPassScore: 19 },
      { id: "listening", name: "聴解", label: "Mendengarkan (Listening Comprehension)", maxScore: 60, minPassScore: 19 }
    ]
  },
  N4: {
    name: "JLPT N4",
    title: "Tingkat Dasar Lanjutan (Elementary Level)",
    description: "Mampu memahami bahasa Jepang dasar yang digunakan dalam percakapan sehari-hari dan wacana sederhana.",
    durationMinutes: 115,
    totalMaxScore: 180,
    passingTotal: 90,
    sections: [
      { id: "lang_reading", name: "言語知識（文字・語彙・文法）・読解", label: "Pengetahuan Bahasa & Membaca", maxScore: 120, minPassScore: 38 },
      { id: "listening", name: "聴解", label: "Mendengarkan (Listening Comprehension)", maxScore: 60, minPassScore: 19 }
    ]
  },
  N5: {
    name: "JLPT N5",
    title: "Tingkat Dasar Pemula (Beginner Level)",
    description: "Mampu memahami beberapa bahasa Jepang dasar (Hiragana, Katakana, Kanji dasar, dan kalimat harian sederhana).",
    durationMinutes: 90,
    totalMaxScore: 180,
    passingTotal: 80,
    sections: [
      { id: "lang_reading", name: "言語知識（文字・語彙・文法）・読解", label: "Pengetahuan Bahasa & Membaca", maxScore: 120, minPassScore: 38 },
      { id: "listening", name: "聴解", label: "Mendengarkan (Listening Comprehension)", maxScore: 60, minPassScore: 19 }
    ]
  }
};

export interface QuestionData {
  id: string;
  sectionId: string;
  subCategory: string;
  weight: number;
  instruction: string;
  passage?: string | null;
  questionText: string;
  options: string[];
  correctOption: number;
  explanation: string;
  audioScript?: string | null;
  audioDialogue?: string | null;
  ttsPrompt?: string | null;
}

export interface SectionEvaluation {
  id: string;
  name: string;
  label: string;
  maxScore: number;
  minPassScore: number;
  totalWeight: number;
  earnedWeight: number;
  totalQuestions: number;
  correctQuestions: number;
  scaledScore: number;
  isSectionPassed: boolean;
}

export interface EvaluationResult {
  level: JlptLevel;
  levelConfig: LevelConfig;
  isPassed: boolean;
  statusGrade: string;
  statusMessage: string;
  conditions: {
    totalScoreCondition: {
      required: number;
      actual: number;
      passed: boolean;
    };
    sectionalScoresCondition: {
      allPassed: boolean;
      failedSections: { id: string; label: string; actual: number; required: number }[];
    };
  };
  totalScaledScore: number;
  sectionalBreakdown: SectionEvaluation[];
}

export class JLPTScoringEngine {
  static evaluateExam(
    level: JlptLevel,
    questions: QuestionData[],
    userAnswers: Record<string, number>
  ): EvaluationResult {
    const config = JLPT_CONFIG[level];
    if (!config || !questions) {
      throw new Error(`Invalid JLPT Level: ${level}`);
    }

    const sectionStats: Record<string, SectionEvaluation> = {};
    config.sections.forEach(sec => {
      sectionStats[sec.id] = {
        id: sec.id,
        name: sec.name,
        label: sec.label,
        maxScore: sec.maxScore,
        minPassScore: sec.minPassScore,
        totalWeight: 0,
        earnedWeight: 0,
        totalQuestions: 0,
        correctQuestions: 0,
        scaledScore: 0,
        isSectionPassed: false
      };
    });

    questions.forEach((q) => {
      const section = sectionStats[q.sectionId];
      if (!section) return;

      const userChoice = userAnswers[q.id];
      const isAnswered = userChoice !== undefined && userChoice !== null;
      const isCorrect = isAnswered && userChoice === q.correctOption;
      const earnedWeight = isCorrect ? q.weight : 0;

      section.totalWeight += q.weight;
      section.totalQuestions += 1;
      if (isCorrect) {
        section.earnedWeight += earnedWeight;
        section.correctQuestions += 1;
      }
    });

    let totalScaledScore = 0;
    let allSectionsPassed = true;
    const sectionalBreakdown: SectionEvaluation[] = [];

    config.sections.forEach(sec => {
      const stat = sectionStats[sec.id];
      if (stat.totalWeight > 0) {
        const rawScaled = (stat.earnedWeight / stat.totalWeight) * stat.maxScore;
        stat.scaledScore = Math.round(rawScaled);
      } else {
        stat.scaledScore = 0;
      }

      stat.isSectionPassed = stat.scaledScore >= stat.minPassScore;
      if (!stat.isSectionPassed) {
        allSectionsPassed = false;
      }

      totalScaledScore += stat.scaledScore;
      sectionalBreakdown.push(stat);
    });

    totalScaledScore = Math.min(180, Math.max(0, totalScaledScore));

    const isTotalScorePassed = totalScaledScore >= config.passingTotal;
    const isSectionalScorePassed = allSectionsPassed;
    const isPassed = isTotalScorePassed && isSectionalScorePassed;

    let statusMessage = "";
    let statusGrade = "";

    if (isPassed) {
      if (totalScaledScore >= config.passingTotal + 35) {
        statusGrade = "Sangat Memuaskan (A / 優)";
        statusMessage = `Selamat! Anda LULUS dengan predikat sangat memuaskan. Total skor (${totalScaledScore}/180) dan seluruh nilai seksi melampaui standar kelulusan JLPT ${level}.`;
      } else {
        statusGrade = "Lulus (B / 良)";
        statusMessage = `Selamat! Anda dinyatakan LULUS ujian JLPT ${level}. Anda telah memenuhi syarat total nilai minimum (${config.passingTotal}/180) dan tidak memiliki nilai mati pada setiap seksi.`;
      }
    } else {
      if (!isTotalScorePassed && !isSectionalScorePassed) {
        statusGrade = "Tidak Lulus (不合格)";
        statusMessage = `Anda BELUM LULUS. Total skor Anda (${totalScaledScore}/180) di bawah batas minimum (${config.passingTotal}), dan terdapat bagian yang belum mencapai batas aman passing grade.`;
      } else if (!isTotalScorePassed) {
        statusGrade = "Tidak Lulus (不合格)";
        statusMessage = `Anda BELUM LULUS. Akumulasi total skor Anda (${totalScaledScore}/180) belum mencapai ambang kelulusan (${config.passingTotal}/180).`;
      } else {
        statusGrade = "Tidak Lulus - Gugur Sectional (不合格)";
        const failedSections = sectionalBreakdown
          .filter(s => !s.isSectionPassed)
          .map(s => `${s.label} (${s.scaledScore}/${s.minPassScore})`)
          .join(", ");
        statusMessage = `PERHATIAN: Total skor Anda (${totalScaledScore}/180) sudah mencapai batas kelulusan (min ${config.passingTotal}), namun Anda dinyatakan TIDAK LULUS karena gugur pada batas aman seksional (nilai mati): ${failedSections}.`;
      }
    }

    return {
      level,
      levelConfig: config,
      isPassed,
      statusGrade,
      statusMessage,
      conditions: {
        totalScoreCondition: {
          required: config.passingTotal,
          actual: totalScaledScore,
          passed: isTotalScorePassed
        },
        sectionalScoresCondition: {
          allPassed: allSectionsPassed,
          failedSections: sectionalBreakdown
            .filter(s => !s.isSectionPassed)
            .map(s => ({ id: s.id, label: s.label, actual: s.scaledScore, required: s.minPassScore }))
        }
      },
      totalScaledScore,
      sectionalBreakdown
    };
  }
}
