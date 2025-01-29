import * as React from "react";
import Login from "../../../components/auth/LoginForm";
import Box from "@mui/material/Box";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';



const LoginPage = () => {
  return (
    <Box className="flex justify-center items-center min-h-screen p-2 background-login">
      <Box className="w-[450px] h-[530px] border border-gray-200 m-auto p-10 rounded-[21px] color_bg shadow-xl z-10">
        <div className="w-full flex justify-center translate-y-[-100px]">
        <div className="circle_login w-[120px] h-[120px] rounded-[100%] bg-[#a20c0c96] flex justify-center items-center"><PermIdentityIcon className="text-[#ff9b25] text-[90px]"/></div>
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
