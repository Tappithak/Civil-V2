// list.jsx
"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/layout/Nav";
import Footer from "../../../components/layout/Footer";
import Table from "@mui/joy/Table";
import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import { Box, Typography } from "@mui/material";
import { useData } from "../../../contexts/DataContext";

export default function TableList() {
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const { data, loading, fetchData, background, setBackground } = useData();

  function moveTodetails(val) {
    localStorage.setItem("typeSel", val);
    router.push("/pages/detail");
  }

  React.useEffect(() => {
    if (data.length === 0) {
      fetchData();
    }
  }, [data, fetchData]);

  return (
    <>
      {loading ? (
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

      <Box className="pt-[66px] px-1 md:px-2 xl:px-3">
        <Sheet
          sx={{ overflow: "auto" }}
          className="bg-[#ffffff00] min-h-[calc(100vh-130px)] max-h-[calc(100vh-130px)] rounded-lg shadow-lg"
        >
          <Table stickyHeader>
            <thead>
              <tr className="text-[16px] text-center">
                <th className="w-[130px] sm:w-[180px] md:w-[220px] xl:w-[350px]">
                  รายการ
                </th>
                {/* <th>สถานะ</th> */}
                <th>ดูรายละเอียด</th>
                <th>หน่วย</th>
              </tr>
            </thead>
            <tbody key={data}>
              {data
                .filter((val) => {
                  if (search == "") {
                    return val.list.includes(localStorage.getItem("listSel"));
                  } else if (
                    val.list.includes(localStorage.getItem("listSel")) &&
                    (val.list.toLowerCase().includes(search.toLowerCase()) ||
                      val.status.toLowerCase().includes(search.toLowerCase()) ||
                      val.depart.toLowerCase().includes(search.toLowerCase()))
                  ) {
                    return val;
                  }
                })
                .map((row, index) => (
                  <tr key={index}>
                    <td>{row.list}</td>
                    {/* <td>
                      {row.status == "ใช้งานได้" ? (
                        <Typography
                          sx={{ color: "#00a000", fontWeight: "bold" }}
                        >
                          {row.status}
                        </Typography>
                      ) : (
                        <Typography
                          sx={{ color: "#a20c0c", fontWeight: "bold" }}
                        >
                          {row.status}
                        </Typography>
                      )}
                    </td> */}
                    <td>
                      <Button
                        variant="outlined"
                        color="danger"
                        size="sm"
                        onClick={() => moveTodetails(row.depart + row.list)}
                        // sx={{
                        //   // backgroundColor: "#a20c0c",
                        //   color: "white",
                        //   ":hover": { backgroundColor: "#a20c0c" },
                        // }}
                      >
                        ดูรายละเอียด
                      </Button>
                    </td>
                    <td>{row.depart}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Sheet>
      </Box>

      <div
        className="bg-page"
        style={{
          backgroundImage: `url(${background})`
        }}
      ></div>

      {/* =============== Footer  =============== */}

      <Footer page={"item"} />
    </>
  );
}
