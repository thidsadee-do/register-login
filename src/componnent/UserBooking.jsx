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
  ];

  const bookedTimes = booking.map((booking) =>
    new Date(booking.datetime).toLocaleTimeString('th-TH').slice(0, 5)
  );

  return (
    <div className="flex justify-center items-center w-full p-8 bg-gray-100 min-h-screen">
      <form onSubmit={hdlSubmit} className="bg-white rounded-lg overflow-hidden shadow-xl max-w-4xl w-full p-8 space-y-6">
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
                    <h2 className="card-title text-lg font-semibold flex items-start justify-between">
                      {hairId.hairstyle_name}
                    </h2>
                    <p className="text-black flex items-center">
                      <FontAwesomeIcon icon={faClock} className="mr-2" /> 30 นาที
                    </p>
                    <div className="card-actions justify-end space-x-2 mt-4">
                      <div className="badge badge-outline bg-red-600 text-zinc-50">{hairId.hairstyle_price} บาท</div>
                      <div className="badge badge-outline bg-sky-600 text-white">{hairId.hairstyle_name}</div>
                    </div>
                    <div className="col-span-5 flex justify-center mt-3">
                      <button type="submit" className="btn btn-accent flex items-center">
                        <img src="https://vectorified.com/images/booking-icon-8.png" alt="Barbershop Icon" className="h-8 w-auto mr-2" />
                        คลิกเพื่อจอง
                      </button>
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
