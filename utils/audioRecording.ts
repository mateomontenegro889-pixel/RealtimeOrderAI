import { Audio } from 'expo-av';

let recording: Audio.Recording | null = null;

export async function requestAudioPermissions(): Promise<boolean> {
  try {
    const { status } = await Audio.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting audio permissions:', error);
    return false;
  }
}

export async function startRecording(): Promise<void> {
  try {
    const hasPermission = await requestAudioPermissions();
    if (!hasPermission) {
      throw new Error('Audio recording permission not granted');
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording: newRecording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    
    recording = newRecording;
  } catch (error) {
    console.error('Failed to start recording:', error);
    throw error;
  }
}

export async function stopRecording(): Promise<string | null> {
  try {
    if (!recording) {
      throw new Error('No active recording');
    }

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    recording = null;
    
    return uri;
  } catch (error) {
    console.error('Failed to stop recording:', error);
    recording = null;
    throw error;
  }
}

export function isRecording(): boolean {
  return recording !== null;
}
