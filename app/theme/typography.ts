import { Platform } from "react-native";

export const typography = {
    headerLarge: {
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: Platform.OS === "ios" ? "hafs" : "hafs",
        writingDirection: "rtl",
    },
    headerSmall: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: Platform.OS === "ios" ? "hafs" : "hafs",
        writingDirection: "rtl",
    },
    bodyLarge: {
        fontSize: 18,
        fontFamily: Platform.OS === "ios" ? "hafs" : "hafs",
        writingDirection: "rtl",
    },
    bodyMedium: {
        fontSize: 16,
        fontFamily: Platform.OS === "ios" ? "hafs" : "hafs",
        writingDirection: "rtl",
    },
    bodySmall: {
        fontSize: 14,
        fontFamily: Platform.OS === "ios" ? "hafs" : "hafs",
        writingDirection: "rtl",
    },
};
