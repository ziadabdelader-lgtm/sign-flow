// TODO: Insert ElevenLabs API key in .env.local — ELEVENLABS_API_KEY
export const elevenlabsConfig = {
  apiKey: process.env.ELEVENLABS_API_KEY || '',
  baseUrl: 'https://api.elevenlabs.io/v1',
  defaultVoiceId: process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM',
};
