import React from "react";
import { ThemeColors, useTheme } from "../providers/ThemeProvider";
import { StyleSheet, Text, View } from "react-native";
import { getFormattedDate } from "@/app/utils/time";

export default function EmptyTodoList() {
    const { theme, setTheme } = useTheme();
    const todayDate = getFormattedDate(new Date());

    const styles = createStyles(theme);

    return (
        <View style={{ ...styles.todoBox }}>
            <View style={{ ...styles.header }}>
                <Text style={{ ...styles.headerText }}>{todayDate}</Text>
                {/* <IconButton
                    iconName="add"
                    item={sortedTodoData[0]}
                ></IconButton> */}
            </View>
            <View style={styles.content}>
                <Text>todo를 추가해 보세요!</Text>
            </View>
        </View>
    );
}

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
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 24,
            paddingHorizontal: 12,
        },
    });
