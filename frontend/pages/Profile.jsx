import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../../backend/context/UserContext'
import Box from '@mui/material/Box';
import Topbar from '../Components/Topbar'
import Feed from '../Components/Feed'
import Avatar from '@mui/material/Avatar'
import axios from 'axios'
import './../dist/Profile.css'

export default function Profile() {
  const { user: currentUser } = useContext(UserContext)

  const [user, setUser] = useState({})
  const username = useParams().username

  useEffect(
    async function getPostsInfo() {
      const res = await axios.get(`http://localhost:4000/api/users?username=${username}`)
      setUser(res.data)
    }, [username])

  return (
    <div>
      <Box
        sx={{
          bgcolor: 'background.default',
          borderRadius: '1',
          position: 'sticky',
          top: '0',
          zIndex: '1',
        }}>
        <Topbar />
      </Box>
      <div className="profile">
        <div className="side-bar">
          <Box>
            <h2>Profile of: {username}</h2>
            <Avatar src={user.profilePicture} />
            <p>lorem ipsum dolor sit amet, consectetur</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore consequatur mollitia doloribus laudantium ex impedit dignissimos, quam fugit quia reiciendis atque totam repellat quibusdam illo, voluptatum eum asperiores eveniet. Nemo!</p>
          </Box>
        </div>
        <div className="Feed">
          <Feed username={username} />
        </div>
      </div>
    </div>
  )
}