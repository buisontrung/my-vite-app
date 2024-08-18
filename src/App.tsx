import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminLayout from "./pages/Layout/AdminLayout";
import "./global.scss"

import { AuthProvider } from "./components/AuthProvider/AuthContext";
import TeacherLayout from "./teacherpages/Layout/TeacherLayout";
import UserLayout from "./user/pages/UserLayout";
import ParentLayout from "./parent/Layout/Parent";
import Login from "./user/pages/Login/Login";
import Register from "./user/pages/Login/Register";
import NewsDetail from "./user/pages/News/NewsDetail";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/teacher/*" element={<TeacherLayout />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dang-ki" element={<Register />} />
          <Route path="/parent/*" element={<ParentLayout/>}/>
          <Route path="/*" element ={<UserLayout />} />
          <Route path="/tin-tuc/:id" element={<NewsDetail/>}/>
          {/* Add other routes here */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
