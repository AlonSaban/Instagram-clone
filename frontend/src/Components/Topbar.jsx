import React, { useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Switch, Grid, Typography, Paper } from "@material-ui/core"
import { TextField, Button, Avatar } from '@mui/material'
import { green, purple } from '@mui/material/colors'
import styled from 'styled-components'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { UserContext } from '../../../backend/context/UserContext'
import UploadPost from '../Components/UploadPost'
import logo from '../img/logo.png'
import '../dist/Topbar.css'

// const Head = styled.div`
//   background-color: darkMode ? "dark" : "light";
// `;

export default function Topbar({ theme }) {
  const user = useContext(UserContext).user
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
    <div>
      <div className="FeedHeader">
        <div className="Logo">
          <Link to="/home" >
            <img className="img" src={logo} alt="Photo booth" />
          </Link>
        </div>
        <div>
          <TextField
            id="standard-search"
            placeholder="search"
            type="search"
            variant="standard"
          />
        </div>
        <div className="user-interface">
          <UploadPost />
          <Button>
            <Link to={`/profile/${user.firstName}`} >
              <Avatar src={user.profilePicture} {...stringAvatar(user.firstName + ' ' + user.lastName)} />
            </Link>
          </Button>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Log out</Link>
        </div>
      </div>
    </div>
  )
}
