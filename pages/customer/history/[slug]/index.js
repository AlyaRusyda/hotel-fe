import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment/moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function History() {
  const [history, setHistory] = useState({
    pemesanan: {
      id: "",
      nomor_pemesanan: "",
      nama_tamu: "",
      nama_pemesan: "",
      tgl_pemesanan: "",
      tgl_check_in: "",
      tgl_check_out: "",
      jumlah_kamar: 0,
      tipeKamarId: 0,
    },
    nomor_kamar: [],
  });
  const [isClient, setIsClient] = useState("");
  const componentRef = useRef(null);
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
      if (localStorage.getItem("role") === "customer") {
        setToken(localStorage.getItem("token"));
        setRole(localStorage.getItem("role"));
      } else {
        window.alert("You're not customer!");
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

  const getHistory = () => {
    const pathname = window.location.pathname;
    const id = pathname.split("/customer/history/");
    if (id) {
      const pesanId = id[1];
      let url = `http://localhost:3000/pesan/get/${pesanId}`;
  
      axios
        .get(url, headerConfig())
        .then((response) => {
          const pemesanan = response.data.data.pemesanan;
          const formattedPemesanan = {
            ...pemesanan,
            tgl_pemesanan: moment(pemesanan.tgl_pemesanan).format("DD-MM-YYYY HH:mm:ss"),
            tgl_check_in: moment(pemesanan.tgl_check_in).format("DD-MM-YYYY HH:mm"),
            tgl_check_out: moment(pemesanan.tgl_check_out).format("DD-MM-YYYY HH:mm"),
          };
  
          const checkIn = moment(pemesanan.tgl_check_in, "YYYY-MM-DDTHH:mm:ss.SSSZ");
          const checkOut = moment(pemesanan.tgl_check_out, "YYYY-MM-DDTHH:mm:ss.SSSZ");
          const duration = moment.duration(checkOut.diff(checkIn));
          const days = duration.asDays(); // Calculate duration in days

          // Menghapus nilai duplikat dari nomor_kamar menggunakan Set
          const uniqueNomorKamar = Array.from(new Set(response.data.data.nomor_kamar));

          setHistory({
            pemesanan: {
              ...formattedPemesanan,
              durasi: days, // Save duration in pemesanan object
            },
            nomor_kamar: uniqueNomorKamar,
          });
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("role") === "customer") {
        setToken(localStorage.getItem("token"));
        setRole(localStorage.getItem("role"));
      } else {
        window.alert("You're not customer!");
        window.location = "/";
      }
    }
    checkRole();
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
          <h1 className="text-2xl font-semibold mb-8 text-center text-white mt-6">
            Invoice Transaction
          </h1>
          {history.pemesanan && (
            <div className="flex justify-center">
              <div
                className="pl-5 py-6 pr-4 bg-white w-80 h-fit border border-gray-300 font-mono w-58mm"
                ref={componentRef}
              >
                <div className="text-center text-sm">
                  <h1 className="text-xl font-semibold mb-2 mt-2">
                    TURU Hotel
                  </h1>
                  <h2>Invoice #{history.pemesanan.id}</h2>
                  <h4>customerservice@turu.id</h4>
                  <h4>0371-000022</h4>
                </div>
                <div className="mt-8 leading-5 text-[13.5px]">
                  <p>No Pemesanan: {history.pemesanan.nomor_pemesanan}</p>
                  <p>
                    Tamu:{" "}
                    <span className="capitalize">
                      {history.pemesanan.nama_tamu}
                    </span>
                  </p>
                  <p>
                    User:{" "}
                    <span className="capitalize">
                      {history.pemesanan.nama_pemesan}
                    </span>
                  </p>
                  <p>Tanggal: {history.pemesanan.tgl_pemesanan}</p>
                </div>

                <div className="text-[13.5px] mt-3">
                  <p>Check In: {history.pemesanan.tgl_check_in}</p>
                  <p>Check Out: {history.pemesanan.tgl_check_out}</p>
                </div>

                <div className="mt-6">
                  <p className="flex gap-[104px] capitalize">
                    {history.pemesanan.nama_tipe_kamar} Room{" "}
                    <span>{history.pemesanan.durasi} days</span>
                  </p>
                <p className="flex gap-2 text-sm">
                    ( Room{" "}
                    {history.nomor_kamar
                      .map((roomNumber, index) => (
                        <span key={index}>{roomNumber}</span>
                      ))}
                    )
                  </p>
                  <p className="ml-8 flex gap-[100px] mt-2">
                    {history.pemesanan.jumlah_kamar} x {history.pemesanan.harga}
                    <span className="right-0">
                      {history.pemesanan.jumlah_kamar * history.pemesanan.harga}
                    </span>
                  </p>
                </div>

                <div className="mt-8">
                  <p className="ml-28 flex gap-[54px]">
                    Total:{" "}
                    <span className="right-0">
                      {history.pemesanan.jumlah_kamar *
                        history.pemesanan.harga *
                        history.pemesanan.durasi}
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
          )}

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
