import React from 'react'

export default function Gallery() {
  return (
    <div>
      <div className="gallery">
        <div className="image"><img src="image1.jpg" alt="Image 1" /></div>
        <div className="image"><img src="image2.jpg" alt="Image 2" /></div>
        <div className="image"><img src="image3.jpg" alt="Image 3" /></div>
        {/* เพิ่มรูปภาพตามต้องการ */}
      </div>
    </div>
  )
}
