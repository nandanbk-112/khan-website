'use client';

import { useState, useRef } from 'react';
import { ProfileData, GalleryItem, CareerItem, StatItem, VideoItem } from '@/lib/types';
import {
  X,
  Lock,
  Check,
  Plus,
  Trash2,
  Image as ImageIcon,
  User,
  Briefcase,
  DollarSign,
  PhoneCall,
  Share2,
  Save,
  ShieldCheck,
  AlertCircle,
  Upload,
  BarChart3,
  FileText,
  Video,
  ArrowLeft,
  LayoutGrid,
  ChevronRight
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: ProfileData;
  onUpdate: (newData: ProfileData) => void;
}

export default function AdminModal({
  isOpen,
  onClose,
  currentData,
  onUpdate
}: AdminModalProps) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'general' | 'about' | 'stats' | 'career' | 'gallery' | 'videos' | 'income' | 'contact' | 'socials'
  >('overview');
  const [formData, setFormData] = useState<ProfileData>(currentData);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const profilePhotoInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();

      if (data.authenticated) {
        setIsAuthenticated(true);
        setFormData(currentData);
      } else {
        setAuthError(data.error || 'Incorrect passcode');
      }
    } catch (err) {
      setAuthError('Error authenticating passcode');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode,
          data: formData,
        }),
      });

      const result = await res.json();

      if (result.success) {
        onUpdate(formData);
        showToast('Changes saved & published live!');
      } else {
        showToast(result.error || 'Failed to save changes');
      }
    } catch (error) {
      showToast('Save failed due to network error');
    } finally {
      setIsSaving(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Profile photo upload helper
  const handleUploadProfilePhoto = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (result.success && result.url) {
        setFormData({
          ...formData,
          profilePhoto: result.url,
        });

        showToast('Profile photo uploaded successfully!');
      } else {
        showToast('Upload failed');
      }
    } catch (err) {
      showToast('Error uploading image file');
    } finally {
      setIsUploading(false);
    }
  };

  // Gallery photo upload helper
  const handleUploadGalleryPhoto = async (
    itemId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (result.success && result.url) {
        handleUpdateGalleryItem(itemId, 'url', result.url);
        showToast('Gallery image uploaded!');
      } else {
        showToast('Upload failed');
      }
    } catch (err) {
      showToast('Error uploading image file');
    } finally {
      setIsUploading(false);
    }
  };

  // Video file upload helper
  const handleUploadVideoFile = async (
    videoId: string,
    field: 'videoUrl' | 'thumbnailUrl',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (result.success && result.url) {
        handleUpdateVideoItem(videoId, field, result.url);
        showToast(
          `${field === 'videoUrl' ? 'Video file' : 'Thumbnail'} uploaded!`
        );
      } else {
        showToast('Upload failed');
      }
    } catch (err) {
      showToast('Error uploading video file');
    } finally {
      setIsUploading(false);
    }
  };

  // Stat Cards handlers
  const handleAddStatItem = () => {
    const newStat: StatItem = {
      id: `s_${Date.now()}`,
      value: '10+',
      label: 'NEW METRIC',
    };

    setFormData({
      ...formData,
      stats: [...(formData.stats || []), newStat],
    });
  };

  const handleDeleteStatItem = (id: string) => {
    setFormData({
      ...formData,
      stats: (formData.stats || []).filter(item => item.id !== id),
    });
  };

  const handleUpdateStatItem = (
    id: string,
    field: 'value' | 'label',
    value: string
  ) => {
    setFormData({
      ...formData,
      stats: (formData.stats || []).map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  // Gallery handlers
  const handleAddGalleryItem = () => {
    const newItem: GalleryItem = {
      id: `g_${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      title: 'New Executive Highlight',
      category: 'Leadership',
      description: 'Add description here.',
    };

    setFormData({
      ...formData,
      gallery: [...formData.gallery, newItem],
    });
  };

  const handleDeleteGalleryItem = (id: string) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter(item => item.id !== id),
    });
  };

  const handleUpdateGalleryItem = (
    id: string,
    field: keyof GalleryItem,
    value: string
  ) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  // Video handlers
  const handleAddVideoItem = () => {
    const newVideo: VideoItem = {
      id: `v_${Date.now()}`,
      title: 'New Video Session',
      category: 'Keynote Speech',
      description: 'Describe the video content and keynote topics.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: '/images/keynote.jpg',
      duration: '15:00',
    };

    setFormData({
      ...formData,
      videos: [...(formData.videos || []), newVideo],
    });
  };

  const handleDeleteVideoItem = (id: string) => {
    setFormData({
      ...formData,
      videos: (formData.videos || []).filter(item => item.id !== id),
    });
  };

  const handleUpdateVideoItem = (
    id: string,
    field: keyof VideoItem,
    value: string
  ) => {
    setFormData({
      ...formData,
      videos: (formData.videos || []).map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  // Career handlers
  const handleAddCareerItem = () => {
    const newItem: CareerItem = {
      id: `c_${Date.now()}`,
      period: '2024 – Present',
      position: 'New Position',
      company: 'Company Name',
      businessType: 'Industry / Business Type',
      description: 'Describe role achievements.',
    };

    setFormData({
      ...formData,
      career: [newItem, ...formData.career],
    });
  };

  const handleDeleteCareerItem = (id: string) => {
    setFormData({
      ...formData,
      career: formData.career.filter(item => item.id !== id),
    });
  };

  const handleUpdateCareerItem = (
    id: string,
    field: keyof CareerItem,
    value: string
  ) => {
    setFormData({
      ...formData,
      career: formData.career.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  // Admin Section Cards Config
  const adminSections = [
    {
      id: 'general',
      title: 'Hero & Profile Portrait',
      desc: 'Edit name, profession title, intro tagline, and upload profile photo.',
      icon: User,
      color: 'bg-blue-50 border-blue-200 text-blue-600',
    },
    {
      id: 'about',
      title: 'About Us & Key Credentials',
      desc: 'Edit biography paragraphs, section title, company, industry, experience, location.',
      icon: FileText,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    },
    {
      id: 'stats',
      title: 'Stat Chips / Metrics',
      desc: 'Edit executive stat boxes (e.g. 18+ Yrs Leadership, $120M+ Assets).',
      icon: BarChart3,
      color: 'bg-amber-50 border-amber-200 text-amber-600',
    },
    {
      id: 'videos',
      title: 'Video Sessions & Keynotes',
      desc: 'Upload MP4 video files or add YouTube/Vimeo keynote links.',
      icon: Video,
      color: 'bg-purple-50 border-purple-200 text-purple-600',
    },
    {
      id: 'career',
      title: 'Career History & Timeline',
      desc: 'Manage position milestones, company names, and strategic focus.',
      icon: Briefcase,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-600',
    },
    {
      id: 'gallery',
      title: 'Photo Gallery',
      desc: 'Upload photo files, edit titles, categories, and descriptions.',
      icon: ImageIcon,
      color: 'bg-pink-50 border-pink-200 text-pink-600',
    },
    {
      id: 'income',
      title: 'Annual Income Card',
      desc: 'Toggle income card display and edit declaration amount.',
      icon: DollarSign,
      color: 'bg-teal-50 border-teal-200 text-teal-600',
    },
    {
      id: 'contact',
      title: 'Direct Contact Details',
      desc: 'Update phone number, email, office address, and WhatsApp.',
      icon: PhoneCall,
      color: 'bg-sky-50 border-sky-200 text-sky-600',
    },
    {
      id: 'socials',
      title: 'Social Media Links',
      desc: 'Edit Instagram, LinkedIn, Facebook, X, YouTube, and website URLs.',
      icon: Share2,
      color: 'bg-rose-50 border-rose-200 text-rose-600',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white max-w-4xl w-full rounded-3xl border border-slate-200 shadow-modal overflow-hidden flex flex-col max-h-[90vh]">

        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-blue-600 hover:border-blue-300 text-xs font-bold transition-all shadow-sm group"
              title="Exit Admin to Website"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:-translate-x-0.5 group-hover:text-blue-600 transition-transform" />
              <span>Exit to Website</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 border-l border-slate-300 pl-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
              </div>
              <span className="font-extrabold text-slate-900 text-sm tracking-tight">
                Admin Executive Portal
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-bold"
            aria-label="Close admin modal"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Login Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Secure Admin Access
              </h4>
              <p className="text-xs font-medium text-slate-500 mt-1">
                Enter your admin passcode to edit profile details & upload media.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter admin passcode"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold text-center tracking-widest"
              />

              {authError && (
                <div className="flex items-center gap-2 text-xs text-rose-600 justify-center font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-color-blue"
              >
                Authenticate & Access Dashboard
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Profile Website</span>
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard Tabs & Editor */
          <div className="flex flex-col flex-1 overflow-hidden">

            {/* Tabs Navigation Bar */}
            <div className="flex overflow-x-auto border-b border-slate-200 px-4 bg-slate-50 scrollbar-none">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-700 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
                <span>Sections Overview</span>
              </button>

              {[
                { id: 'general', label: 'Hero & Photo', icon: User },
                { id: 'about', label: 'About Us', icon: FileText },
                { id: 'stats', label: 'Stat Chips', icon: BarChart3 },
                { id: 'videos', label: 'Video Sessions', icon: Video },
                { id: 'career', label: 'Career History', icon: Briefcase },
                { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
                { id: 'income', label: 'Income Card', icon: DollarSign },
                { id: 'contact', label: 'Contact', icon: PhoneCall },
                { id: 'socials', label: 'Social Links', icon: Share2 },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
                      isActive
                        ? 'border-blue-600 text-blue-700 bg-white'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : ''}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">

              {activeTab !== 'overview' && (
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-blue-600 text-xs font-bold transition-all shadow-sm group"
                  >
                    <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:-translate-x-1 transition-transform" />
                    <span>← Back to All Admin Sections Overview</span>
                  </button>

                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                    Editing: {activeTab.toUpperCase()}
                  </span>
                </div>
              )}

              {/* OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 tracking-tight">
                      Admin Sections Overview
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select any section to edit details, upload photos, or manage video sessions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {adminSections.map(sec => {
                      const Icon = sec.icon;

                      return (
                        <div
                          key={sec.id}
                          onClick={() => setActiveTab(sec.id as any)}
                          className="group p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 hover:shadow-soft transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4"
                        >
                          <div className="flex items-start justify-between">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border shadow-sm ${sec.color}`}>
                              <Icon className="w-5 h-5" />
                            </div>

                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                          </div>

                          <div>
                            <h5 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {sec.title}
                            </h5>

                            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                              {sec.desc}
                            </p>
                          </div>

                          <div className="pt-2 flex items-center text-xs font-bold text-blue-600 group-hover:underline">
                            <span>Open & Edit {sec.title.split(' ')[0]}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* GENERAL */}
              {activeTab === 'general' && (
                <div className="space-y-6 max-w-2xl">

                  <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-3">
                    <label className="text-xs font-extrabold text-blue-900 uppercase tracking-wider block">
                      Profile Photo Upload & Preview
                    </label>

                    <div className="flex items-center gap-4">
                      {formData.profilePhoto && (
                        <div className="w-16 h-20 rounded-xl overflow-hidden relative border border-slate-300 shadow-sm shrink-0">
                          <img
                            src={formData.profilePhoto}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1 space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          ref={profilePhotoInputRef}
                          onChange={handleUploadProfilePhoto}
                          className="hidden"
                        />

                        <button
                          type="button"
                          onClick={() => profilePhotoInputRef.current?.click()}
                          disabled={isUploading}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
                        >
                          <Upload className="w-4 h-4" />
                          <span>
                            {isUploading
                              ? 'Uploading Image...'
                              : 'Upload Profile Photo File'}
                          </span>
                        </button>

                        <p className="text-[11px] text-slate-500">
                          Select any JPG/PNG/WEBP photo from your computer to update profile portrait.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                        Or Image URL
                      </label>

                      <input
                        type="text"
                        value={formData.profilePhoto}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            profilePhoto: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={formData.name}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Profession / Title
                    </label>

                    <input
                      type="text"
                      value={formData.profession}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          profession: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      One-line Tagline / Intro
                    </label>

                    <textarea
                      rows={2}
                      value={formData.tagline}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          tagline: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* ABOUT */}
              {activeTab === 'about' && (
                <div className="space-y-6 max-w-2xl">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                        Section Badge Pill
                      </label>

                      <input
                        type="text"
                        value={formData.about.badge || ''}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            about: {
                              ...formData.about,
                              badge: e.target.value,
                            },
                          })
                        }
                        placeholder="Executive Summary"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                        Section Heading Title
                      </label>

                      <input
                        type="text"
                        value={formData.about.sectionTitle || ''}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            about: {
                              ...formData.about,
                              sectionTitle: e.target.value,
                            },
                          })
                        }
                        placeholder="About & Overview"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-extrabold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Full Biography Text (Paragraphs separated by double enter)
                    </label>

                    <textarea
                      rows={7}
                      value={formData.about.bio}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          about: {
                            ...formData.about,
                            bio: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 text-sm leading-relaxed"
                    />
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-200">
                      Key Credentials Cards
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div>
                        <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
                          Profession
                        </label>

                        <input
                          type="text"
                          value={formData.about.profession}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              about: {
                                ...formData.about,
                                profession: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                          Company Name
                        </label>

                        <input
                          type="text"
                          value={formData.about.company}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              about: {
                                ...formData.about,
                                company: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">
                          Industry
                        </label>

                        <input
                          type="text"
                          value={formData.about.industry}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              about: {
                                ...formData.about,
                                industry: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
                          Years of Experience
                        </label>

                        <input
                          type="text"
                          value={formData.about.experience}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              about: {
                                ...formData.about,
                                experience: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-rose-700 uppercase tracking-wider block mb-1">
                          Primary Office Location
                        </label>

                        <input
                          type="text"
                          value={formData.about.location}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              about: {
                                ...formData.about,
                                location: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                        />
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* STATS */}
              {activeTab === 'stats' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                        Stat Chips / Badges
                      </h4>

                      <p className="text-xs text-slate-500">
                        Edit the 3 stat metric boxes displayed under your introduction in the Hero section.
                      </p>
                    </div>

                    <button
                      onClick={handleAddStatItem}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Stat Metric</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(formData.stats || []).map((stat, idx) => (
                      <div
                        key={stat.id || idx}
                        className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-600 uppercase">
                            Stat #{idx + 1}
                          </span>

                          <button
                            onClick={() => handleDeleteStatItem(stat.id)}
                            className="text-xs text-rose-600 hover:text-rose-700 p-1"
                            title="Delete stat"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                            Number / Value
                          </label>

                          <input
                            type="text"
                            placeholder="e.g. 18+ Yrs"
                            value={stat.value}
                            onChange={e =>
                              handleUpdateStatItem(
                                stat.id,
                                'value',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-extrabold text-blue-700"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                            Label / Metric
                          </label>

                          <input
                            type="text"
                            placeholder="e.g. LEADERSHIP"
                            value={stat.label}
                            onChange={e =>
                              handleUpdateStatItem(
                                stat.id,
                                'label',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold uppercase tracking-wider"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VIDEOS */}
              {activeTab === 'videos' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                        Video Sessions & Keynotes ({(formData.videos || []).length})
                      </h4>

                      <p className="text-xs text-slate-500">
                        Upload video files (MP4/WebM) or add YouTube/Vimeo embed links.
                      </p>
                    </div>

                    <button
                      onClick={handleAddVideoItem}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Video Session</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(formData.videos || []).map((video, idx) => (
                      <div
                        key={video.id || idx}
                        className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                            Video Session #{idx + 1}
                          </span>

                          <button
                            onClick={() => handleDeleteVideoItem(video.id)}
                            className="text-xs text-rose-600 hover:text-rose-700 p-1 flex items-center gap-1 font-semibold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove Video</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                              Session Title
                            </label>

                            <input
                              type="text"
                              placeholder="Session Title"
                              value={video.title}
                              onChange={e =>
                                handleUpdateVideoItem(
                                  video.id,
                                  'title',
                                  e.target.value
                                )
                              }
                              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-extrabold"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                                Category
                              </label>

                              <input
                                type="text"
                                placeholder="Keynote / Talk"
                                value={video.category}
                                onChange={e =>
                                  handleUpdateVideoItem(
                                    video.id,
                                    'category',
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                                Duration
                              </label>

                              <input
                                type="text"
                                placeholder="e.g. 18:45"
                                value={video.duration || ''}
                                onChange={e =>
                                  handleUpdateVideoItem(
                                    video.id,
                                    'duration',
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl border border-purple-200 bg-purple-50/60 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <label className="text-xs font-extrabold text-purple-900 uppercase tracking-wider">
                              Video Source (Upload MP4 or Paste YouTube Link)
                            </label>

                            <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600 text-white text-[11px] font-bold cursor-pointer hover:bg-purple-700 transition-colors shadow-sm">
                              <Upload className="w-3 h-3" />
                              <span>Upload Video File (MP4/WebM)</span>

                              <input
                                type="file"
                                accept="video/*"
                                onChange={e =>
                                  handleUploadVideoFile(
                                    video.id,
                                    'videoUrl',
                                    e
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                          </div>

                          <input
                            type="text"
                            placeholder="Video URL or Embed Link"
                            value={video.videoUrl}
                            onChange={e =>
                              handleUpdateVideoItem(
                                video.id,
                                'videoUrl',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                          />
                        </div>

                        <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                              Video Cover Thumbnail (Optional)
                            </label>

                            <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-white text-[11px] font-bold cursor-pointer hover:bg-slate-900 transition-colors">
                              <Upload className="w-3 h-3" />
                              <span>Upload Thumbnail File</span>

                              <input
                                type="file"
                                accept="image/*"
                                onChange={e =>
                                  handleUploadVideoFile(
                                    video.id,
                                    'thumbnailUrl',
                                    e
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                          </div>

                          <input
                            type="text"
                            placeholder="Thumbnail Image URL"
                            value={video.thumbnailUrl || ''}
                            onChange={e =>
                              handleUpdateVideoItem(
                                video.id,
                                'thumbnailUrl',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                            Session Description
                          </label>

                          <textarea
                            rows={2}
                            placeholder="Describe session topics..."
                            value={video.description}
                            onChange={e =>
                              handleUpdateVideoItem(
                                video.id,
                                'description',
                                e.target.value
                              )
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CAREER */}
              {activeTab === 'career' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                      Career Timeline ({formData.career.length})
                    </h4>

                    <button
                      onClick={handleAddCareerItem}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Milestone</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.career.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                            Milestone #{idx + 1}
                          </span>

                          <button
                            onClick={() => handleDeleteCareerItem(item.id)}
                            className="text-xs text-rose-600 hover:text-rose-700 p-1 rounded hover:bg-rose-50 flex items-center gap-1 font-semibold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Period (e.g. 2021 - Present)"
                            value={item.period}
                            onChange={e =>
                              handleUpdateCareerItem(
                                item.id,
                                'period',
                                e.target.value
                              )
                            }
                            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                          />

                          <input
                            type="text"
                            placeholder="Position Title"
                            value={item.position}
                            onChange={e =>
                              handleUpdateCareerItem(
                                item.id,
                                'position',
                                e.target.value
                              )
                            }
                            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-extrabold"
                          />

                          <input
                            type="text"
                            placeholder="Company Name"
                            value={item.company}
                            onChange={e =>
                              handleUpdateCareerItem(
                                item.id,
                                'company',
                                e.target.value
                              )
                            }
                            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                          />

                          <input
                            type="text"
                            placeholder="Business Type"
                            value={item.businessType}
                            onChange={e =>
                              handleUpdateCareerItem(
                                item.id,
                                'businessType',
                                e.target.value
                              )
                            }
                            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                          />
                        </div>

                        <textarea
                          rows={2}
                          placeholder="Description of position & achievements"
                          value={item.description}
                          onChange={e =>
                            handleUpdateCareerItem(
                              item.id,
                              'description',
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* GALLERY */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                      Manage Photos ({formData.gallery.length})
                    </h4>

                    <button
                      onClick={handleAddGalleryItem}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formData.gallery.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-600">
                            Photo #{idx + 1}
                          </span>

                          <button
                            onClick={() => handleDeleteGalleryItem(item.id)}
                            className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          {item.url && (
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-14 h-14 rounded-xl object-cover border shrink-0"
                            />
                          )}

                          <div className="flex-1 space-y-1">
                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[11px] font-bold cursor-pointer hover:bg-blue-700 transition-colors">
                              <Upload className="w-3 h-3" />
                              <span>Upload Photo File</span>

                              <input
                                type="file"
                                accept="image/*"
                                onChange={e =>
                                  handleUploadGalleryPhoto(item.id, e)
                                }
                                className="hidden"
                              />
                            </label>

                            <input
                              type="text"
                              placeholder="Image URL"
                              value={item.url}
                              onChange={e =>
                                handleUpdateGalleryItem(
                                  item.id,
                                  'url',
                                  e.target.value
                                )
                              }
                              className="w-full px-2.5 py-1 rounded-lg border border-slate-300 text-[11px] font-mono"
                            />
                          </div>
                        </div>

                        <input
                          type="text"
                          placeholder="Photo Title"
                          value={item.title}
                          onChange={e =>
                            handleUpdateGalleryItem(
                              item.id,
                              'title',
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold"
                        />

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Category"
                            value={item.category}
                            onChange={e =>
                              handleUpdateGalleryItem(
                                item.id,
                                'category',
                                e.target.value
                              )
                            }
                            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
                          />

                          <input
                            type="text"
                            placeholder="Short description"
                            value={item.description}
                            onChange={e =>
                              handleUpdateGalleryItem(
                                item.id,
                                'description',
                                e.target.value
                              )
                            }
                            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INCOME */}
              {activeTab === 'income' && (
                <div className="space-y-4 max-w-md">
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">
                        Display Annual Income Card
                      </span>
                      <span className="text-xs text-slate-500">
                        Toggle whether this card appears on your profile
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      checked={formData.annualIncome.show}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          annualIncome: {
                            ...formData.annualIncome,
                            show: e.target.checked,
                          },
                        })
                      }
                      className="w-5 h-5 accent-blue-600 rounded"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Annual Income Amount
                    </label>

                    <input
                      type="text"
                      value={formData.annualIncome.amount}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          annualIncome: {
                            ...formData.annualIncome,
                            amount: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-extrabold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Declaration Note
                    </label>

                    <input
                      type="text"
                      value={formData.annualIncome.note}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          annualIncome: {
                            ...formData.annualIncome,
                            note: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* CONTACT */}
              {activeTab === 'contact' && (
                <div className="space-y-4 max-w-md">

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      value={formData.contact.phone}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          contact: {
                            ...formData.contact,
                            phone: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={formData.contact.email}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          contact: {
                            ...formData.contact,
                            email: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Office Address
                    </label>

                    <textarea
                      rows={2}
                      value={formData.contact.address}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          contact: {
                            ...formData.contact,
                            address: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      WhatsApp Number
                    </label>

                    <input
                      type="text"
                      value={formData.contact.whatsapp}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          contact: {
                            ...formData.contact,
                            whatsapp: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                </div>
              )}

              {/* SOCIALS */}
              {activeTab === 'socials' && (
                <div className="space-y-4 max-w-md">
                  {[
                    { key: 'instagram', label: 'Instagram URL' },
                    { key: 'facebook', label: 'Facebook URL' },
                    { key: 'linkedin', label: 'LinkedIn URL' },
                    { key: 'x', label: 'X (Twitter) URL' },
                    { key: 'youtube', label: 'YouTube URL' },
                    { key: 'website', label: 'Personal Website URL' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                        {field.label}
                      </label>

                      <input
                        type="text"
                        value={(formData.socials as any)[field.key] || ''}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            socials: {
                              ...formData.socials,
                              [field.key]: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono"
                      />
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              {toastMessage ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>{toastMessage}</span>
                </span>
              ) : (
                <span className="text-xs text-slate-500 font-medium">
                  Edits save to database and publish live.
                </span>
              )}

              <div className="flex items-center gap-3">

                {activeTab !== 'overview' && (
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
                    <span>Back to Sections Overview</span>
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Exit Admin
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider shadow-color-blue transition-all"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>
                    {isSaving ? 'Saving...' : 'Save & Publish Live'}
                  </span>
                </button>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
