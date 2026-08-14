import type { Metadata } from 'next';
import './globals.css';
import { getStoredProfile } from '@/lib/data';

const SITE_URL = 'https://tiger-khan.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getStoredProfile();

  const name = profile.name?.trim() || 'Tiger Khan';

  const title = 'Tiger Khan | Mysuru Entrepreneur, Real Estate & Finance';

  const description =
    profile.tagline?.trim() ||
    'Tiger Khan is a Mysuru-based entrepreneur and business professional with experience in real estate, finance and business activities across Mysuru and Karnataka.';

  const profilePhoto = profile.profilePhoto || '';

  const imageUrl = profilePhoto.startsWith('http')
    ? profilePhoto
    : `${SITE_URL}${profilePhoto}`;

  return {
    title: {
      default: title,
      template: '%s | Tiger Khan',
    },

    description,

    keywords: [
      'Tiger Khan',
      'Tiger Khan Mysore',
      'Tiger Khan Mysuru',
      'Tiger Khan profile',
      'Tiger Khan website',
      'Tiger Khan real estate',
      'Tiger Khan finance',
      'Tiger Shabaz Real Estate',
      'Mysuru entrepreneur',
      'Mysore entrepreneur',
      'Mysuru real estate',
      'Mysore real estate',
      'Mysuru business',
      'Mysore business',
      'Karnataka business professional',
      'real estate business Mysuru',
      'finance business Mysuru',
    ],

    authors: [
      {
        name,
        url: SITE_URL,
      },
    ],

    creator: name,

    publisher: name,

    metadataBase: new URL(SITE_URL),

    alternates: {
      canonical: SITE_URL,
    },

    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: 'Tiger Khan',
      locale: 'en_IN',
      type: 'profile',

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Tiger Khan - Mysuru Entrepreneur and Business Professional',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
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
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getStoredProfile();

  const name = profile.name?.trim() || 'Tiger Khan';

  const profilePhoto = profile.profilePhoto || '';

  const imageUrl = profilePhoto.startsWith('http')
    ? profilePhoto
    : `${SITE_URL}${profilePhoto}`;

  const jsonLd = {
    '@context': 'https://schema.org',

    '@type': 'Person',

    '@id': `${SITE_URL}/#person`,

    name,

    url: SITE_URL,

    image: imageUrl,

    jobTitle:
      profile.profession ||
      'Entrepreneur and Business Professional',

    description:
      profile.about?.bio ||
      profile.tagline ||
      'Mysuru-based entrepreneur and business professional.',

    worksFor: {
      '@type': 'Organization',
      name:
        profile.about?.company ||
        'Tiger Shabaz Real Estate',
    },

    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mysuru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },

    telephone: profile.contact?.phone || undefined,

    email: profile.contact?.email || undefined,

    sameAs: Object.values(profile.socials || {}).filter(Boolean),
  };

  return (
    <html lang="en-IN" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body className="bg-white text-text-primary antialiased selection:bg-accent-gold/20 selection:text-accent">
        {children}
      </body>
    </html>
  );
}