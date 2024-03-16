
import React from 'react'

export default function AboutMe() {
    return (
        <div>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://images6.fanpop.com/image/photos/40600000/Beautiful-Cat-Banner-Header-beautiful-things-40674008-800-200.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://www.freewebheaders.com/wp-content/gallery/space-size-800x200/moon-and-earth-header-banner_size-800x200.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="https://www.freewebheaders.com/wp-content/gallery/abstract-size-800x200/cache/red-blue-yellow-smoke-abstract-header-800x200.jpg-nggid0511692-ngg0dyn-800x200x100-00f0w010c010r110f110r010t010.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img src="https://media.licdn.com/dms/image/C4D16AQG3LWRAkzwDcg/profile-displaybackgroundimage-shrink_200_800/0/1661306385077?e=2147483647&v=beta&t=NgXG-Vd7j2E2LQGM5ldTPkBO_8Um6IPBZ2WlEGH1Tz4" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
            <div className='text justify-center flex flex-col items-center'>
                <h1 className='text text-3xl bg-gradient-to-r from-[#FF0033] to-[#0033CC] text-white'>ติดต่อเราสอบถามเราได้ที่</h1>
                <h2>
                    <i className="fas fa-home "></i>{" "}
                    <span class="icon-text"></span> ที่อยู่ : <a className="text">109 หมู่ที่ 8 ตำบลพังขว้าง อำเภอเมือง จังหวัดสกลนคร 47000</a>
                </h2>
                <h2>
                    <i className="fas fa-home"></i>{" "}
                    <span class="icon-text "></span> เบอร์โทร : <a className="text">096-0369552</a>
                </h2>
                <h2>
                    <i className="fas fa-home"></i>{" "}
                    <span class="icon-text "></span> Facebook : <a className="text">thidsadee xayyasone</a>
                </h2>
                <h2>
                    <i className="fas fa-home"></i>{" "}
                    <span class="icon-text "></span> Line ID : <a className="text">thidsadee64</a>
                </h2>
                <h2>
                    <i className="fas fa-home"></i>{" "}
                    <span class="icon-text "></span> Email : <a className="text">doxayyasone19@gmail.com</a>
                </h2>
            </div>
            <div className='justify-center mt-5'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d4580.006055259295!2d104.09017733773013!3d17.18934546874574!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sth!2sth!4v1710577365229!5m2!1sth!2sth"
                referrerPolicy='no-referrer-when-downgrade'>
            </iframe>
            </div>
        </div>

    )
}
