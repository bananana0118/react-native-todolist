import {
    ThemeColors,
    useSelectedDate,
    useTheme,
} from "@/components/providers/ThemeProvider";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import ThemeView from "@/components/common/ThemeView";
import { Todo, TodoTable } from "@/constants/Dummy";
import { Todos } from "@/components/todo/Todos";
import { readDataTodoTable } from "@/apis/todos";
import { getTodayDateFormatted } from "@/utils/time";

export default function Index() {
    const { theme, setTheme } = useTheme();
    const styles = createStyles(theme);
    const [todoTable, setTodoTable] = useState<TodoTable[]>([]);
    const { date, setDate } = useSelectedDate();

    const LoadDataTodo = useCallback(async () => {
        console.log("input date", date);
        const TodoTable = await readDataTodoTable({ date, beforeCount: 10 });
        setTodoTable(TodoTable);
        console.log(TodoTable);
    }, [date]);

    useEffect(() => {
        LoadDataTodo();
    }, [LoadDataTodo]);

    return (
        <ThemeView>
            <Text>으악</Text>
            <Todos todoTable={todoTable}></Todos>
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
