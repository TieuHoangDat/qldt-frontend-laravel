import React, { useEffect, useState } from "react";
import axios from "axios";

// Hàm chuyển đổi điểm hệ 10 sang hệ chữ
const convertGradeToLetter = (grade) => {
  if (grade >= 9) return 'A+';
  if (grade >= 8.5) return 'A';
  if (grade >= 8) return 'B+';
  if (grade >= 7) return 'B';
  if (grade >= 6.5) return 'C+';
  if (grade >= 5.5) return 'C';
  if (grade >= 5) return 'D+';
  if (grade >= 4) return 'D';
  return 'F';
};

// Hàm chuyển đổi điểm hệ 10 sang hệ 4
const convertGradeTo4Scale = (grade) => {
  if (grade >= 9) return 4.0;
  if (grade >= 8.5) return 3.7;
  if (grade >= 8) return 3.3;
  if (grade >= 7) return 3.0;
  if (grade >= 6.5) return 2.5;
  if (grade >= 5.5) return 2.0;
  if (grade >= 5) return 1.5;
  if (grade >= 4) return 1.0;
  return 0.0;
};

const Grade = () => {
  const [groupUsers, setGroupUsers] = useState([]); // Dữ liệu group-user
  const [error, setError] = useState(null);
  const [totalCredits, setTotalCredits] = useState(0); // Tổng số tín chỉ
  const [gpa, setGpa] = useState(0); // GPA

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

  // Tính tổng số tín chỉ và GPA
  useEffect(() => {
    fetchGroupUsers();
  }, []);

  useEffect(() => {
    let totalCredits = 0;
    let weightedGradeSum = 0;
    
    groupUsers.forEach(groupUser => {
      const grade = parseFloat(groupUser.grade);
      const credits = groupUser.group.course.num_credit;

      totalCredits += credits;
      weightedGradeSum += convertGradeTo4Scale(grade) * credits;
    });

    setTotalCredits(totalCredits);
    if (totalCredits > 0) {
      setGpa(weightedGradeSum / totalCredits);
    } else {
      setGpa(0);
    }
  }, [groupUsers]);

  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4 px-5">
      <h1 className="text-center mb-4">Danh sách GroupUser</h1>

      {/* Bảng group-user */}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Mã khóa học</th>
            <th>Tên khóa học</th>
            <th>Nhóm</th>
            <th>Số tín chỉ</th>
            <th>Điểm hệ 10</th>
            <th>Điểm hệ chữ</th>
            <th>Điểm hệ 4</th>
          </tr>
        </thead>
        <tbody>
          {groupUsers.map((groupUser, index) => (
            <tr key={groupUser.id}>
              <td>{index + 1}</td>
              <td>{groupUser.group.course.code}</td>
              <td>{groupUser.group.course.name}</td>
              <td>{groupUser.group.name}</td>
              <td>{groupUser.group.course.num_credit}</td>
              <td>{groupUser.grade}</td>
              <td>{convertGradeToLetter(groupUser.grade)}</td>
              <td>{convertGradeTo4Scale(groupUser.grade)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hiển thị tổng số tín chỉ và GPA */}
      <div className="text-center mt-4">
        <h4>Tổng số tín chỉ: {totalCredits}</h4>
        <h4>GPA: {gpa.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default Grade;
