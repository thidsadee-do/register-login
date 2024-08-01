import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import userAuth from "../hooks/userAuth";
import Swal from "sweetalert2";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = userAuth();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!input.username || !input.password) {
        Swal.fire({
          icon: "error",
          title: "โปรดกรอกข้อมูลให้ครบถ้วน",
          text: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน",
          confirmButtonColor: "#3085d6",
        });
        return;
      }

      const rs = await axios.post("http://localhost:8889/auth/login", input);
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://localhost:8889/auth/me", {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });

      setUser(rs1.data);

      Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        text: "คุณได้เข้าสู่ระบบเรียบร้อยแล้ว",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        if (rs1.data.user_role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      });

    } catch (err) {
      console.log(err.message);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาลองใหม่อีกครั้งในภายหลัง",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="bg-black">
      <marquee scrollamount="9">
          <b className="text-1xl text-white">BarberShop Boyy : ถ. รัฐบำรุง ตำบล ธาตุนาเวง อำเภอเมืองสกลนคร สกลนคร 47000 547G+29 ตำบล ธาตุนาเวง อำเภอเมืองสกลนคร สกลนคร </b>
        </marquee>
    <div className="hero min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://i.etsystatic.com/22370788/r/il/f3073c/3409483003/il_fullxfull.3409483003_cmdq.jpg)' }}>
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="card glass shrink-0 w-full max-w-xl shadow-2xl bg-opacity-90">
          <form className="card-body" onSubmit={hdlSubmit}>
            <div className="flex justify-center mb-4">
              <img
                src="https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/user-512.png"
                alt="user icon"
                style={{ width: "55px", height: "50px" }}
              />
            </div>
            <h1 className="text-2xl font-bold text-center text-black mb-2">
              ล็อกอิน เข้าสู่ระบบ
            </h1>
            <h2 className="text-center text-black text-lg mb-4">
              จองคิวร้านตัดผม Barbershop
            </h2>
            <div className="mb-4">
              <label className="label">
                <span className="label-text text-black">ชื่อผู้ใช้</span>
              </label>
              <input
                placeholder="username"
                type="text"
                className="input input-bordered w-full"
                name="username"
                value={input.username}
                onChange={hdlChange}
              />
            </div>
            <div className="mb-10">
              <label className="label">
                <span className="label-text text-black">รหัสผ่าน</span>
              </label>
              <input
                placeholder="password"
                type="password"
                className="input input-bordered w-full"
                name="password"
                value={input.password}
                onChange={hdlChange}
              />
            </div>
            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-full text-white">
                เข้าสู่ระบบ
              </button>
              <div className="divider text-xs my-4 text-white">หรือ</div>
              <Link to="/register" className="btn btn-secondary w-full">
                สมัครสมาชิก
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
