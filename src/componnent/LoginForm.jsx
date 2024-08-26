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
          navigate('/');
          window.location.reload();
        } else {
          navigate('/');
          window.location.reload();
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
        <b className="text-1xl text-white">BarberShop Boyy : ถ. รัฐบำรุง ตำบล ธาตุนาเวง อำเภอเมืองสกลนคร สกลนคร 47000 547G+29 ตำบล ธาตุนาเวง อำเภอเมืองสกลนคร สกลนคร : LINE.ID:</b>
      </marquee>
      <div className="hero min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://i.etsystatic.com/22370788/r/il/f3073c/3409483003/il_fullxfull.3409483003_cmdq.jpg)' }}>
        <div className="container mx-auto flex justify-center items-center">
          <div className="card glass shrink-0 w-1/3 max-w-xl shadow-2xl bg-opacity-90">
            <form className="card-body" onSubmit={hdlSubmit}>
              <div className="group duration-500 hover:-skew-x-0 skew-x-6 hover:translate-x-2 justify-center">
                <div className="group-hover:duration-400 relative rounded-2xl w-72 h-36 bg-zinc-800 text-gray-50 flex flex-col justify-center items-center gap-1 before:-skew-x-12  before:rounded-2xl  before:absolute before:content['']  before:bg-neutral-700 before:right-3 before:top-0 before:w-72 before:h-32 before:-z-10">
                  <span className="text-3xl font-bold mt-4">ล็อกอิน เข้าสู่ระบบ</span><br />
                  <p className="text-amber-300 font-thin text-xl">- จองคิวร้านตัดผม Barbershop -</p>
                </div>
              </div>
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
                <button className="relative inline-flex h-12 w-full  active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]">
                  </span>
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
                    ล็อกอิน
                    <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z" />
                  </span>
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
