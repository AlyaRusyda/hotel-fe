import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [email_user, setEmailUser] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    let data = {
      email: email_user,
      password: password,
    };
    let url = "http://localhost:3000/user/login";
    axios
      .post(url, data)
      .then((response) => {
        let id = response.data.data.id;
        let token = response.data.data.token;
        let role = response.data.data.role;
        let email = response.data.data.email;
        let password = response.data.data.password_user;
        let nama_user = response.data.data.nama_user;

        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("nama_user", nama_user);

        alert("Login Berhasil");
        if (
          localStorage.getItem("role") === "admin" ||
          localStorage.getItem("role") === "resepsionis"
        ) {
          window.location.href = "/admin/home";
        } else if (localStorage.getItem("role") === "customer") {
          window.location.href = "/customer/home";
        }
      })
      .catch((error) => {
        alert("Login failed. Please check your email and password.");
      });
  };

  return (
    <>
      <div className="min-h-screen rounded flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8  rounded-lg shadow-md w-96" onSubmit={handleLogin}>
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline" placeholder="Email" value={email_user} onChange={(e) => setEmailUser(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <div className="relative">
            <input
              type="password"
              className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
    </>
  );
}
