import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import useAuth from "../hooks/userAuth";

export default function UserHome() {
  const [hairstyles, setHairstyles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getHairstyles = async () => {
      try {
        const response = await axios.get("http://localhost:8889/admin/hairstyle");
        setHairstyles(response.data.hairstyle);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    };
    getHairstyles();
  }, []);

  const handleUserBooking = (item) => {
    user?.user_id ? navigate("/UserBooking/" + item.hairstyle_id) : navigate('/LoginForm');
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <div className="bg-gradient-to-t to-[#fb923c] from-[#ef4444] text-center text-2xl text-white py-4 mt-5 lg-8">
      BarberShop Boyy
      </div>
      <div className="w-[80%] mx-auto mt-5">
        <Splide aria-label="My Favorite Images"
          options={{
            type: 'loop',
            rewind: true

          }}>
          <SplideSlide>
            <img src="https://favforward.com/app/uploads/2019/05/%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%9C%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A1-Top-knot.jpg " alt="Image 1" />
          </SplideSlide>
          <SplideSlide>
            <img src="https://favforward.com/app/uploads/2019/05/%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%9C%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A1-Buzz-cuts.jpg" alt="Image 2" />
          </SplideSlide>
          <SplideSlide>
            <img src="https://favforward.com/app/uploads/2019/05/%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%9C%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A1-Undercut.jpg" alt="Image 2" />
          </SplideSlide>
        </Splide>
      </div>
      <div className="form-control relative mt-5 w-full ml-5">
        <input
          type="text"
          placeholder="ค้นหา"
          className="input input-bordered w-full pl-10"
          onChange={handleSearchInput}
        />
        <span className="absolute inset-y-0 left-4 flex items-center">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>


      <div className="bg-[#fb923c] text-center text-2xl text-white py-4 mt-5 lg-8">เลือกทรงผมและสั่งจองคิว</div>
      <div className="max-w-[80rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {hairstyles
          .filter((item) =>
            item.hairstyle_name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item) => (
            <div key={item.hairstyle_id} className="relative aspect-w-1 aspect-h-1">
              <UserHomeItem item={item} handleUserBooking={handleUserBooking} />
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

function UserHomeItem({ item, handleUserBooking }) {
  return (
    <div className="card-body items-center text-center text-black">
      <div className="card w-80 h-150 bg-base-100 shadow-xl bg-gradient-to-b to-[#FF6363] from-[#FFAB76] ">
        <figure className="bg-clip-border">
          <img src={item.hairstyle_img} alt={item.hairstyle_name} />
        </figure>
        <h3 className="text-xl font-bold text-white">{item.hairstyle_name}</h3>
        <p className="product-price text-white">ราคา : {item.hairstyle_price} ฿</p>
        <div className="card-actions mx-auto px-5">
          <button onClick={() => handleUserBooking(item)} className="btn bg-gradient-to-t from-[#00DFA2] to-[#98EECC] mb-2 flex items-center justify-center">
            <img src="https://vectorified.com/images/booking-icon-8.png" alt="Barbershop Icon" style={{ height: '24px', width: '24px', marginRight: '8px' }} />
            จองคิว
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10 w-full">
      <div className="container mx-auto text-center">
        <div className="footer-content">
          <div className="contact-info">
            <p>ถ. รัฐบำรุง ตำบล ธาตุนาเวง อำเภอเมืองสกลนคร สกลนคร 47000
              547G+29 ตำบล ธาตุนาเวง อำเภอเมืองสกลนคร สกลนคร
            </p>
            <p>เบอร์โทรศัพท์: 02-123-2580</p>
            <p>อีเมล: BillyBoyhaircut@gmail.com</p>
          </div>
          <div className="footer-links flex justify-center space-x-4 mt-4">
            <a href="/" className="hover:underline">หน้าแรก</a>
            <a href="/services" className="hover:underline">บริการ</a>
            <a href="/booking" className="hover:underline">จองคิว</a>
            <a href="/BarberTeam" className="hover:underline">ทีมช่าง</a>
            <a href="/Gallery" className="hover:underline">แกลเลอรี่</a>
            <a href="/about" className="hover:underline">เกี่ยวกับเรา</a>
            <a href="/AboutMe" className="hover:underline">ติดต่อเรา</a>
          </div>
          <div className="legal-info mt-4">
            <p>© 2024 ร้านตัดผมชายสกลนคร BillyBoy haircut.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
