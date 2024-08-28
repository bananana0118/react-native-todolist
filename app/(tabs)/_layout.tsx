import { ThemeProvider, useTheme } from "@/components/providers/ThemeProvider";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Keyboard, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

export default function TabLayout() {
    const [isTabBarVisible, setIsTabBarVisible] = useState(true);

    const { theme, setTheme } = useTheme();

    return (
        <>
            <StatusBar style="light" backgroundColor="#000" />
            <ThemeProvider>
                <Tabs
                    screenOptions={{
                        headerBackground: () => (
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: theme.tabColor,
                                }}
                            />
                        ),
                        tabBarHideOnKeyboard: true,
                        headerTitleAlign: "center", // 헤더 텍스트를 중앙에 정렬
                        headerTintColor: "#fff", // 헤더 텍스트 및 아이콘 색상 설정
                        tabBarActiveTintColor: theme.tabIconSelected,
                        tabBarInactiveTintColor: theme.tabIconDefault,
                    }}
                >
                    <Tabs.Screen
                        name="(home)"
                        options={{
                            title: "나의 할 일",
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome5
                                    name="tasks"
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="addTodo"
                        options={{
                            title: "할일 추가",
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign
                                    name="plus"
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="settings"
                        options={{
                            title: "설정",
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons
                                    name="settings-sharp"
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                </Tabs>
            </ThemeProvider>
        </>
    );
}
