import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbars/admin/navbar";
import Footer from "@/components/Footers/footer";
import Link from "next/link";
import Modal from "@/components/Modal/modal";

export default function TypeRoom() {
  const [typeroom, setTyperoom] = useState([]);
  const [originalTyperoom, setOriginalTyperoom] = useState([]);
  const [id, setId] = useState("");
  const [nama_tipe_kamar, setNamaTipeKamar] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState("");
  const [role, setRole] = useState("");
  const [keyword, setKeyword] = useState("");
  const [modal, setModal] = useState(false);
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
    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "resepsionis"
      ) {
        setToken(localStorage.getItem("token"));
        setRole(localStorage.getItem("role"));
      } else {
        // window.alert("You're not admin or resepsionis!");
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

  const handleEdit = async (item) => {
    setModal(true);
    try {
      setId(item.id);
      setNamaTipeKamar(item.nama_tipe_kamar);
      setHarga(item.harga);
      setDeskripsi(item.deskripsi);
      setFoto(item.foto);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("nama_tipe_kamar", nama_tipe_kamar);
    form.append("harga", harga);
    form.append("deskripsi", deskripsi);
    form.append("foto", foto);

    let url = `http://localhost:3000/tipekamar/${id}`;
    axios
      .put(url, form, headerConfig())
      .then((response) => {
        if (response.data.message == `File size is too largee`) {
          setError("File size is too large. Please upload a smaller file.");
        } else if (
          response.data.message == `Validation error`
        ) {
          setError("Typeroom already exist. Please change the typeroom");
        } else if (response.status === 200) {
          // console.log(response.data);
          alert("Success edit data");
          window.location.href = "/admin/typeroom";
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alert("Failed to add data");
        }
      });
  };

  const handleDrop = (id) => {
    let url = `http://localhost:3000/tipekamar/${id}`;
    if (window.confirm("Are you sure to delete this type room ? ")) {
      axios
        .delete(url, headerConfig())
        .then((response) => {
          getTypeRoom();
        })
        .catch((error) => {
          if (error.response.status === 500) {
            window.alert("You can't delete this data");
          }
        });
    }
  };

  const handleFile = (e) => {
    setFoto(e.target.files[0]);
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
    try {
      await setTyperoom(
        originalTyperoom.filter((type) => {
          return type.nama_tipe_kamar
            .toLowerCase()
            .includes(keyword.toLowerCase());
        })
      );
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
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
                {role === "admin" && (
                  <Link
                    className="ml-2 px-4 flex flex-row text-sec bg-primary rounded hover:bg-primary/30 hover:text-primary"
                    href="/admin/typeroom/add"
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
                )}
              </div>
            </div>
          </div>
          <div className="py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 px-20">
            {typeroom.length === 0 ? (
              <p>No rooms available.</p>
            ) : (
              typeroom.map((item, index) => (
                <div
                  className="group relative block overflow-hidden rounded-md"
                  key={index}
                >
                  {role === "admin" && (
                    <button
                      className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-sec hover:bg-primary"
                      onClick={() => handleEdit(item)}
                    >
                      <span className="sr-only">Edit</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
                  )}

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

                    <p className="mt-1.5 text-sm text-gray-700">
                      {(item.deskripsi).slice(0, 38)} ...
                    </p>
                    {role === "admin" && (
                      <button
                        className="absolute end-4 top-4 z-10 rounded-full bg-rose-200 p-1.5 text-red-500 transition hover:text-sec hover:bg-rose-500"
                        onClick={() => handleDrop(item.id)}
                      >
                        <span className="sr-only">Delete</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <Footer />

          <Modal isVisible={modal} close={() => setModal(false)}>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-black">
                Edit Type Room
              </h3>
              <form className="space-y-6" onSubmit={handleSave}>
                <div>
                  <label
                    for="nama_tipe_kamar"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    Typeroom Name
                  </label>
                  <input
                    type="text"
                    name="nama_tipe_kamar"
                    id="nama_tipe_kamar"
                    value={nama_tipe_kamar}
                    onChange={(e) => setNamaTipeKamar(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                    placeholder="Typeroom name"
                    required
                  />
                </div>
                <div>
                  <label
                    for="harga"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="harga"
                    id="harga"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                    placeholder="Price"
                    required
                  />
                </div>
                <div>
                  <label
                    for="deskripsi"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    Description Room Type
                  </label>
                  <textarea
                    rows="3"
                    type="text"
                    name="deskripsi"
                    id="deskripsi"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                    placeholder="Description"
                  />
                </div>
                <div>
                  <label
                    for="foto"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    Photo
                  </label>
                  <input
                    type="file"
                    name="foto"
                    id="foto"
                    placeholder="Select Typeroom Photo"
                    onChange={handleFile}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 block w-full px-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                  />
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
