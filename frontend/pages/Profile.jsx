import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../../backend/context/UserContext'
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
      <Topbar />
      <div className="profile">
        <div className="side-bar">
          <Avatar src={user.profilePicture}>
          </Avatar>
          <h2>Profile of: {username}</h2>
        </div>
        <Feed />
      </div>
    </div>
  )
}