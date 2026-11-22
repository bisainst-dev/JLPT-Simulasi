import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BISA EDU - Simulasi Ujian JLPT N5-N1 Resmi',
    short_name: 'BISA JLPT',
    description: 'Platform simulasi resmi Ujian Kemampuan Bahasa Jepang (JLPT N5-N1) standar Japan Foundation oleh BISA EDU.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf9f6',
    theme_color: '#8C0014',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
