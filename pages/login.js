import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [email_user, setEmailUser] = useState("");
  const [password_user, setPasswordUser] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    let data = {
      email: email_user,
      password: password_user,
    };
    let url = "http://localhost:3000/user/login";
    axios
      .post(url, data)
      .then((response) => {
        let id = response.data.data.id;
        let token = response.data.data.token;
        let role = response.data.data.role;
        let email = response.data.data.email;
        let password = response.data.data.password;
        let nama_user = response.data.data.nama_user;
        //tambahi email + password

        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("nama_user", nama_user);
        //tambahi email + password

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
      //Tambahi Handle error
      .catch((error) => {
        alert("Login failed. Please check your email and password.");
      });
  };

  return (
    <>
      {/* tambahi Style Frontend */}
      <section className="relative bg-[url(/img/register_bg_2.png)] bg-cover bg-center bg-no-repeat flex flex-row min-h-screen">
        <div className="z-99 bg-gray-500 w-96 h-[360px] rounded-xl mt-48 mx-auto shadow-md">
          <form className="flex flex-col gap-4 m-8" onSubmit={handleLogin}>
            <h1 className="font-bold text-3xl text-sec text-center">
              TURU Hotel
            </h1>
            <p className="text-sec">
              This is a secure system and you must provide login details You to
              access hotel reservations
            </p>
            <input
              className="bg-slate-200 rounded p-2 shadow"
              value={email_user}
              onChange={(e) => setEmailUser(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              className="bg-slate-200 rounded p-2 shadow"
              value={password_user}
              onChange={(e) => setPasswordUser(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
            <button className="bg-slate-300 mx-auto rounded text-primary hover:text-slate-200 hover:bg-slate-600 font-bold py-2 px-[140px]">
              Login
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
