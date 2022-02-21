import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Avatar } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import axios from 'axios';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { UserContext } from '../../backend/context/UserContext'
import UploadPost from '../Components/UploadPost'
import logo from '../img/Logo.png'
import SearchUser from "./Search"
import '../dist/Topbar.css'



export default function Topbar({ ColorModeContext }) {
  const { user, dispatch } = useContext(UserContext)
  const theme = useTheme();
  const navigate = useNavigate()
  const colorMode = useContext(ColorModeContext);

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

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
  const disconnect = () => {
    dispatch({ type: "DISCONNECTED_START" })
    navigate('/login', { replace: true })

  }
  return (
    <div className="FeedHeader">

      < div className="left-side">
        <div className="Logo">
          <Link to="/home" >
            <img className="img" src={logo} alt="Photo booth" />
          </Link>
        </div>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.primary',
            borderRadius: 1,
            p: 3,
          }}
        >
          {theme.palette.mode} mode
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </div>

      <div className="center">
        <div className="searchBar">
          <SearchUser />
        </div>
      </div>

      <div className="left-side">
        <div className="user-interface">
          <UploadPost />
          <Button>
            <Link to={`/profile/${user.firstName}`} style={{ textDecoration: 'none', color: 'inherit' }} >
              <Avatar src={`/backend/uploads/${user.profilePicture}`} {...stringAvatar(user.firstName + ' ' + user.lastName)} />
            </Link>
          </Button>
          <Button onClick={disconnect}>
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}
