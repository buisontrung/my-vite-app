import { Link } from "react-router-dom";
import { menuTeacher} from "../../data";
import "../../components/Menu/Menu.scss";


const Menu = () => {
    
    

    

    // Tiếp tục xử lý với user
    return (
        <div className="menu">
            {menuTeacher.map((item) => (
                <div className="item" key={item.id}>
                    <span className="title">{item.title}</span>
                    {item.listItems.map((link) => (
                        <Link className="listItem" to={`/teacher/${link.url}`} key={link.id}>
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
