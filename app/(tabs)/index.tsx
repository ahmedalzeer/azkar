import { StyleSheet, View, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { colors, typography, spacing, borderRadius, shadows } from "../theme";
import { Ionicons } from "@expo/vector-icons";

// Import the Quran data
const quranData = require("../../assets/hafs_smart_v8.json");

// Create a map of surah information
const surahMap = new Map();
quranData.forEach((verse: any) => {
    if (!surahMap.has(verse.sura_no)) {
        surahMap.set(verse.sura_no, {
            number: verse.sura_no,
            titleAr: verse.sura_name_ar,
            title: verse.sura_name_en,
            // We'll determine Makkiyah/Madaniyah based on surah number
            type: verse.sura_no > 28 ? "Makkiyah" : "Madaniyah",
            firstVerse: verse.aya_text_emlaey,
            verseCount: 0,
        });
    }
    // Increment verse count
    const surah = surahMap.get(verse.sura_no);
    surah.verseCount++;
});

// Convert map to array and sort by surah number
const surahs = Array.from(surahMap.values()).sort(
    (a, b) => a.number - b.number
);

export default function QuranScreen() {
    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText style={styles.headerTitle}>
                    القرآن الكريم
                </ThemedText>
                <ThemedText style={styles.headerSubtitle}>
                    Hafs Smart v8
                </ThemedText>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.surahContainer}>
                    {surahs.map((surah) => (
                        <Pressable
                            key={surah.number}
                            style={({ pressed }) => [
                                styles.surahCard,
                                pressed && styles.surahCardPressed,
                            ]}
                            onPress={() =>
                                router.push({
                                    pathname: "/quran/[id]",
                                    params: { id: surah.number },
                                })
                            }
                        >
                            <View style={styles.surahNumberContainer}>
                                <ThemedText style={styles.surahNumber}>
                                    {surah.number}
                                </ThemedText>
                            </View>
                            <View style={styles.surahContent}>
                                <ThemedText style={styles.surahName}>
                                    {surah.titleAr}
                                </ThemedText>
                                <ThemedText style={styles.surahEnglishName}>
                                    {surah.title}
                                </ThemedText>
                                <ThemedText style={styles.surahInfo}>
                                    {surah.type} • {surah.verseCount} Verses
                                </ThemedText>
                                {surah.number !== 1 && surah.number !== 9 && (
                                    <ThemedText style={styles.firstVerse}>
                                        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                                    </ThemedText>
                                )}
                                {(surah.number === 1 || surah.number === 9) && (
                                    <ThemedText style={styles.firstVerse}>
                                        {surah.firstVerse}
                                    </ThemedText>
                                )}
                            </View>
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
    surahContainer: {
        padding: spacing.md,
        gap: spacing.md,
    },
    surahCard: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.md,
        ...shadows.small,
    },
    surahCardPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    surahNumberContainer: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.md,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    surahNumber: {
        ...typography.bodyLarge,
        color: colors.surface,
        fontWeight: "bold",
    },
    surahContent: {
        flex: 1,
        gap: spacing.xs,
    },
    surahName: {
        ...typography.headerSmall,
        color: colors.text,
    },
    surahEnglishName: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    surahInfo: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    firstVerse: {
        ...typography.bodyLarge,
        color: colors.text,
        textAlign: "right",
        marginTop: spacing.md,
        lineHeight: 36,
    },
});
