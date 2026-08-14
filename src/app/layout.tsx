import type { Metadata } from 'next';
import './globals.css';
import { getStoredProfile } from '@/lib/data';

const SITE_URL = 'https://tiger-khan.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getStoredProfile();

  const title = 'Tiger Khan — Profile & Information';

  const description =
    profile.tagline ||
    profile.about?.bio?.slice(0, 150) ||
    'Learn more about Tiger Khan, including his profile, background, work, and professional information.';

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
      'Tiger Khan profile',
      'Tiger Khan website',
      profile.name,
      profile.profession,
      profile.about?.company,
      profile.about?.industry,
      'Executive Profile',
      'Personal Website',
    ].filter(Boolean),

    authors: [
      {
        name: 'Tiger Khan',
        url: SITE_URL,
      },
    ],

    creator: 'Tiger Khan',

    metadataBase: new URL(SITE_URL),

    alternates: {
      canonical: '/',
    },

    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: 'Tiger Khan',

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Tiger Khan',
        },
      ],

      locale: 'en_IN',
      type: 'profile',
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],

      creator: profile.socials?.x
        ? `@${profile.socials.x.split('/').pop()}`
        : undefined,
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

  const profilePhoto = profile.profilePhoto || '';

  const imageUrl = profilePhoto.startsWith('http')
    ? profilePhoto
    : `${SITE_URL}${profilePhoto}`;

  const jsonLd = {
    '@context': 'https://schema.org',

    '@type': 'Person',

    name: profile.name || 'Tiger Khan',

    jobTitle: profile.profession || '',

    worksFor: {
      '@type': 'Organization',
      name: profile.about?.company || '',
    },

    description: profile.tagline || '',

    image: imageUrl,

    url: SITE_URL,

    address: {
      '@type': 'PostalAddress',
      streetAddress: profile.contact?.address || '',
    },

    telephone: profile.contact?.phone || '',

    email: profile.contact?.email || '',

    sameAs: Object.values(profile.socials || {}).filter(Boolean),
  };

  return (
    <html lang="en" className="scroll-smooth">
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