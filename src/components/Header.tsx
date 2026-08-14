'use client';

import { useState, useEffect } from 'react';
import { Shield, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  name: string;
  profession: string;
  onOpenAdmin: () => void;
}

export default function Header({ name, profession, onOpenAdmin }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Career', href: '#career' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Videos', href: '#videos' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav border-b border-slate-200/80 py-3.5 shadow-soft' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand logo / Name */}
        <a href="#" className="group flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-widest shadow-md group-hover:scale-105 transition-all">
            {name ? name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'TK'}
          </div>
          <div>
            <span className="font-bold text-slate-900 text-base tracking-tight block group-hover:text-blue-600 transition-colors">
              {name}
            </span>
            <span className="text-xs text-blue-600 font-semibold hidden sm:block">
              {profession}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-amber-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border border-amber-300 hover:border-amber-500 text-slate-800 bg-amber-50/80 hover:bg-amber-100 transition-all shadow-sm"
            title="Admin Dashboard"
          >
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>Admin</span>
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-full border border-amber-300 bg-amber-50 text-amber-700"
            aria-label="Admin Login"
          >
            <Shield className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-slate-200 px-6 py-6 space-y-4">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-800 hover:text-blue-600 transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
