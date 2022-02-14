import { useState } from 'react';
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import '../dist/SearchResults.css'

function SearchResults({ result }) {
  return (
    <div className="user">
      <Link to={`/profile/${result.firstName}`} style={{ textDecoration: 'none' }}>
        <Avatar className="Avatar" alt={`${result.firstName} ${result.lastName}`} src={`/backend/uploads/${result.profilePicture}`} sx={{ width: 150, height: 150 }} />
        {`${result.firstName} ${result.lastName}`}
      </Link>
    </div>
  )
}
export default SearchResults;