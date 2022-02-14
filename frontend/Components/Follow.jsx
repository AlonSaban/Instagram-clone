import { useState, useContext } from 'react';
import { UserContext } from '../../backend/context/UserContext'
import axios from 'axios';
import { Button } from '@mui/material'

function Follow(currentUser) {
  const { user } = useContext(UserContext);
  console.log(currentUser)
  const followUser = async () => {
    try {
      const res = axios.put(`http://localhost:4000/api/${user._id}/follow`, currentUser._id)
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Button onClick={followUser}>
        Follow
      </Button>
    </div>
  )
}
export default Follow