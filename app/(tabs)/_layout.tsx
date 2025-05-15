import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { colors } from "../theme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: "absolute",
                    },
                    default: {},
                }),
                contentStyle: {
                    paddingBottom: 50, // Add padding for the footer
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Quran",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="azkar"
                options={{
                    title: "Azkar",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
