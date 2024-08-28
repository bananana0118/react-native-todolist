import { ThemeProvider, useTheme,  } from "@/components/providers/ThemeProvider";
import { Text, View } from "react-native";

export default function Settings() {
    const { theme, setTheme } = useTheme();
    return (
        <View
            style={{
                backgroundColor:theme.background,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Settings</Text>
        </View>
    );
}
