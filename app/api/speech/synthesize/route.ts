import { NextRequest, NextResponse } from 'next/server';
import { TTSServiceFactory } from '@/services/speech/TTSServiceFactory';

export async function POST(req: NextRequest) {
  try {
    const { text, voiceId } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const service = TTSServiceFactory.create();
    const result = await service.synthesize(text, {
      language: 'en',
      voiceId,
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Speech synthesis failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
