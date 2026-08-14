import { NextResponse } from 'next/server';
import { getStoredProfile } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const { passcode } = await request.json();

    if (!passcode || typeof passcode !== 'string') {
      return NextResponse.json(
        {
          authenticated: false,
          error: 'Passcode is required',
        },
        { status: 400 }
      );
    }

    const profile = await getStoredProfile();

    const expectedPasscode = profile.adminPasscode || 'admin123';

    if (passcode === expectedPasscode) {
      return NextResponse.json({
        authenticated: true,
      });
    }

    return NextResponse.json(
      {
        authenticated: false,
        error: 'Incorrect passcode',
      },
      { status: 401 }
    );
  } catch (error) {
    console.error('Auth check failed:', error);

    return NextResponse.json(
      {
        authenticated: false,
        error: 'Auth check failed',
      },
      { status: 500 }
    );
  }
}