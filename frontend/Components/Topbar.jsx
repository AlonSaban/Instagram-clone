import React, { useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import { TextField, Button, Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { UserContext } from '../../backend/context/UserContext'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import axios from 'axios'
import UploadPost from '../Components/UploadPost'
import logo from '../img/Logo.png'
import SearchUser from "./Search"
import '../dist/Topbar.css'



export default function Topbar({ ColorModeContext }) {
  const user = useContext(UserContext).user
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const search = useRef()

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
              <Avatar src={user.profilePicture} {...stringAvatar(user.firstName + ' ' + user.lastName)} />
            </Link>
          </Button>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Log out</Link>
        </div>
      </div>
    </div>
  )
}
