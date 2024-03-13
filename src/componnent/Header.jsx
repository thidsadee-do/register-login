import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/userAuth'

const guestNav = [
  { to: '/LoginForm', text: 'เข้าสู่ระบบ' },
  { to: '/register', text: 'สมัครสมาชิก' },
]

const userNav = [
  { to: "/", text: "หน้าหลัก" },
  { to: "/UserBooking", text: "สั่งคิวจองตัดผม" },
  { to: "/StatusUser", text: "สถานะการจอง" },
  { to: "/AboutMe", text: "ติดต่อเรา" },
  

];
const adminNav =
  [
    { to: "/DataUser", text: "ข้อมูลผู้ใช้งาน" },
    { to: "/DataBooking", text: "ข้อมูลการจอง" },
    { to: "/DataHairStyle", text: "ข้อมูลทรงผม" },


  ];


export default function Header() {
  const { user, logout, setTheme } = useAuth()
  const finalNav = user?.user_id ? user.user_role === "ADMIN" ? adminNav : userNav : guestNav;

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar bg-gradient-to-r from-[#FF0033] to-[#0033CC]">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">
          BABRSHOP
        </a> 
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {finalNav.map(el => (
            <li key={el.to} ><Link to={el.to} style={{ color: 'white' }}>{el.text}</Link>
            </li>
          ))}
          {user?.user_id && (
            <li>
              <Link to='#' onClick={hdlLogout} style={{ color: 'white' }}>ออกจากระบบ</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}