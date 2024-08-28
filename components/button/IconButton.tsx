import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeColors, useTheme } from "../providers/ThemeProvider";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Todo } from "@/constants/Dummy";
const CheckButton = ({ completed }: { completed: boolean }) => {
    const { theme, setTheme } = useTheme();
    const styles = createStyles(theme);

    return (
        <TouchableOpacity
            style={{
                backgroundColor: completed
                    ? theme.todoButtonComplete
                    : theme.todoButtonDefault,
                ...styles.commonButton,
            }}
            onPress={() => console.log("press")}
        >
            <Entypo name="check" size={24} color={theme.tint} />
        </TouchableOpacity>
    );
};

const AddTodoButton = () => {
    const { theme, setTheme } = useTheme();
    const styles = createStyles(theme);

    return (
        <Pressable
            style={{
                backgroundColor: theme.tabColor,
                ...styles.commonButton,
            }}
        >
            <FontAwesome6 name="plus" size={24} color={theme.tint} />
        </Pressable>
    );
};

export default function IconButton({
    item,
    iconName,
}: {
    item: Todo;
    iconName: "add" | "check";
}) {
    if (iconName === "check") {
        return <CheckButton completed={item.completed!}></CheckButton>;
    } else if (iconName === "add") {
        return <AddTodoButton></AddTodoButton>;
    }
}

const createStyles = (theme: ThemeColors) =>
    StyleSheet.create({
        todo: {
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 8,
            overflow: "hidden",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
        },
        todoText: {
            flex: 1,
            fontSize: 14,
            marginRight: 14,
        },
        commonButton: {
            borderRadius: 100,
            padding: 4,
            width: 32,
            height: 32,
            alignItems: "center",
            justifyContent: "center",
        },
    });
