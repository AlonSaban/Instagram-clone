import React, { useRef, useState, useEffect, useContext } from 'react'
import { UserContext } from '../../backend/context/UserContext'
import { Card, Button, TextField } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import axios from 'axios'
import '../dist/CommentInput.css'

function Comments({ post }) {

  const { user: currentUser } = useContext(UserContext)
  const comment = useRef("")

  const commentHandeler = async (e) => {
    e.preventDefault();
    const commentValue = comment.current.value
    console.log(commentValue)
    try {
      await axios.put(`http://localhost:4000/api/posts/${post._id}/comment`, { commentInfo: commentValue, authorInfo: currentUser.profilePicture })
    } catch (err) {
      console.log(err)
    }
  }

  // <Avatar className="Avatar" src={`/backend/uploads/${commenterImg}`} />
  // <h4>{comments}</h4>

  return (
    <div>
      <form onSubmit={commentHandeler}>
        <TextField
          className="comment"
          placeholder="Add a comment"
          variant="standard"
          type="text"
          inputRef={comment}
        />
      </form>
    </div>
  )
}
export default Comments