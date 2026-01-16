import { createContext, useContext } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => children;

export const useTheme = () => useContext(ThemeContext);
