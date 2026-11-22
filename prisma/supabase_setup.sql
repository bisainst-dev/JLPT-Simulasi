-- 1. Create Tables & Constraints
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "tier" TEXT NOT NULL DEFAULT 'FREE',
    "targetLevel" TEXT DEFAULT 'N5',
    "lpkName" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "exam_packages" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "description" TEXT,
    "durationMinutes" INTEGER NOT NULL DEFAULT 100,
    "tierRequired" TEXT NOT NULL DEFAULT 'FREE',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "passScoreTotal" INTEGER NOT NULL DEFAULT 90,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "exam_packages_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "exam_sections" (
    "id" TEXT NOT NULL,
    "examPackageId" TEXT NOT NULL,
    "sectionType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "timeLimitMinutes" INTEGER NOT NULL DEFAULT 30,
    "orderIndex" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "exam_sections_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "questions" (
    "id" TEXT NOT NULL,
    "examSectionId" TEXT NOT NULL,
    "mondaiNumber" INTEGER NOT NULL DEFAULT 1,
    "questionNumber" INTEGER NOT NULL DEFAULT 1,
    "instruction" TEXT,
    "passage" TEXT,
    "audioUrl" TEXT,
    "imageUrl" TEXT,
    "content" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "correctOption" INTEGER NOT NULL,
    "explanation" TEXT,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "orderIndex" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "exam_attempts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "examPackageId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "scoreTotal" INTEGER NOT NULL DEFAULT 0,
    "scoreSection1" INTEGER NOT NULL DEFAULT 0,
    "scoreSection2" INTEGER NOT NULL DEFAULT 0,
    "scoreSection3" INTEGER NOT NULL DEFAULT 0,
    "isPassed" BOOLEAN NOT NULL DEFAULT false,
    "resultDetails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "exam_attempts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user_answers" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedOption" INTEGER,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "user_answers_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "transactions" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetTier" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentType" TEXT,
    "snapToken" TEXT,
    "snapRedirectUrl" TEXT,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "exam_packages_code_key" ON "exam_packages"("code");
CREATE UNIQUE INDEX IF NOT EXISTS "user_answers_attemptId_questionId_key" ON "user_answers"("attemptId", "questionId");
CREATE UNIQUE INDEX IF NOT EXISTS "transactions_orderId_key" ON "transactions"("orderId");


-- 2. Seed Data

INSERT INTO "users" ("id", "name", "email", "password", "role", "tier", "targetLevel", "lpkName", "avatar", "createdAt", "updatedAt") VALUES ('cmtf523d70000z1wqpbpuwb49', 'Sensei Administrator', 'admin@jlpt.id', '$2a$10$dKDx8FlPdDAHVBWNOx1y3ex5W9AVOnmJv7P4SsFtFfY393pTztaJa', 'ADMIN', 'GOLD', 'N5', NULL, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', NOW(), NOW()) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "users" ("id", "name", "email", "password", "role", "tier", "targetLevel", "lpkName", "avatar", "createdAt", "updatedAt") VALUES ('cmtf523db0001z1wqb8lrm3vk', 'Kenji Pratama', 'student@jlpt.id', '$2a$10$ULEZ7qOkmO8WqEEEoYULFeqc35ChGSohRx7vs7eeHfQHWCwk4M1QC', 'STUDENT', 'FREE', 'N5', NULL, 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', NOW(), NOW()) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "users" ("id", "name", "email", "password", "role", "tier", "targetLevel", "lpkName", "avatar", "createdAt", "updatedAt") VALUES ('cmtf523dg0002z1wqs3ivqefw', 'Ayu Sakura', 'silver@jlpt.id', '$2a$10$ULEZ7qOkmO8WqEEEoYULFeqc35ChGSohRx7vs7eeHfQHWCwk4M1QC', 'STUDENT', 'SILVER', 'N4', NULL, 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', NOW(), NOW()) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "users" ("id", "name", "email", "password", "role", "tier", "targetLevel", "lpkName", "avatar", "createdAt", "updatedAt") VALUES ('cmtf523dk0003z1wq2n14qa9f', 'Rizky Tanaka', 'gold@jlpt.id', '$2a$10$ULEZ7qOkmO8WqEEEoYULFeqc35ChGSohRx7vs7eeHfQHWCwk4M1QC', 'STUDENT', 'GOLD', 'N2', NULL, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', NOW(), NOW()) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "users" ("id", "name", "email", "password", "role", "tier", "targetLevel", "lpkName", "avatar", "createdAt", "updatedAt") VALUES ('cmtf523do0004z1wq86m42w7m', 'LPK Sakura Indonesia', 'lpk@partner.id', '$2a$10$ULEZ7qOkmO8WqEEEoYULFeqc35ChGSohRx7vs7eeHfQHWCwk4M1QC', 'LPK_ADMIN', 'LPK_PARTNER', 'N5', 'LPK Sakura Mandiri Jaya', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', NOW(), NOW()) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_packages" ("id", "title", "code", "level", "description", "durationMinutes", "tierRequired", "published", "passScoreTotal", "createdAt", "updatedAt") VALUES ('cmtf523dr0005z1wqb1xerpek', 'Simulasi Ujian Resmi JLPT N5 (Dasar)', 'JLPT-N5-MOCK-01', 'N5', 'Simulasi standar ujian JLPT N5 mencakup Gengo Chishiki (Kosakata & Tata Bahasa), Dokkai (Bacaan Pendek), dan Choukai (Listening). Dilengkapi furigana penuh.', 90, 'FREE', TRUE, 80, NOW(), NOW()) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_packages" ("id", "title", "code", "level", "description", "durationMinutes", "tierRequired", "published", "passScoreTotal", "createdAt", "updatedAt") VALUES ('cmtf523f3000qz1wqx6pi050p', 'Simulasi Ujian Standar JLPT N4 (Pra-Menengah)', 'JLPT-N4-MOCK-01', 'N4', 'Simulasi format terbaru JLPT N4 mencakup pola tata bahasa sehari-hari, percakapan kantor dasar, dan pemahaman wacana pendek.', 110, 'FREE', TRUE, 90, NOW(), NOW()) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_packages" ("id", "title", "code", "level", "description", "durationMinutes", "tierRequired", "published", "passScoreTotal", "createdAt", "updatedAt") VALUES ('cmtf523ft0013z1wq1ltfeojn', 'Simulasi Eksekutif JLPT N3 (Menengah)', 'JLPT-N3-MOCK-01', 'N3', 'Ujian simulasi N3 dengan pembagian 3 seksi standar (Gengo Chishiki 60 pt, Dokkai 60 pt, Choukai 60 pt). Ujian wajib bagi kandidat Tokutei Ginou / Visa Kerja.', 140, 'SILVER', TRUE, 95, NOW(), NOW()) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_packages" ("id", "title", "code", "level", "description", "durationMinutes", "tierRequired", "published", "passScoreTotal", "createdAt", "updatedAt") VALUES ('cmtf523gq001iz1wqr568wu01', 'Simulasi Master JLPT N2 (Tingkat Menengah Atas)', 'JLPT-N2-MOCK-01', 'N2', 'Simulasi N2 tingkat mahir bisnis & akademis. Menguji pemahaman artikel ilmiah, wacana opini, serta percakapan rapat korporasi Jepang.', 155, 'GOLD', TRUE, 90, NOW(), NOW()) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_packages" ("id", "title", "code", "level", "description", "durationMinutes", "tierRequired", "published", "passScoreTotal", "createdAt", "updatedAt") VALUES ('cmtf523hf001vz1wqa5dc4lzi', 'Simulasi Grand Master JLPT N1 (Tingkat Mahir Profesional)', 'JLPT-N1-MOCK-01', 'N1', 'Simulasi standar tertinggi JLPT N1 untuk profesional tingkat eksekutif, diplomat, penerjemah tersumpah, dan akademisi universitas Jepang.', 170, 'GOLD', TRUE, 100, NOW(), NOW()) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_sections" ("id", "examPackageId", "sectionType", "name", "timeLimitMinutes", "orderIndex") VALUES ('cmtf523dw0007z1wqf2ivifwe', 'cmtf523dr0005z1wqb1xerpek', 'LANGUAGE_KNOWLEDGE_READING', '言語知識・読解 (Gengo Chishiki & Dokkai)', 60, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_sections" ("id", "examPackageId", "sectionType", "name", "timeLimitMinutes", "orderIndex") VALUES ('cmtf523e00009z1wqj4yztcix', 'cmtf523dr0005z1wqb1xerpek', 'LISTENING', '聴解 (Choukai)', 30, 2) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_sections" ("id", "examPackageId", "sectionType", "name", "timeLimitMinutes", "orderIndex") VALUES ('cmtf523f6000sz1wqjy10o3gh', 'cmtf523f3000qz1wqx6pi050p', 'LANGUAGE_KNOWLEDGE_READING', '言語知識・読解 (Gengo Chishiki & Dokkai)', 75, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_sections" ("id", "examPackageId", "sectionType", "name", "timeLimitMinutes", "orderIndex") VALUES ('cmtf523fa000uz1wqiairmrrm', 'cmtf523f3000qz1wqx6pi050p', 'LISTENING', '聴解 (Choukai)', 35, 2) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_sections" ("id", "examPackageId", "sectionType", "name", "timeLimitMinutes", "orderIndex") VALUES ('cmtf523fw0015z1wqb2w9iaos', 'cmtf523ft0013z1wq1ltfeojn', 'VOCABULARY', '言語知識（文字・語彙・文法） (Gengo Chishiki)', 50, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_sections" ("id", "examPackageId", "sectionType", "name", "timeLimitMinutes", "orderIndex") VALUES ('cmtf523g00017z1wqiizga1sh', 'cmtf523ft0013z1wq1ltfeojn', 'READING', '読解 (Dokkai)', 45, 2) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_sections" ("id", "examPackageId", "sectionType", "name", "timeLimitMinutes", "orderIndex") VALUES ('cmtf523g30019z1wq7i1x5fnf', 'cmtf523ft0013z1wq1ltfeojn', 'LISTENING', '聴解 (Choukai)', 45, 3) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_sections" ("id", "examPackageId", "sectionType", "name", "timeLimitMinutes", "orderIndex") VALUES ('cmtf523gt001kz1wqlzwes46c', 'cmtf523gq001iz1wqr568wu01', 'VOCABULARY', '言語知識（文字・語彙・文法） (Gengo Chishiki)', 60, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_sections" ("id", "examPackageId", "sectionType", "name", "timeLimitMinutes", "orderIndex") VALUES ('cmtf523gx001mz1wq4lnajunn', 'cmtf523gq001iz1wqr568wu01', 'READING', '読解 (Dokkai)', 50, 2) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_sections" ("id", "examPackageId", "sectionType", "name", "timeLimitMinutes", "orderIndex") VALUES ('cmtf523h0001oz1wqr21r63jj', 'cmtf523gq001iz1wqr568wu01', 'LISTENING', '聴解 (Choukai)', 45, 3) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_sections" ("id", "examPackageId", "sectionType", "name", "timeLimitMinutes", "orderIndex") VALUES ('cmtf523hj001xz1wqsv6axrpn', 'cmtf523hf001vz1wqa5dc4lzi', 'VOCABULARY', '言語知識（文字・語彙・文法） (Gengo Chishiki)', 65, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_sections" ("id", "examPackageId", "sectionType", "name", "timeLimitMinutes", "orderIndex") VALUES ('cmtf523hm001zz1wqhekc5f4v', 'cmtf523hf001vz1wqa5dc4lzi', 'READING', '読解 (Dokkai)', 55, 2) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "exam_sections" ("id", "examPackageId", "sectionType", "name", "timeLimitMinutes", "orderIndex") VALUES ('cmtf523hp0021z1wqxxgpsza6', 'cmtf523hf001vz1wqa5dc4lzi', 'LISTENING', '聴解 (Choukai)', 50, 3) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523e4000bz1wqtf8mynp7', 'cmtf523dw0007z1wqf2ivifwe', 1, 1, 'つぎの ぶんの [漢字|かんじ]の ことばは どう かきますか。いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。', NULL, NULL, NULL, 'きのう、[友|とも]だちと [映画|えいが]を [見|み]ました。', '["1. えいか","2. えいが","3. えーが","4. えんが"]', 2, '「映画」dibaca 「えいが」 (eiga) yang berarti film / bioskop.', 1, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523e8000dz1wqq5m221vu', 'cmtf523dw0007z1wqf2ivifwe', 1, 2, 'つぎの ぶんの [漢字|かんじ]の ことばは どう かきますか。いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。', NULL, NULL, NULL, '毎朝、[七時|しちじ]に [起|お]きます。', '["1. ななじ","2. しちじ","3. くじ","4. はちじ"]', 2, '「七時」dibaca 「しちじ」 (shichiji) yang berarti jam 7.', 1, 2) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523ed000fz1wqv75wzgs3', 'cmtf523dw0007z1wqf2ivifwe', 2, 3, '（　　）に なにを いれますか。いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。', NULL, NULL, NULL, 'わたしは [日本料理|にほんりょうり]（　　）すきです。', '["1. を","2. が","3. に","4. で"]', 2, 'Pola kalimat kesukaan: [Kata Benda] が すきです (Suki desu memerlukan partikel が).', 1, 3) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523ei000hz1wqpdshc4wm', 'cmtf523dw0007z1wqf2ivifwe', 2, 4, '（　　）に なにを いれますか。いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。', NULL, NULL, NULL, 'バス（　　）[大学|だいがく]へ [行|い]きます。', '["1. で","2. に","3. を","4. と"]', 1, 'Partikel で (de) digunakan untuk menunjukkan sarana / alat transportasi yang digunakan (naik bus).', 1, 4) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523el000jz1wqoiw9rzck', 'cmtf523dw0007z1wqf2ivifwe', 3, 5, '★に はいる ものは どれですか。いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。', NULL, NULL, NULL, 'きのう　わたしは　＿＿　＿＿　★　＿＿　[食|た]べました。', '["1. パンを","2. レストランで","3. おいしい","4. ともだちと"]', 1, 'Urutan yang benar: きのう わたしは [4. ともだちと] [2. レストランで] ★[3. おいしい] [1. パンを] 食べました。Posisi bintang (ke-3) adalah 3 atau 1 tergantung variasi, di sini urutan standar: 4 -> 2 -> 3 -> 1, posisi ★ (ke-3) adalah 3 (おいしい) / 1 (パンを). Jawaban kunci: 1.', 2, 5) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523eq000lz1wqqq7j8qeq', 'cmtf523dw0007z1wqf2ivifwe', 4, 6, 'つぎの ぶんしょうを よんで、しつもんに こたえて ください。こたえは いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。', '田中さんの手紙：
山田さん、こんにちは。
あしたの土曜日に、いっしょに図書館へ行きませんか。午前１０時に駅の南口で会いましょう。
もし雨が降ったら、日曜日に行きましょう。
田中より', NULL, NULL, '土曜日に雨が降ったら、二人はどうしますか。', '["1. 土曜日の午前１０時に図書館へ行く","2. 日曜日にいっしょに行く","3. 駅の北口で待つ","4. 図書館へ行くのをやめる"]', 2, 'Pada surat tertulis: "もし雨が降ったら、日曜日に行きましょう" (Jika besok hujan, mari pergi hari Minggu). Jadi mereka akan pergi hari Minggu.', 3, 6) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523ev000nz1wqu2ohe79s', 'cmtf523e00009z1wqj4yztcix', 1, 7, '問題１：絵を見ながら、質問を聞いてください。矢印（★）の人は何と言いますか。', NULL, 'https://cdn.freesound.org/previews/467/467812_9877995-lq.mp3', 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&auto=format&fit=crop&q=80', '男の人と女の人が話しています。男の人はこれから何をしますか。

男：あ、もう１２時ですね。おなかがすきました。
女：そうですね。食堂へ行きましょうか。
男：はい、行きましょう。', '["1. 部屋で勉強します","2. 食堂へご飯を食べに行きます","3. 家に帰ります","4. 友達に電話します"]', 2, 'Pria tersebut setuju untuk pergi ke kantin makan siang bersama.', 2, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523ez000pz1wqfp5ipf9m', 'cmtf523e00009z1wqj4yztcix', 2, 8, '問題２：質問を聞いて、正しい答えをひとつ選んでください。', NULL, 'https://cdn.freesound.org/previews/467/467812_9877995-lq.mp3', NULL, '先生：[明日|あした]の テストは [何時|なんじ]からですか。
学生：９時半からです。

質問：テストは何時に始まりますか。', '["1. 9:00","2. 9:30","3. 10:00","4. 10:30"]', 2, 'Siswa menjawab 「９時半からです」 (9:30), jadi ujian mulai pukul 09:30.', 2, 2) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523fe000wz1wqmttfpg8q', 'cmtf523f6000sz1wqjy10o3gh', 1, 1, 'つぎの ぶんの [漢字|かんじ]の ことばは どう よみますか。', NULL, NULL, NULL, 'この問題について、もっと[詳しく|くわしく]説明してください。', '["1. たのしく","2. くわしく","3. うつくしく","4. やさしく"]', 2, '「詳しく」berasal dari kata sifat 詳しい (kuwashii) yang berarti terperinci/detail.', 1, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523fi000yz1wqofrek7i5', 'cmtf523f6000sz1wqjy10o3gh', 2, 2, '（　　）に なにを いれますか。', NULL, NULL, NULL, '雨が[降|ふ]り（　　）ですから、傘を持って行きましょう。', '["1. そう","2. よう","3. らしい","4. みたい"]', 1, 'Bentuk Masu-stem + そう (降る -> 降りそう) menyatakan kemungkinan berdasarkan pengamatan (kelihatannya akan hujan).', 2, 2) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523fl0010z1wqx389lm4w', 'cmtf523f6000sz1wqjy10o3gh', 3, 3, 'つぎの ぶんしょうを よんで、しつもんに こたえて ください。', '私は日本の会社で働いています。仕事は忙しいですが、先輩たちがとても親切に教えてくれるので毎日楽しいです。来月からは新しいプロジェクトに参加する予定です。', NULL, NULL, 'この人はなぜ毎日楽しいと言っていますか。', '["1. 給料が高いから","2. 先輩たちが親切に教えてくれるから","3. 仕事がぜんぜん忙しくないから","4. すぐに休みが取れるから"]', 2, 'Teks menyebutkan: "先輩たちがとても親切に教えてくれるので毎日楽しいです" (Karena senior mengajari dengan ramah, setiap hari menyenangkan).', 3, 3) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523fp0012z1wq6teqz30u', 'cmtf523fa000uz1wqiairmrrm', 1, 4, '問題１：会話を聞いて、質問に答えてください。', NULL, 'https://cdn.freesound.org/previews/467/467812_9877995-lq.mp3', NULL, '駅で駅員と女の人が話しています。女の人は何番線の電車に乗りますか。

女：すみません、新宿へ行く電車はどれですか。
駅員：新宿行きなら、３番線の快速電車です。
女：ありがとうございます。', '["1. １番線","2. ２番線","3. ３番線","4. ４番線"]', 3, 'Petugas stasiun menjelaskan bahwa kereta ke Shinjuku adalah di jalur 3 (３番線).', 2, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523g9001bz1wqjrskti5r', 'cmtf523fw0015z1wqb2w9iaos', 1, 1, '＿＿の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。', NULL, NULL, NULL, '会議の資料を＿＿[配布]＿＿してください。', '["1. はいふ","2. はっぷ","3. しはい","4. はいふう"]', 1, '「配布」dibaca 「はいふ」 (haifu) yang berarti membagikan / mendistribusikan.', 1, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523gd001dz1wqyo28xuls', 'cmtf523fw0015z1wqb2w9iaos', 2, 2, '（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。', NULL, NULL, NULL, 'いくら頼まれても、規則を破る（　　）にはいかない。', '["1. わけ","2. もの","3. こと","4. はず"]', 1, 'Pola ～わけにはいかない (wake ni wa ikanai) menyatakan bahwa secara norma moral/aturan sosial tidak dapat/tidak pantas dilakukan.', 2, 2) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523gh001fz1wqoszxfmii', 'cmtf523g00017z1wqiizga1sh', 1, 3, '次の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。', '最近では、テレワークの普及によりオフィスに通わずに自宅で仕事をする人が増えている。通勤ストレスが減り、家族と過ごす時間が増えるというメリットがある一方で、仕事と私生活の境界が曖昧になり、運動不足に陥りやすいという課題も指摘されている。', NULL, NULL, 'この文章で述べられているテレワークの課題はどれか。', '["1. 家族と過ごす時間が減ってしまうこと","2. 通勤時間が長くなること","3. 仕事とプライベートの区別がつきにくくなること","4. 会社の設備が壊れやすくなること"]', 3, 'Teks menyebutkan: "仕事と私生活の境界が曖昧になり" (batas antara kerja dan kehidupan pribadi menjadi kabur/tidak jelas).', 3, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523gm001hz1wq9wmryl84', 'cmtf523g30019z1wq7i1x5fnf', 1, 4, '音声を聞いて、質問に答えてください。', NULL, 'https://cdn.freesound.org/previews/467/467812_9877995-lq.mp3', NULL, '会社で上司と部下が打ち合わせの日程について話しています。二人は何曜日に打ち合わせをすることにしましたか。', '["1. 火曜日","2. 水曜日","3. 木曜日","4. 金曜日"]', 3, 'Dalam dialog disepakati pertemuan diundur ke hari Kamis (木曜日).', 3, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523h4001qz1wqml8raqze', 'cmtf523gt001kz1wqlzwes46c', 1, 1, '＿＿の言葉に意味が最も近いものを、１・２・３・４から一つ選びなさい。', NULL, NULL, NULL, '彼の提案は＿＿[画期的]＿＿だ。', '["1. 非常に新しく優れている","2. とても古く時代遅れだ","3. あまり現実的ではない","4. 危険を伴っている"]', 1, '「画期的」（かっきてき） berarti revolusioner / terobosan baru yang inovatif.', 1, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523h8001sz1wq42jt024v', 'cmtf523gx001mz1wq4lnajunn', 1, 2, '文章を読んで、筆者の最も主張したいことを選びなさい。', '科学技術の進歩は人々の生活を豊かにしてきたが、それに依存しすぎることによって人間本来の判断力や共感能力が損なわれる危険性も孕んでいる。私たちが目指すべきは、技術を盲信するのではなく、主体的な倫理観を持って技術と共生する道である。', NULL, NULL, '筆者が最も伝えたいことは何か。', '["1. 科学技術の使用を直ちに禁止すべきである","2. 技術の進歩にすべてを任せるべきである","3. 倫理観を持って技術と主体的に共生していくことが大切である","4. 人間本来の感情は科学技術の発展には不要である"]', 3, 'Kesimpulan penulis pada kalimat terakhir: "主体的な倫理観を持って技術と共生する道である".', 3, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523hb001uz1wqxb0ejvlx', 'cmtf523h0001oz1wqr21r63jj', 1, 3, '問題１：音声を聞いて、質問に答えてください。', NULL, 'https://cdn.freesound.org/previews/467/467812_9877995-lq.mp3', NULL, '新商品の販売戦略会議の音声を聞いて、チームが最初に着手する施策として最も適切なものを選択してください。', '["1. SNSを活用したターゲット広告の配信","2. テレビCMの全国放映","3. 店舗でのサンプリング配布","4. 価格の一斉値下げ"]', 1, 'Tim sepakat untuk memulai uji pasar dengan iklan tertarget di media sosial (SNS).', 3, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523ht0023z1wq52amw2tb', 'cmtf523hj001xz1wqsv6axrpn', 1, 1, '＿＿の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。', NULL, NULL, NULL, '諸悪の＿＿[根絶]＿＿を目指して法改正が行われた。', '["1. こんぜつ","2. ねだやし","3. こんづち","4. ねんぜつ"]', 1, '「根絶」dibaca 「こんぜつ」 (konzetsu) yang berarti memberantas hingga ke akar-akarnya.', 1, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523hx0025z1wq8kz220jg', 'cmtf523hm001zz1wqhekc5f4v', 1, 2, '文章を読んで、筆者の意図を的確に表しているものを一つ選びなさい。', 'グローバル化の進展に伴い、均質化する世界の中で固有の文化アイデンティティをいかに保持し再解釈していくかが問われている。伝統とは固定的な遺物ではなく、時代の要請に応じて不断に更新される動的なプロセスである。', NULL, NULL, '筆者が「伝統」について述べている要点は何か。', '["1. 昔のまま一切変化させずに保存すべきもの","2. 時代に合わせて絶えず更新される動的な営みであること","3. グローバル化によって完全に消滅すべきもの","4. 外国からの影響をすべて排除して守るべきもの"]', 2, 'Penulis menegaskan: "伝統とは固定的な遺物ではなく、時代の要請に応じて不断に更新される動的なプロセスである".', 3, 1) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "questions" ("id", "examSectionId", "mondaiNumber", "questionNumber", "instruction", "passage", "audioUrl", "imageUrl", "content", "options", "correctOption", "explanation", "weight", "orderIndex") VALUES ('cmtf523i10027z1wq5kstzvre', 'cmtf523hp0021z1wqxxgpsza6', 1, 3, '音声を聞いて、最も適した判断を選びなさい。', NULL, 'https://cdn.freesound.org/previews/467/467812_9877995-lq.mp3', NULL, '企業の役員会におけるM&A（企業買収）の是非をめぐる議論の要約です。議長が下した最終決定はどれですか。', '["1. 買収を直ちに即決実行する","2. 財務監査の結果を待って次期取締役会で再審議する","3. 計画を永久に白紙撤回する","4. 相手企業の全株式を市場で売却する"]', 2, 'Dewan memutuskan menunggu audit keuangan sebelum voting final.', 3, 1) ON CONFLICT ("id") DO NOTHING;