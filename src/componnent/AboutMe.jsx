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
        <div className="container bg-white">

            <div className=''>
                <marquee scrollamount="10">
                    <b className="text-2xl">BarberShop Boyy</b> : ถ. รัฐบำรุง ตำบล ธาตุนาเวง อำเภอเมืองสกลนคร สกลนคร 47000 547G+29 ตำบล ธาตุนาเวง อำเภอเมืองสกลนคร สกลนคร
                </marquee>
                <iframe
                    title="Google Maps Location"
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d4580.006055259295!2d104.09017733773013!3d17.18934546874574!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sth!2sth!4v1710577365229!5m2!1sth!2sth"
                    width="1500"
                    height="1100"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            {/* <button className="cursor-pointer uppercase bg-white px-4 py-2 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#F44336,-0.5rem_-0.5rem_#00BCD4] transition">
                ดูแผนที่
            </button>

            <button className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2">
                <span className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">Magic !</span>
                <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500" />
                <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500" />
            </button>




            <div className="relative flex h-[12em] w-[18em] items-center justify-center rounded-[1.5em] border-[1px]">
                <div className="group absolute left-1/2 top-1/2 flex h-[3em] w-[3em] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[1.5em] border-[1px] border-[#ffffffaa] bg-[#8988885c] backdrop-blur-[6px] duration-[500ms] hover:h-[10em] hover:w-[16em] hover:rounded-[1.5em]">
                    <svg className="h-[1.5em] w-[1.5em] duration-300 group-hover:opacity-0" viewBox="0 0 48 48" fill="none" height={48} width={48} xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#a)">
                            <path clipRule="evenodd" d="M21.6 36h4.8V21.6h-4.8V36ZM24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0Zm0 43.2C13.44 43.2 4.8 34.56 4.8 24 4.8 13.44 13.44 4.8 24 4.8c10.56 0 19.2 8.64 19.2 19.2 0 10.56-8.64 19.2-19.2 19.2Zm-2.4-26.4h4.8V12h-4.8v4.8Z" fillRule="evenodd" fill="#fff" />
                        </g>
                        <defs>
                            <clipPath id="a">
                                <path d="M0 0h48v48H0z" fill="#fff" />
                            </clipPath>
                        </defs>
                    </svg>

                </div>
                <h1 className="text-center font-nunito text-[2em] font-black text-purple-950">
                    hover over the info icon
                </h1>
            </div>
            <div className="group absolute left-1/2 top-1/2 flex h-[3em] w-[3em] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[1.5em] border-[1px] border-[#ffffffaa] bg-[#8988885c] backdrop-blur-[6px] duration-[500ms] hover:h-[10em] hover:w-[16em] hover:rounded-[1.5em]">
                <svg className="h-[1.5em] w-[1.5em] duration-300 group-hover:opacity-0" viewBox="0 0 48 48" fill="none" height={48} width={48} xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#a)">
                        <path clipRule="evenodd" d="M21.6 36h4.8V21.6h-4.8V36ZM24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0Zm0 43.2C13.44 43.2 4.8 34.56 4.8 24 4.8 13.44 13.44 4.8 24 4.8c10.56 0 19.2 8.64 19.2 19.2 0 10.56-8.64 19.2-19.2 19.2Zm-2.4-26.4h4.8V12h-4.8v4.8Z" fillRule="evenodd" fill="#fff" />
                    </g>
                    <defs>
                        <clipPath id="a">
                            <path d="M0 0h48v48H0z" fill="#fff" />
                        </clipPath>
                    </defs>
                </svg>

            </div> */}
            {/* <div className="card shadow-[0px_4px_16px_px_#367E08] h-[400px] w-[280px] group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-full bg-[#111111]" />
                <div className="container text-white z-[2] relative font-nunito flex flex-col gap-[0.5em]">
                    <div className="h-fit w-full">
                        <h1 className="card_heading text-[1.5em] tracking-[.2em]" style={{ fontWeight: 900, WebkitTextFillColor: 'transparent', WebkitTextStrokeWidth: 1, textShadow: '0 0 7px #fff' }}>
                            STEEL BALL RUN
                        </h1>
                        <p className="text-[1.2em]" style={{ fontWeight: 900, WebkitTextFillColor: 'transparent', WebkitTextStrokeWidth: 1, textShadow: '0 0 7px #fff' }}>
                            By Hirohiko Araki
                        </p>
                    </div>
                    <div className="flex justify-left items-center h-fit w-full gap-[1.5em]">
                        <div className="w-fit h-fit flex justify-left gap-[0.5em]">
                            <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" className="h-[1em] w-[1em]" fill="white">
                                <path d="M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z" />
                            </svg>
                            <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" className="h-[1em] w-[1em]" fill="white">
                                <path d="M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z" />
                            </svg>
                            <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" className="h-[1em] w-[1em]" fill="white">
                                <path d="M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z" />
                            </svg>
                            <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" className="h-[1em] w-[1em]" fill="white">
                                <path d="M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z" />
                            </svg>
                            <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" className="h-[1em] w-[1em]" fill="white">
                                <path d="M288 439.6l-130.9 68.7C152.2 510.8 147.1 512 142.2 512c-18.59 0-35.17-16.66-31.61-37.45l25.04-145.5L29.72 226.1C10.68 207.6 21.2 175.3 47.47 171.5l146.4-21.29l65.43-132.4c5.883-11.91 17.33-17.8 28.73-17.8c.0234 0-.0234 0 0 0L288 439.6z" />
                            </svg>
                        </div>
                        <div className="w-fit h-fit text-white font-nunito text-[1.2em] font-light">
                            <p>4.5/5 stars</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-fit w-fit gap-[0.5em]">
                        <div className="border-2 border-white rounded-[0.5em] text-white font-nunito text-[1em] font-normal px-[0.5em] py-[0.05em] hover:bg-white hover:text-[#222222] duration-300 cursor-pointer">
                            <p>Drama</p>
                        </div>
                        <div className="border-2 border-white rounded-[0.5em] text-white font-nunito text-[1em] font-normal px-[0.5em] py-[0.05em] hover:bg-white hover:text-[#222222] duration-300 cursor-pointer">
                            <p>Action</p>
                        </div>
                        <div className="border-2 border-white rounded-[0.5em] text-white font-nunito text-[1em] font-normal px-[0.5em] py-[0.05em] hover:bg-white hover:text-[#222222] duration-300 cursor-pointer">
                            <p>Balls</p>
                        </div>
                    </div>
                </div>
                <p className="font-nunito block text-white font-light relative h-[0em] group-hover:h-[7em] leading-[1.2em] duration-500 overflow-hidden">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet officiis,
                    dolorem ab animi magnam culpa fugit error voluptates adipisci, debitis ut
                    fuga at nisi laborum suscipit a eos similique unde.
                </p>
            </div>

            <button title="Add New" className="group cursor-pointer outline-none hover:rotate-90 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-lime-400 fill-none group-hover:fill-lime-800 group-active:stroke-lime-200 group-active:fill-lime-600 group-active:duration-0 duration-300">
                    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5" />
                    <path d="M8 12H16" strokeWidth="1.5" />
                    <path d="M12 16V8" strokeWidth="1.5" />
                </svg>
            </button> */}

            {/* <div className="flex flex-col">
                <div className="text-center mb-6 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-black">
                    Hover Them
                </div>
                <div className="border border-gray-300 py-3 flex gap-1 shadow-xl rounded-md">
                    <div className="group relative px-4 cursor-pointer">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height={32} width={32}>
                                <path stroke="currentColor" d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" />
                            </svg>
                        </div>
                        <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                            Home
                        </span>
                    </div>
                    <div className="group relative px-4 cursor-pointer">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height={24} width={24}>
                                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" />
                            </svg>
                        </div>
                        <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                            Messages
                        </span>
                    </div>
                    <div className="group relative px-4 cursor-pointer">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height={24} width={24}>
                                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" />
                            </svg>
                        </div>
                        <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                            User
                        </span>
                    </div>
                    <div className="group relative px-4 cursor-pointer">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height={24} width={24}>
                                <g>
                                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
                                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1683_1163">
                                        <rect fill="white" height={24} width={24} />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                            Settings
                        </span>
                    </div>
                </div>
            </div> */}

            {/* <div>
                <input className="bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-rose-400 dark:shadow-md dark:shadow-purple-500" autoComplete="off" placeholder="Search here..." name="text" type="text" />
                <span className=" bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-2 py-2 rotate-[45deg] ml-2 shadow-md focus:shadow-lg focus:shadow-rose-400 dark:shadow-md dark:shadow-purple-500"><svg xmlns="http://www.w3.org/2000/svg" className="w-6" viewBox="0 0 128 128">
                    <path fill="#CA2C31" d="m3.77 71.73l16.34-16.1l27.82-4.93l-2.75 14.56L7.57 76.82l-2.43-1.05z" />
                    <path fill="#A02422" d="M22.94 59.76L5.2 75.88l13.05 6.36l19.81-10.11v-4.77l4.05-10.92zm41.98 28.39l-8.57 3.72l-8.09 17.15s7.12 15.77 7.44 15.77c.32 0 4.37.32 4.37.32l14.4-16.1l3.64-27.5l-13.19 6.64z" />
                    <path fill="#CA2C31" d="M56.5 100.84s4.77-.97 8.17-2.59c3.4-1.62 7.6-4.04 7.6-4.04l-1.54 13.43l-15.05 17.13s-.59-.73-3.09-6.17c-1.99-4.34-2.68-5.89-2.68-5.89l6.59-11.87z" />
                    <path fill="#F7D74D" d="M31.58 80.66s-5.74-.48-12.03 7.47c-5.74 7.26-8.43 19.08-9.47 22.12s-3.53 3.66-2.7 5.05s4.42 1.31 8.85.76s8.23-1.94 8.23-1.94s-.19.48-.83 1.52c-.23.37-1.03.9-.97 1.45c.14 1.31 11.36 1.34 20.32-7.88c9.68-9.95 4.98-18.11 4.98-18.11L31.58 80.66z" />
                    <path fill="#FBF0B4" d="M33.31 85.29s-6.19.33-11.31 8.28s-7.5 17.16-7.01 17.78c.48.62 10.02-2.83 12.31-2.14c1.57.48.76 2.07 1.18 2.49c.35.35 4.49.94 11.19-6.32c6.71-7.26 5.12-17.46 5.12-17.46l-11.48-2.63z" />
                    <path fill="#858585" d="M36.35 74.44s-3.11 2.77-4.22 4.36c-1.11 1.59-1.11 1.73-1.04 2.21c.07.48 1.22 5.75 6.01 10.37c5.88 5.67 11.13 6.43 11.89 6.43c.76 0 5.81-5.67 5.81-5.67l-18.45-17.7z" />
                    <path fill="#437687" d="M50.1 91.24s5.04 3.31 13.49.47c11.55-3.88 20.02-12.56 30.51-23.52c10.12-10.58 18.61-23.71 18.61-23.71l-5.95-19.93L50.1 91.24z" />
                    <path fill="#3F545F" d="m67.99 80.33l1.39-4.32l3.48.49s2.65 1.25 4.6 2.16c1.95.91 4.46 1.6 4.46 1.6l-4.95 4.18s-2.7-1.02-4.67-1.88c-2.22-.97-4.31-2.23-4.31-2.23z" />
                    <path fill="#8DAFBF" d="M84.32 16.14s-9.62 5.58-23.41 18.63c-12.43 11.76-21.64 22.4-23.87 31.45c-1.86 7.58-.87 12.18 3.36 17.15c4.47 5.26 9.71 7.87 9.71 7.87s3.94.06 20.38-12.59C91 62.86 107.43 36.42 107.43 36.42L84.32 16.14z" />
                    <path fill="#D83F22" d="M104.18 41.84s-8.37-3.57-14.34-11.9c-5.93-8.27-5.46-13.86-5.46-13.86s4.96-3.89 16.11-8.34c7.5-2.99 17.71-4.52 21.07-2.03s-2.3 14.98-2.3 14.98l-10.31 19.96l-4.77 1.19z" />
                    <path fill="#6896A5" d="M68.17 80.4s-7.23-3.69-11.83-8.94c-8.7-9.91-10.5-20.79-10.5-20.79l4.37-5.13S51.3 57.1 60.63 67.09c6.08 6.51 12.43 9.49 12.43 9.49s-1.27 1.07-2.63 2.11c-.87.67-2.26 1.71-2.26 1.71z" />
                    <path fill="#A02422" d="M112.71 44.48s4.34-5.23 8.45-17.02c5.74-16.44.74-21.42.74-21.42s-1.69 7.82-7.56 18.69c-4.71 8.71-10.41 17-10.41 17s3.14 1.41 4.84 1.9c2.14.62 3.94.85 3.94.85z" />
                    <path fill="#B3E1EE" d="M39.81 69.66c1.3 1.24 3.27-.06 4.56-3.1c1.3-3.04 1.28-4.74.28-5.46c-1.24-.9-3.32 1.07-4.23 2.82c-1 1.94-1.59 4.8-.61 5.74zm45.14-49.53s-7.61 5.47-15.73 12.91c-7.45 6.83-12.39 12.17-13.07 13.41c-.72 1.33-.73 3.21-.17 4.17s1.8 1.46 2.93.62c1.13-.85 9.18-9.75 16.45-16.11c6.65-5.82 11.78-9.51 11.78-9.51s2.08-3.68 1.74-4.52c-.34-.85-3.93-.97-3.93-.97z" />
                    <path fill="#ED6A65" d="M84.95 20.13s5.62-4.31 11.74-7.34c5.69-2.82 11.35-5.17 12.37-3.13c.97 1.94-5.37 4.58-10.95 8.14c-5.58 3.56-10.95 7.81-10.95 7.81s-.82-1.5-1.35-2.89a23.7 23.7 0 0 1-.86-2.59z" />
                    <path fill="#E1E1E1" d="M89.59 39.25c-5.57-5.13-13.32-3.75-17.14.81c-3.92 4.7-3.63 11.88 1 16.2c4.21 3.92 12.04 4.81 16.76-.69c4.2-4.88 3.94-12.13-.62-16.32z" />
                    <path fill="#3F545F" d="M75.33 41.87c-3.31 3.25-3.13 9.69.81 12.63c3.44 2.57 8.32 2.44 11.38-.69c3.06-3.13 3.06-8.82.19-11.76c-3.3-3.37-8.59-3.9-12.38-.18z" />
                    <path fill="#A02524" d="M50 76.89s6.19-6.28 6.87-5.6c.68.68.59 4.49-2.37 8.73c-2.97 4.24-9.5 11.79-14.67 16.88c-5.1 5.01-12.29 10.74-12.97 10.64c-.53-.08-2.68-1.15-3.54-2.19c-.84-1.03 1.67-5.9 2.68-7.51c1.02-1.61 24-20.95 24-20.95z" />
                    <path fill="#CA2C31" d="M21.23 101.85c-.08 1.44 2.12 3.54 2.12 3.54L56.87 71.3s-1.57-1.77-6.19 1.1c-4.66 2.9-8.74 6.38-14.76 12.21c-8.39 8.14-14.61 15.8-14.69 17.24z" />
                    <path fill="#FFF" d="M19.06 36.95c-1.11 1.11-1.16 2.89.08 3.91c1.1.91 2.89.32 3.56-.5s.59-2.6-.3-3.48c-.89-.89-2.66-.6-3.34.07z" />
                    <path fill="#FFF" d="M41.02 35.65c-.84.93-.57 2.31.21 2.82s1.95.46 2.52-.24c.51-.63.57-1.89-.21-2.67c-.68-.67-1.98-.51-2.52.09z" opacity=".5" />
                    <path fill="#FFF" d="M55.55 11.89s1.22-3.48 1.94-3.52c.73-.04 1.78 3.48 1.78 3.48s3.61.04 3.85.57c.31.68-2.31 2.96-2.31 2.96s.85 3.4.45 3.81c-.45.45-3.56-1.34-3.56-1.34s-3.2 2.23-3.89 1.62c-.6-.53.65-4.13.65-4.13s-3-2.19-2.84-2.8c.23-.86 3.93-.65 3.93-.65zm41.46 83.44c1.21.67 2.73.29 3.29-1c.51-1.15-.43-2.52-1.28-2.89c-.85-.37-2.34.12-2.88 1.09c-.53.96.14 2.4.87 2.8zm17.18-29.49c-.69-1.07-2.18-1.42-3.15-.56c-.94.84-.71 2.16-.18 2.83c.53.67 1.95.92 2.81.37s.94-2 .52-2.64z" /></svg></span>
            </div> */}



        </div>
    );
}
