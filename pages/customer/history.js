import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/components/Footers/footer";
import moment from "moment/moment";
import Modal from "@/components/Modal/modal";
import Navbar from "@/components/Navbars/customer/navbar";

export default function History() {
  const [history, setHistory] = useState([]);
  const [originalHistory, setOriginalHistory] = useState([]);
  const [isClient, setIsClient] = useState("");
  const [keyword, setKeyword] = useState("");
  const [tgl, setTgl] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [modal, setModal] = useState(false);

  const headerConfig = () => {
    let token = localStorage.getItem("token");
    let header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return header;
  };

  const getHistory = () => {
    const id = localStorage.getItem("id");
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
  
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setKeyword(value);
    const filteredHistory = originalHistory.filter((type) => {
      return type.status_pemesanan.toLowerCase().includes(value);
    });
    setHistory(filteredHistory);
  };

  const handleSearchTgl = (e) => {
    const value = e.target.value.toLowerCase();
    setTgl(value);
    const filteredHistory = originalHistory.filter((type) => {
      const formattedCheckInDate = type.tgl_check_in.split('T')[0]; 
      return formattedCheckInDate.includes(value);
    });
    setHistory(filteredHistory);
  };

  useEffect(() => {
    setIsClient(true);1
    getHistory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-20 font-bold mt-28 text-primary flex flex-row">
        <h1 className="text-2xl md:text-3xl w-60">History List</h1>
        <div className="flex items-center ml-auto">
          <div className="flex rounded gap-2">
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
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Print
              </th>
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
                  <td className="whitespace-nowrap px-4 py-2 flex flex-row gap-2 justify-center">
                    <a
                      className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded mt-2"
                      href={`/customer/history/${item.id}`}
                    >
                      <span className="sr-only">Print</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-printer-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                        <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                      </svg>
                    </a>
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
