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
    <div className="p-1 bg-gray-100 min-h-screen w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statususer
          .filter((el) => el.userID === user.user_id)
          .map((el, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300"
            >
              <a className="text-center text-xl text-white bg-gradient-to-r from-slate-500 to-slate-700 w-full block mb-3 py-2 rounded-md font-semibold transform transition duration-500 hover:from-slate-700 hover:to-slate-500">
                <marquee scrollamount="5">ข้อมูลการจอง</marquee>
              </a>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                ชื่อผู้จอง: {el.user.username}
              </h3>
              <p className="mb-1 text-gray-600">
                <span className="font-semibold">ชื่อผู้เข้ารับบริการ:</span> {el.guest.nickname}
              </p>
              <p className="mb-1 text-gray-600">
                <span className="font-semibold">อายุผู้รับบริการ:</span> {el.guest.age_range}
              </p>
              <p className="mb-1 text-gray-600">
                <span className="font-semibold">ราคา: </span> {el.hairstyle.hairstyle_price} ฿
              </p>
              <p className="mb-1 text-gray-600">
                <span className="font-semibold">วันเวลาที่จอง:</span> {new Date(el.datetime).toLocaleString('th-TH')}
              </p>
              <p className="mb-1 text-gray-600">
                <span className="font-semibold">ทรงผมที่จอง:</span> {el.hairstyle.hairstyle_name}
              </p>
              <figure className="mb-3">
                <img
                  src={el.hairstyle.hairstyle_img}
                  alt="Hairstyle"
                  className="rounded-lg w-48 object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                />
              </figure>
              <p
                className={`mb-3 text-lg font-semibold ${el.status === 0 ? "text-yellow-600" : el.status === 1 ? "text-green-700" : "text-red-700"
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
  )
}
