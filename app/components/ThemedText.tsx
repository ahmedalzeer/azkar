import React from "react";
import { Text, TextStyle, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";

interface ThemedTextProps {
    children: React.ReactNode;
    style?: TextStyle;
}

export const ThemedText: React.FC<ThemedTextProps> = ({ children, style }) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <Text
            style={[
                styles.text,
                { color: isDark ? "#FFFFFF" : "#000000" },
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
});
