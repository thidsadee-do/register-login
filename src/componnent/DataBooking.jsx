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
                            <th>ทรงผม</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((bookings) => (
                            <tr key={bookings.booking_id} bookings ={bookings}>
                                <td>{bookings.booking_id}</td>
                                <td>{new Date(bookings.datetime).toLocaleString('th-TH')}</td>
                                <td>{bookings.user.username}</td>
                                <td>{bookings.hairstyle.hairstyle_name}</td>
                                <td>{bookings.status}</td>
                                <td>
                                    <button className="btn btn-warning" style={{ marginRight: '10px' }} onClick={() => document.getElementById('my_modal_3').showModal()}>แก้ไข</button>
                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box h-4/5 max-w-1xl flex flex-col gap-2">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                                            </form>
                                            <h3 className="font-bold text-lg">แก้ไขข้อมูลการจอง</h3>
                                            <p className="py-4"></p>
                                            <input type="datetime-local" placeholder="" className="input input-bordered input-md w-full max-w-xs" />
                                            <input type="text" placeholder="ชื่อผู้จอง" className="input input-bordered input-md w-full max-w-xs" />
                                            <input type="text" placeholder="ชื่อทรงผม" className="input input-bordered input-md w-full max-w-xs" />
                                            <select className="select select-bordered select-sm w-full max-w-xs">
                                                <option disabled selected>สถานะ</option>
                                                <option>CANCEL</option>
                                                <option>NOT_CANCEL</option>

                                            </select>
                                            <button className="btn btn-accent w-16">แก้ไข</button>
                                        </div>
                                    </dialog>
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
