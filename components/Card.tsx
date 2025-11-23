import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface CardProps {
  elevation?: number;
  children: ReactNode;
  style?: ViewStyle;
}

const getBackgroundColorForElevation = (
  elevation: number,
  theme: any,
): string => {
  switch (elevation) {
    case 1:
      return theme.backgroundDefault;
    case 2:
      return theme.backgroundSecondary;
    case 3:
      return theme.backgroundTertiary;
    default:
      return theme.backgroundDefault;
  }
};

export function Card({ elevation = 1, children, style }: CardProps) {
  const { theme } = useTheme();
  const cardBackgroundColor = getBackgroundColorForElevation(elevation, theme);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: cardBackgroundColor,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
});
