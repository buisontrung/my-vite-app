import { useAuth } from '../AuthProvider/useAuth'
import './Navbar.scss'
const Navbar = () =>{
    const {user,logout} = useAuth();
    return(
        <div className="navbar-admin">
            <div className="logo">
                <img src="/logo-hvktmm.png"/>
                <span>Trung buif</span>
            </div>
            <div className="icons">
                <img src="/search.svg"/>
                <img src="/app.svg"/>
                <img src="/expand.svg"/>
                <div className="notification">
                    <img src="/notifications.svg"/>
                    <span>1</span>
                </div>
                <div className="user">
                    <img src="https://th.bing.com/th/id/R.c4fa64a0dd72b2cb5788580fb4c73b3f?rik=RFD3kr8vkVSyyw&riu=http%3a%2f%2fimg3.wikia.nocookie.net%2f__cb20131117065341%2fvsbattles%2fimages%2f3%2f35%2fDoraemon.jpg&ehk=751zte20TO3m5bJnCMxHKSBWMyMM%2fYD5XLOHn5rcsNM%3d&risl=&pid=ImgRaw&r=0"/>
                    <span>{user?.FirstName} {user?.LastName}</span>
                    <span onClick={logout}>Logout</span>
                </div>
                <img src="/setting.svg"/>
            </div>
        </div>
    )
}
export default Navbar