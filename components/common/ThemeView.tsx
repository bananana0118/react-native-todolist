import { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { ThemeColors, useTheme } from "../providers/ThemeProvider";

interface ThemeViewProps extends ViewProps {
    children: ReactNode;
}

export default function ThemeView({ children, ...props }: ThemeViewProps) {
    const { theme, setTheme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={{ ...styles.container }} {...props}>
            {children}
        </View>
    );
}

const createStyles = (theme: ThemeColors) =>
    StyleSheet.create({
        container: {
            padding: 30,
            backgroundColor: theme.background,
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
        },
    });
