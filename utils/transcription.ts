import * as FileSystem from 'expo-file-system';

export async function transcribeAudio(audioUri: string, apiKey: string): Promise<string> {
  try {
    if (!apiKey) {
      throw new Error('OpenAI API key is required for transcription');
    }

    const formData = new FormData();
    
    formData.append('file', {
      uri: audioUri,
      type: 'audio/m4a',
      name: 'recording.m4a',
    } as any);
    
    formData.append('model', 'whisper-1');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || 
        `Transcription failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw error;
  }
}

export function validateApiKey(apiKey: string): boolean {
  return apiKey.trim().length > 0 && apiKey.startsWith('sk-');
}
