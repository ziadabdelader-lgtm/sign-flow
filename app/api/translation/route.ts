import { NextRequest, NextResponse } from 'next/server';
import { TranslationServiceFactory } from '@/services/translation/TranslationServiceFactory';

export async function POST(req: NextRequest) {
  try {
    const { text, sourceLanguage, targetLanguage } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const service = TranslationServiceFactory.create();
    const result = await service.translate(text, {
      sourceLanguage: sourceLanguage || 'en',
      targetLanguage: targetLanguage || 'en',
      provider: service.providerName,
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Translation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
