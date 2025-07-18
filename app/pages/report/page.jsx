// report.jsx
"use client";
import axios from "axios";
import * as React from "react";
import Navbar from "../../../components/layout/Nav";
import Footer from "../../../components/layout/Footer";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import { Box } from "@mui/material";




export default function detail() {
    const [search, setsearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [ load , setload] =  React.useState(false);
    const [ background , setbackground] =  React.useState("");
    const [dataImg, setDataImg] = React.useState([]);

      function countLocation(datalocal){
        var cb = []
        var sm = []
        var sk = []
        var png = []
        var nt = []
        var tt = []
        var bm = []
        var nm = []

        for(var i=0;i<datalocal.length;i++){
          if(datalocal[i].location == "ชลบุรี" ){
            cb.push(datalocal[i].location)
          }
          else if(datalocal[i].location == "สมุทรปราการ" ){
            sm.push(datalocal[i].location)
          }
          else if(datalocal[i].location == "สงขลา" ){
            sk.push(datalocal[i].location)
          }
          else if(datalocal[i].location == "พังงา" ){
            png.push(datalocal[i].location)
          }
          else if(datalocal[i].location == "นครปฐม" ){
            nt.push(datalocal[i].location)
          }
          else if(datalocal[i].location == "ตราด" ){
            tt.push(datalocal[i].location)
          }
          else if(datalocal[i].location == "กรุงเทพ" ){
            bm.push(datalocal[i].location)
          }
          else if(datalocal[i].location == "นครพนม" ){
            nm.push(datalocal[i].location)
          }
        }
        // console.log(chonburi)
        // setchonburi(chonburi.length)

        (async () => {
         
          const topology = await fetch(
              'https://code.highcharts.com/mapdata/countries/th/th-all.topo.json'
          ).then(response => response.json());
      
          // Prepare demo data. The data is joined to map using value of 'hc-key'
          // property by default. See API docs for 'joinBy' for more info on linking
          // data and map.
          const dataLocation = [
              ['th-ct', 0], ['th-4255', 0], ['th-pg', png.length], ['th-st', 0],
              ['th-kr', 0], ['th-sa', 0], ['th-tg', 0], ['th-tt', tt.length],
              ['th-pl', 0], ['th-ps', 0], ['th-kp', 0], ['th-pc', 0],
              ['th-sh', 0], ['th-at', 0], ['th-lb', 0], ['th-pa', 0],
              ['th-np', nt.length], ['th-sb', 0], ['th-cn', 0], ['th-bm', bm.length],
              ['th-pt', 0], ['th-no', 0], ['th-sp', sm.length], ['th-ss', 0],
              ['th-sm', 0], ['th-pe', 0], ['th-cc', 0], ['th-nn', 0],
              ['th-cb', cb.length], ['th-br', 0], ['th-kk', 0], ['th-ph', 0],
              ['th-kl', 0], ['th-sr', 0], ['th-nr', 0], ['th-si', 0],
              ['th-re', 0], ['th-le', 0], ['th-nk', 0], ['th-ac', 0],
              ['th-md', 0], ['th-sn', 0], ['th-nw', 0], ['th-pi', 0],
              ['th-rn', 0], ['th-nt', 0], ['th-sg', sk.length], ['th-pr', 0],
              ['th-py', 0], ['th-so', 0], ['th-ud', 0], ['th-kn', 0],
              ['th-tk', 0], ['th-ut', 0], ['th-ns', 0], ['th-pk', 0],
              ['th-ur', 0], ['th-sk', 0], ['th-ry', 0], ['th-cy', 0],
              ['th-su', 0], ['th-nf', nm.length], ['th-bk', 0], ['th-mh', 0],
              ['th-pu', 0], ['th-cp', 0], ['th-yl', 0], ['th-cr', 0],
              ['th-cm', 0], ['th-ln', 0], ['th-na', 0], ['th-lg', 0],
              ['th-pb', 0], ['th-rt', 0], ['th-ys', 0], ['th-ms', 0],
              ['th-un', 0], ['th-nb', 0]
          ];
      
          // Create the chart
          Highcharts.mapChart('container', {
              chart: {
                  map: topology
              },
      
              title: {
                  text: 'Highcharts Maps basic demo'
              },
      
              subtitle: {
                  text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/th/th-all.topo.json">Thailand</a>'
              },
      
              mapNavigation: {
                  enabled: true,
                  buttonOptions: {
                      verticalAlign: 'bottom'
                  }
              },
      
              colorAxis: {
                  min: 0,
                  max: 1
              },
              tooltip: {
                valueDecimals: 0,
                valueSuffix: ' คัน'
            },
      
              series: [{
                  data: dataLocation,
                  name: 'จำนวนรถ',
                  states: {
                      hover: {
                          color: '#BADA55'
                      }
                  },
                  dataLabels: {
                      enabled: true,
                      format: '{point.value:.0f}'
                  }
              }]
          });
      
      })();
      }




      

      React.useEffect(() => {
        const fetchData = async () => {
          try {
            setload(true);
            const res = await axios.get('/api/read?', {
              params: {
                action: "gethubData"
              }
            }
            );
            setData(res.data);
            countLocation(res.data)
          } catch (error) {
            setload(false);
            console.log(error);
          }finally{
            setload(false);
          }
        };
        
        fetchData();
      }, []);


      function filterMap(){
        
      }

  return (
    <>

{

load ? 

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

:
<div></div>

    }


      <Navbar search={search} setsearch={setsearch} setload={setload} setData={setDataImg} setbackground={setbackground}/>

      <div className="grid grid-cols-1 xl:grid-cols-3 overflow-auto justify-items-center gap-3 pb-[80px] xl:h-[100dvh]">
        <Box className="pt-[0px] order-2 px-[3rem] md:px-2 xl:px-3">
          <Sheet
            sx={{ overflow: "auto" }}
            className="bg-[#ffffff00] h-[500px] md:h-[650px] xl:h-[750px]"
          >
            <Table stickyHeader>
              <thead>
                <tr className="text-[16px] text-center">
                  <th className="w-[110px] sm:w-[180px] md:w-[80px] xl:w-[100px]">
                  ทะเบียน
                  </th>
                  <th className="w-[110px] sm:w-[180px] md:w-[80px] xl:w-[180px]">ตราอักษร</th>
                  <th className="w-[110px] sm:w-[180px] md:w-[80px] xl:w-[180px]">สถานที่</th>
                </tr>
              </thead>
              <tbody key={data}>
                {data
                  .filter((val) => {
                    if (search == "") {
                      return val.group != "";
                    } else if (
                      val.group.includes(localStorage.getItem("typeSel")) && (
                      val.number.toLowerCase().includes(search.toLowerCase()) ||
                      val.tra.toLowerCase().includes(search.toLowerCase()) ||
                      val.location.includes(search))
                    ) {
                      return val;
                    }
                  })
                  .map((row, index) => (
                    <tr key={index}>
                      <td>{row.number}</td>
                      <td>{row.tra}</td>
                      <td>{row.location}</td>
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
      <Footer page={"report"}/>
    </>
  );
}
