import { ThemeColors, useTheme } from "@/components/providers/ThemeProvider";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import ThemeView from "@/components/common/ThemeView";
import { useCallback, useEffect, useState } from "react";
import { Todo, TodoTable } from "@/constants/Dummy";
import { Todos } from "@/components/todo/Todos";
import Input from "@/components/input/Input";
import { keyExtractor } from "../utils/util";
import { readDataTodoTable } from "@/apis/todos";
import EmptyTodoList from "@/components/todo/EmptyTodoList";

export default function AddTodo() {
    const { theme, setTheme } = useTheme();
    const [todoTable, setTodoTable] = useState<TodoTable[]>([]);

    const styles = createStyles(theme);

    //일단 오늘 날짜 넣어

    const LoadDataTodo = useCallback(async () => {
        const TodoTable = await readDataTodoTable({ date: "2024-08-28" });
        setTodoTable(TodoTable);
    }, []);

    const renderTodoTable: ListRenderItem<TodoTable> = ({ item, index }) => {
        console.log("item"+item)
        return <Todos todoTable={item}></Todos>;
    };

    useEffect(() => {
        LoadDataTodo();
    }, []);
    return (
        <ThemeView>
            <Input onPress={LoadDataTodo}></Input>
            <FlatList
                data={todoTable}
                keyExtractor={keyExtractor}
                renderItem={renderTodoTable}
                style={{ width: "100%" }}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={EmptyTodoList}
            ></FlatList>
        </ThemeView>
    );
}

const createStyles = (theme: ThemeColors) =>
    StyleSheet.create({
        inputBox: {
            flexDirection: "row",
            marginBottom: 10,
        },
        todoInput: {
            flex: 1,
            borderWidth: 1,
            borderColor: theme.border,
            padding: 10,
            marginRight: 10,
            borderRadius: 8,
        },
        todoButton: {
            padding: 10,
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: theme.todoButtonDefault,
            borderRadius: 8,
        },
        buttonText: {
            paddingHorizontal: 8,
            fontSize: 16,
            fontWeight: "bold",
            color: theme.tint,
        },
    });
