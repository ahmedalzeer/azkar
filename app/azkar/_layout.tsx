import { Stack } from "expo-router";
import { colors, typography } from "../theme";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../components/ThemedText";

// English translations for categories
const categoryTranslations: { [key: string]: string } = {
    "أذكار الصباح": "Morning azkar",
    "أذكار المساء": "Evening azkar",
    "أذكار بعد الصلاة": "After Prayer azkar",
    "أذكار النوم": "Before Sleep azkar",
    "أذكار الاستيقاظ": "Upon Waking azkar",
};

export default function azkarLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.surface,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    ...typography.headerMedium,
                },
                headerBackTitleVisible: false,
                contentStyle: { backgroundColor: colors.background },
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen
                name="[category]"
                options={({ route }) => {
                    const category = decodeURIComponent(
                        route.params?.category as string
                    );
                    return {
                        headerTitle: () => (
                            <View style={styles.headerContainer}>
                                <ThemedText style={styles.headerArabic}>
                                    {category}
                                </ThemedText>
                                <ThemedText style={styles.headerEnglish}>
                                    {categoryTranslations[category] || category}
                                </ThemedText>
                            </View>
                        ),
                    };
                }}
            />
        </Stack>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    headerArabic: {
        ...typography.headerMedium,
        color: colors.text,
        textAlign: "center",
    },
    headerEnglish: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        textAlign: "center",
        marginTop: 2,
    },
});
