import {
    View,
    Button,
    FlatList,
    StyleSheet,
    Text,
    ListRenderItem,
} from "react-native";
import {
    ThemeColors,
    useSelectedDate,
    useTheme,
} from "../providers/ThemeProvider";
import TodoItem from "./TodoItem";
import { keyExtractor } from "@/utils/util";
import { Todo, TodoTable } from "@/constants/Dummy";
import React, { useEffect, useState } from "react";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { getDatetoString } from "@/utils/time";
import EmptyTodoList from "./EmptyTodoList";
import TodoSkeleton from "./TodoSkeleton";

export const Todos = ({ todoTable }: { todoTable: TodoTable[] }) => {
    const { date, setDate } = useSelectedDate();
    const { theme, setTheme } = useTheme();
    const styles = createStyles(theme);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const renderTodoItem: ListRenderItem<Todo> = ({ item, index }) => {
        return <TodoItem item={item} index={index}></TodoItem>;
    };

    const onChangeDateHandler = (event: DateTimePickerEvent, date?: Date) => {
        setShow(false);
        console.log(date);
        if (date) {
            const selectedDate = getDatetoString(date);

            setDate(selectedDate);
        }
    };
    const sortedTodoData = (todoTable: TodoTable) =>
        todoTable?.todos
            ? todoTable.todos.sort((a, b) => {
                  if (a.completed === false && b.completed === true) {
                      return -1;
                  } else if (a.completed === true && b.completed === false) {
                      return 1;
                  } else {
                      return 0;
                  }
              })
            : [];

    const onClickCalendar = () => {
        setShow((pre) => !pre);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer); //컴포넌트 언마운트시 클리어
    }, []);

    //달력바뀌면 쿼리 날리는 걸로 바꾸셈
    if (isLoading) return <TodoSkeleton></TodoSkeleton>;
    if (todoTable.length === 0) return <EmptyTodoList></EmptyTodoList>;

    return (
        <View style={{ ...styles.todoBox }}>
            <View style={{ ...styles.header }}>
                <Text style={{ ...styles.headerText }}>{date}</Text>
                <Button onPress={onClickCalendar} title="달력"></Button>
            </View>
            {todoTable.map((todoList) => (
                <FlatList
                    key={todoList.id}
                    style={{ ...styles.content }}
                    onScroll={(event) =>
                        console.log(
                            "Scrolling",
                            event.nativeEvent.contentOffset.y
                        )
                    }
                    keyboardShouldPersistTaps={"handled"}
                    scrollEnabled={true}
                    data={sortedTodoData(todoList)}
                    renderItem={renderTodoItem}
                    keyExtractor={keyExtractor}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 20 }} />
                    )}
                ></FlatList>
            ))}
            {show && (
                <DateTimePicker
                    value={new Date(date)}
                    mode="date"
                    onChange={onChangeDateHandler}
                ></DateTimePicker>
            )}
        </View>
    );
};

export default React.memo(Todos);

const createStyles = (theme: ThemeColors) =>
    StyleSheet.create({
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
            backgroundColor: theme.background,
            paddingVertical: 24,
            paddingHorizontal: 12,
        },
    });
