"use client";
import * as React from "react";
import Login from "../../../components/auth/LoginForm";
import Box from "@mui/material/Box";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Image from "next/image";
import axios from "axios";

const LoginPage = () => {
  React.useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get("/api/validate-token", {
          withCredentials: true,
        });
        if (response.data.valid) {
          // ถ้า Token ถูกต้อง อัพเดท User
          window.location.href = "/pages/home";
        }
      } catch (error) {
        // ถ้า Token ไม่ถูกต้อง ให้ลบ Token ออกจาก Cookies
        //  window.location.href = '/auth/login';
        console.log(error);
      }
    };
    validateToken();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center p-2 sticky top-0 left-0 w-full z-50 bg-white">
        <a className="sm:flex flex-col items-center">
          <h1 className="text-rose-800 font-bold text-[22px]">
            NPD Logistics Hub Application
          </h1>
          <span className="text-md text-slate-600 hidden sm:hidden md:hidden lg:block xl:block">
            แอปพลิเคชันระบบส่งกำลังบำรุงสายช่างโยธา
            เพื่อสนับสนุนภารกิจกองทัพเรือ และรองรับสถานการณ์วิกฤต
          </span>
        </a>
      </div>
      <Box className="background-login w-full min-h-[calc(100vh-10px)]  md:min-h-[calc(100vh-80px)] flex justify-center items-center">
        <Box className="w-[450px] h-[530px] border border-gray-200 m-auto p-10 rounded-[21px] color_bg shadow-xl z-10">
          <div className="w-full flex justify-center translate-y-[-100px]">
            <div className="circle_login w-[120px] h-[120px] rounded-[100%] bg-[#fff] flex justify-center items-center">
              {/* <PermIdentityIcon className="text-[#ff9b25] text-[90px]"/> */}
              <Image src={"/icon.png"} alt="logo" width={120} height={120} />
            </div>
          </div>
          <Box className="mt-[-70px]">
            <label className="text-[50px] text-[#ff9b25] !h-[90px] flex justify-center items-center">
              Sign in
            </label>
            <Login />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
