import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface OrderCardProps {
  orderText: string;
  timestamp: string;
  staffName: string;
  tableNumber?: number | null;
  guestCount?: number | null;
  status?: 'open' | 'closed';
  onPress: () => void;
}

export function OrderCard({
  orderText,
  timestamp,
  staffName,
  tableNumber,
  guestCount,
  status = 'open',
  onPress,
}: OrderCardProps) {
  const { theme } = useTheme();
  const isOpen = status === 'open';

  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
      <Card>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.headerRow}>
              <View style={styles.tableInfo}>
                {tableNumber ? (
                  <View style={styles.tableInfoItem}>
                    <Feather name="grid" size={14} color={theme.primary} />
                    <ThemedText style={styles.tableText}>Table {tableNumber}</ThemedText>
                  </View>
                ) : null}
                {guestCount ? (
                  <View style={styles.tableInfoItem}>
                    <Feather name="users" size={14} color={theme.primary} />
                    <ThemedText style={styles.tableText}>{guestCount}</ThemedText>
                  </View>
                ) : null}
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: isOpen ? '#16A34A' : '#DC2626' }
              ]}>
                <ThemedText style={styles.statusText}>
                  {isOpen ? 'Open' : 'Closed'}
                </ThemedText>
              </View>
            </View>
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  tableInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  tableText: {
    fontSize: 14,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  statusText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 11,
  },
  orderText: {
    fontSize: 17,
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
  },
});
