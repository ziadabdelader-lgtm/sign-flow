import { NextRequest, NextResponse } from 'next/server';
import { SignRecognitionServiceFactory } from '@/services/recognition/SignRecognitionServiceFactory';

export async function POST(req: NextRequest) {
  try {
    const videoBlob = await req.blob();

    if (!videoBlob || videoBlob.size === 0) {
      return NextResponse.json(
        { error: 'No video provided' },
        { status: 400 }
      );
    }

    const service = SignRecognitionServiceFactory.create();
    const result = await service.recognize(videoBlob);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sign recognition failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
