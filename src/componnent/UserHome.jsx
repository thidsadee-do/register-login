import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserHome() {
  const [hairstyle, setHairstyle] = useState([]);

  useEffect(() => {
    const gethairstyle = async () => {
      try {
        const response = await axios.get("http://localhost:8889/admin/hairstyle")
        setHairstyle(response.data.hairstyle);
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    gethairstyle();
  }, []);


  return (
    <div>
      <div className="divider divider-warning">เลือกทรงผมและสั่งจองคิว</div>
      <div className="max-w-[80rem] mx-auto gap-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 justify-items-center mb-1">
        {hairstyle.map((item) => (
          <UserHomeItem key={item.hairstyle_id} item={item} />
        ))}
      </div>
    </div >
  );
}

function UserHomeItem({ item }) {
  const navigate = useNavigate();


  const hdlUserbooking = () => {
    navigate("/UserBooking/" + item.hairstyle_id);
  }

  return (
    <div>
      <div className="card-body items-center text-center">
        <div className="flex flex-col gap-3 mt-3">
          <div className="card w-80 h-150 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={item.hairstyle_img} alt="" />
            </figure>
            <h3 className="text-xl font-bold">{item.hairstyle_name}</h3>
            <p className="product-price">ราคา : {item.hairstyle_price} บาท</p>
            {/* <p className="product-category">ประเภท : {item.hairstyle}</p> */}
            <div className="card-actions mx-auto px-5 text-center w-60" >
              <p onClick={hdlUserbooking} className="btn bg-gradient-to-r from-[#fdba74] to-[#ea580c] text-white mb-2">จองคิว</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
