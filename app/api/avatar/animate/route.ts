import { NextRequest, NextResponse } from 'next/server';
import { AvatarServiceFactory } from '@/services/avatar/AvatarServiceFactory';

export async function POST(req: NextRequest) {
  try {
    const { text, config } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const service = AvatarServiceFactory.create();
    const signData = await service.animateAvatar(text, config);

    return NextResponse.json(signData);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Avatar animation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
