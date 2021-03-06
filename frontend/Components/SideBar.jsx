import { useMemo, useState, useContext, useEffect } from 'react'
import { Avatar, AvatarGroup } from "@mui/material"
import { useParams } from 'react-router'
import { UserContext } from '../../backend/context/UserContext'
import axios from 'axios';
import Follow from '../Components/Follow'
import '../dist/SideBar.css'

function SideBar({ user }) {
  let [followingName, setFollowingName] = useState([])
  let [followingPic, setFollowingPic] = useState([])
  const [followers, setFollowers] = useState([])
  const [friends, setFriends] = useState([])
  const username = useParams().username
  const { user: currentUser } = useContext(UserContext);

  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/friend/${user._id}`)
      const friends = res.data
      setFriends(friends);
      setFollowingName(friends.map(friend => friend.firstName))
      setFollowingPic(friends.map(friend => friend.profilePicture))
    } catch (err) {
      console.log(err)
    }
  }, [user])

  const followingList = useMemo(() => friends.map((friend) => (
    <li key={friend.firstName}>
      <AvatarGroup max={4}>
        <Avatar src={`/backend/uploads/${friend.profilePicture}`} />
      </AvatarGroup>
      {friend.firstName}
    </li>
  )), [friends])


  return (
    <div className="side-bar">
      <h2>Profile of: {username}</h2>
      <Avatar src={`/backend/uploads/${user.profilePicture}`} sx={{ width: 220, height: 220 }} />
      {username !== currentUser.firstName && (
        <Follow user={user} />
      )}

      {/* <h2>{user.desc}</h2> */}

      <h3>Following:</h3>

      {followingList}

      <h3>Followers:</h3>
    </div>
  )
}
export default SideBar;