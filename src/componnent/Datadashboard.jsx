import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark, faSquareCaretRight, faSquareCaretLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2'; // Ensure SweetAlert2 is imported
import 'sweetalert2/dist/sweetalert2.css'; // Import SweetAlert2 styles

const BookingHistory = ({
    bookings,
    handleSearchInput,
    handleDelete,
    handleDateChange,
    selectedDate,
    handleTimeChange,
    selectedTime,
    currentPage,
    totalPages,
    handlePageChange,
}) => {
    const uniqueDates = Array.from(
        new Set(
            bookings.map((booking) => {
                const date = new Date(booking.datetime);
                return date.toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
            })
        )
    );

    const uniqueTimes = Array.from(
        new Set(
            bookings.map((booking) => {
                const date = new Date(booking.datetime);
                return date.toLocaleTimeString('th-TH', {
                    hour: '2-digit',
                    minute: '2-digit',
                });
            })
        )
    );


    const users = bookings.map((booking) => booking.user);
    const nonAdminUsers = users.filter((user) => user && user.user_role !== 'ADMIN');
    const [hairstyle, setHairStyle] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const getHairStyle = async () => {
            const rs = await axios.get("http://localhost:8889/admin/hairstyle");
            setHairStyle(rs.data.hairstyle);
        };
        getHairStyle();
    }, [reload]);

    const filteredBookings = bookings.filter((booking) => {
        const date = new Date(booking.datetime).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        const time = new Date(booking.datetime).toLocaleTimeString('th-TH', {
            hour: '2-digit',
            minute: '2-digit',
        });
        return (
            (selectedDate ? date === selectedDate : true) &&
            (selectedTime ? time === selectedTime : true)
        );

    });

    return (
        <div className="">
            <div className="flex flex-col p-4">
                <div className="flex items-center justify-between">
                    <div className="divider divider-warning text-2xl font-bold my-4 mt-2 ml-2">
                        ข้อมูลประวัติการจองของคิวลูกค้า
                    </div>
                    <div className="flex items-center">
                            <select
                                className="select select-bordered select-sm w-48 bg-white h-10 rounded-full text-sm focus:outline-none border border-gray-300 shadow-md"
                                onChange={handleDateChange}
                                value={selectedDate}
                            >
                                <option value="">เลือกวันที่</option>
                                {uniqueDates.map((date) => (
                                    <option key={date} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="select select-bordered select-sm w-32 ml-5 mr-5 bg-white h-10 rounded-full text-sm focus:outline-none border border-gray-300 shadow-md"
                                onChange={handleTimeChange}
                                value={selectedTime}
                                disabled={!selectedDate}
                            >
                                <option value="">เลือกเวลา</option>
                                {uniqueTimes
                                    .slice() 
                                    .sort((a, b) => {
                                        const [hourA, minuteA] = a.split(":").map(Number);
                                        const [hourB, minuteB] = b.split(":").map(Number);
                                        // Compare hours first, then minutes
                                        if (hourA !== hourB) {
                                            return hourA - hourB;
                                        } else {
                                            return minuteA - minuteB;
                                        }
                                    })
                                    .map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                            </select>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="ค้นหา"
                                className="input input-bordered w-full md:w-auto pr-10 bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 py-2 focus:shadow-lg focus:shadow-rose-400 dark:shadow-md dark:shadow-purple-500 h-10 px-2 rounded-full text-sm focus:outline-none border border-gray-300 shadow-inner"
                                onChange={handleSearchInput}
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <div className="stats shadow mb-4 w-60 bg-gradient-to-b to-[#f9a825] from-[#f8f8f8]">
                        <div className="stat text-white">
                            <div className="stat-title">จำนวนผู้ใช้งาน</div>
                            <div className="stat-value text-3xl ">
                                {nonAdminUsers.length} ผู้ใช้งาน
                            </div>
                        </div>
                    </div>
                    <div className='stats shadow mb-4 w-60 bg-gradient-to-b to-[#f9a825] from-[#f2f2f2]'>
                        <div className='stat text-white '>
                            <div className='stat-title'>รวมประวัติการจองทั้งหมด</div>
                            <div className='stat-value text-3xl '>
                                {bookings.length} คิว
                            </div>
                        </div>
                    </div>
                    <div className='stats shadow mb-4 w-60 bg-gradient-to-b to-[#f9a825] from-[#fbfbfa]'>
                        <div className='stat text-white'>
                            <div className='stat-title'>รวมทรงผมทั้งหมด</div>
                            <div className='stat-value text-3xl '>
                                {hairstyle.length} ทรงผม
                            </div>
                        </div>
                    </div>
                    
                    {/* <div className='stats shadow mb-4 w-60 bg-gradient-to-b to-[#f9a825] from-[#fbfbfa]'>
                        <div className='stat text-white'>
                            <div className='stat-title'>รวมยืนยันทั้งหมด</div>
                            <div className='stat-value text-3xl '>
                                {length} ยืนยันทั้งหมด
                            </div>
                        </div>
                    </div>
                    <div className='stats shadow mb-4 w-60 bg-gradient-to-b to-[#f9a825] from-[#fbfbfa]'>
                        <div className='stat text-white'>
                            <div className='stat-title'>รวมยกเลิกทั้งหมด</div>
                            <div className='stat-value text-3xl '>
                                {length} ยกเลิกทั้งหมด
                            </div>
                        </div>
                    </div> */}

                </div>
                <button className="btn btn-link">
                    <a href="/DataBooking" className="hover:underline">
                        หน้ายืนยันรับคิว
                    </a>
                </button>
                <div className="overflow-x-auto p-4 w-full">
                    <table className="table-auto w-full bg-[#ffffff] shadow-xl rounded-lg border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300">
                                <th className="p-2 text-left border border-gray-300">ลำดับ</th>
                                <th className="p-2 text-left border border-gray-300">ชื่อผู้ใช้งาน</th>
                                <th className="p-2 text-left border border-gray-300">วันเวลาที่จอง</th>
                                <th className="p-2 text-left border border-gray-300">ชื่อผู้รับบริการตัดผม</th>
                                <th className="p-2 text-left border border-gray-300">อายุผู้รับบริการตัดผม</th>
                                <th className="p-2 text-left border border-gray-300">ทรงผม</th>
                                <th className="p-2 text-left border border-gray-300">สถานะ</th>
                                <th className="p-2 text-left border border-gray-300">เบอร์โทรศัพท์</th>
                                <th className="p-2 text-center border border-gray-300">ลบ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings
                                .slice((currentPage - 1) * 20, currentPage * 20)
                                .map((booking, index) => (
                                    <tr
                                        key={booking.booking_id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="p-2 border border-gray-300">
                                            {(currentPage - 1) * 20 + index + 1}
                                        </td>
                                        <td className="p-2 border border-gray-300">
                                            {booking.user?.username}
                                        </td>
                                        <td className="p-2 border border-gray-300">
                                            {new Date(
                                                booking.datetime
                                            ).toLocaleString('th-TH')}
                                        </td>
                                        <td className="p-2 border border-gray-300">
                                            {booking.guest?.nickname}
                                        </td>
                                        <td className="p-2 border border-gray-300">
                                            {booking.guest?.age_range}
                                        </td>
                                        <td className="p-2 border border-gray-300">
                                            {booking.hairstyle?.hairstyle_name}
                                        </td>
                                        <td
                                            className={`p-2 border border-gray-300 ${booking.status === 1
                                                ? 'text-green-600'
                                                : booking.status === 2
                                                    ? 'text-red-600'
                                                    : 'text-gray-600'
                                                }`}
                                        >
                                            {booking.status === 1
                                                ? 'ยืนยันแล้ว'
                                                : booking.status === 2
                                                    ? 'ยกเลิก'
                                                    : 'รอยืนยัน'}
                                        </td>
                                        <td className="p-2 border border-gray-300">
                                            {booking.user?.phone}
                                        </td>
                                        <td onClick={(e) => handleDelete(e, booking.booking_id)} className="p-2 text-center border border-gray-300">
                                            <button className="group relative flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600">
                                                <svg viewBox="0 0 1.625 1.625" className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000" height={10} width={10}>
                                                    <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195" />
                                                    <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033" />
                                                    <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016" />
                                                </svg>
                                                <svg width={16} fill="none" viewBox="0 0 39 7" className="origin-right duration-500 group-hover:rotate-90">
                                                    <line strokeWidth={4} stroke="white" y2={5} x2={39} y1={5} />
                                                    <line strokeWidth={3} stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1={12} />
                                                </svg>
                                                <svg width={16} fill="none" viewBox="0 0 33 39" className>
                                                    <mask fill="white" id="path-1-inside-1_8_19">
                                                        <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
                                                    </mask>
                                                    <path mask="url(#path-1-inside-1_8_19)" fill="white" d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" />
                                                    <path strokeWidth={4} stroke="white" d="M12 6L12 29" />
                                                    <path strokeWidth={4} stroke="white" d="M21 6V29" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center gap-4 items-center p-4">
                    <button
                        className={`btn ${currentPage === 1 ? 'btn-disabled' : 'btn-primary'
                            }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <FontAwesomeIcon icon={faSquareCaretLeft} />
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className={`btn ${currentPage === totalPages
                            ? 'btn-disabled'
                            : 'btn-primary'
                            }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <FontAwesomeIcon icon={faSquareCaretRight} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 20;

    const handleDelete = async (e, bookingId) => {
        e.preventDefault();
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: 'คุณจะไม่สามารถกู้คืนได้!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ลบ!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(
                        `http://localhost:8889/admin/deleteBooking/${bookingId}`
                    );
                    setBookings((prevBookings) =>
                        prevBookings.filter(
                            (booking) => booking.booking_id !== bookingId
                        )
                    );
                    Swal.fire('ลบแล้ว!', 'การจองของคุณถูกลบแล้ว', 'success');
                } catch (err) {
                    Swal.fire(
                        'ผิดพลาด!',
                        'เกิดข้อผิดพลาดในการลบการจองของคุณ โปรดลองอีกครั้งในภายหลัง',
                        'error'
                    );
                }
            }
        });
    };

    const loadBookings = async (page = 1) => {
        try {
            const response = await axios.get(
                `http://localhost:8889/admin/allBook?page=${page}&limit=${itemsPerPage}`
            );
            setBookings(response.data.allBook);
            setTotalPages(
                Math.ceil(response.data.allBook.length / itemsPerPage)
            );
        } catch (err) {
            console.error(err);
        }
    };

    const searchBookings = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8889/admin/search/bookings?search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
            );
            setBookings(response.data.Searchoder);
            setTotalPages(
                Math.ceil(response.data.Searchoder.length / itemsPerPage)
            );
        } catch (err) {
            console.error(err);
            Swal.fire('Warning!', err.response.data.message, 'warning'); // Use Swal for warnings
            setSearchQuery('');
        }
    };

    useEffect(() => {
        if (searchQuery === '') {
            loadBookings(currentPage);
        } else {
            searchBookings();
        }
    }, [searchQuery, currentPage]);

    let timeout = null;

    const handleSearchInput = (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
        }, 250);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value || '');
        setSelectedTime('');
        setCurrentPage(1);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value || '');
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
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
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
        />
    );
}
