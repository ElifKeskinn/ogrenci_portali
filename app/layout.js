import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Öğrenci Portalı",
  description: "Öğrenci Portalı",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>
          {metadata.title}
        </title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
       

        {children}
      </body>
    </html>
  );
}
