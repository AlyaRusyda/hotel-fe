import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbars/customer/navbar";
import Footer from "@/components/Footers/footer";

export default function TypeRoom() {
  const [typeroom, setTyperoom] = useState([]);
  const [originalTyperoom, setOriginalTyperoom] = useState([]);
  const [role, setRole] = useState("");
  const [keyword, setKeyword] = useState("");
  const [token, setToken] = useState("")

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      alert("Anda harus login untuk mengakses halaman ini");
      window.location.href = "/"; 
    }
  }, []);

  const checkRole = () => {
    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "customer"
      ) {
        setToken(localStorage.getItem("token"));
        setRole(localStorage.getItem("role"));
      } else {
        window.alert("You're not customer!");
        window.location = "/";
      }
    }
  };

  const headerConfig = () => {
    let token = localStorage.getItem("token");
    let header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return header;
  };

  const getTypeRoom = () => {
    let url = "http://localhost:3000/tipekamar/getAll/";
    axios
      .get(url, headerConfig())
      .then((response) => {
        setTyperoom(response.data.data);
        setOriginalTyperoom(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = async () => {
    try{
      await setTyperoom(
        originalTyperoom.filter((type) => {
          return type.nama_tipe_kamar.toLowerCase().includes(keyword.toLowerCase());
        })
      )
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "customer"
      ) {
        setToken(localStorage.getItem("token"));
        setRole(localStorage.getItem("role"));
      }
    }
    getTypeRoom();
    checkRole();
  }, []);
  
  return (
    <>
    {token ? (
      <>
      <Navbar />
      <div className="px-20 font-bold mt-28 text-primary flex flex-row">
        <h1 className="text-2xl md:text-3xl w-60">Typeroom List</h1>
        <div className="flex items-center ml-auto">
          <div className="flex rounded">
            <input
              type="text"
              className="block px-4 py-2 bg-white border font-normal rounded-md focus:border-priamry/10 focus:ring-primary/20 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
              name="keyword"
              value={keyword}
              onKeyUp={handleSearch}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 px-20">
        {typeroom.length === 0 ? (
          <p>No rooms available.</p>
        ) : (
          typeroom.map((item, index) => (
            <div className="group relative block overflow-hidden rounded-md" key={index}>

              <img
                src={"http://localhost:3000/foto/" + item.foto}
                alt=""
                className="h-20 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-40"
              />

              <div className="relative border border-gray-100 bg-primary/10 p-6">
                <span className="whitespace-nowrap bg-primary/20 px-3 py-1.5 text-xs font-medium">
                  {item.harga}
                  <span className="text-[10px] text-gray-800">/night</span>
                </span>

                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {item.nama_tipe_kamar}
                </h3>

                <p className="mt-1.5 text-sm text-gray-700">{item.deskripsi}</p>
                <a href={`/customer/typeroom/${item.nama_tipe_kamar}`} className="mt-4 block w-full rounded bg-primary/20 p-4 text-sm font-medium transition hover:scale-105 text-center">
                  Book Now
                </a>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
      </>
      ) : null}
    </>
  );
}
