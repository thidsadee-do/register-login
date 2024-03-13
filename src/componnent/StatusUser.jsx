import axios from "axios";
import { useEffect, useState } from "react";
import userAuth from "../hooks/userAuth";

export default function StatusUser() {
  const { user } = userAuth();
  const [statususer, setStatusUser] = useState([]);

  function formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", options);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8889/admin/statususer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatusUser(response.data.StatusUser);
        console.log(response.data.StatusUser);
        console.log(statususer)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setStatusUser]);

  return (
    <div>
      <div className="divider divider-warning">สถานะการจองคิว</div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ชื่อผู้จอง</th>
              <th>ชื่อผู้ตัดผม</th>
              <th>อายุ</th>
              <th>ทรงผมที่จอง</th>
              <th>ราคา</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {statusbar && statususer.filter( el => el.userID === user.user_id).map( (el, number ) => (
              <tr key={number +1}>
                <td key={number + 1}>{el.user.username}</td>
                <td>{el.guest.nickname}</td>
                <td>{el.guest.age_range}</td>
                <td>{el.hairstyle.hairstyle_name}</td>
                <td>{el.hairstyle.hairstyle_price}</td>
                <td>{el.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

}