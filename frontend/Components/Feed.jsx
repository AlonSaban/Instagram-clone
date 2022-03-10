import { useState, useMemo, useEffect, useContext } from 'react'
import Post from './Post'
import axios from "axios"
import { UserContext } from '../../backend/context/UserContext';
import '../dist/Feed.css'


export default function Feed({ username }) {
  const [posts, setPosts] = useState([])
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

  const postList = useMemo(() => posts.map((p) => (<Post key={p._id} post={p} />)), [posts])

  return (
    <div className="PostStyle">
      <div className="FeedBody" >
        {postList}
      </div>
    </div >
  )
}