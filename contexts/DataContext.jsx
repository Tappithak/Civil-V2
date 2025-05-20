// DataContext.jsx
"use client";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [dataImg, setDataImg] = useState([]);
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isImgFetched, setIsImgFetched] = useState(false);

  const fetchData = async () => {
    if (isDataFetched) return; // ป้องกันการโหลดซ้ำถ้าเคยโหลดแล้ว

    try {
      setLoading(true);
      const res = await axios.get("/api/read", {
        params: { action: "gethubData" },
      });
      setData(res.data);
      setIsDataFetched(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImgData = async () => {
    if (isImgFetched && dataImg.length > 0) {
      // ถ้าเคยโหลดข้อมูลแล้ว ให้อัปเดต background จากข้อมูลที่มีอยู่
      updateBackgroundFromLocalStorage();
      return;
    }
    
    try {
      setLoading(true);
      const res = await axios.get('/api/read', {
        params: { action: "gethubImg" }
      });
      setDataImg(res.data);
      setIsImgFetched(true);
      
      // อัปเดต background หลังจากได้ข้อมูล
      if (typeof window !== 'undefined' && res.data.length > 0) {
        updateBackgroundFromLocalStorage(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const updateBackgroundFromLocalStorage = (imgData = null) => {
    if (typeof window === 'undefined') return;
    
    const listSel = localStorage.getItem("listSel");
    if (!listSel) return;
    
    const data = imgData || dataImg;
    if (!data || data.length === 0) return;
    
    const selectedItem = data.find(item => item.name === listSel);
    if (selectedItem) {
      setBackground(selectedItem.img);
    }
  };

  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   fetchData();
    //   fetchImgData();
    // }

    fetchData();
    fetchImgData();
  }, []);

  return (
    <DataContext.Provider value={{ 
      data, 
      setData, 
      dataImg, 
      setDataImg, 
      background, 
      setBackground, 
      loading, 
      setLoading,
      fetchData,
      fetchImgData,
      updateBackgroundFromLocalStorage, // เพิ่มฟังก์ชันนี้ใน Provider
      isDataFetched,
      isImgFetched
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
