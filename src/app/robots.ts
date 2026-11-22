import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/exam/',
          '/result/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/exam/',
          '/result/',
        ],
      },
    ],
    sitemap: 'https://bisaedu.com/sitemap.xml',
    host: 'https://bisaedu.com',
  };
}
