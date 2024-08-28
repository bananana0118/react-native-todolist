/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "react-native";

import { Colors } from "@/constants/Colors";

export function useThemeColor(
    props: { light?: string; dark?: string; pastel?: string },
    colorName: keyof typeof Colors.light &
        keyof typeof Colors.dark &
        keyof typeof Colors.pastel
) {
    const theme = useColorScheme() ?? "pastel";
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}
