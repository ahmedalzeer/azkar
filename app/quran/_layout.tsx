import { Stack } from "expo-router";
import { colors } from "../theme";

export default function QuranLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.surface,
                },
                headerTintColor: colors.text,
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                name="[id]"
                options={{
                    headerTitle: "Surah Details",
                }}
            />
        </Stack>
    );
}
