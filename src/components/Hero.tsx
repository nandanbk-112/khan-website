'use client';

import Image from 'next/image';
import { ArrowDownRight, Mail, ShieldCheck, Award } from 'lucide-react';
import { StatItem } from '@/lib/types';

interface HeroProps {
  name: string;
  profession: string;
  tagline: string;
  profilePhoto: string;
  stats?: StatItem[];
}

export default function Hero({
  name,
  profession,
  tagline,
  profilePhoto,
  stats,
}: HeroProps) {
  const displayStats =
    stats && stats.length > 0
      ? stats
      : [
          { id: 's1', value: '18+ Yrs', label: 'LEADERSHIP' },
          { id: 's2', value: '$120M+', label: 'ASSETS MANAGED' },
          { id: 's3', value: 'Global', label: 'INVESTMENTS' },
        ];

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 hero-gradient-bg border-b border-slate-200 overflow-hidden"
    >
      {/* Decorative ambient color light blobs */}
      <div
        className="absolute top-1/4 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div
        className="absolute top-10 right-1/3 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Information Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status / Credibility Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-blue-200 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-md">
              <span
                className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"
                aria-hidden="true"
              />

              <span className="text-blue-900 font-bold uppercase tracking-wider text-[11px]">
                Official Executive Profile
              </span>

              <ShieldCheck
                className="w-4 h-4 text-amber-500 ml-0.5"
                aria-hidden="true"
              />
            </div>

            {/* Main SEO Heading */}
            <div>
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
              >
                {name}
              </h1>

              <div
                className="w-20 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 rounded-full mt-3"
                aria-hidden="true"
              />
            </div>

            {/* Profession */}
            <p
              className="text-xl sm:text-2xl font-bold tracking-tight text-gradient-blue"
              aria-label={`Profession: ${profession}`}
            >
              {profession}
            </p>

            {/* Introduction / Description */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-2xl pt-1">
              {tagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-700 hover:to-indigo-900 text-white text-sm font-bold tracking-wide shadow-color-blue transition-all duration-300 transform hover:-translate-y-0.5"
                aria-label={`Contact ${name}`}
              >
                <Mail
                  className="w-4 h-4 text-amber-300"
                  aria-hidden="true"
                />
                <span>Get In Touch</span>
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-bold tracking-wide shadow-sm transition-all duration-200"
                aria-label={`View ${name}'s profile`}
              >
                <span>View Profile</span>

                <ArrowDownRight
                  className="w-4 h-4 text-blue-600"
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Dynamic Statistics */}
            <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg border-t border-slate-200/80">
              {displayStats.map((stat, idx) => {
                const colorClasses = [
                  {
                    border: 'border-blue-200',
                    text: 'text-blue-600',
                  },
                  {
                    border: 'border-amber-200',
                    text: 'text-amber-600',
                  },
                  {
                    border: 'border-emerald-200',
                    text: 'text-emerald-600',
                  },
                ][idx % 3];

                return (
                  <div
                    key={stat.id || idx}
                    className={`p-3 rounded-2xl bg-white/90 border ${colorClasses.border} shadow-sm backdrop-blur-sm`}
                  >
                    <span
                      className={`block text-xl font-extrabold ${colorClasses.text}`}
                    >
                      {stat.value}
                    </span>

                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Profile Photo Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-blue-600 via-amber-400 to-indigo-600 shadow-soft-lg group">
              
              <div className="relative w-full h-full rounded-[1.3rem] overflow-hidden bg-slate-900">
                <Image
                  src={profilePhoto || '/images/profile.jpg'}
                  alt={`${name} — ${profession}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 400px"
                  className="object-cover object-top filter contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-75"
                  aria-hidden="true"
                />

                {/* Floating Executive Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between">
                  
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-md"
                      aria-hidden="true"
                    >
                      <Award className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <p className="text-xs font-extrabold text-slate-900 tracking-tight">
                        {name}
                      </p>

                      <p className="text-[11px] font-semibold text-blue-700">
                        {profession}
                      </p>
                    </div>
                  </div>

                  <span
                    className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm"
                    aria-label="Profile available"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
