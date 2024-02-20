import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminHome() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async (req, res, next) => {
                const rs = await axios.get("http://localhost:8889/admin/users"); 
                setUsers(rs.data.users);
            };
        getUsers();
    }, []);

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
                        <tr>
                            <th>ลำดับ</th>
                            <th>อีเมล</th>
                            <th>เบอร์โทรศัพท์</th>
                            <th>เพศ</th>
                            <th>อายุ</th>
                            <th>ตำแหน่ง</th>
                            <th><button className="btn btn-accent">เพิ่ม</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((users) => (
                        <tr>
                            <th>{users.user_id}</th>
                            <td>{users.email}</td>
                            <td>{users.phone}</td>
                            <td>{users.sex}</td>
                            <td>{users.age}</td>
                            <td>{users.user_role}</td>
                            <td>
                            <button className="btn btn-warning" style={{  marginRight: '10px'}}>แก้ไข</button>
                            <button className="btn btn-error">ลบ</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
