import Navbar from "../../components/Navbar/Navbar";


import Footer from "../../components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import User from "../../pages/User/User";
import Class from "../../pages/Class/Class";


import { useAuth } from "../../components/AuthProvider/useAuth";
// import Attendances from "../../teacherpages/Attendances/Attendances";
// import AttendancesClass from "../../teacherpages/Attendances/AttendancesClass";
import Menu from "./Menu";
import Student from "../pages/Student/Student";
import TienHoc from "../pages/Student/TienHoc";

const ParentLayout = () => {
  const { user } = useAuth();
  const isParent = user && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "PARENT";
  
  return isParent ? (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menu-container">
          <Menu />
        </div>
        <div className="content-container">
          <Routes>

            <Route path="users" element={<User />} />
            <Route path="lop-hoc" element={<Class />} />
            <Route path="student" element={<Student/>} />
            <Route path="tien-hoc" element={<TienHoc/>}/>
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

export default ParentLayout;
 