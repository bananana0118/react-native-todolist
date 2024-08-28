import { ThemeColors } from "@/components/providers/ThemeProvider";
import { Colors } from "@/constants/Colors";
import React, { createContext, useContext, useState } from "react";



interface ThemeContextType {
    theme: ThemeColors;
    setTheme: (themeName: keyof typeof Colors) => void;
}


export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
