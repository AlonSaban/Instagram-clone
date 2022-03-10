import { useMemo } from 'react'
import Avatar from '@mui/material/Avatar'
import '../dist/comments.css'

function Comment({ post }) {
  const data = [];

  // console.count("count")

  for (const element of post.comments) {
    data.push(element)
  }

  const commentList = useMemo(() => data.map((c) => (
    <li key={c.toString()}>
      {
        <Avatar className="Avatar" key={Math.random()} src={`/backend/uploads/${c[0]}`} />
      }
      {c[1]}
    </li>
  )), [data])

  return (
    <div className="content">
      <div className="comments">
        {commentList}
      </div>
    </div>
  )
}
export default Comment