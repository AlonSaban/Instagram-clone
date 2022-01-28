import { useContext, createContext, useMemo, useState } from "react"
import Feed from '../Components/Feed'
import Topbar from '../Components/Topbar'
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Switch, Grid, Typography, Button, Paper } from "@mui/material"
// import ToggleColorMode from '../../../backend/context/ThemeContext'
import '../dist/Home.css'



export default function Home({ ColorModeContext }) {

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <div>
      <Paper>
        <Topbar />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            // bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
            p: 3,
          }}
        >
          {theme.palette.mode} mode
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Feed />
      </Paper>
    </div >
  )
}