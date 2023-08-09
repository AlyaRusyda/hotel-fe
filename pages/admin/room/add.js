import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Login() {
  const [typeroom, setTyperoom] = useState([]);
  const [id, setId] = useState("");
  const [nomor_kamar, setNomorKamar] = useState("");
  const [tipeKamarId, setTipeKamarId] = useState("");
  const [nama_tipe_kamar, setNamaTipeKamar] = useState("");
  const [foto, setFoto] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("id", id);
    form.append("nomor_kamar", nomor_kamar);
    form.append("tipeKamarId", tipeKamarId);
    // form.append("deskripsi", deskripsi)
    // form.append("foto", foto)

    let url = "http://localhost:3000/kamar/";
    axios
      .post(url, form, headerConfig())
      .then((response) => {
        if (response.status === 200) {
          alert("Success add data");
          window.location.href = "/admin/room";
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

  const getTypeRoom = async () => {
    let url = await axios.get("http://localhost:3000/tipekamar/getAll/", headerConfig);
    axios
      .get(url, headerConfig())
      .then((response) => {
        setTyperoom(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const headerConfig = () => {
    let token = localStorage.getItem("token");
    let header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return header;
  };

  useEffect(() => {
    getTypeRoom();
  });

  return (
    <>
      <section className="relative bg-[url(/img/register_bg_2.png)] bg-cover bg-center bg-no-repeat flex flex-row min-h-screen">
        <div className="z-99 w-96 rounded-xl mx-auto shadow-md">
          <form className="flex flex-col gap-4 m-8" onSubmit={handleAdd}>
            <h1 className="font-bold text-3xl text-sec text-center">
              Add Kamar
            </h1>
            <input
              className="bg-slate-200 rounded p-2 shadow"
              value={nomor_kamar}
              onChange={(e) => setNomorKamar(e.target.value)}
              placeholder="Room Number"
              required
            />
            <select
              className="bg-slate-200 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-800 block w-full p-2.5"
              placeholder="Jenis Room Type"
              name="tipeKamarId"
              value={tipeKamarId}
              onChange={(e) => setTipeKamarId(e.target.value)}
              required
            >
              <option value="">Select Room Type</option>
              {typeroom.map((item) => (
                <option value={item.id}>{item.nama_tipe_kamar}</option>
              ))}
            </select>
            <button className="bg-slate-300 mx-auto rounded text-primary hover:text-slate-200 hover:bg-slate-600 font-bold py-2 px-[140px]">
              Add
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
