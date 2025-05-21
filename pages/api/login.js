import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // ตรวจสอบ body ที่รับเข้ามา
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is required" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Username and password are required" 
    });
  }

  try {
    // เรียกใช้ API ภายนอกเพื่อตรวจสอบผู้ใช้
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVERHOST}&action=login`,
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // ตรวจสอบรูปแบบข้อมูลที่ได้รับ
    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    const datauser = response.data[0];

    // ตรวจสอบรหัสผ่าน (หมายเหตุ: ถ้า API ภายนอกทำการตรวจสอบรหัสผ่านแล้ว อาจไม่จำเป็นต้องทำซ้ำ)
    // กรณีที่ API ภายนอกส่งแค่ข้อมูลผู้ใช้กลับมา และเราต้องตรวจสอบรหัสผ่านเอง:
    if (datauser.password) {
      const isPasswordValid = await bcrypt.compare(password, datauser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid password" 
        });
      }
    }

    // สร้าง Token
    const tokenExpiration = datauser.nameuser === "Administrator" ? "24h" : "1h";
    const token = jwt.sign(
      {
        userId: datauser._id,
        username: datauser.nameuser,
        role: datauser.role || "user" // เพิ่ม role หากมี
      },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: tokenExpiration }
    );

    // ตั้งค่า cookie อย่างปลอดภัย
    // ปรับ cookie settings ตามสภาพแวดล้อมการทำงาน (development/production)
    const isProduction = process.env.NODE_ENV === 'production';
    const maxAge = datauser.nameuser === "Administrator" ? 24 * 60 * 60 : 60 * 60; // 24 ชั่วโมงหรือ 1 ชั่วโมงเป็นวินาที
    
    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; ${isProduction ? 'Secure; SameSite=None' : 'SameSite=Lax'}`
    );

    // ส่ง Response
    res.status(200).json({
      success: true,
      datauser: {
        id: datauser._id,
        username: datauser.nameuser,
        // เพิ่มข้อมูลอื่นๆ ที่ต้องการส่งกลับ (ยกเว้นข้อมูลที่อ่อนไหว เช่น password)
      },
      // สามารถเพิ่ม token ในการตอบกลับเพื่อใช้แบบ Bearer Token ได้
      token: token
    });
    
  } catch (error) {
    console.error("Login error:", error.message);
    
    // ข้อความที่เป็นประโยชน์มากขึ้นสำหรับปัญหาต่างๆ
    if (error.response) {
      return res.status(error.response.status || 500).json({ 
        success: false, 
        message: `External API error: ${error.response.data?.message || error.message}` 
      });
    }
    
    if (error.request) {
      return res.status(503).json({ 
        success: false, 
        message: "Unable to connect to authentication service" 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error during authentication" 
    });
  }
}