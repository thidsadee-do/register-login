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
  };

  const hdlChange2 = (e) => {
    setInput2((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };


  const [input, setInput] = useState({
    datatime: new Date(),
    user_id: +user.user_id,
    hairstyle_id: hairstyleID,
    status: ""
  });

  const [input2, setInput2] = useState({
    nickname: "",
    age_range: ""
  })

  const hdlSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')

    const rs1 = await axios.post('http://localhost:8889/admin/guest', input2, {
      headers: { Authorization: `Bearer ${token}` }
    })

    const guest_id = rs1.data.createGuest.guest_id
    console.log(guest_id)
    const data = { ...input, guest_id }
    console.log(data)

    const rs = await axios.post("http://localhost:8889/admin/bookings", data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (rs.status === 200) {
      alert("จองสำเร็จ")
    } else {
      alert("ไม่สามารถจองได้ ... ")
    }
  };




  return (
    <form onSubmit={hdlSubmit}>
      <div className="divider divider-warning">เลือกทรงผมและสั่งจองคิว</div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">"ขอบคุณที่ให้โอกาสเราให้บริการคุณ!"</h1>
            <p className="py-6">"สวัสดีครับ! ยินดีต้อนรับสู่ BarberShop เรามุ่งมั่นที่จะให้บริการท่านด้วยความสะดวกสบายและคุณภาพ" </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mb-32">
            <div className="card-body ">
              <p className="text-center">กรอกข้อมูลเพื่อจองคิว</p>
              {/* <label className="">
                <p>จองให้ผู้อื่นให้click</p>
                <input type="checkbox" className="checkbox" onClick={ () => setCheck(!check)} />
              </label> */}
              <input type="text" placeholder="ชื่อผู้ตัด" name="nickname" value={input2.nickname} onChange={hdlChange2} className="input input-bordered w-full max-w-xs" style={{ marginBottom: '10px' }} />
              <input type="text" placeholder="อายุผู้ตัด" name="age_range" value={input2.age_range} onChange={hdlChange2} className="input input-bordered w-full max-w-xs" style={{ marginBottom: '10px' }} />
              <div className="form-control">
                <label className="label">
                  <span className="label-text">เลือกวันเวลา</span>
                </label>
                <input onChange={hdlChange} type="datetime-local" name="datatime" value={input.datatime} className="input input-bordered" required />
                <label className="label">
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-gradient-to-r from-[#fdba74] to-[#ea580c] text-white">จองคิวเลย</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </form>
  );
}
