import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

interface OrderCardProps {
  orderText: string;
  timestamp: string;
  staffName: string;
  onPress: () => void;
}

export function OrderCard({
  orderText,
  timestamp,
  staffName,
  onPress,
}: OrderCardProps) {
  const { theme } = useTheme();

  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
      <Card>
        <View style={styles.container}>
          <View style={styles.content}>
            <ThemedText numberOfLines={2} style={styles.orderText}>
              {orderText}
            </ThemedText>
            <View style={styles.metadata}>
              <ThemedText type="caption">{timestamp}</ThemedText>
              <ThemedText type="caption"> • </ThemedText>
              <ThemedText type="caption">{staffName}</ThemedText>
            </View>
          </View>
          <Feather name="chevron-right" size={20} color={theme.textSecondary} />
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  content: {
    flex: 1,
    gap: Spacing.sm,
  },
  orderText: {
    fontSize: 17,
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
  },
});
