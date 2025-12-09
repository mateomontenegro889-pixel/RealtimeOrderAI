import { Platform } from "react-native";

const tintColorLight = "#C84630";
const tintColorDark = "#E8704A";

export const Colors = {
  light: {
    text: "#2D1810",
    textSecondary: "#755940",
    buttonText: "#FFFFFF",
    tabIconDefault: "#755940",
    tabIconSelected: tintColorLight,
    link: "#C84630",
    primary: "#C84630",
    success: "#10B981",
    recording: "#EF4444",
    border: "#D4A574",
    backgroundRoot: "#FEFAF3", // Elevation 0
    backgroundDefault: "#FAF4ED", // Elevation 1
    backgroundSecondary: "#F5EDE3", // Elevation 2
    backgroundTertiary: "#E8DFD3", // Elevation 3
  },
  dark: {
    text: "#FEFAF3",
    textSecondary: "#D4A574",
    buttonText: "#FFFFFF",
    tabIconDefault: "#D4A574",
    tabIconSelected: tintColorDark,
    link: "#E8704A",
    primary: "#E8704A",
    success: "#10B981",
    recording: "#EF4444",
    border: "#755940",
    backgroundRoot: "#2D1810", // Elevation 0
    backgroundDefault: "#3D2817", // Elevation 1
    backgroundSecondary: "#4D3820", // Elevation 2
    backgroundTertiary: "#5D4829", // Elevation 3
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
