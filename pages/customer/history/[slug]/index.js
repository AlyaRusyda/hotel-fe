import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment/moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function History() {
  const [history, setHistory] = useState([]);
  const [isClient, setIsClient] = useState("");
  const componentRef = useRef(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      alert("Anda harus login untuk mengakses halaman ini");
      window.location.href = "/";
    }
  }, []);

  const headerConfig = () => {
    let token = localStorage.getItem("token");
    let header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return header;
  };

  const getHistory = () => {
    const pathname = window.location.pathname;
    const id = pathname.split("/customer/history/");

    if (id) {
      const pesanId = id[1];

      let url = `http://localhost:3000/pesan/get/${pesanId}`;

      axios
        .get(url, headerConfig())
        .then((response) => {
          const formattedHistory = response.data.data.map((item) => {
            const tglCheckIn = moment(item.tgl_check_in);
            const tglCheckOut = moment(item.tgl_check_out);
            const durasi = moment.duration(tglCheckOut.diff(tglCheckIn));
            return {
              ...item,
              tgl_pemesanan: moment(item.tgl_pemesanan).format(
                "DD-MM-YYYY HH:mm:ss"
              ),
              tgl_check_in: moment(item.tgl_check_in).format(
                "DD-MM-YYYY HH:mm"
              ),
              tgl_check_out: moment(item.tgl_check_out).format(
                "DD-MM-YYYY HH:mm"
              ),
              durasi: durasi.days(),
            };
          });
          setHistory(formattedHistory);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("ID tidak ditemukan dalam URL.");
    }
  };

  const handlePrint = () => {
    const input = componentRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });
      pdf.addImage(imgData, "PNG", 0, 0, 148, 210); // Ukuran A5: 148mm x 210mm
      pdf.save(`invoice.pdf`);
    });
  };

  useEffect(() => {
    setIsClient(true);
    getHistory();
  }, []);

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
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <h1 className="text-2xl font-semibold mb-8 text-center text-white mt-12">
            Invoice Transaction
          </h1>
          {history.map((history, index) => (
            <div key={index} className="flex justify-center">
              <div
                className="pl-5 py-6 pr-4 bg-white w-80 h-fit border border-gray-300 font-mono w-58mm"
                ref={componentRef}
              >
                <div className="text-center text-sm">
                  <h1 className="text-xl font-semibold mb-2 mt-2">
                    TURU Hotel
                  </h1>
                  <h4>customerservice@turu.id</h4>
                  <h4>0371-000022</h4>
                </div>
                <div className="mt-8 leading-5 text-[13.5px]">
                  <p>No Pemesanan: {history.nomor_pemesanan}</p>
                  <p>
                    Tamu:{" "}
                    <span className="capitalize">{history.nama_tamu}</span>
                  </p>
                  <p>
                    User :{" "}
                    <span className="capitalize">{history.user.nama_user}</span>
                  </p>
                  <p>Tanggal: {history.tgl_pemesanan}</p>
                </div>

                <div className="text-[13.5px] mt-3">
                  <p>Check In: {history.tgl_check_in}</p>
                  <p>Check Out: {history.tgl_check_out}</p>
                </div>

                <div className="mt-6">
                  <p className="flex gap-32 capitalize">
                    {history.tipe_kamar.nama_tipe_kamar} Room{" "}
                    <span>{history.durasi} days</span>
                  </p>
                  <p className="ml-8 flex gap-[100px] mt-2">
                    {history.jumlah_kamar} x {history.tipe_kamar.harga}
                    <span className="right-0">
                      {history.jumlah_kamar * history.tipe_kamar.harga}
                    </span>
                  </p>
                </div>

                <div className="mt-8">
                  <p className="ml-28 flex gap-[54px]">
                    Total:{" "}
                    <span className="right-0">
                      {history.tipe_kamar.harga * history.durasi * history.jumlah_kamar}
                    </span>
                  </p>
                </div>

                <div className="text-center mt-4 leading-5 text-sm mb-4">
                  <p>Terima kasih atas kunjungan Anda</p>
                  <p>Harga sudah termasuk pajak</p>
                  <p>Powered by AlyaRusyda</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white font-semibold w-80 p-2 rounded-md mt-4"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}
