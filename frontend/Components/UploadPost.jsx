import { useRef, useContext, useState } from 'react'
import { Button, TextField, Dialog, InputLabel, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { UserContext } from '../../backend/context/UserContext'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import '../dist/UploadPost.css'


function UploadPost() {
  const { user } = useContext(UserContext);
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);
  const description = useRef()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const fileChangeHandler = e => {
    setFile(e.target.files[0])
  }

  const upload = async () => {
    const newPost = {
      userId: user._id,
      caption: description.current.value,
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
        // window.location.reload();
      } catch (err) {
        console.log(err)
      }
    }
    try {
      await axios.post(`http://localhost:4000/api/feed/upload-post`, newPost);
      setOpen(false);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          <AddCircleIcon color="primary" />
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Uploading your new post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              click the camera icon to upload your photo
            </DialogContentText>
            <label className="upload-img" htmlFor="file">
              <CameraAltIcon color="primary" fontSize='large' />
              <InputLabel>
                <input
                  type="file"
                  name="image"
                  id="file"
                  style={{ display: "none" }}
                  label="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={fileChangeHandler}
                  required />
              </InputLabel>
            </label>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Caption"
              inputRef={description}
              type="text"
              fullWidth
              variant="standard"
              required />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={upload}>Upload</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}
export default UploadPost