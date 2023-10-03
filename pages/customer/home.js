import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footers/footerHome";
import Navbar from "@/components/Navbars/customer/navbarHome";

export default function Login() {
  const [avail, setAvail] = useState([]);
  const [nama_tipe_kamar, setNamaTipeKamar] = useState("");
  const [nomor_kamar, setNomorKamar] = useState("");
  const [tgl_check_in, setCheckIn] = useState("");
  const [tgl_check_out, setCheckOut] = useState("");
  const[jumlah_kamar, setJumlahKamar] = useState("");
  const [typeroom, setTyperoom] = useState("")
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  const checkRole = () => {
    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "resepsionis"
      ) {
        setToken(localStorage.getItem("token"));
        setRole(localStorage.getItem("role"));
      } else {
        window.alert("You're not admin or resepsionis!");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("tgl_check_in", tgl_check_in);
    form.append("tgl_check_out", tgl_check_out);
  
    // Simpan tgl_check_in dan tgl_check_out ke dalam localStorage
    localStorage.setItem("tgl_check_in", tgl_check_in);
    localStorage.setItem("tgl_check_out", tgl_check_out);
  
    // let url = "http://localhost:3000/kamar/getAvailable";
    // axios
    //   .post(url, form, headerConfig())
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setAvail(response.data.data);
    //     }
    //     console.log(response.data.data);
    //   })
    //   .catch((error) => {
    //     alert("Failed");
    //   });
  };
  

  return (
    <>
      <Navbar transparent />
      <main className="bg-sec">
        <div className="relative pt-44 pb-60 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-5/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-[2.7rem]">
                    Enjoy your journey with us.
                  </h1>
                  <p className="mt-4 text-lg text-white">
                  Search and book hotels with ease. Just one click you can already book the hotel you want. Start booking and feel the convenience we offer
                  </p>
                </div>
              </div>
            </div>
          </div>
           
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-sec fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
        <div className="w-1/3 mx-[32%] -mt-20 absolute">
              <form className="flex flex-row gap-4 w-[600px]" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label className="text-sec text-md mb-2">Check In</label>
                  <input
                  type="date"
                  name="tgl_check_in"
                  value={tgl_check_in}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="p-4 w-48 rounded-md shadow-md"
                  required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sec text-md mb-2">Check Out</label>
                  <input
                  type="date"
                  name="tgl_check_out"
                  value={tgl_check_out}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="p-4 w-48 rounded-md shadow-md"
                  required
                />
                </div>
                
                <button className="bg-primary text-sec p-2 rounded-md w-24 shadow-md mt-8" onClick={getTypeRoom}>
                  Search
                </button>
              </form>
            </div> 

            <div className="py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 px-20 mt-8">
        {typeroom.length === 0 ? (
          <div className="m-6"></div>
        ) : (
          typeroom.map((item, index) => (
            <div className="group relative block overflow-hidden rounded-md">

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
                  {item.nama_tipe_kamar} <span className="text-md font-light">{item.nomor_kamar}</span>
                </h3>

                <p className="mt-1.5 text-sm text-gray-700">{item.deskripsi}</p>
                <a href={`/customer/add/${item.nama_tipe_kamar}`} className="mt-4 block w-full rounded bg-primary/20 p-4 text-sm font-medium transition hover:scale-105 text-center">
                  Book Now
                </a>
              </div>
            </div>
          ))
        )}
      </div>
      </main>
      <Footer />
    </>
  );
}
