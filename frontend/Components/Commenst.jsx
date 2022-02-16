import React, { useRef, useState, useEffect, useContext } from 'react'
import { Card, Button, TextField } from '@mui/material'
import Avatar from '@mui/material/Avatar'

import axios from 'axios'

function Comments({ post }) {
  const comment = useRef("")

  const commentHandeler = async (e) => {
    e.preventDefault();
    const commentValue = comment.current.value
    console.log(commentValue)
    try {
      await axios.put(`http://localhost:4000/api/posts/${post._id}/comment`, { comment: commentValue })
    } catch (err) {
      console.log(err)
    }
  }

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