import Avatar from '@mui/material/Avatar'
import '../dist/comments.css'

function Comment({ post }) {
  // console.count(post)
  const comments = [];
  const profilePic = [];

  for (const element of post.comments) {
    comments.push(element[1])
    profilePic.push(element[0])
  }
  const listItems = comments.map((comment) =>
    <li key={comment.toString()}>
      {comment}
    </li>
  );

  // console.log(comments);

  return (
    <div className="content">
      <div className="comments">
        {listItems}
      </div>
      <div className="profile-pic">
        {profilePic.map((p) => (
          <Avatar className="Avatar" src={`/backend/uploads/${p}`} />
        ))}
      </div>
    </div>
  )
}
export default Comment