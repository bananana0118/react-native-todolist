import {
    ThemeColors,
    useSelectedDate,
    useTheme,
} from "@/components/providers/ThemeProvider";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import ThemeView from "@/components/common/ThemeView";
import { useCallback, useEffect, useState } from "react";
import { TodoTable } from "@/constants/Dummy";
import { Todos } from "@/components/todo/Todos";
import Input from "@/components/input/Input";
import { keyExtractor } from "../../utils/util";
import { readDataTodoTable } from "@/apis/todos";
import EmptyTodoList from "@/components/todo/EmptyTodoList";

export default function AddTodo() {
    const { theme, setTheme } = useTheme();
    const { date, setDate } = useSelectedDate();
    const [todoTable, setTodoTable] = useState<TodoTable[]>([]);

    const styles = createStyles(theme);

    //나중엔 특정 날짜 하나만 불러오도록
    const LoadDataTodo = useCallback(async () => {
        const TodoTable = await readDataTodoTable({ date });
        setTodoTable(TodoTable);
    }, []);

    const renderTodoTable: ListRenderItem<TodoTable> = ({ item, index }) => {
        return <Todos todoTable={item}></Todos>;
    };

    useEffect(() => {
        LoadDataTodo();
    }, []);
    return (
        <ThemeView>
            <Input onPress={LoadDataTodo} date={date}></Input>
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
