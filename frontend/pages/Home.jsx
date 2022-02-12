import { useContext, createContext, useMemo, useState } from "react"
import Feed from '../Components/Feed'
import Topbar from '../Components/Topbar'
import Box from '@mui/material/Box';
import { Switch, Grid, Typography, Button, Paper } from "@mui/material"
import ColorModeContext from '../../backend/context/ThemeContext'
import '../dist/Home.css'


export default function Home() {

  return (
    <Paper>
      <Box
        sx={{
          bgcolor: 'background.default',
          borderRadius: '1',
          position: 'sticky',
          top: '0',
          zIndex: '1',
        }}>
        <Topbar ColorModeContext={ColorModeContext} />
      </Box>
      <Feed />
    </Paper>
  )
}