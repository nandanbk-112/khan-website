'use client';

import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  name: string;
  profession: string;
  onOpenAdmin: () => void;
}

export default function Footer({ name, profession, onOpenAdmin }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 bg-slate-900 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div>
          <p className="font-bold text-white tracking-tight text-sm">
            © {year} {name || 'Personal Profile'}. All rights reserved.
          </p>
          <p className="text-blue-400 font-semibold text-[11px] mt-0.5">
            {profession || 'Executive Profile'}
          </p>
        </div>

        <div className="flex items-center gap-6 text-slate-300">
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#career" className="hover:text-blue-400 transition-colors">Career</a>
          <a href="#gallery" className="hover:text-blue-400 transition-colors">Gallery</a>
          <a href="#videos" className="hover:text-blue-400 transition-colors">Videos</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          <button
            onClick={onOpenAdmin}
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
