'use client';
import * as React from "react";
import Login from "../../../components/auth/LoginForm";
import Box from "@mui/material/Box";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Image from "next/image";
import axios from "axios";



const LoginPage = () => {

  React.useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get('/api/validate-token', {
          withCredentials: true 
        })
        if (response.data.valid) {
          // ถ้า Token ถูกต้อง อัพเดท User
          window.location.href = '/pages/home';
        }
      } catch (error) {
        // ถ้า Token ไม่ถูกต้อง ให้ลบ Token ออกจาก Cookies
        //  window.location.href = '/auth/login';
         console.log(error);
      }
    }
    validateToken();


  }, [])


  return (
    <Box className="flex justify-center items-center min-h-screen p-2 background-login">
      <Box className="w-[450px] h-[530px] border border-gray-200 m-auto p-10 rounded-[21px] color_bg shadow-xl z-10">
        <div className="w-full flex justify-center translate-y-[-100px]">
        <div className="circle_login w-[120px] h-[120px] rounded-[100%] bg-[#fff] flex justify-center items-center">
          {/* <PermIdentityIcon className="text-[#ff9b25] text-[90px]"/> */}
          <Image 
          src={"/icon.png"}
          alt="logo"
          width={120}
          height={120}
          />

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
  );
};

export default LoginPage;
