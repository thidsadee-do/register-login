import axios from "axios";
import { useEffect, useState } from "react";
import userAuth from "../hooks/userAuth";

export default function StatusUser() {
  const { user, refetch } = userAuth();
  const [statususer, setStatusUser] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(""); // State for selected booking time

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

  const handleBookingChange = (event) => {
    setSelectedBooking(event.target.value);
  };

  return (
    <div>
      <div className="col-span-2 lg:col-span-1 ">
        <select
          className="select-ghost bg-white h-10 rounded-full text-sm focus:outline-none border border-gray-300 shadow-inner w-full"
          value={selectedBooking}
          onChange={handleBookingChange}
        >
          <option value="">เลือกวันเวลาที่จอง</option>
          {statususer
            .filter((el) => el.userID === user.user_id)
            .map((el, index) => (
              <option key={index} value={el.datetime}>
                {new Date(el.datetime).toLocaleString("th-TH")}
              </option>
            ))}
        </select>
      </div>
      <div className="p-1 bg-gray-100 min-h-screen w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {statususer
            .filter((el) => el.userID === user.user_id)
            .map((el, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl shadow-lg "
              >
                <a className="text-center text-xl text-white bg-gradient-to-r from-slate-500 to-slate-700 w-full block mb-3 py-2 rounded-md font-semibold transform transition duration-500 hover:from-slate-700 hover:to-slate-500">
                  <div>ข้อมูลการจอง</div>
                </a>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  ชื่อผู้จอง: {el.user.username}
                </h3>
                <p className="mb-1 text-gray-600">
                  <span className="font-semibold">ชื่อผู้เข้ารับบริการ :</span> {el.guest.nickname}
                </p>
                <p className="mb-1 text-gray-600">
                  <span className="font-semibold">อายุผู้รับบริการ :</span> {el.guest.age_range} ปี
                </p>
                <p className="mb-1">
                  <span className="font-semibold text-gray-600">ราคา: </span>
                  <span className="text-red-600">{el.hairstyle.hairstyle_price} ฿</span>
                </p>
                <p className="mb-1 text-gray-600">
                  <span className="font-semibold">วันเวลาที่จอง : </span>
                  <span className="text-green-500">{new Date(el.datetime).toLocaleString("th-TH")}</span>
                </p>
                <p className="mb-1 text-gray-600">
                  <span className="font-semibold">ทรงผมที่จอง : </span> {el.hairstyle.hairstyle_name}
                </p>
                <figure className="mb-3">
                  <img
                    src={el.hairstyle.hairstyle_img}
                    alt="Hairstyle"
                    className="rounded-lg w-40 object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                  />
                </figure>
                <p
                  className={`mb-3 text-lg font-semibold ${
                    el.status === 0
                      ? "text-yellow-600"
                      : el.status === 1
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  สถานะ: {el.status === 0 ? "รอยืนยัน" : el.status === 1 ? "ยืนยันการจองแล้ว" : "ยกเลิก"}
                </p>
                <div className="flex justify-end">
                  <button className="ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full text-sm font-medium text-white bg-gradient-to-l from-orange-700 to-orange-600 shadow-lg hover:from-orange-500 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <a href="/AboutMe" className="">
                      แผนที่ร้าน
                    </a>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
