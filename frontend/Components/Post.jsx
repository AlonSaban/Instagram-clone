import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, TextField } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar'
import { grey, red } from '@mui/material/colors';
import { UserContext } from '../../backend/context/UserContext'
import axios from "axios"
import { format } from 'timeago.js';
import DeletePost from './DeletePost'
import CommentInput from './CommentInput';
import Comment from './Comment';
import '../dist/Post.css'


function Post({ post }) {
  const { user: currentUser } = useContext(UserContext)
  const [comment, setComment] = useState()
  const [commenterImg, setCommenterImg] = useState()
  const [isLiked, setIsLiked] = useState(false)
  const [like, setLike] = useState(post.likes.length);
  const [user, setUser] = useState({
    userFirstName: "",
    userLastName: "",
    userId: "",
    userProfilePicture: "",
  })
  const [likeDetail, setLikeDetail] = useState({
    likeSize: 40,
    likeColor: grey,
  })
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes])

  useEffect(
    async function fetchUser() {
      const res = await axios.get(`http://localhost:4000/api/users?userId=${post.userId}`)
      setUser({
        userFirstName: res.data.firstName.toString(),
        userLastName: res.data.lastName.toString(),
        userId: res.data._id,
        userProfilePicture: res.data.profilePicture
      })
    }, [post.userId])

  const likeHandler = async () => {
    try {
      const response = axios.put(`http://localhost:4000/api/posts/${post._id}/like`, { userId: currentUser._id })
      response.then((res) => {
        if (res.status === 200) {
          setIsLiked(!isLiked)
          setLike(isLiked ? like - 1 : like + 1)
          setLikeDetail({
            likeSize: isLiked ? 40 : 50,
            likeColor: isLiked ? grey : red,
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(
    async function getComments() {
      await post.comments.forEach((comment) => {
        setCommenterImg(comment[0])
        setComment(comment[1])
      })
    }, [post])


  function stringToColor(string) {
    let hash = 0;
    let i;
    let color = '#';
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }


  return (
    <div className="post">
      <div className="PostMold">
        <div className="close-post">
          {currentUser._id === post.userId && (
            <DeletePost post={post} />
          )}
        </div>
        <div className="UserInfo">
          <Link to={`/profile/${user.userFirstName}`} style={{ textDecoration: 'none' }}>
            <Avatar className="Avatar" src={`/backend/uploads/${user.userProfilePicture}`} {...stringAvatar(user.userFirstName + ' ' + user.userLastName)} />
          </Link>
          <h3>{user.userFirstName}</h3>
        </div>
        <div className="image">
          <img src={`/backend/uploads/${post.img}`} alt="post-img" className="post_img" style={{ width: "100%", height: "100%" }} />
        </div>
        {format(post.created)}
        <div className="LikeComponent">
          <div sx={{
            '& > :not(style)': {
              m: 2,
            },
          }}>
            <FavoriteIcon sx={{ display: "flex", color: likeDetail.likeColor[500], fontSize: likeDetail.likeSize }} onClick={likeHandler}>
              <Button />
            </FavoriteIcon>
          </div>
          <h4> {like} Likes</h4>
        </div>
        <div className="text">
          {post.caption}
        </div>
        <div className="BottomPost">
          <div className="commetns">
            <Comment post={post} />
          </div>
          <CommentInput post={post} comments={comment} commenterImg={commenterImg} />
        </div >
      </div >
    </div>
  )
}

export default Post