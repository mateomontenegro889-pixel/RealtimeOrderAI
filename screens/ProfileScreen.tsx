import React from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface SettingsItemProps {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
}

function SettingsItem({
  icon,
  label,
  value,
  onPress,
  showChevron = true,
}: SettingsItemProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
    >
      <View style={styles.settingsItem}>
        <View style={styles.settingsItemLeft}>
          <Feather name={icon as any} size={20} color={theme.text} />
          <ThemedText>{label}</ThemedText>
        </View>
        <View style={styles.settingsItemRight}>
          {value ? (
            <ThemedText type="caption">{value}</ThemedText>
          ) : null}
          {showChevron && onPress ? (
            <Feather name="chevron-right" size={20} color={theme.textSecondary} />
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const { theme } = useTheme();

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          Alert.alert("Logged Out", "You have been logged out successfully.");
        },
      },
    ]);
  };

  return (
    <ScreenScrollView contentContainerStyle={styles.container}>
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: theme.primary },
            ]}
          >
            <ThemedText
              style={[styles.avatarText, { color: theme.buttonText }]}
            >
              JS
            </ThemedText>
          </View>
          <View style={styles.profileInfo}>
            <ThemedText type="title">John Smith</ThemedText>
            <ThemedText type="caption">Staff Member</ThemedText>
          </View>
        </View>
      </Card>

      <View style={styles.section}>
        <ThemedText type="caption" style={styles.sectionTitle}>
          SETTINGS
        </ThemedText>
        <Card>
          <SettingsItem
            icon="volume-2"
            label="Audio Quality"
            value="High"
            onPress={() => Alert.alert("Audio Quality", "Feature coming soon")}
          />
          <View style={styles.separator} />
          <SettingsItem
            icon="globe"
            label="Language"
            value="English"
            onPress={() => Alert.alert("Language", "Feature coming soon")}
          />
          <View style={styles.separator} />
          <SettingsItem
            icon="bell"
            label="Notifications"
            onPress={() => Alert.alert("Notifications", "Feature coming soon")}
          />
        </Card>
      </View>

      <View style={styles.section}>
        <ThemedText type="caption" style={styles.sectionTitle}>
          ACCOUNT
        </ThemedText>
        <Card>
          <SettingsItem
            icon="user"
            label="Account Settings"
            onPress={() => Alert.alert("Account", "Feature coming soon")}
          />
          <View style={styles.separator} />
          <SettingsItem
            icon="log-out"
            label="Log Out"
            onPress={handleLogout}
            showChevron={false}
          />
        </Card>
      </View>

      <View style={styles.section}>
        <ThemedText type="caption" style={styles.sectionTitle}>
          ABOUT
        </ThemedText>
        <Card>
          <SettingsItem
            icon="shield"
            label="Privacy Policy"
            onPress={() => Alert.alert("Privacy Policy", "Feature coming soon")}
          />
          <View style={styles.separator} />
          <SettingsItem
            icon="file-text"
            label="Terms of Service"
            onPress={() =>
              Alert.alert("Terms of Service", "Feature coming soon")
            }
          />
          <View style={styles.separator} />
          <SettingsItem
            icon="info"
            label="App Version"
            value="1.0.0"
            showChevron={false}
          />
        </Card>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    gap: Spacing["2xl"],
  },
  profileCard: {
    padding: Spacing.xl,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
  },
  profileInfo: {
    gap: Spacing.xs,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  settingsItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    opacity: 0.3,
  },
});
