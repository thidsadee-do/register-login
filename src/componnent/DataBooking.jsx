import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import userAuth from '../hooks/userAuth';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: 'http://localhost:8889/admin',
});

export default function DataBooking() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
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
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [refetch]);

    const handleDelete = async (e, booking_id, phone, name) => {
        e.stopPropagation();

        Swal.fire({
            title: `คุณแน่ใจหรือไม่ที่ต้องการยกเลิกคิวคุณ? ${name}`,
            text: `โทรแจ้งลูกค้าถ้ามีการยกเลิก ${phone}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยันการลบ',
            cancelButtonText: 'ยกเลิก',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await api.patch(`/booking/${Number(booking_id)}?status=2`);
                    setBookings((prevBookings) =>
                        prevBookings.filter((booking) => booking.booking_id !== booking_id)
                    );

                    Swal.fire({
                        icon: 'success',
                        title: 'ลบข้อมูลสำเร็จ',
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
        try {
            const response = await api.patch(`/booking/${Number(id)}?status=1`);
            if (response.status === 200) {
                toast.success('ยืนยันเรียนร้อยแล้ว', {
                    autoClose: 1000,
                });
                setRefetch((prev) => !prev);
            }
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="divider divider-warning text-1xl font-bold my-4">
                ข้อมูลการจองคิวลูกค้า
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-[#fed7aa] shadow-xl rounded-lg border border-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">ชื่อผู้เข้ารับ</th>
                            <th className="px-4 py-2">วันเวลาที่จอง</th>
                            <th className="px-4 py-2">ชื่อผู้รับบริการตัด</th>
                            <th className="px-4 py-2">อายุผู้รับบริการตัด</th>
                            <th className="px-4 py-2">ทรงผม</th>
                            <th className="px-4 py-2">สถานะ</th>
                            <th className="px-4 py-2">เบอร์โทรศัพท์</th>
                            <th className="px-4 py-2">การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.booking_id} className="bg-white">
                                <td className="border px-4 py-2">{booking.user?.username}</td>
                                <td className="border px-4 py-2">{new Date(booking.datetime).toLocaleString('th-TH')}</td>
                                <td className="border px-4 py-2">{booking.guest.nickname}</td>
                                <td className="border px-4 py-2">{booking.guest.age_range}</td>
                                <td className="border px-4 py-2">{booking.hairstyle.hairstyle_name}</td>
                                <td className="border px-4 py-2">{booking.status}</td>
                                <td className="border px-4 py-2">{booking.user?.phone}</td>
                                <td className="border px-4 py-2 flex justify-around">
                                    <button
                                        className="btn btn-accent px-2 py-1 rounded-md text-sm flex items-center"
                                        onClick={() => handleStatusUpdate(booking.booking_id)}
                                    >
                                        <FontAwesomeIcon icon={faCheck} className="mr-1" />
                                        ยืนยันรับคิว
                                    </button>
                                    <button
                                        className="btn btn-error px-2 py-1 rounded-md text-sm flex items-center"
                                        onClick={(e) => handleDelete(e, booking.booking_id, booking.user?.phone, booking.guest.nickname)}
                                    >
                                        <FontAwesomeIcon icon={faXmark} className="mr-1" />
                                        ยกเลิก
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
