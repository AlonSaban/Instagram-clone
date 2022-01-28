import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Switch, Grid, Typography, Paper } from "@material-ui/core"
import { Card, CardHeader, CardContent, CardActions, TextField, Button, Avatar } from '@mui/material'
import Post from './Post'
import axios from "axios"
import { UserContext } from '../../../backend/context/UserContext';

import '../dist/Feed.css'


export default function Feed({ username, theme }) {
  const [posts, setPosts] = useState([])
  const [data, setData] = useState({})
  const [text, setText] = useState("")
  const { user } = useContext(UserContext)

  useEffect(
    async function getPostsInfo() {
      const res = username
        ? await axios.get(`http://localhost:4000/api/profile/${username}`)
        : await axios.get(`http://localhost:4000/api/posts/timeline/${user._id}`)
      setPosts(res.data)
      return res
    }
    , [username, user._id])

  return (
    <div className="PostStyle">
      <div className="FeedBody" >
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}