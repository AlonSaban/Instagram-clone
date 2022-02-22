import { useRef, useContext, useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent } from '@mui/material';
import { UserContext } from '../../backend/context/UserContext'
import SearchIcon from '@mui/icons-material/Search';
import SearchResults from './SearchResults'
import axios from 'axios';
import '../dist/Search.css'


function SearchUser() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  let [searchResultsList, setSearchResultsList] = useState([]);
  const search = useRef()

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
      setSearchResultsList(res.data);
      setOpen(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={clickHandeler}>
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
        </form>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <label className="users">
              {searchResultsList.map((r) => (
                <SearchResults key={r._id} result={r} />
              ))}
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}
export default SearchUser