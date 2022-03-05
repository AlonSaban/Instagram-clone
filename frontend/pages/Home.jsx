import { useEffect, useMemo, useState } from "react"
import Feed from '../Components/Feed'
import Topbar from '../Components/Topbar'
import Box from '@mui/material/Box';
import axios from 'axios'
import { Paper } from "@mui/material"
import ColorModeContext from '../../backend/context/ThemeContext'
import '../dist/Home.css'


export default function Home() {

  // useEffect(async () => {
  //   const res = await axios.post('http://localhost:4000/api/verify', { toekn: localStorage.getItem('token') })
  //   console.log(res)
  //   if (res.data.status === "success") {
  //     localStorage.setItem('token', res.data.token)
  //   } else {
  //     console.log("no token found")
  //   }
  // }, [])

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