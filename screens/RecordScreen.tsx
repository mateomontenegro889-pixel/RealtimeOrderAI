import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { RecordButton } from "@/components/RecordButton";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { Spacing } from "@/constants/theme";
import { mockTranscribe } from "@/utils/mockTranscription";

export default function RecordScreen() {
  const { paddingTop, paddingBottom } = useScreenInsets();
  const navigation = useNavigation<any>();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRecordPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);

      try {
        const transcribedText = await mockTranscribe(recordingTime);
        const mockAudioUri = `recording_${Date.now()}.m4a`;

        setIsProcessing(false);
        setRecordingTime(0);

        navigation.navigate("ConfirmOrder", {
          audioUri: mockAudioUri,
          transcribedText,
        });
      } catch (error) {
        setIsProcessing(false);
        setRecordingTime(0);
        Alert.alert("Error", "Failed to transcribe audio. Please try again.");
      }
    } else {
      setIsRecording(true);
      setRecordingTime(0);
    }
  };

  const getStatusText = (): string => {
    if (isProcessing) return "Processing...";
    if (isRecording) return "Recording...";
    return "Tap to start recording";
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop,
          paddingBottom,
        },
      ]}
    >
      <View style={styles.content}>
        {isRecording ? (
          <ThemedText type="title" style={styles.timer}>
            {formatTime(recordingTime)}
          </ThemedText>
        ) : null}

        <RecordButton
          isRecording={isRecording}
          onPress={handleRecordPress}
        />

        <View style={styles.waveformContainer}>
          {isRecording ? (
            <View style={styles.waveform}>
              {[...Array(15)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.waveBar,
                    {
                      height: Math.random() * 40 + 10,
                    },
                  ]}
                />
              ))}
            </View>
          ) : null}
        </View>

        <ThemedText type="caption" style={styles.statusText}>
          {getStatusText()}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    gap: Spacing["2xl"],
  },
  timer: {
    fontSize: 32,
    fontWeight: "700",
  },
  waveformContainer: {
    height: 60,
    justifyContent: "center",
  },
  waveform: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 50,
  },
  waveBar: {
    width: 4,
    backgroundColor: "#2563EB",
    borderRadius: 2,
  },
  statusText: {
    textAlign: "center",
  },
});
