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
            e.stopPropagation()
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
                            <th>ตำแหน่ง</th>
                            <th><button className="btn btn-accent" onClick={() => document.getElementById('my_modal_3').showModal()}>เพิ่ม</button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box h-4/5 max-w-1xl flex flex-col gap-2">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                                        </form>
                                        <h3 className="font-bold text-lg">เพิ่มข้อมูลผู้ใช้</h3>
                                        <p className="py-4"></p>
                                        <input type="text" placeholder="อีเมล" className="input input-bordered input-md w-full max-w-xs" />
                                        <input type="text" placeholder="เบอร์โทรศัพท์" className="input input-bordered input-md w-full max-w-xs" />
                                        <input type="text" placeholder="เพศ" className="input input-bordered input-md w-full max-w-xs" />
                                        <input type="text" placeholder="อายุ" className="input input-bordered input-md w-full max-w-xs" />
                                        <input type="text" placeholder="ตำแหน่ง" className="input input-bordered input-md w-full max-w-xs" />
                                        <button className="btn btn-accent w-16">เพิ่ม</button>
                                    </div>
                                </dialog></th>
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
                                <td>{users.user_role === "USER" ? "ผู้ใช้งาน" : ""}</td>
                                <td>
                                    <button className="btn btn-warning" style={{ marginRight: '10px' }} onClick={() => document.getElementById('my_modal_4').showModal()}>แก้ไข</button>
                                    <dialog id="my_modal_4" className="modal">
                                        <div className="modal-box h-4/5 max-w-1xl flex flex-col gap-2">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                                            </form>
                                            <h3 className="font-bold text-lg">เพิ่มข้อมูลผู้ใช้</h3>
                                            <p className="py-4"></p>
                                            <input type="text" placeholder="อีเมล" className="input input-bordered input-md w-full max-w-xs" />
                                            <input type="text" placeholder="เบอร์โทรศัพท์" className="input input-bordered input-md w-full max-w-xs" />
                                            <input type="text" placeholder="เพศ" className="input input-bordered input-md w-full max-w-xs" />
                                            <input type="text" placeholder="อายุ" className="input input-bordered input-md w-full max-w-xs" />
                                            <input type="text" placeholder="ตำแหน่ง" className="input input-bordered input-md w-full max-w-xs" />
                                            <button className="btn btn-accent w-16">แก้ไข</button>
                                        </div>
                                    </dialog>
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
