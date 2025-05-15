import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Animated } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { colors, typography, spacing, borderRadius, shadows } from "../theme";

type SingleDhikrProps = {
    content: string;
    description: string;
    count: string;
    isLast: boolean;
    onComplete: () => void;
};

export function SingleDhikr({
    content,
    description,
    count,
    isLast,
    onComplete,
}: SingleDhikrProps) {
    const [counter, setCounter] = useState(0);
    const targetCount = parseInt(count) || 1;
    const progress = (counter / targetCount) * 100;

    const handlePress = () => {
        const newCount = counter + 1;
        setCounter(newCount);

        if (newCount >= targetCount) {
            onComplete();
            setCounter(0);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.card}>
                <ThemedText style={styles.arabicText}>{content}</ThemedText>

                {description && (
                    <ThemedText style={styles.description}>
                        {description}
                    </ThemedText>
                )}
            </View>

            <View style={styles.counterContainer}>
                <TouchableOpacity
                    style={[
                        styles.counterButton,
                        {
                            backgroundColor:
                                counter === 0 ? colors.primary : colors.success,
                        },
                    ]}
                    onPress={handlePress}
                >
                    <View style={styles.counterInner}>
                        <ThemedText style={styles.counterText}>
                            {counter} / {targetCount}
                        </ThemedText>
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    { width: `${progress}%` },
                                ]}
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                <ThemedText style={styles.hint}>
                    {counter === targetCount - 1
                        ? "One more time!"
                        : counter === 0
                        ? "Tap to start"
                        : `${targetCount - counter} remaining`}
                </ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.md,
        justifyContent: "space-between",
        backgroundColor: colors.background,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
        ...shadows.medium,
    },
    arabicText: {
        ...typography.arabic,
        color: colors.text,
        marginBottom: spacing.lg,
    },
    description: {
        ...typography.bodyMedium,
        color: colors.textSecondary,
        textAlign: "center",
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    counterContainer: {
        alignItems: "center",
        marginTop: spacing.xl,
    },
    counterButton: {
        width: 160,
        height: 160,
        borderRadius: borderRadius.round,
        justifyContent: "center",
        alignItems: "center",
        ...shadows.small,
    },
    counterInner: {
        alignItems: "center",
    },
    counterText: {
        ...typography.headerMedium,
        color: colors.surface,
        marginBottom: spacing.xs,
    },
    progressBar: {
        width: 80,
        height: 4,
        backgroundColor: "rgba(255,255,255,0.3)",
        borderRadius: borderRadius.round,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: colors.surface,
        borderRadius: borderRadius.round,
    },
    hint: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        marginTop: spacing.md,
    },
});
