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

  // const getTypeRoom = () => {
  //   let url = "http://localhost:3000/tipekamar/getAll/";
  //   axios
  //     .get(url, headerConfig())
  //     .then((response) => {
  //       setTyperoom(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-20 font-bold mt-28 text-primary flex flex-row">
        <h1 className="text-2xl md:text-3xl w-60">History List</h1>
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
