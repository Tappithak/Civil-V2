'use client';
// import Logoleft from "../image/logo-l.jfif";
import * as React from "react";
import axios from "axios";
import Navbar from "../../../components/layout/Nav";
import Footer from "../../../components/layout/Footer";

export default function nav() {
  const [search, setsearch] = React.useState("");
  const [load, setload] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [background, setbackground] = React.useState("");

  function moveByname(type) {
    localStorage.setItem("listSel", type);
    window.location.href = "/pages/list";
  }

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

      <Navbar search={search} setsearch={setsearch} setload={setload} setData={setData} setbackground={setbackground}/>
      <div className="pt-[95px] pb-[80px]" style={{ zoom: "90%" }}>
        <div className="grid grid-cols-2 gap-2 p-2 md:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {data
            .filter((item) => item.name.includes(search) && item.id != "")
            .sort((a, b) => b.num - a.num)
            .map((item) => {
              return (
                <div
                  className="card card-compact w-full text-slate-950 bg-white shadow-xl p-2 clshover"
                  key={item.id}
                  onClick={() => moveByname(item.name)}
                >
                  <figure>
                    <img className="w-[100%] h-[140px] object-cover sm:h-[100px] md:h-[120px] lg:h-[130px] xl:h-[140px]" 
                    src={item.img} alt={item.name} />
                  </figure>
                  <div className="card-body">
                    <div className="card-title text-center text-[18px] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] xl:text-[1.3rem]">
                      {item.name}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* =============== Footer  =============== */}
        <Footer page={"home"}/>
      
    </>
  );
}
