import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider, UserContext } from './backend/context/UserContext'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider >
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
