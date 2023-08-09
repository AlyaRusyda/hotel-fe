import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [nama_tipe_kamar, setNamaTipeKamar] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    let form = new FormData()
        form.append("id", id)
        form.append("nama_tipe_kamar", nama_tipe_kamar)
        form.append("harga", harga)
        form.append("deskripsi", deskripsi)
        form.append("foto", foto)

    let url = "http://localhost:3000/tipekamar/";
    axios
      .post(url, form, headerConfig())
      .then((response) => {
        if (response.status === 200) {
          
          alert("Success add data");
          window.location.href = "/admin/typeroom";
        }
      })
      .catch((error) => {
        console.log("error add data", error.response.status);
        if (error.response.status === 500) {
          alert("Failed to add data");
        }
      });
  };

  const handleFile = (e) => {
    setFoto(e.target.files[0]);
  };

  const headerConfig = () => {
    let token = localStorage.getItem("token");
    let header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return header;
  };

  return (
    <>
      <section className="relative bg-[url(/img/register_bg_2.png)] bg-cover bg-center bg-no-repeat flex flex-row min-h-screen">
        <div className="z-99 w-96 rounded-xl mx-auto shadow-md">
          <form className="flex flex-col gap-4 m-8" onSubmit={handleAdd}>
            <h1 className="font-bold text-3xl text-sec text-center">
              Add Tipe Kamar
            </h1>
            <input
              className="bg-slate-200 rounded p-2 shadow"
              value={nama_tipe_kamar}
              onChange={(e) => setNamaTipeKamar(e.target.value)}
              placeholder="Typeroom Name"
              required
            />
            <input
              className="bg-slate-200 rounded p-2 shadow"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              type="number"
              placeholder="Price"
              required
            />
            <input
              className="bg-slate-200 rounded p-2 shadow"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Description"
              required
            />
            <input
              className="bg-slate-200 rounded p-2 shadow"
              type="file"
              onChange={handleFile}
              placeholder="Room Photo"
              required
            />
            <button className="bg-slate-300 mx-auto rounded text-primary hover:text-slate-200 hover:bg-slate-600 font-bold py-2 px-[140px]">
              Add
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
