import { Skeleton } from "@rneui/themed";
import React from "react";
import { ThemeColors, useTheme } from "../providers/ThemeProvider";
import { StyleSheet } from "react-native";

type Props = {};

export default function TodoItemSkeleton({}: Props) {
    const { theme, setTheme } = useTheme();
    const styles = createStyles(theme);

    return (
        <Skeleton
            animation="pulse"
            style={{
                ...styles.todo,
            }}
        ></Skeleton>
    );
}

const createStyles = (theme: ThemeColors) =>
    StyleSheet.create({
        todo: {
            height: 40,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 8,
            marginBottom: 20,
            overflow: "hidden",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
        },
    });
