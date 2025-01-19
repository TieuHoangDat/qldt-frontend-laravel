import React, { useEffect, useState } from "react";
import axios from "axios";

const TimeTable = () => {
  const [groupUsers, setGroupUsers] = useState([]); // Dữ liệu group-user
  const [error, setError] = useState(null);

  // Hàm fetch dữ liệu group-user từ API
  const fetchGroupUsers = async () => {
    const email = localStorage.getItem("email"); // Lấy email từ localStorage
    const token = localStorage.getItem("token");
    if (email) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/group-user`,
          { email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGroupUsers(response.data.data);
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu group-user!");
      }
    }
  };

  // Gọi API khi component render lần đầu
  useEffect(() => {
    fetchGroupUsers();
  }, []);

  // Tạo cấu trúc thời khóa biểu (5 session x 7 ngày)
  const timetable = Array.from({ length: 5 }, () => Array(7).fill(null));

  // Điền dữ liệu vào bảng thời khóa biểu
  groupUsers.forEach((groupUser) => {
    const { session, day_of_week, classroom, teacher_name } = groupUser.group;
    const { code, name } = groupUser.group.course;

    // Ghi dữ liệu vào đúng vị trí (session - 1 và day_of_week - 2)
    if (session >= 1 && session <= 5 && day_of_week >= 2 && day_of_week <= 8) {
      timetable[session - 1][day_of_week - 2] = (
        <div>
          <strong>{name}</strong> ({code})
          <br />
          <em>{classroom}</em> - {teacher_name}
        </div>
      );
    }
  });

  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4 px-5">
      <h1 className="text-center mb-4">Thời khóa biểu</h1>

      {/* Bảng thời khóa biểu */}
      <table className="table table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th>Kíp/Thứ</th>
            <th>Thứ 2</th>
            <th>Thứ 3</th>
            <th>Thứ 4</th>
            <th>Thứ 5</th>
            <th>Thứ 6</th>
            <th>Thứ 7</th>
            <th>Chủ Nhật</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((row, sessionIndex) => (
            <tr key={sessionIndex}>
              <td><strong>Kíp {sessionIndex + 1}</strong></td>
              {row.map((cell, dayIndex) => (
                <td key={dayIndex}>{cell || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
