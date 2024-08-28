import { ThemeProvider, useTheme } from "@/components/providers/ThemeProvider";
import { Stack } from "expo-router";

export default function StackLayout() {
    const { theme, setTheme } = useTheme();
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" options={{ title: "Home" }} />
        </Stack>
    );
}
