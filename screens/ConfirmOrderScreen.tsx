import React, { useState, useLayoutEffect } from "react";
import { View, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { AudioPlayer } from "@/components/AudioPlayer";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { orderStore } from "@/utils/orderStore";
import { Order } from "@/types/order";

export default function ConfirmOrderScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { audioUri, transcribedText } = route.params as {
    audioUri: string;
    transcribedText: string;
  };

  const [orderText, setOrderText] = useState(transcribedText);
  const staffName = "Chef";

  const deduplicateMeals = (text: string): string => {
    const lines = text.split("\n").filter(line => line.trim());
    const uniqueLines = [...new Set(lines)];
    return uniqueLines.join("\n");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={handleCancel}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <ThemedText type="body">Cancel</ThemedText>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          onPress={handleConfirm}
          disabled={!orderText.trim()}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <ThemedText
            type="body"
            style={{
              color: orderText.trim() ? theme.primary : theme.textSecondary,
              fontWeight: "600",
            }}
          >
            Confirm
          </ThemedText>
        </Pressable>
      ),
    });
  }, [navigation, orderText, theme]);

  const handleCancel = () => {
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleConfirm = async () => {
    const newOrder: Order = {
      id: Date.now().toString(),
      audioUri,
      transcribedText: deduplicateMeals(orderText),
      timestamp: new Date().toISOString(),
      staffName: staffName,
      duration: "0:15",
    };

    try {
      await orderStore.add(newOrder);
      navigation.navigate("RecordTab");
    } catch (error) {
      Alert.alert("Error", "Failed to save order. Please try again.");
    }
  };

  return (
    <ScreenKeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <ThemedText type="caption" style={styles.sectionTitle}>
          AUDIO RECORDING
        </ThemedText>
        <AudioPlayer audioUri={audioUri} duration="0:15" />
      </View>

      <View style={styles.section}>
        <ThemedText type="caption" style={styles.sectionTitle}>
          ORDER DETAILS
        </ThemedText>
        <TextInput
          value={orderText}
          onChangeText={setOrderText}
          multiline
          autoFocus
          style={[
            styles.textInput,
            {
              backgroundColor: theme.backgroundDefault,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          placeholderTextColor={theme.textSecondary}
          placeholder="Enter order details..."
        />
      </View>

      <View style={styles.timestampContainer}>
        <ThemedText type="caption">
          {new Date().toLocaleString()}
        </ThemedText>
      </View>
    </ScreenKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    gap: Spacing["2xl"],
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    padding: Spacing.lg,
    fontSize: 17,
    minHeight: 150,
    textAlignVertical: "top",
  },
  timestampContainer: {
    alignItems: "center",
  },
});
