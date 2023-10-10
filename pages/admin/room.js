"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbars/admin/navbar";
import Footer from "@/components/Footers/footer";
import Link from "next/link";
import Modal from "@/components/Modal/modal";

export default function Room() {
  const [room, setRoom] = useState([]);
  const [originalRoom, setOriginalRoom] = useState([]);
  const [typeroom, setTyperoom] = useState([]);
  const [id, setId] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [nomor_kamar, setNomorKamar] = useState("");
  const [tipeKamarId, setTipeKamarId] = useState("");
  const [role, setRole] = useState("");
  const [keyword, setKeyword] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);

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
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken) {
      if (storedRole === "admin" || storedRole === "resepsionis") {
        setToken(storedToken);
        setRole(storedRole);
      } else {
        // window.alert("You're not admin or resepsionis!");
        window.location = "/";
      }
    }
  };

  const headerConfig = () => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      return {
        headers: { Authorization: `Bearer ${storedToken}` },
      };
    }

    return {};
  };

  const handleEdit = async (item) => {
    setModal(true);
    setSelectedRoom(item); // Simpan data kamar yang dipilih ke dalam state selectedRoom
    try {
      setId(item.id);
      setNomorKamar(item.nomor_kamar);

      const response = await axios.get(
        `http://localhost:3000/tipekamar/getAll/`,
        headerConfig()
      );
      const data = response.data.data;

      const selectedTipeKamar = data.find(
        (tipe) => tipe.id === item.tipeKamarID
      );
      if (selectedTipeKamar) {
        setTipeKamarId(selectedTipeKamar.id);
      }
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    if (selectedRoom) {
      setNomorKamar(selectedRoom.nomor_kamar);
      setTipeKamarId(selectedRoom.tipeKamarID);
    }
  }, [selectedRoom]);

  const handleSave = async (e) => {
    e.preventDefault();
    let form = {
      nomor_kamar,
      tipeKamarId,
    };

    let url = `http://localhost:3000/kamar/update/${id}`;
    axios
      .put(url, form, headerConfig())
      .then((response) => {
        if (response.data.message == `Validation error`) {
          setError("Room number already exist. Please change the room number");
        } else if (response.status === 200) {
          // console.log(response.data);
          alert("Success edit data");
          window.location.href = "/admin/room";
        }
      })
      .catch((error) => {
        console.log("error add data", error);
        if (error.status === 500) {
          alert("Failed to add data");
        }
      });
  };

  const handleDrop = (id) => {
    const url = `http://localhost:3000/kamar/${id}`;

    if (window.confirm("Are you sure to delete this room? ")) {
      axios
        .delete(url, headerConfig())
        .then((response) => {
          getRoom();
        })
        .catch((error) => {
          if (error.response.status === 500) {
            window.alert("You can't delete this data");
          }
        });
    }
  };

  const getRoom = async () => {
    const url = "http://localhost:3000/kamar/getAll/";

    try {
      const response = await axios.get(url, headerConfig());
      setRoom(response.data.data);
      setOriginalRoom(response.data.data);
    } catch (error) {
      console.error("Error fetching room list:", error);
    }
  };

  const getTypeRoom = async () => {
    const url = "http://localhost:3000/tipekamar/getAll/";

    try {
      const response = await axios.get(url, headerConfig());
      setTyperoom(response.data.data);
    } catch (error) {
      console.error("Error fetching room types:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setKeyword(value);
    const filteredRooms = originalRoom.filter((room) => {
      return room.tipeKamarId === parseInt(value);
    });
    setRoom(filteredRooms);
  };

  useEffect(() => {
    setIsClient(true);
    checkRole();
    getRoom();
    getTypeRoom();
  }, []);

  return (
    <>
      {token ? (
        <>
          <Navbar />
          <div className="px-20 font-bold mt-28 text-primary flex flex-row">
            <h1 className="text-2xl md:text-3xl w-60">Room List</h1>
            <div className="flex items-center ml-auto">
              <div className="flex rounded ">
                <select
                  className="block px-4 py-2 bg-slate-200 border font-normal rounded-md focus:border-primary/10 focus:ring-primary/20 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Status"
                  name="keyword"
                  value={keyword}
                  onChange={handleSearch}
                >
                  <option value="">Select Type Room</option>
                  {typeroom.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.nama_tipe_kamar}
                    </option>
                  ))}
                </select>

                {role === "admin" && isClient ? (
                  <Link
                    className="ml-2 px-4 flex flex-row text-sec bg-primary rounded hover:bg-primary/30 hover:text-primary"
                    href="/admin/room/add"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="mt-3 -ml-2"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>{" "}
                    <p className="mt-2 ml-1 font-normal">Add</p>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto mt-8 px-20 mb-52">
            <table className="w-full divide-y-2 divide-primary/20 bg-sec/20 text-sm">
              <thead className="ltr:text-left rtl:text-right bg-sec">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    No
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Room Number
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Room Type
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Price
                  </th>
                  {role === "admin" && (
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Action
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-center">
                {room.length === 0 && isClient ? (
                  <p>No rooms available.</p>
                ) : (
                  room.map((item, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {item.nomor_kamar}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {item.tipe_kamar?.nama_tipe_kamar}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {item.tipe_kamar?.harga}
                      </td>
                      {role === "admin" && (
                        <td className="whitespace-nowrap py-2 flex flex-row gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(item)}
                            className="inline-block rounded bg-primary px-4 py-2 text-xs font-medium text-white hover:bg-sec hover:text-primary"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDrop(item.id)}
                            className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-300 hover:text-primary"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Footer />

          <Modal isVisible={modal} close={() => setModal(false)}>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-black">
                Edit Room
              </h3>
              <form className="space-y-6" onSubmit={handleSave}>
                <div>
                  <label
                    for="nomor_kamar"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    Nomor Kamar
                  </label>
                  <input
                    type="text"
                    name="nomor_kamar"
                    id="nomor_kamar"
                    value={nomor_kamar}
                    onChange={(e) => setNomorKamar(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label
                    for="tipeKamarId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    Tipe Kamar
                  </label>
                  {typeroom ? (
                    <select
                      name="tipeKamarId"
                      id="tipeKamarId"
                      value={tipeKamarId}
                      onChange={(e) => setTipeKamarId(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                      required
                    >
                      {typeroom.map((item, index) => (
                        <option
                          key={item.id}
                          value={item.id}
                          selected={item.id === tipeKamarId}
                        >
                          {item.nama_tipe_kamar}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
                {error && (
                  <div className="bg-red-200 text-red-800 p-2 mb-4 rounded-md text-sm">
                    Error: {error} {/* Display the error message */}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-primary hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Simpan
                </button>
              </form>
            </div>
          </Modal>
        </>
      ) : null}
    </>
  );
}
