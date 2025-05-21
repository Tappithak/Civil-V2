// detail.jsx
"use client";
import * as React from "react";
import Navbar from "../../../components/layout/Nav";
import Footer from "../../../components/layout/Footer";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import { Box } from "@mui/material";
import { useData } from "../../../contexts/DataContext";

export default function detail() {
 const [search, setSearch] = React.useState("");
  const { 
    data, 
    loading, 
    fetchData, 
    dataImg, 
    fetchImgData, 
    background, 
    setBackground 
  } = useData();

   const updateBackgroundFromLocalStorage = () => {
    if (typeof window === 'undefined' || !dataImg || dataImg.length === 0) return;
    
    const listSel = localStorage.getItem("listSel");
    if (!listSel) return;
    
    const selectedItem = dataImg.find(item => item.name === listSel);
    if (selectedItem) {
      console.log("Setting background to:", selectedItem.img);
      setBackground(selectedItem.img);
    }
  };

  function countLocation(dataArray) {
     if (!dataArray || dataArray.length === 0) return;

    var cb = [];
    var sm = [];
    var sk = [];
    var png = [];
    var nt = [];
    var tt = [];
    var bm = [];
    var nm = [];

    // ตรวจสอบว่ามี localStorage หรือไม่ (client-side)
    const typeSel = typeof window !== 'undefined' ? localStorage.getItem("typeSel") : null;
    if (!typeSel) return;

    for (var i = 0; i < dataArray.length; i++) {
      if (
        dataArray[i].location == "ชลบุรี" &&
        dataArray[i].group == localStorage.getItem("typeSel")
      ) {
        cb.push(dataArray[i].location);
      } else if (
        dataArray[i].location == "สมุทรปราการ" &&
        dataArray[i].group == localStorage.getItem("typeSel")
      ) {
        sm.push(dataArray[i].location);
      } else if (
        dataArray[i].location == "สงขลา" &&
        dataArray[i].group == localStorage.getItem("typeSel")
      ) {
        sk.push(dataArray[i].location);
      } else if (
        dataArray[i].location == "พังงา" &&
        dataArray[i].group == localStorage.getItem("typeSel")
      ) {
        png.push(dataArray[i].location);
      } else if (
        dataArray[i].location == "นครปฐม" &&
        dataArray[i].group == localStorage.getItem("typeSel")
      ) {
        nt.push(dataArray[i].location);
      } else if (
        dataArray[i].location == "ตราด" &&
        dataArray[i].group == localStorage.getItem("typeSel")
      ) {
        tt.push(dataArray[i].location);
      } else if (
        dataArray[i].location == "กรุงเทพ" &&
        dataArray[i].group == localStorage.getItem("typeSel")
      ) {
        bm.push(dataArray[i].location);
      } else if (
        dataArray[i].location == "นครพนม" &&
        dataArray[i].group == localStorage.getItem("typeSel")
      ) {
        nm.push(dataArray[i].location);
      }
    }
    // console.log(chonburi)
    // setchonburi(chonburi.length)

    (async () => {
      const topology = await fetch(
        "https://code.highcharts.com/mapdata/countries/th/th-all.topo.json"
      ).then((response) => response.json());

      // Prepare demo data. The data is joined to map using value of 'hc-key'
      // property by default. See API docs for 'joinBy' for more info on linking
      // data and map.
      const dataLocation = [
        ["th-ct", 0],
        ["th-4255", 0],
        ["th-pg", png.length],
        ["th-st", 0],
        ["th-kr", 0],
        ["th-sa", 0],
        ["th-tg", 0],
        ["th-tt", tt.length],
        ["th-pl", 0],
        ["th-ps", 0],
        ["th-kp", 0],
        ["th-pc", 0],
        ["th-sh", 0],
        ["th-at", 0],
        ["th-lb", 0],
        ["th-pa", 0],
        ["th-np", nt.length],
        ["th-sb", 0],
        ["th-cn", 0],
        ["th-bm", bm.length],
        ["th-pt", 0],
        ["th-no", 0],
        ["th-sp", sm.length],
        ["th-ss", 0],
        ["th-sm", 0],
        ["th-pe", 0],
        ["th-cc", 0],
        ["th-nn", 0],
        ["th-cb", cb.length],
        ["th-br", 0],
        ["th-kk", 0],
        ["th-ph", 0],
        ["th-kl", 0],
        ["th-sr", 0],
        ["th-nr", 0],
        ["th-si", 0],
        ["th-re", 0],
        ["th-le", 0],
        ["th-nk", 0],
        ["th-ac", 0],
        ["th-md", 0],
        ["th-sn", 0],
        ["th-nw", 0],
        ["th-pi", 0],
        ["th-rn", 0],
        ["th-nt", 0],
        ["th-sg", sk.length],
        ["th-pr", 0],
        ["th-py", 0],
        ["th-so", 0],
        ["th-ud", 0],
        ["th-kn", 0],
        ["th-tk", 0],
        ["th-ut", 0],
        ["th-ns", 0],
        ["th-pk", 0],
        ["th-ur", 0],
        ["th-sk", 0],
        ["th-ry", 0],
        ["th-cy", 0],
        ["th-su", 0],
        ["th-nf", nm.length],
        ["th-bk", 0],
        ["th-mh", 0],
        ["th-pu", 0],
        ["th-cp", 0],
        ["th-yl", 0],
        ["th-cr", 0],
        ["th-cm", 0],
        ["th-ln", 0],
        ["th-na", 0],
        ["th-lg", 0],
        ["th-pb", 0],
        ["th-rt", 0],
        ["th-ys", 0],
        ["th-ms", 0],
        ["th-un", 0],
        ["th-nb", 0],
      ];

      // Create the chart
      Highcharts.mapChart("container", {
        chart: {
          map: topology,
        },

        title: {
          text: "Highcharts Maps basic demo",
        },

        subtitle: {
          text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/th/th-all.topo.json">Thailand</a>',
        },

        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: "bottom",
          },
        },

        colorAxis: {
          min: 0,
          max: 1,
        },
        tooltip: {
          valueDecimals: 0,
          valueSuffix: " คัน",
        },

        series: [
          {
            data: dataLocation,
            name: "จำนวนรถ",
            states: {
              hover: {
                color: "#BADA55",
              },
            },
            dataLabels: {
              enabled: true,
              format: "{point.value:.0f}",
            },
          },
        ],
      });
    })();
  }

  function findBg() {
    let resualt = "";
    for (var i = 0; i < dataImg.length; i++) {
      if (dataImg[i].name == localStorage.getItem("listSel")) {
        resualt = dataImg[i].img;
      }
    }
    setbackground(resualt);
  }
  

  React.useEffect(() => {
    // ตรวจสอบว่าจำเป็นต้องโหลดข้อมูลหรือไม่
    if (data.length === 0) {
      fetchData();
    } else {
      countLocation(data);
    }
    
    // ตรวจสอบว่าจำเป็นต้องโหลดข้อมูลรูปภาพหรือไม่
    if (dataImg.length === 0) {
      fetchImgData();
    } else {
      updateBackgroundFromLocalStorage();
    }
    
    // แสดง log เพื่อ debug
    console.log("Current data length:", data.length);
    console.log("Current dataImg length:", dataImg.length);
    console.log("Current background:", background);
    console.log("Current localStorage listSel:", typeof window !== 'undefined' ? localStorage.getItem("listSel") : null);
    
  }, [data, dataImg, background]);

  return (
    <>
      {loading  ? (
        <div className="loader">
          <div className="book-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 126 75"
              className="book"
            >
              <rect
                strokeWidth="5"
                stroke="#e05452"
                rx="7.5"
                height="70"
                width="121"
                y="2.5"
                x="2.5"
              ></rect>
              <line
                strokeWidth="5"
                stroke="#e05452"
                y2="75"
                x2="63.5"
                x1="63.5"
              ></line>
              <path
                strokeLinecap="round"
                strokeWidth="4"
                stroke="#c18949"
                d="M25 20H50"
              ></path>
              <path
                strokeLinecap="round"
                strokeWidth="4"
                stroke="#c18949"
                d="M101 20H76"
              ></path>
              <path
                strokeLinecap="round"
                strokeWidth="4"
                stroke="#c18949"
                d="M16 30L50 30"
              ></path>
              <path
                strokeLinecap="round"
                strokeWidth="4"
                stroke="#c18949"
                d="M110 30L76 30"
              ></path>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff74"
              viewBox="0 0 65 75"
              className="book-page"
            >
              <path
                strokeLinecap="round"
                strokeWidth="4"
                stroke="#c18949"
                d="M40 20H15"
              ></path>
              <path
                strokeLinecap="round"
                strokeWidth="4"
                stroke="#c18949"
                d="M49 30L15 30"
              ></path>
              <path
                strokeWidth="5"
                stroke="#e05452"
                d="M2.5 2.5H55C59.1421 2.5 62.5 5.85786 62.5 10V65C62.5 69.1421 59.1421 72.5 55 72.5H2.5V2.5Z"
              ></path>
            </svg>
          </div>
        </div>
      ) : (
        <div></div>
      )}

       <Navbar search={search} setsearch={setSearch} />

      <div className="grid grid-cols-1 xl:grid-cols-3 overflow-auto justify-items-center gap-3 pb-[80px] xl:h-[100dvh]">
        <Box className="pt-[0px] order-2 px-1 md:px-2 xl:px-3">
          <Sheet
            sx={{ overflow: "auto" }}
            className="bg-[#ffffff00] h-[500px] md:h-[650px] xl:h-[750px]"
          >
            <Table stickyHeader>
              <thead>
                <tr className="text-[16px] text-center">
                  <th className="w-[130px] sm:w-[180px] md:w-[80px] xl:w-[180px]">
                  ทะเบียน
                  </th>
                  <th>ตราอักษร</th>
                  <th>สถานที่</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody key={data}>
                {data
                  .filter((val) => {
                    if (search == "") {
                      return val.group.includes(localStorage.getItem("typeSel"));
                    } else if (
                      val.group.includes(localStorage.getItem("typeSel")) &&(
                      val.number.toLowerCase().includes(search.toLowerCase()) ||
                      val.tra.toLowerCase().includes(search.toLowerCase()))
                    ) {
                      return val;
                    }
                  })
                  .map((row, index) => (
                    <tr key={index}>
                      <td>{row.number}</td>
                      <td>{row.tra}</td>
                      <td>{row.location}</td>
                      <td>
                        {row.status == "ใช้งานได้" ? (
                          <span className="text-green-500">{row.status}</span>
                        ) : (
                          <span className="text-red-500">{row.status}</span>
                        )}
                      </td>
                     
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Sheet>
        </Box>

        <div className="order-1" id="container" style={{ height: 700 ,borderRadius:"15px"}}></div>
      </div>

      <div
        className="bg-page md:z-[-1] order-3 bottom-[-445px] right-[14px] sm:bottom-[80px] sm:right-0"
        style={{
          backgroundImage: `url(${background})`
        }}
      ></div>

      {/* =============== Footer  =============== */}

      <Footer page={"item"} />
    </>
  );
}
