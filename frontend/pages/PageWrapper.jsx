import { useState, useMemo, useEffect } from 'react';
import Home from './Home';
import Profile from './Profile';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ColorModeContext from '../../backend/context/ThemeContext'

export default function PageWrapper() {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }),
    []);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
      },
    }),
    [mode],
  );

  const [page, setPage] = useState(true)
  const switchPages = () => {
    setPage((prevMode) => { prevMode ? true : false })
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Home ColorModeContext={ColorModeContext} />
      </ThemeProvider>
    </ColorModeContext.Provider>)
}