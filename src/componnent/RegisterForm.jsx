import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    sex: '',
    age: '',
  });

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
  };

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      if (input.password !== input.confirmPassword) {
        return alert('Please check your password confirmation');
      }
      const rs = await axios.post('http://localhost:8889/auth/register', input);
      if (rs.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Register Successful',
          text: 'การสมัครสมาชิกเสร็จสมบูรณ์',
          confirmButtonColor: '#3085d6',
        });
        navigate('/');
      }
    } catch (err) {
      console.log(err.message);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาดในการลงทะเบียน',
        text: 'โปรดลองอีกครั้งในภายหลัง',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  return (
    <div className='container mx-auto px-10 max-w-xl mt-10 mb-10'>
      <div className='flex flex-col justify-center items-center gap-4 p-6'>
        <form className='bg-slate-400 rounded-lg p-8 shadow-lg' onSubmit={hdlSubmit}>
          <h2 className='text-3xl font-bold mb-5 text-white'>สมัครสมาชิก</h2>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-white'>ชื่อผู้ใช้งาน</span>
            </label>
            <input placeholder="Username"
              type='text'
              className='input input-bordered'
              name='username'
              value={input.username}
              onChange={hdlChange}
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-white'>รหัสผ่าน</span>
            </label>
            <input placeholder="Password"
              type='password'
              className='input input-bordered'
              name='password'
              value={input.password}
              onChange={hdlChange}
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-white'>ยืนยันรหัสผ่าน</span>
            </label>
            <input placeholder="Confirm Password"
              type='password'
              className='input input-bordered'
              name='confirmPassword'
              value={input.confirmPassword}
              onChange={hdlChange}
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-white'>อีเมล</span>
            </label>
            <input placeholder="Email"
              type='email'
              className='input input-bordered'
              name='email'
              value={input.email}
              onChange={hdlChange}
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-white'>เบอร์โทรศัพท์</span>
            </label>
            <input placeholder="Phone"
              type='tel'
              className='input input-bordered'
              name='phone'
              value={input.phone}
              onChange={hdlChange}
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-white'>เพศ</span>
            </label>
            <input placeholder="Sex"
              type='text'
              className='input input-bordered'
              name='sex'
              value={input.sex}
              onChange={hdlChange}
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-white'>อายุ</span>
            </label>
            <input placeholder="Age"
              type='number'
              className='input input-bordered'
              name='age'
              value={input.age}
              onChange={hdlChange}
              required
            />
          </div>
          <div className='flex gap-4 mt-5'>
            <button type='submit' className='btn btn-primary flex-1'>
              Register
            </button>
            <button type='reset' className='btn btn-warning flex-1' onClick={hdlReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
