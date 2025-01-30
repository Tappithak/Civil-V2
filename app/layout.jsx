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
  // icons: {
  //   icon: "/icon.png",
  //   shortcut: "/icon.png",
  //   apple: "/icon.png", // สำหรับ iOS
  // },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#a20c0c96"/>
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icon.png" />
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
