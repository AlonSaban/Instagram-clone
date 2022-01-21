import { useRef, useContext, useState } from 'react'
import { Button, TextField, Dialog, InputLabel, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlUnstyledContext } from '@mui/material';
import { UserContext } from '../../../backend/context/UserContext'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import '../dist/UploadPost.css'


function UploadPosts() {
  const { user } = useContext(UserContext);
  const [file, setFile] = useState("");
  // const description = useRef("for now")
  const fileChangeHandler = e => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

  const upload = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      caption: "for now",
    }
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + "-" + file.name;
      data.append("name", fileName)
      data.append("image", file);
      newPost.img = fileName
      console.log(Array.from(data)[1][1]);
      console.log(Array.from(data));
      try {
        await axios.post(`http://localhost:4000/api/upload`, data);
      } catch (err) {
        console.log(err)
      }
    }
    try {
      await axios.post(`http://localhost:4000/api/feed/upload-post`, newPost);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form onSubmit={upload}>
        <input type="file" name="image" onChange={fileChangeHandler} />
        <button type="submit" >submit</button>
      </form>
    </div>
  )
}
export default UploadPosts