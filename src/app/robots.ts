import type { MetadataRoute } from 'next';
import { getStoredProfile } from '@/lib/data';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const profile = await getStoredProfile();

  const baseUrl =
    profile.socials?.website || 'https://tiger-khan.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },

    sitemap: `${baseUrl.replace(/\/$/, '')}/sitemap.xml`,
  };
}