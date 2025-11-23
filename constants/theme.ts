import { Platform } from "react-native";

const tintColorLight = "#2563EB";
const tintColorDark = "#3B82F6";

export const Colors = {
  light: {
    text: "#111827",
    textSecondary: "#6B7280",
    buttonText: "#FFFFFF",
    tabIconDefault: "#6B7280",
    tabIconSelected: tintColorLight,
    link: "#2563EB",
    primary: "#2563EB",
    success: "#10B981",
    recording: "#EF4444",
    border: "#E5E7EB",
    backgroundRoot: "#FFFFFF", // Elevation 0
    backgroundDefault: "#F9FAFB", // Elevation 1
    backgroundSecondary: "#F3F4F6", // Elevation 2
    backgroundTertiary: "#E5E7EB", // Elevation 3
  },
  dark: {
    text: "#F9FAFB",
    textSecondary: "#9CA3AF",
    buttonText: "#FFFFFF",
    tabIconDefault: "#9CA3AF",
    tabIconSelected: tintColorDark,
    link: "#3B82F6",
    primary: "#3B82F6",
    success: "#10B981",
    recording: "#EF4444",
    border: "#374151",
    backgroundRoot: "#111827", // Elevation 0
    backgroundDefault: "#1F2937", // Elevation 1
    backgroundSecondary: "#374151", // Elevation 2
    backgroundTertiary: "#4B5563", // Elevation 3
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  header: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  title: {
    fontSize: 20,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 17,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 13,
    fontWeight: "400" as const,
  },
  link: {
    fontSize: 17,
    fontWeight: "400" as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
