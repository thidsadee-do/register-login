import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAuth from "../hooks/userAuth";
import UserBooking from "./UserBooking";

export default function Userbooking() {

  const { user } = userAuth();
  const [Userbooking, setUserbooking] = useState(null);


    useEffect(() => {
    const getUserBooking = async () => {
      try {
        // const id = hairstyleID
        const response = await axios.get(`http://localhost:8889/admin/hairstyle/`);
        setUserbooking(response.data.hairstyle);
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching hairstyle:", error);
      }
    };
    getUserBooking();
  }, []);

  const hairstyleID = location.pathname.split("/")[2];
  // console.log(hairstyleID);

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    console.log(input);
  };

  
  const [input, setInput] = useState({
    datatime: new Date(),
    user_id: +user.user_id,
    hairstyle_id: hairstyleID,
    status: ""
  });

  const hdlSubmit = async () => {
    alert(555)
    const token = localStorage.getItem('token')
    const rs = await axios.post("http://localhost:8889/admin/bookings", input, {
      headers: {Authorization: `Bearer ${token}`}
    });
    if(rs.status === 200){
      // const id = rs.data.booking.booking_id
      alert("จองสำเร็จ")
    }else{
      alert("ไม่สามารถจองได้ ... ")
    }
  };


  return (
    <form onSubmit={hdlSubmit}>
      <div className="divider divider-warning">เลือกทรงผมและสั่งจองคิว</div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">เลือกทรงผมแล้วจองคิว</h1>
            <p className="py-6">"สวัสดีครับ! ยินดีต้อนรับสู่ BarberShop เรามุ่งมั่นที่จะให้บริการท่านด้วยความสะดวกสบายและคุณภาพ" </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mb-32">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">เลือกวันเวลา</span>
                </label>
                <input onChange={hdlChange} type="datetime-local" name="datatime" value={input.datatime} className="input input-bordered" required />
                <label className="label">
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">จอง</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </form>
  );
}
