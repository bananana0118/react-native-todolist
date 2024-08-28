import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ThemeColors, useTheme } from "../providers/ThemeProvider";
import IconButton from "../button/IconButton";
import { Todo } from "@/constants/Dummy";

export default function TodoItem({
    item,
    index,
}: {
    item: Todo;
    index: number;
}) {
    const { theme, setTheme } = useTheme();

    const styles = createStyles(theme);

    return (
        <View style={{ ...styles.todo }}>
            <Text
                style={{
                    ...styles.todoText,
                    textDecorationLine: item.completed
                        ? "line-through"
                        : "none",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {item.task}
            </Text>
            <IconButton iconName="check" item={item}></IconButton>
        </View>
    );
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
    });
