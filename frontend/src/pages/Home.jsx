import Feed from '../Components/Feed'
import Topbar from '../Components/Topbar'
import '../dist/Home.css'

export default function Home() {

  return (
    <div>
      <Topbar username={"alon"} />
      <div className="container">
        <Feed username={null} />
      </div>
    </div>
  )
}