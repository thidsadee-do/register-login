import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/userAuth'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const guestNav = [
  { to: '/LoginForm', text: 'เข้าสู่ระบบ' },
  { to: '/register', text: 'สมัครสมาชิก' },
]

const userNav = [
  { to: "/", text: "ทรงผม" },
  { to: "/UserBooking", text: "จองนัดหมาย" },
  { to: "/StatusUser", text: "การจองของฉัน" },
  { to: "/AboutMe", text: "แผนที่ร้าน" },
];

const adminNav = [
  { to: "/Datadashboard", text: "ประวัติการจอง" },
  { to: "/DataBooking", text: "ข้อมูลรอยืนยันการจอง" },
  { to: "/DataUser", text: "ข้อมูลผู้ใช้งาน" },
  { to: "/DataHairStyle", text: "ข้อมูลทรงผม" },
];

export default function Header() {
  const { user, logout, setTheme } = useAuth()
  const finalNav = user?.user_id ? user.user_role === "ADMIN" ? adminNav : userNav : guestNav;

  const navigate = useNavigate()

  const hdlLogout = () => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่ว่าคุณต้องการออกจากระบบ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ออกจากระบบ'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/');
      }
    });
  }

  return (
    <div className="sticky top-0 z-50 navbar bg-gradient-to-b from-[#f12711] to-[#f5af19]">
      <div className="flex flex-row px-0 ">
        <a className="text-xl text-white" href="/">
          <img src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/15500.png" style={{ height: '54px', borderRadius: '8px' }} />
        </a>
        <h1 className='text-xl ml-2 text-white'>ระบบจองคิวตัดผมแจ้งเตือนผ่านไลน์</h1>
      </div>
      <div className="flex flex-1 justify-center">
        <ul className="menu menu-horizontal px-10">
          {finalNav.map(el => (
            <li key={el.to}>
              <Link
                to={el.to}
                className="text-white transition duration-300 ease-in-out hover:text-gray-900 hover:underline text-center"
              >
                {el.text}
              </Link>
            </li>
          ))}
          {user?.user_id && (
            <li>
              <Link
                to="#"
                onClick={hdlLogout}
                className=" text-white transition duration-300 ease-in-out hover:text-gray-900 hover:underline "
              >
                ออกจากระบบ
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className='font-bold text-2xl'>
        <p className='text-pink-50'>สวัสดี {user?.user_id ? user.username : 'Guest'}</p>
      </div>
    </div>
  );
}
