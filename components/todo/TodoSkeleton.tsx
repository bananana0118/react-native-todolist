import { Skeleton } from "@rneui/base";
import React from "react";
import { ThemeColors, useTheme } from "../providers/ThemeProvider";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import TodoItemSkeleton from "./TodoItemSkeleton";

type Props = {};

export default function TodoSkeleton({}: Props) {
    const { theme, setTheme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.todoBox}>
            <Skeleton
                animation="pulse"
                style={styles.todoBoxSkeleton}
            ></Skeleton>
            <View style={{ ...styles.content }}>
                <TodoItemSkeleton></TodoItemSkeleton>
                <TodoItemSkeleton></TodoItemSkeleton>
                <TodoItemSkeleton></TodoItemSkeleton>
            </View>
        </View>
    );
}

const createStyles = (theme: ThemeColors) =>
    StyleSheet.create({
        todoBox: {
            height: 260,
            width: "100%",
            borderRadius: 8,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: theme.border,
        },
        todoBoxSkeleton: {
            width: "100%",
            height: 50,
            borderRadius: 8,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: theme.border,
        },
        content: {
            backgroundColor: theme.background,
            paddingVertical: 24,
            paddingHorizontal: 12,
        },
    });
