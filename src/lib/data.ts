import { createClient } from '@supabase/supabase-js';
import { ProfileData, defaultProfileData } from './types';

export * from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getStoredProfile(): Promise<ProfileData> {
  try {
    const { data, error } = await supabase
      .from('profile')
      .select('data')
      .eq('id', 1)
      .maybeSingle();

    console.log('SUPABASE PROFILE DATA:', data);
    console.log('SUPABASE PROFILE ERROR:', error);

    if (error) {
      console.error('Supabase profile read error:', error);
      return defaultProfileData;
    }

    if (!data || !data.data) {
      console.log('No profile data found. Using default profile.');
      return defaultProfileData;
    }

    return {
      ...defaultProfileData,
      ...(data.data as Partial<ProfileData>),
    };
  } catch (error) {
    console.error('Error reading profile from Supabase:', error);
    return defaultProfileData;
  }
}

export async function saveStoredProfile(
  profile: ProfileData
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profile')
      .upsert(
        {
          id: 1,
          data: profile,
        },
        {
          onConflict: 'id',
        }
      );

    if (error) {
      console.error('Supabase profile save error:', error);
      return false;
    }

    console.log('Profile saved successfully to Supabase.');
    return true;
  } catch (error) {
    console.error('Error saving profile to Supabase:', error);
    return false;
  }
}