import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface AudioPlayerProps {
  audioUri: string;
  duration?: string;
}

export function AudioPlayer({ audioUri, duration = "0:00" }: AudioPlayerProps) {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Card>
      <View style={styles.container}>
        <Pressable
          onPress={togglePlayback}
          style={({ pressed }) => [
            styles.playButton,
            {
              backgroundColor: theme.primary,
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <Feather
            name={isPlaying ? "pause" : "play"}
            size={20}
            color={theme.buttonText}
          />
        </Pressable>
        <View style={styles.waveformContainer}>
          <View style={styles.waveform}>
            {[...Array(20)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.bar,
                  {
                    height: Math.random() * 20 + 10,
                    backgroundColor: theme.primary,
                  },
                ]}
              />
            ))}
          </View>
        </View>
        <ThemedText style={styles.duration} type="caption">
          {duration}
        </ThemedText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  waveformContainer: {
    flex: 1,
  },
  waveform: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    height: 30,
  },
  bar: {
    flex: 1,
    borderRadius: 2,
  },
  duration: {
    minWidth: 40,
    textAlign: "right",
  },
});
