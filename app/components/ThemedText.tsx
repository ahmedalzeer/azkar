import React from "react";
import { Text, TextStyle, StyleSheet, I18nManager } from "react-native";
import { useColorScheme } from "react-native";

interface ThemedTextProps {
    children: React.ReactNode;
    style?: TextStyle;
    isArabic?: boolean;
}

export const ThemedText: React.FC<ThemedTextProps> = ({
    children,
    style,
    isArabic = false,
}) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <Text
            style={[
                styles.text,
                { color: isDark ? "#FFFFFF" : "#000000" },
                isArabic && styles.arabicText,
                style,
            ]}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    },
    arabicText: {
        writingDirection: "rtl",
        textAlign: "right",
        fontFamily: "hafs",
    },
});
