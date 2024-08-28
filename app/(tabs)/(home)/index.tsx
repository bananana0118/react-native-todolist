import { ThemeColors, useTheme } from "@/components/providers/ThemeProvider";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import ThemeView from "@/components/common/ThemeView";
import { Todo } from "@/constants/Dummy";
import { Todos } from "@/components/todo/Todos";


export default function Index() {
    const { theme, setTheme } = useTheme();
    const styles = createStyles(theme);

    const [todoData, setTodoData] = useState<Todo[]>([]);

    return (
        <ThemeView>
            <Todos todoData={todoData}></Todos>
        </ThemeView>
    );
}

const createStyles = (theme: ThemeColors) =>
    StyleSheet.create({
        view: {
            backgroundColor: theme.background,
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
        },
        todoBox: {
            width: "100%",
            borderRadius: 8,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: theme.border,
        },
        header: {
            backgroundColor: theme.todoHeaderColor,

            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 13,
            paddingVertical: 10,
            borderBottomColor: theme.border,
            borderBottomWidth: 1,
        },
        headerText: {
            color: theme.tint,
            fontSize: 18,
            fontWeight: "bold",
        },
        content: {
            backgroundColor: "#fff",
            paddingVertical: 24,
            paddingHorizontal: 12,
        },
    });
