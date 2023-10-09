import React, { useState,useEffect } from "react";

export default function Invoice() {
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
  return (
    <>
      {token ? (
        <>
          <div className="p-6 bg-white w-80 border border-gray-300 font-mono">
            <div className="text-center text-sm">
              <h1 className="text-xl font-semibold mb-2 mt-8">TURU Invoice</h1>
              <h4>customerservice@turu.id</h4>
              <h4>0371-000022</h4>
            </div>
            <div className="mt-8 leading-5 text-sm">
              <p>No Pemesanan: P001</p>
              <p>User: Jihan</p>
              <p>Tanggal: DD-MM-YYYY 00:00:00</p>
            </div>

            <div className="mt-8">
              <p>Tipe Kamar</p>
              <p className="ml-4 flex gap-28">
                1 X 900000<span className="right-0">900000</span>
              </p>
            </div>

            <div className="mt-4">
              <p className="ml-32 flex gap-4">
                Total : <span className="right-0">190,000</span>
              </p>
            </div>

            <div className="text-center mt-8 leading-5 text-sm mb-8">
              <p>Terima kasih atas kunjungan Anda</p>
              <p>Harga sudah termasuk pajak</p>
              <p>Powered by AlyaRusyda</p>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
