import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/providers/AuthProvider';
import ImpersonationBanner from '@/components/common/ImpersonationBanner';

export const metadata: Metadata = {
  metadataBase: new URL('https://bisaedu.com'),
  title: {
    default: 'Simulasi Ujian JLPT N5-N1 Online Resmi | BISA EDU',
    template: '%s | BISA EDU',
  },
  description:
    'Platform simulasi resmi Ujian Kemampuan Bahasa Jepang (JLPT N5, N4, N3, N2, N1) standar Japan Foundation oleh BISA EDU. Latihan soal Gengo Chishiki, Dokkai, dan Choukai dengan scoring engine 180 poin, deteksi nilai mati, serta sertifikat resmi.',
  keywords: [
    'simulasi jlpt',
    'simulasi jlpt online',
    'ujian jlpt online',
    'latihan soal jlpt',
    'jlpt n5 online',
    'jlpt n4 online',
    'jlpt n3 online',
    'jlpt n2 online',
    'jlpt n1 online',
    'tryout jlpt',
    'bisa edu',
    'bisa jft',
    'tes bahasa jepang',
    'kursus bahasa jepang',
    'tokutei ginou ssw',
    'magang jepang ginou jisshusei',
    'beasiswa monbukagakusho',
    'gengo chishiki',
    'dokkai reading',
    'choukai listening',
  ],
  authors: [{ name: 'BISA EDU', url: 'https://bisaedu.com' }],
  creator: 'BISA EDU',
  publisher: 'BISA EDU Indonesia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://bisaedu.com',
  },
  openGraph: {
    title: 'Simulasi Ujian JLPT N5-N1 Online Resmi | BISA EDU',
    description:
      'Platform simulasi resmi Ujian Kemampuan Bahasa Jepang (JLPT N5 s/d N1) standar Japan Foundation dengan scoring engine 180 poin, analisis nilai mati seksional, dan sertifikat resmi.',
    url: 'https://bisaedu.com',
    siteName: 'BISA EDU',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/hero-fuji.png',
        width: 1200,
        height: 630,
        alt: 'BISA EDU - Platform Simulasi Ujian JLPT N5-N1 Resmi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulasi Ujian JLPT N5-N1 Online Resmi | BISA EDU',
    description:
      'Latihan soal ujian JLPT N5-N1 resmi dengan scoring engine 180 poin, audio choukai, dan pembahasan lengkap oleh BISA EDU.',
    images: ['/hero-fuji.png'],
    creator: '@bisaedu',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/hero-fuji.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data for Educational Organization & WebApplication
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://bisaedu.com/#organization',
        name: 'BISA EDU',
        url: 'https://bisaedu.com',
        logo: 'https://bisaedu.com/hero-fuji.png',
        description:
          'Lembaga pendidikan dan platform teknologi simulasi Ujian Kemampuan Bahasa Jepang (JLPT) dan JFT-Basic resmi di Indonesia.',
        sameAs: ['https://bisaedu.com'],
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://bisaedu.com/#webapp',
        name: 'Simulasi Ujian JLPT BISA EDU',
        url: 'https://bisaedu.com',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'IDR',
        },
        featureList: [
          'Simulasi Ujian JLPT N5, N4, N3, N2, N1',
          'Scoring Engine Standar 180 Poin Japan Foundation',
          'Audio Choukai Real Listening Player',
          'Sertifikat Kelulusan Digital Resmi',
          'Pembahasan Soal dan Analisis Titik Lemah',
        ],
      },
      {
        '@type': 'Course',
        '@id': 'https://bisaedu.com/#course',
        name: 'Simulasi Komprehensif Ujian JLPT (N5 - N1)',
        description:
          'Persiapan terstruktur menghadapi ujian resmi Japanese-Language Proficiency Test dengan bank soal terupdate dan evaluasi nilai mati seksional.',
        provider: {
          '@id': 'https://bisaedu.com/#organization',
        },
        educationalCredentialAwarded: 'Sertifikat Kelulusan Simulasi JLPT BISA EDU',
      },
    ],
  };

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
        <AuthProvider>
          <ImpersonationBanner />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
