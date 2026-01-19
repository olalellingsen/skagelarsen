import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const font = Quicksand({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skage Larsen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow py-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
