import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import userAuth from "../hooks/userAuth";

export default function LoginForm() {
  const navagate = useNavigate()
  const { setUser } = userAuth();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const rs = await axios.post("http://localhost:8889/auth/login", input);
      console.log(rs.data.token);
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://localhost:8889/auth/me", {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });
      if (rs1.data.user_role === 'ADMIN') {
        navagate('/admin')
      }

      console.log(rs1.data);
      setUser(rs1.data);

    } catch (err) {
      console.log(err.message);
    }
    // alert(999)
  };

  return (
    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://wallsneedlove.com/cdn/shop/products/w0140_1s_Old-Style-Barber-Shop-Wallpaper-for-Walls-Barber-Shop_For-Interior-Walls-2.jpg?v=1604083243)' }}>
      <div className=" container mx-auto flex justify-center items-center h-scree">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={hdlSubmit}>
            <div className="justify-center">
              <img
                src="https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/user-512.png"
                className=""
                style={{ width: "55px", height: "50px" }}
              />
            </div>
            <h1 className="text-2xl font-bold text-center text-" >
              เข้าสู่ระบบ
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">ชื่อผู้ใช้</span>
              </label>

              <input
                type="text"
                className="input input-bordered"
                name="username"
                value={input.username}
                onChange={hdlChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">รหัสผ่าน</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                name="password"
                value={input.password}
                onChange={hdlChange}
              />
            </div>
            <div className="form-control mt-8">
              <button className="btn btn-outline btn-accent text-white">เข้าสู่ระบบ</button>
              <div className="divider text-xs">หรือ</div>
              <Link to="/register" className="btn btn-neutral-content form-control mt-2">สมัครสมาชิก</Link>
            </div>
          </form>
        </div>
      </div>
      </div>
      );
}
