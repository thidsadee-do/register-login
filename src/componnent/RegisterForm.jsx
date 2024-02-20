import axios from 'axios'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    sex: '',
    age: '',

  })

  const hdlReset = () => {
    setInput({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      phone: '',
      sex: '',
      age: '',
    });
  }


  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlSubmit = async e => {
    try {

      e.preventDefault()
      if (input.password !== input.confirmPassword) {

        return alert('pls check confirm password')
      }
      const rs = await axios.post('http://localhost:8889/auth/register', input)
      console.log(rs)
      if (rs.status === 200) {
        alert('Register Successful')
        navigate('/')
      }
    } catch (err) {
      console.log(err.message)
    }
    // alert(999)

  }

  return (

    <div className="card shrink-0  w-fullmax-w-24 bg-base-200">
      <form className="flex flex-col justify-center items-center gap-0" onSubmit={hdlSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="text-3xl font-bold mb-10 mt-20 " >สมัครสมาชิก</div>
          <div className="label">
            <span className="label-text">ชื่อผู้ใช้</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="username"
            value={input.username}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">รหัสผ่าน</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={input.password}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ยืนยันรหัสผ่าน</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">อีเมล</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="email"
            value={input.email}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">เบอร์โทรศัพท์</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="phone"
            value={input.phone}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">เพศ</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="sex"
            value={input.sex}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">อายุ</span>
          </div>
          <input
            type="tel"
            className="input input-bordered w-full max-w-xs"
            name="age"
            value={input.age}
            onChange={hdlChange}
          />
        </label>
        <div className="flex gap-10">
          <button type="submit" className="btn btn-outline btn-primary mt-7" >สมัครสมาชิก</button>
          <button type="reset" className="btn btn-outline btn-warning mt-7" onClick={hdlReset}>รีเซ็ต</button>
        </div>
      </form>
    </div>
  );
}
