"use client";
import * as React from "react";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";

export default function navbar({
  search,
  setsearch,
  setload,
  setData,
  setbackground,
}) {
  const [user, setuser] = React.useState("");
  const [fullname, setfullname] = React.useState("");
  const logoutconfirm = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      try {
        await axios.post("/api/logout", {
          withCredentials: true, // ส่ง Cookies ไปด้วย
        });

        axios.post("/api/removedevice", {username:fullname}).then((res) => {
          if (res.status === 200) {
            window.location.href = "/auth/login";
            Swal.fire({
              title: "Logout success!",
              icon: "success",
            });
          }
        });
      } catch (err) {
        window.location.href = "/auth/login";
      }
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setload(true);
        const res = await axios.get(`/api/read?action=gethubImg`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        setData(res.data);

        let resualt = "";
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].name == localStorage.getItem("listSel")) {
            resualt = res.data[i].img;
          }
        }
        setbackground(resualt);
      } catch (error) {
        setload(false);
        console.log(error);
      } finally {
        setload(false);
      }
    };

    const validateToken = async () => {
      try {
        const response = await axios.get("/api/validate-token", {
          withCredentials: true,
        });
        if (response.data.valid) {
          // ถ้า Token ถูกต้อง อัพเดท User
          setfullname(response.data.user);
          setuser(response.data.user.split("")[0]);
          fetchData();
        }else{
          axios.post("/api/removedevice", {username:fullname}).then((res) => {
            if (res.status === 200) {
              window.location.href = "/auth/login";
            }
          });
        }
      } catch (error) {
        // ถ้า Token ไม่ถูกต้อง ให้ลบ Token ออกจาก Cookies
        window.location.href = "/auth/login";
        console.log(error);
      }
    };
    validateToken();
  }, []);

  return (
    <div className="navbar bg-white text-slate-950 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="flex-1">
        <Image
          className="btn btn-ghost text-xl"
          src="/icon.png"
          alt="logo"
          width={80}
          height={70}
        />
        <a className="ml-3 text-2xl hidden sm:flex">ยุทโธปกรณ์สายช่างโยธา</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="ค้นหาเมนู"
            className="input input-bordered text-slate-950 bg-white w-full sm:w-24 md:w-auto"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <span className="text-3xl">{user}</span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow text-slate-950 bg-white"
          >
            {/* <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li> */}
            <li onClick={() => logoutconfirm()}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
