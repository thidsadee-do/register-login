import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AboutMe() {
    const [currentSlide, setCurrentSlide] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextSlide = currentSlide === 4 ? 1 : currentSlide + 1;
            setCurrentSlide(nextSlide);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentSlide]);

    const goToSlide = (slideNumber) => {
        setCurrentSlide(slideNumber);
    };

    return (
        <div className="container">
            {/* Carousel */}
            <div className="carousel w-full mb-4">
                <div id="slide1" className={`carousel-item relative w-full ${currentSlide === 1 ? '' : 'hidden'}`}>
                    <img src="https://images6.fanpop.com/image/photos/40600000/Beautiful-Cat-Banner-Header-beautiful-things-40674008-800-200.jpg" className="w-full" alt="Slide 1" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button onClick={() => goToSlide(4)} className="btn btn-circle">❮</button>
                        <button onClick={() => goToSlide(2)} className="btn btn-circle">❯</button>
                    </div>
                </div>
                <div id="slide2" className={`carousel-item relative w-full ${currentSlide === 2 ? '' : 'hidden'}`}>
                    <img src="https://www.freewebheaders.com/wp-content/gallery/space-size-800x200/moon-and-earth-header-banner_size-800x200.jpg" className="w-full" alt="Slide 2" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button onClick={() => goToSlide(1)} className="btn btn-circle">❮</button>
                        <button onClick={() => goToSlide(3)} className="btn btn-circle">❯</button>
                    </div>
                </div>
                <div id="slide3" className={`carousel-item relative w-full ${currentSlide === 3 ? '' : 'hidden'}`}>
                    <img src="https://www.freewebheaders.com/wp-content/gallery/abstract-size-800x200/cache/red-blue-yellow-smoke-abstract-header-800x200.jpg-nggid0511692-ngg0dyn-800x200x100-00f0w010c010r110f110r010t010.jpg" className="w-full" alt="Slide 3" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button onClick={() => goToSlide(2)} className="btn btn-circle">❮</button>
                        <button onClick={() => goToSlide(4)} className="btn btn-circle">❯</button>
                    </div>
                </div>
                <div id="slide4" className={`carousel-item relative w-full ${currentSlide === 4 ? '' : 'hidden'}`}>
                    <img src="https://media.licdn.com/dms/image/C4D16AQG3LWRAkzwDcg/profile-displaybackgroundimage-shrink_200_800/0/1661306385077?e=2147483647&v=beta&t=NgXG-Vd7j2E2LQGM5ldTPkBO_8Um6IPBZ2WlEGH1Tz4" className="w-full" alt="Slide 4" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button onClick={() => goToSlide(3)} className="btn btn-circle">❮</button>
                        <button onClick={() => goToSlide(1)} className="btn btn-circle">❯</button>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className='text-center mb-5'>
                <h1 className='text-3xl bg-primary text-white py-3 mb-3'>
                    <marquee scrollamount="9">"ติดต่อเราสอบถามเราได้ที่"</marquee>
                </h1>
                <div className="flex justify-between ">
                    <div className="  text-center ">
                        <button className="btn  w-52 h-52 ">
                            <i className="fas fa-phone "></i> เบอร์โทร : 096-0369552
                        </button>
                    </div>
                    <div className="">
                        <button className="btn  w-52 h-52">
                            <i className="fab fa-facebook"></i> Facebook : thidsadee xayyasone
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>

                        </button>
                    </div>
                    <div className="">
                        <button className="btn  w-52 h-52">
                            <i className="fas fa-user"></i> Line ID : thidsadee64
                        </button>
                    </div>
                    <div className="">
                        <button className="btn w-52 h-52">
                            <i className="fas fa-envelope"></i> Email : doxayyasone19@gmail.com
                        </button>
                    </div>
                    <div className="">
                        <button className="btn  w-52 h-52">
                            <i className="fas fa-home"></i> ที่อยู่ : 109 หมู่ที่ 8 ตำบลพังขว้าง อำเภอเมือง จังหวัดสกลนคร 47000
                        </button>
                    </div>
                </div>
            </div>

            {/* Google Maps */}
            <div className='justify-center mt-5 mb-5 pb-5'>
                <h2 className="mt-3 text-center text-black text-2xl justify-start">นี่คือแผนที่ร้านของเรา:</h2>
                <iframe
                    title="Google Maps Location"
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d4580.006055259295!2d104.09017733773013!3d17.18934546874574!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sth!2sth!4v1710577365229!5m2!1sth!2sth"
                    width="600"
                    height="400"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}
