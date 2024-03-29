import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../auth";

export default function Login() {
  const [id, setId] = useState("");
  const [nama_user, setNamaUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      const role = localStorage.getItem("role");
      if (role === "admin" || role === "resepsionis") {
        // alert("Sign out to exit the page");
        router.push("/admin/home"); // Redirect ke dashboard admin/resepsionis jika sudah login
      } else if (role === "customer") {
        // alert("Sign out to exit the page");
        router.push("/customer/home"); // Redirect ke dashboard customer jika sudah login
      }
    }
  }, []); 

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
          setError("Email already exist. Please change your email");
        } else if (response.status === 200) {
          alert("Success add data");
          window.location.href = "/admin/user";
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alert("Failed to add data");
        }
      });
  };

  const handleFile = (e) => {
    setFoto(e.target.files[0]);
  };

  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Night"
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Turu Hotel
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Search and book hotels with ease. Just one click you can already
                book the hotel you want. Start booking and feel the convenience
                we offer
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <svg
                    className="h-8 sm:h-10"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to Turu Hotel
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Search and book hotels with ease. Just one click you can
                  already book the hotel you want. Start booking and feel the
                  convenience we offer
                </p>
              </div>

              <form
                onSubmit={handleAdd}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6">
                  <h1 className="font-bold text-3xl mb-8 text-primary">
                    Register
                  </h1>
                  <label
                    htmlFor="nama_user"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    name="nama_user"
                    className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 border rounded-lg"
                    placeholder="Name"
                    value={nama_user}
                    onChange={(e) => setNamaUser(e.target.value)}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 border rounded-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 border rounded-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="foto"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Photo
                  </label>

                  <input
                    className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 border rounded-lg"
                    type="file"
                    name="foto"
                    onChange={handleFile}
                    placeholder="User Photo"
                    required
                  />
                  {error && (
                    <div className="bg-red-200 text-red-800 p-2 mb-4 rounded-md mt-2 -mb-8">
                      Error: {error} {/* Menampilkan pesan kesalahan */}
                    </div>
                  )}
                </div>

                <div>
                  <input
                    type="hidden"
                    name="role"
                    value="customer"
                    onChange={(e) => setRole(e.target.value)}
                    required
                  />
                </div>

                <div className="col-span-6 flex-col sm:flex sm:items-center sm:gap-2">
                  <button className="inline-block shrink-0 rounded-md border bg-primary px-40 py-3 text-sm font-medium text-white transition hover:bg-primary/30 focus:border-none focus:outline-none focus:ring active:text-primary/80">
                    Create an account
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <a
                      href="../login"
                      className="ml-1 font-bold text-gray-700 underline"
                    >
                      Log in
                    </a>
                    .
                  </p>
                  <p className="text-sm text-gray-500 sm:mt-0">
                    Ask to admin if you an employee
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
