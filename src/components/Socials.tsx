'use client';

import { Globe, ExternalLink } from 'lucide-react';

interface SocialsProps {
  socials?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    x?: string;
    youtube?: string;
    website?: string;
  };
}

export default function Socials({ socials }: SocialsProps) {
  const links = [
    {
      name: 'Instagram',
      url: socials?.instagram,
      icon: Globe,
      hoverStyle:
        'hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-600 hover:to-purple-600 hover:text-white hover:border-transparent',
    },
    {
      name: 'Facebook',
      url: socials?.facebook,
      icon: Globe,
      hoverStyle:
        'hover:bg-blue-600 hover:text-white hover:border-transparent',
    },
    {
      name: 'LinkedIn',
      url: socials?.linkedin,
      icon: Globe,
      hoverStyle:
        'hover:bg-blue-700 hover:text-white hover:border-transparent',
    },
    {
      name: 'X',
      url: socials?.x,
      icon: Globe,
      hoverStyle:
        'hover:bg-black hover:text-white hover:border-transparent',
    },
    {
      name: 'YouTube',
      url: socials?.youtube,
      icon: Globe,
      hoverStyle:
        'hover:bg-red-600 hover:text-white hover:border-transparent',
    },
    {
      name: 'Website',
      url: socials?.website,
      icon: Globe,
      hoverStyle:
        'hover:bg-slate-900 hover:text-white hover:border-transparent',
    },
  ];

  const validLinks = links.filter(
    (item) => item.url && item.url.trim() !== ''
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
            Connect
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Follow & Connect
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {validLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className={`group flex items-center gap-3 rounded-full border border-slate-200 px-5 py-3 text-slate-700 transition-all duration-300 ${item.hoverStyle}`}
              >
                <Icon className="h-5 w-5" />

                <span className="font-medium">{item.name}</span>

                <ExternalLink className="h-4 w-4 opacity-60" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}