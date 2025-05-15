import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { colors, typography, spacing } from "../theme";

export function Footer() {
    return (
        <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
                اسالكم الدعاء لوالدي{" "}
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        padding: spacing.md,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    footerText: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
});
