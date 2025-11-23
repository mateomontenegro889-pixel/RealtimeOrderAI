import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Pressable, Share } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Card } from "@/components/Card";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { orderStore } from "@/utils/orderStore";

export default function OrderDetailScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { orderId } = route.params as { orderId: string };
  const [order, setOrder] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchOrder = async () => {
      const fetchedOrder = await orderStore.getById(orderId);
      setOrder(fetchedOrder);
      setLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={handleShare}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <Feather name="share" size={20} color={theme.text} />
        </Pressable>
      ),
    });
  }, [navigation, theme]);

  const handleShare = async () => {
    if (!order) return;

    try {
      await Share.share({
        message: `Order from ${order.staffName}\n\n${order.transcribedText}\n\nRecorded: ${new Date(
          order.timestamp
        ).toLocaleString()}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (loading) {
    return (
      <ScreenScrollView contentContainerStyle={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ScreenScrollView>
    );
  }

  if (!order) {
    return (
      <ScreenScrollView contentContainerStyle={styles.container}>
        <ThemedText>Order not found</ThemedText>
      </ScreenScrollView>
    );
  }

  return (
    <ScreenScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <ThemedText type="caption" style={styles.sectionTitle}>
          AUDIO RECORDING
        </ThemedText>
        <AudioPlayer audioUri={order.audioUri} duration={order.duration} />
      </View>

      <View style={styles.section}>
        <ThemedText type="caption" style={styles.sectionTitle}>
          ORDER DETAILS
        </ThemedText>
        <Card>
          <ThemedText style={styles.orderText}>
            {order.transcribedText}
          </ThemedText>
        </Card>
      </View>

      <View style={styles.section}>
        <ThemedText type="caption" style={styles.sectionTitle}>
          METADATA
        </ThemedText>
        <Card>
          <View style={styles.metadataRow}>
            <ThemedText type="caption">Recorded</ThemedText>
            <ThemedText>
              {new Date(order.timestamp).toLocaleString()}
            </ThemedText>
          </View>
          <View style={styles.metadataRow}>
            <ThemedText type="caption">Staff Member</ThemedText>
            <ThemedText>{order.staffName}</ThemedText>
          </View>
          <View style={styles.metadataRow}>
            <ThemedText type="caption">Duration</ThemedText>
            <ThemedText>{order.duration}</ThemedText>
          </View>
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
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  orderText: {
    fontSize: 17,
    lineHeight: 24,
  },
  metadataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
});
