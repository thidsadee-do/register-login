import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DataUser() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async (req, res, next) => {
            const rs = await axios.get("http://localhost:8889/admin/users");
            setUsers(rs.data.users);
        };
        getUsers();
    }, []);

    const hdlDelete = async (e, user_id) =>{
        try {
              
            const token = localStorage.getItem('token')
              const rs = await axios.delete(`http://localhost:8889/admin/deleteUsers/${user_id}`, {
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
                            <th>ลำดับ</th>
                            <th>อีเมล</th>
                            <th>เบอร์โทรศัพท์</th>
                            <th>เพศ</th>
                            <th>อายุ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.filter(users => users.user_role !== "ADMIN").map((users) => (
                            <tr key={users.user_id} users={users}>
                                <th>{users.user_id}</th>
                                <td>{users.email}</td>
                                <td>{users.phone}</td>
                                <td>{users.sex}</td>
                                <td>{users.age}</td>
                                
                                <td>
                                    <button className="btn btn-error" onClick={(e) => hdlDelete(e, users.user_id)}>ลบ</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
