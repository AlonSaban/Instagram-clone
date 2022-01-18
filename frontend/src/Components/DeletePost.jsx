import { useReducer } from 'react'
import axios from 'axios'
import { UserContext } from '../../../backend/context/UserContext'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material'

export default function DeletePost({ post }) {
  const handleClick = e => {
    e.preventDefault();
    console.log('hello');
    // try {
    //   axios.delete(`http:localhost:4000/api/posts/${post.userId}`)
    // } catch (err) {
    //   console.log(err)
    // }
  }

  return (
    <div>
      <CloseIcon onClick={handleClick}>
        <Button />
      </CloseIcon>
    </div>
  )
}