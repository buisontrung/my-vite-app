
import { Link } from 'react-router-dom'
import { menuuser } from '../../../data'
import './Menu.scss'
const Menu = () => {
  return (
    <div>
      <div className="menu">
            {menuuser.map((item) => (
                <div className="item" key={item.id}>
                    
                    {
                        <Link className="listItem" to ={`${item.url}`} key={item.id}>
                            <img src={"/"+item.icon} alt={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    }
                </div>
            ))}
        </div>
    </div>
  )
}

export default Menu
