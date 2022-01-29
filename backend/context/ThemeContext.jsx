import { createContext, useMemo, useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Home from '../../frontend/src/pages/Home'

const ColorModeContext = createContext({ toggleColorMode: () => { } });

export default function ToggleColorMode() {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Home ColorModeContext={ColorModeContext} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
