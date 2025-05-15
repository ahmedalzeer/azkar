import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { colors, typography, spacing } from "../theme";

export function Footer() {
    return (
        <View style={styles.footer}>
            <ThemedText style={styles.footerName}>احمد علي الزير</ThemedText>
            <ThemedText style={styles.footerPrayer}>
                اسألكم الدعاء لوالدي
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    footerName: {
        ...typography.bodyLarge,
        color: colors.text,
        fontWeight: "500",
        marginBottom: spacing.sm,
    },
    footerPrayer: {
        ...typography.bodyMedium,
        color: colors.textSecondary,
        textAlign: "center",
    },
});
