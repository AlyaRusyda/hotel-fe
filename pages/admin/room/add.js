import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Login() {
  const [typeroom, setTyperoom] = useState([]);
  const [id, setId] = useState("");
  const [nomor_kamar, setNomorKamar] = useState("");
  const [namaTipeKamar, setnamaTipeKamar] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

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

  const handleAdd = (e) => {
    e.preventDefault();

    const requestData = {
      id: id,
      nomor_kamar: nomor_kamar,
      nama_tipe_kamar: namaTipeKamar,
    };

    let url = "http://localhost:3000/kamar/add";
    axios
      .post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success === false) {
          setError(response.data.message);
        } else {
          alert("Success add data");
          window.location.href = "/admin/room";
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setError(error.response);
        }
      });
  };

  const getTypeRoom = () => {
    let url = "http://localhost:3000/tipekamar/getAll/";
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
    checkRole()
  });

  return (
    <>
    {token ? (
      <>
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover -z-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')",
        }}
      >
        <span
          id="blackOverlay"
          className="w-full h-full absolute opacity-50 bg-black"
        ></span>
      </div>
      <div className="mx-auto mt-36 flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800 shadow-xl z-50">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-primary">New Room</h1>
          <p className="text-sm text-gray-600">Add a new room</p>
        </div>
        <form className="space-y-12" onSubmit={handleAdd}>
          <div className="space-y-4">
            <div>
              <label for="email" className="block mb-2 text-sm">
                Room Number
              </label>
              <input
                value={nomor_kamar}
                onChange={(e) => setNomorKamar(e.target.value)}
                placeholder="Room Number"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                required
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label for="typeKamarId" className="text-sm">
                  Type Room
                </label>
              </div>
              <select
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                placeholder="Jenis Room Type"
                name="namaTipeKamar"
                value={namaTipeKamar}
                onChange={(e) => setnamaTipeKamar(e.target.value)}
                required
              >
                <option value="">Select Room Type</option>
                {typeroom.map((item) => (
                  <option value={item.nama_tipe_kamar}>
                    {item.nama_tipe_kamar}
                  </option>
                ))}
              </select>
            </div>
          {error && (
            <div className="bg-red-200 text-red-800 p-2 rounded-md text-sm">
              Error: {error} 
            </div>
          )}
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-primary text-gray-50"
          >
            Add
          </button>
        </form>
      </div>
      </>
      ) : null}
    </>
  );
}
