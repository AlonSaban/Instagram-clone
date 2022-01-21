import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, TextField } from '@mui/material'
import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar'
import { grey, red } from '@mui/material/colors';
import { UserContext } from '../../../backend/context/UserContext'
import axios from "axios"
import { format } from 'timeago.js';
import Zoom from "@mui/material/Zoom";
import DeletePost from './DeletePost'
import '../dist/Post.css'

const PostMold = styled(Card)`
  width: 780px;
  border: 1em;
  border-color: lightgray;
  object-fit: fill;
  background-color: white;
  padding: 8px 20px;
`;
const UserInfo = styled.div`
display:flex;
padding: 3px;
align-items: center;
/* justify-content: flex-start; */
`;
const BottomPost = styled.div`
border-top: 1px solid lightgray;
width: auto;
`;

function Post({ post }) {
  const [user, setUser] = useState({})
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false)
  const [likeSize, setLikeSize] = useState(40)
  const [likeColor, setLikeColor] = useState(grey);
  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  const [comment, setComment] = useState("")
  const [disable, setDisable] = React.useState(false)
  // const IMAGE_DIRECTORY = "../"
  const { user: currentUser } = useContext(UserContext)

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes])

  useEffect(
    async function fetchUser() {
      const res = await axios.get(`http://localhost:4000/api/users?userId=${post.userId}`)
      // setUser(res.data)
      setUserFirstName(res.data.firstName.toString())
      setUserLastName(res.data.lastName.toString())
      // console.log(res.data.firstName)
    }, [post.userId])

  const likeHandler = () => {
    setIsLiked(!isLiked)
    setLike(isLiked ? like - 1 : like + 1)
    setLikeColor(isLiked ? grey : red)
    setLikeSize(isLiked ? 40 : 50)
    try {
      axios.put(`http://localhost:4000/api/posts/${post._id}/like`, { userId: currentUser._id })
    } catch (err) {
      consoole.log(err)
    }
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

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
      <PostMold>
        <div className="close-post">
          <DeletePost disabled={disable} post={post} onClick={() => setDisable(true)} />
        </div>
        <UserInfo>
          <Link to={`/profile/alon`} style={{ textDecoration: 'none' }}>
            <Avatar className="Avatar" {...stringAvatar(userFirstName + ' ' + userLastName)} />
          </Link>
          <h3>{userFirstName}</h3>
        </UserInfo>

        <img src={`backend/uploads/${post.img}`} alt="post-img" className="post_img" />
        {format(post.created)}
        <h6 className="date"></h6>
        <div className="LikeComponent">
          <div sx={{
            '& > :not(style)': {
              m: 2,
            },
          }}>
            <FavoriteIcon sx={{ display: "flex", color: likeColor[500], fontSize: likeSize }} onClick={likeHandler}>
              <Button />
            </FavoriteIcon>
          </div>
          <h4> {like} Likes</h4>
        </div>
        <div className="text">
          <h4>{post.caption}</h4>
          <h3>{comment}</h3>
        </div>
        <BottomPost>
          <TextField
            className="comment"
            placeholder="Add a comment"
            variant="standard"
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </BottomPost>
      </PostMold >
    </div>
  )
}

export default Post