'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { VideoItem } from '@/lib/types';
import { Play, X, Clock, Video, Film, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoSectionProps {
  videos: VideoItem[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeVideo = selectedIndex !== null ? videos[selectedIndex] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((selectedIndex + 1) % videos.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((selectedIndex - 1 + videos.length) % videos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, videos.length]);

  // Helper to process YouTube/Vimeo links to proper embed URLs
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('vimeo.com/')) {
      const id = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    return url; // Direct file URL like /uploads/video.mp4
  };

  const isDirectVideoFile = (url: string) => {
    return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov') || url.includes('/uploads/');
  };

  if (!videos || videos.length === 0) return null;

  return (
    <section id="videos" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-100 inline-block mb-3">
            Media & Keynotes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Video Sessions & Talks
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-3" />
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setSelectedIndex(idx)}
              className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden">
                {item.thumbnailUrl ? (
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
                    <Film className="w-12 h-12 text-slate-600" />
                  </div>
                )}

                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                {item.duration && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[11px] font-extrabold text-white flex items-center gap-1 border border-white/20">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{item.duration}</span>
                  </div>
                )}

                {/* Category Tag */}
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-white border border-blue-400/30">
                  {item.category || 'Session'}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Watch Video Session</span>
                  <Play className="w-3.5 h-3.5 fill-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Video Player Lightbox Modal */}
      {activeVideo && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-modal flex flex-col md:flex-row"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white flex items-center justify-center transition-colors shadow-md"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous Button */}
            <button
              onClick={() => setSelectedIndex((selectedIndex - 1 + videos.length) % videos.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-blue-600/80 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-md"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={() => setSelectedIndex((selectedIndex + 1) % videos.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-blue-600/80 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-md md:right-auto md:left-[calc(100%-3rem)] lg:right-4"
              aria-label="Next video"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Player Box */}
            <div className="relative flex-1 aspect-[16/9] md:aspect-auto min-h-[300px] md:min-h-[500px] bg-black flex items-center justify-center">
              {isDirectVideoFile(activeVideo.videoUrl) ? (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  poster={activeVideo.thumbnailUrl}
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(activeVideo.videoUrl)}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>

            {/* Video Details Sidebar */}
            <div className="w-full md:w-80 p-6 md:p-8 bg-slate-950 text-white flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/20">
                    {activeVideo.category || 'Media Session'}
                  </span>
                  {activeVideo.duration && (
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{activeVideo.duration}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                  {activeVideo.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {activeVideo.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Session {selectedIndex + 1} of {videos.length}</span>
                <span className="text-blue-400 font-semibold">Use ← → keys</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
