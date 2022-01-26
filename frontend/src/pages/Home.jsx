import { useState } from "react"
import Feed from '../Components/Feed'
import Topbar from '../Components/Topbar'
import { green, purple, blue } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { Switch, Grid, Typography, Button, Paper } from "@material-ui/core"
import ToggleColorMode from '../Components/DarkMode'
import '../dist/Home.css'

export default function Home() {

  return (
    <Paper >
      <Grid container direction="column">
        <Topbar />
        <Feed />
      </Grid>
    </Paper>
  )
}