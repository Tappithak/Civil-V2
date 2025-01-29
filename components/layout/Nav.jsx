'use client';
import * as React from "react";
import axios from "axios";
import Image from 'next/image'

export default function navbar({search,setsearch,setload,setData,setbackground}) {
    React.useEffect(() => {
        const config = "action=gethubImg&username=adminDB&password=Ad1234n";
        const fetchData = async () => {
          try {
            setload(true);
            const res = await axios.get(
              "https://script.google.com/macros/s/AKfycbyEb5N44PQzmHgurDXn2_-EWSAKyOuwYcy9-SElYBloJeJR9LzOHskbRUbvGHUInqPE/exec?" +
                config
            );
            setData(res.data);

              let resualt = "";
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].name == localStorage.getItem("listSel")) {
                  resualt = res.data[i].img;
                }
              }
              setbackground(resualt);

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
    <div className="navbar bg-white text-slate-950 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="flex-1">
      <Image className="btn btn-ghost text-xl" src="/logo-l.jfif" alt="logo" width={80} height={70}/>
      <a className="ml-3 text-2xl hidden sm:flex">ยุทโธปกรณ์สายช่างโยธา</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="ค้นหาเมนู"
            className="input input-bordered text-slate-950 bg-white w-full sm:w-24 md:w-auto"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
            <span className="text-3xl">D</span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow text-slate-950 bg-white"
          >
            {/* <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li> */}
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
