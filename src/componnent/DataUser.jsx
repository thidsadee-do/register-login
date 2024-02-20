import axios from "axios";
import { useEffect, useState } from "react";

export default function DataUser() {
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

    <div className="diff aspect-[16/9]">
      <div className="diff-item-1">
        <div className="bg-primary text-primary-content text-9xl font-black grid place-content-center">DAISY</div>
      </div>
      <div className="diff-item-2">
        <div className="bg-base-200 text-9xl font-black grid place-content-center">DAISY</div>
      </div>
      <div className="diff-resizer"></div>
    </div>

  );
}
