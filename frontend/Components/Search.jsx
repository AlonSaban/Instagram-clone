import { useRef, useContext, useState } from 'react'
import { Button, TextField, Dialog, InputLabel, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { UserContext } from '../../backend/context/UserContext'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';

import axios from 'axios';
import '../dist/UploadPost.css'


function SearchUser() {
  const { user } = useContext(UserContext);
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);
  let [searchResults, setSearchResults] = useState([]);
  const search = useRef()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const clickHandeler = (e) => {
    e.preventDefault();

    getUser(search.current.value)
  }

  const getUser = async (user) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/search/${user}`)
      setSearchResults(res.data);
      // users.map((user) => searchResults.push(user))
      setOpen(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div>
        <TextField
          id="standard-search"
          placeholder="search"
          type="search"
          variant="standard"
          inputRef={search}
          InputProps={{
            endAdornment: (
              <Button onClick={clickHandeler}>
                <SearchIcon />
              </Button>)
          }}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <label >
              {/* maybe search suggestions */}
              <h1>Users Found: {searchResults.map((u) =>
                (`${u.firstName} ${u.lastName} `))}
              </h1>
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}
export default SearchUser