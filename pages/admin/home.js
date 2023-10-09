import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footers/footerHome";
import Navbar from "@/components/Navbars/admin/navbarHome";

export default function Login() {
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  const checkRole = () => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken) {
      if (storedRole === "admin" || storedRole === "resepsionis") {
        setToken(storedToken);
        setRole(storedRole);
      } else {
        window.alert("You're not admin or resepsionis!");
        window.location = "/";
      }
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      alert("Anda harus login untuk mengakses halaman ini");
      window.location.href = "/"; 
    }

    checkRole()
  }, []);

  return (
    <>
      {token ? (
        <>
          <Navbar transparent />
          <main className="bg-sec">
            <div className="relative pt-44 pb-60 flex content-center items-center justify-center min-h-screen-75">
              <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                }}
              >
                <span
                  id="blackOverlay"
                  className="w-full h-full absolute opacity-75 bg-black"
                ></span>
              </div>
              <div className="container relative mx-auto">
                <div className="items-center flex flex-wrap">
                  <div className="w-full lg:w-5/12 px-4 ml-auto mr-auto text-center">
                    <div className="pr-12">
                      <h1 className="text-white font-semibold text-[2.7rem]">
                        Enjoy your journey with us.
                      </h1>
                      <p className="mt-4 text-lg text-white">
                        Search and book hotels with ease. Just one click you can
                        already book the hotel you want. Start booking and feel
                        the convenience we offer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
                style={{ transform: "translateZ(0)" }}
              >
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="text-sec fill-current"
                    points="2560 0 2560 100 0 100"
                  ></polygon>
                </svg>
              </div>
            </div>

            <section className="pb-20 bg-blueGray-200 -mt-24">
              <div className="container mx-auto px-36">
                <div className="flex flex-wrap">
                  <Link
                    href="/admin/typeroom"
                    className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center"
                  >
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-truck-flatbed"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.5 4a.5.5 0 0 1 .5.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-4 0 1 1 0 0 1-1-1v-1h11V4.5a.5.5 0 0 1 .5-.5zM3 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm1.732 0h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4a2 2 0 0 1 1.732 1z" />
                          </svg>
                        </div>
                        <h6 className="text-xl font-semibold">Type Room</h6>
                        <p className="mt-2 mb-4 text-blueGray-500">
                          Check out the different room types available at Turu
                          Hotel. Add, modify, and customize with existing ones.
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/admin/user"
                    className="w-full md:w-4/12 px-4 text-center"
                  >
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-sky-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-person-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path
                              fill-rule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                            />
                          </svg>
                        </div>
                        <h6 className="text-xl font-semibold">User</h6>
                        <p className="mt-2 mb-4 text-primary">
                          See all users of Turu Hotel application. Add, set, and
                          modify its access rights.
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/admin/history"
                    className="pt-6 w-full md:w-4/12 px-4 text-center"
                  >
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-clock-history"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                          </svg>
                        </div>
                        <h6 className="text-xl font-semibold">History</h6>
                        <p className="mt-2 mb-4 text-blueGray-500">
                          View all transactions at Turu Hotel. Search by date,
                          name, and status of an existing order.
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </>
      ) : null}
    </>
  );
}
