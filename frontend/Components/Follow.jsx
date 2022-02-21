import { useState, useContext } from 'react';
import { UserContext } from '../../backend/context/UserContext'
import { Avatar, AvatarGroup, Switch, Grid, Typography, Button, Paper } from "@mui/material"
import axios from 'axios';

function Follow({ user }) {
  const { user: currentUser } = useContext(UserContext);
  const [followed, setFollowed] = useState();
  const [friends, setFriends] = useState();

  const followUser = async () => {
    setFollowed(currentUser.followinging.includes(user?.id))
    try {
      await axios.put(`http://localhost:4000/api/${user._id}/follow`, user._id)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Button onClick={followUser}>
        {currentUser.following.includes(user._id)
          ? "Unfollow" : "Follow"}
      </Button>
    </div>
  )
}
export default Follow