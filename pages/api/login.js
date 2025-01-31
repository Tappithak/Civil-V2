import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";

export default async function handler(req, res) {
  const { username, password } = req.body;

  if (req.method === "POST") {
    // ตรวจสอบ body ที่รับเข้ามา
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is required" });
    }
    
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVERHOST}&action=login`,
            req.body,
            {
              headers: {
                'Content-Type': 'application/json', // ระบุ Content-Type
              },
            }
          );
    
          // res.status(200).json(user.data); // ส่งคำตอบกลับไปยัง client
        // ตรวจสอบว่ามี User นี้ในระบบหรือไม่
        
        const datauser = response.data[0];
      if (!datauser) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      // ตรวจสอบรหัสผ่าน
      const isPasswordValid = await bcrypt.compare(password, datauser.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid password" });
      }
      
      // สร้าง Token
      const token = jwt.sign(
        {
           userId: datauser._id,
           username: datauser.nameuser,
           },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        { expiresIn:  datauser.nameuser == "Administrator" ? "24h" : "1h" }
      );

      // // ตั้ง Cookie
      res.setHeader(
        "Set-Cookie",
        `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=None`
      );

      // ส่ง Response
      res.status(200).json({
        success: true,
        datauser: {
          id: datauser._id,
          username: datauser.nameuser
        },
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    // กรณีที่ HTTP method ไม่ใช่ POST
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
