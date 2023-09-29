import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbars/admin/navbar";
import Footer from "@/components/Footers/footer";
import Link from "next/link";
import Modal from "@/components/Modal/modal";

export default function User() {
  const [user, setUser] = useState([]);
  const [originalUser, setOriginalUser] = useState([]);
  const [isClient, setIsClient] = useState("");
  const [id, setId] = useState("");
  const [nama_user, setNamaUser] = useState("");
  const [foto, setFoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [role_user, setRoleUser] = useState("");
  const [token, setToken] = useState("");
  const [action, setAction] = useState("");
  const [keyword, setKeyword] = useState("");
  const [modal, setModal] = useState(false);

  const checkRole = () => {
    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "resepsionis"
      ) {
        setToken(localStorage.getItem("token"));
        setRoleUser(localStorage.getItem("role"));
      } else {
        window.alert("You're not admin or resepsionis!");
        window.location = "/";
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

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleEdit = async (item) => {
    setModal(true);
    console.log(item)
    
    setId(item.id)
    setNamaUser(item.nama_user);
    setEmail(item.email);
    setFoto(item.foto);
    setRole(item.role)
  };

  const handleSave = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("nama_user", nama_user);
    form.append("foto", foto);
    form.append("email", email);
    form.append("role", role)

    let url = `http://localhost:3000/user/update/${id}`;
    axios
      .put(url, form, headerConfig())
      .then((response) => {
        if (response.status === 200) {
          alert("Success edit data");
          window.location.href = "/admin/user"
        }
      })
      .catch((error) => {
        console.log("error add data", error);
        if (error.status === 500) {
          alert("Failed to add data");
        }
      });
  };

  const handleDrop = (id) => {
    let url = `http://localhost:3000/user/${id}`;
    if (window.confirm("Are you sure to delete this user? ")) {
      axios
        .delete(url, headerConfig())
        .then((response) => {
          console.log(response.data.message);
          getTypeRoom();
        })
        .catch((error) => {
          if (error.response.status === 500) {
            window.alert("You can't delete this data");
          }
        });
    }
  };

  const handleFile = (e) => {
    setFoto(e.target.files[0]);
  };

  const getAllUser = () => {
    let url = "http://localhost:3000/user/getAll/";
    axios
      .get(url, headerConfig())
      .then((response) => {
        setUser(response.data.data);
        setOriginalUser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = async () => {
    try {
      await setUser(
        originalUser.filter((type) => {
          return type.nama_user.toLowerCase().includes(keyword.toLowerCase());
        })
      );
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "resepsionis"
      ) {
        setToken(localStorage.getItem("token"));
        setRole(localStorage.getItem("role"));
      } else {
        window.alert("You're not admin or resepsionis!");
        window.location = "/";
      }
    }
    getAllUser();
    checkRole();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-20 font-bold mt-28 text-primary flex flex-row">
        <h1 className="text-2xl md:text-3xl w-60">User List</h1>
        <div className="flex items-center ml-auto">
          <div className="flex rounded ">
            <input
              type="text"
              className="block px-4 py-2 bg-white border font-normal rounded-md focus:border-priamry/10 focus:ring-primary/20 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
              name="keyword"
              value={keyword}
              onKeyUp={handleSearch}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {role === "admin" && isClient ? (
              <Link
                className="ml-2 px-4 flex flex-row text-sec bg-primary rounded hover:bg-primary/30 hover:text-primary"
                href="/admin/user/add"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="mt-3 -ml-2"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>{" "}
                <p className="mt-2 ml-1 font-normal">Add</p>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-8 px-20 mb-52">
        <table className="w-full divide-y-2 divide-primary/20 bg-sec/20 text-sm">
          <thead className="ltr:text-left rtl:text-right bg-sec">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                No
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Photo
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                User Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Role
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {user.length === 0 && isClient ? (
              <p>No users available.</p>
            ) : (
              user.map((item, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex-shrink-0 h-10 w-10 mx-auto">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={"http://localhost:3000/foto/" + item.foto}
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.nama_user}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.role}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 flex flex-row gap-2 justify-center">
                    <button onClick={() => handleEdit(item)} className="inline-block rounded bg-primary px-4 py-2 text-xs font-medium text-white hover:bg-sec hover:text-primary">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDrop(item.id)}
                      className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-300 hover:text-primary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Footer />

      <Modal isVisible={modal} close={() => setModal(false)}>
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-black">
            Edit User Details
          </h3>
          <form
            className="space-y-6"
            onSubmit={handleSave}
          >
            <div>
              <label
                for="nama_user"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
              >
                Username
              </label>
              <input
                type="text"
                name="nama_user"
                id="nama_user"
                value={nama_user}
                onChange={(e) => setNamaUser(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <label
                for="nama_user"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
              >
                Photo User
              </label>
              <input
                type="file"
                name="foto"
                id="foto"
                onChange={handleFile}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                required={action === "update" ? false : true}
              />
            </div>
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label
                for="foto"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
              >
                Role
              </label>
              <select
                name="role"
                id="role"
                value={role}
                className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 block w-full px-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="resepsionis">Resepsionis</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Simpan
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
