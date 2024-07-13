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
  { to: "/AboutMe", text: "ติดต่อฉัน" },
];

const adminNav = [
  { to: "/DataUser", text: "ข้อมูลผู้ใช้งาน" },
  { to: "/DataBooking", text: "ข้อมูลการจอง" },
  { to: "/Datadashboard", text: "ประวัติการจอง" },
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
      confirmButtonText: 'log out'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/');
      }
    });
  }

  return (
    <div className="navbar bg-[#fb923c]">
      <div className="flex-1">
        <a className=" text-xl text-white" href='/'>
          <img src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/15500.png" style={{ height: '54px', borderRadius: '8px' }} />
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {finalNav.map(el => (
            <li key={el.to}>
              <Link
                to={el.to}
                className="text-white transition duration-300 ease-in-out hover:text-gray-900 hover:underline"
              >
                {el.text}
              </Link>
            </li>
          ))}
          {user?.user_id && (
            <li>
              <Link
                to='#'
                onClick={hdlLogout}
                className="text-white transition duration-300 ease-in-out hover:text-gray-900 hover:underline"
              >
                ออกจากระบบ
              </Link>
            </li>
          )}
        </ul>
      </div>
      
    </div>
  );
}
