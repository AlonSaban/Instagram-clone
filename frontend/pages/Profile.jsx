import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { Paper } from "@mui/material"
import Box from '@mui/material/Box';
import Topbar from '../Components/Topbar'
import Feed from '../Components/Feed'
import axios from 'axios'
import ColorModeContext from '../../backend/context/ThemeContext'
import { UserContext } from '../../backend/context/UserContext'
import SideBar from '../Components/SideBar'
import './../dist/Profile.css'

export default function Profile() {
  const { user: currentUser } = useContext(UserContext)
  const [user, setUser] = useState({})
  const username = useParams().username
  const [data, setData] = useState(false)

  useEffect(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users?username=${username}`)
      setUser(response.data)
      setData(true)
    } catch (err) {
      console.log(err)
    }
  }, [currentUser])

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
        <Box>
          {data === true && (
            <SideBar user={user} />
          )}
        </Box>
        <div className="Feed">
          <Feed username={username} />
        </div>
      </div>
    </Paper >
  )
}