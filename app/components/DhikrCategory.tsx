import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface DhikrCategoryProps {
    title: string;
    arabicTitle: string;
    onPress: () => void;
}

export const DhikrCategory: React.FC<DhikrCategoryProps> = ({
    title,
    arabicTitle,
    onPress,
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedView style={styles.container}>
                <ThemedText style={styles.arabicTitle}>
                    {arabicTitle}
                </ThemedText>
                <ThemedText style={styles.title}>{title}</ThemedText>
            </ThemedView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 15,
        marginVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#A1CEDC",
    },
    arabicTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center",
    },
    title: {
        fontSize: 16,
        textAlign: "center",
    },
});
