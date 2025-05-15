import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";

interface ThemedViewProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export const ThemedView: React.FC<ThemedViewProps> = ({ children, style }) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                },
                style,
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
    },
});
