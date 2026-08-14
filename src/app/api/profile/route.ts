import { NextResponse } from 'next/server';
import { getStoredProfile, saveStoredProfile, ProfileData } from '@/lib/data';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const profile = await getStoredProfile();

    // Never expose the admin password publicly
    const { adminPasscode, ...publicProfile } = profile;

    return NextResponse.json(publicProfile, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Failed to fetch profile:', error);

    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { passcode, data } = body;

    const currentProfile = await getStoredProfile();

    const expectedPasscode =
      currentProfile.adminPasscode || 'admin123';

    if (passcode !== expectedPasscode) {
      return NextResponse.json(
        { error: 'Invalid admin passcode' },
        { status: 401 }
      );
    }

    const updatedData: ProfileData = {
      ...data,
      adminPasscode: expectedPasscode,
    };

    const success = await saveStoredProfile(updatedData);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save changes to database' },
        { status: 500 }
      );
    }

    const { adminPasscode: _, ...publicData } = updatedData;

    return NextResponse.json({
      success: true,
      data: publicData,
    });
  } catch (error) {
    console.error('Profile update failed:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * One-time migration:
 *
 * Reads data/profile.json and saves it into Supabase.
 *
 * IMPORTANT:
 * This is only for migrating your old local profile
 * into the Supabase database.
 */
export async function POST() {
  try {
    const filePath = path.join(
      process.cwd(),
      'data',
      'profile.json'
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          error: 'data/profile.json was not found',
        },
        { status: 404 }
      );
    }

    const fileContents = fs.readFileSync(
      filePath,
      'utf-8'
    );

    const profile = JSON.parse(
      fileContents
    ) as ProfileData;

    const success = await saveStoredProfile(profile);

    if (!success) {
      return NextResponse.json(
        {
          error: 'Failed to save profile to Supabase',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        'Old profile.json successfully migrated to Supabase.',
      name: profile.name,
      galleryCount: profile.gallery?.length || 0,
      videoCount: profile.videos?.length || 0,
    });
  } catch (error) {
    console.error(
      'Profile migration failed:',
      error
    );

    return NextResponse.json(
      {
        error: 'Failed to migrate profile.json',
      },
      { status: 500 }
    );
  }
}