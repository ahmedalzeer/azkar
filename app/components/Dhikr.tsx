import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface DhikrProps {
    arabicText: string;
    translation: string;
    count: number;
}

export const Dhikr: React.FC<DhikrProps> = ({
    arabicText,
    translation,
    count,
}) => {
    const [remainingCount, setRemainingCount] = useState(count);

    const handlePress = () => {
        if (remainingCount > 0) {
            setRemainingCount((prev) => prev - 1);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <ThemedView style={styles.container}>
                <ThemedText style={styles.arabicText}>{arabicText}</ThemedText>
                <ThemedText style={styles.translation}>
                    {translation}
                </ThemedText>
                <View style={styles.countContainer}>
                    <ThemedText style={styles.count}>
                        {remainingCount}
                    </ThemedText>
                </View>
            </ThemedView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        gap: 8,
    },
    arabicText: {
        fontSize: 24,
        textAlign: "right",
        fontFamily: "System",
        lineHeight: 40,
    },
    translation: {
        fontSize: 16,
        textAlign: "left",
    },
    countContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
    count: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
