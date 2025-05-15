import { useLocalSearchParams, router } from "expo-router";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ViewStyle, TextStyle } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { SingleDhikr } from "../components/SingleDhikr";
import { colors, typography, spacing, borderRadius, shadows } from "../theme";
import { Ionicons } from "@expo/vector-icons";

// Import the JSON file
const azkarData = require("../../assets/azkar.json");

// English translations for categories
const categoryTranslations: { [key: string]: string } = {
    "أذكار الصباح": "Morning azkar",
    "أذكار المساء": "Evening azkar",
    "أذكار بعد الصلاة": "After Prayer azkar",
    "أذكار النوم": "Before Sleep azkar",
    "أذكار الاستيقاظ": "Upon Waking azkar",
};

type DhikrItem = {
    category: string;
    count: string;
    description: string;
    reference: string;
    content: string;
};

type azkarData = {
    [key: string]: (DhikrItem | DhikrItem[])[];
};

type Styles = {
    container: ViewStyle;
    emptyText: TextStyle;
    progressContainer: ViewStyle;
    progressBar: ViewStyle;
    progressFill: ViewStyle;
    progressText: TextStyle;
};

export default function DhikrCategory() {
    const { category } = useLocalSearchParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [processedData, setProcessedData] = useState<DhikrItem[]>([]);

    // Get the matching category from the JSON file
    const categoryKey = Object.keys(azkarData).find(
        (key) =>
            key === category || // Exact match
            key
                .toLowerCase()
                .includes((category as string)?.toLowerCase() ?? "") // Partial match
    );

    useEffect(() => {
        if (categoryKey) {
            const categoryData = azkarData[categoryKey];
            // Flatten and process the data
            const data: DhikrItem[] = categoryData.reduce(
                (acc: DhikrItem[], item: DhikrItem | DhikrItem[]) => {
                    if (Array.isArray(item)) {
                        return [
                            ...acc,
                            ...item.filter(
                                (subItem) => subItem.category !== "stop"
                            ),
                        ];
                    }
                    if (item.category !== "stop") {
                        return [...acc, item];
                    }
                    return acc;
                },
                []
            );
            setProcessedData(data);
        }
    }, [categoryKey]);

    if (!categoryKey || processedData.length === 0) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText style={styles.emptyText}>No azkar found</ThemedText>
            </ThemedView>
        );
    }

    const currentDhikr = processedData[currentIndex];
    const isLastDhikr = currentIndex === processedData.length - 1;

    const handleComplete = () => {
        if (isLastDhikr) {
            router.back();
        } else {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            {
                                width: `${
                                    ((currentIndex + 1) /
                                        processedData.length) *
                                    100
                                }%`,
                            },
                        ]}
                    />
                </View>
                <ThemedText style={styles.progressText}>
                    {currentIndex + 1} / {processedData.length}
                </ThemedText>
            </View>

            <SingleDhikr
                content={currentDhikr.content}
                description={currentDhikr.description}
                count={currentDhikr.count}
                isLast={isLastDhikr}
                onComplete={handleComplete}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    emptyText: {
        ...typography.bodyLarge,
        textAlign: "center",
        marginTop: spacing.xl,
        color: colors.textSecondary,
    },
    progressContainer: {
        padding: spacing.md,
        backgroundColor: colors.surface,
        ...shadows.small,
    },
    progressBar: {
        height: 4,
        backgroundColor: colors.background,
        borderRadius: borderRadius.round,
        overflow: "hidden",
        marginBottom: spacing.xs,
    },
    progressFill: {
        height: "100%",
        backgroundColor: colors.primary,
    },
    progressText: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        textAlign: "center",
    },
});
