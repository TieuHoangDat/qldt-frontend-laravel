import React from 'react';

const Introduce = () => {
  return (

    <div className="row px-5 py-5">
        {/* Introduce */}
        <h3>Đề tài</h3>
        <p>Website quản lý đào tạo</p>
        <p>Lấy cảm hứng từ trang quản lý đào tạo của PTIT</p>
        <h3>Thành viên</h3>
        <p>Tiêu Hoàng Đạt</p>
        <h3>Công nghệ sử dụng</h3>
        <p>- Backend: laravel</p>
        <p>- Database: mysql</p>
        <p>- Frontend: react</p>
        <h3>Các chức năng chính</h3>
        <p>- Đăng nhập, đăng xuất</p>
        <p>- Đăng kí tín chỉ</p>
        <p>- Xem thời khoá biểu</p>
        <p>- Xem điểm</p>
        <h3>Deploy (free)</h3>
        <p>- laravel: railway</p>
        <p>- mysql: railway</p>
        <p>- react: vercel</p>
    </div>
  );
};

export default Introduce;
