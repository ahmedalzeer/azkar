import { StyleSheet, View, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
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

export default function AzkarScreen() {
    // Get categories from the JSON file
    const categories = Object.keys(azkarData).map((key) => ({
        id: key,
        title: categoryTranslations[key] || key,
        arabicTitle: key,
    }));

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText style={styles.headerTitle}>الأذكار</ThemedText>
                <ThemedText style={styles.headerSubtitle}>
                    Daily azkar
                </ThemedText>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.categoriesContainer}>
                    {categories.map((category) => (
                        <Pressable
                            key={category.id}
                            style={({ pressed }) => [
                                styles.categoryCard,
                                pressed && styles.categoryCardPressed,
                            ]}
                            onPress={() =>
                                router.push(
                                    `/azkar/${encodeURIComponent(category.id)}`
                                )
                            }
                        >
                            <View style={styles.categoryIcon}>
                                <Ionicons
                                    name="book-outline"
                                    size={24}
                                    color={colors.primary}
                                />
                            </View>
                            <View style={styles.categoryContent}>
                                <ThemedText style={styles.categoryTitle}>
                                    {category.arabicTitle}
                                </ThemedText>
                                <ThemedText style={styles.categorySubtitle}>
                                    {category.title}
                                </ThemedText>
                                <ThemedText style={styles.categoryCount}>
                                    {(azkarData[category.id] || []).length}{" "}
                                    azkar
                                </ThemedText>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={24}
                                color={colors.textSecondary}
                            />
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: spacing.xl,
        backgroundColor: colors.surface,
        alignItems: "center",
        gap: spacing.sm,
        ...shadows.small,
    },
    headerTitle: {
        ...typography.headerLarge,
        color: colors.text,
    },
    headerSubtitle: {
        ...typography.bodyMedium,
        color: colors.textSecondary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    categoriesContainer: {
        padding: spacing.md,
        gap: spacing.md,
    },
    categoryCard: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        ...shadows.small,
    },
    categoryCardPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    categoryIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryContent: {
        flex: 1,
        gap: spacing.xs,
    },
    categoryTitle: {
        ...typography.headerSmall,
        color: colors.text,
    },
    categorySubtitle: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    categoryCount: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
});
