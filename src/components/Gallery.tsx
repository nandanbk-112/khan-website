'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/types';
import { X, Maximize2, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface GalleryProps {
  items: GalleryItem[];
}

export default function Gallery({ items }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeItem = selectedIndex !== null ? items[selectedIndex] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((selectedIndex + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, items.length]);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-slate-900 text-white relative">
      
      {/* Decorative ambient color spots */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20 inline-block mb-3">
            Portfolio Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Photo Gallery
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-blue-500 rounded-full mt-3" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setSelectedIndex(idx)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 shadow-soft cursor-pointer bg-slate-850"
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              
              {/* Vibrant Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-md border border-amber-400/30 w-fit mb-2">
                  {item.category}
                </span>
                <h4 className="text-base font-bold tracking-tight text-white">{item.title}</h4>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-blue-600/80 backdrop-blur-md flex items-center justify-center text-white shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      {activeItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Modal Container */}
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-modal flex flex-col md:flex-row"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
              aria-label="Close fullscreen"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous Button */}
            <button
              onClick={() => setSelectedIndex((selectedIndex - 1 + items.length) % items.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-blue-600/80 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={() => setSelectedIndex((selectedIndex + 1) % items.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-blue-600/80 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-md"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Box */}
            <div className="relative flex-1 aspect-[4/3] md:aspect-auto min-h-[300px] md:min-h-[500px] bg-black">
              <Image
                src={activeItem.url}
                alt={activeItem.title}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Details Box */}
            <div className="w-full md:w-80 p-6 md:p-8 bg-slate-950 text-white flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block">
                  {activeItem.category}
                </span>
                <h3 className="text-xl font-extrabold tracking-tight text-white">
                  {activeItem.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {activeItem.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Photo {selectedIndex + 1} of {items.length}</span>
                <span className="text-blue-400 font-semibold">Use ← → keys</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
