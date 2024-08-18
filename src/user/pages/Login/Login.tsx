import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../components/AuthProvider/useAuth'; // Đảm bảo đường dẫn chính xác
import './Login.scss';
import { jwtDecode } from 'jwt-decode';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';



interface FacebookResponse {
  email?: string;
  id?: string; // Đảm bảo id luôn có giá trị
  name?: string;
  picture?: {
    data?: {
      height?: number;
      width?: string; // Thay đổi kiểu nếu cần
      is_silhouette?: boolean;
      url?: string;
    };
  };
}
interface User {
  Id: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
  "JWTID"?: string;
  "FirstName"?: string;
  "LastName"?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
  exp: number | undefined;
  iss: string;
  aud: string;
}


// Initialize Firebase


const Login = () => {
  const { setUser } = useAuth(); // Sử dụng setUser từ context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://localhost:7034/api/Auth/login', { username, password });
      const token = response.data;
      localStorage.setItem('token', token);

      // Cập nhật người dùng từ token
      const decodedUser = jwtDecode(token) as User;
      setUser(decodedUser); // Cập nhật thông tin người dùng trong context

      // Mark user as logged in
      navigate("/")
    } catch (error) {
      setError('Đăng nhập không thành công. Vui lòng thử lại.');
    }
  };
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;


    try {
      const response = await axios.post("https://localhost:7034/api/Auth/signin-google", {
        credential: token, // Gửi token đến backend
        clientId: credentialResponse.clientId,
        selectBy: credentialResponse.select_by
      });

      const backendToken = response.data; // Đảm bảo bạn nhận đúng trường token
      localStorage.setItem('token', backendToken)
      // Cập nhật người dùng từ token
      const decodedUser = jwtDecode(backendToken) as User;
      setUser(decodedUser); // Cập nhật thông tin người dùng trong context
      navigate("/")
      // Mark user as logged in

      // Điều hướng đến trang chủ

    } catch (error) {
      console.log(error);
      setError('Đăng nhập với Google không thành công.');
    }

  };
  const handleFaceBookSuccess = async (response:FacebookResponse) => {
    // Kiểm tra xem các thuộc tính cần thiết có tồn tại không
    console.log(response);
    try {
      // Gửi token đến backend
      const res = await axios.post("https://localhost:7034/api/Auth/signin-facebook", {
        // Gửi accessToken từ Facebook
        accessToken:response
      });

      const backendToken = res.data.token; // Đảm bảo bạn nhận đúng trường token từ backend
      localStorage.setItem('token', backendToken);

      // Cập nhật người dùng từ token
      const decodedUser = jwtDecode(backendToken) as User;
      setUser(decodedUser); // Cập nhật thông tin người dùng trong context

      // Điều hướng đến trang chủ
      navigate("/");
    } catch (error) {
      console.error(error);
      setError('Đăng nhập với Facebook không thành công.');
    }
  };
  // Redirect to home page if logged in

  // Define the responseFacebook function


  return (
    <section className="h-100 gradient-form login_bg">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img className="logo_login" src="/logo-hvktmm.png" alt="logo" />
                      <h4 className="mt-1 mb-5 pb-1">We are ST EDU</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p>Please login to your account</p>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Tên đăng nhập"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form2Example11">Username</label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          placeholder="Mật khẩu"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form2Example22">Password</label>
                      </div>

                      <div className="text-center pt-1 mb-2 pb-1">
                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-block fa-lg gradient-custom-2 mb-3 w-100 abc">
                          Log in
                        </button>
                        <a className="text-muted" href="#!">Forgot password?</a>
                      </div>
                      <div className="text-center pt-1 mb-1 pb-1">
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={() => {
                            console.log('Login Failed');
                            setError('Đăng nhập với Google không thành công.');

                          }}
                        />;
                      </div>
                      <div className="text-center  mb-5 d-flex" style={{backgroundColor:"#1877f2",borderRadius:"5px"}}>
                        <img src='https://lucas.vn/wp-content/uploads/2023/08/logo-fb.webp' style={{width:"40px", height:"40px",marginLeft:"10px"}}/>
                        <FacebookLogin  className='btn btn-block fa-lg mg-0 pd-0 w-100' style={{ color:"#fff"}}
                          appId="1689679375169234"
                          
                          onFail={(error) => {
                            console.log('Login Failed!', error);
                          }}
                          onProfileSuccess={(response) => {
                            handleFaceBookSuccess(response);
                          }}
                        />
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <a href='/dang-ki' type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-danger">
                          Create new
                        </a>
                      </div>

                      {error && <p className="text-danger">{error}</p>}
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Học nữa học mãi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
