import { MetadataRoute } from 'next';
import { getStoredProfile } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const profile = getStoredProfile();
  const baseUrl = 'https://tiger-khan.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
