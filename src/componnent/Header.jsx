import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/userAuth'

const guestNav = [

  { to: '/', text: 'เข้าสู่ระบบ' },
  { to: '/register', text: 'สมัครสมาชิก' },
]

const userNav = [
  { to: "/", text: "หน้าหลัก" },

];
const adminNav =
  [
    { to: "*", text: "หน้าหลัก" },


  ];


export default function Header() {
  const { user, logout, setTheme } = useAuth()
  const finalNav = user?.user_id ? user.user_role === "ADMIN" ? adminNav : userNav : guestNav;

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }


  const hdlHome = () => {
    navigate('/')
  }

  return (
    <div className="navbar bg-gradient-to-r from-[#92CEA8] to-[#FEC7BB]">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">
          BABRSHOP
        </a>
        {/* สวัสดี, {user?.user_id ? user.username : 'Guest'} */}
        <ul className="menu mx-auto menu-horizontal text-white  ">
          <li><a onClick={hdlHome}>ข้อมูลผู้ใช้</a></li>
          <li><a>Item 2</a></li>
        </ul>
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