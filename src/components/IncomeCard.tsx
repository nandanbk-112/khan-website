'use client';

import { DollarSign, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface IncomeCardProps {
  annualIncome: {
    show: boolean;
    amount: string;
    note: string;
  };
}

export default function IncomeCard({ annualIncome }: IncomeCardProps) {
  if (!annualIncome || !annualIncome.show) {
    return null;
  }

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-800/40 shadow-soft-lg max-w-4xl mx-auto text-white relative overflow-hidden">
          
          {/* Subtle gold glow behind icon */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shrink-0 shadow-md font-extrabold">
                <DollarSign className="w-7 h-7 text-slate-950" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block">
                  Annual Compensation / Revenue
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-0.5">
                  {annualIncome.amount || 'Undisclosed'}
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-xs text-slate-200 space-y-1 sm:max-w-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Declaration</span>
              </div>
              <p className="leading-snug text-slate-300">
                {annualIncome.note || "Information provided by the profile owner."}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
