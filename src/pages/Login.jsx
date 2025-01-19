import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState(""); // Thay đổi từ username sang email
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email: email,
        password: password,
      });

      // console.log(response)

      if (response.data && response.data.data.accept_token) {
        const token = response.data.data.accept_token;
        console.log(token)
        

        // Lưu token vào localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);

        setMessage("Đăng nhập thành công!");
        
        // Chuyển hướng đến trang Home
        navigate("/home");
      } else {
        setMessage("Phản hồi từ server không hợp lệ.");
      }
    } catch (error) {
      // Xử lý lỗi khi không thể đăng nhập
      if (error.response) {
        setMessage(error.response.data.message || "Đăng nhập thất bại.");
      } else {
        setMessage("Không thể kết nối đến server.");
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "200px" }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center">Đăng nhập</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-3"
                >
                  Đăng nhập
                </button>
              </form>
              {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
