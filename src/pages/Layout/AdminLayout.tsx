import Navbar from "../../components/Navbar/Navbar";
import Menu from "../../components/Menu/Menu";
import Home from "../Home/Home";
import Footer from "../../components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import User from "../User/User";
import Class from "../Class/Class";
import Subject from "../Subject/Subject";
import Topic from "../Topic/Topic";
import { useAuth } from "../../components/AuthProvider/useAuth";
import AddStudent from "../Subject/AddStudent";
import OrderDetail from "../OderDetail/OrderDetai";
import Post from "../Post/Post";

const AdminLayout = () => {
  const { user } = useAuth();
  const isAdmin = user && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "ADMIN";
  
  return isAdmin ? (
    <div className="main">
      <Navbar />
      <div className="container-admin">
        <div className="menu-container">
          <Menu />
        </div>
        <div className="content-container">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="users" element={<User />} />
            <Route path="lop-hoc" element={<Class />} />
            <Route path="mon-hoc" element={<Subject />} />
            <Route path="chu-de" element={<Topic />} />
            <Route path="addstudent" element={<AddStudent/>}/>
            <Route path="order" element={<OrderDetail/>}/>
            <Route path="tin-tuc" element={<Post/>}/>
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div>
      <h1>Không có quyền truy cập</h1>
      {/* Thông báo khi người dùng không có quyền truy cập */}
    </div>
  );
}

export default AdminLayout;
 