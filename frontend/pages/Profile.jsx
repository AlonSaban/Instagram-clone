import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../../backend/context/UserContext'
import { AvatarGroup, Switch, Grid, Typography, Button, Paper } from "@mui/material"
import Box from '@mui/material/Box';
import Topbar from '../Components/Topbar'
import Feed from '../Components/Feed'
import Avatar from '@mui/material/Avatar'
import axios from 'axios'
import ColorModeContext from '../../backend/context/ThemeContext'
import SideBar from '../Components/SideBar'
import './../dist/Profile.css'

export default function Profile() {
  const [user, setUser] = useState({})
  const username = useParams().username
  const [data,setData] = useState(false)
  useEffect(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users?username=${username}`)
      setUser(response.data)
      setData(true)
    } catch (err) {
      console.log(err)
    }
  }, [])

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

      <div className="profile">
        <div className="side-bar">
          <Box>
            {data === true &&(
              <SideBar user={user}/>
              )}
          </Box>
        </div>
        <div className="Feed">
          <Feed  />
        </div>
      </div>
    </Paper >
  )
}