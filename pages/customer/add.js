import React, { useState } from "react";
import axios from "axios";

function Add() {
  const [nama_pemesan, setNamaPemesan] = useState("");
  const [email_pemesan, setEmailPemesan] = useState("");
  const [nama_tamu, setNamaTamu] = useState("");
  const [jumlah_kamar, setJumlahKamar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ganti URL sesuai dengan endpoint addPemesanan Anda
    let url = "http://localhost:3000/pesan/";

    const data = {
      nama_pemesan,
      email_pemesan,
      nama_tamu,
      jumlah_kamar,
      // Tambahkan field lain yang diperlukan sesuai dengan kebutuhan Anda
    };

    axios
      .post(url, data)
      .then((response) => {
        if (response.data.success) {
          alert("Pemesanan berhasil!");
          window.location.href = "/customer/home";
          // Redirect ke halaman lain atau lakukan aksi lain sesuai kebutuhan
        } else {
          alert("Pemesanan gagal: " + response.data.message);
        }
      })
      .catch((error) => {
        alert("Terjadi kesalahan: " + error.message);
      });
  };

  return (
    <div>
      <h2>Form Pemesanan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Pemesan</label>
          <input
            type="text"
            value={nama_pemesan}
            onChange={(e) => setNamaPemesan(e.target.value)}
          />
        </div>
        <div>
          <label>Email Pemesan</label>
          <input
            type="email"
            value={email_pemesan}
            onChange={(e) => setEmailPemesan(e.target.value)}
          />
        </div>
        <div>
          <label>Nama Tamu</label>
          <input
            type="text"
            value={nama_tamu}
            onChange={(e) => setNamaTamu(e.target.value)}
          />
        </div>
        <div>
          <label>Jumlah Kamar</label>
          <input
            type="number"
            value={jumlah_kamar}
            onChange={(e) => setJumlahKamar(e.target.value)}
          />
        </div>
        {/* Tambahkan input untuk field lain yang diperlukan */}
        <button type="submit">Pesan Kamar</button>
      </form>
    </div>
  );
}

export default Add;
