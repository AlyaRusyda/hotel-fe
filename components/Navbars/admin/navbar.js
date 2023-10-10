import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Hamburger from "@/components/Hamburgers/Hamburger";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const [role, setRole] = useState("");

  const router = useRouter();

  // Define the user object
  useEffect(() => {
    // Check for localStorage items on the client-side
    if (typeof window !== "undefined") {
      // Define the user object
      const userData = {
        email: localStorage.getItem("email"),
        role: localStorage.getItem("role"),
        nama_user: localStorage.getItem("nama_user"),
        foto: localStorage.getItem("foto"),
      };
      setUser(userData); // Set the user state with userData
      setRole(userData.role);
    }

    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    });
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      router.push("/");
      localStorage.clear();
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
    }
  };

  return (
    <nav
      className={`fixed w-full left-0 top-0 z-[999] md:px-24 ${
        sticky
          ? "p-2 bg-primary/70 text-white w-full fixed md:drop-shadow-md"
          : "p-2 bg-transparent text-primary w-full fixed"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="mx-7">
          <Link
            href="/"
            className="flex items-center justify-start uppercase font-bold"
          >
            <span className="text-2xl md:text-3xl w-60 hover:opacity-50">
              turu hotel
            </span>
          </Link>
        </div>
        <div className="container flex justify-between h-16 mx-auto md:justify-end md:space-x-8">
          <ul className="items-stretch hidden space-x-3 md:flex -mr-16">
            {/* {menuLinks?.map((menu, index) => ( */}
            <li className="flex z-10">
              <Link
                rel="noopener noreferrer"
                className="flex items-center px-4 mb-1 border-b-2 border-transparent hover:text-blue-300 uppercase"
                href="/admin/home"
              >
                Home
              </Link>
            </li>
            {role === "admin" ? (
              <li className="flex z-10">
                <Link
                  rel="noopener noreferrer"
                  className="flex items-center px-4 mb-1 border-b-2 border-transparent hover:text-blue-300 uppercase"
                  href="/admin/typeroom"
                >
                  Typeroom
                </Link>
              </li>
            ) : null}
            {role === "admin" ? (
              <li className="flex z-10">
                <Link
                  rel="noopener noreferrer"
                  className="flex items-center px-4 mb-1 border-b-2 border-transparent hover:text-blue-300 uppercase"
                  href="/admin/room"
                >
                  Room
                </Link>
              </li>
            ) : null}
            {role === "admin" ? (
              <li className="flex z-10">
                <Link
                  rel="noopener noreferrer"
                  className="flex items-center px-4 mb-1 border-b-2 border-transparent hover:text-blue-300 uppercase"
                  href="/admin/user"
                >
                  User
                </Link>
              </li>
            ) : null}
            {role === "resepsionis" ? (
              <li className="flex z-10">
                <Link
                  rel="noopener noreferrer"
                  className="flex items-center px-4 mb-1 border-b-2 border-transparent hover:text-blue-300 uppercase"
                  href="/admin/history"
                >
                  History
                </Link>
              </li>
            ) : null}
            {/* ))} */}
            <li className="py-2 z-0">
              <button onClick={() => setModal(!modal)}>
                {user && ( // Check if user is defined before using it
                  <div className="text-right ml-3 flex">
                    <span className="flex flex-col">
                      <h2 className="text-md font-semibold capitalize">
                        {user.nama_user}
                      </h2>
                      <p className="text-gray-500">{user.role}</p>
                    </span>
                    <img
                      src={`http://localhost:3000/foto/${user.foto}`}
                      alt=""
                      className="h-12 w-12 bg-gray-200 border-double border-4 border-primary/50 rounded-full ml-2"
                    />
                  </div>
                )}
              </button>
            </li>
          </ul>
        </div>
        {modal ? (
          <div
            class="z-50 my-4 text-base list-none absolute right-8 top-14 bg-white divide-y divide-gray-100 rounded shadow"
            id="dropdown"
          >
            <div class="px-4 pt-3 pb-1 gap-2" role="none">
              <p class="text-sm text-gray-900" role="none">
                {user.email}
              </p>
              <p class="text-sm text-gray-900" role="none">
                {user.nama_user}
              </p>
              <p class="text-sm text-gray-900" role="none">
                {user.role}
              </p>
            </div>
            <ul class="py-1" role="none">
              <li>
                <a
                  onClick={handleLogout}
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:hover:text-white"
                  role="menuitem"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        ) : null}
        <div className={` ${sticky ? "hidden" : "block"} `}>
          <div
            onClick={() => setOpen(!open)}
            className={`z-[999] ${
              open ? "text-black" : "text-black"
            } text-3xl md:hidden m-5`}
          >
            <Hamburger />
          </div>
        </div>
        <div className={` ${sticky ? "block" : "hidden"} `}>
          <div
            onClick={() => setOpen(!open)}
            className={`z-[999] ${
              open ? "text-black" : "text-black"
            } text-3xl md:hidden m-5`}
          >
            <Hamburger />
          </div>
        </div>
        <div
          className={`${
            sticky
              ? "md:hidden ml-0 text-black fixed w-full px-7 py-8 font-medium bg-white/70 top-0 duration-300"
              : "md:hidden ml-0 text-black fixed w-full px-7 py-8 font-medium bg-white/70 top-0 duration-300"
          } ${open ? "top-0" : "top-[-100%]"}`}
        >
          <ul className="flex flex-col justify-center h-full gap-10 py-2 text-lg">
            <li
              onClick={() => setOpen(false)}
              className="px-6 hover:text-gray-400"
            >
              <Link href="/admin/home">Home</Link>
            </li>
            {role === "admin" ? (
              <li
                onClick={() => setOpen(false)}
                className="px-6 hover:text-gray-400"
              >
                <Link href="/admin/typeroom">TypeRoom</Link>
              </li>
            ) : null}
            {role === "admin" ? (
              <li
                onClick={() => setOpen(false)}
                className="px-6 hover:text-gray-400"
              >
                <Link href="/admin/room">Room</Link>
              </li>
            ) : null}
            {role === "admin" ? (
              <li
                onClick={() => setOpen(false)}
                className="px-6 hover:text-gray-400"
              >
                <Link href="/admin/user">User</Link>
              </li>
            ) : null}
            {role === "resepsionis" ? (
              <li
                onClick={() => setOpen(false)}
                className="px-6 hover:text-gray-400"
              >
                <Link href="/admin/history">History</Link>
              </li>
            ) : null}
            <li className="my-px ml-4" onClick={() => logOut()}>
              <Link
                href="/"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-primary hover:bg-blue-100 hover:text-blue-800 mt-32"
              >
                <span className="flex items-center justify-center text-lg text-red-400">
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="ml-2">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
