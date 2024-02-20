import axios from "axios";
import { useEffect, useState } from "react";

export default function UserHome() {
  const [todos, setTodos] = useState([]);

  function formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", options);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8889/todos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(response.data.todos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>

      <div className="max-w-[80rem] mx-auto gap-1 flex flex-wrap mt-3 justify-around">
        <div className="card w-52  ml-5 mt-4 glass">
          <figure><img className="img image-full h-52" src="https://gatsby.ph/upload/redactor/01_ClassicPompadour_540px.jpg.jpg" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">Pompadour</h2>
            <h2 className="card-title">
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>ราคา: 250฿</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success text-white " onClick={() => document.getElementById('my_modal_5').showModal()}>จอง</button>
              <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">Comingsoon...</p>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn btn-sm btn-outline btn-error">X</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
        <div className="card w-52 h- ml-5 mt-4 glass">
          <figure><img className="img image-full h-52" src="https://silkysmoothbarbers.com/wp-content/uploads/2023/06/trendy-haircut-2023.jpeg" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">Pompadour</h2>
            <p>ราคา: 250฿</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success text-white">จอง</button>
            </div>
          </div>
        </div>
        <div className="card w-52 h- ml-5 mt-4 glass">
          <figure><img className="img image-full box-border w-52 h-52" src="https://i.pinimg.com/originals/dc/50/ea/dc50ea30e784d705ea8498bde1ce424e.jpg" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">buzzcut</h2>
            <p>ราคา: 250฿</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success text-white">จอง</button>
            </div>
          </div>
        </div>
        <div className="card w-52 h- ml-5 mt-4 glass">
          <figure><img className="img image-full h-52" src="https://m0.sportsjoe.ie/wp-content/uploads/2017/02/19120310/Ronadlo-hair.jpg" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">Daigoro</h2>
            <div className="badge badge-secondary">NEW</div>
            <p>ราคา: free฿</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success text-white " onClick={() => document.getElementById('my_modal_5').showModal()}>จอง</button>
              <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">Comingsoon...</p>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn btn-sm btn-outline btn-error">X</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
        <div className="card w-52 h- ml-5 mt-4 glass">
          <figure><img className="img image-full box-border w-52 h-52" src="https://content.latest-hairstyles.com/wp-content/uploads/wavy-faux-hawk-hairstyle.jpg" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">Faux Hawk</h2>
            <p>ราคา: 250฿</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success text-white">จอง</button>
            </div>
          </div>
        </div>
        <div className="card w-52 h- ml-5 mt-4 glass">
          <figure><img className="img image-full box-border w-52 h-52" src="https://haircutinspiration.com/wp-content/uploads/2023/01/the-side-part-haircut-a-classic-style-for-gentlemen-Side-Part-with-Skin-Fade.jpg" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">Flow Haircut</h2>
            <p>ราคา: 250฿</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success text-white">จอง</button>
            </div>
          </div>
        </div>
        <div className="card w-52 h- ml-5 mt-4 glass">
          <figure><img className="img image-full h-52" src="https://cdn2.fabbon.com/uploads/image/file/41404/low-fade-undercut-16.webp" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">undercut low</h2>
            <p>ราคา: 250฿</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success text-white">จอง</button>
            </div>
          </div>
        </div>
        <div className="card w-52 h- ml-5 mt-4 glass">
          <figure><img className="img image-full box-border w-52 h-52" src="https://hairstylesfeed.com/wp-content/uploads/2022/07/Straightforward-Two-Block-Style.jpg" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">undercut two block</h2>
            <p>ราคา: 250฿</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success text-white">จอง</button>
            </div>
          </div>
        </div>
        <div className="card w-52 h- ml-5 mt-4 glass">
          <figure><img className="img image-full box-border w-52 h-52" src="https://hairmanz.com/wp-content/uploads/2020/07/undercut-505.jpg" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">undercut long face</h2>
            <p>ราคา: 250฿</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success text-white">จอง</button>
            </div>
          </div>
        </div>
        <div className="card w-52 h- ml-5 mt-4 glass">
          <figure><img className="img image-full box-border w-52 h-52" src="https://content.latest-hairstyles.com/wp-content/uploads/military-cut.jpg" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">Military Haircut</h2>
            <p>ราคา: 250฿</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success text-white">จอง</button>
            </div>
          </div>
        </div>
        <div className="card w-52 h- ml-5 mt-4 glass">
          <figure><img className="img image-full h-52" src="https://menshairstyletips.com/wp-content/uploads/2020/09/7-Spiky-Blowout-Fade-Haircut.jpg?ezimgfmt=rs:372x372/rscb1/ngcb1/notWebP" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">Blowout</h2>
            <p>ราคา: 250฿</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success text-white">จอง</button>
            </div>
          </div>
        </div>
        <div className="card w-52 h- ml-5 mt-4 glass">
          <figure><img className="img image-full h-52" src="https://www.menshairstyletrends.com/wp-content/uploads/2021/04/Cool-short-mohawk-burst-fade-dario_d_bordon-1024x1024.jpg" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">Mohawk Haircut</h2>
            <p>ราคา: 250฿</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success text-white">จอง</button>
            </div>
          </div>
        </div>
        <div className="card w-52 h- ml-5 mt-4 glass">
          <figure><img className="img image-full box-border w-52 h-52" src="https://cdn.wisebarber.com/wisebarber/images/zw9hmzih431h1zr.jpg?width=432&height=576&aspect_ratio=432%3A576&quality=90" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">Mullet Haircut</h2>
            <p>ราคา: 250฿</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success text-white">จอง</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
