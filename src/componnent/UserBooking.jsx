import axios from "axios";
import { useEffect, useState } from "react";
import userAuth from "../hooks/userAuth";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Userbooking() {
  const { user } = userAuth();
  const [Userbooking, setUserbooking] = useState(null);
  const [booking, setBookings] = useState([]);
  const [hairId, setHairId] = useState([]);
  const [checkDate, setCheckDate] = useState("");
  const [input, setInput] = useState({
    datetime: '',
    user_id: +user.user_id,
    hairstyle_id: location.pathname.split("/")[2],
    status: ""
  });
  const [refetch, setRefetch] = useState(false);

  const [input2, setInput2] = useState({
    nickname: "",
    age_range: ""
  });

  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];

  if (id === undefined) {
    Swal.fire({
      icon: "error",
      title: "กรุณาเลือกทรงผม",
      text: "คลิกปุ่มจองคิวเพื่อทำการนัดหมาย",
      confirmButtonColor: "#3085d6",
      allowOutsideClick: false,
      preConfirm: () => navigate('/')
    });
  }

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const getUserBooking = async () => {
      try {
        const response = await axios.get("http://localhost:8889/admin/hairstyle");
        setUserbooking(response.data.hairstyle);
      } catch (error) {
        console.error("Error fetching hairstyle:", error);
      }
    };
    getUserBooking();

    const getBookings = async () => {
      try {
        const rs = await axios.get('http://localhost:8889/admin/getBook');
        setBookings(rs.data.bookings);
      } catch (err) {
        console.log(err);
      }
    };

    getBookings();

    const getHairId = async () => {
      try {
        const rs = await axios.get(`http://localhost:8889/admin/hairstyle/${id}`);
        setHairId(rs.data.gethairid);
      } catch (err) {
        console.log(err);
      }
    };

    getHairId();
    getCheckDate();
  }, [refetch, checkDate]);

  const hdlChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value
    }));
  };

  const getCheckDate = async () => {
    try {
      const date = new Date(checkDate.checkDate).toISOString();
      const rs = await axios.get(`http://localhost:8889/admin/checkBooking?checkDate=${date}`);
      if (rs.status === 200) {
        setBookings(rs.data.check);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hdlChange2 = (e) => {
    setInput2((prevInput2) => ({
      ...prevInput2,
      [e.target.name]: e.target.value
    }));
  };

  const hdlChackDate = (e) => {
    setCheckDate((event) => ({
      ...event,
      [e.target.name]: e.target.value
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setInput((prevInput) => ({
      ...prevInput,
      datetime: date.toISOString().split('T')[0] + 'T' + selectedTime
    }));
  };

  const handleTimeSelect = (e) => {
    setSelectedTime(e.target.value);
    setInput((prevInput) => ({
      ...prevInput,
      datetime: selectedDate ? selectedDate.toISOString().split('T')[0] + 'T' + e.target.value : prevInput.datetime
    }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!input2.nickname || !input2.age_range || !input.datetime) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Show confirmation dialog
    const confirmation = await Swal.fire({
      title: 'ยืนยันการจองคิว',
      text: 'คุณต้องการยืนยันการจองคิวนี้หรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    });

    if (confirmation.isConfirmed) {
      try {
        // Create guest
        const rs1 = await axios.post("http://localhost:8889/admin/guest", input2, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const guest_id = rs1.data.createGuest.guest_id;

        // Combine input data with guest_id
        const data = { ...input, guest_id, checkDate: checkDate.checkDate };

        // Post booking
        const rs = await axios.post("http://localhost:8889/admin/bookings", data, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (rs.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'จองคิวสำเร็จ',
            confirmButtonColor: '#3085d6',
          });
          setRefetch((prev) => !prev);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'การจองคิวล้มเหลว',
            confirmButtonColor: '#3085d6',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาดในการจองคิว',
          text: 'คุณได้ทำการนัดหมายแล้ว',
          confirmButtonColor: '#3085d6',
        });
        console.error("Error creating booking:", error);
      }
    }
  };

  const time = [
    { value: '08:30', label: '08:30' },
    { value: '09:00', label: '09:00' },
    { value: '09:30', label: '09:30' },
    { value: '10:00', label: '10:00' },
    { value: '10:30', label: '10:30' },
    { value: '11:00', label: '11:00' },
    { value: '11:30', label: '11:30' },
    { value: '13:00', label: '13:00' },
    { value: '13:30', label: '13:30' },
    { value: '14:00', label: '14:00' },
    { value: '14:30', label: '14:30' },
    { value: '15:00', label: '15:00' },
    { value: '15:30', label: '15:30' },
    { value: '16:00', label: '16:00' },
    { value: '16:30', label: '16:30' },
    { value: '17:00', label: '17:00' },
    { value: '17:30', label: '17:30' },
    { value: '18:00', label: '18:00' },
    { value: '18:30', label: '18:30' },
    { value: '19:00', label: '19:00' },
    { value: '19:30', label: '19:30' },
    { value: '20:00', label: '20:00' },
    { value: '20:30', label: '20:30' },
    { value: '21:00', label: '21:00' },
    { value: '21:30', label: '21:30' },
    { value: '22:00', label: '22:00' },
  ];

  const bookedTimes = booking.map((booking) =>
    new Date(booking.datetime).toLocaleTimeString('th-TH').slice(0, 5)
  );

  return (
    <div className="flex justify-center items-center w-full p- min-h-screen">
      <form onSubmit={hdlSubmit} className=" max-w-4xl w-full p-8 space-y-6">
        <p className="text-center text-2xl font-semibold text-black mb-4">กรอกข้อมูลเพื่อจองคิว</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2">
            <label className="block">
              <span className="text-black font-medium">ชื่อ:</span>
              <input type="text" placeholder="ชื่อผู้รับบริการ" name="nickname" value={input2.nickname} onChange={hdlChange2} className="input input-bordered w-full mt-1 input-warning" />
            </label>
          </div>
          <div className="col-span-2">
            <label className="block">
              <span className="text-black font-medium">อายุ:</span>
              <input type="text" placeholder="อายุผู้รับบริการ" name="age_range" value={input2.age_range} onChange={hdlChange2} className="input input-bordered w-full mt-1 input-warning" />
            </label>
          </div>
          <div className="col-span-1">
            <p className="text-black font-medium mb-2">เลือกวันที่จอง:</p>
            <input type="date" min={new Date().toISOString().split("T")[0]} placeholder="เลือกวันที่" className="input input-bordered w-full input-warning" name="checkDate" onChange={hdlChackDate} />
          </div>
          <div className="col-span-5">
            <div className="flex justify-between">
              <div className="w-1/2">
                <p className="text-black font-medium mb-2">เลือกเวลา:</p>
                <div className="grid grid-cols-2 gap-4 ">
                  {time.map((el, index) => (
                    <label key={index} className={`flex justify-center items-center px-4 py-2 rounded-md border ${bookedTimes.includes(el.value) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${input.datetime === el.value ? "border-blue-500 bg-blue-200 font-semibold" : "border-gray-300"}`}>
                      <input
                        type="radio"
                        name="datetime"
                        value={el.value}
                        checked={input.datetime === el.value}
                        onChange={hdlChange}
                        className="mr-2 hidden"
                        disabled={bookedTimes.includes(el.value)}
                      />
                      <span>{el.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="w-1/2">
                <div className="items-center">
                  <figure className="overflow-hidden flex justify-center h-96 mt-8 ">
                    <img src={hairId.hairstyle_img} className="w-80 object-cover" />
                  </figure>
                  <div className="card-body row-auto items-center">
                    <div className="badge badge-outline shadow-md h-10 bg-black text-white ">คุณ {user.username} ต้องการจองทรงผม</div>
                    <div className="badge badge-outline bg-black text-white shadow-md shadow-zinc-900">{hairId.hairstyle_name}</div>
                    <p className="text-black flex items-center">
                      <FontAwesomeIcon icon={faClock} className="mr-2" /> ใช้เวลาบริการ 30 นาที
                    </p>
                    <div className="card-actions justify-end space-x-2 mt-4">
                      <div className="badge badge-outline bg-black text-zinc-50 shadow-md shadow-zinc-900">ราคา: {hairId.hairstyle_price}บาท</div>
                    </div>
                    <div className="col-span-5 flex justify-center mt-3">
                      <button
                        class="cursor-pointer text-white font-bold relative text-[14px] w-[9em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700 hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                      >
                        คลิกเพื่อจองคิว
                      </button>
                    </div><br />
                    <div className="w-full">
                      <a className="badge badge-outline">"สแกน QR Code เข้ากลุ่มไลน์ เพื่อรับการแจ้งเตือนทันทีเมื่อจองและเมื่อแอดมินตอบกลับ!"</a>
                      <div className="size-50 mr-10">
                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMDAwMDAwMDAwMEBAQEBAYFBQUFBgkGBwYHBgkOCAoICAoIDgwPDAsMDwwWEQ8PERYZFRQVGR4bGx4mJCYyMkMBAwMDAwMDAwMDAwQEBAQEBgUFBQUGCQYHBgcGCQ4ICggICggODA8MCwwPDBYRDw8RFhkVFBUZHhsbHiYkJjIyQ//CABEIAOYA5gMBIgACEQEDEQH/xAA0AAEAAgMBAQEAAAAAAAAAAAAABgcCBAUDAQgBAQADAQEBAAAAAAAAAAAAAAABAwUEAgb/2gAMAwEAAhADEAAAArUAAAAAAAAAAAAAAAAAYjJiMgDEyfPoYjIxMgHz4ZMRkAAABjlifnyRPQ8+fqWGfJJFY8T6obgjB8sii56U5Nofbhyopo9gl/C1fpq7/jKiN48ayCJXHTlxgAADHLEp7h7k5KPuxoG5odCTkE+zavTlT/Y6xAWjyyzaqWoVJZ0bnxWnW4c6KKuX39yJ3HTdyAAAAEEwz1h6V5axueFRWGbnA9O4RnPZ6B08uTGjoy+I2mVPqTnbOdoyaMnlnXNwGMoAAABjliUNYNbXGUt2rE4B4RjRl5CLZ5VlFB2XGJOblZd6dQ9ayuKoJRiws4ec/daha8dlQjthAAAAxyxKO94VZJ4S/R4pMeT2arPm3MpnEcvj+Pl8/mOlqZU+JdWcolm7o1z72BF+q6IdjX3zwhEUkZfv2vbCAAAGOWJTc8qOySe13OYQcKf8uRlDWD0a7iJ/t9SOfO5fVcLYq8dBJOFu6O/DePO+u+nfbudcrmwq4sQ1LlqW2gAAAYkDhPNnhCpVtyohffr/AHC3q2wrg/RmFSyiIkXb1uJRXLq15U/6LYX3+3oHI5cH5p1ZzJeydH7xuyAAAMchTMvic9Obwud8JN2WRGveG6RbtOSX2OxHM+SbF10pNiLSDlQ8smF9OOloc+ut07dx13YgAAA+fcSj9n2khFfHud4+VtPt85ld3vSRZ+zREnJDBtnAtTW5NalhanP0CxOaih2Moh0T9BsMwAABjliU9w+zMCi7s8N40+P3ZGbFZ5+5jxJx4FdSmN887vftWlyVce0Ywc6O25HyASeCw4s22aauUAAAApxcYpz5cgi+UmFMTKaip5XLRTVjd8Q3YlQpxcYqiSzIUvPJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/xAAC/9oADAMBAAIAAwAAACHzzzzzzzzzzzzzzzzzDDTjzTjzjDzzzyjCSSjxwCzCDzzzyjiSiATRwAjDTzzygACxCwzQzQRzzzygAjQxDZhgQBzzzygBxQc3FcghzTzzyzChDvNdmghBzzzzyDARjcHCjghTzzyzhySjChACjRTzzziBTCSDAgDxhzzzyjijQQjRRASRTzzzzyzyyxxzyxxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz/8QALxAAAgICAQIFAgUFAQEAAAAABAUCAwEGABQVBxESExYgNBchMDU2ECMlJjdFYP/aAAgBAQABBwL/AOb6kfnUj86kfnUj8jOE/wA+ZzjH59SPyN9Ms+XOpH5gijP5Ssrr51I/I2QnjzjbVPPlK+mOfLqR+dSPzqR+Ruqnny+sn7e/i5cwdMCRvgb/AJ8D2DjPVnKsOw3w9nOam/LlyOlHiTeyrZ66UckTM3vvcQ6m3Ws6CyPtr+EEX+/fzXNdalZBaeJFk4du4RrzYZXhtos5zQnZ0W2yT43Gz4JI2e4X4HsHPgewcnor+EJz0Cd3eiK/rJ+3I5on7+dzZtmcL3BIvzTYePrrCNO9/QZZiiNkta4dnXhjWoIiYVuwS9f9nkdp2id/TJHBHbiIHAGDzsuQ3WD6d75JbvYvTxS2JJJpTO2uEl3R+HsvU5Ik4/nEObu6YKej5802HmrMzGiYy/Q/5Ab+gT9uRzQ/383m6fyEz+jj+D188Poe4kLhZ4b+uyc/hHZ/8p+JfNaJ6za6yth1fupcGPW/M/8AC9y7X/qGt632DqOSW922ckF6h7MfQFrOqdmv61x/OIc8S/8Azv6aH+wH80P+QG/oE/b381ZmGrcmX3PtOIszb3jR+bHsaQtLeF4eyxBMTIF8tZXzGJeKYl5Vb+CIH0HFtalYoDZjsw2gRN+ifv53NphfZtN0WWdnU+3wHCwBUK2ejW7IfQzVPFx+Yhvrqx9x98nZdUM9PO8aPzGz6wONdToMsSely+ucfXCcJ+Himc5Tz4dp8Y8/gaDmfD1LiPrUrFygS0NZri9KVYa318OV178L/c/XyljY0N+KHF2ahfBOn14BRb3AjWVxTLDjxF/v9v5QtrZ66KCxJK1DOVegxt7yTYz01c0MsN/DpTzOhIcflHw+Szx5ptVBSkSJ+ucvRCc5+IamEpwu3Ne0rmudpmaL2eTCIZ6sOKxXMErAYbepzghBzrG1hVCBqto14tt03EGnMljWg7ZNYNbsxzN99dCQOIW2iD6/JZ4df3+4cxjGMeTjYlqsyoRm2BSC1GjuRyVeW34iqOQ6p85tq1hSWoCmP+gT9uRzXh1ZLYuF6BCOBczJMd7F6eUMdyHqhQDWMwomQzls7KHTKqLR3QNW2mOxel5PcNirlKGnNC2a20hjfrrOvpyEMLX0IrUy9T7nHDvagyi5Zk5fFUGb7jyQg4GO2KCvNGpBpCuq4Kj19ZmDPYXLrJcOaqfsRJ1kPrJ+3v4mSd9ZlCiJOlSZT63rfYOo4dv/AEZd4r193k+g2vxI9uuEAknyAujZuP8ASbvMthqSkpcpuGv8OszlZNCusVLaQubPtvVVnJ/D+XoSFz2ba+80dEJtvSpMp9b1vv8A1HC0nVJMKNeSdiEmL+gT9vfzVmYatyZefskp7FG/bdorK6XlFCalMMxBp1tlRMmTbSI5zFk0vvayowBtsSxhK8wThwqvbFW+fMGE4z5jOboZxiiyu7HvCawdnZbC3qZvg+jGy631K2iA1akVXlPpKVgp63mz7ODgEsRTDaGfoIq88VVY+sn7cjl0JzJvwh0sBksoL/DpRyBpB5WdYXLl6ZeSKgRVuGhVA+lpQiar/KiyeCCZzLLzyA0p3Spyutxmrkl+YV+tLfKN/s/02lyQlBrJVLQXeR9h2vZr03S8KIkWRaSk2VkoGlRq20nOjrBvrJ+3I5o0ITfG4v2deGzwo40bCOpkIa9FfRshJkyD18Om9837izvL8PipXBGj5x05vPeEhfm6DKEZxxM6mVPoTVZmV62W5rVhdgil2M3EtMaHVblHKq5acGzwofIj03scWL7WhlYYxI2oDWrNAliTwqX1kY86L8Yk5QlXmIgAGQQ74Y0Qz1cbjqxepM11zf0sonrQm1MamOnpqwSZpj2WsFwkQJWzorLtFvpz5cHGsJniIYsBasQO1vX8ytMbNIJS6gkYaCq33nH84hzxL/8AO4EbeARAlXYsfB3FaSuLEbk2foeIv7RRwPbelSZUa3snYOo523tf+39F8z/zevbR3Uua40noxLyv+gcpEtGAoEiZHJ3bpKZXEzmNVRVDGOGu/kBd+s/hrzXtS7EXMpzrfkwu2H/oHA0nVO8p4eG/tzhOuPorhX9ZGfKi/OIuXxV4aXCIGkdVtusWldLzHTL0VEdjc0dVHHh5nzcX52sHYpmG3jGlh+rlC7ciKoXpTa0v9s9oEuHgRDb9cqj6dt2isrpeJAROiCNOfLFt8BtnoZmL6cMC3gltoIxpYfq4DhYAqFbAtQmVEyQXyxjfMb6yftyOaNOEHxuXCAL3SNg1TZr3PVcteWvGl2vx8Pks8eabVQUpEiXWxFd5sQ/A0HGRmEqXjNsW3YjEbvmNyIGIesrrUEmOpa8I96rgo8RB6hvEGXodDT1XaimhWRNj11UVg1pqiIBz1XNlrop1m0PSMxpRHR0P9/N/QujmdVsJ6A592ywNQVRr0lcfD55Dn4fOsS9WtrCkq+6pTs4Tcu0PaKJk7TaO7TM0Xs8WKjE8B37FdLbpZaaF6puCKdxnOD4yvUthERdVz8RVHGgNu5Sy1TpzGhlomdCfZ44RH6/7XEbXADGknYnFLc+mep6wcoLyb9d8sxpuljZ9nIJup7xu/O8bxy59uI8M26qyNbJy7RqNiWGXkVLI2qJvCS3exenlF6a5MMuBu1tbRMZ3cqSU9YPdY4cjzJ1rVA/Tzs+j8aWlrpZo8PvPLonJ5+xQ2KNHiV/5vDwddhrsb9SB18gTNkMRxCGPrJ+3I5on7+dxzu/aWFoX4l82UnrNUsK8P5ehIXNFtfeT7wnv7Qw5reydg6jhpPWF3lItU7yBcaiQ95PvCMG+Ou8V/wDQOGjdGWQKi2vswFwSJ92Y+838SubJsnf+n4mW92YUguUnYmYoo321H6BP25HND/kBvN0/kJn9HH8Hr5oOMyRGxSCXayxIYRYAFr5muwRNg9nhNakpXhPRrm2jQzUSreocdYAenNT9MNrO1h+rhmFh67ter67ANfbx3Sqd09GBrcYa7KhICJr/AL3AF9qxx34zYtULxKzSWJZTcmv6yftyOaNOEHxuWerJmhlhvwNBzZ8DD6xcL4d/tF/HakRuNEe1pJcX8WN/0z0cTpF2CKHuy7QwVmQpc7Sc6HiMiqty1AlKyuvimMo7pO2dw04TgqQqlBdpmL6M/k+RAOfY452Ir2CEMarZ/n4e1Wwb3Z+u6OZ1WwnoDr3rLPgewc+B7BzOgvpY8tWTEJAbBtnUltwoD/h67zL1avrxarqeH6W6IMIuQIr1y68a3w8bSssmgU9sW0C7WiPc9Lw1Jdehiv8Agewc+Bv+L9MdjGjX7WiPc9LzPh25z+esIZqApjwpqr/P/wC4/8QAAv/aAAwDAQACAAMAAAAQ888888888888888844w8ww8w0ww08884EEE0MEYsUw0888oQ4IQE0McE408888gog0oowEQE0888oc8EQga00Qs8888ooEwHAIF0Acc888s0AYT5xlQIgc8888McIg5KIYoM0888ogU4E4o8ooQ0888oUo8QUQgAI0c888o8448Q8gc44c888s8sc8cc8Mcs888888888888888888888888888888888//EACkRAAEDAQYGAgMAAAAAAAAAAAECAwQFAAYREiExExQiMEFRYGEjcXL/2gAIAQIBAT8A+JAg7HukgAk7AWvJeyvVmatmkuuMwhI5drgqyqcV9m0Ny+lOeVIafko4PWsOOdOmB1Cjrva6tdFfpLU0pyvY5Hk+M6fXcUMySk+RhatU6sXTlPttQUPw1S+ZjyCkqyqG2o2No96rwzXOSabDy3syEoSg5hmw0GH6tc6hqoFHZjPK/M4tTz39K8d1SUrGCgCPu1Mu3SqS9IlRYw477ilqdVqrqOOA9D5F/8QAKREAAQMCBAUEAwAAAAAAAAAAAgEDBAAFERITIiEwMmBhBjEzckGhsf/aAAgBAwEBPwDt9VwRVq63q5T31bhE4DGrogobcx+VqOXqGK4TgE6Kh15yxH9rVnuQ3SEEjLlLoP7JzFTFFSrhFuFmccFuODkdZGsyeVVyU1e7nINI4NoZnmAeC47sOHBfFWK2rbIAMOfKW8/sXNVEX3SolqhQnXXmWU1HXCMz/O7+J3F//8QAOhAAAQMDAgIHBQgCAgMBAAAAAgABAwQREhMhFDEFIkFRYXGxIzAyY5IGEBVCUoGRoTNiNHIkU2CC/9oACAEBAAg/Av8A5vXj+plxEX1MuIi+plxEX1MgNi8nv9zvZcRF9TIZgd/Am+7Xj+pk08b/AP6ZHII+b2XERfUyAxJvB0EgE/cz3RTAz+JMuIi+plxEX1MuIi+pkEoE/g9/cfLL0VNUkJCRPuT9640frXGt9bqesuAc7G6MnL23buqkScXLHqqnyEThK1+apapx0ueROqmqY4w5tldfKL0WvJ/kL8z96Gq9jnlZyfsQGQ8+T2R1fsnFitk990Ru73Pm/gjkJ2xPm/ioZiF5CYW62y41vrdca31unrW6rO/x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" alt="line" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}