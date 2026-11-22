const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Cleaning database ---');
  await prisma.userAnswer.deleteMany();
  await prisma.examAttempt.deleteMany();
  await prisma.question.deleteMany();
  await prisma.examSection.deleteMany();
  await prisma.examPackage.deleteMany();
  await prisma.user.deleteMany();

  console.log('--- Seeding Users ---');
  const passwordHash = await bcrypt.hash('password123', 10);
  const adminPasswordHash = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Sensei Administrator',
      email: 'admin@jlpt.id',
      password: adminPasswordHash,
      role: 'ADMIN',
      tier: 'GOLD',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  });

  const studentFree = await prisma.user.create({
    data: {
      name: 'Kenji Pratama',
      email: 'student@jlpt.id',
      password: passwordHash,
      role: 'STUDENT',
      tier: 'FREE',
      targetLevel: 'N5',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    },
  });

  const studentSilver = await prisma.user.create({
    data: {
      name: 'Ayu Sakura',
      email: 'silver@jlpt.id',
      password: passwordHash,
      role: 'STUDENT',
      tier: 'SILVER',
      targetLevel: 'N4',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
  });

  const studentGold = await prisma.user.create({
    data: {
      name: 'Rizky Tanaka',
      email: 'gold@jlpt.id',
      password: passwordHash,
      role: 'STUDENT',
      tier: 'GOLD',
      targetLevel: 'N2',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
  });

  const lpkPartner = await prisma.user.create({
    data: {
      name: 'LPK Sakura Indonesia',
      email: 'lpk@partner.id',
      password: passwordHash,
      role: 'LPK_ADMIN',
      tier: 'LPK_PARTNER',
      lpkName: 'LPK Sakura Mandiri Jaya',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
  });

  console.log('--- Seeding JLPT Exam Packages ---');

  // ==========================================
  // 1. JLPT N5 Official Simulation Pack
  // ==========================================
  const n5Exam = await prisma.examPackage.create({
    data: {
      title: 'Simulasi Ujian Resmi JLPT N5 (Dasar)',
      code: 'JLPT-N5-MOCK-01',
      level: 'N5',
      description: 'Simulasi standar ujian JLPT N5 mencakup Gengo Chishiki (Kosakata & Tata Bahasa), Dokkai (Bacaan Pendek), dan Choukai (Listening). Dilengkapi furigana penuh.',
      durationMinutes: 90,
      tierRequired: 'FREE',
      published: true,
      passScoreTotal: 80,
    },
  });

  // Section 1: N5 Language Knowledge & Reading (Gengo Chishiki & Dokkai) - Max 120, Pass threshold 38
  const n5Sec1 = await prisma.examSection.create({
    data: {
      examPackageId: n5Exam.id,
      sectionType: 'LANGUAGE_KNOWLEDGE_READING',
      name: '言語知識・読解 (Gengo Chishiki & Dokkai)',
      timeLimitMinutes: 60,
      orderIndex: 1,
    },
  });

  // Section 2: N5 Listening (Choukai) - Max 60, Pass threshold 19
  const n5Sec2 = await prisma.examSection.create({
    data: {
      examPackageId: n5Exam.id,
      sectionType: 'LISTENING',
      name: '聴解 (Choukai)',
      timeLimitMinutes: 30,
      orderIndex: 2,
    },
  });

  // Questions for N5 Section 1
  const n5Sec1Questions = [
    {
      mondaiNumber: 1,
      questionNumber: 1,
      instruction: 'つぎの ぶんの [漢字|かんじ]の ことばは どう かきますか。いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。',
      content: 'きのう、[友|とも]だちと [映画|えいが]を [見|み]ました。',
      options: JSON.stringify(['1. えいか', '2. えいが', '3. えーが', '4. えんが']),
      correctOption: 2,
      explanation: '「映画」dibaca 「えいが」 (eiga) yang berarti film / bioskop.',
      weight: 1,
      orderIndex: 1,
    },
    {
      mondaiNumber: 1,
      questionNumber: 2,
      instruction: 'つぎの ぶんの [漢字|かんじ]の ことばは どう かきますか。いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。',
      content: '毎朝、[七時|しちじ]に [起|お]きます。',
      options: JSON.stringify(['1. ななじ', '2. しちじ', '3. くじ', '4. はちじ']),
      correctOption: 2,
      explanation: '「七時」dibaca 「しちじ」 (shichiji) yang berarti jam 7.',
      weight: 1,
      orderIndex: 2,
    },
    {
      mondaiNumber: 2,
      questionNumber: 3,
      instruction: '（　　）に なにを いれますか。いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。',
      content: 'わたしは [日本料理|にほんりょうり]（　　）すきです。',
      options: JSON.stringify(['1. を', '2. が', '3. に', '4. で']),
      correctOption: 2,
      explanation: 'Pola kalimat kesukaan: [Kata Benda] が すきです (Suki desu memerlukan partikel が).',
      weight: 1,
      orderIndex: 3,
    },
    {
      mondaiNumber: 2,
      questionNumber: 4,
      instruction: '（　　）に なにを いれますか。いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。',
      content: 'バス（　　）[大学|だいがく]へ [行|い]きます。',
      options: JSON.stringify(['1. で', '2. に', '3. を', '4. と']),
      correctOption: 1,
      explanation: 'Partikel で (de) digunakan untuk menunjukkan sarana / alat transportasi yang digunakan (naik bus).',
      weight: 1,
      orderIndex: 4,
    },
    {
      mondaiNumber: 3,
      questionNumber: 5,
      instruction: '★に はいる ものは どれですか。いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。',
      content: 'きのう　わたしは　＿＿　＿＿　★　＿＿　[食|た]べました。',
      options: JSON.stringify(['1. パンを', '2. レストランで', '3. おいしい', '4. ともだちと']),
      correctOption: 1,
      explanation: 'Urutan yang benar: きのう わたしは [4. ともだちと] [2. レストランで] ★[3. おいしい] [1. パンを] 食べました。Posisi bintang (ke-3) adalah 3 atau 1 tergantung variasi, di sini urutan standar: 4 -> 2 -> 3 -> 1, posisi ★ (ke-3) adalah 3 (おいしい) / 1 (パンを). Jawaban kunci: 1.',
      weight: 2,
      orderIndex: 5,
    },
    {
      mondaiNumber: 4,
      questionNumber: 6,
      instruction: 'つぎの ぶんしょうを よんで、しつもんに こたえて ください。こたえは いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。',
      passage: '田中さんの手紙：\n山田さん、こんにちは。\nあしたの土曜日に、いっしょに図書館へ行きませんか。午前１０時に駅の南口で会いましょう。\nもし雨が降ったら、日曜日に行きましょう。\n田中より',
      content: '土曜日に雨が降ったら、二人はどうしますか。',
      options: JSON.stringify([
        '1. 土曜日の午前１０時に図書館へ行く',
        '2. 日曜日にいっしょに行く',
        '3. 駅の北口で待つ',
        '4. 図書館へ行くのをやめる'
      ]),
      correctOption: 2,
      explanation: 'Pada surat tertulis: "もし雨が降ったら、日曜日に行きましょう" (Jika besok hujan, mari pergi hari Minggu). Jadi mereka akan pergi hari Minggu.',
      weight: 3,
      orderIndex: 6,
    },
  ];

  for (const q of n5Sec1Questions) {
    await prisma.question.create({
      data: {
        examSectionId: n5Sec1.id,
        ...q,
      },
    });
  }

  // Questions for N5 Section 2 (Listening)
  const n5Sec2Questions = [
    {
      mondaiNumber: 1,
      questionNumber: 7,
      instruction: '問題１：絵を見ながら、質問を聞いてください。矢印（★）の人は何と言いますか。',
      audioUrl: 'https://cdn.freesound.org/previews/467/467812_9877995-lq.mp3',
      imageUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&auto=format&fit=crop&q=80',
      content: '男の人と女の人が話しています。男の人はこれから何をしますか。\n\n男：あ、もう１２時ですね。おなかがすきました。\n女：そうですね。食堂へ行きましょうか。\n男：はい、行きましょう。',
      options: JSON.stringify([
        '1. 部屋で勉強します',
        '2. 食堂へご飯を食べに行きます',
        '3. 家に帰ります',
        '4. 友達に電話します'
      ]),
      correctOption: 2,
      explanation: 'Pria tersebut setuju untuk pergi ke kantin makan siang bersama.',
      weight: 2,
      orderIndex: 1,
    },
    {
      mondaiNumber: 2,
      questionNumber: 8,
      instruction: '問題２：質問を聞いて、正しい答えをひとつ選んでください。',
      audioUrl: 'https://cdn.freesound.org/previews/467/467812_9877995-lq.mp3',
      content: '先生：[明日|あした]の テストは [何時|なんじ]からですか。\n学生：９時半からです。\n\n質問：テストは何時に始まりますか。',
      options: JSON.stringify(['1. 9:00', '2. 9:30', '3. 10:00', '4. 10:30']),
      correctOption: 2,
      explanation: 'Siswa menjawab 「９時半からです」 (9:30), jadi ujian mulai pukul 09:30.',
      weight: 2,
      orderIndex: 2,
    },
  ];

  for (const q of n5Sec2Questions) {
    await prisma.question.create({
      data: {
        examSectionId: n5Sec2.id,
        ...q,
      },
    });
  }

  // ==========================================
  // 2. JLPT N4 Simulation Pack
  // ==========================================
  const n4Exam = await prisma.examPackage.create({
    data: {
      title: 'Simulasi Ujian Standar JLPT N4 (Pra-Menengah)',
      code: 'JLPT-N4-MOCK-01',
      level: 'N4',
      description: 'Simulasi format terbaru JLPT N4 mencakup pola tata bahasa sehari-hari, percakapan kantor dasar, dan pemahaman wacana pendek.',
      durationMinutes: 110,
      tierRequired: 'FREE',
      published: true,
      passScoreTotal: 90,
    },
  });

  const n4Sec1 = await prisma.examSection.create({
    data: {
      examPackageId: n4Exam.id,
      sectionType: 'LANGUAGE_KNOWLEDGE_READING',
      name: '言語知識・読解 (Gengo Chishiki & Dokkai)',
      timeLimitMinutes: 75,
      orderIndex: 1,
    },
  });

  const n4Sec2 = await prisma.examSection.create({
    data: {
      examPackageId: n4Exam.id,
      sectionType: 'LISTENING',
      name: '聴解 (Choukai)',
      timeLimitMinutes: 35,
      orderIndex: 2,
    },
  });

  const n4Sec1Questions = [
    {
      mondaiNumber: 1,
      questionNumber: 1,
      instruction: 'つぎの ぶんの [漢字|かんじ]の ことばは どう よみますか。',
      content: 'この問題について、もっと[詳しく|くわしく]説明してください。',
      options: JSON.stringify(['1. たのしく', '2. くわしく', '3. うつくしく', '4. やさしく']),
      correctOption: 2,
      explanation: '「詳しく」berasal dari kata sifat 詳しい (kuwashii) yang berarti terperinci/detail.',
      weight: 1,
      orderIndex: 1,
    },
    {
      mondaiNumber: 2,
      questionNumber: 2,
      instruction: '（　　）に なにを いれますか。',
      content: '雨が[降|ふ]り（　　）ですから、傘を持って行きましょう。',
      options: JSON.stringify(['1. そう', '2. よう', '3. らしい', '4. みたい']),
      correctOption: 1,
      explanation: 'Bentuk Masu-stem + そう (降る -> 降りそう) menyatakan kemungkinan berdasarkan pengamatan (kelihatannya akan hujan).',
      weight: 2,
      orderIndex: 2,
    },
    {
      mondaiNumber: 3,
      questionNumber: 3,
      instruction: 'つぎの ぶんしょうを よんで、しつもんに こたえて ください。',
      passage: '私は日本の会社で働いています。仕事は忙しいですが、先輩たちがとても親切に教えてくれるので毎日楽しいです。来月からは新しいプロジェクトに参加する予定です。',
      content: 'この人はなぜ毎日楽しいと言っていますか。',
      options: JSON.stringify([
        '1. 給料が高いから',
        '2. 先輩たちが親切に教えてくれるから',
        '3. 仕事がぜんぜん忙しくないから',
        '4. すぐに休みが取れるから'
      ]),
      correctOption: 2,
      explanation: 'Teks menyebutkan: "先輩たちがとても親切に教えてくれるので毎日楽しいです" (Karena senior mengajari dengan ramah, setiap hari menyenangkan).',
      weight: 3,
      orderIndex: 3,
    },
  ];

  for (const q of n4Sec1Questions) {
    await prisma.question.create({
      data: {
        examSectionId: n4Sec1.id,
        ...q,
      },
    });
  }

  const n4Sec2Questions = [
    {
      mondaiNumber: 1,
      questionNumber: 4,
      instruction: '問題１：会話を聞いて、質問に答えてください。',
      audioUrl: 'https://cdn.freesound.org/previews/467/467812_9877995-lq.mp3',
      content: '駅で駅員と女の人が話しています。女の人は何番線の電車に乗りますか。\n\n女：すみません、新宿へ行く電車はどれですか。\n駅員：新宿行きなら、３番線の快速電車です。\n女：ありがとうございます。',
      options: JSON.stringify(['1. １番線', '2. ２番線', '3. ３番線', '4. ４番線']),
      correctOption: 3,
      explanation: 'Petugas stasiun menjelaskan bahwa kereta ke Shinjuku adalah di jalur 3 (３番線).',
      weight: 2,
      orderIndex: 1,
    },
  ];

  for (const q of n4Sec2Questions) {
    await prisma.question.create({
      data: {
        examSectionId: n4Sec2.id,
        ...q,
      },
    });
  }

  // ==========================================
  // 3. JLPT N3 Executive Pack (Silver / Gold Tier)
  // ==========================================
  const n3Exam = await prisma.examPackage.create({
    data: {
      title: 'Simulasi Eksekutif JLPT N3 (Menengah)',
      code: 'JLPT-N3-MOCK-01',
      level: 'N3',
      description: 'Ujian simulasi N3 dengan pembagian 3 seksi standar (Gengo Chishiki 60 pt, Dokkai 60 pt, Choukai 60 pt). Ujian wajib bagi kandidat Tokutei Ginou / Visa Kerja.',
      durationMinutes: 140,
      tierRequired: 'SILVER',
      published: true,
      passScoreTotal: 95,
    },
  });

  const n3Sec1 = await prisma.examSection.create({
    data: {
      examPackageId: n3Exam.id,
      sectionType: 'VOCABULARY',
      name: '言語知識（文字・語彙・文法） (Gengo Chishiki)',
      timeLimitMinutes: 50,
      orderIndex: 1,
    },
  });

  const n3Sec2 = await prisma.examSection.create({
    data: {
      examPackageId: n3Exam.id,
      sectionType: 'READING',
      name: '読解 (Dokkai)',
      timeLimitMinutes: 45,
      orderIndex: 2,
    },
  });

  const n3Sec3 = await prisma.examSection.create({
    data: {
      examPackageId: n3Exam.id,
      sectionType: 'LISTENING',
      name: '聴解 (Choukai)',
      timeLimitMinutes: 45,
      orderIndex: 3,
    },
  });

  const n3Sec1Questions = [
    {
      mondaiNumber: 1,
      questionNumber: 1,
      instruction: '＿＿の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。',
      content: '会議の資料を＿＿[配布]＿＿してください。',
      options: JSON.stringify(['1. はいふ', '2. はっぷ', '3. しはい', '4. はいふう']),
      correctOption: 1,
      explanation: '「配布」dibaca 「はいふ」 (haifu) yang berarti membagikan / mendistribusikan.',
      weight: 1,
      orderIndex: 1,
    },
    {
      mondaiNumber: 2,
      questionNumber: 2,
      instruction: '（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。',
      content: 'いくら頼まれても、規則を破る（　　）にはいかない。',
      options: JSON.stringify(['1. わけ', '2. もの', '3. こと', '4. はず']),
      correctOption: 1,
      explanation: 'Pola ～わけにはいかない (wake ni wa ikanai) menyatakan bahwa secara norma moral/aturan sosial tidak dapat/tidak pantas dilakukan.',
      weight: 2,
      orderIndex: 2,
    },
  ];

  for (const q of n3Sec1Questions) {
    await prisma.question.create({
      data: {
        examSectionId: n3Sec1.id,
        ...q,
      },
    });
  }

  const n3Sec2Questions = [
    {
      mondaiNumber: 1,
      questionNumber: 3,
      instruction: '次の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。',
      passage: '最近では、テレワークの普及によりオフィスに通わずに自宅で仕事をする人が増えている。通勤ストレスが減り、家族と過ごす時間が増えるというメリットがある一方で、仕事と私生活の境界が曖昧になり、運動不足に陥りやすいという課題も指摘されている。',
      content: 'この文章で述べられているテレワークの課題はどれか。',
      options: JSON.stringify([
        '1. 家族と過ごす時間が減ってしまうこと',
        '2. 通勤時間が長くなること',
        '3. 仕事とプライベートの区別がつきにくくなること',
        '4. 会社の設備が壊れやすくなること'
      ]),
      correctOption: 3,
      explanation: 'Teks menyebutkan: "仕事と私生活の境界が曖昧になり" (batas antara kerja dan kehidupan pribadi menjadi kabur/tidak jelas).',
      weight: 3,
      orderIndex: 1,
    },
  ];

  for (const q of n3Sec2Questions) {
    await prisma.question.create({
      data: {
        examSectionId: n3Sec2.id,
        ...q,
      },
    });
  }

  const n3Sec3Questions = [
    {
      mondaiNumber: 1,
      questionNumber: 4,
      instruction: '音声を聞いて、質問に答えてください。',
      audioUrl: 'https://cdn.freesound.org/previews/467/467812_9877995-lq.mp3',
      content: '会社で上司と部下が打ち合わせの日程について話しています。二人は何曜日に打ち合わせをすることにしましたか。',
      options: JSON.stringify(['1. 火曜日', '2. 水曜日', '3. 木曜日', '4. 金曜日']),
      correctOption: 3,
      explanation: 'Dalam dialog disepakati pertemuan diundur ke hari Kamis (木曜日).',
      weight: 3,
      orderIndex: 1,
    },
  ];

  for (const q of n3Sec3Questions) {
    await prisma.question.create({
      data: {
        examSectionId: n3Sec3.id,
        ...q,
      },
    });
  }

  // ==========================================
  // 4. JLPT N2 Advanced Pack (Gold Tier)
  // ==========================================
  const n2Exam = await prisma.examPackage.create({
    data: {
      title: 'Simulasi Master JLPT N2 (Tingkat Menengah Atas)',
      code: 'JLPT-N2-MOCK-01',
      level: 'N2',
      description: 'Simulasi N2 tingkat mahir bisnis & akademis. Menguji pemahaman artikel ilmiah, wacana opini, serta percakapan rapat korporasi Jepang.',
      durationMinutes: 155,
      tierRequired: 'GOLD',
      published: true,
      passScoreTotal: 90,
    },
  });

  const n2Sec1 = await prisma.examSection.create({
    data: {
      examPackageId: n2Exam.id,
      sectionType: 'VOCABULARY',
      name: '言語知識（文字・語彙・文法） (Gengo Chishiki)',
      timeLimitMinutes: 60,
      orderIndex: 1,
    },
  });

  const n2Sec2 = await prisma.examSection.create({
    data: {
      examPackageId: n2Exam.id,
      sectionType: 'READING',
      name: '読解 (Dokkai)',
      timeLimitMinutes: 50,
      orderIndex: 2,
    },
  });

  const n2Sec3 = await prisma.examSection.create({
    data: {
      examPackageId: n2Exam.id,
      sectionType: 'LISTENING',
      name: '聴解 (Choukai)',
      timeLimitMinutes: 45,
      orderIndex: 3,
    },
  });

  await prisma.question.create({
    data: {
      examSectionId: n2Sec1.id,
      mondaiNumber: 1,
      questionNumber: 1,
      instruction: '＿＿の言葉に意味が最も近いものを、１・２・３・４から一つ選びなさい。',
      content: '彼の提案は＿＿[画期的]＿＿だ。',
      options: JSON.stringify(['1. 非常に新しく優れている', '2. とても古く時代遅れだ', '3. あまり現実的ではない', '4. 危険を伴っている']),
      correctOption: 1,
      explanation: '「画期的」（かっきてき） berarti revolusioner / terobosan baru yang inovatif.',
      weight: 1,
      orderIndex: 1,
    },
  });

  await prisma.question.create({
    data: {
      examSectionId: n2Sec2.id,
      mondaiNumber: 1,
      questionNumber: 2,
      instruction: '文章を読んで、筆者の最も主張したいことを選びなさい。',
      passage: '科学技術の進歩は人々の生活を豊かにしてきたが、それに依存しすぎることによって人間本来の判断力や共感能力が損なわれる危険性も孕んでいる。私たちが目指すべきは、技術を盲信するのではなく、主体的な倫理観を持って技術と共生する道である。',
      content: '筆者が最も伝えたいことは何か。',
      options: JSON.stringify([
        '1. 科学技術の使用を直ちに禁止すべきである',
        '2. 技術の進歩にすべてを任せるべきである',
        '3. 倫理観を持って技術と主体的に共生していくことが大切である',
        '4. 人間本来の感情は科学技術の発展には不要である'
      ]),
      correctOption: 3,
      explanation: 'Kesimpulan penulis pada kalimat terakhir: "主体的な倫理観を持って技術と共生する道である".',
      weight: 3,
      orderIndex: 1,
    },
  });

  await prisma.question.create({
    data: {
      examSectionId: n2Sec3.id,
      mondaiNumber: 1,
      questionNumber: 3,
      instruction: '問題１：音声を聞いて、質問に答えてください。',
      audioUrl: 'https://cdn.freesound.org/previews/467/467812_9877995-lq.mp3',
      content: '新商品の販売戦略会議の音声を聞いて、チームが最初に着手する施策として最も適切なものを選択してください。',
      options: JSON.stringify([
        '1. SNSを活用したターゲット広告の配信',
        '2. テレビCMの全国放映',
        '3. 店舗でのサンプリング配布',
        '4. 価格の一斉値下げ'
      ]),
      correctOption: 1,
      explanation: 'Tim sepakat untuk memulai uji pasar dengan iklan tertarget di media sosial (SNS).',
      weight: 3,
      orderIndex: 1,
    },
  });

  // ==========================================
  // 5. JLPT N1 Expert Pack (LPK Partner & Gold)
  // ==========================================
  const n1Exam = await prisma.examPackage.create({
    data: {
      title: 'Simulasi Grand Master JLPT N1 (Tingkat Mahir Profesional)',
      code: 'JLPT-N1-MOCK-01',
      level: 'N1',
      description: 'Simulasi standar tertinggi JLPT N1 untuk profesional tingkat eksekutif, diplomat, penerjemah tersumpah, dan akademisi universitas Jepang.',
      durationMinutes: 170,
      tierRequired: 'GOLD',
      published: true,
      passScoreTotal: 100,
    },
  });

  const n1Sec1 = await prisma.examSection.create({
    data: {
      examPackageId: n1Exam.id,
      sectionType: 'VOCABULARY',
      name: '言語知識（文字・語彙・文法） (Gengo Chishiki)',
      timeLimitMinutes: 65,
      orderIndex: 1,
    },
  });

  const n1Sec2 = await prisma.examSection.create({
    data: {
      examPackageId: n1Exam.id,
      sectionType: 'READING',
      name: '読解 (Dokkai)',
      timeLimitMinutes: 55,
      orderIndex: 2,
    },
  });

  const n1Sec3 = await prisma.examSection.create({
    data: {
      examPackageId: n1Exam.id,
      sectionType: 'LISTENING',
      name: '聴解 (Choukai)',
      timeLimitMinutes: 50,
      orderIndex: 3,
    },
  });

  await prisma.question.create({
    data: {
      examSectionId: n1Sec1.id,
      mondaiNumber: 1,
      questionNumber: 1,
      instruction: '＿＿の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。',
      content: '諸悪の＿＿[根絶]＿＿を目指して法改正が行われた。',
      options: JSON.stringify(['1. こんぜつ', '2. ねだやし', '3. こんづち', '4. ねんぜつ']),
      correctOption: 1,
      explanation: '「根絶」dibaca 「こんぜつ」 (konzetsu) yang berarti memberantas hingga ke akar-akarnya.',
      weight: 1,
      orderIndex: 1,
    },
  });

  await prisma.question.create({
    data: {
      examSectionId: n1Sec2.id,
      mondaiNumber: 1,
      questionNumber: 2,
      instruction: '文章を読んで、筆者の意図を的確に表しているものを一つ選びなさい。',
      passage: 'グローバル化の進展に伴い、均質化する世界の中で固有の文化アイデンティティをいかに保持し再解釈していくかが問われている。伝統とは固定的な遺物ではなく、時代の要請に応じて不断に更新される動的なプロセスである。',
      content: '筆者が「伝統」について述べている要点は何か。',
      options: JSON.stringify([
        '1. 昔のまま一切変化させずに保存すべきもの',
        '2. 時代に合わせて絶えず更新される動的な営みであること',
        '3. グローバル化によって完全に消滅すべきもの',
        '4. 外国からの影響をすべて排除して守るべきもの'
      ]),
      correctOption: 2,
      explanation: 'Penulis menegaskan: "伝統とは固定的な遺物ではなく、時代の要請に応じて不断に更新される動的なプロセスである".',
      weight: 3,
      orderIndex: 1,
    },
  });

  await prisma.question.create({
    data: {
      examSectionId: n1Sec3.id,
      mondaiNumber: 1,
      questionNumber: 3,
      instruction: '音声を聞いて、最も適した判断を選びなさい。',
      audioUrl: 'https://cdn.freesound.org/previews/467/467812_9877995-lq.mp3',
      content: '企業の役員会におけるM&A（企業買収）の是非をめぐる議論の要約です。議長が下した最終決定はどれですか。',
      options: JSON.stringify([
        '1. 買収を直ちに即決実行する',
        '2. 財務監査の結果を待って次期取締役会で再審議する',
        '3. 計画を永久に白紙撤回する',
        '4. 相手企業の全株式を市場で売却する'
      ]),
      correctOption: 2,
      explanation: 'Dewan memutuskan menunggu audit keuangan sebelum voting final.',
      weight: 3,
      orderIndex: 1,
    },
  });

  // Seed sample completed exam attempt for studentFree
  const sampleAttempt = await prisma.examAttempt.create({
    data: {
      userId: studentFree.id,
      examPackageId: n5Exam.id,
      startedAt: new Date(Date.now() - 3600000 * 2),
      completedAt: new Date(Date.now() - 3600000 * 1),
      status: 'COMPLETED',
      scoreTotal: 140,
      scoreSection1: 95,
      scoreSection2: 45,
      scoreSection3: 0,
      isPassed: true,
      resultDetails: JSON.stringify({
        level: 'N5',
        passScoreTotal: 80,
        totalScore: 140,
        maxScore: 180,
        isPassed: true,
        sectionBreakdown: [
          {
            name: '言語知識・読解 (Gengo Chishiki & Dokkai)',
            score: 95,
            maxScore: 120,
            threshold: 38,
            isPassedSection: true,
            percentage: 79,
          },
          {
            name: '聴解 (Choukai)',
            score: 45,
            maxScore: 60,
            threshold: 19,
            isPassedSection: true,
            percentage: 75,
          },
        ],
      }),
    },
  });

  console.log('--- Database successfully seeded! ---');
  console.log('Admin:', admin.email, '(password: admin123)');
  console.log('Student Free:', studentFree.email, '(password: password123)');
  console.log('Student Silver:', studentSilver.email, '(password: password123)');
  console.log('Student Gold:', studentGold.email, '(password: password123)');
  console.log('LPK Partner:', lpkPartner.email, '(password: password123)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
