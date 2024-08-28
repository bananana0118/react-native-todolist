/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const tintColorDefault = "#fff";
export const Colors = {
    light: {
        text: "#11181C",
        background: "#fff",
        tint: tintColorLight,
        icon: "#687076",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: "#ECEDEE",
        background: "#151718",
        tint: tintColorDark,
        icon: "#9BA1A6",
        tabIconDefault: "#9BA1A6",
        tabIconSelected: tintColorDark,
    },
    pastel: {
        text: "#000000",
        background: "#ffffff",
        tint: tintColorDefault,
        icon: "#FFD97D",
        tabColor: "#FFD97D",
        todoHeaderColor: "#60D394",
        tabIconDefault: "#9BA1A6",
        todoButtonDefault: "#FF9B85",
        todoButtonComplete: "#9BA1A6",
        tabIconSelected: "#FFD97D",
        border: "#B7B7B7",
    },
};
