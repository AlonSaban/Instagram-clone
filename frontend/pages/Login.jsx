import React, { useRef, useContext, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardActions, TextField, Button, CircularProgress, } from '@mui/material'
import { UserContext } from '../../backend/context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios'
import '../dist/Login.css'


const LoginCard = styled(Card)`
  padding:30px 30px 25px 30px;
  margin-bottom: 150px;
`;
const RedirectCard = styled(Card)`
  display: flex;
  padding:20px 0px 25px 0px;
  /* margin-top: 140px; */
  width:450px;
  align-items:center;
  align-content:center;
  justify-content:center;
`;
const LoginContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;
const LoginActions = styled(CardActions)`
  display: flex;
  justify-content: flex-end;
`;

export default function Login() {
  const { user: currentUser } = useContext(UserContext)
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate('/home', { replace: true })
    }
  }, [])

  const loginUser = e => {
    e.preventDefault();
    if (!currentUser) {
      loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    }
  }

  const loginCall = async (user, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("http://localhost:4000/api/login", user)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.send })
      navigate('/home', { replace: true })
    } catch (err) {
      console.error(err);
      dispatch({ type: "LOGIN_FAILURE", payload: err })
    }
  }

  return (
    <div className="Flex">
      <form className="form" >
        <LoginCard>
          <CardHeader title="Login" />
          <LoginContent>
            <div className="FieldsWrapper">
              <TextField
                style={{ width: "240px", marginTop: "10px", paddingBottom: "14px" }}
                className="Field"
                label="Email"
                inputRef={email}
                type="email"
                required
              />
              <TextField
                style={{ width: "240px", margin: "10px" }}
                className="Field"
                label="Password"
                minLength="8"
                inputRef={password}
                // type="password"
                required
              >
              </TextField>
            </div>
            <LoginActions>
              <Button className="button" type="submit" value="Login" style={{ width: '91px', height: '46px', padding: '10px' }} variant="contained" onClick={loginUser}>
                {isFetching ? (<CircularProgress color="inherit" size="25px" />) : ("Log In")}
              </Button>
            </LoginActions>
          </LoginContent>
        </LoginCard>
        <RedirectCard>
          Don't have an account?
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/register">
            <Button className="button" type="submit">
              Sign up
            </Button>
          </Link >
        </RedirectCard>
      </form >
    </div >
  )
}