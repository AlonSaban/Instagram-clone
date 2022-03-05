import Avatar from '@mui/material/Avatar'
import '../dist/comments.css'

function Comment({ post }) {
  const data = [];

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
  // console.count("count")

  for (const element of post.comments) {
    data.push(element)
  }

  const commentList = data.map((c) => (
    <li key={c.toString()}>
      {
        <Avatar className="Avatar" key={getRandomInt(80)} src={`/backend/uploads/${c[0]}`} />
      }
      {c[1]}
    </li>
  ))

  return (
    <div className="content">
      <div className="comments">
        {commentList}
      </div>
    </div>
  )
}
export default Comment