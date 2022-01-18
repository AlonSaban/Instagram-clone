import { Navigate, Routes, Route } from 'react-router-dom';
import { useState, useMemo, useContext } from 'react'
import Login from './frontend/src/pages/Login'
import Register from './frontend/src/pages/Register'
import Feed from './frontend/src/Components/Feed'
import Home from './frontend/src/pages/Home'
import Profile from './frontend/src/pages/Profile'
import { UserContextProvider, UserContext } from './backend/context/UserContext'
import './App.css'

function App() {
  const { user } = useContext(UserContext)
  return (
    <div className="App">
      <UserContextProvider >
        <Routes>
          <Route exact path="/" element={user ? (<Navigate path="/" to="/home" />) : (<Navigate path="/" to="login" />)} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/feed" element={<Feed />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </UserContextProvider>
    </div >
  )
}

export default App