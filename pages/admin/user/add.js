import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [nama_user, setNamaUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [foto, setFoto] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("id", id);
    form.append("nama_user", nama_user);
    form.append("email", email);
    form.append("password", password);
    form.append("role", role);
    form.append("foto", foto);

    let url = "http://localhost:3000/user/add";
    axios
      .post(url, form, headerConfig())
      .then((response) => {
        if (response.status === 200) {
          alert("Success add data");
          window.location.href = "/admin/user";
        }
      })
      .catch((error) => {
        console.log("error add data", error.response.status);
        if (error.response.status === 500) {
          alert("Failed to add data");
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
      <section className="relative bg-[url(/img/register_bg_2.png)] bg-cover bg-center bg-no-repeat flex flex-row min-h-screen">
        <div className="z-99 w-96 rounded-xl mx-auto shadow-md">
          <form className="flex flex-col gap-4 m-8" onSubmit={handleAdd}>
            <h1 className="font-bold text-3xl text-sec text-center">
              Add Tipe Kamar
            </h1>
            <input
              className="bg-slate-200 rounded p-2 shadow"
              value={nama_user}
              onChange={(e) => setNamaUser(e.target.value)}
              placeholder="User Name"
              required
            />
            <input
              className="bg-slate-200 rounded p-2 shadow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />
            <input
              className="bg-slate-200 rounded p-2 shadow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
            <input
              className="bg-slate-200 rounded p-2 shadow"
              type="file"
              onChange={handleFile}
              placeholder="User Photo"
              required
            />
            <select
              className="bg-slate-200 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-800 block w-full p-2.5"
              placeholder="Role User"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role User</option>
              <option value="admin">Admin</option>
              <option value="resepsionis">Resepsionis</option>
              <option value="customer">Customer</option>
            </select>
            <button className="bg-slate-300 mx-auto rounded text-primary hover:text-slate-200 hover:bg-slate-600 font-bold py-2 px-[140px]">
              Add
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
