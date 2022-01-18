import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Topbar from '../Components/Topbar'
import UploadPost from '../Components/UploadPost'
import Feed from '../Components/Feed'
import Avatar from '@mui/material/Avatar'
import axios from 'axios'

export default function Profile() {
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
      <Avatar src={user.profilePicture}>
      </Avatar>
      <h2>Profile of: {username}</h2>
      <UploadPost />
      <Feed username={username} />
    </div>
  )
}