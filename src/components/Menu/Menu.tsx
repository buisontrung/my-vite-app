import { Link } from "react-router-dom";
import { menu } from "../../data";
import "./Menu.scss";
import { useAuth } from "../AuthProvider/useAuth";
const Menu = () => {
    
    
    const { user } = useAuth();


    // Tiếp tục xử lý với user
    return (
        <div className="menu">
            {menu.map((item) => (
                <div className="item" key={item.id}>
                    <span className="title">{item.title}</span>
                    {item.listItems.map((link) => (
                        <Link className="listItem" to={`/${user?user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]:1}/${link.url}`} key={link.id}>
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
