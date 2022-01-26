import { useState } from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { mdiThemeLightDark } from '@mdi/js';

export default function ToggleTheme() {
  const GlobalStyles = createGlobalStyle`
    body {
      background-color: ${props => props.theme.body}
    }
  `
  const lightTheme = {
    body: "#fff",
    fontColor: "#000"
  }
  const darkTheme = {
    body: "#000",
    fontColor: "#fff"
  }
  const [theme, setTheme] = useState("light")
  const toggleTheme = () => {
    theme === "light" ? setTheme("black") : setTheme("light")
  }
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <button type="button" onClick={() => toggleTheme()}>
        Change Theme
      </button>
    </ThemeProvider>
  )
}