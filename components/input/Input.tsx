import React, { useCallback, useState } from "react";
import { ThemeColors, useTheme } from "../providers/ThemeProvider";
import {
    GestureResponderEvent,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { addDataTodo } from "@/apis/todos";
import { getTodayDateFormatted } from "@/app/utils/time";

type Props = {
    onPress: () => Promise<void>;
    date: string;
};

export default function Input({ onPress: onPressHandler, date }: Props) {
    const [inputValue, setInputValue] = useState("");
    const { theme, setTheme } = useTheme();

    const styles = createStyles(theme);

    const onChangeHandler = (text: string) => {
        setInputValue(text); // 상태 업데이트
    };
    const onAddTodoHandler = useCallback(async () => {
        const errorCode = await addDataTodo({
            task: inputValue,
            date: date,
        });
        if (errorCode === 200) {
            setInputValue("");
            onPressHandler(); //todo toast 할 일이 추가되었습니다.
        } else {
            console.log("error 발생");
        }
    }, [inputValue]);

    return (
        <View style={styles.inputBox}>
            <TextInput
                style={styles.todoInput}
                placeholder="할 일을 입력해주세요!"
                onChangeText={onChangeHandler}
                value={inputValue}
            ></TextInput>
            <TouchableOpacity
                style={styles.todoButton}
                onPress={onAddTodoHandler}
            >
                <Text style={styles.buttonText}>추가</Text>
            </TouchableOpacity>
        </View>
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
