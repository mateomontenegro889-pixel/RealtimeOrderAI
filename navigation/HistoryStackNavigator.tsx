import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistoryListScreen from "@/screens/HistoryListScreen";
import OrderDetailScreen from "@/screens/OrderDetailScreen";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type HistoryStackParamList = {
  HistoryList: undefined;
  OrderDetail: { orderId: string };
};

const Stack = createNativeStackNavigator<HistoryStackParamList>();

export default function HistoryStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="HistoryList"
        component={HistoryListScreen}
        options={{
          headerTitle: "Order History",
          headerTransparent: false,
        }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{
          headerTitle: "Order Details",
          headerTransparent: false,
        }}
      />
    </Stack.Navigator>
  );
}
