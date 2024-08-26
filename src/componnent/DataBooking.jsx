import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import userAuth from '../hooks/userAuth';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: 'http://localhost:8889/admin',
});

export default function DataBooking() {
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, refetch, setRefetch } = userAuth();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/bookings', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookings(response.data.bookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [refetch]);

    const handleDelete = async (e, booking_id, phone, name) => {
        e.stopPropagation();

        Swal.fire({
            title: 'คุณแน่ใจหรือไม่ที่ต้องการยกเลิกคิวคุณ?' + " " + name,
            text: 'โทรแจ้งลูกค้าถ้ามีการยกเลิก' + " " + phone,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยันยกเลิก',
            cancelButtonText: 'ยกเลิก',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.patch(`http://localhost:8889/admin/booking/${Number(booking_id)}?status=2`);
                    setBookings((prevBookings) =>
                        prevBookings.filter((booking) => booking.booking_id !== booking_id)
                    );

                    Swal.fire({
                        icon: 'success',
                        title: 'ยกเลิกสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } catch (error) {
                    console.error('Error deleting booking:', error);

                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาดในการลบ',
                        text: 'โปรดลองอีกครั้งในภายหลัง',
                        confirmButtonColor: '#3085d6',
                    });
                }
            }
        });
    };

    const handleStatusUpdate = async (id) => {
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่ที่ต้องการยืนยันรับคิวนี้?',
            text: 'การยืนยันนี้จะเปลี่ยนสถานะของคิวเป็น "ยืนยันรับคิว"',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.patch(`http://localhost:8889/admin/booking/${Number(id)}?status=1`);
                    if (response.status === 200) {
                        toast.success('ยืนยันรับคิวเรียบร้อยแล้ว', {
                            autoClose: 1000,
                        });
                        setRefetch((prev) => !prev);
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาดในการยืนยัน',
                        text: 'โปรดลองอีกครั้งในภายหลัง',
                        confirmButtonColor: '#3085d6',
                    });
                }
            }
        });
    };

    const filteredBookings = bookings.filter(
        (booking) =>
            booking.user?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.guest.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.hairstyle.hairstyle_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.user?.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="divider divider-warning text-1xl font-bold my-4">
                ข้อมูลการจองคิวลูกค้า
            </div>

            <div className="flex mb-4 justify-center">
                <div className="relative text-gray-600 mx-10 w-3/12">
                    <input
                        type="search"
                        name="search"
                        placeholder="ค้นหา"
                        className="bg-white w-full h-10 px-4 pr-10 rounded-full text-sm focus:outline-none border border-gray-300 shadow-inner"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="absolute right-0 -top-2 mt-3 mr-4 text-gray-600">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
            <div className="flex justify-center mr-5">
                {bookings.length === 0 ? (
                    <div className="stats shadow mb-4">
                        <div className="stat">
                            <div className="stat-title text-gray-500">ไม่มีการจอง</div>
                            <div className="stat-value text-gray-400">ไม่พบข้อมูลคิว</div>
                        </div>
                    </div>
                ) : (
                    <div className="stats shadow mb-4">
                        <div className="stat">
                            <div className="stat-title text-green-700">รออนุมัติ</div>
                            <div className="stat-value text-red-600">ทั้งหมด {bookings.length} คิว</div>
                        </div>
                    </div>
                )}
            </div>

            <div className='btn btn-link justify-center'>
                <a href="/Datadashboard" className="hover:underline">ประวัติการจอง</a>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-[#ffffff] shadow-xl rounded-lg border border-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">ชื่อผู้ใช้งาน</th>
                            <th className="px-4 py-2">วันเวลาที่จอง</th>
                            <th className="px-4 py-2">ชื่อผู้รับบริการตัด</th>
                            <th className="px-4 py-2">อายุผู้รับบริการตัด</th>
                            <th className="px-4 py-2">ทรงผม</th>
                            <th className="px-4 py-2">สถานะ</th>
                            <th className="px-4 py-2">เบอร์โทรศัพท์</th>
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking) => (
                            <tr key={booking.booking_id} className="bg-white border-b hover:bg-gray-50">
                                <td className="border px-4 py-2 text-left">{booking.user?.username}</td>
                                <td className="border px-4 py-2 text-left">{new Date(booking.datetime).toLocaleString('th-TH')}</td>
                                <td className="border px-4 py-2 text-left">{booking.guest.nickname}</td>
                                <td className="border px-4 py-2 text-left">{booking.guest.age_range}</td>
                                <td className="border px-4 py-2 text-left">{booking.hairstyle.hairstyle_name}</td>
                                <td className="border px-4 py-2 text-left">
                                    {booking.status === 1 ? 'ยืนยันแล้ว' : booking.status === 2 ? 'ยกเลิก' : 'รอยืนยัน'}
                                </td>
                                <td className="border px-4 py-2 text-left">{booking.user?.phone}</td>
                                <td className="border px-4 py-2 flex justify-around">
                                    <button
                                        className="btn btn-accent px-3 py-1 rounded-md text-sm flex items-center space-x-2"
                                        onClick={() => handleStatusUpdate(booking.booking_id)}>
                                        <FontAwesomeIcon icon={faCheck} className="text-white" />
                                        <span>ยืนยันรับคิว</span>
                                    </button>

                                    <button
                                        className="btn btn-error px-3 py-1 rounded-md text-sm flex items-center space-x-2"
                                        onClick={(e) => handleDelete(e, booking.booking_id, booking.user?.phone, booking.guest.nickname)}
                                    >
                                        <FontAwesomeIcon icon={faXmark} className="text-white" />
                                        <span>ยกเลิก</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>


                </table>
            </div>
        </div>
    );
}
