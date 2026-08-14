'use client';

import { CareerItem } from '@/lib/types';
import { Briefcase, Building, Star, CheckCircle2 } from 'lucide-react';

interface CareerProps {
  career: CareerItem[];
}

export default function Career({ career }: CareerProps) {
  return (
    <section id="career" className="py-20 md:py-28 career-gradient-bg border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100 inline-block mb-3">
            Track Record & Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Career & Business Ventures
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mt-3" />
        </div>

        {/* Timeline Cards */}
        <div className="space-y-6">
          {career.map((item, idx) => {
            const isCurrent = idx === 0;
            return (
              <div
                key={item.id || idx}
                className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 shadow-soft hover:shadow-soft-lg ${
                  isCurrent
                    ? 'border-l-4 border-l-blue-600 border-blue-200 bg-gradient-to-r from-blue-50/30 to-white'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                      <span className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {item.period}
                      </span>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                          <span>Current Position</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                      {item.position}
                    </h3>
                  </div>

                  <div className="flex flex-col md:items-end">
                    <div className="flex items-center gap-2 text-base font-bold text-blue-700">
                      <Building className="w-4 h-4 text-blue-600" />
                      <span>{item.company}</span>
                    </div>
                    <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100 mt-1">
                      {item.businessType}
                    </span>
                  </div>
                </div>

                <div className="pt-6 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
