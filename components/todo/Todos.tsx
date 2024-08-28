import {
    View,
    Button,
    FlatList,
    StyleSheet,
    Text,
    ListRenderItem,
    TouchableWithoutFeedback,
} from "react-native";
import { ThemeColors, useTheme } from "../providers/ThemeProvider";
import TodoItem from "./TodoItem";
import { getFormattedDate } from "@/app/utils/time";
import { keyExtractor } from "@/app/utils/util";
import IconButton from "../button/IconButton";
import { Todo, TodoTable } from "@/constants/Dummy";
import React from "react";

export const Todos = ({ todoTable }: { todoTable: TodoTable }) => {
    const { theme, setTheme } = useTheme();
    const styles = createStyles(theme);
    console.log("todoTable  " + todoTable);
    const renderTodoItem: ListRenderItem<Todo> = ({ item, index }) => {
        return <TodoItem item={item} index={index}></TodoItem>;
    };

    const todayDate = getFormattedDate(new Date());

    // const filteredTodoData = todoData.filter((item) => item.date == todayDate);
    // const sortedTodoData = todoData
    //     ? todoData.sort((a, b) => {
    //           if (a.completed === false && b.completed === true) {
    //               return -1;
    //           } else if (a.completed === true && b.completed === false) {
    //               return 1;
    //           } else {
    //               return 0;
    //           }
    //       })
    //     : [];

    return (
        <View style={{ ...styles.todoBox }}>
            <View style={{ ...styles.header }}>
                <Text style={{ ...styles.headerText }}>{todayDate}</Text>
                {/* <IconButton
                    iconName="add"
                    item={sortedTodoData[0]}
                ></IconButton> */}
            </View>
            {todoTable?.todos.length >0 && (
                <FlatList
                    style={{ ...styles.content }}
                    onScroll={(event) =>
                        console.log(
                            "Scrolling",
                            event.nativeEvent.contentOffset.y
                        )
                    }
                    keyboardShouldPersistTaps={"handled"}
                    scrollEnabled={true}
                    data={todoTable.todos}
                    renderItem={renderTodoItem}
                    keyExtractor={keyExtractor}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 20 }} />
                    )}
                ></FlatList>
            )}
        </View>
    );
};

export default React.memo(Todos);

const createStyles = (theme: ThemeColors) =>
    StyleSheet.create({
        todoBox: {
            flex: 1,
            flexGrow: 1,
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
