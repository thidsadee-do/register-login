import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DataHairStyle() {
    const navigate = useNavigate();
    const [hairstyle, setHairStyle] = useState([]);
    useEffect(() => {
        const getHairStyle = async (req, res, next) => {
            const rs = await axios.get("http://localhost:8889/admin/hairstyle");
            setHairStyle(rs.data.hairstyle);
        };
        getHairStyle();
    }, []);

    const hdlDelete = async (e, hairstyle_id) => {
        try {
            e.stopPropagation()
            const token = localStorage.getItem('token')
            const rs = await axios.delete(`http://localhost:8889/admin/deleteHairstyle/${hairstyle_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert('Delete Successful')
            location.reload();
            setTrigger(prv => !prv)
        } catch (err) {
            console.log(err)
        }

    }

    const hdlCreateStylehair = () => {
        navigate("/CreateStylehair");
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
                            <th>ชื่อทรงผม</th>
                            <th>ราคา</th>
                            <th>รูปทรงผม</th>
                            <th><button className="btn btn-accent" onClick={hdlCreateStylehair}>เพิ่ม</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {hairstyle.map((hairstyle) => (
                            <tr key={hairstyle.hairstyle_id} hairstyle={hairstyle}>
                                <th>{hairstyle.hairstyle_id}</th>
                                <td>{hairstyle.hairstyle_name}</td>
                                <td>{hairstyle.hairstyle_price}</td>
                                <td><img className="max-w-[100px]" src={hairstyle.hairstyle_img} /></td>
                                <td>
                                    <button className="btn btn-warning" style={{ marginRight: '10px' }} onClick={() => document.getElementById(`my_modal_${hairstyle.hairstyle_id}`).showModal()}>แก้ไข</button>

                                    <button className="btn btn-error" onClick={(e) => hdlDelete(e, hairstyle.hairstyle_id)}>ลบ</button>
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
    console.log(modalId)
    const [editData, setEditData] = useState({
        hairstyle_name: hairstyle.hairstyle_name,
        hairstyle_price: hairstyle.hairstyle_price,
        hairstyle_img: hairstyle.hairstyle_img,
    });
    const [isEditing, setEditing] = useState(false);

    const handleEditCilck = () => {
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
    return (
        <dialog id={modalId} className="modal">
            {console.log(modalId)}
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-5">
                    แก้ไข
                </h3>
                <h3 className="text-lg mb-5">ชื่อทรงผม : {isEditing ? <input type="text" name="hairstyle_name" value={editData.hairstyle_name} onChange={handleChange}></input> : hairstyle.hairstyle_name}</h3>
                <h3 className="text-lg mb-5">ราคา : {isEditing ? <input type="text" name="hairstyle_price" value={editData.hairstyle_price} onChange={handleChange}></input> : hairstyle.hairstyle_price}</h3>
                <h3 className="text-lg mb-5 w-50">ภาพเป็นลิ้ง : {isEditing ? <input type="text" name="hairstyle_img" value={editData.hairstyle_img} onChange={handleChange}></input> : hairstyle.hairstyle_img}</h3>
                {/* <h3 className="text-lg mb-5">
                    ประเภท : {isEditing ? (
                        <select name="type_name" value={editData.type_name} onChange={handleChange}>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                        </select>
                    ) : (
                        table.type_name
                    )}
                </h3> */}

                <div className="flex justify-end">
                    {isEditing ? (
                        <button className=" btn btn-accent text-white" onClick={handleSaveClick}>บันทึก</button>
                    ) : (
                        <button className=" btn btn-warning" onClick={handleEditCilck}>แก้ไข</button>
                    )}
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => document.getElementById(modalId).close()}>
                    Close
                </button>
            </form>
        </dialog>
    )
}
