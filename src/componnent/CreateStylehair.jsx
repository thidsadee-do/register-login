import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function CreateStylehair() {
    const [createStylehair, setCreateStylehair] = useState({
        hairstyle_name: "",
        hairstyle_price: "",
    });
    const navigate = useNavigate()
    const fileInput = useRef(null)
    const [selectFile, setSelectFile] = useState(null)

    const hdlCreateStylehair = async (e) => {
        e.preventDefault();
        const file = fileInput.current.files[0];

        // Validation check
        if (!createStylehair.hairstyle_name || !createStylehair.hairstyle_price) {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                confirmButtonColor: '#3085d6',
            });
            return;
        }

        const formData = new FormData();

        Object.entries(createStylehair).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (file) {
            formData.append('image', file);
        }

        try {
            await axios.post('http://localhost:8889/admin/createhairstyle', formData);
            Swal.fire({
                icon: 'success',
                title: 'เพิ่มข้อมูลเรียบร้อย',
                confirmButtonColor: '#3085d6',
                preConfirm: () => navigate('/DataHairStyle')
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'กรุณากรอกข้อมูลให้ครบ',
                text: 'โปรดกรอกข้อมูลให้ครบลองอีกครั้งในภายหลัง',
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

    const hdlChangeFile = () => {
        const file = fileInput.current.files[0]
        setSelectFile(file)
    }


    return (
        <form onSubmit={hdlCreateStylehair} className="max-w-[600px] h-auto border rounded mx-auto p-4 gap-6 mt-6 bg-gray-100 shadow-lg">
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
            <input type="file" className="file-input file-input-bordered file-input-xs w-full max-w-xs flex col-auto mt-4" ref={fileInput} onChange={hdlChangeFile} />
            <button type="submit" className="btn btn-info mt-4 btn-sm">เพิ่มข้อมูล</button>
        </form>
    );
}
