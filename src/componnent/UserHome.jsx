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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedHairStyle, setSelectedHairStyle] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getHairstyles = async () => {
      try {
        const response = await axios.get("http://localhost:8889/admin/hairstyle");
        setHairstyles(response.data.hairstyle);
      } catch (error) {
        console.error("Error fetching hairstyles:", error);
      } finally {
        setLoading(false);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleHairStyleFilterChange = (event) => {
    setSelectedHairStyle(event.target.value);
  };

  // Get unique hairstyle names for the select options
  const uniqueHairstyles = Array.from(new Set(hairstyles.map(item => item.hairstyle_name)));

  const filteredHairstyles = hairstyles.filter((item) =>
    item.hairstyle_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedHairStyle === '' || item.hairstyle_name === selectedHairStyle)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHairstyles.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredHairstyles.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="bg-gradient-to-t to-[#fb923c] from-[#ef4444] text-center text-2xl text-white py-4 mt-5 lg-8 rounded-lg">
        <marquee scrollamount="9">
          <b className="text-2xl">BarberShop Boyy</b> : ถ. รัฐบำรุง ตำบล ธาตุนาเวง อำเภอเมืองสกลนคร สกลนคร 47000 547G+29 ตำบล ธาตุนาเวง อำเภอเมืองสกลนคร สกลนคร
        </marquee>
      </div>
      <div className="w-[80%] mx-auto mt-5">
        <Splide aria-label="Carousel" options={{ type: 'loop', rewind: true }}>
          <SplideSlide>
            <img src="https://favforward.com/app/uploads/2019/05/%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%9C%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A1-Top-knot.jpg" alt="Top Knot" />
          </SplideSlide>
          <SplideSlide>
            <img src="https://favforward.com/app/uploads/2019/05/%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%9C%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A1-Buzz-cuts.jpg" alt="Buzz Cuts" />
          </SplideSlide>
          <SplideSlide>
            <img src="https://favforward.com/app/uploads/2019/05/%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%9C%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A1-Undercut.jpg" alt="Undercut" />
          </SplideSlide>
        </Splide>
      </div>

      <div className="bg-gradient-to-r from-[#f12711] to-[#f5af19] text-center text-2xl text-white py-4 mt-5 lg-8 rounded-lg shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-20 animate-gradient"></div>
        <div className="relative z-10">
          <marquee scrollamount="9">"เข้ามาเลือกทรงผมที่ชอบและจองคิวได้ทันที!"</marquee>
        </div>
      </div>

      <div className="form relative mt-3 mx-auto w-96">
        <input
          type="text"
          placeholder="ค้นหาทรงผม..."
          className="input input-bordered w-full pl-10 bg-white h-10 px-2 rounded-full text-sm focus:outline-none border border-gray-300 shadow-md text-center"
          onChange={handleSearchInput}
        />
        <span className="absolute inset-y-0 left-4 flex items-center">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>

      <select
        className="select-ghost  bg-white h-10 rounded-full text-sm focus:outline-none border border-gray-300 shadow-md"
        value={selectedHairStyle}
        onChange={handleHairStyleFilterChange}
      >
        <option value="">รายชื่อทรงผม</option>
        {uniqueHairstyles.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>

      <div className="max-w-[80rem] mx-auto pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {currentItems.map((item) => (
          <div key={item.hairstyle_id} className="relative">
            <UserHomeItem item={item} handleUserBooking={handleUserBooking} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {number}
          </button>
        ))}
      </div>

      <Footer />
    </div>
  );
}

function UserHomeItem({ item, handleUserBooking }) {
  return (
    <div className="flex flex-col items-center w-60 h-96 px-4 pb-4 text-center text-black bg-base-100 shadow-xl bg-gradient-to-b to-[#FF6363] from-[#FFAB76] rounded-lg">
      <figure className="w-60 flex items-center justify-center bg-clip-border rounded-t-lg overflow-hidden">
        <img className="w-42 h-42 object-cover cursor-pointer" src={item.hairstyle_img} alt={item.hairstyle_name} />
      </figure>
      <h3 className="text font-bold text-white mt-8">{item.hairstyle_name}</h3>
      <p className="product-price text-white mb-4">ราคา : {item.hairstyle_price} ฿</p>
      <div className="card-actions">
        <button onClick={() => handleUserBooking(item)} className="btn bg-gradient-to-t from-[#00DFA2] to-[#98EECC] flex items-center justify-center px-4 py-2 rounded-lg">
          <img src="https://vectorified.com/images/booking-icon-8.png" alt="Booking Icon" style={{ height: '24px', width: '24px', marginRight: '8px' }} />
          จองคิว
        </button>
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
            <p>ถ. รัฐบำรุง ตำบล ธาตุนาเวง อำเภอเมืองสกลนคร สกลนคร 47000 547G+29 ตำบล ธาตุนาเวง อำเภอเมืองสกลนคร สกลนคร</p>
            <p>เบอร์โทรศัพท์: 02-123-2580</p>
            <p>อีเมล: BillyBoyhaircut@gmail.com</p>
          </div>
          <div className="footer-links flex justify-center space-x-4 mt-4">
            <a href="/" className="hover:underline">หน้าแรก</a>
            <a href="/AboutMe" className="hover:underline">ติดต่อเรา</a>
          </div>
          <div className="legal-info mt-4">
            <p>© 2024 ร้านตัดผมชายสกลนคร BillyBoy haircut.</p>
          </div>
        </div>
      </div>
      <div className='flex flex-0 justify-center px-0 mt-3'>
        <iframe
          title="Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1310.197147211119!2d104.08954573099214!3d17.190638320158836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sth!2sth!4v1722498966145!5m2!1sth!2sth"
          width="1450"
          height="300"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </footer>
  );
}
