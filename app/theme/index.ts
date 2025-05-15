import { TextStyle } from "react-native";

export const colors = {
    primary: "#2E7D32", // Islamic green
    primaryLight: "#4CAF50",
    primaryDark: "#1B5E20",
    secondary: "#FFC107", // Warm accent color
    background: "#F5F6F7",
    surface: "#FFFFFF",
    text: "#1A1A1A",
    textSecondary: "#666666",
    border: "#E0E0E0",
    success: "#43A047",
    error: "#D32F2F",
};

export const typography: { [key: string]: TextStyle } = {
    headerLarge: {
        fontSize: 32,
        fontWeight: "700",
        lineHeight: 40,
    },
    headerMedium: {
        fontSize: 24,
        fontWeight: "600",
        lineHeight: 32,
    },
    headerSmall: {
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 28,
    },
    bodyLarge: {
        fontSize: 18,
        lineHeight: 28,
    },
    bodyMedium: {
        fontSize: 16,
        lineHeight: 24,
    },
    bodySmall: {
        fontSize: 14,
        lineHeight: 20,
    },
    arabic: {
        fontSize: 26,
        lineHeight: 46,
        textAlign: "center" as const,
    },
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
};

export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    round: 9999,
};

export const shadows = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
};
