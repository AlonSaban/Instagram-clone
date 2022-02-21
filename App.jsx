import { Navigate, Routes, Route } from 'react-router-dom';
import { useState, useMemo, useContext } from 'react'
import Login from './frontend/pages/Login'
import Register from './frontend/pages/Register'
import Feed from './frontend/Components/Feed'
import Home from './frontend/pages/Home'
import Profile from './frontend/pages/Profile'
import { UserContextProvider, UserContext } from './backend/context/UserContext'
import PageWrapper from './frontend/pages/PageWrapper';
import './App.css'

function App() {
  const { user } = useContext(UserContext)

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" to="login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/feed" element={user ? <Feed /> : <Login />} />
        <Route exact path="/home" element={user ? <PageWrapper /> : <Login />} />
        <Route path="/profile/:username" element={user ? <Profile /> : <Login />} />
      </Routes>
    </div >
  )
}

export default App