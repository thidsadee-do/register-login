import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
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
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://img.wongnai.com/p/1920x0/2017/08/11/fb315835ff5346d4b280363322c97875.jpg)'}}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
        <p className="mb-5">Administrator</p>
      </div>
    </div>
  </div>
  );

};