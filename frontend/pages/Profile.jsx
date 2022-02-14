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
import Follow from '../Components/Follow'
import './../dist/Profile.css'

export default function Profile() {

  const { user } = useContext(UserContext)
  let [followingName, setFollowingName] = useState([])
  let [followingPic, setFollowingPic] = useState([])
  const [followers, setFollowers] = useState([])
  const [friends, setFriends] = useState([])
  const username = useParams().username

  useEffect(
    async function getPostsInfo() {
      const res = await axios.get(`http://localhost:4000/api/friend/${user._id}`)
      const friends = res.data
      setFriends(friends);
      setFollowingName(friends.map(friend => friend.firstName))
      setFollowingPic(friends.map(friend => friend.profilePicture))
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
            <h2>Profile of: {username}</h2>
            <Avatar src={`/backend/uploads/${user.profilePicture}`} sx={{ width: 220, height: 220 }} />
            <Button>
              {/* <Follow /> */}
            </Button>
            <h2>{user.desc}</h2>
            <h3>Following: {friends.map(friend => friend.firstName).join(', ')}</h3>
            <AvatarGroup total={followingPic.length}>
              <Avatar src={`/backend/uploads/${followingPic[0]}`} />
              <Avatar src={`/backend/uploads/${followingPic[1]}`} />
            </AvatarGroup>
            <h3>Followers: {followers}</h3>
          </Box>
        </div>
        <div className="Feed">
          <Feed username={username} />
        </div>
      </div>
    </Paper >
  )
}