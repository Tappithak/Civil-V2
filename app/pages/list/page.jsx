"use client";
import axios from "axios";
import * as React from "react";
import Navbar from "../../../components/layout/Nav";
import Footer from "../../../components/layout/Footer";
import Table from "@mui/joy/Table";
import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import { Box } from "@mui/material";

export default function TableList() {
  const config = "action=gethubData&username=adminDB&password=Ad1234n";
  const [data, setData] = React.useState([]);
  const [search, setsearch] = React.useState("");
  const [memust, setmemust] = React.useState("");
  const [load, setload] = React.useState(false);
  const [background, setbackground] = React.useState("");
  const [dataImg, setDataImg] = React.useState([]);
  const [nonsLoad, setnonsLoad] = React.useState(false);

  function moveTodetails(val) {
    localStorage.setItem("typeSel", val);
    window.location.href = "/pages/detail";
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setload(true);
        const res = await axios.get(
          "https://script.google.com/macros/s/AKfycbyEb5N44PQzmHgurDXn2_-EWSAKyOuwYcy9-SElYBloJeJR9LzOHskbRUbvGHUInqPE/exec?" +
            config
        );
        setData(res.data);
      } catch (error) {
        setload(false);
        console.log(error);
      } finally {
        setload(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {load ? (
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
      <Navbar
        search={search}
        setsearch={setsearch}
        setload={setnonsLoad}
        setData={setDataImg}
        setbackground={setbackground}
      />
      <Box className="pt-[66px] px-1 md:px-2 xl:px-3">
        <Sheet
          sx={{overflow: "auto" }}
          className="bg-[#ffffff00] h-[500px] md:h-[650px] xl:h-[750px]"
        >
          <Table stickyHeader>
            <thead>
              <tr className="text-[16px] text-center">
                <th className="w-[130px] sm:w-[180px] md:w-[220px] xl:w-[350px]">รายการ</th>
                <th>สถานะ</th>
                <th>หน่วย</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody key={data}>
              {
              data.filter((val) => {
                if (search == "") {
                  return val.list.includes(localStorage.getItem("listSel"));
                } else if (
                  val.list.includes(localStorage.getItem("listSel")) &&(
                  val.list.toLowerCase().includes(search.toLowerCase()) ||
                  val.status.toLowerCase().includes(search.toLowerCase()) ||
                  val.depart.toLowerCase().includes(search.toLowerCase()))
                ) {
                  return val;
                }
              }).map((row, index) => (
                <tr key={index}>
                  <td>{row.list}</td>
                  <td>{row.status}</td>
                  <td>{row.depart}</td>
                  <td>
                    <Button
                      onClick={() => moveTodetails(row.depart + row.list)}
                      sx={{backgroundColor: "#a20c0c", color: "white",":hover": {backgroundColor: "#a20c0c"}}}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </Box>

      <div
        className="bg-page"
        style={{
          backgroundImage: "url(" + background + ")",
        }}
      ></div>

      {/* =============== Footer  =============== */}

      <Footer page={"item"} />
    </>
  );
}
