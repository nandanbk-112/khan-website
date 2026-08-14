'use client';

import {
  Briefcase,
  Building2,
  Compass,
  MapPin,
  Award,
} from 'lucide-react';

interface AboutProps {
  badge?: string;
  sectionTitle?: string;
  bio: string;
  profession: string;
  company: string;
  industry: string;
  experience: string;
  location: string;
}

export default function About({
  badge,
  sectionTitle,
  bio,
  profession,
  company,
  industry,
  experience,
  location,
}: AboutProps) {
  const bioParagraphs = bio ? bio.split('\n\n') : [];

  const infoItems = [
    {
      icon: Briefcase,
      label: 'Profession',
      value: profession,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-950',
    },
    {
      icon: Building2,
      label: 'Company',
      value: company,
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconColor: 'text-emerald-600',
      textColor: 'text-emerald-950',
    },
    {
      icon: Compass,
      label: 'Industry',
      value: industry,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-950',
    },
    {
      icon: Award,
      label: 'Experience',
      value: experience,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconColor: 'text-amber-600',
      textColor: 'text-amber-950',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: location,
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      iconColor: 'text-rose-600',
      textColor: 'text-rose-950',
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 md:py-28 bg-white border-b border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
            {badge || 'Executive Summary'}
          </span>

          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900"
          >
            {sectionTitle || 'About Tiger Khan'}
          </h2>

          <div
            className="w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full mt-3"
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Bio text column */}
          <div
            className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg"
            itemProp="description"
          >
            {bioParagraphs.length > 0 ? (
              bioParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="font-normal"
                >
                  {para}
                </p>
              ))
            ) : (
              <p className="font-normal">
                Learn more about Tiger Khan, including professional background,
                experience, work, and areas of expertise.
              </p>
            )}
          </div>

          {/* Structured Information */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">

              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-3 border-b border-slate-200 flex items-center justify-between">
                <span>Key Credentials & Details</span>

                <span
                  className="w-2 h-2 rounded-full bg-blue-600"
                  aria-hidden="true"
                />
              </h3>

              <div className="space-y-3.5">
                {infoItems.map((item, idx) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-4 p-3.5 rounded-2xl border ${item.bgColor} ${item.borderColor} transition-transform hover:scale-[1.01]`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm ${item.iconColor}`}
                        aria-hidden="true"
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                          {item.label}
                        </span>

                        <span
                          className={`text-sm sm:text-base font-bold tracking-tight ${item.textColor}`}
                        >
                          {item.value || 'N/A'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
