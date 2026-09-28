import Link from "next/link";
import { 
  Award, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Target, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  Users, 
  BarChart3, 
  Layers, 
  Volume2, 
  FileText, 
  Lock, 
  Building, 
  HelpCircle,
  GraduationCap,
  Star
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const levels = [
    {
      level: "N5",
      title: "Tingkat Pemula Dasar (Beginner)",
      desc: "Kemampuan memahami Hiragana, Katakana, kanji dasar sehari-hari, dan kalimat percakapan sederhana.",
      passing: 80,
      duration: "90 Menit",
      badge: "Tingkat Masuk"
    },
    {
      level: "N4",
      title: "Tingkat Dasar Lanjutan (Elementary)",
      desc: "Kemampuan memahami bahasa Jepang dasar dalam percakapan sehari-hari serta wacana topik sederhana.",
      passing: 90,
      duration: "115 Menit",
      badge: "Standar Tokutei Ginou"
    },
    {
      level: "N3",
      title: "Tingkat Menengah (Intermediate)",
      desc: "Jembatan kemampuan bahasa Jepang menengah yang digunakan dalam situasi umum dan artikel berita ringan.",
      passing: 95,
      duration: "140 Menit",
      badge: "Standar Karir Jepang"
    },
    {
      level: "N2",
      title: "Tingkat Menengah Atas (Upper-Inter.)",
      desc: "Kemampuan memahami percakapan bisnis, wacana koran, editorial, dan instruksi profesional kompleks.",
      passing: 90,
      duration: "155 Menit",
      badge: "Standar Mahasiswa & Kerja"
    },
    {
      level: "N1",
      title: "Tingkat Mahir (Advanced Master)",
      desc: "Kemampuan tingkat tertinggi dalam memahami bahasa Jepang dalam situasi bernuansa abstrak dan akademis.",
      passing: 100,
      duration: "170 Menit",
      badge: "Tingkat Mahir Mutlak"
    }
  ];

  const features = [
    {
      icon: Target,
      title: "Simulasi CBT Standar Resmi Prometric/JEES",
      desc: "Format waktu ujian, seksi soal, dan antarmuka dirancang persis dengan lingkungan Computer-Based Testing resmi."
    },
    {
      icon: BarChart3,
      title: "Scoring Engine IRT & Batas Aman Seksional",
      desc: "Kalkulasi bobot statis Item Response Theory (IRT) dengan deteksi nilai mati per seksi (syarat mutlak kelulusan ganda)."
    },
    {
      icon: Volume2,
      title: "Pemutar Audio Choukai Berkualitas Tinggi",
      desc: "Dilengkapi audio naskah percakapan listening asli dan kontrol interaktif untuk menguji pendengaran secara presisi."
    },
    {
      icon: BookOpen,
      title: "Format Furigana Kanji (Ruby HTML)",
      desc: "Teks kanji dilengkapi furigana interaktif untuk membantu evaluasi pemahaman kosakata dan pola tata bahasa."
    },
    {
      icon: Award,
      title: "Lembar Hasil Ujian & Cap Kelulusan Hanko",
      desc: "Penerbitan lembar evaluasi digital lengkap dengan stempel resmi Jepang (合格 / 不合格) serta pembahasan kunci jawaban."
    },
    {
      icon: Building,
      title: "Ekosistem Mitra LPK & Pemantauan Siswa",
      desc: "Fasilitas khusus Lembaga Pelatihan Kerja (LPK) untuk memantau nilai rekapitulasi dan kesiapan calon tenaga kerja ke Jepang."
    }
  ];

  const tiers = [
    {
      name: "Free / Uji Coba",
      price: "Rp 0",
      period: "Selamanya",
      desc: "Untuk latihan awal dan pengenalan format soal ujian CBT.",
      features: [
        "Akses set soal simulasi dasar",
        "Kalkulasi skor otomatis",
        "Pembahasan kunci jawaban standar",
        "Mode latihan fleksibel"
      ],
      cta: "Coba Gratis Sekarang",
      highlight: false
    },
    {
      name: "Silver Pass",
      price: "Rp 49.000",
      period: "30 Hari Akses",
      desc: "Paket ideal untuk pejuang ujian yang ingin drilling intensif.",
      features: [
        "Akses seluruh bank soal simulasi N5-N1",
        "Scoring Engine IRT presisi 180 Poin",
        "Analisis kelemahan per seksi",
        "Sertifikat simulasi kelulusan digital"
      ],
      cta: "Pilih Paket Silver",
      highlight: true
    },
    {
      name: "Gold Ultimate",
      price: "Rp 89.000",
      period: "60 Hari Akses",
      desc: "Paket lengkap dengan fitur tanya mentor dan drill audio.",
      features: [
        "Semua fitur Silver Pass",
        "Akses tak terbatas seluruh bank soal",
        "Download audio Choukai & skrip percakapan",
        "Sertifikat resmi simulasi ber-QR verifikasi",
        "Konsultasi strategi lulus via WhatsApp"
      ],
      cta: "Pilih Paket Gold",
      highlight: false
    },
    {
      name: "LPK Partner",
      price: "Kemitraan B2B",
      period: "Kontrak Tahunan",
      desc: "Khusus lembaga pelatihan kerja vokasi dan pengirim magang.",
      features: [
        "Akses ratusan akun siswa serentak",
        "Dasbor analitik performa kelas",
        "Impersonation Mode untuk audit admin LPK",
        "Branding sertifikat khusus nama LPK",
        "Dukungan teknis prioritas"
      ],
      cta: "Hubungi Kemitraan LPK",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-[#1A1A1A] selection:bg-[#8C0014] selection:text-white">
      {/* ── 1. Top Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-red-950/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8C0014] via-[#730010] to-[#4D000A] flex items-center justify-center text-white font-black shadow-lg shadow-red-950/20">
                <span className="text-amber-300 text-base">日</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight text-slate-900 group-hover:text-[#8C0014] transition-colors flex items-center gap-1">
                  BISA <span className="text-[#8C0014]">JLPT</span>
                  <span className="text-[10px] bg-red-100 text-[#8C0014] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ml-1">CBT</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium -mt-1">
                  Japanese-Language Proficiency Test Engine
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <Link href="/" className="text-[#8C0014] font-bold">Beranda</Link>
            <Link href="#levels" className="hover:text-[#8C0014] transition-colors">Tingkat Ujian (N5-N1)</Link>
            <Link href="#scoring" className="hover:text-[#8C0014] transition-colors">Metode Skoring IRT</Link>
            <Link href="#pricing" className="hover:text-[#8C0014] transition-colors">Paket & Biaya</Link>
            <Link href="#features" className="hover:text-[#8C0014] transition-colors">Keunggulan</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/simulation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8C0014] to-[#66000E] hover:from-[#730010] hover:to-[#4D000A] text-white font-bold text-xs shadow-md shadow-red-950/20 hover:shadow-lg transition-all"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Mulai Simulasi Sekarang</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── 2. Hero Section ── */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Hinomaru Aura Graphic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-red-500/10 via-[#8C0014]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-xs font-bold text-[#8C0014]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>STANDAR RESMI JAPAN FOUNDATION & JEES</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Platform Simulasi <br />
                <span className="text-[#8C0014]">Ujian JLPT Online</span> <br />
                Berbasis CBT Modern
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
                Persiapkan sertifikasi kemampuan bahasa Jepang <strong>Level N5 hingga N1</strong> dengan mesin ujian Computer-Based Testing (CBT), kalkulasi bobot statis <strong>aproksimasi IRT</strong>, format furigana, audio Choukai interaktif, dan evaluasi <strong>syarat kelulusan ganda tanpa nilai mati</strong>.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/simulation"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#8C0014] to-[#66000E] hover:from-[#730010] hover:to-[#4D000A] text-white font-extrabold text-sm shadow-xl shadow-red-950/25 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                >
                  <Award className="w-5 h-5 text-amber-300" />
                  <span>Coba Simulasi Ujian Gratis</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#levels"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
                >
                  <span>Lihat Struktur 5 Level</span>
                </a>
              </div>

              {/* Trust Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-200/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#8C0014]">N5 – N1</div>
                  <div className="text-xs text-slate-500 font-medium">5 Tingkat Lengkap</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">180 Poin</div>
                  <div className="text-xs text-slate-500 font-medium">Skala Resmi JLPT</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700">Dual-Pass</div>
                  <div className="text-xs text-slate-500 font-medium">Anti Nilai Mati</div>
                </div>
              </div>
            </div>

            {/* Right Column (5 Cols) - Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-gradient-to-br from-white to-red-50/40 rounded-3xl p-6 sm:p-8 border-2 border-red-950/10 shadow-2xl shadow-red-950/10">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#8C0014] text-white flex items-center justify-center font-black text-xs">
                      CBT
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Simulasi Realistis Prometric</h4>
                      <p className="text-[10px] text-slate-400">Timer & Audio Choukai Siap Pakai</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Live System
                  </span>
                </div>

                {/* Sample Question Preview */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm mb-4 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#8C0014]">Contoh Soal JLPT N5 (文字・語彙)</span>
                    <span className="font-mono text-slate-400">Bobot: 1.0x IRT</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    あしたは <span className="bg-amber-100/70 px-1.5 py-0.5 rounded text-[#8C0014] font-bold">七日</span> です。
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-300 font-bold text-emerald-900 flex items-center justify-between">
                      <span>1. なのか</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">2. ななひ</div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">3. ここのか</div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">4. なぬか</div>
                  </div>
                </div>

                {/* Hanko Stamp Preview */}
                <div className="flex items-center justify-between bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-amber-900">Evaluasi Hasil Otomatis:</span>
                    <p className="text-xs text-slate-600">Sertifikat Kelulusan & Cap Resmi Hanko</p>
                  </div>
                  <div className="w-14 h-14 rounded-full border-2 border-emerald-600 text-emerald-600 flex flex-col items-center justify-center font-black text-xs rotate-[-10deg] bg-white shadow-sm">
                    <span>合格</span>
                    <span className="text-[8px] font-sans font-bold">PASS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Level Grid (N5 s/d N1) ── */}
      <section id="levels" className="py-20 bg-slate-50/70 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-wider font-extrabold text-[#8C0014]">
              STRUKTUR TINGKAT LENGKAP
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Pilihan Level Simulasi JLPT (N5 – N1)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Setiap tingkat memiliki komposisi seksi, durasi pengerjaan resmi, dan ambang batas kelulusan (passing grade) sesuai standar Japan Foundation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((item) => (
              <div
                key={item.level}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-red-900/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#8C0014] text-white flex items-center justify-center font-black text-xl shadow-md">
                      {item.level}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      Passing Min {item.passing}/180
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-[#8C0014] uppercase tracking-wide">
                    {item.badge}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Durasi Ujian:</span>
                    <span className="font-bold text-slate-900">{item.duration}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Aturan Nilai Mati:</span>
                    <span className="font-bold text-emerald-700">Wajib Lolos Seksi</span>
                  </div>

                  <Link
                    href={`/simulation?level=${item.level}`}
                    className="w-full mt-2 flex items-center justify-center gap-2 py-3 bg-slate-900 group-hover:bg-[#8C0014] text-white font-bold rounded-xl text-xs shadow transition-all"
                  >
                    <span>Mulai Ujian {item.level}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Scoring Engine & IRT Methodology ── */}
      <section id="scoring" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-wider font-extrabold text-[#8C0014]">
                METODOLOGI PENILAIAN RESMI
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Logika Penilaian Ganda & <br />
                <span className="text-[#8C0014]">Aproksimasi IRT Statis</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                JLPT tidak menggunakan sistem skor mentah sederhana. Sistem BISA JLPT menerapkan dua aturan mutlak kelulusan resmi:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-red-50 text-[#8C0014] shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Syarat 1: Total Skor Minimum (Passing Total)</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Peserta wajib mengumpulkan nilai total kumulatif minimal (N1: 100, N2: 90, N3: 95, N4: 90, N5: 80) dari total skala 180 poin.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Syarat 2: Batas Aman Seksional (Tidak Ada Nilai Mati)</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Meskipun total nilai melampaui batas, peserta <strong>dinyatakan gugur</strong> jika ada seksi yang di bawah ambang batas (N1–N3 min 19/60 per bagian; N4–N5 min 38/120 Bahasa & Bacaan, min 19/60 Listening).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-[#8C0014] to-[#4D000A] text-white p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="font-bold text-sm text-amber-300">Tabel Ambang Kelulusan Resmi</span>
                    <span className="text-xs text-red-200">Skala 180 Poin</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between p-3 rounded-xl bg-white/10 backdrop-blur-md">
                      <span>Level N1 (Mahir)</span>
                      <span className="font-bold text-amber-300">Min 100 / 180 (Seksi ≥ 19)</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-xl bg-white/10 backdrop-blur-md">
                      <span>Level N2 (Menengah Atas)</span>
                      <span className="font-bold text-amber-300">Min 90 / 180 (Seksi ≥ 19)</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-xl bg-white/10 backdrop-blur-md">
                      <span>Level N3 (Menengah)</span>
                      <span className="font-bold text-amber-300">Min 95 / 180 (Seksi ≥ 19)</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-xl bg-white/10 backdrop-blur-md">
                      <span>Level N4 (Dasar Lanjutan)</span>
                      <span className="font-bold text-amber-300">Min 90 / 180 (Seksi ≥ 38 & 19)</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-xl bg-white/10 backdrop-blur-md">
                      <span>Level N5 (Pemula)</span>
                      <span className="font-bold text-amber-300">Min 80 / 180 (Seksi ≥ 38 & 19)</span>
                    </div>
                  </div>

                  <Link
                    href="/simulation"
                    className="block w-full py-3.5 bg-white hover:bg-red-50 text-[#8C0014] font-black text-center text-xs rounded-xl shadow-lg transition-colors"
                  >
                    Uji Penilaian Mandiri Sekarang
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Features Grid ── */}
      <section id="features" className="py-20 bg-slate-50/70 border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-wider font-extrabold text-[#8C0014]">
              FITUR UTAMA SISTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Keunggulan Arsitektur BISA JLPT
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Dirancang dengan standar industri teknologi pembelajaran bahasa Jepang terkini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#8C0014] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. Pricing & User Tiers ── */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-wider font-extrabold text-[#8C0014]">
              EKOSISTEM LANGGANAN & MITRA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Pilihan Paket Tier Ujian
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Tersedia untuk peserta didik mandiri maupun mitra institusi LPK di seluruh Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all ${
                  tier.highlight
                    ? "border-[#8C0014] shadow-xl ring-2 ring-[#8C0014]/20 relative"
                    : "border-slate-200/80 shadow-sm"
                }`}
              >
                <div>
                  {tier.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#8C0014] text-white text-[10px] font-black uppercase tracking-wider shadow">
                      Paling Populer
                    </div>
                  )}

                  <h3 className="font-bold text-slate-900 text-base mb-1">{tier.name}</h3>
                  <p className="text-xs text-slate-400 mb-4">{tier.desc}</p>

                  <div className="mb-6">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">{tier.price}</span>
                    <span className="text-xs text-slate-500 ml-1">/ {tier.period}</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                    {tier.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/simulation"
                  className={`w-full py-3 rounded-xl font-bold text-xs text-center transition-colors shadow-sm ${
                    tier.highlight
                      ? "bg-[#8C0014] hover:bg-[#66000E] text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Call To Action Footer Banner ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#8C0014] via-[#66000E] to-[#45000A] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Siap Menaklukkan <br />
                <span className="text-amber-300">Ujian JLPT Tahun Ini?</span>
              </h2>
              <p className="text-red-100/90 text-sm sm:text-base leading-relaxed">
                Mulai latihan simulasi CBT sekarang, kenali kelemahan materi lebih awal, dan raih sertifikat kompetensi bahasa Jepang resmi ke Jepang.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/simulation"
                  className="px-8 py-4 bg-white hover:bg-red-50 text-[#8C0014] font-black text-sm rounded-2xl shadow-xl transition-all"
                >
                  Mulai Simulasi CBT Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Footer ── */}
      <footer className="border-t border-slate-200 bg-white py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#8C0014] text-white flex items-center justify-center font-black text-[10px]">
              日
            </div>
            <span className="font-bold text-slate-900">BISA JLPT</span>
            <span>— Platform Simulasi Ujian Bahasa Jepang Berbasis CBT</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} BISA JLPT & LPK Mitra. Seluruh Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
