// TODO: Insert OpenAI API key in .env.local — OPENAI_API_KEY
export const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY || '',
  baseUrl: 'https://api.openai.com/v1',
  defaultModel: 'gpt-4o-mini',
  whisperModel: 'whisper-1',
  ttsModel: 'tts-1',
};
