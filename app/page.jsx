'use client'
import Image from "next/image";
import axios from "axios";
import * as React from "react";

export default function Home() {

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
         window.location.href = '/auth/login';
         console.log(error);
      }
    }
    validateToken();


  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
    </div>
  );
}
