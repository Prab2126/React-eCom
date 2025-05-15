import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("theme"));
    setTheme(storedTheme ?? true);
  }, []);

  const buttonDarkTheme = theme ? "" : "darkTheme";
  const textDarkTheme = theme ? "" : "darkTheme";
  const buttonBgDarkTheme = theme ? "" : "bgdarkTheme";
  const textBgDarkTheme = theme ? "" : "bgdarkTheme";
  const linkDarkTheme = theme ? "" : "darkTheme";

  return (
    <ThemeContext.Provider
      value={{
        setTheme,
        theme,
        buttonDarkTheme,
        textDarkTheme,
        textBgDarkTheme,
        buttonBgDarkTheme,
        linkDarkTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

export const useThemeContext = () => useContext(ThemeContext);
