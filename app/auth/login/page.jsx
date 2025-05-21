// login page
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import axios from "axios";
import { 
  InputAdornment, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel,
  CircularProgress 
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get("/api/validate-token", {
          withCredentials: true,
        });
        if(response.status === 401) {
          router.push("/auth/login");
          return;
        } 

        if (response.data.valid) {
          // ถ้า Token ถูกต้อง อัพเดท User
          router.push("/pages/home");
        }
      } catch (error) {
        // ถ้า Token ไม่ถูกต้อง ให้ลบ Token ออกจาก Cookies
        //  window.location.href = '/auth/login';
          router.push("/auth/login");
        // console.log(error);
      }
    };
    validateToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // เซ็ต loading state เป็น true เมื่อเริ่มกระบวนการ login
    setIsLoading(true);
    
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      }, {
        withCredentials: true,
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          text: response.data.message,
          customClass: {
            confirmButton: "bg-green-500 text-white",
          },
          buttonsStyling: false,
          showConfirmButton: false,
          showCloseButton: true,
          showCancelButton: false,
          focusCancel: false,
          focusConfirm: false,
          allowOutsideClick: true,
          backdrop: "rgba(0, 0, 0, 0.5)",
          position: "center",
          timer: 2000,
        });

        router.push("/pages/home");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ โปดดให้ตรวจสอบ รหัสผ่านและชื่อผู้ใช้",
        // text: error.response?.data?.message || "An error occurred during login.",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "bg-red-500 text-white",
        },
        buttonsStyling: false,
        showCloseButton: true,
        showCancelButton: false,
        focusCancel: false,
        focusConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        backdrop: "rgba(0, 0, 0, 0.5)",
        position: "center",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.hideLoading();
        },
      });
    } finally {
      // เซ็ต loading state เป็น false เมื่อสิ้นสุดกระบวนการ ไม่ว่าจะสำเร็จหรือไม่
      setIsLoading(false);
    }
  };

  return (
    <Box className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Box className="w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel - Background and Welcome Text */}
        <Box className="md:w-1/2 bg-gradient-to-br from-rose-700 to-rose-500 p-8 flex flex-col justify-center items-center text-white">
          <Box className="w-full text-center mb-8">
            <Image 
              src="/icon.png" 
              alt="logo" 
              width={100} 
              height={100} 
              className="mx-auto mb-4"
            />
            <Box className="text-sm uppercase tracking-wider mb-2">NPD Logistics Hub</Box>
          </Box>
          
          <Box className="text-center">
            <h2 className="text-2xl font-bold mb-2">Nice to see you again</h2>
            <h1 className="text-3xl font-bold mb-6">WELCOME BACK</h1>
            <p className="text-sm opacity-80 max-w-md mx-auto">
              แอปพลิเคชันระบบส่งกำลังบำรุงสายช่างโยธา เพื่อสนับสนุนภารกิจกองทัพเรือ และรองรับสถานการณ์วิกฤต
            </p>
          </Box>
        </Box>

        {/* Right Panel - Login Form */}
        <Box className="md:w-1/2 py-12 px-8 md:px-12">
          <Box className="text-center md:text-left mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Login Account</h3>
            <p className="text-sm text-gray-500 mt-2">
              กรุณาลงชื่อเข้าสู่ระบบเพื่อใช้งานระบบส่งกำลังบำรุงสายช่างโยธา
            </p>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box className="space-y-6">
              <TextField
                fullWidth
                placeholder="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                  }
                }}
              />

              <TextField
                fullWidth
                type="password"
                placeholder="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                  }
                }}
              />

              <Box className="flex items-center justify-between">
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      size="small"
                      sx={{
                        color: "#D32F2F",
                        '&.Mui-checked': {
                          color: "#D32F2F",
                        },
                      }}
                    />
                  }
                  label={<span className="text-sm text-gray-600">Keep me signed in</span>}
                /> */}
                {/* <Box>
                  <a href="#" className="text-sm text-rose-600 hover:underline">
                    Already a member?
                  </a>
                </Box> */}
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  backgroundColor: isLoading ? "#f5f5f5" : "#D32F2F",
                  borderRadius: "24px",
                  padding: "12px 0",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: isLoading ? "#f5f5f5" : "#B71C1C",
                  },
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={24} sx={{ color: "#D32F2F", mr: 1 }} />
                    กำลังเข้าสู่ระบบ...
                  </Box>
                ) : (
                  "Sign In"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;