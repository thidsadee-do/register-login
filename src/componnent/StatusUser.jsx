import axios from "axios";
import { useEffect, useState } from "react";

export default function StatusUser() {
  const [statususer, setStatusUser] = useState([]);

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
        const response = await axios.get("http://localhost:8889/statususer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatusUser(response.data.todos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="divider divider-warning">สถานะการจองคิว</div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>ชื่อผู้จอง</th>
              <th>ทรงผมที่จอง</th>
              <th>ราคา</th>
              <th>สถานะ</th>
              <th><button className="btn btn-error" onClick={() => document.getElementById('my_modal_3').showModal()}>ยกเลิกการจอง</button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box max-w-1xl gap-2 ">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">หากต้องการยกเลิกการจองคิว</h3>
                    <p className="py-4"></p>
                    <button className="btn btn-accent w-28">NOT_CANCEL</button>
                    <button className="btn btn-error w-28">CANCEL</button>
                  </div>
                </dialog></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  )

}