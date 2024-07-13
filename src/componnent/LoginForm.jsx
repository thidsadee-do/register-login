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
    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://wallsneedlove.com/cdn/shop/products/w0140_1s_Old-Style-Barber-Shop-Wallpaper-for-Walls-Barber-Shop_For-Interior-Walls-2.jpg?v=1604083243)' }}>
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={hdlSubmit}>
            <div className="justify-center">
              <img
                src="https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/user-512.png"
                alt="user icon"
                style={{ width: "55px", height: "50px" }}
              />
            </div>
            <h1 className="text-2xl font-bold text-center text-black">
            ล็อกอิน เข้าสู่ระบบ
            </h1>
            <h2 className="text-center text-black text-lg mb-4">
              จองคิวร้านตัดผม Barbershop
            </h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">ชื่อผู้ใช้</span>
              </label>
              <input placeholder="username"
                type="text"
                className="input input-bordered"
                name="username"
                value={input.username}
                onChange={hdlChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">รหัสผ่าน</span>
              </label>
              <input placeholder="password"
                type="password"
                className="input input-bordered"
                name="password"
                value={input.password}
                onChange={hdlChange}
              />
            </div>
            <div className="form-control mt-8">
              <button type="submit" className="btn btn-outline btn-primary text-black">
                เข้าสู่ระบบ
              </button>
              <div className="divider text-xs">หรือ</div>
              <Link to="/register" className="btn btn-neutral-content mt-2 w-full">
                สมัครสมาชิก
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
