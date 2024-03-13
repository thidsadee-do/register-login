import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function DataBooking() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const getBookings = async (req, res, next) => {
            const rs = await axios.get("http://localhost:8889/admin/bookings");
            setBookings(rs.data.bookings);
        };
        getBookings();
    }, []);

    const hdlDelete = async (e, booking_id) =>{
        try {
            e.stopPropagation()
            const token = localStorage.getItem('token')
              const rs = await axios.delete(`http://localhost:8889/admin/deleteBooking/${booking_id}`, {
                headers : { Authorization : `Bearer ${token}`}
              })
              alert('Delete Successful')
              location.reload();
              setTrigger(prv=>!prv)
        } catch (err) {
          console.log(err)
        }
      
      }
      

    function formatDate(dateString) {
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        };
        const date = new Date(dateString);
        return date.toLocaleDateString("th-TH", options);
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-xs font-medium text-red-700">
                            <th>ลำดับการจอง</th>
                            <th>วันเวลาที่จอง</th>
                            <th>ชื่อผู้จอง</th>
                            <th>อายุผู้จอง</th>
                            <th>ทรงผม</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((bookings) => (
                            <tr key={bookings.booking_id} bookings ={bookings}>
                                <td>{bookings.booking_id}</td>
                                <td>{new Date(bookings.datetime).toLocaleString('th-TH')}</td>
                                <td>{bookings.guest.nickname}</td>
                                <td>{bookings.guest.age_range}</td>
                                <td>{bookings.hairstyle.hairstyle_name}</td>
                                <td>{bookings.status}</td>
                                <td>
                                    <button className="btn btn-error" onClick={(e) => hdlDelete(e, bookings.booking_id)}>ลบ</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
