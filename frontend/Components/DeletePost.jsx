import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material'

export default function DeletePost({ post }) {
  const handleClick = () => {
    try {
      axios.delete(`http://localhost:4000/api/posts/${post._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <CloseIcon onClick={handleClick}>
        <Button />
      </CloseIcon>
    </div>
  )
}