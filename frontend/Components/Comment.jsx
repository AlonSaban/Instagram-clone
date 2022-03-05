import '../dist/comments.css'

function Comment({ post }) {
  const comment = post.join('\t\n');

  return (
    <div className="Comments">
      <p>
        {comment}
      </p>
    </div>
  )
}
export default Comment