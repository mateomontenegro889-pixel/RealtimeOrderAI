import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Alert, TextInput, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { getApiKey, saveApiKey, deleteApiKey } from "@/utils/apiKeyStorage";
import { validateApiKey } from "@/utils/transcription";

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
  const { theme, isDark } = useTheme();
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    const apiKey = await getApiKey();
    setHasApiKey(!!apiKey);
  };

  const handleSaveApiKey = async () => {
    if (!validateApiKey(apiKeyInput)) {
      Alert.alert(
        "Invalid API Key",
        "Please enter a valid OpenAI API key (starts with 'sk-')."
      );
      return;
    }

    try {
      await saveApiKey(apiKeyInput);
      setHasApiKey(true);
      setShowApiKeyModal(false);
      setApiKeyInput("");
      Alert.alert("Success", "API key saved successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save API key. Please try again.");
    }
  };

  const handleRemoveApiKey = () => {
    Alert.alert(
      "Remove API Key",
      "Are you sure you want to remove your OpenAI API key?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteApiKey();
              setHasApiKey(false);
              Alert.alert("Removed", "API key removed successfully.");
            } catch (error) {
              Alert.alert("Error", "Failed to remove API key.");
            }
          },
        },
      ]
    );
  };

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
          API CONFIGURATION
        </ThemedText>
        <Card>
          <SettingsItem
            icon="key"
            label="OpenAI API Key"
            value={hasApiKey ? "Configured" : "Not Set"}
            onPress={() => setShowApiKeyModal(true)}
          />
          {hasApiKey ? (
            <>
              <View style={styles.separator} />
              <SettingsItem
                icon="trash-2"
                label="Remove API Key"
                onPress={handleRemoveApiKey}
                showChevron={false}
              />
            </>
          ) : null}
        </Card>
        <ThemedText type="caption" style={styles.helperText}>
          Your API key is stored securely on this device and used only for audio transcription.
        </ThemedText>
      </View>

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

      <Modal
        visible={showApiKeyModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowApiKeyModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowApiKeyModal(false)}
        >
          <Pressable
            style={[
              styles.modalContent,
              { backgroundColor: theme.backgroundSecondary },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <ThemedText type="title">OpenAI API Key</ThemedText>
              <Pressable
                onPress={() => setShowApiKeyModal(false)}
                style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
              >
                <Feather name="x" size={24} color={theme.text} />
              </Pressable>
            </View>

            <ThemedText type="caption" style={styles.modalDescription}>
              Enter your OpenAI API key to enable audio transcription. Get your API key from platform.openai.com/api-keys
            </ThemedText>

            <TextInput
              style={[
                styles.apiKeyInput,
                {
                  backgroundColor: theme.backgroundDefault,
                  color: theme.text,
                  borderColor: theme.textSecondary,
                },
              ]}
              value={apiKeyInput}
              onChangeText={setApiKeyInput}
              placeholder="sk-..."
              placeholderTextColor={theme.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />

            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowApiKeyModal(false);
                  setApiKeyInput("");
                }}
              >
                <ThemedText>Cancel</ThemedText>
              </Pressable>
              <Pressable
                style={[
                  styles.modalButton,
                  styles.saveButton,
                  { backgroundColor: theme.primary },
                ]}
                onPress={handleSaveApiKey}
              >
                <ThemedText style={{ color: theme.buttonText }}>
                  Save
                </ThemedText>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
  helperText: {
    marginTop: Spacing.sm,
    opacity: 0.6,
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalDescription: {
    lineHeight: 20,
    opacity: 0.7,
  },
  apiKeyInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  saveButton: {},
});
