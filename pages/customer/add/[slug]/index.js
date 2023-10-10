import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [id, setId] = useState("");
  const [tipe_kamar, setTipeKamar] = useState("");
  const [nama_pemesan, setNamaPemesan] = useState("");
  const [email_pemesan, setEmailPemesan] = useState("");
  const [nama_user, setNamaUser] = useState("");
  const [tgl_check_in, setCheckIn] = useState("");
  const [tgl_check_out, setCheckOut] = useState("");
  const [nama_tamu, setNamaTamu] = useState("");
  const [jumlah_kamar, setJumlahKamar] = useState(1);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [token, setToken] = useState("");
  const [role, setRole] = useState("")

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      alert("Anda harus login untuk mengakses halaman ini");
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if localStorage is available in the browser environment
      const localStorageNamaPemesan = window.localStorage.getItem("nama_user");
      const localStorageNamaUser = window.localStorage.getItem("nama_user");
      const localStorageEmail = window.localStorage.getItem("email");
      const localStorageCheckIn = window.localStorage.getItem("tgl_check_in");
      const localStorageCheckOut = window.localStorage.getItem("tgl_check_out");

      setNamaPemesan(localStorageNamaPemesan);
      setNamaUser(localStorageNamaUser);
      setEmailPemesan(localStorageEmail);
      setCheckIn(localStorageCheckIn);
      setCheckOut(localStorageCheckOut);

      const pathname = window.location.pathname;
      const tipe = pathname.split("/customer/add/");
      setTipeKamar(tipe[1]);
    }
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    let form = {
      nama_pemesan,
      nama_user,
      email_pemesan,
      tgl_check_in,
      tgl_check_out,
      nama_tamu,
      jumlah_kamar,
      tipe_kamar,
    };
    let url = "http://localhost:3000/pesan/";
    try {
      await axios.post(url, form, headerConfig());
      window.alert("Success transaction");
      router.push("/customer/history");
    } 
    catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message); // Set error message from the response
      } else {
        setError("An error occurred while processing your request."); // Generic error message
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

  const checkRole = () => {
    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "customer"
      ) {
        setToken(localStorage.getItem("token"));
        setRole(localStorage.getItem("role"));
      } else {
        window.alert("You're not customer!");
        window.location = "/";
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "customer"
      ) {
        setToken(localStorage.getItem("token"));
        setRole(localStorage.getItem("role"));
      } else {
        // window.alert("You're not customer!");
        // window.location = "/";
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
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div className="mx-auto mt-8 flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800 shadow-xl z-50">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold text-primary">
                New Booking
              </h1>
              <p className="text-sm text-gray-600">Book a room</p>
            </div>
            <form className="space-y-12" onSubmit={handleAdd}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm">Nama Tamu</label>
                  <input
                    type="text"
                    value={nama_tamu}
                    placeholder="Guest Name"
                    onChange={(e) => setNamaTamu(e.target.value)}
                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Jumlah Kamar</label>
                  <input
                    type="number"
                    value={jumlah_kamar}
                    placeholder="Number of Rooms"
                    onChange={(e) => setJumlahKamar(e.target.value)}
                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md"
                    min="1"
                    required
                  />
                </div>
              </div>
              {error && (
                <div className="text-red-500 text-sm">
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
      ) : null}
    </>
  );
}
