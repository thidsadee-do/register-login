import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import userAuth from "../hooks/userAuth";

export default function DataUser() {
    const [users, setUsers] = useState([]);
    const { refetch, setRefetch } = userAuth();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const rs = await axios.get("http://localhost:8889/admin/users");
                setUsers(rs.data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        getUsers();
    }, [refetch]);

    const hdlDelete = async (e, user_id) => {
        e.stopPropagation();

        const result = await Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: "คุณต้องการลบผู้ใช้นี้?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ใช่, ลบเลย!",
            cancelButtonText: "ยกเลิก",
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(
                    `http://localhost:8889/admin/deleteUsers/${user_id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setUsers(users.filter((user) => user.user_id !== user_id));

                Swal.fire({
                    icon: "success",
                    title: "ลบผู้ใช้สำเร็จ",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                console.error("Error deleting user:", error);

                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาดในการลบ",
                    text: "โปรดลองอีกครั้งในภายหลัง",
                    confirmButtonColor: "#3085d6",
                });
            }
        }
    };

    return (
        <div className="p-4">
            <div className="divider divider-warning text-2xl font-bold mb-4">
                ข้อมูลผู้ใช้งานทั้งหมด
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left border-b border-gray-300">ID</th>
                            <th className="py-3 px-4 text-left border-b border-gray-300">อีเมล</th>
                            <th className="py-3 px-4 text-left border-b border-gray-300">เบอร์โทรศัพท์</th>
                            <th className="py-3 px-4 text-left border-b border-gray-300">เพศ</th>
                            <th className="py-3 px-4 text-left border-b border-gray-300">อายุ</th>
                            <th className="py-3 px-4 text-left border-b border-gray-300">การดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter((user) => user.user_role !== "ADMIN")
                            .map((user) => (
                                <tr key={user.user_id} className="hover:bg-gray-100 border-b">
                                    <td className="py-2 px-4 border-b border-gray-300">{user.user_id}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{user.phone}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{user.sex}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{user.age}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        <button
                                            className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition duration-200 flex items-center"
                                            onClick={(e) => hdlDelete(e, user.user_id)}
                                            title="Delete User"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="mr-1" />
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
}
