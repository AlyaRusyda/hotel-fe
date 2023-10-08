import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [nama_user, setNamaUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState(null);

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
      .post(url, form)
      .then((response) => {
        if (response.data.message == `File size is too large`) {
          setError("File size is too large. Please upload a smaller file.");
        } else if (response.data.message == `Validation error`) {
          setError("Email already exist. Please change your email")
        } 
        else if (response.status === 200) {
          console.log(response.data);
          alert("Success add data");
          window.location.href = "/admin/user";
        }
      })
      .catch((error) => {
        console.log("error add data", error.response);
        if (error.response && error.response.data) {
          setError(error.response.data.message); // Mengatur pesan kesalahan dari respons server
        } else {
          setError("Failed to add data"); // Pesan kesalahan default jika tidak ada respons dari server
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
      <div className="mx-auto mt-4 flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800 shadow-xl z-50">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-primary">New User</h1>
          <p className="text-sm text-gray-600">Add a new user</p>
        </div>
        <form className="space-y-12" onSubmit={handleAdd}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">User Name</label>
              <input
                value={nama_user}
                name="nama_user"
                onChange={(e) => setNamaUser(e.target.value)}
                placeholder="User Name"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Email User</label>
              <input
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Password</label>
              <input
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Photo</label>
              <input
                type="file"
                name="foto"
                onChange={handleFile}
                placeholder="User Photo"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Role</label>
              <select
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
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
            </div>
          </div>
          {error && (
            <div className="bg-red-200 text-red-800 p-2 mb-4 rounded-md">
              Error: {error} {/* Menampilkan pesan kesalahan */}
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
