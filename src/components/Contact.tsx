'use client';

import { Phone, Mail, MapPin, MessageCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ContactProps {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
}

export default function Contact({ phone, email, address, whatsapp }: ContactProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const whatsappClean = whatsapp ? whatsapp.replace(/[^0-9]/g, '') : '';
  const whatsappUrl = whatsappClean ? `https://wa.me/${whatsappClean}` : '#';

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100 inline-block mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Direct Executive Contact
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Phone Card - Sapphire Blue Theme */}
          <div className="bg-blue-50/70 p-6 rounded-3xl border border-blue-200 flex flex-col justify-between space-y-4 hover:shadow-soft transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <button
                onClick={() => copyToClipboard(phone, 'phone')}
                className="text-xs text-blue-700 hover:text-blue-900 p-1.5 rounded-lg bg-blue-100/80 hover:bg-blue-200 transition-colors"
                title="Copy phone"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-700 font-bold" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block">
                Direct Line
              </span>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="text-base font-bold text-slate-900 hover:text-blue-700 transition-colors block mt-1"
              >
                {phone || 'Not available'}
              </a>
            </div>
          </div>

          {/* Email Card - Indigo/Purple Theme */}
          <div className="bg-indigo-50/70 p-6 rounded-3xl border border-indigo-200 flex flex-col justify-between space-y-4 hover:shadow-soft transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <button
                onClick={() => copyToClipboard(email, 'email')}
                className="text-xs text-indigo-700 hover:text-indigo-900 p-1.5 rounded-lg bg-indigo-100/80 hover:bg-indigo-200 transition-colors"
                title="Copy email"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-700 font-bold" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block">
                Email Address
              </span>
              <a
                href={`mailto:${email}`}
                className="text-base font-bold text-slate-900 hover:text-indigo-700 transition-colors block mt-1 truncate"
              >
                {email || 'Not available'}
              </a>
            </div>
          </div>

          {/* Address Card - Amber/Gold Theme */}
          <div className="bg-amber-50/70 p-6 rounded-3xl border border-amber-200 flex flex-col justify-between space-y-4 hover:shadow-soft transition-all md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <button
                onClick={() => copyToClipboard(address, 'address')}
                className="text-xs text-amber-800 hover:text-amber-950 p-1.5 rounded-lg bg-amber-100/80 hover:bg-amber-200 transition-colors"
                title="Copy address"
              >
                {copiedField === 'address' ? <Check className="w-4 h-4 text-emerald-700 font-bold" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                Office Location
              </span>
              <p className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                {address || 'Not available'}
              </p>
            </div>
          </div>

          {/* WhatsApp Action Card - Emerald Green Theme */}
          <div className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white p-6 rounded-3xl flex flex-col justify-between space-y-4 shadow-soft hover:shadow-soft-lg transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-emerald-300 font-bold">
              <MessageCircle className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 block">
                Instant WhatsApp
              </span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-extrabold uppercase tracking-wider transition-all shadow-md"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
