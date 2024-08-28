// pages/todo/[id].tsx

import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function TodoDetail() {
    const { id } = useLocalSearchParams(); // 동적 라우트 매개변수 가져오기

    return (
        <View>
            <Text>Todo ID: {id}</Text>
            {/* Todo 항목과 관련된 로직 추가 */}
        </View>
    );
}
