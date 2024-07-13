import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function DataHairStyle() {
    const navigate = useNavigate();
    const [hairstyle, setHairStyle] = useState([]);
    useEffect(() => {
        const getHairStyle = async () => {
            const rs = await axios.get("http://localhost:8889/admin/hairstyle");
            setHairStyle(rs.data.hairstyle);
        };
        getHairStyle();
    }, []);

    const hdlDelete = async (e, hairstyle_id) => {
        e.stopPropagation();
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ลบเลย!',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(`http://localhost:8889/admin/deleteHairstyle/${hairstyle_id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    Swal.fire(
                        'ลบแล้ว!',
                        'ข้อมูลของคุณถูกลบเรียบร้อย.',
                        'success'
                    );
                    location.reload();
                } catch (err) {
                    console.log(err);
                }
            }
        });
    };

    const hdlCreateStylehair = () => {
        navigate("/CreateStylehair");
    };

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
        <div className="p-4">
            <div className="divider divider-warning text-1xl font-bold my-4">เพิ่ม/ลบ/แก้ไข</div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="text-xs font-medium text-red-700">
                            <th>ลำดับ</th>
                            <th>ชื่อทรงผม</th>
                            <th>ราคา</th>
                            <th>รูปทรงผม</th>
                            <th>
                                <button className="btn btn-accent flex items-center" onClick={hdlCreateStylehair}>
                                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                    เพิ่ม
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {hairstyle.map((hairstyle) => (
                            <tr key={hairstyle.hairstyle_id} hairstyle={hairstyle}>
                                <th>{hairstyle.hairstyle_id}</th>
                                <td>{hairstyle.hairstyle_name}</td>
                                <td>{hairstyle.hairstyle_price}</td>
                                <td><img className="max-w-[100px]" src={hairstyle.hairstyle_img} alt={hairstyle.hairstyle_name} /></td>
                                <td className="flex items-center">
                                    <button className="btn btn-warning flex items-center mr-2" onClick={() => document.getElementById(`my_modal_${hairstyle.hairstyle_id}`).showModal()}>
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                        แก้ไข
                                    </button>
                                    <button className="btn btn-error flex items-center" onClick={(e) => hdlDelete(e, hairstyle.hairstyle_id)}>
                                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                        ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {hairstyle.map((hairstyle, index) => (
                <Modal key={index} hairstyle={hairstyle} />
            ))}
        </div>
    );
}

const Modal = ({ hairstyle }) => {
    const modalId = `my_modal_${hairstyle.hairstyle_id}`;
    const [editData, setEditData] = useState({
        hairstyle_name: hairstyle.hairstyle_name,
        hairstyle_price: hairstyle.hairstyle_price,
        hairstyle_img: hairstyle.hairstyle_img,
    });
    const [isEditing, setEditing] = useState(false);

    const handleEditClick = () => {
        setEditData({ ...hairstyle });
        setEditing(true);
    };

    const handleSaveClick = async (e) => {
        setEditing(false);
        try {
            e.stopPropagation();
            const hairstyle_id = hairstyle.hairstyle_id;
            const apiUrl = `http://localhost:8889/admin/updateHairstyle/${hairstyle_id}`;
            await axios.patch(apiUrl, editData);
            location.reload();
            setEditing(false);
            document.getElementById(modalId).close();
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการแก้ไข", error);
        }
    };

    const handleChange = (e) => {
        setEditData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const hdlback = (id) => {
        if (isEditing) {
            setEditing(!isEditing);
        }
        document.getElementById(id).close();
    };

    return (
        <dialog id={modalId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-5">แก้ไข</h3>
                <h3 className="text-lg mb-5">ชื่อทรงผม: {isEditing ? <input type="text" name="hairstyle_name" value={editData.hairstyle_name} onChange={handleChange} className="input input-bordered w-full" /> : hairstyle.hairstyle_name}</h3>
                <h3 className="text-lg mb-5">ราคา: {isEditing ? <input type="text" name="hairstyle_price" value={editData.hairstyle_price} onChange={handleChange} className="input input-bordered w-full" /> : hairstyle.hairstyle_price}</h3>
                <h3 className="text-lg mb-5">ภาพเป็นลิ้ง: {isEditing ? <input type="text" name="hairstyle_img" value={editData.hairstyle_img} onChange={handleChange} className="input input-bordered w-full" /> : hairstyle.hairstyle_img}</h3>

                <div className="flex justify-end space-x-2">
                    {isEditing ? (
                        <button className="btn btn-accent text-white" onClick={handleSaveClick}>บันทึก</button>
                    ) : (
                        <button className="btn btn-warning" onClick={handleEditClick}>แก้ไข</button>
                    )}
                    <button type="button" className="btn btn-error" onClick={() => hdlback(modalId)}>ย้อนกลับ</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button className="btn">Close</button>
            </form>
        </dialog>
    );
};
