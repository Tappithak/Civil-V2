import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "ยุทโธปกรณ์สายช่างโยธา",
  description: "ยุทโธปกรณ์สายช่างโยธา",
  icons: "/icon.png",
  name:"theme-color",
  content:"#a20c0c96",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script 
          src="https://code.highcharts.com/maps/highmaps.js"
          strategy="beforeInteractive"
        />
        <Script 
          src="https://code.highcharts.com/maps/modules/exporting.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
