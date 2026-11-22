import { QuestionData, JlptLevel } from "@/lib/scoring/jlptScoringEngine";

export const JLPT_QUESTIONS: Record<JlptLevel, QuestionData[]> = {
  N5: [
    {
      id: "N5-Q1",
      sectionId: "lang_reading",
      subCategory: "文字・語彙 (Kanji / Kosakata)",
      weight: 1.0,
      instruction: "つぎの ぶんの <ruby>下線<rt>かせん</rt></ruby>の ことばは どう かきますか。いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。",
      questionText: "あしたは <ruby><strong>七日</strong><rt>？</rt></ruby>です。",
      options: [
        "なのか",
        "ななひ",
        "ここのか",
        "なぬか"
      ],
      correctOption: 0,
      explanation: "「七日」dibaca 『なのか』 (tanggal 7). Pilihan lain seperti ななひ atau なぬか adalah pembacaan yang salah, dan ここのか adalah tanggal 9.",
      audioScript: null
    },
    {
      id: "N5-Q2",
      sectionId: "lang_reading",
      subCategory: "文法 (Tata Bahasa)",
      weight: 1.2,
      instruction: "（　）に なにを いれますか。いち・に・さん・よんから いちばん いい ものを ひとつ えらんで ください。",
      questionText: "わたしは まいにち バス（　）がっこうへ いきます。",
      options: [
        "に",
        "で",
        "を",
        "へ"
      ],
      correctOption: 1,
      explanation: "Partikel 「で」 digunakan untuk menunjukkan sarana transportasi atau alat (misal: バスで行く = pergi dengan bus).",
      audioScript: null
    },
    {
      id: "N5-Q3",
      sectionId: "lang_reading",
      subCategory: "読解 (Membaca Pendek)",
      weight: 2.0,
      instruction: "つぎの ぶんを よんで、しつもんに こたえて ください。",
      passage: `きのう 田中さんの うちへ 行きました。田中さんの うちで おいしい ケーキを たべました。それから、いっしょに 日本の えいがを みました。とても たのしかったです。`,
      questionText: "きのう なにを しましたか。",
      options: [
        "田中さんの うちで べんきょうしました。",
        "田中さんと えいがを みて、ケーキを たべました。",
        "ひとりで えいがを みにいきました。",
        "田中さんの うちで えいがだけ みました。"
      ],
      correctOption: 1,
      explanation: "Berdasarkan wacana, penulis pergi ke rumah Tanaka, makan kue lezat bersama (おいしいケーキをたべました), lalu menonton film Jepang bersama (いっしょに日本のえいがをみました).",
      audioScript: null
    },
    {
      id: "N5-Q4",
      sectionId: "listening",
      subCategory: "聴解 (Mendengarkan - 課題理解)",
      weight: 2.2,
      instruction: "音声を聞いて、正しい答えを 1・2・3・4 から ひとつ選んでください。",
      audioScript: "おとこのひとと おんなのひとが はなしています。おとこのひとは これから なにを しますか。\n\nおとこ：あ、あめが ふってきましたね。\nおんな：そうですね。かさを もっていますか。\nおとこ：いいえ、もっていません。コンビニで かってきます。\nおんな：あ、わたしのかさを かしましょうか。２本ありますから。\nおとこ：ほんとうですか。ありがとうございます！助かります。\n\nしつもん：おとこのひとは これから なにを しますか。",
      audioDialogue: "おとこのひとと おんなのひとが はなしています。おとこのひとは これから なにを しますか。",
      questionText: "【音声問題】男の人はこれから何をしますか。",
      options: [
        "コンビニへ 傘を 買いに行きます",
        "女の人の 傘を かります",
        "雨が やむのを まちます",
        "タクシーで かえります"
      ],
      correctOption: 1,
      explanation: "Awalnya pria ingin membeli payung di konbini, namun wanita meminjamkan payungnya karena punya 2 payung (私の傘を貸しましょうか -> 男: ありがとうございます). Pria meminjam payung wanita.",
      ttsPrompt: "おとこのひととおんなのひとがはなしています。あ、あめがふってきましたね。そうですね、かさをもっていますか。いいえ、もっていません。コンビニでかってきます。あ、わたしのかさをかしましょうか。にほんありますから。ほんとうですか、ありがとうございます。しつもん：おとこのひとはこれからなにをしますか。"
    },
    {
      id: "N5-Q5",
      sectionId: "listening",
      subCategory: "聴解 (Mendengarkan - ポイント理解)",
      weight: 2.0,
      instruction: "音声を聞いて、質問に答えてください。",
      audioScript: "店員とお客さんが話しています。お客さんはいくら払いますか。\n\n店員：いらっしゃいませ。コーヒーが３００円と、サンドイッチが４００円です。\n客：セット割引はありますか。\n店員：はい、１００円引きになりますので、合計で６００円です。\n客：じゃあ、これでお願いします。\n\n質問：お客さんはいくら払いますか。",
      audioDialogue: "店員とお客さんが話しています。お客さんはいくら払いますか。",
      questionText: "【音声問題】お客さんはいくら払いますか。",
      options: [
        "300円",
        "400円",
        "600円",
        "700円"
      ],
      correctOption: 2,
      explanation: "Kopi (300 yen) + Sandwich (400 yen) = 700 yen. Karena diskon set (セット割引 100 yen), total bayar adalah 600 yen (合計で６００円).",
      ttsPrompt: "てんいんとおきゃくさんがはなしています。いらっしゃいませ。コーヒーがさんびゃくえんと、サンドイッチがよんひゃくえんです。セットわりびきはありますか。はい、ひゃくえんびきになりますので、ごうけいでろっぴゃくえんです。じゃあ、これでおねがいします。しつもん：おきゃくさんはいくらはらいますか。"
    }
  ],

  N4: [
    {
      id: "N4-Q1",
      sectionId: "lang_reading",
      subCategory: "文字・語彙 (Kanji & Kosakata)",
      weight: 1.0,
      instruction: "下線の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。",
      questionText: "この部屋はいつも<ruby><strong>清潔</strong><rt>？</rt></ruby>にしてください。",
      options: [
        "せいけつ",
        "しょうけつ",
        "せいかつ",
        "しょうかつ"
      ],
      correctOption: 0,
      explanation: "Kanji 「清潔」 dibaca 『せいけつ』 yang berarti bersih/higienis. 「生活」 dibaca 『せいかつ』 (kehidupan).",
      audioScript: null
    },
    {
      id: "N4-Q2",
      sectionId: "lang_reading",
      subCategory: "文法 (Tata Bahasa N4)",
      weight: 1.2,
      instruction: "次の文の（　）に入れるのに最もよいものを、１・２・３・4から一つ選びなさい。",
      questionText: "図書館では、静かに本を読まなければ（　）。",
      options: [
        "いけません",
        "いいです",
        "ありません",
        "しまいます"
      ],
      correctOption: 0,
      explanation: "Pola ungkapan keharusan dalam N4 adalah 〜なければなりません atau 〜なければいけません. Pilihan 1 (いけません) adalah bentuk baku.",
      audioScript: null
    },
    {
      id: "N4-Q3",
      sectionId: "lang_reading",
      subCategory: "読解 (Membaca Wacana)",
      weight: 2.2,
      instruction: "次の文章を読んで、後の問いに対する答えとして最もよいものを一つ選びなさい。",
      passage: `日本人は贈り物をもらったとき、その場ですぐに開けないことがよくあります。相手の前で開けるのは遠慮や礼儀のためです。相手が選んでくれた品物に不満そうな顔を見せないための配慮でもあります。しかし、最近は「今開けてもいいですか」と相手に確認してから開ける若い世代も増えてきています。`,
      questionText: "日本人が贈り物をその場ですぐに開けない一番の理由は何ですか。",
      options: [
        "プレゼントが気に入らないことを恐れているから",
        "相手に対する礼儀や気配り（マナー）のため",
        "中身をすでに見知っているから",
        "家に持って帰って家族と開けたいから"
      ],
      correctOption: 1,
      explanation: "Paragraf menyebutkan: 『相手の前で開けるのは遠慮や礼儀のためです...配慮でもあります』 yang berarti demi menjaga tata krama dan kesopanan (礼儀・気配り).",
      audioScript: null
    },
    {
      id: "N4-Q4",
      sectionId: "listening",
      subCategory: "聴解 (Mendengarkan - ポイント理解)",
      weight: 2.4,
      instruction: "音声を聞いて、正しい答えを１・２・３・４から一つ選んでください。",
      audioScript: "留学生のリンさんと先生が話しています。リンさんは明日、何を持っていかなければなりませんか。\n\n先生：リンさん、明日の見学旅行の準備はできましたか。\nリン：はい。筆記用具とお弁当ですね。\n先生：ええ。それから、水族館の入場券は学校で用意しますが、学生証を忘れずに持ってきてください。\nリン：わかりました。カメラは持っていってもいいですか。\n先生：ええ、いいですよ。でも無理に持ってこなくても大丈夫です。\n\n質問：リンさんが明日必ず持っていかなければならないものは何ですか。",
      questionText: "【音声問題】リンさんが明日必ず持っていかなければならないものは何ですか。",
      options: [
        "筆記用具、お弁当、学生証",
        "筆記用具とお弁当とカメラ",
        "入場券と学生証とカメラ",
        "お弁当と入場券だけ"
      ],
      correctOption: 0,
      explanation: "Barang wajib: 筆記用具 (alat tulis), お弁当 (bekal), dan 学生証 (kartu pelajar, '忘れずに持ってきてください'). Kamera boleh tapi tidak wajib.",
      ttsPrompt: "りゅうがくせいのリンさんとせんせいがはなしています。リンさん、あしたのけんがくりょこうのじゅんびはできましたか。はい、ひっきようぐとおべんとうですね。ええ、それからがくせいしょうをわすれずにもってきてください。カメラはもっていってもいいですか。ええ、でもむりにもってこなくてもだいじょうぶです。しつもん：リンさんがきょう・あしたかならずもっていくものはなんですか。"
    }
  ],

  N3: [
    {
      id: "N3-Q1",
      sectionId: "lang_know",
      subCategory: "言語知識 (語彙・文脈規定)",
      weight: 1.0,
      instruction: "（　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
      questionText: "明日の会議の（　）を事前に参加者へ配布しておいてください。",
      options: [
        "資料",
        "材料",
        "原料",
        "料金"
      ],
      correctOption: 0,
      explanation: "「資料（しりょう）」berarti dokumen/materi informasi. 「材料」adalah bahan baku masak/bangunan, 「原料」adalah bahan mentah industri.",
      audioScript: null
    },
    {
      id: "N3-Q2",
      sectionId: "lang_know",
      subCategory: "言語知識 (文法形式判断)",
      weight: 1.2,
      instruction: "次の文の（　）に入れるのに最もよいものを一つ選びなさい。",
      questionText: "彼は日本に３年も住んでいる（　）、日常会話すらあまり上手ではない。",
      options: [
        "わりに",
        "おかげで",
        "だけに",
        "せいで"
      ],
      correctOption: 0,
      explanation: "Pola 〜わりに(は) digunakan untuk menyatakan situasi yang tidak sebanding dengan standar/ekspektasi (Meskipun sudah 3 tahun di Jepang, percakapannya tidak lancar).",
      audioScript: null
    },
    {
      id: "N3-Q3",
      sectionId: "reading",
      subCategory: "読解 (短文・主張理解)",
      weight: 2.2,
      instruction: "次の文章を読んで、後の問いに対する答えとして最もよいものを一つ選びなさい。",
      passage: `近年、テレワークの普及に伴い、自宅での作業効率を高める工夫が注目されている。しかし、仕事とプライベートの境界が曖昧になることで、知らず知らずのうちに過度な疲労をため込む人が少なくない。重要なのは、勤務時間が終了したら速やかにパソコンを閉じ、意識的に「プライベート時間」へ切り替える規律を持つことである。`,
      questionText: "筆者がテレワークにおいて最も大切だと主張していることは何か。",
      options: [
        "最新の高機能パソコンを自宅に導入すること",
        "仕事と私生活の時間を明確に切り替える規律・習慣",
        "疲労を感じたらすぐに会社へ連絡すること",
        "可能な限りオフィス勤務へ戻ること"
      ],
      correctOption: 1,
      explanation: "Bagian akhir wacana menyimpulkan: 『重要なのは...意識的に「プライベート時間」へ切り替える規律を持つことである』.",
      audioScript: null
    },
    {
      id: "N3-Q4",
      sectionId: "listening",
      subCategory: "聴解 (概要理解)",
      weight: 2.2,
      instruction: "音声を聞いて、アナウンスの主旨として最も適切なものを一つ選んでください。",
      audioScript: "ラジオでアナウンサーが話しています。\n「最近、環境に配慮して『マイボトル』を持ち歩く人が急増しています。カフェでもマイボトルを持参すれば割引を受けられるサービスが定着してきました。ゴミの削減につながるだけでなく、いつでも適温の飲み物を楽しめるメリットがあります。皆さんも身近なエコ活動として始めてみませんか。」\n\n質問：アナウンサーは何について話していますか。",
      questionText: "【音声問題】アナウンサーは何について話していますか。",
      options: [
        "カフェの新メニューと価格改定について",
        "マイボトルを持つことの利点と環境活動の推奨",
        "ペットボトルの正しい分別回収方法",
        "オフィスでの節電ルール"
      ],
      correctOption: 1,
      explanation: "Penyiar membahas tren dan manfaat membawa botol minum sendiri (マイボトル) bagi lingkungan dan kenyamanan hidup.",
      ttsPrompt: "ラジオでアナウンサーがはなしています。さいきん、かんきょうにはいりょしてマイボトルをもちあるくひとがふえています。カフェでもわりびきをうけられます。ゴミのさくげんだけでなく、いつでもてきおんのみものをたのしめます。みなさんもはじめてみませんか。しつもん：アナウンサーはなにについて話していますか。"
    }
  ],

  N2: [
    {
      id: "N2-Q1",
      sectionId: "lang_know",
      subCategory: "言語知識 (語彙・類義表現)",
      weight: 1.0,
      instruction: "下線の言葉の意味に最も近いものを、１・２・３・４から一つ選びなさい。",
      questionText: "悪天候のため、イベントの開催日程の変更を<ruby><strong>余儀なくされた</strong><rt>？</rt></ruby>。",
      options: [
        "どうしても変更せざるを得なくなった",
        "日程を変更することを自ら希望した",
        "日程を変更する余裕が十分にあった",
        "変更しないよう周囲から強く求められた"
      ],
      correctOption: 0,
      explanation: "Tata bahasa 「〜を余儀なくされる（よぎなくされる）」 bermakna terpaksa tidak ada pilihan lain selain melakukan hal tersebut karena situasi tak terelakkan.",
      audioScript: null
    },
    {
      id: "N2-Q2",
      sectionId: "lang_know",
      subCategory: "言語知識 (文法判断)",
      weight: 1.3,
      instruction: "次の文の（　）に入れるのに最もよいものを一つ選びなさい。",
      questionText: "健康を維持したいなら、毎日のバランスの良い食事と十分な睡眠を心がける（　）。",
      options: [
        "ことだ",
        "べきではない",
        "ものがある",
        "わけがない"
      ],
      correctOption: 0,
      explanation: "Pola 「〜ことだ」 digunakan untuk memberikan saran, anjuran penting, atau formula terbaik ('Hal yang terpenting adalah senantiasa menjaga...').",
      audioScript: null
    },
    {
      id: "N2-Q3",
      sectionId: "reading",
      subCategory: "読解 (中文・論理展開)",
      weight: 2.2,
      instruction: "次の文章を読んで、筆者の考えとして最も適切なものを一つ選びなさい。",
      passage: `「失敗は成功の母」と昔から言われるが、ただ漫然と失敗を繰り返すだけでは決して成功には至らない。失敗から何を学び、どのように次の行動指針を改善するかの客観的な分析が不可欠である。感情的に落胆するのではなく、失敗事象を貴重なデータとして冷静に検証できる組織や個人こそが、持続的な成長を遂げることができる。`,
      questionText: "失敗を成長や成功に結びつけるために不可欠な要素は何か。",
      options: [
        "失敗しても一切反省せず前向きに進むこと",
        "失敗の原因を客観的なデータとして冷静に分析・改善すること",
        "他人の失敗事例のみを研究して自らは挑戦しないこと",
        "失敗のリスクがある行動を最初から避けること"
      ],
      correctOption: 1,
      explanation: "Paragraf menegaskan bahwa kunci keberhasilan adalah menganalisis sebab kegagalan secara objektif sebagai data perbaikan (『失敗事象を貴重なデータとして冷静に検証できる...』).",
      audioScript: null
    },
    {
      id: "N2-Q4",
      sectionId: "listening",
      subCategory: "聴解 (統合理解・発話表現)",
      weight: 2.5,
      instruction: "音声を聞いて、正しい対応または答えを１・２・３・４から一つ選んでください。",
      audioScript: "会社で課長と部下が新プロジェクトの進捗について話しています。\n\n課長：佐藤さん、来週のクライアント向けプレゼン資料、順調に進んでる？\n部下：はい、市場動向のデータ入力は完了しましたが、競合分析の比較グラフ作成に少し難航しておりまして…。\n課長：そうか。そこは提案の要だから、データ分析が得意な高橋君にもサポートに入ってもらおう。今すぐ連絡を取ってくれるかい？\n部下：承知いたしました。すぐに高橋さんに相談して進めます。\n\n質問：部下はこの後まず何をしますか。",
      questionText: "【音声問題】部下はこの後まず何をしますか。",
      options: [
        "高橋さんに連絡して競合分析グラフ作成の協力を依頼する",
        "市場動向のデータを最初からやり直す",
        "来週のプレゼンテーションの練習を始める",
        "クライアントへ直接日程変更を連絡する"
      ],
      correctOption: 0,
      explanation: "Manajer menginstruksikan untuk meminta bantuan Takahashi-kun (高橋君にもサポートに入ってもらおう。今すぐ連絡を取ってくれるかい？) dan bawahan langsung menyetujuinya.",
      ttsPrompt: "かいしゃでかちょうとぶかがはなしています。さとうさん、プレゼンしりょうのしんちょくはどう？はい、きょうごうぶんせきのグラフさくせいにすこしなんこうしていまして。そうか、たかはしくんにもサポートにはいってもらおう。いますぐれんらくをとってくれるかい？しょうちいたしました。しつもん：ぶかはこのあとまずなにをしますか。"
    }
  ],

  N1: [
    {
      id: "N1-Q1",
      sectionId: "lang_know",
      subCategory: "言語知識 (高度語彙・漢字表記)",
      weight: 1.0,
      instruction: "下線の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。",
      questionText: "双方の認識に<ruby><strong>齟齬</strong><rt>？</rt></ruby>が生じないよう、契約締結前に合意文書を精査した。",
      options: [
        "そご",
        "さご",
        "しょうご",
        "そうご"
      ],
      correctOption: 0,
      explanation: "Kanji 「齟齬」 dibaca 『そご』 yang bermakna diskrepansi, perselisihan, atau ketidaksesuaian pemahaman.",
      audioScript: null
    },
    {
      id: "N1-Q2",
      sectionId: "lang_know",
      subCategory: "言語知識 (高度文法・表現形式)",
      weight: 1.4,
      instruction: "次の文の（　）に入れるのに最もよいものを一つ選びなさい。",
      questionText: "これだけの明白な証拠が提示された以上、会社の過失を（　）。",
      options: [
        "認めざるを得ない",
        "認めかねない",
        "認めるまでもない",
        "認めようがない"
      ],
      correctOption: 0,
      explanation: "Pola 「〜ざるを得ない（せざるをえない）」 bermakna tidak bisa tidak / terpaksa harus mengakui kebenaran suatu hal karena bukti yang sangat kuat.",
      audioScript: null
    },
    {
      id: "N1-Q3",
      sectionId: "reading",
      subCategory: "読解 (論説文・総合見解)",
      weight: 2.5,
      instruction: "次の文章を読んで、筆者の主張として最も適切なものを一つ選びなさい。",
      passage: `科学技術の飛躍的進歩は人類に莫大な利便性をもたらしたが、同時に倫理的・哲学的判断の遅れという深刻なジレンマを突きつけている。技術が「可能にする」ことと、社会として「許容すべき」ことの間には本質的な乖離が存在する。研究者に今こそ求められるのは、単なる知的好奇心の充足にとどまらず、生み出された技術が人間社会に及ぼす長期的影響に対する重い倫理的責任の自覚である。`,
      questionText: "筆者が研究者や科学者に最も求めている姿勢は何か。",
      options: [
        "最先端技術の商用化スピードを最優先する姿勢",
        "自らの研究成果が社会に与える長期的影響への倫理的責任感",
        "世論の批判を一切考慮せず純粋な探究心にのみ従うこと",
        "技術の倫理的判断をすべて政治家や法律家に丸投げすること"
      ],
      correctOption: 1,
      explanation: "Wacana menegaskan pada penutup: 『研究者に今こそ求められるのは...人間社会に及ぼす長期的影響に対する重い倫理的責任の自覚である』.",
      audioScript: null
    },
    {
      id: "N1-Q4",
      sectionId: "listening",
      subCategory: "聴解 (統合理解・主張把握)",
      weight: 2.8,
      instruction: "音声を聞いて、講演者の主張の要点として最も適切なものを一つ選んでください。",
      audioScript: "大学の学術シンポジウムで有識者が次のように述べています。\n\n「人工知能が高度化し定型業務の自動化が急速に進む現代において、『人間の知性の本質とは何か』という根源的な問いが突きつけられています。知識の記憶量や論理計算の速度において人間が機械に勝ることはもはや不可能です。しかし、複雑な文脈を行間から読み取り、他者の心情に共感しながら未知の価値を創造する力は依然として人間固有の領域です。今後の教育改革においては、知識注入型の教育から脱却し、共感力と協調的創造性を培う教育へと抜本的にシフトしなければなりません。」\n\n質問：講演者が今後の教育において最も重視すべきと主張しているのは何ですか。",
      questionText: "【音声問題】講演者が今後の教育において最も重視すべきと主張しているのは何ですか。",
      options: [
        "AIに勝る記憶力と計算スピードの訓練徹底",
        "共感力および他者と協調して新たな価値を生み出す創造性の育成",
        "プログラミング言語の早期習得とAIアルゴリズム開発",
        "従来の知識注入型・暗記型カリキュラムの維持"
      ],
      correctOption: 1,
      explanation: "Pakar menekankan bahwa masa depan pendidikan harus beralih dari sekadar hafalan menuju penumbuhan empati dan kreativitas kolaboratif (共感力と協調的創造性を培う教育).",
      ttsPrompt: "がくじゅつシンポジウムでゆうしきしゃがのべています。AIがこうどかするげんだい、にんげんのちせいのほんしつがとわれています。きおくやけいさんではAIにかてません。しかし、たしゃへのきょうかんやきょうちょうてきそうぞうりょくこそにんげんのこゆうのちからです。きょういくはそうぞうせいをそだてるほうこうへシフトすべきです。しつもん：こうえんしゃがきょういくでじゅうしすべきと主張しているのは何ですか。"
    }
  ]
};
