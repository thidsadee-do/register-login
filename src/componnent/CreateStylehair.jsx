import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateStylehair() {
    const [createStylehair, setCreateStylehair] = useState({
        hairstyle_name: "",
        hairstyle_price: "",
        hairstyle_img: "",
    });

    // useEffect(() => {
    //     const getcreatestylehair = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8889/admin/createstylehair");
    //             setCreateStylehair(response.data); // Adjust this based on your API response structure
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    //     getcreatestylehair();
    // }, []);

    const hdlCreateStylehair = (e) => {
        e.preventDefault()
        // alert(555)
        const create = () => {
            try {
                axios.post('http://localhost:8889/admin/createhairstyle', createStylehair)
                alert("เพิ่มข้อมูลเรียบร้อย")
            } catch (error) {
                alert(error)
            }
        }

        create()
    }

    const hdlChange = (e) => {
        const { name, value } = e.target;
        setCreateStylehair(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    

    const hdlDelete = async (e, createstylehair_id) => {
        e.stopPropagation();
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8889/admin/createStylehair/${createstylehair_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Deleted Successfully');
            // You may want to update state or perform any other necessary actions after deletion
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const formatDate = (dateString) => {
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        };
        const date = new Date(dateString);
        return date.toLocaleDateString("th-TH", options);
    };

    return (
            <form onSubmit={hdlCreateStylehair} className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6 mt-6">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">ชื่อทรงผม</span>
                    </div>
                    <input
                        type="text"
                        placeholder="ชื่อทรงผม"
                        className="input input-bordered w-full"
                        name="hairstyle_name"
                        value={createStylehair.hairstyle_name}
                        onChange={hdlChange}
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">ราคาทรงผม</span>
                    </div>
                    <input
                        type="text"
                        placeholder="ราคา"
                        className="input input-bordered w-full"
                        name="hairstyle_price"
                        value={createStylehair.hairstyle_price}
                        onChange={hdlChange}
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">รูปทรงผมเพิ่มเป็นลิ้ง</span>
                    </div>
                    <input
                        type="text"
                        placeholder="รูปภาพ"
                        className="input input-bordered w-full"
                        name="hairstyle_img"
                        value={createStylehair.hairstyle_img}
                        onChange={hdlChange}
                    />
                </label>
                <button className="btn btn-outline btn-info">เพิ่มข้อมูล</button>
            </form>   
    );
}
