import { NextRequest, NextResponse } from 'next/server';
import { SpeechServiceFactory } from '@/services/speech/SpeechServiceFactory';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audio = formData.get('audio') as Blob | null;

    if (!audio) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    const service = SpeechServiceFactory.create();
    const result = await service.recognize(audio, { language: 'en' });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Speech recognition failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
