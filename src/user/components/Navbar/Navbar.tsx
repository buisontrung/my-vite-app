
import { useAuth } from "../../../components/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom"; // Để sử dụng redirect sau khi đăng xuất
import "./Navbar.scss";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Sử dụng navigate để redirect

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect về trang chính sau khi đăng xuất
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">ST EDU</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">TRANG CHỦ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/khoa-hoc">KHÓA HỌC</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/tin-tuc">BÀI VIẾT</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">TRỢ GIÚP</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">VỀ CHÚNG TÔI</a>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <ul className="navbar-nav navbar-auth me-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Hello, {user.FirstName}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>ĐĂNG XUẤT</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/dang-nhap">ĐĂNG NHẬP</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/dang-ki">ĐĂNG KÝ</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
