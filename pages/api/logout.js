import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const token = req.cookies.token; // ดึง token จาก cookies

  if (!token) {
    return res.status(401).json({ valid: false, message: "Token is missing" }); // ถ้าไม่มี token ส่ง error
  }

  try {
    // ตรวจสอบ token โดยใช้ secret key ที่ใช้ในการเข้ารหัส
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET); // ใช้คีย์ลับในการตรวจสอบ token (ควรเก็บใน environment variable)
    const allowedOrigins = [
      "https://equipmentapps.netlify.app",
      "http://localhost:3000",
    ];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    // หาก token ถูกต้อง, ลบ token จากคุกกี้
    res.setHeader(
      "Set-Cookie",
      "token=; Max-Age=0; Path=/;  Secure; HttpOnly; SameSite=Strict"
    );

    // ส่งข้อมูลของ user กลับไป
    res.status(200).json({ valid: true, user: decoded.username });
  } catch (error) {
    console.error(error);
    res.status(401).json({ valid: false, message: "Invalid or expired token" });
  }
}
