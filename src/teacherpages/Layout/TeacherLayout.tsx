import Navbar from "../../components/Navbar/Navbar";

import Home from "../../pages/Home/Home";
import Footer from "../../components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import User from "../../pages/User/User";
import Class from "../../pages/Class/Class";
import Subject from "../../pages/Subject/Subject";
import Topic from "../../pages/Topic/Topic";
import { useAuth } from "../../components/AuthProvider/useAuth";
import Attendances from "../Attendances/Attendances";
import AttendancesClass from "../Attendances/AttendancesClass";
import Menu from "./Menu";

const TeacherLayout = () => {
  const { user } = useAuth();
  const isTeacher = user && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "TEACHER";
  
  return isTeacher ? (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menu-container">
          <Menu />
        </div>
        <div className="content-container">
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="users" element={<User />} />
            <Route path="lop-hoc" element={<Class />} />
            <Route path="mon-hoc" element={<Subject/>} />
            <Route path="chu-de" element={<Topic />} />
            <Route path="diem-danh" element={<Attendances  TeacherId = {user.Id}/>}/>
            <Route path="diem-danh-lop" element={<AttendancesClass />} />
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

export default TeacherLayout;
 