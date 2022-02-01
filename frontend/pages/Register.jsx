import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { Card, CardHeader, CardContent, CircularProgress, CardActions, TextField, Button } from '@mui/material'
import axios from 'axios'
import '../dist/Register.css'

const Flex = styled.div`
  flex:1;
  display:flex;
  height: 100%;
  justify-content:center;
  align-items:center;
`;
const RegisterCard = styled(Card)`
  padding:20px 30px 23px 33px;
  width: 600px;
`;
const RedirectCard = styled(Card)`
  display:flex;
  padding:30px 30px 30px 30px;
  margin-top:30px;
  align-items:center;
  align-content:center;
  justify-content:center;
  width:900px;
`;
const RegisterContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;
const RegisterActions = styled(CardActions)`
  display: flex;
  justify-content: flex-end;
`;
export default function Register() {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const password = useRef()
  const description = useRef()
  const navigate = useNavigate()

  const registerUser = async event => {
    event.preventDefault();
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
      description: description.current.value
    }
    try {
      await axios.post('http://localhost:4000/api/register', user)
      navigate("/login", { replace: true })
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <Flex>
      <form className="form">
        <RegisterCard>
          <CardHeader title="Register" />
          <RegisterContent>
            <div className="FieldsWrapper">
              <div>
                <TextField
                  style={{ width: "240px", margin: "10px" }}
                  className="Field"
                  label="first name"
                  inputRef={firstName}
                  type="name"
                  required
                />
                <TextField
                  style={{ width: "240px", margin: "10px" }}
                  className="Field"
                  label="last name"
                  inputRef={lastName}
                  type="name"
                  required
                />
                <TextField
                  style={{ width: "240px", margin: "10px" }}
                  className="Field"
                  label="Password"
                  inputRef={password}
                  type="password"
                  required
                />
                <TextField
                  style={{ width: "240px", marginTop: "10px" }}
                  className="Field"
                  label="Email"
                  inputRef={email}
                  type="email"
                  required
                />
              </div>
              <TextField
                style={{ padding: "10px" }}
                className="multiline"
                multiline
                rows={10}
                label="write something about yourself, dont worry its not mandatory"
                inputRef={description}
                type="text"
              />
            </div>
            <RegisterActions className="button">
              <Button type="submit" value="Register" style={{ padding: '10px' }} variant="contained" onClick={registerUser}>
                {/* {isFetching ? <CircularProgress color="inherit" size="10px" /> : "register"} */}
                Register
              </Button>
            </RegisterActions>
          </RegisterContent>
        </RegisterCard>
        <RedirectCard> Have an account?
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>  <Button>Log in</Button></Link>
        </RedirectCard>
      </form>
    </Flex>
  )
}