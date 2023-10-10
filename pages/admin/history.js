import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbars/admin/navbar";
import Footer from "@/components/Footers/footer";
import moment from "moment/moment";
import Modal from "@/components/Modal/modal";

export default function History() {
  const [history, setHistory] = useState([]);
  const [originalHistory, setOriginalHistory] = useState([]);
  const [isClient, setIsClient] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [role, setRole] = useState("");
  const [keyword, setKeyword] = useState("");
  const [input, setInput] = useState("");
  const [tgl, setTgl] = useState("");
  const [modal, setModal] = useState(false);
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

  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleEditStatus = (reservation) => {
    setModal(true);
    setSelectedReservation(reservation);
  };

  const handleSaveStatus = () => {
    if (!selectedReservation) {
      return; // Return early if there is no selected reservation
    }

    const updatedStatus = selectedReservation.status_pemesanan;
    const reservationId = selectedReservation.id;

    axios
      .put(
        `http://localhost:3000/pesan/status/${reservationId}`,
        { status_pemesanan: updatedStatus },
        headerConfig()
      )
      .then((response) => {
        if (response.status === 200) {
          alert("Success edit status");
          setModal(false); // Close the modal after successful update

          setHistory((prevHistory) =>
            prevHistory.map((item) =>
              item.id === reservationId
                ? { ...item, status_pemesanan: updatedStatus }
                : item
            )
          );
        }
      })
      .catch((error) => {
        console.log("error updating status", error.response.status);
        if (error.response.status === 500) {
          alert("Failed to update status");
        }
      });
  };

  const getHistory = () => {
    let url = "http://localhost:3000/pesan/getAll/";
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setKeyword(value);
    const filteredHistory = originalHistory.filter((type) => {
      return type.status_pemesanan.toLowerCase().includes(value);
    });
    setHistory(filteredHistory);
  };

  const handleSearchNama = (e) => {
    const input = e.target.value.toLowerCase();
    setInput(input);
    const filteredHistory = originalHistory.filter((type) => {
      return type.nama_tamu.toLowerCase().includes(input);
    });
    setHistory(filteredHistory);
  };

  const handleSearchTgl = (e) => {
    const value = e.target.value.toLowerCase();
    setTgl(value);
    const filteredHistory = history.filter((type) => {
      const formattedCheckInDate = type.tgl_check_in.split('T')[0]; 
      return formattedCheckInDate.includes(value);
    });
    setHistory(filteredHistory);
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
        // window.alert("You're not admin or resepsionis!");
        window.location = "/";
      }
    }
    getHistory();
    checkRole();
  }, []);

  return (
    <>
    {token ? (
      <>
      <Navbar />
      <div className="px-20 font-bold mt-28 text-primary flex flex-row">
        <h1 className="text-2xl md:text-3xl w-60">History List</h1>
        <div className="flex items-center ml-auto">
          <div className="flex rounded gap-2">
          <input
              type="text"
              className="block px-4 py-2 bg-white border font-normal rounded-md focus:border-priamry/10 focus:ring-primary/20 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Guest Name..."
              name="input"
              value={input}
              onKeyUp={handleSearchNama}
              onChange={(e) => setInput(e.target.value)}
            />
            <input
              type="date"
              className="block px-4 py-2 bg-white border font-normal rounded-md focus:border-priamry/10 focus:ring-primary/20 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Tanggal..."
              name="tgl"
              value={tgl}
              onKeyUp={handleSearchTgl}
              onChange={(e) => setTgl(e.target.value)}
            />
            <select
              className="block px-4 py-2 bg-slate-200 border font-normal rounded-md focus:border-primary/10 focus:ring-primary/20 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Status"
              name="keyword"
              value={keyword}
              onChange={handleSearch}
            >
              <option value="">Select Status</option>
              <option value="baru">Baru</option>
              <option value="check_in">Check In</option>
              <option value="check_out">Check Out</option>
            </select>
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
                  {role === "resepsionis" && (
                    <td className="whitespace-nowrap px-4 py-2 flex flex-row gap-2 justify-center">
                      <button
                        className={`bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded mt-2 ${
                          item.status_pemesanan === "check_out"
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => handleEditStatus(item)}
                        disabled={item.status_pemesanan === "check_out"}
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
                className="w-full text-white bg-primary hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Simpan
              </button>
            </form>
          )}
        </div>
      </Modal>
      </>
      ) : null}
    </>
  );
}
