import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]); // Dữ liệu nhóm sau khi lọc
  const [groupUsers, setGroupUsers] = useState([]);
  const [courses, setCourses] = useState([]); // Danh sách khóa học
  const [selectedCourseId, setSelectedCourseId] = useState(""); // Khóa học được chọn
  const [error, setError] = useState(null);

  // Lấy danh sách nhóm
  const fetchGroups = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGroups(response.data.data);
      setFilteredGroups(response.data.data); // Hiển thị tất cả ban đầu
    } catch (err) {
      setError("Lỗi khi lấy dữ liệu nhóm!");
    }
  };

  // Lấy danh sách khóa học
  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data.data);
    } catch (err) {
      setError("Lỗi khi lấy danh sách khóa học!");
    }
  };

  // Lấy danh sách GroupUser
  const fetchGroupUsers = async () => {
    const email = localStorage.getItem("email");
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

  // Đăng ký nhóm
  const registerToGroup = async (email, groupId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        { email, group_id: groupId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Đăng ký nhóm thành công!");
      fetchGroupUsers();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Đã có lỗi xảy ra!");
      }
    }
  };

  // Xóa GroupUser
  const deleteGroupUser = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/group-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Xóa nhóm thành công!");
      setGroupUsers(groupUsers.filter((groupUser) => groupUser.id !== id));
    } catch (err) {
      alert("Lỗi khi xóa nhóm!");
    }
  };

  // Lọc nhóm theo khóa học
  const filterGroupsByCourse = (courseId) => {
    setSelectedCourseId(courseId);
    if (courseId === "") {
      setFilteredGroups(groups); // Hiển thị tất cả
    } else {
      setFilteredGroups(groups.filter((group) => group.course.id === parseInt(courseId)));
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchCourses();
    fetchGroupUsers();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4 px-5">
      <h1 className="text-center mb-4">Danh sách nhóm</h1>

      {/* Dropdown lọc khóa học */}
      <div className="mb-3">
        <label htmlFor="courseFilter" className="form-label">
          Lọc theo môn học:
        </label>
        <select
          id="courseFilter"
          className="form-select"
          value={selectedCourseId}
          onChange={(e) => filterGroupsByCourse(e.target.value)}
        >
          <option value="">Tất cả</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Bảng nhóm */}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Mã khóa học</th>
            <th>Tên khóa học</th>
            <th>Tên nhóm</th>
            <th>Thứ</th>
            <th>Buổi</th>
            <th>Giảng viên</th>
            <th>Phòng học</th>
            <th>Số SV tối đa</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredGroups.map((group, index) => (
            <tr key={group.id}>
              <td>{index + 1}</td>
              <td>{group.course.code}</td>
              <td>{group.course.name}</td>
              <td>{group.name}</td>
              <td>{group.day_of_week}</td>
              <td>{group.session}</td>
              <td>{group.teacher_name}</td>
              <td>{group.classroom}</td>
              <td>{group.max_students}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => registerToGroup(localStorage.getItem("email"), group.id)}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-center mb-4">Danh sách các nhóm học đã đăng ký</h1>
      
      {/* Bảng group-user */}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Mã khóa học</th>
            <th>Tên khóa học</th>
            <th>Nhóm</th>
            <th>Thứ</th>
            <th>Buổi</th>
            <th>Giảng viên</th>
            <th>Thời gian đăng kí</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {groupUsers.map((groupUser, index) => (
            <tr key={groupUser.id}>
              <td>{index + 1}</td>
              <td>{groupUser.group.course.code}</td>
              <td>{groupUser.group.course.name}</td>
              <td>{groupUser.group.name}</td>
              <td>{groupUser.group.day_of_week}</td>
              <td>{groupUser.group.session}</td>
              <td>{groupUser.group.teacher_name}</td>
              <td>
                {new Date(groupUser.created_at)
                  .toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
              </td>              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteGroupUser(groupUser.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
