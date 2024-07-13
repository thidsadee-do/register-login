import axios from "axios";
import { useEffect, useState } from "react";
import userAuth from "../hooks/userAuth";

export default function StatusUser() {
  const { user, refetch } = userAuth();
  const [statususer, setStatusUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found.");
        }
        const response = await axios.get("http://localhost:8889/admin/statususer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatusUser(response.data.StatusUser);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or show error message to the user
      }
    };
    fetchData();
  }, [refetch]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="divider divider-warning mb-8 text-3xl font-bold text-center">สถานะการจองคิว</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {statususer
          .filter((el) => el.userID === user.user_id)
          .map((el, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-lg transform transition duration-500 hover:scale-105 hover:bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300"
            >
              <a className="text-center text-2xl text-white bg-gradient-to-r from-slate-500 to-slate-700 w-full block mb-4 py-3 rounded-md font-semibold transform transition duration-500 hover:from-slate-700 hover:to-slate-500">
                ข้อมูลการจอง
              </a>
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                ชื่อผู้จอง: {el.user.username}
              </h3>
              <p className="mb-2 text-gray-600">
                <span className="font-semibold">ชื่อผู้เข้ารับบริการ:</span> {el.guest.nickname}
              </p>
              <p className="mb-2 text-gray-600">
                <span className="font-semibold">อายุผู้รับบริการ:</span> {el.guest.age_range}
              </p>
              <p className="mb-2 text-gray-600">
                <span className="font-semibold">ราคา: </span> {el.hairstyle.hairstyle_price} ฿
              </p>
              <p className="mb-2 text-gray-600">
                <span className="font-semibold">วันเวลาที่จอง:</span> {new Date(el.datetime).toLocaleString('th-TH')}
              </p>
              <p className="mb-2 text-gray-600">
                <span className="font-semibold">ทรงผมที่จอง:</span> {el.hairstyle.hairstyle_name}
              </p>
              <figure className="mb-4">
                <img
                  src={el.hairstyle.hairstyle_img}
                  alt="Hairstyle"
                  className="rounded-lg w-full object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                />
              </figure>
              <p
                className={`mb-4 text-xl font-semibold ${el.status === 0 ? "text-yellow-600" : el.status === 1 ? "text-green-700" : "text-red-700"
                  }`}
              >
                สถานะ: {el.status === 0 ? "รอยืนยัน" : el.status === 1 ? "ยืนยันการจองแล้ว" : "ยกเลิก"}
              </p>
              <div className="flex justify-end">
                <a
                  className="btn btn-outline btn-xs text-slate-500 hover:text-slate-700 border-slate-500 hover:border-slate-700 rounded-full transition duration-300 transform hover:scale-105"
                  href="/AboutMe"
                >
                  ดูแผนที่
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

}
