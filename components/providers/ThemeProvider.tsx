import { getTodayDateFormatted } from "@/app/utils/time";
import { Colors } from "@/constants/Colors";
import {
    DateContext,
    DateContextType,
    ThemeContext,
} from "@/contexts/ThemeContext";
import { useContext, useState } from "react";
type Merge<T> = {
    [K in keyof T]: T[K];
};

// 모든 키를 병합하는 유틸리티
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

// Colors 객체의 모든 키와 값을 병합한 타입 생성
export type ThemeColors = Merge<
    UnionToIntersection<(typeof Colors)[keyof typeof Colors]>
>;

interface ThemeContextType {
    theme: ThemeColors;
    setTheme: (themeName: keyof typeof Colors) => void;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [themeName, setThemeName] = useState<keyof typeof Colors>("pastel");
    const [date, setDate] = useState(getTodayDateFormatted());
    const setTheme = (themeName: keyof typeof Colors): void => {
        setThemeName(themeName);
    };
    const theme = Colors[themeName] as ThemeColors;

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <DateContext.Provider value={{ date, setDate }}>
                {children}
            </DateContext.Provider>
        </ThemeContext.Provider>
    );
};

export const useSelectedDate = (): DateContextType => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error("useDate must be used within a DateProvider");
    }
    return context;
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
