import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/components/Footers/footer";
import Link from "next/link";
import moment from "moment/moment";
import Modal from "@/components/Modal/modal";
import Navbar from "@/components/Navbars/customer/navbar";
// import Modal from "@/components/Modal/modal";

export default function History() {
  const [history, setHistory] = useState([]);
  const [originalHistory, setOriginalHistory] = useState([]);
  const [typeroom, setTyperoom] = useState([]);
  const [isClient, setIsClient] = useState("");
  const [id, setId] = useState("");
  const [userId, setuserId] = useState("");
  const [tipeKamarId, setTipeKamarId] = useState("");
  const [nomor_pemesanan, setNomorPemesanan] = useState("");
  const [nama_pemesan, setNamaPemesan] = useState("");
  const [email_pemesan, setEmail] = useState("");
  const [tgl_pemesanan, setTgl] = useState("");
  const [tgl_check_in, setCheckIn] = useState("");
  const [tgl_check_out, setCheckOut] = useState("");
  const [nama_tamu, setNamaTamu] = useState("");
  const [jumlah_kamar, setJumlahKamar] = useState("");
  const [status_pemesanan, setStatus] = useState("");
  const [token, setToken] = useState("");
  const [action, setAction] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [role, setRole] = useState("");
  const [keyword, setKeyword] = useState("");
  const [modal, setModal] = useState(false);

  const headerConfig = () => {
    let token = localStorage.getItem("token");
    let header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return header;
  };

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleEdit = async (id) => {
    setModal(true);
    setId(id);
    let url = await axios.get(
      `http://localhost:3000/pesan/${id}`,
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

    let url = `http://localhost:3000/pesan/${id}`;
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

  const getHistory = () => {
    const id = localStorage.getItem(("id"))
    let url = `http://localhost:3000/pesan/getByUser/${id}`;
    axios
      .get(url, headerConfig())
      .then((response) => {
        setHistory(response.data.data);
        setOriginalHistory(response.data.data);
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

  const handleSearch = async () => {
    try {
      await setHistory(
        originalHistory.filter((type) => {
          return type.status_pemesanan.includes(keyword);
        })
      );
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-20 font-bold mt-28 text-primary flex flex-row">
        <h1 className="text-2xl md:text-3xl w-60">History List</h1>
        <div className="flex items-center ml-auto">
          <div className="flex rounded">
            <select
              className="block px-4 py-2 bg-slate-200 border font-normal rounded-md focus:border-primary/10 focus:ring-primary/20 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Type room"
              name="keyword"
              value={keyword}
              onSubmit={handleSearch}
              onChange={(e) => setKeyword(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="baru">Baru</option>
              <option value="check_in">Check In</option>
              <option value="check_out">Check Out</option>
            </select>
            {role === "admin" && isClient ? (
              <Link
                className="ml-2 px-4 flex flex-row text-sec bg-primary rounded hover:bg-primary/30 hover:text-primary"
                href="/admin/pesan/add"
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
                Transaction Number
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Booking Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Guest Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Type Room
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Qty
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Book Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Check In
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Check Out
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Status
              </th>
              {role === "resepsionis" && (
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Action
              </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {history.length === 0 && isClient ? (
              <p>No history available.</p>
            ) : (
              history.map((item, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {item.nomor_pemesanan}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.nama_pemesan}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.nama_tamu}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.tipe_kamar?.nama_tipe_kamar}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.jumlah_kamar}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(item.tgl_pemesanan).format("DD-MM-YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(item.tgl_check_in).format("DD-MM-YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(item.tgl_check_out).format("DD-MM-YYYY")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.status_pemesanan === "baru" && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        Baru
                      </span>
                    )}
                    {item.status_pemesanan === "check_in" && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Check In
                      </span>
                    )}
                    {item.status_pemesanan === "check_out" && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-gray-800">
                        Check Out
                      </span>
                    )}
                  </td>
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
            Edit Status Pemesanan
          </h3>
          {selectedReservation && (
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="status_pemesanan"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                >
                  Status Pemesanan
                </label>
                <select
                  id="status_pemesanan"
                  name="status_pemesanan"
                  value={selectedReservation.status_pemesanan}
                  onChange={(e) =>
                    setSelectedReservation({
                      ...selectedReservation,
                      status_pemesanan: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                >
                  <option value="baru">Baru</option>
                  <option value="check_in">Check In</option>
                  <option value="check_out">Check Out</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleSaveStatus}
                className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Simpan
              </button>
            </form>
          )}
        </div>
      </Modal>
    </>
  );
}
