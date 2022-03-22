import { useContext } from 'react';
import { UserContext } from '../../backend/context/UserContext'
import { Button } from "@mui/material"
import axios from 'axios';

function Follow({ user }) {
  const { user: currentUser } = useContext(UserContext);

  const followUser = async () => {
    try {
      await axios.put(`http://localhost:4000/api/${user._id}/follow`, { id: currentUser._id })
    } catch (err) {
      console.error(err);
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