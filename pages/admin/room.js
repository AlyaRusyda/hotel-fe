import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbars/admin/navbar";
import Footer from "@/components/Footers/footer";
import Link from "next/link";
// import Modal from "@/components/Modal/modal";

export default function Room() {
  const [room, setRoom] = useState([]);
  const [originalRoom, setOriginalRoom] = useState([]);
  const [typeroom, setTyperoom] = useState([]);
  const [id, setId] = useState("");
  const [nomor_kamar, setNomorKamar] = useState("");
  const [tipeKamarId, setTipeKamarId] = useState("");
  //   const [harga, setHarga] = useState("");
  //   const [deskripsi, setDeskripsi] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [action, setAction] = useState("");
  const [keyword, setKeyword] = useState("");
  const [modal, setModal] = useState(false);

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

  const handleEdit = async (id) => {
    setModal(true);
    setId(id);
    let url = await axios.get(
      `http://localhost:3000/tipekamar/${id}`,
      headerConfig
    );
    const data = response.data;
    setNamaTipeKamar(response.data.data.nama_tipe_kamar);
    setHarga(respose.data.data.harga);
    setDeskripsi(response.ata.data.deskripsi);
    setFoto(respose.data.data.foto);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("id", id);
    form.append("nama_tipe_kamar", nama_tipe_kamar);
    form.append("harga", harga);
    form.append("deskripsi", deskripsi);
    form.append("foto", foto);

    let url = `http://localhost:3000/tipekamar/${id}`;
    axios
      .put(url, form, headerConfig())
      .then((response) => {
        if (response.status === 200) {
          alert("Success edit data");
        }
      })
      .catch((error) => {
        console.log("error add data", error.response.status);
        if (error.response.status === 500) {
          alert("Failed to add data");
        }
      });
  };

  const handleDrop = (id) => {
    let url = `http://localhost:3000/kamar/${id}`;
    if (window.confirm("Are you sure to delete this room? ")) {
      axios
        .delete(url, headerConfig())
        .then((response) => {
          console.log(response.data.message);
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

  const getRoom = () => {
    let url = "http://localhost:3000/kamar/getAll/";
    axios
      .get(url, headerConfig())
      .then((response) => {
        setRoom(response.data.data);
        setOriginalRoom(response.data.data);
      })
      .catch((error) => {
        console.log(error);
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

  const handleSearch = async() => {
    try {
      await setRoom(
        originalRoom.filter((type) => {
          return type.tipeKamarId.toLowerCase().includes(keyword.parseInt());
        })
      )
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
    getRoom();
    getTypeRoom();
    checkRole();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-20 font-bold mt-28 text-primary flex flex-row">
        <h1 className="text-2xl md:text-3xl w-60">Room List</h1>
        <div className="flex items-center ml-auto">
          <div className="flex rounded ">
            <select
              className="block px-4 py-2 bg-slate-200 border font-normal rounded-md focus:border-primary/10 focus:ring-primary/20 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Type room"
              name="keyword"
              value={keyword}
              onSubmit={handleSearch}
              onChange={(e) => setKeyword(e.target.value)}
            >
              <option value="">Select Type Room</option>
              {typeroom.map((item) => (
                <option value={item.id}>{item.nama_tipe_kamar}</option>
              ))}
            </select>
            {role === "admin" && (
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
            )}
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
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {room.length === 0 ? (
              <p>No rooms available.</p>
            ) : (
              room.map((item, index) => (
                <tr>
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
                  <td className="whitespace-nowrap py-2 flex flex-row gap-2">
                    <button
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Footer />

      {/* <Modal isVisible={modal} close={() => setModal(false)}>
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-black">
            Edit Type Room
          </h3>
          <form
            className="space-y-6"
            onSubmit={handleSave}
          >
            <div>
              <label
                for="nama_tipe_kamar"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
              >
                Name Room Type
              </label>
              <input
                type="text"
                name="nama_tipe_kamar"
                id="nama_tipe_kamar"
                value={nama_tipe_kamar}
                onChange={(e) => setNamaTipeKamar(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                placeholder="Masukkan name room type"
                required
              />
            </div>
            <div>
              <label
                for="harga"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
              >
                Price Room Type
              </label>
              <input
                type="number"
                name="harga"
                id="harga"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                placeholder="Masukkan price room type"
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
                onChange={(e) => setDeskripsi(e.target.deskripsi)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                placeholder="Masukkan description room type"
              />
            </div>
            <div>
              <label
                for="foto"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
              >
                Photo Room Type
              </label>
              <input
                type="file"
                name="foto"
                id="foto"
                placeholder="Pilih foto tipe kamar"
                onChange={handleFile}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 block w-full px-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                required={action === "update" ? false : true}
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Simpan
            </button>
          </form>
        </div>
      </Modal> */}
    </>
  );
}
