import './Categories.scss'
import { Link } from 'react-router-dom'
const Menu = () => {
  return (
    
              <div className='categories'>
                <ul>
                  <li className="item"><Link to='/hoc-bai'>Học Bài</Link></li>
                  <li className="item"><Link to='/hoc-bai'>Hỏi bài </Link></li>
                  <li className="item"><Link to='/hoc-bai'>kiểm tra</Link></li>
                  <li className="item"><Link to='/hoc-bai'>Bài Viết</Link></li>
                  <li className="item"><Link to='/hoc-bai'>Về chúng tôi</Link></li>
                </ul>
              </div>
  )
}

export default Menu
