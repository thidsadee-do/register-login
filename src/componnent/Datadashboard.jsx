import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
import { toast } from 'react-toastify';


const BookingHistory = ({ bookings, handleSearchInput, handleDelete, handleDateChange, selectedDate, handleTimeChange, selectedTime }) => {

    const uniqueDates = Array.from(new Set(bookings.map(booking => {
        const date = new Date(booking.datetime);
        return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    })));

    const uniqueTimes = Array.from(new Set(bookings.map(booking => {
        const date = new Date(booking.datetime);
        return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    })));

    const filteredBookings = bookings.filter(booking => {
        const date = new Date(booking.datetime).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
        const time = new Date(booking.datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
        return (selectedDate ? date === selectedDate : true) && (selectedTime ? time === selectedTime : true);
    });

    return (
        <div className="">
            <div className="flex justify-between items-center p-4">
                <div className="divider divider-warning text-1xl font-bold my-4 mt-2 ml-2">
                    ข้อมูลประวัติการจองของคิวลูกค้า
                </div>
                <select
                    className="select select-bordered select-sm w-54 max-w-54 ml-auto bg-white h-10 px-5 rounded-full text-sm focus:outline-none border border-gray-300 shadow-md"
                    onChange={handleDateChange}
                    value={selectedDate}
                >
                    <option value="">เลือกวันที่</option>
                    {uniqueDates.map(date => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>
                <select
                    className="select select-bordered select-sm w-32 max-w-32 ml-5 mr-5 bg-white h-10 px-5 rounded-full text-sm focus:outline-none border border-gray-300 shadow-md"
                    onChange={handleTimeChange}
                    value={selectedTime}
                    disabled={!selectedDate}
                >
                    <option value="">เลือกเวลา</option>
                    {uniqueTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
                <div className="form-control">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ค้นหา"
                            className="input input-bordered w-full md:w-auto pr-10 bg-white h-10 px-5 rounded-full text-sm focus:outline-none border border-gray-300 shadow-md"
                            onChange={handleSearchInput}
                        />
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto p-4 w-full">
                <table className="table-auto w-full bg-[#ffffff] shadow-xl rounded-lg border border-gray-00">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-300">
                            <th className="p-2 text-left border border-gray-300">ชื่อผู้เข้ารับบริการ</th>
                            <th className="p-2 text-left border border-gray-300">วันเวลาที่จอง</th>
                            <th className="p-2 text-left border border-gray-300">ชื่อผู้รับบริการตัด</th>
                            <th className="p-2 text-left border border-gray-300">อายุผู้รับบริการตัด</th>
                            <th className="p-2 text-left border border-gray-300">ทรงผม</th>
                            <th className="p-2 text-left border border-gray-300">สถานะ</th>
                            <th className="p-2 text-left border border-gray-300">เบอร์โทรศัพท์</th>
                            <th className="p-2 text-center border border-gray-300">ลบ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings && filteredBookings.map((booking) => (
                            <tr key={booking.booking_id} className="border-b hover:bg-gray-50">
                                <td className="p-2 border border-gray-300">{booking.user?.username}</td>
                                <td className="p-2 border border-gray-300">{new Date(booking.datetime).toLocaleString('th-TH')}</td>
                                <td className="p-2 border border-gray-300">{booking.guest?.nickname}</td>
                                <td className="p-2 border border-gray-300">{booking.guest?.age_range}</td>
                                <td className="p-2 border border-gray-300">{booking.hairstyle?.hairstyle_name}</td>
                                <td className="p-2 border border-gray-300">{booking.status}</td>
                                <td className="p-2 border border-gray-300">{booking.user?.phone}</td>
                                <td className="p-2 text-center border border-gray-300">
                                    <button
                                        className="btn btn-error ml-1 px-3 py-1 rounded-md text-sm flex items-center"
                                        onClick={(e) => handleDelete(e, booking.booking_id)}
                                    >
                                        <FontAwesomeIcon icon={faXmark} className="mr-1" />
                                        ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleDelete = async (e, bookingId) => {
        e.preventDefault();
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: "คุณจะไม่สามารถกู้คืนได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ลบ!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8889/admin/deleteBooking/${bookingId}`);
                    setBookings(prevBookings => prevBookings.filter(booking => booking.booking_id !== bookingId));
                    Swal.fire('ลบแล้ว!', 'การจองของคุณถูกลบแล้ว', 'success');
                } catch (err) {
                    Swal.fire('ผิดพลาด!', 'เกิดข้อผิดพลาดในการลบการจองของคุณ โปรดลองอีกครั้งในภายหลัง', 'error');
                }
            }
        });
    };

    const loadBookings = async () => {
        try {
            const response = await axios.get('http://localhost:8889/admin/allBook');
            setBookings(response.data.allBook);
        } catch (err) {
            console.error(err);
        }
    };

    const searchBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:8889/admin/search/bookings?search=${searchQuery}`);
            setBookings(response.data.Searchoder);
        } catch (err) {
            console.error(err);
            toast.warning(err.response.data.message);
            setSearchQuery('');
        }
    };

    useEffect(() => {
        if (searchQuery === '') {
            loadBookings();
        } else {
            searchBookings();
        }
    }, [searchQuery]);

    let timeout = null;

    const handleSearchInput = (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setSearchQuery(e.target.value);
        }, 250);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value || '');
        setSelectedTime('');
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value || '');
    };

    return (
        <BookingHistory
            bookings={bookings}
            handleSearchInput={handleSearchInput}
            handleDelete={handleDelete}
            handleDateChange={handleDateChange}
            selectedDate={selectedDate}
            handleTimeChange={handleTimeChange}
            selectedTime={selectedTime}
        />
    );
}
