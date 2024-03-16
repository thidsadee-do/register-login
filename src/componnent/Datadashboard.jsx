
import React from 'react'

export default function AboutMe() {
    return (
        <div>
            <div className='justify-center'>
                <h1 className='text justify-center text-4xl text-white mt-3 w-auto bg-gradient-to-r from-[#0033CC] to-[#FF0033] rounded-lg'>
                    Dashboard Admin
                </h1>
            </div>
            <div>
                <div className="stats shadow justify-center mt-5">

                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <div className="stat-title text-neutral-950">ผู้ใช้งานทั้งหมด</div>
                        <div className="stat-value text-primary">5คน</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title text-neutral-950">คิวลูกค้าที่จองทั้งหมด</div>
                        <div className="stat-value text-secondary">8คิว</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <div className="avatar">
                                <div className="w-16 rounded-full">
                                    <img src="https://www.somjook.com/wp-content/uploads/2021/12/267950232_458302195657474_5293539657699206903_n.jpg" />
                                </div>
                            </div>
                        </div>
                        <div className="stat-title text-neutral-950">ยอดรวมเงินทั้งหมด</div>
                        <div className="stat-value text-secondary">5บาท</div>
                    </div>

                </div>
            </div>
        </div>
    )
}
