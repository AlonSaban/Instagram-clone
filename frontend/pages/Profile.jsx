import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../../backend/context/UserContext'
import { Switch, Grid, Typography, Button, Paper } from "@mui/material"
import Box from '@mui/material/Box';
import Topbar from '../Components/Topbar'
import Feed from '../Components/Feed'
import Avatar from '@mui/material/Avatar'
import axios from 'axios'
import ColorModeContext from '../../backend/context/ThemeContext'
import './../dist/Profile.css'

export default function Profile() {

  const { user: currentUser } = useContext(UserContext)
  const [followingName, setFollowingName] = useState([])
  const [followingPic, setFollowingPic] = useState([])
  const [followers, setFollowers] = useState([])
  const username = useParams().username

  useEffect(
    async function getPostsInfo() {
      const res = await axios.get(`http://localhost:4000/api/friend/${currentUser._id}`)
      const friends = res.data
      setFollowingName(friends.map(friend => friend.firstName))
      setFollowingPic(friends.map(friend => friend.profilePicture))
    }, [currentUser.following])

  return (
    <Paper>
      <div>
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
              {currentUser.profilePicture}
              <h2>Profile of: {followingPic}{username}</h2>
              <Avatar src={`./backend/uploads/${currentUser.profilePicture}`} />
              <h3>Following: {followingName}</h3>
              <h3>Followers: {followers}</h3>
            </Box>
          </div>
          <div className="Feed">
            <Feed username={username} />
          </div>
        </div>
      </div>
    </Paper >
  )
}