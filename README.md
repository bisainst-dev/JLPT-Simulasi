# 🎌 BISA JLPT - Platform Simulasi Ujian JLPT (N5 - N1)

Platform simulasi ujian digital mandiri untuk sertifikasi **Japanese-Language Proficiency Test (JLPT)** tingkat **N5, N4, N3, N2, dan N1** yang mengadaptasi arsitektur eksekutif dengan standar resmi Japan Foundation & JEES.

Repository Target: [https://github.com/bisainst-dev/JLPT-Simulasi.git](https://github.com/bisainst-dev/JLPT-Simulasi.git)

---

## 🌟 Fitur Utama (Core Features)

1. **Cakupan Lengkap 5 Level (N5 s/d N1):**
   - **N5:** Tingkat Pemula Dasar (Passing Total: 80/180)
   - **N4:** Tingkat Dasar Lanjutan (Passing Total: 90/180)
   - **N3:** Tingkat Menengah (Passing Total: 95/180)
   - **N2:** Tingkat Menengah Atas (Passing Total: 90/180)
   - **N1:** Tingkat Mahir (Passing Total: 100/180)

2. **Scoring Engine IRT Statis & Dual-Condition Passing Grade:**
   - **Pembobotan Kognitif (IRT Approximation):** Soal kosakata kanji berbobot 1.0x, wacana pendek/sedang 2.0x–2.2x, serta pemahaman wacana panjang & listening terintegrasi 2.5x–2.8x.
   - **Syarat Mutlak Ganda:**
     - Syarat 1: Memenuhi total nilai batas kelulusan per level (skala 180 Poin).
     - Syarat 2: Memenuhi batas aman seksional (*sectional safety cutoff / tidak ada nilai mati*):
       - **N1–N3:** Minimal 19/60 pada setiap seksi (Bahasa, Membaca, Mendengarkan).
       - **N4–N5:** Minimal 38/120 pada Bahasa & Membaca, serta 19/60 pada Mendengarkan.

3. **Antarmuka CBT Eksekutif Marun (`#8C0014`) & Hinomaru:**
   - Desain premium bernuansa Jepang modern dengan *glassmorphism backdrop blur*.
   - Timer countdown otomatis sesuai standar durasi ujian resmi.
   - Perenderan kanji dengan bantuan anotasi Furigana HTML semantic (`<ruby><rt>`).
   - Kontrol audio pemutar percakapan *Choukai* dilengkapi Web Speech API synthesis fallback.
   - Lembar hasil kelulusan resmi dengan cap stempel Jepang Hanko (**合格 / 不合格**) dan pembahasan rinci setiap butir soal.

4. **Basis Data & ORM (Prisma):**
   - Skema relasional yang memisahkan soal per seksi, bobot kesulitan, riwayat ujian (*ExamAttempt*), pengguna, dan tier langganan.

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

### Prasyarat
- Node.js >= 18.x
- npm atau yarn

### Instalasi & Menjalankan Server
```bash
# 1. Masuk ke direktori
cd JLPT-Simulasi

# 2. Pasang dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev
```

Akses aplikasi di peramban: **`http://localhost:3005`** (atau port default 3000 jika dijalankan terpisah).

---

## 📤 Panduan Push ke Repositori GitHub Baru

Jika Anda ingin mengunggah proyek ini ke repositori `https://github.com/bisainst-dev/JLPT-Simulasi.git`:

```bash
cd JLPT-Simulasi
git init
git add .
git commit -m "feat: initial commit - platform simulasi ujian JLPT N5-N1"
git branch -M main
git remote add origin https://github.com/bisainst-dev/JLPT-Simulasi.git
git push -u origin main
```
