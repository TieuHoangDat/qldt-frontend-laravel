import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('email'); // Lấy tên người dùng từ localStorage

  const handleLogout = () => {
    localStorage.removeItem('email'); // Xóa tên người dùng khỏi localStorage
    navigate('/login'); // Chuyển hướng về trang Login
  };

  return (
    <div className="p-3 border-end vh-100 bg-white">
      <div className="text-center mb-4">
        <img
          src="111.png" // Thay bằng đường dẫn hình ảnh của người dùng
          alt="User"
          className="rounded-circle mb-2 shadow"
          width="80"
        />
        <h5 className="mt-2">Hello 👋</h5>
        <p className="text-muted">{username || 'Người dùng'}</p> {/* Hiển thị tên người dùng */}
      </div>

      <ListGroup variant="flush">
        <ListGroupItem action href="/home" className="py-3">
          <i className="bi bi-house-door-fill me-2"></i> Đăng ký tín chỉ
        </ListGroupItem>
        <ListGroupItem action href="/grade" className="py-3">
          <i className="bi bi-bar-chart-fill me-2"></i> Xem điểm
        </ListGroupItem>
        <ListGroupItem action href="/time-table" className="py-3">
          <i className="bi bi-stars me-2"></i> Xem thời khoá biểu
        </ListGroupItem>
        <ListGroupItem action href="/introduce" className="py-3">
          <i className="bi bi-envelope-fill me-2"></i> Giới thiệu
        </ListGroupItem>
        <ListGroupItem action onClick={handleLogout} className="py-3 text-danger">
          <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
