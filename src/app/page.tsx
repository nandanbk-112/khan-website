'use client';

import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import VideoSection from '@/components/VideoSection';
import Career from '@/components/Career';
import IncomeCard from '@/components/IncomeCard';
import Contact from '@/components/Contact';
import Socials from '@/components/Socials';
import Footer from '@/components/Footer';
import AdminModal from '@/components/AdminModal';

import { ProfileData } from '@/lib/types';

export default function HomePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch('/api/profile', {
          method: 'GET',
          cache: 'no-store',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch profile: ${response.status}`
          );
        }

        const data: ProfileData = await response.json();

        if (!data || !data.name) {
          throw new Error('Invalid profile data received');
        }

        if (isMounted) {
          setProfile(data);
        }
      } catch (err) {
        console.error(
          'Failed to load profile from API:',
          err
        );

        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleProfileUpdate = (
    updatedData: ProfileData
  ) => {
    setProfile(updatedData);
  };

  /*
   * IMPORTANT:
   * Do not render the website until the real profile
   * has been loaded from Supabase.
   *
   * This prevents the old default "Tariq Khan" data
   * from appearing for a few seconds.
   */
  if (loading || !profile) {
    return (
      <main className="min-h-screen bg-white text-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center px-6">

          <div
            className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin mb-5"
            aria-label="Loading"
          />

          <h1 className="text-lg font-semibold text-slate-900">
            Loading Tiger Khan Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please wait...
          </p>

        </div>
      </main>
    );
  }

  /*
   * If the API failed, don't show default Tariq Khan data.
   */
  if (error) {
    return (
      <main className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-6">
        <div className="max-w-md text-center">

          <h1 className="text-xl font-semibold text-slate-900">
            Unable to load profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please refresh the page and try again.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 transition"
          >
            Refresh
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* Header */}
      <Header
        name={profile.name}
        profession={profile.profession}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Hero */}
      <Hero
        name={profile.name}
        profession={profile.profession}
        tagline={profile.tagline}
        profilePhoto={profile.profilePhoto}
        stats={profile.stats || []}
      />

      {/* About */}
      <About
        badge={profile.about?.badge || ''}
        sectionTitle={
          profile.about?.sectionTitle ||
          'About Tiger Khan'
        }
        bio={profile.about?.bio || ''}
        profession={profile.about?.profession || ''}
        company={profile.about?.company || ''}
        industry={profile.about?.industry || ''}
        experience={profile.about?.experience || ''}
        location={profile.about?.location || ''}
      />

      {/* Gallery */}
      <Gallery
        items={profile.gallery || []}
      />

      {/* Videos */}
      <VideoSection
        videos={profile.videos || []}
      />

      {/* Career */}
      <Career
        career={profile.career || []}
      />

      {/* Annual Income */}
      <IncomeCard
        annualIncome={profile.annualIncome}
      />

      {/* Contact */}
      <Contact
        phone={profile.contact?.phone || ''}
        email={profile.contact?.email || ''}
        address={profile.contact?.address || ''}
        whatsapp={profile.contact?.whatsapp || ''}
      />

      {/* Social Media */}
      <Socials
        socials={profile.socials || {}}
      />

      {/* Footer */}
      <Footer
        name={profile.name}
        profession={profile.profession}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Admin Panel */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentData={profile}
        onUpdate={handleProfileUpdate}
      />

    </main>
  );
}