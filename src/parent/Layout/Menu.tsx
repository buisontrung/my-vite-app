import { Link } from "react-router-dom";
import { menuParent} from "../../data";
import "../../components/Menu/Menu.scss";
const Menu = () => {

    return (
        <div className="menu">
            {menuParent.map((item) => (
                <div className="item" key={item.id}>
                    <span className="title">{item.title}</span>
                    {item.listItems.map((link) => (
                        <Link className="listItem" to={`/parent/${link.url}`} key={link.id}>
                            <img src={"/"+link.icon} alt={link.icon} />
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );

    
};

export default Menu;
