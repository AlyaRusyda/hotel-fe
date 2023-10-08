import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [nama_tipe_kamar, setNamaTipeKamar] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("id", id);
    form.append("nama_tipe_kamar", nama_tipe_kamar);
    form.append("harga", harga);
    form.append("deskripsi", deskripsi);
    form.append("foto", foto);

    let url = "http://localhost:3000/tipekamar/";
    axios
      .post(url, form, headerConfig())
      .then((response) => {
        console.log("Response data:", response.data);
        if (response.data.message == `File size is too largee`) {
          setError("File size is too large. Please upload a smaller file.");
        } else if (response.data.message == `Tipe kamar yang anda inputkan sudah ada`) {
          setError("Typeroom already exist. Please change the typeroom")
        } 
        else if (response.status === 200) {
          console.log(response.data);
          alert("Success add data");
          window.location.href = "/admin/user";
        }
      })
      .catch((error) => {
        console.log("error add data", error.response);
        if (error.response.status === 400) {
          setError(error.response.data.message); // Set error message from the response
        } else {
          setError("An error occurred while processing your request."); // Generic error message
        }
      });
  };

  const handleFile = (e) => {
    setFoto(e.target.files[0]);
  };

  const headerConfig = () => {
    let token = localStorage.getItem("token");
    let header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return header;
  };

  return (
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
          className="w-full h-full absolute opacity-50 bg-black"
        ></span>
      </div>
      <div className="mx-auto mt-16 flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800 shadow-xl z-50">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-primary">New Typeroom</h1>
          <p className="text-sm text-gray-600">Add a new typeroom</p>
        </div>
        <form className="space-y-12" onSubmit={handleAdd}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Typeroom Name</label>
              <input
                value={nama_tipe_kamar}
                onChange={(e) => setNamaTipeKamar(e.target.value)}
                placeholder="Typeroom Name"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Price</label>
              <input
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                type="number"
                placeholder="Price"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Description</label>
              <input
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Photo</label>
              <input
                type="file"
                onChange={handleFile}
                placeholder="Room Photo"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                required
              />
            </div>
          </div>
          {error && (
            <div className="bg-red-200 text-red-800 p-2 mb-4 rounded-md">
              Error: {error} {/* Display the error message */}
            </div>
          )}
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-primary text-gray-50"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
}
