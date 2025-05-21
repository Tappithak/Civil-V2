// nav.jsx
"use client";
import * as React from "react";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";
import { useData } from "../../contexts/DataContext";
import { useRouter } from "next/navigation";

export default function Navbar({ search, setsearch }) {
  const {
    data,
    loading,
    setLoading,
    dataImg,
    setDataImg,
    background,
    setBackground,
    fetchImgData,
  } = useData();
  const router = useRouter();
  const [user, setuser] = React.useState("");
  const [fullname, setfullname] = React.useState("");

  const logoutconfirm = async () => {
    try {
        await axios.post("/api/logout", {
          withCredentials: true, // ส่ง Cookies ไปด้วย
        });
        router.push("/auth/login");
      }catch (error) {
        console.log("Logout error:", error);
      }
  };

  React.useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get("/api/validate-token", {
          withCredentials: true,
        });
        if (response.data.valid) {
          setfullname(response.data.user);
          setuser(response.data.user.split("")[0]);
          fetchImgData(); // ใช้ฟังก์ชันจาก context
        }
      } catch (error) {
        // ถ้า Token ไม่ถูกต้อง ให้ลบ Token ออกจาก Cookies
        console.log(error);
        axios
          .post("/api/removedevice", {
            username: localStorage.getItem("nameuser"),
          })
          .then((res) => {
            if (res.status === 200) {
              router.push("/auth/login");
            }
          });
      }
    };

    validateToken();
  }, []);

  return (
    <div className="flex flex-row justify-between sticky bg-white text-slate-950 shadow-lg top-0 left-0 w-full z-50 p-2">
      <div className="flex flex-row items-center gap-2">
        <Image
          className="hover:cursor-pointer hover:scale-105 transition-all duration-300"
          src="/icon.png"
          alt="logo"
          width={60}
          height={60}
          onClick={() => router.push("/pages/home")}
        />
        <a className="sm:flex flex-col items-start hidden ">
          <span className="text-slate-950 font-bold">
            NPD Logistics Hub Application
            </span>
            <span className="text-sm text-slate-600 hidden sm:hidden md:hidden lg:block xl:block">
              แอปพลิเคชันระบบส่งกำลังบำรุงสายช่างโยธา เพื่อสนับสนุนภารกิจกองทัพเรือ และรองรับสถานการณ์วิกฤต
            </span>
        </a>
      </div>
      <div className="flex flex-row gap-2 items-center p-2">
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
            className="menu menu-sm dropdown-content font-bold text-red-600 rounded-md  z-[1] mt-3 w-52 p-2 shadow  bg-white"
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
