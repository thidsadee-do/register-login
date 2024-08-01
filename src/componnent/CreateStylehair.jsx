import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function CreateStylehair() {
    const [createStylehair, setCreateStylehair] = useState({
        hairstyle_name: "",
        hairstyle_price: "",
        hairstyle_img: "",
    });
    const navigate = useNavigate()

    const hdlCreateStylehair = async (e) => {
        e.preventDefault();
        
        // Validation check
        if (!createStylehair.hairstyle_name || !createStylehair.hairstyle_price || !createStylehair.hairstyle_img) {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                confirmButtonColor: '#3085d6',
            });
            return;
        }

        try {
            await axios.post('http://localhost:8889/admin/createhairstyle', createStylehair);
            Swal.fire({
                icon: 'success',
                title: 'เพิ่มข้อมูลเรียบร้อย',
                confirmButtonColor: '#3085d6',
                preConfirm: () => navigate('/DataHairStyle')
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาดในการลบ',
                text: 'โปรดลองอีกครั้งในภายหลัง',
                confirmButtonColor: '#3085d6',
            });
        }
    };

    const hdlChange = (e) => {
        const { name, value } = e.target;
        setCreateStylehair(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form onSubmit={hdlCreateStylehair} className="max-w-[600px] border rounded mx-auto p-4 gap-6 mt-6 bg-gray-100 shadow-lg">
            <label className="flex flex-col text-gray-800">
                <span className="text-sm font-semibold">ชื่อทรงผม</span>
                <input
                    type="text"
                    placeholder="ชื่อทรงผม"
                    className="input input-bordered mt-1"
                    name="hairstyle_name"
                    value={createStylehair.hairstyle_name}
                    onChange={hdlChange}
                />
            </label>
            <label className="flex flex-col text-gray-800">
                <span className="text-sm font-semibold">ราคาทรงผม</span>
                <input
                    type="text"
                    placeholder="ราคา"
                    className="input input-bordered mt-1"
                    name="hairstyle_price"
                    value={createStylehair.hairstyle_price}
                    onChange={hdlChange}
                />
            </label>
            <label className="flex flex-col text-gray-800">
                <span className="text-sm font-semibold">URL รูปทรงผม</span>
                <input
                    type="text"
                    placeholder="URL รูปภาพ"
                    className="input input-bordered mt-1"
                    name="hairstyle_img"
                    value={createStylehair.hairstyle_img}
                    onChange={hdlChange}
                />
            </label>
            <button type="submit" className="btn btn-info mt-4">เพิ่มข้อมูล</button>
        </form>
    );
}
